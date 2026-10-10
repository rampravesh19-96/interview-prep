"use client";

import { useState } from "react";
import type { RoleId } from "../../types/interview";
import { roles } from "./roles.data";
import { projectOverview } from "./project.data";
import { CopyButton } from "../../components/ui/CopyButton";

export function ProjectExperienceSection() {
  const [selectedRole, setSelectedRole] = useState<RoleId>("fullstack");
  const [practice, setPractice] = useState(false);
  const role = roles.find((item) => item.id === selectedRole) ?? roles[0];

  return (
    <div className="project-layout">
      {!practice && <aside className="project-overview" aria-label="Project overview">
        <div className="overview-icon"><LayersIcon /></div>
        <div className="overview-heading"><span className="eyebrow">PROJECT SNAPSHOT</span><h2>{projectOverview.name}</h2></div>
        <p>{projectOverview.description}</p>
        <div className="capability-list" aria-label="Project capabilities">
          {projectOverview.capabilities.map((capability) => <span key={capability}><span className="mini-check">✓</span>{capability}</span>)}
        </div>
        <div className="overview-foot"><span className="tenant-icon"><GridIcon /></span><span><strong>Multi-tenant by design</strong><small>Organization data stays isolated</small></span></div>
      </aside>}

      <section className={`answer-card role-card ${practice ? "practice-card" : ""}`} aria-label="Project answer">
        {!practice && <>
          <div className="role-heading"><div><span className="eyebrow">YOUR ANSWER</span><h2>Choose your focus</h2></div><span className="duration-pill">~60 sec</span></div>
          <div className="role-tabs" role="tablist" aria-label="Choose answer focus">
            {roles.map((item) => <button key={item.id} role="tab" aria-selected={selectedRole === item.id} aria-controls="role-answer" id={`tab-${item.id}`} className={`role-tab ${selectedRole === item.id ? "active" : ""}`} onClick={() => setSelectedRole(item.id)} type="button">{item.label}</button>)}
          </div>
        </>}
        {practice && <div className="practice-heading"><span className="eyebrow">PRACTICE MODE · {role.label.toUpperCase()}</span><button className="button button-secondary" type="button" onClick={() => setPractice(false)}><ExitIcon /> Exit practice</button></div>}
        <div className="role-titleline"><div><h3>{role.title}</h3><span className="role-badge">{role.label}</span></div></div>
        <div className="answer-copy role-answer" role="tabpanel" id="role-answer" aria-labelledby={`tab-${role.id}`}>
          {role.answer.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        {!practice && <>
          <div className="memory-cues"><span className="eyebrow">MEMORY CUES</span><div>{role.cues.map((cue) => <span key={cue}>{cue}</span>)}</div></div>
          <div className="card-actions role-actions"><CopyButton text={role.answer} /><button className="button button-secondary" type="button" onClick={() => setPractice(true)}><FocusIcon /> Practice mode</button></div>
        </>}
      </section>
    </div>
  );
}

function LayersIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>; }
function GridIcon() { return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="12" y="3" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="3" y="12" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="12" y="12" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function FocusIcon() { return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M7 3H4a1 1 0 0 0-1 1v3m10-4h3a1 1 0 0 1 1 1v3M3 13v3a1 1 0 0 0 1 1h3m10-4v3a1 1 0 0 1-1 1h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.6"/></svg>; }
function ExitIcon() { return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="m8 5-5 5 5 5M3 10h9m-3-6h5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
