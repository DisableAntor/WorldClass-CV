import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Input, Textarea } from './ui/Input';
import { ChevronDown, ChevronUp, Plus, Trash2, Camera } from 'lucide-react';

function Accordion({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-6 hover:bg-slate-50 transition-colors"
      >
        <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">{title}</h2>
        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

export function FormPane() {
  const { 
    data, 
    updatePersonalInfo, 
    updateSummary, 
    addListItem, 
    updateListItem, 
    removeListItem,
    addCustomSectionItem,
    updateCustomSectionItem,
    removeCustomSectionItem
  } = useResume();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo('photoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-xl font-semibold text-slate-800">Resume Details</h2>
        <p className="text-sm text-slate-500 mt-1">Fill in your information to generate your CV.</p>
      </div>

      <div className="flex-1">
        {!data.settings.hiddenSections?.includes('personalDetails') && (
        <Accordion title="Personal Information" defaultOpen>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 flex flex-col sm:flex-row items-center gap-4 mb-2 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              {data.personalInfo.photoUrl ? (
                <div className="relative">
                  <img src={data.personalInfo.photoUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md mx-auto sm:mx-0" />
                  <button type="button" onClick={() => updatePersonalInfo('photoUrl', '')} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition">
                    &times;
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center border-2 border-dashed border-slate-300 mx-auto sm:mx-0">
                  <Camera className="w-8 h-8 text-slate-400" />
                </div>
              )}
              <div className="text-center sm:text-left flex-1 border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-4 mt-2 sm:mt-0">
                <label className="cursor-pointer px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-md text-sm font-medium transition-colors inline-block shadow-sm">
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  {data.personalInfo.photoUrl ? 'Change Profile Photo' : 'Upload Profile Photo'}
                </label>
                <p className="text-xs text-slate-500 mt-2">Recommended: Square image, max 2MB.</p>
              </div>
            </div>
            <Input label="First Name" value={data.personalInfo.firstName} onChange={(e) => updatePersonalInfo('firstName', e.target.value)} />
            <Input label="Last Name" value={data.personalInfo.lastName} onChange={(e) => updatePersonalInfo('lastName', e.target.value)} />
            <Input label="Job Title" value={data.personalInfo.jobTitle} onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)} />
            <Input label="Email Address" type="email" value={data.personalInfo.email} onChange={(e) => updatePersonalInfo('email', e.target.value)} />
            <Input label="Phone Number" value={data.personalInfo.phone} onChange={(e) => updatePersonalInfo('phone', e.target.value)} />
            <Input label="City" value={data.personalInfo.city} onChange={(e) => updatePersonalInfo('city', e.target.value)} />
            <Input label="Country" value={data.personalInfo.country} onChange={(e) => updatePersonalInfo('country', e.target.value)} />
            
            <div className="md:col-span-2 pt-4 border-t border-slate-200 mt-2">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Detailed Info (Optional - used in BD/Asian templates)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Father's Name" value={data.personalInfo.fathersName} onChange={(e) => updatePersonalInfo('fathersName', e.target.value)} />
                <Input label="Mother's Name" value={data.personalInfo.mothersName} onChange={(e) => updatePersonalInfo('mothersName', e.target.value)} />
                <Input label="Date of Birth" placeholder="DD/MM/YYYY" value={data.personalInfo.dateOfBirth} onChange={(e) => updatePersonalInfo('dateOfBirth', e.target.value)} />
                <Input label="Nationality" value={data.personalInfo.nationality} onChange={(e) => updatePersonalInfo('nationality', e.target.value)} />
                <Input label="Religion" value={data.personalInfo.religion} onChange={(e) => updatePersonalInfo('religion', e.target.value)} />
                <Input label="Marital Status" value={data.personalInfo.maritalStatus} onChange={(e) => updatePersonalInfo('maritalStatus', e.target.value)} />
                <Input label="Blood Group" value={data.personalInfo.bloodGroup} onChange={(e) => updatePersonalInfo('bloodGroup', e.target.value)} />
              </div>
            </div>

            <div className="md:col-span-2 pt-4 border-t border-slate-200 mt-2">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="LinkedIn" value={data.personalInfo.linkedin} onChange={(e) => updatePersonalInfo('linkedin', e.target.value)} />
                <Input label="Website" value={data.personalInfo.website} onChange={(e) => updatePersonalInfo('website', e.target.value)} />
                <Input label="GitHub" value={data.personalInfo.github} onChange={(e) => updatePersonalInfo('github', e.target.value)} />
              </div>
            </div>
          </div>
        </Accordion>
        )}

        {!data.settings.hiddenSections?.includes('summary') && (
        <Accordion title="Professional Summary">
           <Textarea 
             placeholder="Write a brief professional summary..."
             value={data.summary}
             onChange={(e) => updateSummary(e.target.value)}
             className="min-h-[120px]"
            />
         </Accordion>
         )}

         {!data.settings.hiddenSections?.includes('experience') && (
        <Accordion title="Work Experience">
          <div className="space-y-6">
            {(data.experience || []).map((exp, index) => (
              <div key={exp.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg relative group">
                <button 
                  onClick={() => removeListItem('experience', exp.id)}
                  className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-2">
                  <Input label="Job Title" value={exp.jobTitle} onChange={(e) => updateListItem('experience', exp.id, 'jobTitle', e.target.value)} />
                  <Input label="Employer" value={exp.employer} onChange={(e) => updateListItem('experience', exp.id, 'employer', e.target.value)} />
                  <Input label="Start Date" type="month" value={exp.startDate} onChange={(e) => updateListItem('experience', exp.id, 'startDate', e.target.value)} />
                  <Input label="End Date" type="month" value={exp.endDate} onChange={(e) => updateListItem('experience', exp.id, 'endDate', e.target.value)} disabled={exp.isCurrent} />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <input 
                    type="checkbox" 
                    id={`current-${exp.id}`}
                    checked={exp.isCurrent}
                    onChange={(e) => updateListItem('experience', exp.id, 'isCurrent', e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`current-${exp.id}`} className="text-sm text-slate-700">I currently work here</label>
                </div>
                <Textarea 
                  label="Description" 
                  value={exp.description} 
                  onChange={(e) => updateListItem('experience', exp.id, 'description', e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                  className="min-h-[100px]"
                />
              </div>
            ))}
            
            <button 
              onClick={() => addListItem('experience', { jobTitle: '', employer: '', city: '', country: '', startDate: '', endDate: '', isCurrent: false, description: '' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 font-medium hover:border-slate-400 hover:text-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Experience
            </button>
          </div>
        </Accordion>
        )}

        {!data.settings.hiddenSections?.includes('education') && (
        <Accordion title="Education">
          <div className="space-y-6">
            {(data.education || []).map((edu) => (
              <div key={edu.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg relative group">
                <button 
                  onClick={() => removeListItem('education', edu.id)}
                  className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-2">
                  <Input label="School/University" value={edu.school} onChange={(e) => updateListItem('education', edu.id, 'school', e.target.value)} />
                  <Input label="Degree" value={edu.degree} onChange={(e) => updateListItem('education', edu.id, 'degree', e.target.value)} />
                  <Input label="Start Date" type="month" value={edu.startDate} onChange={(e) => updateListItem('education', edu.id, 'startDate', e.target.value)} />
                  <Input label="End Date" type="month" value={edu.endDate} onChange={(e) => updateListItem('education', edu.id, 'endDate', e.target.value)} disabled={edu.isCurrent} />
                </div>
                <Textarea 
                  label="Description (Optional)" 
                  value={edu.description} 
                  onChange={(e) => updateListItem('education', edu.id, 'description', e.target.value)}
                  placeholder="GPA, Honors, Extracurriculars..."
                />
              </div>
            ))}
            
            <button 
              onClick={() => addListItem('education', { school: '', degree: '', fieldOfStudy: '', city: '', country: '', startDate: '', endDate: '', isCurrent: false, description: '' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 font-medium hover:border-slate-400 hover:text-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Education
            </button>
          </div>
        </Accordion>
        )}

        {!data.settings.hiddenSections?.includes('projects') && (
        <Accordion title="Projects">
          <div className="space-y-6">
            {(data.projects || []).map((proj) => (
              <div key={proj.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg relative group">
                <button 
                  onClick={() => removeListItem('projects', proj.id)}
                  className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-2">
                  <Input label="Project Title" value={proj.title} onChange={(e) => updateListItem('projects', proj.id, 'title', e.target.value)} />
                  <Input label="Subtitle / Role" value={proj.subtitle} onChange={(e) => updateListItem('projects', proj.id, 'subtitle', e.target.value)} />
                  <Input label="Start Date" type="month" value={proj.startDate} onChange={(e) => updateListItem('projects', proj.id, 'startDate', e.target.value)} />
                  <Input label="End Date" type="month" value={proj.endDate} onChange={(e) => updateListItem('projects', proj.id, 'endDate', e.target.value)} />
                  <div className="md:col-span-2">
                    <Input label="Project Link" value={proj.link} onChange={(e) => updateListItem('projects', proj.id, 'link', e.target.value)} placeholder="https://" />
                  </div>
                </div>
                <Textarea 
                  label="Description" 
                  value={proj.description} 
                  onChange={(e) => updateListItem('projects', proj.id, 'description', e.target.value)}
                  placeholder="Describe the project, technologies used, and your contribution..."
                  className="min-h-[100px]"
                />
              </div>
            ))}
            
            <button 
              onClick={() => addListItem('projects', { title: '', subtitle: '', description: '', link: '', startDate: '', endDate: '' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 font-medium hover:border-slate-400 hover:text-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Project
            </button>
          </div>
        </Accordion>
        )}

        {!data.settings.hiddenSections?.includes('skills') && (
        <Accordion title="Skills">
          <div className="space-y-4">
            {(data.skills || []).map(skill => (
              <div key={skill.id} className="flex items-center gap-4">
                <div className="flex-1">
                  <Input 
                    value={skill.name} 
                    onChange={(e) => updateListItem('skills', skill.id, 'name', e.target.value)} 
                    placeholder="e.g. JavaScript, Public Speaking" 
                  />
                </div>
                <div className="w-32">
                  <select 
                    value={skill.level}
                    onChange={(e) => updateListItem('skills', skill.id, 'level', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <button 
                  onClick={() => removeListItem('skills', skill.id)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            <button 
              onClick={() => addListItem('skills', { name: '', level: 'Intermediate' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 font-medium hover:border-slate-400 hover:text-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Skill
            </button>
          </div>
        </Accordion>
        )}

        {!data.settings.hiddenSections?.includes('languages') && (
        <Accordion title="Languages">
          <div className="space-y-4">
            {(data.languages || []).map(language => (
              <div key={language.id} className="flex items-center gap-4">
                <div className="flex-1">
                  <Input 
                    value={language.name} 
                    onChange={(e) => updateListItem('languages', language.id, 'name', e.target.value)} 
                    placeholder="e.g. English, Bengali" 
                  />
                </div>
                <div className="w-32">
                  <select 
                    value={language.proficiency}
                    onChange={(e) => updateListItem('languages', language.id, 'proficiency', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Conversational">Conversational</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native">Native</option>
                  </select>
                </div>
                <button 
                  onClick={() => removeListItem('languages', language.id)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button 
              onClick={() => addListItem('languages', { name: '', proficiency: 'Fluent' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 font-medium hover:border-slate-400 hover:text-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Language
            </button>
          </div>
        </Accordion>
        )}

        {!data.settings.hiddenSections?.includes('certifications') && (
        <Accordion title="Certifications">
          <div className="space-y-6">
            {(data.certifications || []).map((cert) => (
              <div key={cert.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg relative group">
                <button 
                  onClick={() => removeListItem('certifications', cert.id)}
                  className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-2">
                  <Input label="Certification Name" value={cert.name} onChange={(e) => updateListItem('certifications', cert.id, 'name', e.target.value)} />
                  <Input label="Issuer Organization" value={cert.issuer} onChange={(e) => updateListItem('certifications', cert.id, 'issuer', e.target.value)} />
                  <Input label="Date Obtained" type="month" value={cert.date} onChange={(e) => updateListItem('certifications', cert.id, 'date', e.target.value)} />
                  <Input label="Link (Optional)" value={cert.link} onChange={(e) => updateListItem('certifications', cert.id, 'link', e.target.value)} />
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => addListItem('certifications', { name: '', issuer: '', date: '', link: '' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 font-medium hover:border-slate-400 hover:text-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Certification
            </button>
          </div>
        </Accordion>
        )}

        {!data.settings.hiddenSections?.includes('references') && (
        <Accordion title="References">
          <div className="space-y-6">
            {(data.references || []).map((ref) => (
              <div key={ref.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg relative group">
                <button 
                  onClick={() => removeListItem('references', ref.id)}
                  className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-2">
                  <Input label="Reference Name" value={ref.name} onChange={(e) => updateListItem('references', ref.id, 'name', e.target.value)} />
                  <Input label="Designation / Job Title" value={ref.designation} onChange={(e) => updateListItem('references', ref.id, 'designation', e.target.value)} />
                  <Input label="Organization / Company" value={ref.company} onChange={(e) => updateListItem('references', ref.id, 'company', e.target.value)} />
                  <Input label="Phone Number" value={ref.phone} onChange={(e) => updateListItem('references', ref.id, 'phone', e.target.value)} />
                  <div className="md:col-span-2">
                     <Input label="Email Address" type="email" value={ref.email} onChange={(e) => updateListItem('references', ref.id, 'email', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => addListItem('references', { name: '', designation: '', company: '', email: '', phone: '' })}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 font-medium hover:border-slate-400 hover:text-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Reference
            </button>
          </div>
        </Accordion>
        )}

        {/* Custom Sections */}
        {(data.customSections || []).map(section => (
          <Accordion key={section.id} title={section.title || 'Custom Section'} defaultOpen>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1">
                <Input 
                  label="Section Title" 
                  value={section.title} 
                  onChange={(e) => updateListItem('customSections', section.id, 'title', e.target.value)} 
                />
              </div>
              <button 
                onClick={() => removeListItem('customSections', section.id)}
                className="mt-6 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                title="Delete Section"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-6">
              {(section.items || []).map(item => (
                <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg relative group">
                  <button 
                    onClick={() => removeCustomSectionItem(section.id, item.id)}
                    className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-2">
                    <Input label="Item Title" value={item.title} onChange={(e) => updateCustomSectionItem(section.id, item.id, 'title', e.target.value)} />
                    <Input label="Subtitle" value={item.subtitle} onChange={(e) => updateCustomSectionItem(section.id, item.id, 'subtitle', e.target.value)} />
                    <div className="md:col-span-2">
                      <Input label="Date or Duration" value={item.date} onChange={(e) => updateCustomSectionItem(section.id, item.id, 'date', e.target.value)} placeholder="e.g. 2022 - Present" />
                    </div>
                  </div>
                  <Textarea 
                    label="Description" 
                    value={item.description} 
                    onChange={(e) => updateCustomSectionItem(section.id, item.id, 'description', e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              ))}
              <button 
                onClick={() => {
                  // addCustomSectionItem doesn't exist in useResume directly yet, wait I added it!
                  addCustomSectionItem(section.id, { title: '', subtitle: '', description: '', date: '' })
                }}
                className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 font-medium hover:border-slate-400 hover:text-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
          </Accordion>
        ))}

        <div className="p-6 pt-2">
          <button 
            onClick={() => addListItem('customSections', { title: 'New Custom Section', items: [] })}
            className="w-full py-3 border-2 border-blue-200 bg-blue-50 text-blue-600 rounded-lg font-medium hover:border-blue-300 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Custom Section
          </button>
        </div>
      </div>
    </div>
  );
}
