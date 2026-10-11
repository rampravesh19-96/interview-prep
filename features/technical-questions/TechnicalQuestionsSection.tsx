"use client";

import { useState } from "react";
import { CopyButton } from "../../components/ui/CopyButton";
import type { TechnicalContentBlock, TechnicalQuestion } from "../../types/interview";
import { closureQuestion } from "./javascript/closures.data";
import { curryingQuestion } from "./javascript/currying.data";
import { higherOrderFunctionsQuestion } from "./javascript/higher-order-functions.data";
import { generatorsQuestion } from "./javascript/generators.data";
import { iteratorsQuestion } from "./javascript/iterators.data";
import { prototypesInheritanceQuestion } from "./javascript/prototypes-inheritance.data";
import { shallowVsDeepCopyQuestion } from "./javascript/shallow-vs-deep-copy.data";
import { debounceThrottleComparison } from "./javascript/debounce-throttle-comparison.data";
import { debouncingQuestion } from "./javascript/debouncing.data";
import { throttlingQuestion } from "./javascript/throttling.data";

const questions: TechnicalQuestion[] = [closureQuestion, debouncingQuestion, throttlingQuestion, curryingQuestion, higherOrderFunctionsQuestion, prototypesInheritanceQuestion, shallowVsDeepCopyQuestion, generatorsQuestion, iteratorsQuestion];

