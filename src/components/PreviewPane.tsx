import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import { ResumeSettings } from '../types';
import { DYNAMIC_CONFIGS, DynamicTemplate } from './DynamicTemplates';

// Helper to reliably format YYYY-MM
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

export function PreviewPane({ overrideTemplate }: { overrideTemplate?: string }) {
  const { data } = useResume();
  const { personalInfo, summary, experience = [], education = [], skills = [], settings } = data;

  const fontVariables: Record<string, string> = {
    'Inter': 'var(--font-sans)',
    'Roboto': 'var(--font-roboto)',
    'Open Sans': 'var(--font-open-sans)',
    'Merriweather': 'var(--font-merriweather)',
    'Playfair Display': 'var(--font-playfair)',
  };

  const currentFont = fontVariables[settings.fontFamily] || 'var(--font-sans)';
  const currentTemplate = overrideTemplate || settings.template;

  return (
    <div 
      className="cv-preview bg-white shadow-xl min-h-[29.7cm] flex flex-col mx-auto transition-all"
      style={{ 
        width: '21cm', // A4 exact width for preview purposes
        fontFamily: currentFont 
      }}
    >
      {/* Template selector logic */}
      {currentTemplate === 'modern' && <ModernTemplate data={data} />}
      {currentTemplate === 'classic' && <ClassicTemplate data={data} />}
      {currentTemplate === 'minimal' && <MinimalTemplate data={data} />}
      {currentTemplate === 'executive' && <ExecutiveTemplate data={data} />}
      {currentTemplate === 'creative' && <CreativeTemplate data={data} />}
      {currentTemplate === 'bd-standard' && <BdStandardTemplate data={data} />}
      {DYNAMIC_CONFIGS[currentTemplate] && <DynamicTemplate data={data} config={DYNAMIC_CONFIGS[currentTemplate]} />}
    </div>
  );
}

