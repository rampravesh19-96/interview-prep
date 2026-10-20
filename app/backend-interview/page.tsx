"use client";

import { useEffect, useMemo, useState } from "react";

type Scenario = {
  title: string;
  scenario: string;
  question: string;
  hint: string;
  approach: string;
};

const scenarios: Scenario[] = [
  {
    title: "Production API Slow Under 10x Traffic",
    scenario:
      "Your API normally handles 1,000 requests per second. After a product launch, traffic increases to 10,000 RPS. Latency rises from 100ms to 4 seconds, and timeouts increase.",
    question:
      "How would you investigate the bottleneck, stabilize production, and make the system scale?",
    hint: "Think about metrics, tracing, saturation, database load, caching, queues, and graceful degradation.",
    approach:
      "1. Check p95/p99 latency, error rate, CPU, memory, network, and dependency metrics.\n2. Use distributed tracing and profiling to locate the slow path.\n3. Mitigate immediately with rate limiting, load shedding, autoscaling, and disabling expensive features if needed.\n4. Inspect DB queries, connection pools, cache hit rate, and downstream dependencies.\n5. Load-test the fix and scale horizontally where appropriate.\n6. Add capacity alerts and load tests to prevent recurrence.",
  },
  {
    title: "Duplicate Payment After Retry",
    scenario:
      "A payment request reaches your service and the payment provider charges the customer. The response gets lost due to a network timeout. The client retries and the customer is charged twice.",
    question:
      "How would you design payment processing so retries do not create duplicate charges?",
    hint: "Consider idempotency keys, unique constraints, provider-side idempotency, and ambiguous outcomes.",
    approach:
      "1. Require a stable idempotency key for each logical payment attempt.\n2. Store the key and request fingerprint under a unique database constraint.\n3. Persist a payment state machine such as pending, succeeded, failed, and unknown.\n4. Pass the same idempotency key to the payment provider when supported.\n5. On timeout, reconcile the existing attempt instead of blindly creating another charge.\n6. Make duplicate requests return the original result and monitor reconciliation failures.",
  },
  {
    title: "Inventory Overselling Race Condition",
    scenario:
      "An e-commerce item has one unit left. Two customers check out at nearly the same time, and both orders succeed because each request reads the stock before either writes the update.",
    question:
      "How would you prevent overselling under concurrent requests?",
    hint: "Think about atomic conditional updates, row locks, optimistic concurrency, and reservation expiry.",
    approach:
      "1. Use an atomic conditional update: decrement stock only when available quantity is greater than zero.\n2. Check the affected row count to determine whether reservation succeeded.\n3. Use transactions for related order and inventory changes.\n4. For more complex flows, create expiring inventory reservations.\n5. Add idempotency to checkout and release expired reservations safely.\n6. Test with concurrent requests and verify invariants.",
  },
  {
    title: "Database Write Succeeds but Queue Publish Fails",
    scenario:
      "An order is saved in MySQL, but the service crashes before publishing the OrderCreated event to the message broker. Downstream services never receive the event.",
    question:
      "How would you guarantee reliable event publication without a distributed transaction?",
    hint: "Think about the Transactional Outbox, at-least-once delivery, and idempotent consumers.",
    approach:
      "1. Write the business record and outbox event in the same database transaction.\n2. Run a publisher that polls or streams unpublished outbox rows.\n3. Publish events and mark them delivered, with retries and backoff.\n4. Expect duplicate publication if a crash occurs after publish but before marking delivered.\n5. Make consumers idempotent using event IDs or inbox/deduplication tables.\n6. Monitor outbox age, retries, and backlog; define retention and cleanup.",
  },
  {
    title: "Redis Down, MySQL Overloaded",
    scenario:
      "Redis becomes unavailable. Your application falls back to MySQL for every cached read, causing database CPU and connection usage to spike. The database begins timing out.",
    question:
      "How would you prevent a cache outage from taking down the entire application?",
    hint: "Consider bounded fallbacks, circuit breakers, request coalescing, and load shedding.",
    approach:
      "1. Avoid an unlimited cache-miss fallback to the database.\n2. Apply concurrency limits and rate limits to fallback reads.\n3. Use circuit breakers and short timeouts for Redis and database calls.\n4. Serve stale data where correctness permits and coalesce identical requests.\n5. Shed non-critical traffic and protect critical database capacity.\n6. Restore Redis carefully, monitor cache warm-up, and test dependency-failure scenarios.",
  },
  {
    title: "Search Service Affects Payment API",
    scenario:
      "Your checkout endpoint calls a search or recommendation service synchronously. When that service slows down, checkout latency rises and payments start failing.",
    question:
      "How would you isolate critical APIs from failures in non-critical dependencies?",
    hint: "Think about critical paths, bulkheads, timeouts, circuit breakers, and asynchronous enrichment.",
    approach:
      "1. Remove search/recommendation from the critical payment path if possible.\n2. Set strict dependency timeouts and use circuit breakers.\n3. Isolate thread pools, connection pools, and concurrency budgets with bulkheads.\n4. Return a checkout response without optional recommendations.\n5. Cache or asynchronously enrich non-critical data.\n6. Track dependency-specific latency and test failure isolation.",
  },
  {
    title: "Docker Deployment Causes 502 Errors",
    scenario:
      "After a new Docker image is deployed, your load balancer starts returning 502 errors. Some containers are running, but requests fail during startup and shutdown.",
    question:
      "How would you investigate and design a safer deployment process?",
    hint: "Consider readiness, liveness, graceful shutdown, startup time, and rolling deployments.",
    approach:
      "1. Inspect load-balancer logs, container logs, exit codes, and health checks.\n2. Confirm the application binds to the expected interface and port.\n3. Add a readiness check that passes only when the app can serve requests.\n4. Configure startup grace periods and appropriate health-check timeouts.\n5. Handle SIGTERM, stop accepting new work, and drain in-flight requests.\n6. Use rolling/canary deployments, automated rollback, and backward-compatible changes.",
  },
  {
    title: "Breaking Database Migration",
    scenario:
      "A deployment renames a database column while old application instances are still running. Those instances begin failing because they still query the old column.",
    question:
      "How would you deploy a schema change with zero or minimal downtime?",
    hint: "Think about expand-and-contract migrations and compatibility between application versions.",
    approach:
      "1. Expand: add the new column or structure without removing the old one.\n2. Deploy code that can read old and new formats as needed.\n3. Backfill data in controlled batches and verify consistency.\n4. Switch reads and writes gradually, using metrics to validate.\n5. Wait until all old application versions are gone.\n6. Contract: remove the old column in a later deployment after backups and verification.",
  },
  {
    title: "Cross-Tenant Data Leakage",
    scenario:
      "Your SaaS platform serves thousands of tenants. A developer forgets to include tenant_id in one database query, exposing one customer's records to another.",
    question:
      "How would you architect the system to reduce cross-tenant data leakage risk?",
    hint: "Consider authorization at the data-access boundary, database constraints, row-level security, and testing.",
    approach:
      "1. Derive tenant identity from authenticated server-side context, not trusted client input.\n2. Centralize tenant-scoped data access and require tenant filters by default.\n3. Use composite keys and constraints that include tenant identity where appropriate.\n4. Consider database row-level security as defense in depth.\n5. Include tenant identity in cache keys and background-job payload validation.\n6. Add cross-tenant negative tests, audit logs, and access-control reviews.",
  },
  {
    title: "Queue Backlog Reaches 2 Million",
    scenario:
      "A background queue grows to two million messages. Consumers cannot keep up, jobs are becoming stale, and retrying jobs adds even more load.",
    question:
      "How would you diagnose and recover the system without making the backlog worse?",
    hint: "Look at arrival rate versus processing rate, poison messages, retry storms, and job priority.",
    approach:
      "1. Measure enqueue rate, completion rate, age of oldest message, and processing latency.\n2. Identify whether the bottleneck is CPU, I/O, downstream limits, or poison messages.\n3. Apply bounded retries with exponential backoff and jitter; use a dead-letter queue.\n4. Increase consumers only if downstream capacity can support them.\n5. Prioritize urgent work and safely discard or compact obsolete jobs when business rules allow.\n6. Make jobs idempotent and alert on backlog age, not just queue depth.",
  },
  {
    title: "MySQL Failover and Stale Reads",
    scenario:
      "The MySQL primary fails and a replica is promoted. Some requests read stale data from another replica, so users briefly see old account balances or order states.",
    question:
      "How would you manage failover and read consistency for critical operations?",
    hint: "Think about replication lag, read-after-write guarantees, primary routing, and reconciliation.",
    approach:
      "1. Define consistency requirements per endpoint and data type.\n2. Route critical read-after-write requests to the primary or use a session consistency mechanism.\n3. Monitor replica lag and avoid stale replicas for consistency-sensitive reads.\n4. Configure safe failover, fencing, and connection refresh to prevent split-brain writes.\n5. Make retry behavior safe and use transaction/version checks where needed.\n6. Reconcile data after failover and test the recovery procedure regularly.",
  },
  {
    title: "SLO and Exhausted Error Budget",
    scenario:
      "Your API has a 99.9% monthly availability SLO. In the middle of the month, most of the error budget has already been consumed due to several incidents.",
    question:
      "How would you use SLOs and error budgets to guide engineering priorities?",
    hint: "Consider user-centric indicators, burn-rate alerts, reliability work, and release policy.",
    approach:
      "1. Define SLIs that reflect user experience, such as successful requests and latency objectives.\n2. Calculate the error budget and monitor fast and slow burn rates.\n3. Investigate recurring failure modes and prioritize fixes with the greatest risk reduction.\n4. If the budget is exhausted, slow risky releases according to an agreed policy.\n5. Preserve urgent security and essential fixes through a documented exception process.\n6. Review incidents and update capacity, testing, and operational practices.",
  },
  {
    title: "N+1 Query Problem",
    scenario:
      "An endpoint returns 100 orders. The application runs one query for the orders and then one additional query for each order's customer, resulting in 101 database queries.",
    question:
      "How would you identify and fix the N+1 query problem without creating a new performance issue?",
    hint: "Think about query tracing, joins, eager loading, batching, pagination, and result size.",
    approach:
      "1. Use query logs, tracing, and ORM instrumentation to identify repeated queries.\n2. Fetch related data in a join or a bounded batch query.\n3. Select only the columns required by the endpoint.\n4. Ensure pagination and indexes keep result sizes bounded.\n5. Check for duplicate rows or expensive joins introduced by eager loading.\n6. Add query-count and latency tests for representative data volumes.",
  },
  {
    title: "Connection Pool Exhaustion",
    scenario:
      "Your Node.js API starts timing out during peak traffic. The database is healthy, but logs show requests waiting for a connection from the application's connection pool.",
    question:
      "How would you find the cause and size the pool safely?",
    hint: "Consider leaked connections, slow queries, concurrency, pool queueing, and total connections across replicas.",
    approach:
      "1. Measure pool utilization, wait time, active connections, and query duration.\n2. Verify every connection and transaction is released, including error paths.\n3. Identify long-running queries and transactions.\n4. Estimate total database connections across all app replicas and workers.\n5. Tune pool size against database capacity rather than increasing it blindly.\n6. Add acquisition timeouts, queue limits, and alerts for pool saturation.",
  },
  {
    title: "Hot Partition / Hot Key",
    scenario:
      "A distributed cache or database is partitioned by customer ID. One extremely active customer generates a disproportionate amount of traffic and overloads a single partition.",
    question:
      "How would you reduce the hotspot while preserving correctness?",
    hint: "Consider key distribution, sharding, caching, partition splitting, and aggregation semantics.",
    approach:
      "1. Confirm the skew using per-partition throughput and latency metrics.\n2. Cache repeated reads and coalesce identical requests where safe.\n3. Revisit the partition key to distribute load more evenly.\n4. Split exceptionally hot entities across buckets when the data model allows it.\n5. Aggregate writes or process them asynchronously if business requirements permit.\n6. Preserve ordering and consistency where required, and test rebalancing procedures.",
  },
  {
    title: "Write Amplification",
    scenario:
      "A service performs a small logical update, but the database and storage layer generate far more physical writes than expected. Write latency and storage costs are increasing.",
    question:
      "How would you diagnose and reduce write amplification?",
    hint: "Consider indexes, update patterns, storage engines, page splits, WAL, and batching.",
    approach:
      "1. Measure logical writes, physical I/O, WAL volume, and index maintenance.\n2. Identify unnecessary or redundant indexes and expensive update patterns.\n3. Reduce frequently changing wide rows or large documents where appropriate.\n4. Batch compatible writes and avoid repeatedly rewriting unchanged data.\n5. Review storage-engine and table design using workload-specific benchmarks.\n6. Validate improvements against durability, recovery, and query-performance requirements.",
  },
  {
    title: "PostgreSQL Table Bloat",
    scenario:
      "A high-update PostgreSQL table grows much larger than expected. Queries slow down, vacuum activity increases, and disk usage keeps rising.",
    question:
      "How would you diagnose table and index bloat and recover safely?",
    hint: "Think about MVCC dead tuples, autovacuum, long transactions, indexes, and operational locking.",
    approach:
      "1. Inspect dead tuples, table/index sizes, vacuum statistics, and query plans.\n2. Check long-running transactions and replication slots that prevent cleanup.\n3. Tune autovacuum thresholds and cost settings based on write volume.\n4. Identify indexes that are bloated or unnecessary.\n5. Choose VACUUM, REINDEX, or an appropriate online maintenance strategy based on impact.\n6. Monitor disk headroom, locks, replication lag, and post-maintenance performance.",
  },
  {
    title: "Schema Design and Historical Data",
    scenario:
      "A business requirement changes the meaning of a field. Existing records use the old meaning, while new records must follow the new rules. Reports need to remain accurate for historical data.",
    question:
      "How would you evolve the schema and preserve historical correctness?",
    hint: "Consider explicit versions, backfills, immutable history, compatibility, and reporting semantics.",
    approach:
      "1. Clarify whether the change is a rename, a new concept, or a change in business meaning.\n2. Avoid silently reinterpreting historical values if that changes their meaning.\n3. Introduce a new field or versioned representation when necessary.\n4. Backfill only when semantics are unambiguous and the migration is reversible or recoverable.\n5. Update writers, readers, and reports through compatible deployment stages.\n6. Validate record counts, historical reports, and rollback procedures.",
  },
  {
    title: "Online Index Creation",
    scenario:
      "A large production table needs a new index to fix a slow query. A normal index build could block writes or consume enough I/O to affect production.",
    question:
      "How would you add the index with minimal downtime and operational risk?",
    hint: "Consider online index creation, lock behavior, disk headroom, replication lag, and validation.",
    approach:
      "1. Confirm the query plan and that the index is likely to help.\n2. Review database-engine support for concurrent or online index creation.\n3. Check disk capacity, I/O load, lock behavior, and replica lag before starting.\n4. Build the index using the appropriate online method for the engine.\n5. Monitor progress, blocking, errors, and workload latency.\n6. Verify the index is valid and the query plan improves before removing any old index.",
  },
  {
    title: "Data Retention and Archival",
    scenario:
      "Your application stores billions of historical events. Storage costs are rising, operational queries are slower, and regulations require some data to be deleted after a defined period.",
    question:
      "How would you design a retention and archival strategy?",
    hint:
      "Think about retention policy, partitioning, archival tiers, legal holds, and verifiable deletion.",
    approach:
      "1. Define retention rules by data category, jurisdiction, and business need.\n2. Partition data by time or another suitable retention dimension.\n3. Move eligible records to cheaper storage in bounded, verifiable batches if retention permits.\n4. Delete expired records safely, respecting legal holds and dependencies.\n5. Define how archived data is queried, restored, encrypted, and access-controlled.\n6. Audit deletion and archival outcomes and monitor storage trends.",
  },
  {
    title: "Direct Object Storage Upload",
    scenario:
      "Users upload large files through your API server. During busy periods, the server runs out of bandwidth and memory while proxying file contents to object storage.",
    question:
      "How would you redesign uploads to scale securely?",
    hint: "Consider presigned URLs, multipart uploads, authorization, checksums, and completion callbacks.",
    approach:
      "1. Have the backend authorize the upload and issue a short-lived presigned URL or multipart upload credentials.\n2. Let the client upload directly to object storage.\n3. Restrict object key, content length, expiry, and allowed operations.\n4. Verify upload completion, checksum, file type, and ownership on the backend.\n5. Scan or quarantine untrusted files before making them available.\n6. Clean up abandoned multipart uploads and incomplete temporary objects.",
  },
  {
    title: "Asynchronous Media Processing",
    scenario:
      "After uploading a video, users expect thumbnails, transcoded versions, and metadata. Processing can take several minutes, and some jobs fail intermittently.",
    question:
      "How would you design a reliable asynchronous media-processing pipeline?",
    hint: "Think about job states, queues, retries, idempotency, worker scaling, and user-visible status.",
    approach:
      "1. Store the original asset and create a durable processing job.\n2. Return an accepted response with a job or asset ID and a status endpoint.\n3. Process through queue-driven workers with bounded concurrency.\n4. Use idempotent job steps, retries with backoff, and a dead-letter workflow.\n5. Track states such as queued, processing, succeeded, and failed.\n6. Scale workers based on backlog age and processing time; notify clients when status changes.",
  },
  {
    title: "Search Index Consistency",
    scenario:
      "A user updates a product name successfully, but search results continue showing the old name for several seconds because the search index is updated asynchronously.",
    question:
      "How would you explain and manage search consistency guarantees?",
    hint: "Consider eventual consistency, outbox events, version numbers, replay, and read-after-write expectations.",
    approach:
      "1. Document that the search index is eventually consistent and define an acceptable delay.\n2. Publish index updates reliably using an outbox or change-data-capture pipeline.\n3. Include record versions or timestamps to prevent older events overwriting newer data.\n4. Make index updates retryable and idempotent.\n5. For immediate read-after-write experiences, temporarily use the source of truth or overlay recent changes.\n6. Monitor indexing lag and support replay or full reindexing.",
  },
  {
    title: "API Versioning and Deprecation",
    scenario:
      "You need to change an API response format, but mobile apps, partner integrations, and older clients cannot all upgrade at the same time.",
    question:
      "How would you evolve the API without breaking existing consumers?",
    hint: "Think about compatibility, versioning strategy, telemetry, migration windows, and contract tests.",
    approach:
      "1. Prefer additive, backward-compatible changes when possible.\n2. Introduce a new API version when a breaking change is unavoidable.\n3. Document migration examples and provide a clear deprecation timeline.\n4. Measure usage by client and version before removing old behavior.\n5. Use contract tests and compatibility checks in CI.\n6. Notify consumers, monitor errors, and retire the old version only after agreed criteria are met.",
  },
  {
    title: "GraphQL Query Abuse",
    scenario:
      "Your GraphQL API exposes nested relationships. A client submits deeply nested queries that trigger thousands of database operations and consume excessive CPU.",
    question:
      "How would you protect the GraphQL service while keeping it flexible?",
    hint: "Consider query complexity, depth limits, batching, pagination, timeouts, and per-client quotas.",
    approach:
      "1. Enforce query depth and complexity limits before execution.\n2. Require bounded pagination for collections and limit response size.\n3. Use DataLoader-style batching and request-scoped caching to reduce N+1 queries.\n4. Apply per-user and per-client rate limits, timeouts, and concurrency budgets.\n5. Persist or allowlist operations for sensitive workloads if appropriate.\n6. Monitor expensive query patterns and test abuse cases.",
  },
  {
    title: "Cursor Pagination at Scale",
    scenario:
      "An API uses offset pagination over a table with tens of millions of rows. Later pages are slow, and new inserts cause records to be duplicated or skipped between pages.",
    question:
      "How would you redesign pagination for large, changing datasets?",
    hint: "Think about keyset pagination, stable ordering, composite cursors, and index alignment.",
    approach:
      "1. Use keyset/cursor pagination instead of large offsets.\n2. Order by a stable, indexed field such as created_at plus a unique ID tie-breaker.\n3. Encode the last seen ordering values into an opaque cursor.\n4. Query records strictly after the cursor using the same ordering.\n5. Define how concurrent inserts and deletes affect traversal; use a snapshot if required.\n6. Validate query plans and cap page size.",
  },
  {
    title: "Resumable CSV Import",
    scenario:
      "Customers upload CSV files containing millions of rows. Imports can fail halfway through due to invalid rows, worker restarts, or downstream database outages.",
    question:
      "How would you build a resumable and observable import pipeline?",
    hint: "Consider staging, checkpoints, chunking, idempotency, validation, and partial-failure semantics.",
    approach:
      "1. Store the original file and create a durable import record.\n2. Validate file structure and process rows in bounded chunks.\n3. Track checkpoints and per-row or per-chunk outcomes.\n4. Use idempotent writes or unique import/row identifiers to make retries safe.\n5. Define whether the import is all-or-nothing or allows partial success.\n6. Provide progress, error reports, retry controls, and metrics for throughput and failure rate.",
  },
  {
    title: "Multi-Region and Data Residency",
    scenario:
      "Your SaaS product needs low latency across regions, but some customers require their data to stay within a specific country. A global service currently stores everything in one region.",
    question:
      "How would you design a multi-region architecture that respects data residency?",
    hint: "Consider tenant placement, control planes, data planes, regional routing, replication, and compliance evidence.",
    approach:
      "1. Classify data and map legal and contractual residency requirements.\n2. Assign tenants to approved regions and enforce placement at provisioning time.\n3. Keep regulated data and backups within permitted boundaries.\n4. Route requests to the tenant's region and prevent accidental cross-region access.\n5. Separate global control-plane metadata from region-bound customer data where permitted.\n6. Define regional disaster recovery, encryption, auditability, and residency verification.",
  },
  {
    title: "Feature Flag Kill Switch",
    scenario:
      "A new feature increases database load and causes elevated errors. The team wants to disable it immediately without deploying a new application build.",
    question:
      "How would you design a safe feature-flag system and emergency kill switch?",
    hint: "Consider local evaluation, cache freshness, default behavior, rollout strategy, and audit logs.",
    approach:
      "1. Evaluate flags efficiently, ideally without a synchronous network call on every request.\n2. Define safe defaults if the flag service is unavailable.\n3. Support rapid disablement with bounded propagation delay.\n4. Keep kill switches independent from the feature's failing dependency when possible.\n5. Use gradual rollouts, targeted cohorts, and automated metric-based rollback.\n6. Record changes, owners, and audit history; test emergency disablement regularly.",
  },
  {
    title: "Disaster Recovery: RPO and RTO",
    scenario:
      "Your primary region becomes unavailable. Leadership expects the service to recover quickly, but the team has never performed a complete regional recovery exercise.",
    question:
      "How would you define and validate the disaster recovery strategy?",
    hint: "Think about RPO, RTO, backups, replication, failover, dependencies, and recovery drills.",
    approach:
      "1. Agree on Recovery Point Objective (acceptable data loss) and Recovery Time Objective (acceptable downtime).\n2. Map dependencies and choose backup, warm standby, or active-active architecture based on business needs.\n3. Verify backups, replication, secrets, DNS, networking, and infrastructure can be restored.\n4. Define who can declare a disaster and authorize failover.\n5. Run realistic recovery drills and measure actual RPO/RTO.\n6. Document gaps, improve automation, and regularly test restoration—not just backup creation.",
  },
  {
    title: "Capacity Planning and Load Testing",
    scenario:
      "A major marketing campaign is expected to bring five times normal traffic next month. Current capacity estimates are based on average traffic and a small staging test.",
    question:
      "How would you estimate capacity and establish confidence before launch?",
    hint: "Consider realistic workload models, peak traffic, saturation, headroom, and dependency limits.",
    approach:
      "1. Build a workload model using peak RPS, request mix, concurrency, payload sizes, and user journeys.\n2. Test with realistic data and production-like dependencies.\n3. Run load, stress, spike, and soak tests while tracking p95/p99 latency and error rates.\n4. Identify saturation points in CPU, memory, pools, databases, queues, and external services.\n5. Estimate required capacity with headroom and validate autoscaling behavior.\n6. Define launch guardrails, rollback triggers, and a live monitoring plan.",
  },
  {
    title: "Node.js Memory Leak",
    scenario:
      "A Node.js service starts with low memory usage, but its memory grows continuously over several hours. Eventually the container is killed and requests become unavailable.",
    question:
      "How would you identify the leak and distinguish it from normal memory pressure?",
    hint: "Consider heap snapshots, retained objects, listeners, caches, buffers, and garbage collection.",
    approach:
      "1. Track RSS, heap used, heap total, external memory, GC activity, and restart patterns.\n2. Reproduce the growth under a controlled workload.\n3. Compare heap snapshots and inspect retained-object paths.\n4. Look for unbounded caches, global collections, listeners, timers, closures, and unreleased resources.\n5. Check Buffer/native memory separately from V8 heap usage.\n6. Fix the retention source, add soak tests and memory alerts, and verify growth stabilizes over time.",
  },
];

