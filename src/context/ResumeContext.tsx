import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeData } from '../types';

interface ResumeContextType {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  updatePersonalInfo: (field: string, value: string) => void;
  updateSummary: (value: string) => void;
  updateSettings: (field: string, value: string) => void;
  // Generic list operations
  addListItem: (section: keyof Pick<ResumeData, 'experience' | 'education' | 'skills' | 'projects' | 'languages' | 'certifications' | 'references'>, item: any) => void;
  updateListItem: (section: keyof Pick<ResumeData, 'experience' | 'education' | 'skills' | 'projects' | 'languages' | 'certifications' | 'references'>, id: string, field: string, value: any) => void;
  removeListItem: (section: keyof Pick<ResumeData, 'experience' | 'education' | 'skills' | 'projects' | 'languages' | 'certifications' | 'references'>, id: string) => void;
}

const initialData: ResumeData = {
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    jobTitle: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    address: '123 Main St',
    city: 'San Francisco',
    country: 'USA',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    website: 'johndoe.com',
    photoUrl: '',
    fathersName: '',
    mothersName: '',
    dateOfBirth: '',
    nationality: '',
    religion: '',
    maritalStatus: '',
    bloodGroup: '',
  },
  summary: 'Passionate and results-driven software engineer with 5+ years of experience in building scalable web applications. Proficient in React, Node.js, and cloud technologies. Strong problem-solving skills and a team player.',
  experience: [
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      employer: 'Tech Innovations Inc.',
      city: 'San Francisco',
      country: 'USA',
      startDate: '2020-01',
      endDate: '',
      isCurrent: true,
      description: '• Managed a team of 5 frontend developers.\\n• Architected the migration to a micro-frontend architecture.\\n• Improved application loading speed by 40%.',
    },
    {
      id: '2',
      jobTitle: 'Web Developer',
      employer: 'Creative Solutions',
      city: 'Austin',
      country: 'USA',
      startDate: '2017-06',
      endDate: '2019-12',
      isCurrent: false,
      description: '• Developed responsive websites using React and Tailwind CSS.\\n• Collaborated with designers to implement UI/UX best practices.\\n• Integrated RESTful APIs and managed application state.',
    }
  ],
  education: [
    {
      id: '1',
      school: 'University of Technology',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      city: 'New York',
      country: 'USA',
      startDate: '2013-09',
      endDate: '2017-05',
      isCurrent: false,
      description: "GPA: 3.8/4.0. Dean's List. President of the Coding Club.",
    }
  ],
  skills: [
    { id: '1', name: 'React', level: 'Expert' },
    { id: '2', name: 'TypeScript', level: 'Advanced' },
    { id: '3', name: 'Node.js', level: 'Intermediate' },
    { id: '4', name: 'CSS/Tailwind', level: 'Expert' },
  ],
  languages: [],
  certifications: [],
  references: [],
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      subtitle: 'Fullstack Next.js App',
      description: 'Built a complete e-commerce solution with Stripe integration, authentication, and an admin dashboard.',
      link: 'ecommerce-demo.com',
      startDate: '2021-05',
      endDate: '2021-10',
    }
  ],
  customSections: [],
  settings: {
    themeColor: '#3b82f6', // blue-500
    fontFamily: 'Roboto',
    template: 'modern',
    photoShape: 'circle',
    photoPosition: 'right',
    sectionTitles: {
      summary: 'Profile',
      experience: 'Experience',
      education: 'Education',
      projects: 'Projects',
      skills: 'Skills',
      languages: 'Languages',
      certifications: 'Certifications',
      references: 'References',
      personalDetails: 'Personal Details',
      declaration: 'Declaration'
    }
  }
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('worldClassCvData');
      if (savedData) {
        try {
          return JSON.parse(savedData);
        } catch (e) {
          console.error("Failed to parse saved resume data", e);
        }
      }
    }
    return initialData;
  });

  // Save to localStorage whenever data changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('worldClassCvData', JSON.stringify(data));
    }
  }, [data]);

  const updatePersonalInfo = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateSummary = (value: string) => {
    setData(prev => ({ ...prev, summary: value }));
  };

  const updateSettings = (field: string, value: any) => {
    setData(prev => {
      // Handle nested sectionTitles updates
      if (field.startsWith('sectionTitles.')) {
        const titleField = field.split('.')[1];
        return {
          ...prev,
          settings: {
            ...prev.settings,
            sectionTitles: {
              ...prev.settings.sectionTitles,
              [titleField]: value
            }
          }
        };
      }
      return {
        ...prev,
        settings: { ...prev.settings, [field]: value }
      };
    });
  };

  const addListItem = (section: keyof Pick<ResumeData, 'experience' | 'education' | 'skills' | 'projects' | 'languages' | 'certifications' | 'references'>, item: any) => {
    setData(prev => ({
      ...prev,
      [section]: [...(prev[section] as any[]), { ...item, id: Math.random().toString(36).substring(2, 9) }]
    }));
  };

  const updateListItem = (section: keyof Pick<ResumeData, 'experience' | 'education' | 'skills' | 'projects' | 'languages' | 'certifications' | 'references'>, id: string, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeListItem = (section: keyof Pick<ResumeData, 'experience' | 'education' | 'skills' | 'projects' | 'languages' | 'certifications' | 'references'>, id: string) => {
    setData(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).filter(item => item.id !== id)
    }));
  };

  return (
    <ResumeContext.Provider value={{
      data,
      setData,
      updatePersonalInfo,
      updateSummary,
      updateSettings,
      addListItem,
      updateListItem,
      removeListItem
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