// --- EXTRAMS & COMMON COMPONENTS ---
function CommonExtras({ data, headerColor = data.settings.themeColor, padding = '' }: { data: any, headerColor?: string, padding?: string }) {
  const { personalInfo, certifications = [], languages = [], references = [], settings } = data;
  const hasPersonalDetails = personalInfo.fathersName || personalInfo.mothersName || personalInfo.dateOfBirth || personalInfo.nationality || personalInfo.religion || personalInfo.maritalStatus || personalInfo.bloodGroup;

  const titleClass = "text-xl font-bold uppercase tracking-wider mb-4 pb-1 border-b-2";

  return (
    <div className={`flex flex-col gap-6 mt-6 ${padding}`}>
      {certifications.length > 0 && (
        <div>
          <h2 className={titleClass} style={{ borderColor: headerColor, color: headerColor }}>{settings.sectionTitles?.certifications || 'Certifications'}</h2>
          <ul className="list-disc list-inside text-sm space-y-2">
            {certifications.map((cert: any) => (
              <li key={cert.id}><strong className="text-slate-800">{cert.name}</strong> from {cert.issuer}</li>
            ))}
          </ul>
        </div>
      )}

      {languages.length > 0 && (
        <div>
          <h2 className={titleClass} style={{ borderColor: headerColor, color: headerColor }}>{settings.sectionTitles?.languages || 'Languages'}</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            {languages.map((lang: any) => (
              <span key={lang.id} className="bg-slate-50 px-3 py-1 rounded border border-slate-200">
                <strong className="text-slate-800">{lang.name}</strong> - {lang.proficiency}
              </span>
            ))}
          </div>
        </div>
      )}

      {references.length > 0 && (
        <div>
          <h2 className={titleClass} style={{ borderColor: headerColor, color: headerColor }}>{settings.sectionTitles?.references || 'References'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {references.map((ref: any, i: number) => (
              <div key={ref.id} className="text-sm">
                <p className="font-bold text-base text-slate-800">{ref.name}</p>
                <p className="text-slate-600">{ref.designation}, {ref.company}</p>
                {ref.phone && <p className="text-slate-600">Phone: {ref.phone}</p>}
                {ref.email && <p className="text-slate-600">Email: {ref.email}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {hasPersonalDetails && (
        <div>
          <h2 className={titleClass} style={{ borderColor: headerColor, color: headerColor }}>{settings.sectionTitles?.personalDetails || 'Personal Details'}</h2>
          <table className="w-full text-sm text-left">
            <tbody>
              {personalInfo.fathersName && <tr><td className="font-bold text-slate-700 py-1 w-40">Father's Name</td><td className="w-4">:</td><td className="text-slate-600">{personalInfo.fathersName}</td></tr>}
              {personalInfo.mothersName && <tr><td className="font-bold text-slate-700 py-1 w-40">Mother's Name</td><td className="w-4">:</td><td className="text-slate-600">{personalInfo.mothersName}</td></tr>}
              {personalInfo.dateOfBirth && <tr><td className="font-bold text-slate-700 py-1 w-40">Date of Birth</td><td className="w-4">:</td><td className="text-slate-600">{personalInfo.dateOfBirth}</td></tr>}
              {personalInfo.nationality && <tr><td className="font-bold text-slate-700 py-1 w-40">Nationality</td><td className="w-4">:</td><td className="text-slate-600">{personalInfo.nationality}</td></tr>}
              {personalInfo.religion && <tr><td className="font-bold text-slate-700 py-1 w-40">Religion</td><td className="w-4">:</td><td className="text-slate-600">{personalInfo.religion}</td></tr>}
              {personalInfo.maritalStatus && <tr><td className="font-bold text-slate-700 py-1 w-40">Marital Status</td><td className="w-4">:</td><td className="text-slate-600">{personalInfo.maritalStatus}</td></tr>}
              {personalInfo.bloodGroup && <tr><td className="font-bold text-slate-700 py-1 w-40">Blood Group</td><td className="w-4">:</td><td className="text-slate-600">{personalInfo.bloodGroup}</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// --- TEMPLATES ---

function ModernTemplate({ data }: { data: any }) {
  const { personalInfo, summary, experience = [], education = [], skills = [], projects = [], settings } = data;
  
  return (
    <div className="flex w-full h-full min-h-[29.7cm]">
      {/* Left Sidebar */}
      <div 
        className="w-1/3 p-8 text-white flex flex-col gap-8"
        style={{ backgroundColor: settings.themeColor }}
      >
        <div className="flex flex-col gap-4">
          {personalInfo.photoUrl && (
            <img 
              src={personalInfo.photoUrl} 
              alt="Profile" 
              className={`w-32 h-32 ${getShapeClass(settings.photoShape)} object-cover border-4 border-white/20 shadow-lg`}
            />
          )}
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-wider mb-1 leading-tight text-white/90">
              {personalInfo.firstName} <br/> {personalInfo.lastName}
            </h1>
            <p className="text-lg font-medium text-white/80">{personalInfo.jobTitle}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm mt-4">
          {personalInfo.email && (
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 shrink-0" />
              <span className="break-all">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 shrink-0" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {(personalInfo.city || personalInfo.country) && (
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-3">
              <Linkedin className="w-4 h-4 shrink-0" />
              <span className="break-all">{personalInfo.linkedin}</span>
            </div>
          )}
        </div>

        {skills.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold tracking-widest uppercase mb-4 text-white border-b border-white/20 pb-2">{settings.sectionTitles?.skills || 'Skills'}</h2>
            <div className="flex flex-col gap-3">
              {skills.map((skill: any) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{skill.name}</span>
                    <span className="opacity-70 text-xs">{skill.level}</span>
                  </div>
                  {/* Skill Bar */}
                  <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white" 
                      style={{ 
                        width: skill.level === 'Expert' ? '100%' : 
                               skill.level === 'Advanced' ? '80%' : 
                               skill.level === 'Intermediate' ? '60%' : '40%' 
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-8 flex flex-col gap-8 bg-white text-slate-800">
        {summary && (
          <div>
            <h2 
              className="text-xl font-bold uppercase tracking-wider mb-3 pb-1 border-b-2"
              style={{ borderColor: settings.themeColor, color: settings.themeColor }}
            >
              {settings.sectionTitles?.summary || 'Profile'}
            </h2>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h2 
              className="text-xl font-bold uppercase tracking-wider mb-4 pb-1 border-b-2"
              style={{ borderColor: settings.themeColor, color: settings.themeColor }}
            >
              {settings.sectionTitles?.experience || 'Experience'}
            </h2>
            <div className="flex flex-col gap-6">
              {experience.map((exp: any) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">{exp.jobTitle}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                      {formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-2" style={{ color: settings.themeColor }}>{exp.employer}</p>
                  <div className="text-sm text-slate-600 space-y-1 pl-4" dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br/>') }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 
              className="text-xl font-bold uppercase tracking-wider mb-4 pb-1 border-b-2"
              style={{ borderColor: settings.themeColor, color: settings.themeColor }}
            >
              {settings.sectionTitles?.education || 'Education'}
            </h2>
            <div className="flex flex-col gap-4">
              {education.map((edu: any) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">{edu.degree}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                      {formatDate(edu.startDate)} - {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-1" style={{ color: settings.themeColor }}>{edu.school}</p>
                  {edu.description && <p className="text-sm text-slate-600">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-4 pb-1 border-b-2" style={{ borderColor: settings.themeColor, color: settings.themeColor }}>
              {settings.sectionTitles?.projects || 'Projects'}
            </h2>
            <div className="flex flex-col gap-5">
              {projects.map((proj: any) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">{proj.title}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                      {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium" style={{ color: settings.themeColor }}>{proj.subtitle}</p>
                    {proj.link && <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-xs text-blue-600 break-all ml-2">{proj.link}</a>}
                  </div>
                  <div className="text-sm text-slate-600 space-y-1 pl-4" dangerouslySetInnerHTML={{ __html: proj.description.replace(/\n/g, '<br/>') }} />
                </div>
              ))}
            </div>
          </div>
        )}

        <CommonExtras data={data} headerColor={settings.themeColor} padding="pt-4" />

      </div>
    </div>
  );
}

function ClassicTemplate({ data }: { data: any }) {
  const { personalInfo, summary, experience = [], education = [], skills = [], projects = [], settings } = data;
  
  return (
    <div className="w-full p-10 bg-white text-slate-900">
      <div className="flex flex-col items-center text-center mb-8 pb-6 border-b-2" style={{ borderColor: settings.themeColor }}>
        {personalInfo.photoUrl && (
          <img 
            src={personalInfo.photoUrl} 
            alt="Profile" 
            className={`w-24 h-24 ${getShapeClass(settings.photoShape)} object-cover border-2 shadow-sm mb-4`}
            style={{ borderColor: settings.themeColor }}
          />
        )}
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-2" style={{ color: settings.themeColor }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xl tracking-wider text-slate-600 mb-4">{personalInfo.jobTitle}</p>
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-slate-600">
          {[
            personalInfo.email,
            personalInfo.phone,
            [personalInfo.city, personalInfo.country].filter(Boolean).join(', '),
            personalInfo.linkedin,
            personalInfo.website
          ].filter(Boolean).map((item, i, arr) => (
            <React.Fragment key={i}>
              <span>{item}</span>
              {i < arr.length - 1 && <span className="text-slate-300">|</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {summary && (
        <div className="mb-6">
          <p className="text-sm leading-relaxed text-justify">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-slate-200 pb-1" style={{ color: settings.themeColor }}>{settings.sectionTitles?.experience || 'Experience'}</h2>
          <div className="space-y-4">
            {experience.map((exp: any) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base">{exp.jobTitle}</h3>
                  <span className="text-sm font-semibold text-slate-600">
                    {formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <p className="text-sm font-medium italic text-slate-700">{exp.employer}</p>
                </div>
                <div className="text-sm text-slate-700 ml-4 list-disc space-y-1" dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br/>') }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-slate-200 pb-1" style={{ color: settings.themeColor }}>{settings.sectionTitles?.education || 'Education'}</h2>
          <div className="space-y-4">
            {education.map((edu: any) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base">{edu.degree}</h3>
                  <span className="text-sm font-semibold text-slate-600">
                    {formatDate(edu.startDate)} - {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-sm font-medium italic text-slate-700">{edu.school}</p>
                {edu.description && <p className="text-sm text-slate-700 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-slate-200 pb-1" style={{ color: settings.themeColor }}>{settings.sectionTitles?.projects || 'Projects'}</h2>
          <div className="space-y-4">
            {projects.map((proj: any) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base">{proj.title} <span className="font-normal text-sm italic text-slate-600 ml-2">{proj.subtitle}</span></h3>
                  <span className="text-sm font-semibold text-slate-600">
                    {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                  </span>
                </div>
                {proj.link && <p className="text-sm text-blue-600 mb-1">{proj.link}</p>}
                <div className="text-sm text-slate-700 ml-4 list-disc space-y-1 mt-1" dangerouslySetInnerHTML={{ __html: proj.description.replace(/\n/g, '<br/>') }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-slate-200 pb-1" style={{ color: settings.themeColor }}>{settings.sectionTitles?.skills || 'Skills'}</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {skills.map((skill: any) => (
              <div key={skill.id} className="text-sm">
                <span className="font-semibold">{skill.name}</span>
                <span className="text-slate-500 ml-1">({skill.level})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <CommonExtras data={data} headerColor={settings.themeColor} padding="pt-4 border-t border-slate-200" />
    </div>
  );
}

function MinimalTemplate({ data }: { data: any }) {
  const { personalInfo, summary, experience = [], education = [], skills = [], projects = [], settings } = data;
  
  return (
    <div className="w-full p-12 bg-white text-slate-800">
      <div className="mb-10 flex flex-col md:flex-row gap-8 items-start">
        {personalInfo.photoUrl && (
          <img 
            src={personalInfo.photoUrl} 
            alt="Profile" 
            className={`w-32 h-32 ${getShapeClass(settings.photoShape)} object-cover grayscale opacity-90 shrink-0`}
          />
        )}
        <div className="flex-1">
          <h1 className="text-5xl font-light tracking-tight mb-4 text-black">
            <strong className="font-bold">{personalInfo.firstName}</strong> {personalInfo.lastName}
          </h1>
          <div className="flex flex-col gap-1 text-sm font-medium text-slate-500">
            <span style={{ color: settings.themeColor }} className="text-lg mb-2">{personalInfo.jobTitle}</span>
            <div className="flex items-center gap-4">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
            </div>
            <div className="flex items-center gap-4">
              {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
              {personalInfo.website && <span>{personalInfo.website}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4 flex flex-col gap-8">
          {summary && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">{settings.sectionTitles?.summary || 'About'}</h2>
              <p className="text-sm leading-relaxed">{summary}</p>
            </div>
          )}
          
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">{settings.sectionTitles?.skills || 'Expertise'}</h2>
              <ul className="flex flex-col gap-2 relative">
                {skills.map((skill: any) => (
                  <li key={skill.id} className="text-sm pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full" style={{ '--tw-before-bg': settings.themeColor } as any}>
                    <span className="before:bg-[var(--tw-before-bg)]">{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="col-span-8 flex flex-col gap-10">
          {experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">{settings.sectionTitles?.experience || 'Work Experience'}</h2>
              <div className="space-y-8">
                {experience.map((exp: any) => (
                  <div key={exp.id} className="group cursor-default relative">
                    <div className="absolute -left-6 top-1.5 w-2 h-2 rounded-full hidden sm:block" style={{ backgroundColor: settings.themeColor }} />
                    <div className="flex gap-4 sm:gap-0 flex-col sm:flex-row sm:justify-between items-baseline mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{exp.jobTitle}</h3>
                      <span className="text-xs font-semibold text-slate-400 shrink-0">
                         {formatDate(exp.startDate)} — {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-sm font-medium mb-3" style={{ color: settings.themeColor }}>{exp.employer}</p>
                    <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br/>') }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">{settings.sectionTitles?.education || 'Education'}</h2>
              <div className="space-y-6">
                {education.map((edu: any) => (
                  <div key={edu.id}>
                    <div className="flex flex-col sm:flex-row sm:justify-between items-baseline mb-1">
                      <h3 className="text-base font-bold text-slate-900">{edu.degree}</h3>
                      <span className="text-xs font-semibold text-slate-400 shrink-0">
                         {formatDate(edu.startDate)} — {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}
                      </span>
                    </div>
                    <p className="text-sm font-medium" style={{ color: settings.themeColor }}>{edu.school}</p>
                    {edu.description && <p className="text-sm mt-2 text-slate-500">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">{settings.sectionTitles?.projects || 'Projects'}</h2>
              <div className="space-y-8">
                {projects.map((proj: any) => (
                  <div key={proj.id} className="group cursor-default relative">
                    <div className="absolute -left-6 top-1.5 w-2 h-2 rounded-full hidden sm:block" style={{ backgroundColor: settings.themeColor }} />
                    <div className="flex gap-4 sm:gap-0 flex-col sm:flex-row sm:justify-between items-baseline mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{proj.title}</h3>
                      <span className="text-xs font-semibold text-slate-400 shrink-0">
                         {formatDate(proj.startDate)} — {formatDate(proj.endDate)}
                      </span>
                    </div>
                    <p className="text-sm font-medium mb-3" style={{ color: settings.themeColor }}>{proj.subtitle} {proj.link && <span className="text-slate-400 ml-2 font-normal">({proj.link})</span>}</p>
                    <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: proj.description.replace(/\n/g, '<br/>') }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <CommonExtras data={data} headerColor={settings.themeColor} padding="pt-4" />
        </div>
      </div>
    </div>
  );
}

function ExecutiveTemplate({ data }: { data: any }) {
  const { personalInfo, summary, experience = [], education = [], skills = [], projects = [], settings } = data;
  
  return (
    <div className="w-full h-full min-h-[29.7cm] flex flex-col bg-slate-50 text-slate-800">
      <div className="bg-slate-900 text-white p-10 flex gap-8 items-center border-b-8" style={{ borderColor: settings.themeColor }}>
        {personalInfo.photoUrl && (
          <img 
            src={personalInfo.photoUrl} 
            alt="Profile" 
            className={`w-32 h-32 ${getShapeClass(settings.photoShape)} object-cover shrink-0 border-2 border-slate-700`}
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold uppercase tracking-widest mb-1">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-xl font-light text-slate-300 tracking-wide" style={{ color: settings.themeColor }}>{personalInfo.jobTitle}</p>
        </div>
        <div className="text-sm font-medium text-slate-300 flex flex-col gap-1.5 items-end text-right">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {(personalInfo.city || personalInfo.country) && <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </div>

      {summary && (
        <div className="p-10 pb-0">
          <p className="text-base font-medium leading-relaxed text-slate-700 italic border-l-4 pl-4" style={{ borderColor: settings.themeColor }}>"{summary}"</p>
        </div>
      )}

      <div className="p-10 grid grid-cols-3 gap-10 bg-slate-50">
        <div className="col-span-2 flex flex-col gap-8">
          {experience.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-wider mb-6 flex items-center gap-4 text-slate-900">
                <span className="w-8 border-b-2" style={{ borderColor: settings.themeColor }}></span>
                {settings.sectionTitles?.experience || 'Experience'}
              </h2>
              <div className="flex flex-col gap-6">
                {experience.map((exp: any) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-lg text-slate-800">{exp.jobTitle}</h3>
                      <span className="text-sm font-semibold text-slate-500 shrink-0">
                        {formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: settings.themeColor }}>{exp.employer}</p>
                    <div className="text-sm text-slate-600 space-y-1" dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br/>') }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-wider mb-6 flex items-center gap-4 text-slate-900">
                <span className="w-8 border-b-2" style={{ borderColor: settings.themeColor }}></span>
                {settings.sectionTitles?.projects || 'Key Projects'}
              </h2>
              <div className="flex flex-col gap-6">
                {projects.map((proj: any) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-lg text-slate-800">{proj.title}</h3>
                      <span className="text-sm font-semibold text-slate-500 shrink-0">
                        {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: settings.themeColor }}>
                      {proj.subtitle} {proj.link && <a href={proj.link} className="lowercase font-normal ml-2">({proj.link})</a>}
                    </div>
                    <div className="text-sm text-slate-600 space-y-1" dangerouslySetInnerHTML={{ __html: proj.description.replace(/\n/g, '<br/>') }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-1 flex flex-col gap-8">
          {skills.length > 0 && (
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wider mb-4 flex items-center gap-2 text-slate-900">
                <span className="w-4 border-b-2" style={{ borderColor: settings.themeColor }}></span>
                {settings.sectionTitles?.skills || 'Core Skills'}
              </h2>
              <ul className="flex flex-col gap-3">
                {skills.map((skill: any) => (
                  <li key={skill.id} className="text-sm font-semibold text-slate-700 flex justify-between border-b border-slate-200 pb-1">
                    {skill.name}
                    <span className="text-xs font-normal text-slate-400 uppercase tracking-wider">{skill.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wider mb-4 flex items-center gap-2 text-slate-900">
                <span className="w-4 border-b-2" style={{ borderColor: settings.themeColor }}></span>
                {settings.sectionTitles?.education || 'Education'}
              </h2>
              <div className="flex flex-col gap-4">
                {education.map((edu: any) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-base text-slate-800 leading-tight mb-1">{edu.degree}</h3>
                    <p className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: settings.themeColor }}>{edu.school}</p>
                    <span className="text-xs font-semibold text-slate-500 block mb-1">
                      {formatDate(edu.startDate)} - {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}
                    </span>
                    {edu.description && <p className="text-xs text-slate-600 mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-10">
        <CommonExtras data={data} headerColor={settings.themeColor} padding="border-t border-slate-200 pt-8" />
      </div>
    </div>
  );
}

function CreativeTemplate({ data }: { data: any }) {
  const { personalInfo, summary, experience = [], education = [], skills = [], projects = [], settings } = data;
  
  return (
    <div className="w-full flex flex-col min-h-[29.7cm] bg-white text-slate-800">
      <div 
        className="w-full p-12 text-white relative overflow-hidden" 
        style={{ backgroundColor: settings.themeColor }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-20 -mr-20" />
        <div className="absolute bottom-0 left-20 w-32 h-32 bg-black/10 rounded-full -mb-10" />
        
        <div className="relative z-10 flex gap-8 items-center">
          {personalInfo.photoUrl && (
            <img 
              src={personalInfo.photoUrl} 
              alt="Profile" 
              className={`w-40 h-40 ${getShapeClass(settings.photoShape)} object-cover object-center shadow-xl border-4 border-white/20`}
            />
          )}
          <div className="flex-1">
            <h1 className="text-5xl font-black tracking-tight mb-2 leading-none uppercase">
              {personalInfo.firstName} <br /> {personalInfo.lastName}
            </h1>
            <p className="text-2xl font-medium text-white/90">{personalInfo.jobTitle}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-slate-300 py-4 px-12 flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium">
        {personalInfo.email && <span className="flex items-center gap-2"><Mail className="w-4 h-4"/>{personalInfo.email}</span>}
        {personalInfo.phone && <span className="flex items-center gap-2"><Phone className="w-4 h-4"/>{personalInfo.phone}</span>}
        {(personalInfo.city || personalInfo.country) && <span className="flex items-center gap-2"><MapPin className="w-4 h-4"/>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>}
        {personalInfo.website && <span className="flex items-center gap-2"><Globe className="w-4 h-4"/>{personalInfo.website}</span>}
        {personalInfo.linkedin && <span className="flex items-center gap-2"><Linkedin className="w-4 h-4"/>{personalInfo.linkedin}</span>}
      </div>

      <div className="grid grid-cols-3 p-12 gap-10">
        <div className="col-span-2 flex flex-col gap-10">
          {summary && (
            <div>
              <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter" style={{ color: settings.themeColor }}>{settings.sectionTitles?.summary || 'Biography'}</h2>
              <p className="text-sm leading-relaxed text-slate-600 font-medium">{summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div>
              <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter" style={{ color: settings.themeColor }}>{settings.sectionTitles?.experience || 'Experience'}</h2>
              <div className="space-y-8 pl-4 border-l-2" style={{ borderColor: `${settings.themeColor}30` }}>
                {experience.map((exp: any) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full" style={{ backgroundColor: settings.themeColor }} />
                    <h3 className="font-bold text-xl">{exp.jobTitle}</h3>
                    <div className="flex gap-2 items-center mb-3">
                      <span className="font-bold text-slate-800">{exp.employer}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-sm font-bold text-slate-400">
                        {formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 space-y-1" dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br/>') }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter" style={{ color: settings.themeColor }}>{settings.sectionTitles?.projects || 'Projects'}</h2>
              <div className="grid grid-cols-2 gap-6">
                {projects.map((proj: any) => (
                  <div key={proj.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <h3 className="font-bold text-lg mb-1">{proj.title}</h3>
                    <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">{proj.subtitle}</p>
                    <div className="text-xs text-slate-600 space-y-1 mb-2" dangerouslySetInnerHTML={{ __html: proj.description.replace(/\n/g, '<br/>') }} />
                    {proj.link && <p className="text-xs font-bold break-all" style={{ color: settings.themeColor }}>{proj.link}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-1 flex flex-col gap-10">
          {skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-5 uppercase tracking-tighter" style={{ color: settings.themeColor }}>{settings.sectionTitles?.skills || 'Skills'}</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: any) => (
                  <span 
                    key={skill.id} 
                    className="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: settings.themeColor }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-5 uppercase tracking-tighter" style={{ color: settings.themeColor }}>{settings.sectionTitles?.education || 'Education'}</h2>
              <div className="space-y-6">
                {education.map((edu: any) => (
                  <div key={edu.id} className="bg-slate-50 p-5 rounded-2xl border-l-4" style={{ borderColor: settings.themeColor }}>
                    <h3 className="font-bold text-base leading-tight mb-1">{edu.degree}</h3>
                    <p className="text-sm font-bold text-slate-500 mb-1">{edu.school}</p>
                    <span className="text-xs font-bold text-slate-400 block mb-2">
                      {formatDate(edu.startDate)} - {edu.isCurrent ? 'Present' : formatDate(edu.endDate)}
                    </span>
                    {edu.description && <p className="text-xs text-slate-600">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-12 pt-0">
        <CommonExtras data={data} headerColor={settings.themeColor} />
      </div>
    </div>
  );
}

export function BdStandardTemplate({ data }: { data: any }) {
  const { personalInfo, summary, experience = [], education = [], skills = [], projects = [], languages = [], certifications = [], references = [], settings } = data;
  
  const today = new Date().toLocaleDateString('en-GB');

  return (
    <div className="w-full flex flex-col min-h-[29.7cm] bg-white text-black p-12 text-[15px] leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
      <h1 className="text-center text-xl font-bold uppercase underline mb-8 mt-2">Curriculum Vitae</h1>
      
      {/* Header Profile */}
      <div className="flex justify-between items-start mb-8 gap-6">
        <div className="flex-1">
          <p className="font-bold text-lg leading-tight uppercase mb-2">Of</p>
          <h2 className="text-2xl font-bold uppercase mb-2" style={{ color: settings.themeColor }}>{personalInfo.firstName} {personalInfo.lastName}</h2>
          {personalInfo.address && <p><strong>Address:</strong> {personalInfo.address}, {personalInfo.city}{personalInfo.country ? `, ${personalInfo.country}` : ''}</p>}
          {personalInfo.phone && <p><strong>Mobile:</strong> {personalInfo.phone}</p>}
          {personalInfo.email && <p><strong>Email:</strong> {personalInfo.email}</p>}
        </div>
        {personalInfo.photoUrl && (
          <div className="w-32 h-32 border border-slate-400 p-1 shrink-0 bg-slate-50">
            <img src={personalInfo.photoUrl} alt="Passport Photo" className="w-full h-full object-cover grayscale" />
          </div>
        )}
      </div>

      {summary && (
        <div className="mb-6">
          <h3 className="text-base font-bold uppercase underline mb-2 bg-slate-100/50 p-1 pl-2">{settings.sectionTitles?.summary || 'Career Objective'}</h3>
          <p className="text-justify px-2 leading-relaxed">{summary}</p>
        </div>
      )}

      {experience?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-base font-bold uppercase underline mb-3 bg-slate-100/50 p-1 pl-2">{settings.sectionTitles?.experience || 'Experience'}</h3>
          <div className="px-2 space-y-4">
            {experience.map((exp: any, i: number) => (
              <div key={exp.id}>
                <p className="font-bold">{i + 1}. {exp.jobTitle}</p>
                <div className="pl-4">
                  <p><strong>Organization:</strong> {exp.employer}</p>
                  <p><strong>Duration:</strong> {formatDate(exp.startDate)} to {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</p>
                  {exp.description && (
                    <div className="mt-1 text-[14px]" dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br/>') }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {education?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-base font-bold uppercase underline mb-3 bg-slate-100/50 p-1 pl-2">{settings.sectionTitles?.education || 'Educational Qualification'}</h3>
          <table className="w-full border-collapse border border-black text-center text-sm">
            <thead>
              <tr>
                <th className="border border-black px-2 py-1.5 font-bold">Exam Title</th>
                <th className="border border-black px-2 py-1.5 font-bold">Institution</th>
                <th className="border border-black px-2 py-1.5 font-bold">Result / CGPA</th>
                <th className="border border-black px-2 py-1.5 font-bold">Passing Year</th>
              </tr>
            </thead>
            <tbody>
              {education.map((edu: any) => (
                <tr key={edu.id}>
                  <td className="border border-black px-2 py-1.5 font-bold">{edu.degree}</td>
                  <td className="border border-black px-2 py-1.5">{edu.school}</td>
                  <td className="border border-black px-2 py-1.5">{edu.description || '-'}</td>
                  <td className="border border-black px-2 py-1.5">{edu.isCurrent ? 'Ongoing' : formatDate(edu.endDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {skills?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-base font-bold uppercase underline mb-2 bg-slate-100/50 p-1 pl-2">{settings.sectionTitles?.skills || 'Computer/Technical Skills'}</h3>
          <ul className="list-disc list-inside px-2">
            {skills.map((skill: any) => (
              <li key={skill.id}><strong>{skill.name}</strong> ({skill.level})</li>
            ))}
          </ul>
        </div>
      )}
      
      {languages?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-base font-bold uppercase underline mb-2 bg-slate-100/50 p-1 pl-2">{settings.sectionTitles?.languages || 'Language Proficiency'}</h3>
          <ul className="list-disc list-inside px-2">
            {languages.map((lang: any) => (
              <li key={lang.id}><strong>{lang.name}</strong> - {lang.proficiency} in reading, writing and speaking.</li>
            ))}
          </ul>
        </div>
      )}
      
      {certifications?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-base font-bold uppercase underline mb-2 bg-slate-100/50 p-1 pl-2">{settings.sectionTitles?.certifications || 'Certifications / Training'}</h3>
          <ul className="list-disc list-inside px-2">
            {certifications.map((cert: any) => (
              <li key={cert.id}><strong>{cert.name}</strong> from {cert.issuer} ({formatDate(cert.date)}) {cert.link && <a href={cert.link} className="text-blue-600 underline text-sm ml-2">Link</a>}</li>
            ))}
          </ul>
        </div>
      )}

      {projects?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-base font-bold uppercase underline mb-3 bg-slate-100/50 p-1 pl-2">{settings.sectionTitles?.projects || 'Projects'}</h3>
          <div className="px-2 space-y-4">
            {projects.map((proj: any, i: number) => (
              <div key={proj.id}>
                <p className="font-bold">{i + 1}. {proj.title}</p>
                <div className="pl-4">
                  <p><strong>Role:</strong> {proj.subtitle}</p>
                  {proj.description && (
                    <div className="mt-1 text-[14px]" dangerouslySetInnerHTML={{ __html: proj.description.replace(/\n/g, '<br/>') }} />
                  )}
                  {proj.link && <p className="mt-1 break-all"><strong>Link:</strong> {proj.link}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-base font-bold uppercase underline mb-3 bg-slate-100/50 p-1 pl-2">{settings.sectionTitles?.personalDetails || 'Personal Details'}</h3>
        <table className="w-full text-[15px] px-2">
          <tbody>
            <tr><td className="w-48 font-bold py-1">Father's Name</td><td className="w-4 text-center">:</td><td>{personalInfo.fathersName || '-'}</td></tr>
            <tr><td className="w-48 font-bold py-1">Mother's Name</td><td className="w-4 text-center">:</td><td>{personalInfo.mothersName || '-'}</td></tr>
            <tr><td className="w-48 font-bold py-1">Date of Birth</td><td className="w-4 text-center">:</td><td>{personalInfo.dateOfBirth || '-'}</td></tr>
            <tr><td className="w-48 font-bold py-1">Nationality</td><td className="w-4 text-center">:</td><td>{personalInfo.nationality || '-'}</td></tr>
            <tr><td className="w-48 font-bold py-1">Religion</td><td className="w-4 text-center">:</td><td>{personalInfo.religion || '-'}</td></tr>
            <tr><td className="w-48 font-bold py-1">Marital Status</td><td className="w-4 text-center">:</td><td>{personalInfo.maritalStatus || '-'}</td></tr>
            <tr><td className="w-48 font-bold py-1">Blood Group</td><td className="w-4 text-center">:</td><td>{personalInfo.bloodGroup || '-'}</td></tr>
          </tbody>
        </table>
      </div>

      {references?.length > 0 && (
        <div className="mb-6 break-inside-avoid">
          <h3 className="text-base font-bold uppercase underline mb-3 bg-slate-100/50 p-1 pl-2">{settings.sectionTitles?.references || 'References'}</h3>
          <div className="grid grid-cols-2 gap-8 px-2">
            {references.map((ref: any, index: number) => (
              <div key={ref.id}>
                <p className="font-bold underline mb-1">Reference: {index + 1}</p>
                <p className="font-bold">{ref.name}</p>
                <p>{ref.designation}</p>
                <p>{ref.company}</p>
                <p>Phone: {ref.phone}</p>
                <p>Email: {ref.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 break-inside-avoid">
        <h3 className="text-base font-bold uppercase underline mb-2 bg-slate-100/50 p-1 pl-2">{settings.sectionTitles?.declaration || 'Declaration'}</h3>
        <p className="text-justify px-2 mb-12">I do hereby declare that all the information given above is true and correct to the best of my knowledge and belief.</p>
        <div className="flex justify-between items-end px-2 mt-12">
          <div>
            <p className="font-bold">Date: <span className="font-normal">{today}</span></p>
          </div>
          <div className="text-center">
            <p className="border-t border-black px-8 pt-1 italic">{personalInfo.firstName} {personalInfo.lastName}</p>
            <p className="text-sm font-bold">Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
}
