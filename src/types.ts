export interface Project {
  id: string;
  title: string;
  category: 'Machine Learning' | 'Data Analytics' | 'Web Development' | 'Python Application';
  description: string;
  githubUrl?: string;
  demoUrl?: string; // Optional live link
  techStack: string[];
  features: string[];
  isFeatured?: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  percentageOrCgpa: string;
  period: string;
  location: string;
}

export interface InternshipItem {
  id: string;
  title: string;
  period: string;
  role: string;
  highlights: string[];
}

export interface SkillItem {
  name: string;
  level: number; // Percentage, e.g., 90
  category: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year?: string;
}

export interface GithubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}
