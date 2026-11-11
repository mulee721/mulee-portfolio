// ─── Theme ──────────────────────────────────────────────────────────────────
export type Theme = 'dark' | 'light';

// ─── Language ────────────────────────────────────────────────────────────────
export type Language = 'en' | 'am' | 'om';

// ─── Navigation ──────────────────────────────────────────────────────────────
export interface NavItem {
  id: string;
  labelKey: string;
  href: string;
}

// ─── Project ─────────────────────────────────────────────────────────────────
export type ProjectCategory =
  | 'Full-Stack'
  | 'Frontend'
  | 'Backend'
  | 'AI/NLP Research'
  | 'PHP/MySQL';

export type ProjectStatus = 'completed' | 'in-progress' | 'research';

export interface ProjectFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  screenshot?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  screenshot: string;
  gallery: GalleryImage[];
  problem: string;
  solution: string;
  targetUsers: string[];
  features: ProjectFeature[];
  workflow: WorkflowStep[];
  architecture: string;
  challenges: ChallengeItem[];
  results: string;
  githubUrl?: string;
  liveUrl?: string;
  status: ProjectStatus;
  featured: boolean;
}

export interface GalleryImage {
  src: string;
  caption: string;
  alt: string;
}

export interface ChallengeItem {
  challenge: string;
  solution: string;
}

// ─── Skill ───────────────────────────────────────────────────────────────────
export type SkillLevel = 'proficient' | 'learning';

export interface Skill {
  name: string;
  icon?: string;
  level: SkillLevel;
}

export interface SkillCategory {
  id: string;
  titleKey: string;
  skills: Skill[];
}

// ─── Experience ──────────────────────────────────────────────────────────────
export type ExperienceType = 'education' | 'internship' | 'research';

export interface Experience {
  id: string;
  type: ExperienceType;
  institution: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  technologies?: string[];
}

// ─── Service ─────────────────────────────────────────────────────────────────
export interface Service {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  technologies: string[];
}

// ─── Contact Form ────────────────────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}