export function TechnicalQuestionsSection() {
  const [selectedId, setSelectedId] = useState("closures");
  const question = questions.find((item) => item.id === selectedId) ?? closureQuestion;
  const isTimingTopic = question.id === "debouncing" || question.id === "throttling";

  return (
    <div className="technical-layout">
      <aside className="technical-sidebar" aria-label="Technical question topics">
        <span className="eyebrow">TOPICS</span>
        <div className="technical-category">
          <div className="category-label"><CodeIcon />JavaScript<span>{questions.length}</span></div>
          {questions.map((item) => <button className={`technical-topic ${selectedId === item.id ? "active" : ""}`} aria-pressed={selectedId === item.id} key={item.id} type="button" onClick={() => setSelectedId(item.id)}><span className="topic-indicator" />{topicLabel(item.id)}</button>)}
        </div>
      </aside>

      <article className="technical-content" aria-labelledby={`question-${question.id}`}>
        <section className="technical-question-card">
          <div className="question-kicker"><span className="question-icon"><CodeIcon /></span><span>JAVASCRIPT <span className="kicker-divider">/</span> {topicLabel(question.id).toUpperCase()}</span></div>
          <h2 id={`question-${question.id}`}>{question.question}</h2>
          <div className="definition-block"><span className="eyebrow">{question.definitionItems ? "SIMPLE DEFINITIONS" : "SIMPLE INTERVIEW DEFINITION"}</span>{question.definitionItems ? <div className="definition-items">{question.definitionItems.map((item) => <p key={item.label}><strong>{item.label}:</strong> “{item.text}”</p>)}</div> : <p>“{question.definition}”</p>}</div>
          <div className="memory-line"><span className="memory-spark" aria-hidden="true">✳</span>{question.memoryLines ? <div className="memory-line-list">{question.memoryLines.map((item) => <span key={item.label}><small>{item.label}</small><strong>“{item.text}”</strong></span>)}</div> : <span><small>KEEP IT SIMPLE</small><strong>“{question.memoryLine}”</strong></span>}</div>
        </section>

        {question.contentSections?.map((section, index) => <section className="prototype-content-card" key={section.title} aria-labelledby={`prototype-section-${index}`}>
          <div className="technical-section-heading"><div><span className="eyebrow">LEARN THE CONCEPT</span><h2 id={`prototype-section-${index}`}>{section.title}</h2></div></div>
          <div className="prototype-content-blocks">{section.blocks.map((block, blockIndex) => <ContentBlock key={`${section.title}-${blockIndex}`} block={block} />)}</div>
        </section>)}

        {question.steps && <section className="learning-steps-card"><div className="technical-section-heading"><div><span className="eyebrow">HOW IT WORKS</span><h2>Simple steps</h2></div></div><ol>{question.steps.map((step, index) => <li key={step}><span className="step-number">{index + 1}</span><span>{step}</span></li>)}</ol></section>}

        <section className="examples-section" aria-label="Code examples">
          <div className="technical-section-heading"><div><span className="eyebrow">SEE IT IN PRACTICE</span><h2>{question.examplesHeading ?? (question.id === "closures" ? "Three useful examples" : "Production examples")}</h2></div><span className="example-count">{String(question.examples.length).padStart(2, "0")} EXAMPLES</span></div>
          <div className="example-list">
            {question.examples.map((example, index) => (
              <article className="example-card" key={example.title}>
                <div className="example-heading"><div className="example-number">0{index + 1}</div><div><span className="eyebrow">EXAMPLE {index + 1}</span><h3>{example.title}</h3></div></div>
                {example.environment && <div className="environment-note"><span className="environment-dot" />{example.environment}</div>}
                <pre className="code-block"><code>{example.code}</code></pre>
                <div className="explanation-block"><span className="eyebrow">SIMPLE EXPLANATION</span><ul>{example.explanations.map((explanation) => <li key={explanation}><span className="explanation-dot" />{explanation}</li>)}</ul></div>
              </article>
            ))}
          </div>
        </section>

        {question.comparison && <section className="currying-comparison" aria-labelledby="topic-comparison-title">
          <div className="technical-section-heading"><div><span className="eyebrow">SIDE BY SIDE</span><h2 id="topic-comparison-title">{question.comparison.title}</h2></div></div>
          <div className="currying-comparison-grid">{question.comparison.examples.map((example, index) => <article className="example-card comparison-example" key={example.title}><div className="example-heading"><div className="example-number">0{index + 1}</div><div><span className="eyebrow">COMPARISON</span><h3>{example.title}</h3></div></div><pre className="code-block"><code>{example.code}</code></pre><div className="explanation-block"><span className="eyebrow">SIMPLE EXPLANATION</span><ul>{example.explanations.map((explanation) => <li key={explanation}><span className="explanation-dot" />{explanation}</li>)}</ul></div></article>)}</div>
          <p className="comparison-summary">{question.comparison.summary}</p>
        </section>}

        {isTimingTopic && <section className="comparison-card" aria-labelledby="comparison-title">
          <div className="technical-section-heading"><div><span className="eyebrow">QUICK COMPARISON</span><h2 id="comparison-title">Debouncing vs Throttling</h2></div></div>
          <div className="comparison-table-wrap"><table className="comparison-table"><thead><tr>{debounceThrottleComparison.headings.map((heading) => <th key={heading} scope="col">{heading}</th>)}</tr></thead><tbody>{debounceThrottleComparison.rows.map(([feature, debounce, throttle]) => <tr key={feature}><th scope="row">{feature}</th><td>{debounce}</td><td>{throttle}</td></tr>)}</tbody></table></div>
          <p className="comparison-summary">“{debounceThrottleComparison.summary}”</p>
        </section>}

        <section className="closure-answer-card" aria-labelledby={`ready-answer-${question.id}`}>
          <div className="technical-section-heading"><div><span className="eyebrow">PUT IT INTO WORDS</span><h2 id={`ready-answer-${question.id}`}>Ready-to-speak answer</h2></div><span className="speak-time">PRACTICE ANSWER</span></div>
          <div className="ready-answer-copy">{question.interviewAnswer.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <div className="card-actions technical-actions"><CopyButton text={question.interviewAnswer} label="Copy answer" /><span className="copy-caption">Copies the complete ready-to-speak answer</span></div>
          <div className="memory-points"><span className="eyebrow">MEMORY POINTS</span><div>{question.memoryPoints.map((point) => <span className="memory-chip" key={point}>{point}</span>)}</div></div>
        </section>

        {question.quickSelfTest && <section className="self-test-card" aria-labelledby="prototype-self-test-title">
          <div className="technical-section-heading"><div><span className="eyebrow">CHECK YOUR UNDERSTANDING</span><h2 id="prototype-self-test-title">Quick self-test</h2></div><span className="example-count">{question.quickSelfTest.length} QUESTIONS</span></div>
          <div className="self-test-list">{question.quickSelfTest.map((item, index) => <details className="self-test-item" key={item.question}><summary><span className="self-test-number">{index + 1}</span>{item.question}<span className="self-test-chevron" aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
        </section>}
      </article>
    </div>
  );
}

function topicLabel(id: string) {
  switch (id) {
    case "closures": return "Closures";
    case "debouncing": return "Debouncing";
    case "throttling": return "Throttling";
    case "currying": return "Currying";
    case "higher-order-functions": return "Higher-Order Functions";
    case "prototypes-inheritance": return "Prototypes & Inheritance";
    case "shallow-vs-deep-copy": return "Shallow copy vs deep copy";
    case "generators": return "Generators";
    case "iterators": return "Iterators";
    default: return id;
  }
}

function ContentBlock({ block }: { block: TechnicalContentBlock }) {
  switch (block.type) {
    case "text":
      return <p className="prototype-text">{block.text}</p>;
    case "list":
      return <ul className="prototype-list">{block.items.map((item) => <li key={item}><span className="explanation-dot" />{item}</li>)}</ul>;
    case "code":
      return <div className="prototype-code-block">{block.label && <span className="prototype-code-label">{block.label}</span>}<pre className="code-block"><code>{block.code}</code></pre>{block.explanations && <div className="explanation-block"><span className="eyebrow">SIMPLE EXPLANATION</span><ul>{block.explanations.map((explanation) => <li key={explanation}><span className="explanation-dot" />{explanation}</li>)}</ul></div>}</div>;
    case "diagram":
      return <div className="prototype-diagram" aria-label={`Prototype chain: ${block.text}`}>{block.text}</div>;
    case "table":
      return <div className="comparison-table-wrap"><table className="comparison-table"><thead><tr>{block.headings.map((heading, index) => <th key={`heading-${index}`} scope="col">{heading}</th>)}</tr></thead><tbody>{block.rows.map((row, rowIndex) => <tr key={`${row[0]}-${rowIndex}`}>{row.map((cell, columnIndex) => columnIndex === 0 ? <th key={`${row[0]}-${columnIndex}`} scope="row">{cell}</th> : <td key={`${row[0]}-${columnIndex}`}>{cell}</td>)}</tr>)}</tbody></table></div>;
  }
}

function CodeIcon() { return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="m6.5 5-5 5 5 5m7-10 5 5-5 5M11.5 3l-3 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
