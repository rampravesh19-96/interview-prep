"use client";

import { useState } from "react";
import Link from "next/link";
import type { NavigationItem, SectionId } from "../../types/interview";
import { IntroductionSection } from "../../features/introduction/IntroductionSection";
import { ProjectExperienceSection } from "../../features/project-experience/ProjectExperienceSection";
import { TechnicalQuestionsSection } from "../../features/technical-questions/TechnicalQuestionsSection";

const navigation: NavigationItem[] = [
  { id: "introduction", label: "Introduction", shortLabel: "Introduction", icon: "user" },
  { id: "projects", label: "Project & Responsibilities", shortLabel: "Project & Responsibilities", icon: "layers" },
  { id: "technical", label: "Technical Questions", shortLabel: "Technical Questions", icon: "code" },
];
const topics = ["React", "Node.js", "SQL", "AI & LLMs"];

export function AppShell() {
  const [section, setSection] = useState<SectionId>("introduction");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isIntro = section === "introduction";
  const isProjects = section === "projects";
  const sectionLabel = isIntro ? "Introduction" : isProjects ? "Project & Responsibilities" : "Technical Questions";
  function navigate(id: SectionId) { setSection(id); setMobileNavOpen(false); }

  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); navigate("introduction"); }} aria-label="Interview Prep home"><span className="brand-mark"><BrandIcon /></span><span>Interview<span className="brand-light">Prep</span></span></a>
      <div className="workspace-label">YOUR WORKSPACE</div>
      <div className="profile-card"><div className="avatar">RS</div><div><strong>Ram Pravesh Singh</strong><span>Full Stack Developer</span></div><span className="profile-dot" aria-label="Personal workspace" /></div>
      <nav className={`main-nav ${mobileNavOpen ? "nav-open" : ""}`} aria-label="Main navigation"><div className="nav-label">PREPARATION</div>{navigation.map((item) => <button type="button" key={item.id} className={`nav-item ${section === item.id ? "selected" : ""}`} aria-current={section === item.id ? "page" : undefined} onClick={() => navigate(item.id)}><NavIcon icon={item.icon} /><span>{item.label}</span>{section === item.id && <span className="nav-active-mark" />}</button>)}<Link className="nav-item" href="/quick-revision"><NavIcon icon="code" /><span>Quick Revision</span></Link></nav>
      <div className="coming-block"><div className="coming-title"><span>COMING LATER</span><span className="soon-dot" /></div><div className="topic-list">{topics.map((topic) => <div key={topic} className="topic-item"><span className="topic-bullet" />{topic}<span className="lock-icon"><LockIcon /></span></div>)}</div><p>More topics, when you’re ready.</p></div>
      <div className="sidebar-footer"><div className="footer-spark">✳</div><span>Made for your next<br />great conversation.</span></div>
    </aside>
    <main className="main-panel" id="home">
      <header className="topbar"><button className="mobile-menu" type="button" aria-label="Toggle navigation" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen((open) => !open)}><MenuIcon /></button><div className="breadcrumbs"><span>My preparation</span><span className="crumb-divider">/</span><strong>{sectionLabel}</strong></div><div className="topbar-right"><span className="session-label"><span className="session-dot" /> PERSONAL SPACE</span><div className="top-avatar">RS</div></div></header>
      <div className="content-wrap">
        <div className="page-heading"><div className="heading-overline"><span className="heading-line" /> INTERVIEW PREPARATION</div><div className="heading-row"><div><h1>{isIntro ? "Your introduction" : isProjects ? "Project, roles & responsibilities" : "Technical questions"}</h1><p>{isIntro ? "A clear, confident way to start the conversation." : isProjects ? "Tell the story of your work, shaped for the role you’re discussing." : "Build clear, ready-to-speak answers one concept at a time."}</p></div>{section !== "technical" && <div className="answer-count"><span className="count-icon"><SparkIcon /></span><span><strong>{isIntro ? "01" : "04"}</strong><small>{isIntro ? "prepared answer" : "role perspectives"}</small></span></div>}</div></div>
        <div className="content-section">{isIntro ? <IntroductionSection /> : isProjects ? <ProjectExperienceSection /> : <TechnicalQuestionsSection />}</div>
        <footer className="page-footer"><span>Take a breath. You know your work.</span><span>Built for practice <span className="footer-heart">✳</span></span></footer>
      </div>
    </main>
  </div>;
}

function BrandIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M6 5.5A2.5 2.5 0 0 1 8.5 3H19v15H8.5A2.5 2.5 0 0 0 6 20.5v-15Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M6 6H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1m4-12h5m-5 4h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>; }
function NavIcon({ icon }: { icon: NavigationItem["icon"] }) { return icon === "user" ? <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M4 17c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> : icon === "layers" ? <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="m10 2.5 7 4-7 4-7-4 7-4Zm-7 8 7 4 7-4m-14 4 7 4 7-4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg> : <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="m6.5 5-5 5 5 5m7-10 5 5-5 5M11.5 3l-3 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function LockIcon() { return <svg aria-hidden="true" viewBox="0 0 16 16" fill="none"><rect x="3.5" y="7" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.2"/></svg>; }
function MenuIcon() { return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>; }
function SparkIcon() { return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="m10 2 1.9 5.7L18 10l-6.1 2.3L10 18l-2.1-5.7L2 10l5.9-2.3L10 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>; }
