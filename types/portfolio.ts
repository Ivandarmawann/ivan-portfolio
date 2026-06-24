export type FocusArea = "Web Development" | "Data Analytics" | "Machine Learning";

export type ProjectCategory = "web" | "data" | "machine-learning" | "fullstack-web";

export type ProjectStatus = "completed" | "in-progress" | "planned";

export type ProjectLink = {
  label: string;
  href: string;
  type: "demo" | "repository" | "case-study" | "documentation";
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  image?: string;
  summary: string;
  problem: string;
  solution: string;
  recruiterTakeaway: string;
  role: string;
  techStack: string[];
  highlights: string[];
  links: ProjectLink[];
};

export type SkillCategory =
  | "Programming Languages"
  | "Web Development"
  | "Database"
  | "Data & AI"
  | "Tools";

export type SkillGroup = {
  category: SkillCategory;
  description: string;
  skills: string[];
};

export type ExperienceType =
  | "education"
  | "project"
  | "organization"
  | "training";

export type Experience = {
  title: string;
  organization: string;
  type: ExperienceType;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  image: string;
  status: "completed" | "in-progress";
  summary: string;
  credentialUrl?: string;
};

export type SocialPlatform =
  | "Email"
  | "GitHub"
  | "Phone"
  | "Instagram"
  | "LinkedIn"
  | "Resume"
  | "WhatsApp";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
  username?: string;
  primary?: boolean;
};

export type Profile = {
  name: string;
  role: string;
  headline: string;
  location: string;
  availability: string;
  focusAreas: FocusArea[];
  summary: string;
  recruiterPitch: string;
  keywords: string[];
};
