import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';

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
  styleMode?: 'bd' | 'standard';
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
  nexus: { id: 'nexus', layout: 'sidebar-left', headerColor: 'none', sidebarColor: 'none', theme: 'dark', separator: 'dot', uppercaseHeaders: true },
  
  // NEW BD TEMPLATES
  'bd-professional': { id: 'bd-professional', layout: 'single', headerColor: 'none', sidebarColor: 'none', theme: 'light', font: 'Merriweather', separator: 'line', uppercaseHeaders: true, styleMode: 'bd' },
  'bd-fresher': { id: 'bd-fresher', layout: 'single', headerColor: 'light', sidebarColor: 'none', theme: 'light', font: 'Roboto', separator: 'line', uppercaseHeaders: true, styleMode: 'bd' },
  'bd-bank': { id: 'bd-bank', layout: 'single', headerColor: 'dark', sidebarColor: 'none', theme: 'light', font: 'Inter', separator: 'dot', uppercaseHeaders: false, styleMode: 'bd' },
  'bd-government': { id: 'bd-government', layout: 'single', headerColor: 'primary', sidebarColor: 'none', theme: 'light', font: 'Playfair Display', separator: 'line', uppercaseHeaders: true, styleMode: 'bd' },
  'bd-academic': { id: 'bd-academic', layout: 'single', headerColor: 'none', sidebarColor: 'none', theme: 'light', font: 'Open Sans', separator: 'line', uppercaseHeaders: true, styleMode: 'bd' },
  'bd-corporate-modern': { id: 'bd-corporate-modern', layout: 'sidebar-left', headerColor: 'none', sidebarColor: 'light', theme: 'light', font: 'Roboto', separator: 'line', uppercaseHeaders: true, styleMode: 'bd' },
  'bd-executive': { id: 'bd-executive', layout: 'sidebar-right', headerColor: 'dark', sidebarColor: 'dark', theme: 'light', font: 'Merriweather', separator: 'line', uppercaseHeaders: false, styleMode: 'bd' },
  'bd-elegant': { id: 'bd-elegant', layout: 'split', headerColor: 'primary', sidebarColor: 'none', theme: 'light', font: 'Playfair Display', separator: 'line', uppercaseHeaders: true, styleMode: 'bd' },
  'bd-compact': { id: 'bd-compact', layout: 'single', headerColor: 'none', sidebarColor: 'none', theme: 'light', font: 'Inter', separator: 'none', uppercaseHeaders: true, styleMode: 'bd' },
  'bd-two-column': { id: 'bd-two-column', layout: 'sidebar-left', headerColor: 'primary', sidebarColor: 'none', theme: 'light', font: 'Roboto', separator: 'dot', uppercaseHeaders: true, styleMode: 'bd' }
};

export const ALL_TEMPLATES = [
  'bd-standard',
  'modern', 'classic', 'minimal', 'executive', 'creative',
  ...Object.keys(DYNAMIC_CONFIGS)
];

