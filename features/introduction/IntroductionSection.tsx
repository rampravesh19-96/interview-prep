"use client";

import { useState } from "react";
import { introduction } from "./introduction.data";
import { CopyButton } from "../../components/ui/CopyButton";

export function IntroductionSection() {
  const [practice, setPractice] = useState(false);
  const answer = introduction.paragraphs.join("\n\n");

  return (
    <section className={`answer-card ${practice ? "practice-card" : ""}`} aria-labelledby="intro-title">
      <div className="card-topline">
        <div className="answer-label"><span className="label-dot" /> READY TO PRACTICE</div>
        {!practice && <span className="reading-time">About 45 seconds</span>}
      </div>
      <div className="answer-copy" id="intro-title">
        {introduction.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <div className="card-actions">
        <CopyButton text={answer} />
        <button className="button button-secondary" type="button" onClick={() => setPractice((value) => !value)}>
          {practice ? <><ExitIcon /> Exit practice</> : <><FocusIcon /> Practice mode</>}
        </button>
      </div>
      <p className="answer-hint">Tip: Pause briefly between ideas. You don’t need to memorize every word.</p>
    </section>
  );
}

function FocusIcon() { return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M7 3H4a1 1 0 0 0-1 1v3m10-4h3a1 1 0 0 1 1 1v3M3 13v3a1 1 0 0 0 1 1h3m10-4v3a1 1 0 0 1-1 1h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.6"/></svg>; }
function ExitIcon() { return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="m8 5-5 5 5 5M3 10h9m-3-6h5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
