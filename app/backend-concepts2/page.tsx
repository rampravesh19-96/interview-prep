"use client";

import { useEffect, useMemo, useState } from "react";
import {
  architectureDiagram,
  backendConcepts,
  learningChecklist,
  type ContentBlock,
} from "@/data/backendConcepts";

const STORAGE_KEY = "backend-concepts-progress-v1";
const ANSWERS_KEY = "backend-concepts-answers-v1";

export default function BackendConceptsPage() {
  const [current, setCurrent] = useState(0);
  const [search, setSearch] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState<number[]>([]);
  const [showReview, setShowReview] = useState(false);
  const [showDiagram, setShowDiagram] = useState(true);
  const [showChecklist, setShowChecklist] = useState(true);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const topic = backendConcepts[current];
  const pageSize = 5;
  const pageStart = Math.floor(current / pageSize) * pageSize;
  const pageEnd = Math.min(pageStart + pageSize, backendConcepts.length);

  const visibleNumbers = Array.from(
    { length: pageEnd - pageStart },
    (_, index) => pageStart + index
  );

  const filteredTopics = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return backendConcepts;

    return backendConcepts.filter((item) => {
      const searchable = [
        item.title,
        item.category,
        item.question ?? "",
        ...item.blocks.map((block) =>
          block.type === "table"
            ? [...block.headers, ...block.rows.flat()].join(" ")
            : block.type === "list" || block.type === "steps" || block.type === "diagram"
              ? block.items?.join(" ") ?? block.lines?.join(" ") ?? ""
              : block.text
        ),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [search]);

  useEffect(() => {
    try {
      const savedCompleted = localStorage.getItem(STORAGE_KEY);
      const savedAnswers = localStorage.getItem(ANSWERS_KEY);
      const savedChecklist = localStorage.getItem(
        "backend-concepts-checklist-v1"
      );

      if (savedCompleted) {
        const parsed = JSON.parse(savedCompleted);
        if (Array.isArray(parsed)) setCompleted(parsed);
      }

      if (savedAnswers) {
        const parsed = JSON.parse(savedAnswers);
        if (parsed && typeof parsed === "object") setAnswers(parsed);
      }

      if (savedChecklist) {
        const parsed = JSON.parse(savedChecklist);
        if (Array.isArray(parsed)) setCheckedItems(parsed);
      }
    } catch {
      // Invalid localStorage data is ignored.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
    localStorage.setItem(
      "backend-concepts-checklist-v1",
      JSON.stringify(checkedItems)
    );
  }, [completed, answers, checkedItems, hydrated]);

  function goTo(index: number) {
    setCurrent(Math.max(0, Math.min(index, backendConcepts.length - 1)));
    setShowReview(false);
  }

  function toggleCompleted(id: number) {
    setCompleted((previous) =>
      previous.includes(id)
        ? previous.filter((value) => value !== id)
        : [...previous, id]
    );
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text).catch(() => {
      // Clipboard access may be blocked by browser permissions.
    });
  }

  function renderBlock(block: ContentBlock, index: number) {
    if (block.type === "paragraph") {
      return (
        <p
          key={index}
          className="whitespace-pre-wrap text-sm leading-7 text-slate-700 sm:text-base"
        >
          {block.text}
        </p>
      );
    }

    if (block.type === "list" || block.type === "steps") {
      const isSteps = block.type === "steps";

      return (
        <ol
          key={index}
          className={`space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base ${
            isSteps ? "list-decimal" : "list-disc"
          }`}
        >
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ol>
      );
    }

    if (block.type === "diagram") {
      return (
        <pre
          key={index}
          className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm leading-6 text-emerald-300"
        >
          {block.lines.join("\n")}
        </pre>
      );
    }

    if (block.type === "table") {
      return (
        <div key={index} className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-100">
              <tr>
                {block.headers.map((header, headerIndex) => (
                  <th
                    key={headerIndex}
                    className="border-b border-slate-200 px-3 py-3 font-bold text-slate-800"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="align-top even:bg-slate-50">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border-b border-slate-100 px-3 py-3 leading-6 text-slate-700"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return null;
  }

  const answeredCount = Object.values(answers).filter((answer) =>
    answer.trim()
  ).length;

  const progress = Math.round(
    (completed.length / backendConcepts.length) * 100
  );

  return (
    <main className="min-h-screen bg-slate-100 px-3 py-4 text-slate-900 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                Backend Engineering Interview Prep
              </p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Backend Concepts & Scenario Questions
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Concepts, practical scenarios aur senior-level interview
                questions. Apne answers likho aur progress save rakho.
              </p>
            </div>

            <div className="min-w-40 rounded-xl bg-slate-50 p-3">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Topics completed</span>
                <span>
                  {completed.length}/{backendConcepts.length}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {hydrated ? "Progress saved locally" : "Loading progress…"}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowDiagram((value) => !value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              {showDiagram ? "Hide architecture diagram" : "Show architecture diagram"}
            </button>
            <button
              type="button"
              onClick={() => setShowChecklist((value) => !value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              {showChecklist ? "Hide learning checklist" : "Show learning checklist"}
            </button>
            <button
              type="button"
              onClick={() => setShowReview((value) => !value)}
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {showReview ? "Hide review" : "Review all answers"}
            </button>
          </div>
        </header>

        {showDiagram && (
          <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-bold">Ye sab ek production application mein kahan fit hote hain?</h2>
            <p className="mt-1 text-sm text-slate-500">
              Ye ek representative architecture hai; har application mein har component zaroori nahi hota.
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {architectureDiagram.map((step, index) => (
                <div key={step} className="flex flex-col items-center">
                  <div className="flex min-h-16 w-full items-center justify-center rounded-xl border border-blue-100 bg-blue-50 p-3 text-center text-sm font-semibold text-blue-950">
                    {step}
                  </div>
                  {index < architectureDiagram.length - 1 && (
                    <span className="py-1 text-xl text-slate-400">↓</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {showChecklist && (
          <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold">Learning checklist</h2>
                <p className="text-sm text-slate-500">
                  {checkedItems.length} / {learningChecklist.length} complete
                </p>
              </div>
              <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width: `${
                      (checkedItems.length / learningChecklist.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {learningChecklist.map((item) => {
                const checked = checkedItems.includes(item.id);

                return (
                  <label
                    key={item.id}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setCheckedItems((previous) =>
                          checked
                            ? previous.filter((id) => id !== item.id)
                            : [...previous, item.id]
                        )
                      }
                      className="mt-1 h-4 w-4 accent-blue-600"
                    />
                    <span>
                      <span className="block text-sm font-semibold">
                        {item.id}. {item.title}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">
                        {item.detail}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>
        )}

        <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-bold">Question navigation</h2>
              <p className="text-xs text-slate-500">
                Ek baar mein 5 question numbers · Green means completed
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Topic search karo…"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 sm:w-64"
            />
          </div>

          {search.trim() ? (
            <div className="flex flex-wrap gap-2">
              {filteredTopics.map((item) => {
                const index = backendConcepts.findIndex(
                  (candidate) => candidate.id === item.id
                );

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      goTo(index);
                      setSearch("");
                    }}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-blue-400 hover:bg-blue-50"
                  >
                    {item.id}. {item.title}
                  </button>
                );
              })}
              {filteredTopics.length === 0 && (
                <p className="p-2 text-sm text-slate-500">
                  Koi matching topic nahi mila.
                </p>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                disabled={pageStart === 0}
                onClick={() => goTo(pageStart - pageSize)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold disabled:opacity-30"
                aria-label="Previous group"
              >
                «
              </button>

              {pageStart > 0 && (
                <button
                  type="button"
                  onClick={() => goTo(pageStart - pageSize)}
                  className="rounded-lg px-2 py-2 text-lg font-bold text-blue-700 hover:bg-blue-50"
                  aria-label="Jump to previous group"
                >
                  …
                </button>
              )}

              {visibleNumbers.map((index) => {
                const item = backendConcepts[index];
                const active = current === index;
                const done = completed.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(index)}
                    title={item.title}
                    aria-current={active ? "step" : undefined}
                    className={`relative h-10 min-w-10 rounded-lg border px-2 text-sm font-bold ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white"
                        : done
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-white text-slate-700 hover:border-blue-400"
                    }`}
                  >
                    {item.id}
                    {done && !active && (
                      <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                    )}
                  </button>
                );
              })}

              {pageEnd < backendConcepts.length && (
                <button
                  type="button"
                  onClick={() => goTo(pageEnd)}
                  className="rounded-lg px-2 py-2 text-lg font-bold text-blue-700 hover:bg-blue-50"
                  aria-label="Jump to next group"
                >
                  …
                </button>
              )}

              <button
                type="button"
                disabled={pageEnd >= backendConcepts.length}
                onClick={() => goTo(pageEnd)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold disabled:opacity-30"
                aria-label="Next group"
              >
                »
              </button>
            </div>
          )}
        </section>

        <section className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0 space-y-4">
            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-800">
                  Topic {topic.id} / {backendConcepts.length}
                </span>

                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {topic.category}
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-extrabold leading-snug">
                {topic.title}
              </h2>

              <div className="mt-5 space-y-4">
                {topic.blocks.map((block, index) =>
                  renderBlock(block, index)
                )}
              </div>

              {topic.question && (
                <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-800">
                    Interview question
                  </h3>
                  <p className="text-sm font-semibold leading-7 text-slate-800 sm:text-base">
                    {topic.question}
                  </p>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    toggleCompleted(topic.id)
                  }
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                    completed.includes(topic.id)
                      ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
                >
                  {completed.includes(topic.id)
                    ? "✓ Completed"
                    : "Mark completed"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    copyText(
                      [
                        `${topic.id}. ${topic.title}`,
                        ...topic.blocks.map((block) =>
                          block.type === "paragraph"
                            ? block.text
                            : block.type === "table"
                              ? [
                                  block.headers.join(" | "),
                                  ...block.rows.map((row) => row.join(" | ")),
                                ].join("\n")
                              : block.type === "diagram"
                                ? block.lines.join("\n")
                                : block.items.join("\n"),
                        ),
                        topic.question ?? "",
                      ].join("\n\n")
                    )
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                >
                  Copy topic
                </button>
              </div>
            </article>

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <label htmlFor="my-answer" className="font-bold">
                  Mera interview answer
                </label>
                <span className="text-xs text-slate-500">
                  Autosaved locally
                </span>
              </div>

              <textarea
                id="my-answer"
                value={answers[topic.id] ?? ""}
                onChange={(event) =>
                  setAnswers((previous) => ({
                    ...previous,
                    [topic.id]: event.target.value,
                  }))
                }
                placeholder="Apna answer yahan likho…"
                className="min-h-40 w-full resize-y rounded-xl border border-slate-300 p-3 text-sm leading-6 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => copyText(answers[topic.id] ?? "")}
                  disabled={!(answers[topic.id] ?? "").trim()}
                  className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-30"
                >
                  Copy my answer
                </button>

                <button
                  type="button"
                  onClick={() => setShowReview(true)}
                  className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-100"
                >
                  Review all answers
                </button>
              </div>
            </section>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <button
                type="button"
                disabled={current === 0}
                onClick={() => goTo(current - 1)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold disabled:opacity-30"
              >
                ← Previous
              </button>

              <span className="text-xs text-slate-500">
                {current + 1} / {backendConcepts.length}
              </span>

              <button
                type="button"
                disabled={current === backendConcepts.length - 1}
                onClick={() => goTo(current + 1)}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-30"
              >
                Next →
              </button>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-4">
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="font-bold">Progress overview</h3>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-emerald-50 p-3">
                  <p className="text-xs text-emerald-800">Completed</p>
                  <p className="mt-1 text-2xl font-extrabold text-emerald-900">
                    {completed.length}
                  </p>
                </div>
                <div className="rounded-xl bg-blue-50 p-3">
                  <p className="text-xs text-blue-800">Answers written</p>
                  <p className="mt-1 text-2xl font-extrabold text-blue-900">
                    {answeredCount}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="font-bold">Jump to a topic</h3>
              <div className="mt-3 max-h-[50vh] space-y-1 overflow-y-auto pr-1">
                {backendConcepts.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(index)}
                    className={`flex w-full items-start gap-2 rounded-lg p-2 text-left text-sm ${
                      current === index
                        ? "bg-blue-50 font-semibold text-blue-800"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="min-w-6 font-bold">{item.id}.</span>
                    <span>{item.title}</span>
                    {completed.includes(item.id) && (
                      <span className="ml-auto text-emerald-600">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </section>

        {showReview && (
          <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold">Review all answers</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Kisi topic par click karke answer edit kar sakte ho.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowReview(false)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {backendConcepts.map((item, index) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-slate-200 p-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-bold">
                      {item.id}. {item.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        goTo(index);
                        setShowReview(false);
                      }}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-50"
                    >
                      Edit answer
                    </button>
                  </div>

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    {answers[item.id]?.trim() || "Abhi answer nahi likha."}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        <footer className="py-5 text-center text-xs text-slate-500">
          Backend interview practice · {backendConcepts.length} topics · Tailwind CSS
        </footer>
      </div>
    </main>
  );
}