import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  if (!year || !month) return dateStr;
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function getShapeClass(shape?: string) {
  if (shape === 'square') return 'rounded-none';
  if (shape === 'rounded') return 'rounded-xl';
  return 'rounded-full';
}

export type DynamicConfig = {
  id: string;
  layout: 'single' | 'sidebar-left' | 'sidebar-right' | 'split';
  headerColor: 'primary' | 'dark' | 'light' | 'none';
  sidebarColor: 'primary' | 'dark' | 'light' | 'none';
  theme: 'light' | 'dark';
  font?: string;
  separator: 'line' | 'dot' | 'none';
  uppercaseHeaders?: boolean;
};

export const DYNAMIC_CONFIGS: Record<string, DynamicConfig> = {
  harvard: { id: 'harvard', layout: 'single', headerColor: 'none', sidebarColor: 'none', theme: 'light', font: 'Merriweather', separator: 'line', uppercaseHeaders: true },
  stanford: { id: 'stanford', layout: 'sidebar-right', headerColor: 'none', sidebarColor: 'light', theme: 'light', font: 'Inter', separator: 'none', uppercaseHeaders: false },
  corporate: { id: 'corporate', layout: 'sidebar-left', headerColor: 'dark', sidebarColor: 'light', theme: 'light', font: 'Roboto', separator: 'line', uppercaseHeaders: true },
  tech: { id: 'tech', layout: 'sidebar-left', headerColor: 'none', sidebarColor: 'dark', theme: 'light', font: 'Roboto', separator: 'dot', uppercaseHeaders: true },
  onyx: { id: 'onyx', layout: 'single', headerColor: 'dark', sidebarColor: 'none', theme: 'dark', font: 'Inter', separator: 'line', uppercaseHeaders: true },
  developer: { id: 'developer', layout: 'sidebar-left', headerColor: 'none', sidebarColor: 'dark', theme: 'dark', font: 'Open Sans', separator: 'none', uppercaseHeaders: false },
  startup: { id: 'startup', layout: 'single', headerColor: 'primary', sidebarColor: 'none', theme: 'light', font: 'Inter', separator: 'line', uppercaseHeaders: true },
  elegant: { id: 'elegant', layout: 'single', headerColor: 'none', sidebarColor: 'none', theme: 'light', font: 'Playfair Display', separator: 'dot', uppercaseHeaders: false },
  bold: { id: 'bold', layout: 'split', headerColor: 'dark', sidebarColor: 'none', theme: 'light', font: 'Inter', separator: 'line', uppercaseHeaders: true },
  compact: { id: 'compact', layout: 'single', headerColor: 'none', sidebarColor: 'none', theme: 'light', separator: 'none', uppercaseHeaders: true },
  split: { id: 'split', layout: 'split', headerColor: 'primary', sidebarColor: 'none', theme: 'light', separator: 'line', uppercaseHeaders: true },
  nova: { id: 'nova', layout: 'sidebar-left', headerColor: 'none', sidebarColor: 'primary', theme: 'light', separator: 'dot', uppercaseHeaders: false },
  horizon: { id: 'horizon', layout: 'single', headerColor: 'dark', sidebarColor: 'none', theme: 'light', separator: 'none', uppercaseHeaders: true },
  summit: { id: 'summit', layout: 'sidebar-right', headerColor: 'primary', sidebarColor: 'dark', theme: 'light', separator: 'line', uppercaseHeaders: false },
  nexus: { id: 'nexus', layout: 'sidebar-left', headerColor: 'none', sidebarColor: 'none', theme: 'dark', separator: 'dot', uppercaseHeaders: true }
};

export const ALL_TEMPLATES = [
  'bd-standard',
  'modern', 'classic', 'minimal', 'executive', 'creative',
  ...Object.keys(DYNAMIC_CONFIGS)
];

