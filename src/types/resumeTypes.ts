import { z } from "zod";

export interface EducationItem {
  id: string;
  school: string;
  major: string;
  degree: string;
  startDate: string;
  endDate: string;
  courses?: string;
  gpaOrRanking?: string;
}

export interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
}

export interface InternshipItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  content: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  projectRole?: string;
  startDate?: string;
  endDate?: string;
  description: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: EducationItem[];
  internships: InternshipItem[];
  projects: ProjectItem[];
  advantages: string;
}

const optionalText = z.string().optional();
const educationItemSchema = z.object({ id: z.string(), school: z.string(), major: z.string(), degree: z.string(), startDate: z.string(), endDate: z.string(), courses: optionalText, gpaOrRanking: optionalText });
const internshipItemSchema = z.object({ id: z.string(), company: z.string(), role: z.string(), startDate: z.string(), endDate: z.string(), content: z.string() });
const projectItemSchema = z.object({ id: z.string(), name: z.string(), projectRole: optionalText, startDate: optionalText, endDate: optionalText, description: z.string() });

export const resumeDataSchema = z.object({
  personalInfo: z.object({ name: z.string(), phone: z.string(), email: z.string() }),
  education: z.array(educationItemSchema),
  internships: z.array(internshipItemSchema),
  projects: z.array(projectItemSchema),
  advantages: z.string(),
});
