export type SectionId = "introduction" | "projects" | "technical";

export type NavigationItem = {
  id: SectionId;
  label: string;
  shortLabel: string;
  icon: "user" | "layers" | "code";
};

export type TechnicalExample = {
  title: string;
  code: string;
  explanations: string[];
  environment?: string;
};

export type TechnicalContentBlock =
  | { type: "text"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; code: string; label?: string; explanations?: string[] }
  | { type: "diagram"; text: string }
  | { type: "table"; headings: string[]; rows: string[][] };

export type TechnicalContentSection = {
  title: string;
  blocks: TechnicalContentBlock[];
};

export type TechnicalSelfTestItem = {
  question: string;
  answer: string;
};

export type TechnicalQuestion = {
  id: string;
  question: string;
  definition: string;
  definitionItems?: Array<{ label: string; text: string }>;
  memoryLine: string;
  memoryLines?: Array<{ label: string; text: string }>;
  examples: TechnicalExample[];
  steps?: string[];
  interviewAnswer: string;
  memoryPoints: string[];
  examplesHeading?: string;
  comparison?: {
    title: string;
    examples: TechnicalExample[];
    summary: string;
  };
  contentSections?: TechnicalContentSection[];
  quickSelfTest?: TechnicalSelfTestItem[];
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