const STORAGE_KEY = "backend-interview-32-answers-v1";

export default function BackendInterviewPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    () => scenarios.map(() => "")
  );
  const [hydrated, setHydrated] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showApproach, setShowApproach] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");

  const item = scenarios[current];
  const pageSize = 5;
  const pageStart = Math.floor(current / pageSize) * pageSize;
  const pageEnd = Math.min(pageStart + pageSize, scenarios.length);

  const visibleQuestions = useMemo(
    () => Array.from({ length: pageEnd - pageStart }, (_, i) => pageStart + i),
    [pageStart, pageEnd]
  );

  const answeredCount = answers.filter((answer) => answer.trim().length > 0)
    .length;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setAnswers(
            scenarios.map((_, index) =>
              typeof parsed[index] === "string" ? parsed[index] : ""
            )
          );
        }
      }
    } catch {
      // Ignore invalid localStorage data.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      // The page remains usable if storage is unavailable.
    }
  }, [answers, hydrated]);

  useEffect(() => {
    setShowHint(false);
    setShowApproach(false);
    setCopyMessage("");
  }, [current]);

  function goTo(index: number) {
    setCurrent(Math.max(0, Math.min(index, scenarios.length - 1)));
    setShowReview(false);
  }

  function updateAnswer(value: string) {
    setAnswers((previous) =>
      previous.map((answer, index) => (index === current ? value : answer))
    );
  }

  async function copyText(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage(`${label} copied`);
    } catch {
      setCopyMessage("Copy failed — clipboard permission check karo");
    }
  }

  function buildEvaluationPrompt(index: number) {
    return `You are a senior backend engineering interviewer. Evaluate my answer to the following scenario.

Scenario ${index + 1}: ${scenarios[index].title}

Context:
${scenarios[index].scenario}

Question:
${scenarios[index].question}

My answer:
${answers[index] || "(No answer written yet)"}

Evaluate the answer for:
1. Correctness and technical depth
2. Investigation and debugging strategy
3. Architecture and trade-offs
4. Reliability, scalability, and failure handling
5. Security and data consistency, where relevant
6. Missing edge cases and production concerns

Give:
- Score out of 10
- What I did well
- Important gaps
- Follow-up questions an interviewer might ask
- A stronger senior-level answer
- A concise action plan to improve my answer

Be specific and realistic. Do not give credit for details that I did not mention.`;
  }

  function buildAllAnswers() {
    return scenarios
      .map(
        (scenario, index) =>
          `## ${index + 1}. ${scenario.title}\n\nScenario:\n${scenario.scenario}\n\nQuestion:\n${scenario.question}\n\nMy answer:\n${answers[index] || "(Not answered)"}`
      )
      .join("\n\n---\n\n");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-3 py-3 text-slate-900 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Senior Backend Interview Practice
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              32 production scenarios · Write, review, and improve your answers
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="min-w-24">
              <div className="mb-1 flex justify-between text-xs text-slate-500">
                <span>Progress</span>
                <span>
                  {answeredCount}/{scenarios.length}
                </span>
              </div>
              <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-200 sm:w-36">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{
                    width: `${(answeredCount / scenarios.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
              {hydrated ? "Autosave on" : "Loading…"}
            </span>
          </div>
        </header>

        {/* Question number navigation */}
        <nav
          aria-label="Question navigation"
          className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm"
        >
          <button
            type="button"
            onClick={() => goTo(pageStart - pageSize)}
            disabled={pageStart === 0}
            title="Previous group"
            aria-label="Previous question group"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            «
          </button>

          {pageStart > 0 && (
            <button
              type="button"
              onClick={() => goTo(pageStart - pageSize)}
              title={`Previous group: questions ${Math.max(
                1,
                pageStart - pageSize + 1
              )}–${pageStart}`}
              aria-label="Jump to previous five questions"
              className="rounded-lg px-2 py-2 text-lg font-bold text-blue-600 hover:bg-blue-50"
            >
              …
            </button>
          )}

          {visibleQuestions.map((index) => {
            const isActive = current === index;
            const isAnswered = answers[index].trim().length > 0;

            return (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Question ${index + 1}: ${scenarios[index].title}`}
                aria-current={isActive ? "step" : undefined}
                className={`relative h-9 min-w-9 rounded-lg border px-2 text-sm font-bold transition ${
                  isActive
                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                    : isAnswered
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-400"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {index + 1}
                {isAnswered && !isActive && (
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </button>
            );
          })}

          {pageEnd < scenarios.length && (
            <button
              type="button"
              onClick={() => goTo(pageEnd)}
              title={`Next group: questions ${pageEnd + 1}–${Math.min(
                pageEnd + pageSize,
                scenarios.length
              )}`}
              aria-label="Jump to next five questions"
              className="rounded-lg px-2 py-2 text-lg font-bold text-blue-600 hover:bg-blue-50"
            >
              …
            </button>
          )}

          <button
            type="button"
            onClick={() => goTo(pageEnd)}
            disabled={pageEnd >= scenarios.length}
            title="Next group"
            aria-label="Next question group"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            »
          </button>
        </nav>

        {/* Main content */}
        <section className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0 space-y-3">
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                  Question {current + 1} of {scenarios.length}
                </span>
                <span
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                    answers[current].trim()
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {answers[current].trim() ? "Answered" : "Not answered"}
                </span>
              </div>

              <h2 className="text-xl font-bold leading-snug sm:text-2xl">
                {item.title}
              </h2>

              <div className="mt-4">
                <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Scenario
                </h3>
                <p className="text-sm leading-6 text-slate-700 sm:text-base">
                  {item.scenario}
                </p>
              </div>

              <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/70 p-3">
                <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                  Interview question
                </h3>
                <p className="text-sm font-medium leading-6 text-slate-800 sm:text-base">
                  {item.question}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setShowHint((value) => !value)}
                  aria-expanded={showHint}
                  className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800 transition hover:bg-amber-100"
                >
                  {showHint ? "− Hide Hint" : "+ Show Hint"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowApproach((value) => !value)}
                  aria-expanded={showApproach}
                  className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-800 transition hover:bg-violet-100"
                >
                  {showApproach
                    ? "− Hide Sample Approach"
                    : "+ Sample Approach"}
                </button>
              </div>

              {showHint && (
                <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
                  <strong className="mb-1 block">Hint</strong>
                  {item.hint}
                </div>
              )}

              {showApproach && (
                <div className="mt-3 rounded-lg border border-violet-200 bg-violet-50 p-3">
                  <h3 className="mb-2 text-sm font-bold text-violet-900">
                    Sample senior-level approach
                  </h3>
                  <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
                    {item.approach}
                  </p>
                </div>
              )}
            </article>

            {/* Answer editor */}
            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <label
                  htmlFor="answer"
                  className="text-base font-bold text-slate-900"
                >
                  Your answer
                </label>
                <span className="text-xs text-slate-500">
                  {answers[current].length} characters
                </span>
              </div>

              <textarea
                id="answer"
                value={answers[current]}
                onChange={(event) => updateAnswer(event.target.value)}
                placeholder="Explain your investigation, proposed design, trade-offs, failure handling, and how you would verify the solution…"
                className="min-h-40 w-full resize-y rounded-lg border border-slate-300 bg-white p-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:min-h-44"
              />

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    copyText(answers[current], "Answer")
                  }
                  disabled={!answers[current].trim()}
                  className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Copy Answer
                </button>

                <button
                  type="button"
                  onClick={() =>
                    copyText(buildEvaluationPrompt(current), "Evaluation prompt")
                  }
                  className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800 transition hover:bg-blue-100"
                >
                  Copy Evaluation Prompt
                </button>

                {copyMessage && (
                  <span
                    role="status"
                    className="text-sm font-medium text-emerald-700"
                  >
                    {copyMessage}
                  </span>
                )}
              </div>
            </section>

            {/* Previous / Next */}
            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <button
                type="button"
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              <span className="text-xs text-slate-500 sm:text-sm">
                {current + 1} / {scenarios.length}
              </span>

              <button
                type="button"
                onClick={() => goTo(current + 1)}
                disabled={current === scenarios.length - 1}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-3 lg:sticky lg:top-3">
            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="font-bold text-slate-900">Your progress</h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-xs text-blue-700">Answered</p>
                  <p className="mt-1 text-2xl font-bold text-blue-900">
                    {answeredCount}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-100 p-3">
                  <p className="text-xs text-slate-600">Remaining</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {scenarios.length - answeredCount}
                  </p>
                </div>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{
                    width: `${(answeredCount / scenarios.length) * 100}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Answers are saved in this browser on this device.
              </p>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="font-bold text-slate-900">Review answers</h3>
              <p className="mt-1 text-sm leading-5 text-slate-500">
                Check all your responses in one place.
              </p>

              <button
                type="button"
                onClick={() => setShowReview((value) => !value)}
                className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {showReview ? "Hide All Answers" : "Review All Answers"}
              </button>

              <button
                type="button"
                onClick={() => copyText(buildAllAnswers(), "All answers")}
                className="mt-2 w-full rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-sm font-semibold text-blue-800 transition hover:bg-blue-100"
              >
                Copy All Answers
              </button>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="font-bold text-slate-900">Question groups</h3>
              <div className="mt-3 space-y-1.5">
                {Array.from(
                  { length: Math.ceil(scenarios.length / pageSize) },
                  (_, groupIndex) => {
                    const start = groupIndex * pageSize;
                    const end = Math.min(start + pageSize, scenarios.length);
                    const groupAnswered = answers
                      .slice(start, end)
                      .filter((answer) => answer.trim()).length;
                    const active = current >= start && current < end;

                    return (
                      <button
                        key={groupIndex}
                        type="button"
                        onClick={() => goTo(start)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                          active
                            ? "bg-blue-50 font-semibold text-blue-800"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>
                          Q{start + 1}–{end}
                        </span>
                        <span className="text-xs text-slate-500">
                          {groupAnswered}/{end - start}
                        </span>
                      </button>
                    );
                  }
                )}
              </div>
            </section>
          </aside>
        </section>

        {/* All answers review */}
        {showReview && (
          <section className="mt-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold">Review all 32 answers</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Select any question to edit your answer.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowReview(false)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close review
              </button>
            </div>

            <div className="space-y-3">
              {scenarios.map((scenario, index) => (
                <article
                  key={scenario.title}
                  className="rounded-lg border border-slate-200 p-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-sm font-bold">
                      {index + 1}. {scenario.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        goTo(index);
                        setShowReview(false);
                      }}
                      className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50"
                    >
                      Edit answer
                    </button>
                  </div>

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    {answers[index].trim() || "Not answered yet."}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        <footer className="py-4 text-center text-xs text-slate-500">
          Interview practice workspace · Progress is stored locally in your browser
        </footer>
      </div>
    </main>
  );
}