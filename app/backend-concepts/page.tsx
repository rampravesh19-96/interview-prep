
"use client";

import { useMemo, useState } from "react";
import { backendConcepts } from "./content";

export default function BackendConceptsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(backendConcepts.map((item) => item.category))
      ),
    ],
    []
  );

  const filteredConcepts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return backendConcepts.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" ||
        item.category === selectedCategory;

      const searchableText = [
        item.title,
        item.category,
        item.explanation,
        item.example,
        ...item.points,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory &&
        (!query || searchableText.includes(query));
    });
  }, [search, selectedCategory]);

  function toggleExpanded(id: number) {
    setExpandedIds((previous) =>
      previous.includes(id)
        ? previous.filter((itemId) => itemId !== id)
        : [...previous, id]
    );
  }

  function expandAll() {
    setExpandedIds(filteredConcepts.map((item) => item.id));
  }

  function collapseAll() {
    setExpandedIds([]);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Interview preparation
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Backend Development Concepts
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-slate-400">
            Node.js, Express, JavaScript, APIs, databases, security,
            performance and other important backend topics.
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-lg border border-slate-700 px-3 py-2">
              {backendConcepts.length} concepts
            </span>

            <span className="rounded-lg border border-slate-700 px-3 py-2">
              {filteredConcepts.length} results
            </span>
          </div>
        </header>

        <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
          <label
            htmlFor="concept-search"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Search concepts
          </label>

          <input
            id="concept-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search Node.js, event loop, MongoDB..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-3 py-2 text-sm transition ${
                  selectedCategory === category
                    ? "border-cyan-400 bg-cyan-400 text-slate-950"
                    : "border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={expandAll}
              className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"
            >
              Expand all results
            </button>

            <button
              type="button"
              onClick={collapseAll}
              className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"
            >
              Collapse all
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"
            >
              Print concepts
            </button>
          </div>
        </section>

        <section className="space-y-4">
          {filteredConcepts.map((concept, index) => {
            const isExpanded = expandedIds.includes(concept.id);

            return (
              <article
                key={concept.id}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
              >
                <button
                  type="button"
                  onClick={() => toggleExpanded(concept.id)}
                  aria-expanded={isExpanded}
                  className="flex w-full items-start gap-4 p-4 text-left sm:p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-sm font-bold text-cyan-400">
                    {index + 1}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-semibold text-white">
                      {concept.title}
                    </span>

                    <span className="mt-1 inline-block rounded-md bg-slate-800 px-2 py-1 text-xs text-cyan-300">
                      {concept.category}
                    </span>

                    <span className="mt-3 block leading-6 text-slate-400">
                      {concept.explanation}
                    </span>
                  </span>

                  <span className="pt-1 text-xl text-slate-400">
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-800 px-4 pb-5 pt-4 sm:px-5">
                    <h2 className="mb-3 font-semibold text-white">
                      Example
                    </h2>

                    <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-emerald-300">
                      <code>{concept.example}</code>
                    </pre>

                    <h2 className="mb-3 mt-5 font-semibold text-white">
                      Important points
                    </h2>

                    <ul className="space-y-2">
                      {concept.points.map((point, pointIndex) => (
                        <li
                          key={pointIndex}
                          className="flex gap-3 leading-6 text-slate-300"
                        >
                          <span className="text-cyan-400">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}

          {filteredConcepts.length === 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-12 text-center">
              <h2 className="text-lg font-semibold text-white">
                No concepts found
              </h2>

              <p className="mt-2 text-slate-400">
                Try another search term or select a different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-4 rounded-lg bg-cyan-400 px-4 py-2 font-medium text-slate-950"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>

        <footer className="mt-10 border-t border-slate-800 py-5 text-center text-sm text-slate-500">
          Backend Development Interview Notes
        </footer>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }

          main {
            min-height: auto !important;
            background: white !important;
            color: black !important;
            padding: 0 !important;
          }

          main header p,
          main footer,
          main section:first-of-type,
          main article > button > span:last-child {
            display: none !important;
          }

          main article {
            break-inside: avoid;
            border: 1px solid #ccc !important;
            background: white !important;
            color: black !important;
            margin-bottom: 12px !important;
          }

          main article > button {
            padding: 12px !important;
          }

          main article > button span,
          main article h2,
          main article li {
            color: black !important;
          }

          main article > div {
            display: block !important;
            border-color: #ccc !important;
          }

          main pre {
            white-space: pre-wrap !important;
            overflow-wrap: anywhere !important;
            background: white !important;
            color: black !important;
          }

          main code {
            color: black !important;
          }
        }
      `}</style>
    </main>
  );
}
