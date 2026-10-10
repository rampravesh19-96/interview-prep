import type { InterviewRole } from "../../types/interview";

export const roles: InterviewRole[] = [
  {
    id: "fullstack",
    label: "Full Stack",
    title: "End-to-end feature delivery",
    answer:
      "I’m a Full Stack Developer, and I work on a B2B customer support and helpdesk application used by multiple organizations. It includes customer and ticket management, assignment and status workflows, comments, user roles, search, filters, and dashboards. Keeping each organization’s data isolated is an important part of the application.\n\nMy Team Lead provides the requirements and decides the technical approach. I take an assigned feature through the application: I build or update the screens with React and Next.js, develop or update the APIs with Node.js and Express.js, and read or write the required data in PostgreSQL. I connect those layers, check validation and error states, and test and debug the feature so it works correctly end to end.\n\nI also have separate experience integrating AI capabilities into document knowledge workflows. That includes working with LLM APIs and RAG, and connecting backend processing to a useful web interface.",
    cues: ["Requirement → UI → API → PostgreSQL", "Tenant isolation", "Test and debug end to end"],
  },
  {
    id: "frontend",
    label: "Frontend-focused",
    title: "User interfaces and API integration",
    answer:
      "I’m a Full Stack Developer with around four years of experience, and I work on a B2B customer support and helpdesk application for multiple organizations. It supports customers and tickets, assignment and status updates, comments, user roles, search, filters, and dashboards, while keeping each organization’s data isolated.\n\nOn the frontend, I use React and Next.js to build reusable components and responsive screens. My work includes forms and validation, state management, and search and filter interfaces. I handle loading, error, and empty states, connect the screens to backend APIs, and make sure the UI responds correctly to the data it receives. I test and debug the assigned features and work with the backend and database parts when needed to make sure the full flow behaves as expected.\n\nSeparately, I have experience integrating AI features using LLM APIs and RAG workflows, including presenting useful results through a web interface. Those AI capabilities are separate from the helpdesk project.",
    cues: ["Reusable React and Next.js UI", "Forms, validation, and API states", "Responsive behavior and integration"],
  },
  {
    id: "backend",
    label: "Backend-focused",
    title: "APIs, workflows, and data",
    answer:
      "I’m a Full Stack Developer with around four years of experience, working on a B2B customer support and helpdesk application used by multiple organizations. The product handles customers, tickets, assignments, status changes, comments, users and roles, search, filters, and dashboards. Since it is multi-tenant, each organization’s data must remain isolated.\n\nFor assigned features, I use Node.js and Express.js to build or update APIs, validate requests, implement business logic, and handle errors. I work with PostgreSQL and SQL queries to read and update application data, including ticket workflows, assignments, statuses, and user roles. I connect the APIs to the frontend screens and test and debug the complete feature. My Team Lead provides the requirements and technical direction, and I implement the work independently.\n\nI also have separate experience connecting LLM APIs and RAG-based document knowledge workflows to backend services and web interfaces.",
    cues: ["Express APIs and request validation", "PostgreSQL and ticket workflows", "Tenant isolation and UI connection"],
  },
  {
    id: "ai",
    label: "AI-focused",
    title: "AI integration with full-stack delivery",
    answer:
      "I’m a Full Stack Developer with around four years of experience, and I also have experience integrating AI capabilities into document knowledge applications. In that work, I have connected LLM APIs with backend services and web interfaces.\n\nA RAG workflow can retrieve relevant document context through embeddings and semantic search, then provide that context to a model as part of a prompt. I focus on connecting those steps through the application so users can submit a request and receive a useful result in the UI. I’m comfortable discussing the integration flow and how the frontend, backend, and retrieved context fit together.\n\nSeparately, I work on a B2B helpdesk application using React, Next.js, Node.js, Express.js, and PostgreSQL. That experience helps me connect AI features to the wider application stack. The AI document knowledge work is separate from the helpdesk project.",
    cues: ["LLM API integration", "Embeddings and semantic retrieval", "Context → model → web UI"],
  },
];
