import { useReactToPrint } from 'react-to-print';
import React, { useState, useRef, useEffect } from 'react';
import { FormPane } from './FormPane';
import { PreviewPane } from './PreviewPane';
import { Download, LayoutTemplate, Settings, LayoutGrid, X, Image as ImageIcon, FileText, ChevronDown, Loader2, HelpCircle } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { ALL_TEMPLATES } from './DynamicTemplates';
import { Joyride, Step } from 'react-joyride';

export function BuilderLayout() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [showSettings, setShowSettings] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [runTutorial, setRunTutorial] = useState(false);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const { updateSettings, data } = useResume();

  const tutorialSteps: Step[] = [
    {
      target: '.tour-form-pane',
      content: 'Here you can fill out all your personal information, experience, and education.',
    },
    {
      target: '.tour-settings-btn',
      content: 'Click here to customize the colors, typography, layout, and choose from over 30 templates!',
    },
    {
      target: '.tour-download-btn',
      content: 'When you are done, export your amazing new CV to PNG or PDF, or just print it directly.',
    },
    {
      target: '.tour-preview-pane',
      content: 'This is a live preview of your CV. It updates instantly as you make changes.',
    }
  ];

  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const downloadMenuRef = useRef<HTMLDivElement>(null);
  const contentToPrintRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef: contentToPrintRef,
    documentTitle: `${data.personalInfo.firstName || 'Resume'}_CV`,
    onBeforePrint: () => {
      return new Promise<void>((resolve) => setTimeout(resolve, 100)); // give state time to update if needed
    },
    onAfterPrint: () => {
      setIsExporting(null);
      setShowDownloadMenu(false);
    }
  });

  const handlePdfExport = async () => {
    setIsExporting('pdf');
    if (activeTab !== 'preview') {
      setActiveTab('preview');
      await new Promise(r => setTimeout(r, 500));
    }
    reactToPrintFn();
  };

  // Close download menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target as Node)) {
        setShowDownloadMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const downloadJson = () => {
    setIsExporting('json');
    setTimeout(() => {
      try {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.href = url;
        downloadAnchorNode.download = `${data.personalInfo.firstName || 'Resume'}_Data.json`;
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        document.body.removeChild(downloadAnchorNode);
        URL.revokeObjectURL(url);
      } catch (e) {
        console.error(e);
        alert('Failed to generate JSON. Please try again.');
      } finally {
        setShowDownloadMenu(false);
        setIsExporting(null);
      }
    }, 100);
  };

  const downloadPng = async () => {
    try {
      setIsExporting('png');
      
      if (activeTab !== 'preview') {
        setActiveTab('preview');
        await new Promise(r => setTimeout(r, 500));
      }

      const html2canvas = (await import('html2canvas')).default;
      const cvElement = document.querySelector('.cv-preview') as HTMLElement;
      if (!cvElement) throw new Error("Preview element not found");
      
      // Delay slightly for render
      await new Promise(r => setTimeout(r, 200));
      
      // Get precise dimensions to prevent cutoff on mobile
      const rect = cvElement.getBoundingClientRect();
      const rectWidth = cvElement.scrollWidth || rect.width;
      const rectHeight = cvElement.scrollHeight || rect.height;
      
      const canvas = await html2canvas(cvElement, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff',
        width: rectWidth,
        height: rectHeight,
        windowWidth: rectWidth + 200,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0
      });
      const link = document.createElement('a');
      link.download = `${data.personalInfo.firstName || 'Resume'}_CV.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch(e) {
      console.error(e);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsExporting(null);
      setShowDownloadMenu(false);
    }
  };

  const downloadDocx = async () => {
    try {
      setIsExporting('docx');
      
      if (activeTab !== 'preview') {
        setActiveTab('preview');
        await new Promise(r => setTimeout(r, 500));
      }

      const htmlToDocx = (await import('html-to-docx')).default;
      const cvElement = document.querySelector('.cv-preview') as HTMLElement;
      if (!cvElement) throw new Error("Preview element not found");

      const htmlString = cvElement.outerHTML;
      const fileBuffer = await htmlToDocx(htmlString, null, {
        table: { row: { cantSplit: true } },
        footer: true,
        pageNumber: true,
      });

      const blob = new Blob([fileBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = URL.createObjectURL(blob);
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.href = url;
      downloadAnchorNode.download = `${data.personalInfo.firstName || 'Resume'}_CV.docx`;
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      document.body.removeChild(downloadAnchorNode);
      URL.revokeObjectURL(url);
    } catch(e) {
      console.error(e);
      alert('Failed to generate DOCX. Please try again.');
    } finally {
      setIsExporting(null);
      setShowDownloadMenu(false);
    }
  };
  
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-100 font-sans">
      {/* Header */}
      <header className="no-print bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">WorldClass CV</h1>
        </div>
        
        {/* Mobile controls */}
        <div className="flex md:hidden bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'edit' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
          >
            Edit
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'preview' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
          >
            Preview
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setRunTutorial(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors hidden sm:flex"
            title="Start Tutorial"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="tour-settings-btn flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </button>
          
          <div className="relative" ref={downloadMenuRef}>
            <button 
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              className="tour-download-btn flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export As</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            
            {showDownloadMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-slate-200 z-50 overflow-hidden">
                <div className="py-1">
                  <button 
                    onClick={handlePdfExport}
                    disabled={!!isExporting}
                    className="flex w-full items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors disabled:opacity-50"
                  >
                    {isExporting === 'pdf' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2 text-red-500" />}
                    Save as PDF
                  </button>
                  <button 
                    onClick={downloadPng}
                    disabled={!!isExporting}
                    className="flex w-full items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors disabled:opacity-50"
                  >
                    {isExporting === 'png' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ImageIcon className="w-4 h-4 mr-2 text-blue-500" />}
                    Save as PNG
                  </button>
                  <button 
                    onClick={downloadDocx}
                    disabled={!!isExporting}
                    className="flex w-full items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors disabled:opacity-50 border-t border-slate-100 mt-1"
                  >
                    {isExporting === 'docx' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2 text-indigo-500" />}
                    Save as DOCX
                  </button>
                  <button 
                    onClick={downloadJson}
                    disabled={!!isExporting}
                    className="flex w-full items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors disabled:opacity-50 border-t border-slate-100 mt-1"
                  >
                    {isExporting === 'json' ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <LayoutTemplate className="w-4 h-4 mr-2 text-slate-500" />}
                    Export JSON Data
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 flex flex-col md:flex-row">
          
          {/* Settings Overlay - simple approach */}
          {showSettings && (
            <div className="no-print absolute top-0 right-0 z-20 w-80 bg-white border-l border-slate-200 h-full shadow-2xl p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-lg font-semibold">Document Settings</h2>
                 <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-600">&times;</button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Theme Color</label>
                  <div className="flex flex-wrap gap-2">
                    {['#3b82f6', '#10b981', '#f43f5e', '#8b5cf6', '#f59e0b', '#0f172a'].map(color => (
                      <button
                        key={color}
                        onClick={() => updateSettings('themeColor', color)}
                        className={`w-8 h-8 rounded-full border-2 ${data.settings.themeColor === color ? 'border-slate-800' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Font Family</label>
                   <select 
                     value={data.settings.fontFamily}
                     onChange={(e) => updateSettings('fontFamily', e.target.value)}
                     className="w-full border border-slate-300 rounded-md p-2 text-sm"
                   >
                     <option value="Inter">Inter</option>
                     <option value="Roboto">Roboto</option>
                     <option value="Open Sans">Open Sans</option>
                     <option value="Merriweather">Merriweather</option>
                     <option value="Playfair Display">Playfair Display</option>
                   </select>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Template</label>
                   
                   <button
                     onClick={() => setShowTemplateModal(true)}
                     className="w-full py-3 px-4 flex items-center justify-between border border-slate-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                   >
                     <div>
                       <span className="block font-semibold text-slate-800 capitalize mb-1">{data.settings.template}</span>
                       <span className="block text-xs text-slate-500">Click to browse 30+ templates</span>
                     </div>
                     <LayoutGrid className="text-slate-400" />
                   </button>
                   
                   <div className="grid grid-cols-5 gap-2 mt-2">
                     {['modern', 'classic', 'minimal', 'corporate', 'elegant'].map(tpl => (
                       <button
                         key={tpl}
                         title={tpl}
                         onClick={() => updateSettings('template', tpl)}
                         className={`p-2 text-xs font-semibold capitalize border rounded-lg text-center truncate ${data.settings.template === tpl ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                       >
                         {tpl.substring(0, 3)}
                       </button>
                     ))}
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Profile Photo Shape</label>
                   <div className="grid grid-cols-3 gap-2">
                     {['circle', 'rounded', 'square'].map(shape => (
                       <button
                         key={shape}
                         onClick={() => updateSettings('photoShape', shape)}
                         className={`py-2 text-sm capitalize border rounded-lg text-center ${data.settings.photoShape === shape || (!data.settings.photoShape && shape === 'circle') ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300'}`}
                       >
                         {shape}
                       </button>
                     ))}
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Profile Photo Position</label>
                   <div className="grid grid-cols-3 gap-2">
                     {['left', 'center', 'right'].map(pos => (
                       <button
                         key={pos}
                         onClick={() => updateSettings('photoPosition', pos)}
                         className={`py-2 text-sm capitalize border rounded-lg text-center ${data.settings.photoPosition === pos || (!data.settings.photoPosition && pos === 'right') ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300'}`}
                       >
                         {pos}
                       </button>
                     ))}
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Photo Crop Alignment</label>
                   <div className="grid grid-cols-3 gap-2">
                     {['top', 'center', 'bottom'].map(pos => (
                       <button
                         key={pos}
                         onClick={() => updateSettings('photoObjectPosition', pos)}
                         className={`py-2 text-sm capitalize border rounded-lg text-center ${data.settings.photoObjectPosition === pos || (!data.settings.photoObjectPosition && pos === 'center') ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300'}`}
                       >
                         {pos}
                       </button>
                     ))}
                   </div>
                </div>

                <div className="border-t border-slate-200 pt-6">
                   <h3 className="text-base font-semibold text-slate-800 mb-4">Section Headings</h3>
                   <div className="space-y-3">
                     <div>
                       <label className="block text-xs font-medium text-slate-500 mb-1">Summary Heading</label>
                       <input 
                         type="text" 
                         value={data.settings.sectionTitles.summary} 
                         onChange={(e) => updateSettings('sectionTitles.summary', e.target.value)}
                         className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-medium text-slate-500 mb-1">Experience Heading</label>
                       <input 
                         type="text" 
                         value={data.settings.sectionTitles.experience} 
                         onChange={(e) => updateSettings('sectionTitles.experience', e.target.value)}
                         className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-medium text-slate-500 mb-1">Education Heading</label>
                       <input 
                         type="text" 
                         value={data.settings.sectionTitles.education} 
                         onChange={(e) => updateSettings('sectionTitles.education', e.target.value)}
                         className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-medium text-slate-500 mb-1">Projects Heading</label>
                       <input 
                         type="text" 
                         value={data.settings.sectionTitles.projects} 
                         onChange={(e) => updateSettings('sectionTitles.projects', e.target.value)}
                         className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-medium text-slate-500 mb-1">Skills Heading</label>
                       <input 
                         type="text" 
                         value={data.settings.sectionTitles.skills} 
                         onChange={(e) => updateSettings('sectionTitles.skills', e.target.value)}
                         className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-medium text-slate-500 mb-1">Languages Heading</label>
                       <input 
                         type="text" 
                         value={data.settings.sectionTitles.languages || 'Languages'} 
                         onChange={(e) => updateSettings('sectionTitles.languages', e.target.value)}
                         className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-medium text-slate-500 mb-1">Certifications Heading</label>
                       <input 
                         type="text" 
                         value={data.settings.sectionTitles.certifications || 'Certifications'} 
                         onChange={(e) => updateSettings('sectionTitles.certifications', e.target.value)}
                         className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-medium text-slate-500 mb-1">References Heading</label>
                       <input 
                         type="text" 
                         value={data.settings.sectionTitles.references || 'References'} 
                         onChange={(e) => updateSettings('sectionTitles.references', e.target.value)}
                         className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-medium text-slate-500 mb-1">Personal Details Heading</label>
                       <input 
                         type="text" 
                         value={data.settings.sectionTitles.personalDetails || 'Personal Details'} 
                         onChange={(e) => updateSettings('sectionTitles.personalDetails', e.target.value)}
                         className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-medium text-slate-500 mb-1">Declaration Heading</label>
                       <input 
                         type="text" 
                         value={data.settings.sectionTitles.declaration || 'Declaration'} 
                         onChange={(e) => updateSettings('sectionTitles.declaration', e.target.value)}
                         className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                       />
                     </div>
                   </div>
                </div>
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-base font-semibold text-slate-800 mb-4">Manage Visible Sections</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'summary', label: 'Summary' },
                      { id: 'experience', label: 'Experience' },
                      { id: 'education', label: 'Education' },
                      { id: 'projects', label: 'Projects' },
                      { id: 'skills', label: 'Skills' },
                      { id: 'languages', label: 'Languages' },
                      { id: 'certifications', label: 'Certifications' },
                      { id: 'references', label: 'References' },
                      { id: 'personalDetails', label: 'Personal Details' }
                    ].map(section => {
                      const isHidden = data.settings.hiddenSections?.includes(section.id);
                      return (
                        <div key={section.id} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700">{section.label}</span>
                          <button
                            onClick={() => {
                              const arr = data.settings.hiddenSections || [];
                              if (isHidden) {
                                updateSettings('hiddenSections', arr.filter((s: string) => s !== section.id));
                              } else {
                                updateSettings('hiddenSections', [...arr, section.id]);
                              }
                            }}
                            className={`w-10 h-5 rounded-full relative transition-colors focus:outline-none flex-shrink-0 ${!isHidden ? 'bg-blue-600' : 'bg-slate-300'}`}
                          >
                            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${!isHidden ? 'translate-x-[20px]' : 'translate-x-0'}`} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit Pane */}
          <div className={`tour-form-pane w-full md:w-[45%] lg:w-[40%] bg-white border-r border-slate-200 h-full overflow-y-auto no-print ${activeTab === 'edit' ? 'block' : 'hidden md:block'}`}>
            <FormPane />
          </div>

          {/* Preview Pane */}
          <div className={`tour-preview-pane w-full md:w-[55%] lg:w-[60%] bg-slate-400/20 h-full overflow-auto p-4 md:p-8 ${activeTab === 'preview' ? 'block' : 'hidden md:block'}`}>
            <div className="max-w-4xl mx-auto flex justify-center min-w-[21cm]">
              <div ref={contentToPrintRef}>
                <PreviewPane />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Joyride
        steps={tutorialSteps}
        run={runTutorial}
        continuous={true}
        showSkipButton={true}
        callback={(data) => {
          if (data.status === 'finished' || data.status === 'skipped') {
            setRunTutorial(false);
          }
        }}
      />
      
      {/* Template Gallery Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-50 w-full max-w-6xl h-full mt-10 sm:mt-0 sm:max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-white shrink-0 shadow-sm z-10">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Template Gallery</h2>
                <p className="text-sm text-slate-500 mt-1">Choose from our collection of {ALL_TEMPLATES.length} professionally designed templates</p>
              </div>
              <button onClick={() => setShowTemplateModal(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
                {ALL_TEMPLATES.map(tpl => (
                  <button 
                    key={tpl}
                    onClick={() => {
                      updateSettings('template', tpl);
                      setShowTemplateModal(false);
                    }}
                    className={`flex flex-col items-center group relative p-4 ${data.settings.template === tpl ? 'ring-4 ring-blue-500 rounded-xl bg-blue-50/50 scale-105 shadow-md' : 'hover:scale-105 hover:bg-white rounded-xl hover:shadow-lg'} transition-all duration-300`}
                  >
                    <div className="w-[180px] h-[254px] bg-white rounded-lg shadow overflow-hidden relative group-hover:shadow-md border border-slate-200 mx-auto transition-shadow" style={{ transform: 'translateZ(0)' }}>
                      {/* Scale exact A4 PreviewPane down perfectly */}
                      <div className="absolute top-0 left-0 origin-top-left pointer-events-none transform scale-[0.226]">
                         <PreviewPane overrideTemplate={tpl} />
                      </div>
                    </div>
                    <div className="mt-4 pb-2 text-center w-full">
                      <span className={`block text-md font-bold capitalize ${data.settings.template === tpl ? 'text-blue-700' : 'text-slate-800'}`}>
                        {tpl}
                      </span>
                      {data.settings.template === tpl && (
                        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full mt-1.5 inline-block border border-blue-200">Selected</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
