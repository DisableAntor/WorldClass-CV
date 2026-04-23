import React, { useState } from 'react';
import { FormPane } from './FormPane';
import { PreviewPane } from './PreviewPane';
import { Download, LayoutTemplate, Settings, LayoutGrid, X } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { ALL_TEMPLATES } from './DynamicTemplates';

export function BuilderLayout() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [showSettings, setShowSettings] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const { updateSettings, data } = useResume();

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
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
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
              </div>
            </div>
          )}

          {/* Edit Pane */}
          <div className={`w-full md:w-[45%] lg:w-[40%] bg-white border-r border-slate-200 h-full overflow-y-auto no-print ${activeTab === 'edit' ? 'block' : 'hidden md:block'}`}>
            <FormPane />
          </div>

          {/* Preview Pane */}
          <div className={`w-full md:w-[55%] lg:w-[60%] bg-slate-400/20 h-full overflow-y-auto p-4 md:p-8 ${activeTab === 'preview' ? 'block' : 'hidden md:block'}`}>
            <div className="max-w-4xl mx-auto flex justify-center">
              <PreviewPane />
            </div>
          </div>
        </div>
      </main>
      
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
