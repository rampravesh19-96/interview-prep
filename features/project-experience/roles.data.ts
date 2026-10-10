
import type { InterviewRole } from "../../types/interview";

export const roles: InterviewRole[] = [
  {
    id: "frontend",
    label: "Frontend-heavy",
    title: "Frontend emphasis · Full Stack",
    answer: `I have been working on a B2B customer support management application. It is a multi-tenant SaaS platform where different organizations can manage their customers, support tickets and support teams.

The application includes features such as ticket management, ticket assignment, status updates, user roles, search, filtering and dashboards.

My responsibility is to understand requirements from my Team Lead and independently develop assigned features. I work across the frontend, backend and database, including API integration, testing and debugging.

For frontend development, I mainly work with React and Next.js. I build reusable components, manage application state, develop responsive interfaces and integrate backend APIs. I also handle form validation, loading and error states, and UI performance.

I also understand how AI features connect with the frontend. For example, an application can display AI-generated answers and support streaming responses when that functionality is implemented.

I can also work on backend APIs and database operations, so I understand how a feature works from the user interface to the database. My focus is on building a good user experience while delivering complete and maintainable features.`,
    cues: [
      "Project → Features → Independent ownership → React / Next.js → Components and state → API integration → UI performance → AI interface → Backend and database knowledge.",
    ],
  },
  {
    id: "backend",
    label: "Backend-heavy",
    title: "Backend emphasis · Full Stack",
    answer: `I have been working on a B2B customer support management application. It is a multi-tenant SaaS platform where different organizations can manage their customers, support tickets and support teams.

The application includes features such as ticket management, ticket assignment, status updates, user roles, search, filtering and dashboards.

My responsibility is to understand requirements from my Team Lead and independently develop assigned features. I work across the frontend, backend and database and handle implementation, testing and debugging.

For backend development, I mainly work with Node.js and Express.js. I build REST APIs, implement business logic, handle authentication and authorization, validate requests and work with PostgreSQL queries. I also handle API errors and test different request scenarios.

Because this is a multi-tenant application, controlling access to organization-specific data is important. The backend must ensure that users can access only the data they are authorized to see.

I also understand how to integrate LLM APIs and connect AI workflows with backend services. Along with this, I work with React and Next.js on the frontend, which helps me understand the complete flow from the UI to the API and database.`,
    cues: [
      "Project → Features → Independent ownership → Node.js / Express.js → REST APIs → Business logic → Authentication → PostgreSQL → Tenant data access → LLM integration → Frontend knowledge.",
    ],
  },
  {
    id: "fullstack",
    label: "Full Stack",
    title: "Balanced Full Stack",
    answer: `I have been working on a B2B customer support management application. It is a multi-tenant SaaS platform where different organizations can manage their customers, support tickets and support teams.

The application includes features such as ticket management, ticket assignment, status updates, user roles, search, filtering and dashboards.

My responsibility is to understand requirements from my Team Lead and independently develop assigned features. I work on implementation, API integration, database operations, testing and debugging.

On the frontend, I use React and Next.js to build reusable components, create user interfaces and integrate APIs. On the backend, I use Node.js and Express.js to build REST APIs and implement business logic. I use PostgreSQL for database operations.

I take assigned features through the complete development flow, from implementing the UI to connecting the backend, handling database operations and testing the final result. I also debug issues across different layers of the application.

Along with full stack development, I have experience integrating AI-powered features using LLM APIs and RAG-based workflows. I understand how these capabilities can be connected with backend services and the user interface.`,
    cues: [
      "Project → Features → Requirements → React / Next.js → Node.js / Express.js → PostgreSQL → End-to-end development → Testing and debugging → AI integration.",
    ],
  },
  {
    id: "ai",
    label: "AI-focused",
    title: "AI emphasis · Full Stack",
    answer: `I have been working on web application development as a Full Stack Developer. My experience includes React and Next.js on the frontend, Node.js and Express.js on the backend, and PostgreSQL for database operations.

One of the areas I have worked with is AI-powered application functionality. I have experience integrating LLM APIs and working with Retrieval-Augmented Generation, also known as RAG.

In a RAG workflow, relevant information is retrieved from documents and provided to an LLM as context so it can generate an answer based on that information. Embeddings and semantic search help find relevant content.

From a full stack perspective, AI functionality also needs backend integration, request handling and a frontend where users can submit questions and view the generated answers. Depending on the implementation, this can also include streaming responses and source citations.

Along with AI integration, I can work on regular application features using React, Next.js, Node.js, Express.js and PostgreSQL. My focus is on connecting AI capabilities with practical business requirements and delivering a complete working feature.`,
    cues: [
      "Full stack skills → LLM API → RAG → Document retrieval → Embeddings → Semantic search → Backend integration → Frontend results → Streaming and citations if implemented.",
    ],
  },
];
