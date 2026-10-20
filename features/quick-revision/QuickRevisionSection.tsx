"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CopyButton } from "../../components/ui/CopyButton";
import { quickRevisionCategories } from "./data";
import type { RevisionTopic } from "./types";
import styles from "./QuickRevisionSection.module.css";

type TopicMatch = { topic: RevisionTopic; categoryTitle: string };

export function QuickRevisionSection() {
  const [activeCategoryId, setActiveCategoryId] = useState(quickRevisionCategories[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const activeCategory = quickRevisionCategories.find((category) => category.id === activeCategoryId) ?? quickRevisionCategories[0];
  const normalizedQuery = search.trim().toLocaleLowerCase();
  const topicCount = quickRevisionCategories.reduce((total, category) => total + category.topics.length, 0);

  const searchMatches = useMemo<TopicMatch[]>(() => {
    if (!normalizedQuery) return [];
    return quickRevisionCategories.flatMap((category) => category.topics
      .filter((topic) => `${topic.title} ${topic.definition} ${topic.example ?? ""}`.toLocaleLowerCase().includes(normalizedQuery))
      .map((topic) => ({ topic, categoryTitle: category.title })));
  }, [normalizedQuery]);

  const visibleTopics: TopicMatch[] = normalizedQuery
    ? searchMatches
    : (activeCategory?.topics ?? []).map((topic) => ({ topic, categoryTitle: activeCategory?.title ?? "" }));
  const allVisibleExpanded = visibleTopics.length > 0 && visibleTopics.every(({ topic }) => expandedIds.has(topic.id));

  function toggleTopic(topicId: string) {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(topicId)) next.delete(topicId);
      else next.add(topicId);
      return next;
    });
  }

  function toggleAll() {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (allVisibleExpanded) visibleTopics.forEach(({ topic }) => next.delete(topic.id));
      else visibleTopics.forEach(({ topic }) => next.add(topic.id));
      return next;
    });
  }

  function selectCategory(categoryId: string) {
    setActiveCategoryId(categoryId);
    setSearch("");
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backLink} href="/">← Back to Interview Prep</Link>
        <p className={styles.eyebrow}>QUICK REVISION</p>
        <h1>Frontend Interview Quick Revision</h1>
        <p className={styles.subtitle}>Short, interview-ready definitions for frontend and full-stack development interviews.</p>
        <div className={styles.stats} aria-label={`${quickRevisionCategories.length} categories and ${topicCount} topics`}>
          <span><strong>{quickRevisionCategories.length}</strong> categories</span>
          <span><strong>{topicCount}</strong> topics</span>
        </div>
        <label className={styles.searchLabel} htmlFor="quick-revision-search">Search topics and definitions</label>
        <div className={styles.searchRow}>
          <input
            id="quick-revision-search"
            className={styles.searchInput}
            type="search"
            placeholder="Try “closures”, “CORS”, or “state”"
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
          {search && <button className={styles.clearButton} type="button" onClick={() => setSearch("")}>Clear</button>}
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Revision categories">
          <div className={styles.sidebarHeading}><span>Categories</span><span>{quickRevisionCategories.length}</span></div>
          <nav className={styles.categoryList}>
            {quickRevisionCategories.map((category) => (
              <button
                className={`${styles.categoryButton} ${!normalizedQuery && activeCategory?.id === category.id ? styles.categoryActive : ""}`}
                type="button"
                key={category.id}
                aria-current={!normalizedQuery && activeCategory?.id === category.id ? "page" : undefined}
                onClick={() => selectCategory(category.id)}
              >
                <span>{category.title}</span><span className={styles.categoryCount}>{category.topics.length}</span>
              </button>
            ))}
          </nav>
        </aside>

        <section className={styles.content} aria-label={normalizedQuery ? "Search results" : activeCategory?.title}>
          <div className={styles.contentHeader}>
            <div>
              <p className={styles.resultEyebrow}>{normalizedQuery ? "SEARCH RESULTS" : "CATEGORY"}</p>
              <h2>{normalizedQuery ? `Results for “${search.trim()}”` : activeCategory?.title}</h2>
              <p className={styles.resultCount}>{normalizedQuery ? `${visibleTopics.length} matching topics` : `${visibleTopics.length} topics to revise`}</p>
            </div>
            {visibleTopics.length > 0 && <button className={styles.expandButton} type="button" onClick={toggleAll}>{allVisibleExpanded ? "Collapse all" : "Expand all"}</button>}
          </div>

          {normalizedQuery && <button className={styles.returnLink} type="button" onClick={() => setSearch("")}>← Clear search and return to the full category list</button>}

          {visibleTopics.length > 0 ? (
            <div className={styles.topicList}>
              {visibleTopics.map(({ topic, categoryTitle }, index) => {
                const isExpanded = expandedIds.has(topic.id);
                const panelId = `revision-topic-${topic.id}`;
                return (
                  <article className={styles.topic} key={topic.id}>
                    <button className={styles.topicToggle} type="button" aria-expanded={isExpanded} aria-controls={panelId} onClick={() => toggleTopic(topic.id)}>
                      <span className={styles.topicIndex}>{String(index + 1).padStart(2, "0")}</span>
                      <span className={styles.topicHeading}><strong>{topic.title}</strong>{normalizedQuery && <small>{categoryTitle}</small>}</span>
                      <span className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ""}`} aria-hidden="true">⌄</span>
                    </button>
                    {isExpanded && <div className={styles.topicBody} id={panelId}>
                      <p>{topic.definition}</p>
                      {topic.example && <pre className={styles.example}><code>{topic.example}</code></pre>}
                      <CopyButton text={[topic.definition, topic.example ? `Example: ${topic.example}` : ""].filter(Boolean).join("\n")} label="Copy definition" />
                    </div>}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <strong>No matching topics</strong>
              <p>Try another keyword or clear your search to browse all categories.</p>
              <button type="button" onClick={() => setSearch("")}>Clear search</button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