export function DynamicTemplate({ data, config }: { data: any, config: DynamicConfig }) {
  const { personalInfo, summary, experience = [], education = [], skills = [], projects = [], settings } = data;
  
  const isDark = config.theme === 'dark';
  const bgMain = isDark ? 'bg-slate-900 text-slate-200' : 'bg-white text-slate-800';
  const textHeader = isDark ? 'text-white' : 'text-slate-900';
  const primaryAccent = settings.themeColor;
  
  const fontVariables: Record<string, string> = {
    'Inter': 'var(--font-sans)',
    'Roboto': 'var(--font-roboto)',
    'Open Sans': 'var(--font-open-sans)',
    'Merriweather': 'var(--font-merriweather)',
    'Playfair Display': 'var(--font-playfair)',
  };

  const currentFont = fontVariables[config.font || settings.fontFamily] || 'var(--font-sans)';

  const SectionTitle = ({ title }: { title: string }) => {
    const uc = config.uppercaseHeaders ? 'uppercase tracking-widest' : '';
    const bb = config.separator === 'line' ? 'border-b-2 pb-2 mb-4' : 'mb-3';
    return (
      <h2 className={`text-xl font-bold ${uc} ${bb} ${textHeader}`} style={config.separator === 'line' ? { borderColor: primaryAccent } : { color: primaryAccent }}>
        {config.separator === 'dot' && <span className="mr-2" style={{ color: primaryAccent }}>•</span>}
        {title}
      </h2>
    );
  };

  const getBgClass = (type: 'none' | 'primary' | 'dark' | 'light') => {
    switch (type) {
      case 'primary': return 'text-white'; // Uses style inline for bg
      case 'dark': return 'bg-slate-800 text-slate-200';
      case 'light': return 'bg-slate-100 text-slate-800';
      default: return 'bg-transparent';
    }
  };

  const getHeaderStyle = () => config.headerColor === 'primary' ? { backgroundColor: primaryAccent } : {};
  const getSidebarStyle = () => config.sidebarColor === 'primary' ? { backgroundColor: primaryAccent } : {};

  const ContactInfo = ({ vertical = false }) => (
    <div className={`flex ${vertical ? 'flex-col gap-3' : 'flex-wrap gap-4'} text-sm mt-4 opacity-80 font-medium`}>
      {personalInfo.email && <div className="flex items-center gap-2"><Mail size={14}/><span>{personalInfo.email}</span></div>}
      {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14}/><span>{personalInfo.phone}</span></div>}
      {(personalInfo.city || personalInfo.country) && <div className="flex items-center gap-2"><MapPin size={14}/><span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span></div>}
      {personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin size={14}/><span>{personalInfo.linkedin}</span></div>}
    </div>
  );

  const MainContent = () => (
    <div className="flex flex-col gap-8 w-full">
      {summary && (
        <section>
          <SectionTitle title={settings.sectionTitles?.summary || 'Profile'} />
          <p className="text-sm leading-relaxed">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <SectionTitle title={settings.sectionTitles?.experience || 'Experience'} />
          <div className="flex flex-col gap-6">
            {experience.map((exp: any) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`font-bold text-lg ${textHeader}`}>{exp.jobTitle}</h3>
                  <span className="text-sm font-semibold opacity-70">
                    {formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="text-sm font-bold mb-2 flex gap-2 items-center" style={{ color: primaryAccent }}>
                   {exp.employer}
                </div>
                <div className="text-sm space-y-1 opacity-90" dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br/>') }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <SectionTitle title={settings.sectionTitles?.projects || 'Projects'} />
          <div className="flex flex-col gap-6">
            {projects.map((proj: any) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`font-bold text-lg ${textHeader}`}>{proj.title}</h3>
                  <span className="text-sm font-semibold opacity-70">
                    {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                  </span>
                </div>
                <div className="text-sm font-bold mb-2" style={{ color: primaryAccent }}>
                   {proj.subtitle} {proj.link && <span className="opacity-60 font-normal ml-2 list-item ml-4">({proj.link})</span>}
                </div>
                <div className="text-sm space-y-1 opacity-90" dangerouslySetInnerHTML={{ __html: proj.description.replace(/\n/g, '<br/>') }} />
              </div>
            ))}
          </div>
        </section>
      )}
      
      {(!config.layout.includes('sidebar') && !config.layout.includes('split')) && (
         <div className="grid grid-cols-2 gap-8 mt-4">
           {skills.length > 0 && (
            <section>
              <SectionTitle title={settings.sectionTitles?.skills || 'Skills'} />
              <div className="flex flex-wrap gap-2">
                 {skills.map((s: any) => <span key={s.id} className="text-sm font-medium bg-black/5 px-2 py-1 rounded">{s.name} ({s.level})</span>)}
              </div>
            </section>
           )}
           {education.length > 0 && (
            <section>
              <SectionTitle title={settings.sectionTitles?.education || 'Education'} />
              <div className="flex flex-col gap-4">
                {education.map((edu: any) => (
                  <div key={edu.id}>
                    <h3 className={`font-bold text-base ${textHeader}`}>{edu.degree}</h3>
                    <p className="text-sm font-bold opacity-80" style={{ color: primaryAccent }}>{edu.school}</p>
                    <span className="text-xs font-semibold opacity-70 block">
                      {formatDate(edu.startDate)} - {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
           )}
         </div>
      )}
    </div>
  );

  const SideContent = () => (
    <div className="flex flex-col gap-8 w-full">
      {skills.length > 0 && (
        <section>
          <SectionTitle title={settings.sectionTitles?.skills || 'Skills'} />
          <div className="flex flex-col gap-3">
             {skills.map((s: any) => (
                <div key={s.id}>
                  <div className="flex justify-between text-sm mb-1 font-medium">
                     <span>{s.name}</span>
                     <span className="opacity-60 text-xs">{s.level}</span>
                  </div>
                </div>
             ))}
          </div>
        </section>
      )}
      {education.length > 0 && (
        <section>
          <SectionTitle title={settings.sectionTitles?.education || 'Education'} />
          <div className="flex flex-col gap-6">
            {education.map((edu: any) => (
              <div key={edu.id}>
                <h3 className={`font-bold text-base ${textHeader} leading-tight mb-1`}>{edu.degree}</h3>
                <p className="text-sm font-bold opacity-80 mb-1" style={{ color: primaryAccent }}>{edu.school}</p>
                <span className="text-xs font-semibold opacity-70 block mb-1">
                  {formatDate(edu.startDate)} - {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}
                </span>
                {edu.description && <p className="text-xs opacity-80">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  return (
    <div className={`w-full min-h-[29.7cm] flex flex-col ${bgMain}`} style={{ fontFamily: currentFont }}>
      {/* Header Area */}
      {config.headerColor !== 'none' || config.layout === 'single' ? (
        <div className={`w-full p-10 ${getBgClass(config.headerColor)}`} style={getHeaderStyle()}>
          <div className={`flex ${config.headerColor === 'none' && config.layout === 'single' && config.font === 'Merriweather' ? 'flex-col items-center text-center' : 'gap-8 items-center'}`}>
            {personalInfo.photoUrl && (
              <img 
                src={personalInfo.photoUrl} 
                className={`w-32 h-32 object-cover border-4 border-black/10 shrink-0 ${getShapeClass(settings.photoShape)}`} 
                alt="Profile"
              />
            )}
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold uppercase tracking-widest mb-2">{personalInfo.firstName} {personalInfo.lastName}</h1>
              <p className="text-xl font-medium opacity-90" style={config.headerColor === 'none' ? { color: primaryAccent } : {}}>{personalInfo.jobTitle}</p>
              {config.layout === 'single' && <ContactInfo vertical={false} />}
            </div>
          </div>
        </div>
      ) : null}

      {/* Content Area */}
      {config.layout === 'single' ? (
        <div className="p-10 flex-1">
          <MainContent />
        </div>
      ) : config.layout === 'split' ? (
        <div className="flex flex-1 p-10 gap-10">
          <div className="w-1/2 border-r pr-10 border-black/10">
            <MainContent />
          </div>
          <div className="w-1/2">
            <SideContent />
          </div>
        </div>
      ) : (
        /* Sidebar Layouts */
        <div className={`flex flex-1 ${config.layout === 'sidebar-right' ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`w-[35%] p-10 flex flex-col gap-8 ${getBgClass(config.sidebarColor)}`} style={getSidebarStyle()}>
            {config.headerColor === 'none' && (
              <div className="flex flex-col gap-4">
                {personalInfo.photoUrl && (
                  <img 
                    src={personalInfo.photoUrl} 
                    className={`w-36 h-36 object-cover border-4 border-black/10 shrink-0 shadow-lg ${getShapeClass(settings.photoShape)}`} 
                    alt="Profile"
                  />
                )}
                <div>
                  <h1 className="text-3xl font-bold uppercase tracking-widest mb-1 leading-tight">{personalInfo.firstName} <br/> {personalInfo.lastName}</h1>
                  <p className="text-md font-medium opacity-90" style={config.sidebarColor === 'none' ? { color: primaryAccent } : {}}>{personalInfo.jobTitle}</p>
                </div>
                <ContactInfo vertical={true} />
              </div>
            )}
            <SideContent />
          </div>
          <div className="w-[65%] p-10 border-l border-black/5">
            <MainContent />
          </div>
        </div>
      )}
    </div>
  );
}