export function DynamicTemplate({ data, config }: { data: any, config: DynamicConfig }) {
  const { personalInfo, summary, experience = [], education = [], skills = [], projects = [], languages = [], certifications = [], references = [], settings } = data;
  
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
      case 'primary': return 'text-white';
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
      {personalInfo.address && <div className="flex items-center gap-2"><MapPin size={14}/><span>{personalInfo.address}</span></div>}
      {personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin size={14}/><span>{personalInfo.linkedin}</span></div>}
      {personalInfo.github && <div className="flex items-center gap-2"><Github size={14}/><span>{personalInfo.github}</span></div>}
      {personalInfo.website && <div className="flex items-center gap-2"><Globe size={14}/><span>{personalInfo.website}</span></div>}
    </div>
  );

  const PersonalDetailsTable = () => {
    if (!personalInfo.fathersName && !personalInfo.mothersName && !personalInfo.dateOfBirth && !personalInfo.nationality && !personalInfo.religion && !personalInfo.maritalStatus) return null;
    return (
      <section>
        <SectionTitle title={settings.sectionTitles?.personalDetails || 'Personal Details'} />
        <table className="w-full text-sm text-left">
          <tbody>
            {personalInfo.fathersName && <tr><td className="font-bold py-1 w-40">Father's Name</td><td className="w-4">:</td><td>{personalInfo.fathersName}</td></tr>}
            {personalInfo.mothersName && <tr><td className="font-bold py-1 w-40">Mother's Name</td><td className="w-4">:</td><td>{personalInfo.mothersName}</td></tr>}
            {personalInfo.dateOfBirth && <tr><td className="font-bold py-1 w-40">Date of Birth</td><td className="w-4">:</td><td>{personalInfo.dateOfBirth}</td></tr>}
            {personalInfo.nationality && <tr><td className="font-bold py-1 w-40">Nationality</td><td className="w-4">:</td><td>{personalInfo.nationality}</td></tr>}
            {personalInfo.religion && <tr><td className="font-bold py-1 w-40">Religion</td><td className="w-4">:</td><td>{personalInfo.religion}</td></tr>}
            {personalInfo.maritalStatus && <tr><td className="font-bold py-1 w-40">Marital Status</td><td className="w-4">:</td><td>{personalInfo.maritalStatus}</td></tr>}
            {personalInfo.bloodGroup && <tr><td className="font-bold py-1 w-40">Blood Group</td><td className="w-4">:</td><td>{personalInfo.bloodGroup}</td></tr>}
          </tbody>
        </table>
      </section>
    );
  };

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
              {config.styleMode === 'bd' ? (
                <table className="w-full text-sm text-left border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 p-2 text-slate-800">Degree</th>
                      <th className="border border-slate-300 p-2 text-slate-800">Institution</th>
                      <th className="border border-slate-300 p-2 text-slate-800">Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {education.map((edu: any) => (
                      <tr key={edu.id}>
                        <td className="border border-slate-300 p-2">{edu.degree}</td>
                        <td className="border border-slate-300 p-2">{edu.school}</td>
                        <td className="border border-slate-300 p-2">{edu.isCurrent ? 'Present' : formatDate(edu.endDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
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
              )}
            </section>
           )}
         </div>
      )}

      {certifications.length > 0 && (
        <section>
          <SectionTitle title={settings.sectionTitles?.certifications || 'Certifications'} />
          <ul className="list-disc list-inside text-sm space-y-1">
            {certifications.map((cert: any) => (
              <li key={cert.id}><strong>{cert.name}</strong> from {cert.issuer}</li>
            ))}
          </ul>
        </section>
      )}

      {languages.length > 0 && (
        <section>
          <SectionTitle title={settings.sectionTitles?.languages || 'Languages'} />
          <div className="flex flex-wrap gap-4 text-sm mt-2">
            {languages.map((lang: any) => (
              <span key={lang.id}><strong>{lang.name}</strong> - {lang.proficiency}</span>
            ))}
          </div>
        </section>
      )}

      <PersonalDetailsTable />

      {references.length > 0 && (
        <section>
          <SectionTitle title={settings.sectionTitles?.references || 'References'} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {references.map((ref: any, i: number) => (
              <div key={ref.id} className="text-sm">
                <p className="font-bold underline mb-1">Reference {i + 1}</p>
                <p className="font-bold text-base">{ref.name}</p>
                <p>{ref.designation}, {ref.company}</p>
                {ref.phone && <p>Phone: {ref.phone}</p>}
                {ref.email && <p>Email: {ref.email}</p>}
              </div>
            ))}
          </div>
        </section>
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

  const getHeaderLayoutClass = () => {
    if (settings.photoPosition === 'center' || (!settings.photoPosition && config.headerColor === 'none' && config.layout === 'single' && config.font === 'Merriweather')) {
      return 'flex-col items-center text-center gap-6';
    }
    if (settings.photoPosition === 'right') {
      return 'flex-row-reverse justify-between items-center gap-8 text-left';
    }
    // left or generic fallback
    return 'flex-row items-center gap-8 text-left';
  };

  return (
    <div className={`w-full min-h-[29.7cm] flex flex-col ${bgMain}`} style={{ fontFamily: currentFont }}>
      {/* Header Area */}
      {config.headerColor !== 'none' || config.layout === 'single' ? (
        <div className={`w-full p-10 ${getBgClass(config.headerColor)}`} style={getHeaderStyle()}>
          <div className={`flex ${getHeaderLayoutClass()}`}>
            {personalInfo.photoUrl && (
              <img 
                src={personalInfo.photoUrl} 
                className={`w-32 h-32 border-4 border-black/10 shrink-0 ${getShapeClass(settings.photoShape)}`} 
                style={{ objectFit: 'cover', objectPosition: settings.photoObjectPosition || 'center' }}
                alt="Profile"
              />
            )}
            <div className={settings.photoPosition === 'center' ? 'w-full' : 'flex-1'}>
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
              <div className={`flex flex-col gap-4 ${settings.photoPosition === 'center' ? 'items-center text-center' : settings.photoPosition === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
                {personalInfo.photoUrl && (
                  <img 
                    src={personalInfo.photoUrl} 
                    className={`w-36 h-36 border-4 border-black/10 shrink-0 shadow-lg ${getShapeClass(settings.photoShape)}`} 
            style={{ 
              objectFit: 'cover', 
              objectPosition: settings.photoObjectPosition || 'center' 
            }}                    alt="Profile"
                  />
                )}
                <div className="w-full">
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

      {/* Declaration at the bottom if BD style */}
      {config.styleMode === 'bd' && (
        <div className="px-10 pb-12 mt-auto">
          <h3 className="text-base font-bold uppercase tracking-wide mb-2 pt-8 border-t border-slate-300">{settings.sectionTitles?.declaration || 'Declaration'}</h3>
          <p className="text-sm text-justify mb-10">I do hereby declare that all the information given above is true and correct to the best of my knowledge and belief.</p>
          <div className="flex justify-between items-end text-sm">
            <div>
              <p className="font-bold">Date: <span className="font-normal">{new Date().toLocaleDateString('en-GB')}</span></p>
            </div>
            <div className="text-center">
              <p className="border-t border-black px-8 pt-1 italic">{personalInfo.firstName} {personalInfo.lastName}</p>
              <p className="text-xs font-bold mt-1">Signature</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
