"use client";

import { useState } from "react";

type CopyButtonProps = { text: string; label?: string };

export function CopyButton({ text, label = "Copy answer" }: CopyButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copyAnswer() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    window.setTimeout(() => setStatus("idle"), 2600);
  }

  return (
    <div className="copy-wrap">
      <button className="button button-primary" type="button" onClick={copyAnswer}>
        {status === "copied" ? <CheckIcon /> : <CopyIcon />}
        {status === "copied" ? "Copied" : label}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {status === "copied" ? "Answer copied to clipboard." : status === "error" ? "Could not copy. Check browser clipboard permissions." : ""}
      </span>
      {status === "error" && <span className="copy-error" aria-hidden="true">Copy unavailable</span>}
    </div>
  );
}

function CopyIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><rect x="7" y="6" width="9" height="11" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M12 6V4.8A1.8 1.8 0 0 0 10.2 3H5.8A1.8 1.8 0 0 0 4 4.8v7.4A1.8 1.8 0 0 0 5.8 14H7" stroke="currentColor" strokeWidth="1.6"/></svg>;
}

function CheckIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
