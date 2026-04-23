export interface PersonalInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  linkedin: string;
  github: string;
  website: string;
  photoUrl?: string;
  
  // Extended details typically used in South Asian / BD format
  fathersName?: string;
  mothersName?: string;
  dateOfBirth?: string;
  nationality?: string;
  religion?: string;
  maritalStatus?: string;
  bloodGroup?: string;
  passion?: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  employer: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string; // 'Beginner', 'Intermediate', 'Advanced', 'Expert'
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Reference {
  id: string;
  name: string;
  designation: string;
  company: string;
  email: string;
  phone: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  startDate: string;
  endDate: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    date: string;
  }[];
}

export interface ResumeSettings {
  themeColor: string;
  fontFamily: string;
  template: string;
  photoShape?: 'circle' | 'rounded' | 'square';
  sectionTitles: {
    summary: string;
    experience: string;
    education: string;
    projects: string;
    skills: string;
    languages: string;
    certifications: string;
    references: string;
    personalDetails: string;
    declaration: string;
  };
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
  references: Reference[];
  projects: Project[];
  customSections: CustomSection[];
  settings: ResumeSettings;
}
