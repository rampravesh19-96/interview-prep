export type SectionId = "introduction" | "projects";

export type NavigationItem = {
  id: SectionId;
  label: string;
  shortLabel: string;
  icon: "user" | "layers";
};

export type RoleId = "frontend" | "backend" | "fullstack" | "ai";

export type InterviewRole = {
  id: RoleId;
  label: string;
  title: string;
  answer: string;
  cues: string[];
};

export type AnswerContent = {
  paragraphs: string[];
};

export type PracticeNote = {
  title: string;
  detail: string;
};
