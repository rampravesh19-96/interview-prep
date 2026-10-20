export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "steps"; items: string[] }
  | { type: "diagram"; lines: string[] };

export type BackendConcept = {
  id: number;
  title: string;
  category: string;
  blocks: ContentBlock[];
  question?: string;
};

export const backendConcepts: BackendConcept[] = [
  {
    id: 1,
    title: "DNS (Domain Name System)",
    category: "Architecture",
    blocks: [
      { type: "paragraph", text: "Domain name ko IP address se resolve karta hai." },
      { type: "paragraph", text: "Example: api.example.com ko us server ke IP address tak pahunchane mein help karta hai." },
    ],
    question: "Browser ko kaise pata chalta hai ki domain kis server par hai?",
  },
  {
    id: 2,
    title: "HTTPS / TLS",
    category: "Architecture",
    blocks: [
      { type: "paragraph", text: "Client aur server ke beech communication encrypt karta hai." },
      { type: "paragraph", text: "Example: Login password network par plain text mein bhejne se bachana." },
    ],
    question: "HTTPS aur HTTP mein kya difference hai?",
  },
  {
    id: 3,
    title: "CDN (Content Delivery Network)",
    category: "Architecture",
    blocks: [
      { type: "paragraph", text: "Images, CSS, JavaScript aur doosra cache-able content users ke paas ke servers se deliver karta hai." },
      { type: "paragraph", text: "Example: India ka user image India ke nearby CDN location se load kar sakta hai, origin server se har baar nahi." },
    ],
    question: "CDN website ko fast kaise banata hai?",
  },
  {
    id: 4,
    title: "Caching (Redis)",
    category: "Architecture",
    blocks: [
      { type: "paragraph", text: "Frequently used data ko fast storage mein temporarily rakhta hai, taaki database par baar-baar query na karni pade." },
      { type: "paragraph", text: "Example: Product details ko Redis se return karna." },
    ],
    question: "Cache miss, cache hit aur cache invalidation kya hain?",
  },
  {
    id: 5,
    title: "Message Queue — RabbitMQ / Kafka",
    category: "Backend aur Database",
    blocks: [
      { type: "paragraph", text: "Services ke beech messages ko queue ya event stream ke through communicate karwata hai." },
      { type: "paragraph", text: "Example: User order place kare, toh order response turant mil jaaye aur email bhejne ka kaam background mein ho." },
    ],
    question: "Synchronous aur asynchronous processing mein kya difference hai?",
  },
  {
    id: 6,
    title: "Connection Pooling",
    category: "Backend aur Database",
    blocks: [
      { type: "paragraph", text: "Database connections ko baar-baar create aur close karne ke bajay reuse karta hai." },
      { type: "paragraph", text: "Example: Node.js app MySQL ke liye limited connections ka pool maintain karti hai." },
    ],
    question: "Har request par naya database connection banana problem kyun hai?",
  },
  {
    id: 7,
    title: "Authentication vs Authorization",
    category: "Security",
    blocks: [
      { type: "list", items: ["Authentication: Tum kaun ho?", "Authorization: Tumhe kya karne ki permission hai?"] },
      { type: "paragraph", text: "Example: Login successful hai, lekin normal user ko admin endpoint access karne ki permission nahi hai." },
    ],
    question: "JWT kya hai? Authentication aur authorization mein kya antar hai?",
  },
  {
    id: 8,
    title: "Rate Limiting",
    category: "Security",
    blocks: [
      { type: "paragraph", text: "Ek client se aane wali requests ki frequency limit karta hai." },
      { type: "paragraph", text: "Example: Ek IP address se 1 minute mein maximum 100 requests allow karna." },
    ],
    question: "Rate limiting server ko abuse aur overload se kaise bachati hai?",
  },
  {
    id: 9,
    title: "Circuit Breaker",
    category: "Production Reliability",
    blocks: [
      { type: "paragraph", text: "Agar koi dependent service baar-baar fail ho rahi ho, toh kuch samay ke liye usko requests bhejna rok sakta hai." },
      { type: "paragraph", text: "Example: Payment service down hai, toh har request ko wait karwate rehne ke bajay circuit breaker fail-fast kar sakta hai." },
    ],
    question: "Circuit breaker aur retry mein kya difference hai?",
  },
  {
    id: 10,
    title: "Timeouts, Retries aur Idempotency",
    category: "Production Reliability",
    blocks: [
      { type: "list", items: ["Timeout: Request kitni der tak wait karegi.", "Retry: Temporary failure par request dobara bhejna.", "Idempotency: Same operation dobara aane par unintended duplicate effect se bachna."] },
      { type: "paragraph", text: "Example: Payment API ka response timeout ho gaya. Retry karne par customer se do baar paise nahi katne chahiye." },
    ],
    question: "Payment API mein idempotency key kyun important hai?",
  },
  {
    id: 11,
    title: "Logging, Metrics aur Distributed Tracing",
    category: "Production Reliability",
    blocks: [
      { type: "list", items: ["Logs: Kya hua?", "Metrics: Kitni baar hua aur performance kaisi hai?", "Tracing: Ek request kin services se hokar gayi?"] },
      { type: "paragraph", text: "Example: API slow hai; tracing se pata lag sakta hai ki delay Node.js mein hai ya MySQL query mein." },
    ],
  },
  {
    id: 12,
    title: "CI/CD aur Deployment",
    category: "Production Reliability",
    blocks: [
      { type: "paragraph", text: "Code ko automatically build, test aur deploy karne ka process." },
      { type: "paragraph", text: "Example: GitHub par code push hua, tests chale, Docker image build hui aur application deploy hui." },
    ],
    question: "Docker image aur container mein kya difference hai? Deployment fail ho toh rollback kaise karoge?",
  },
  {
    id: 13,
    title: "Database Replication",
    category: "Database",
    blocks: [
      { type: "list", items: ["Primary database: Aam taur par writes handle karta hai.", "Replica database: Primary se data replicate karke reads serve kar sakta hai."] },
      { type: "paragraph", text: "Example: Order create karna primary par, aur product reports read replica se." },
    ],
    question: "Replication aur backup mein kya difference hai?",
  },
  {
    id: 14,
    title: "Database Sharding",
    category: "Database",
    blocks: [
      { type: "paragraph", text: "Jab ek database ka data ya workload bahut bada ho jaye, toh data ko multiple databases mein divide kar sakte hain." },
      { type: "list", items: ["Shard 1: User IDs 1–1 million", "Shard 2: User IDs 1 million–2 million"] },
      { type: "paragraph", text: "Ye sirf illustrative partitioning hai; actual shard key aur distribution workload par depend karte hain." },
    ],
    question: "Replication aur sharding mein kya difference hai?",
  },
  {
    id: 15,
    title: "Database Indexing",
    category: "Database",
    blocks: [
      { type: "paragraph", text: "Index database ko records jaldi find karne mein help karta hai." },
      { type: "paragraph", text: "Example: users.email par index ho toh email se user dhoondhna faster ho sakta hai." },
      { type: "diagram", lines: ["CREATE INDEX idx_users_email ON users(email);"] },
      { type: "paragraph", text: "Har column par index banana sahi nahi—indexes extra storage lete hain aur writes ko slow kar sakte hain." },
    ],
    question: "Index query fast kaise karta hai aur uska drawback kya hai?",
  },
  {
    id: 16,
    title: "SQL Transactions aur ACID",
    category: "Database",
    blocks: [
      { type: "paragraph", text: "Maan lo ek bank account se doosre account mein ₹1,000 transfer karne hain. Debit ho jaaye lekin credit fail ho, toh data inconsistent ho sakta hai." },
      { type: "paragraph", text: "Transaction related database operations ko ek unit ke roop mein manage karti hai." },
      { type: "list", items: ["Atomicity: Saare operations successful hon ya transaction rollback ho.", "Consistency: Database constraints maintain hon.", "Isolation: Concurrent transactions ek-doosre ko kis tarah affect karti hain, use control karna.", "Durability: Commit hua data failure ke baad bhi persist rehna chahiye, database guarantees ke mutabik."] },
    ],
    question: "COMMIT aur ROLLBACK kya karte hain?",
  },
  {
    id: 17,
    title: "Database Deadlock",
    category: "Database",
    blocks: [
      { type: "paragraph", text: "Do transactions ek-doosre ke locked resources ka wait karti reh jaayein, toh deadlock ho sakta hai." },
      { type: "list", items: ["Transaction A ne Row 1 lock ki aur Row 2 ka wait kar rahi hai.", "Transaction B ne Row 2 lock ki aur Row 1 ka wait kar rahi hai."] },
      { type: "paragraph", text: "MySQL deadlock detect karke aam taur par ek transaction ko rollback karta hai." },
      { type: "paragraph", text: "Prevention: Consistent order mein rows update karna, transactions chhoti rakhna aur failed transactions ko safely retry karna." },
    ],
    question: "Deadlock aur normal query timeout mein kya difference hai?",
  },
  {
    id: 18,
    title: "Event Loop aur Non-blocking I/O",
    category: "Node.js",
    blocks: [
      { type: "paragraph", text: "Node.js JavaScript ko aam taur par ek main thread par execute karta hai aur asynchronous I/O ke through bahut saari concurrent requests handle kar sakta hai." },
      { type: "paragraph", text: "Example: MySQL query ka result wait karte waqt Node.js doosre requests par kaam kar sakta hai." },
      { type: "paragraph", text: "Lekin heavy CPU work, jaise bahut bada synchronous calculation, event loop block kar sakta hai." },
    ],
    question: "Node.js single-threaded hone ke bawajood multiple requests kaise handle karta hai?",
  },
  {
    id: 19,
    title: "Worker Threads aur Child Processes",
    category: "Node.js",
    blocks: [
      { type: "list", items: ["Worker Threads: CPU-heavy JavaScript tasks ko alag threads par chala sakte hain.", "Child Processes: Alag OS processes run kar sakte hain; isolation aur external commands ke liye useful hain."] },
      { type: "paragraph", text: "Example: Large file ka CPU-heavy processing task background mein karna." },
      { type: "paragraph", text: "Email ya report generation jaise kaam ke liye message queue aur worker service bhi use kar sakte ho." },
    ],
    question: "Worker Threads aur worker queue mein kya difference hai?",
  },
  {
    id: 20,
    title: "WebSockets aur Real-time Communication",
    category: "Networking",
    blocks: [
      { type: "paragraph", text: "Normal HTTP mein client request bhejta hai aur server response deta hai. WebSocket connection establish hone ke baad client aur server dono connection par messages bhej sakte hain." },
      { type: "paragraph", text: "Example: Chat application, live notifications, multiplayer games." },
      { type: "paragraph", text: "Har real-time feature ko WebSocket ki zaroorat nahi—kuch cases mein Server-Sent Events (SSE) bhi kaafi hote hain." },
    ],
    question: "HTTP polling, SSE aur WebSocket mein kya difference hai?",
  },
  {
    id: 21,
    title: "CORS (Cross-Origin Resource Sharing)",
    category: "Security",
    blocks: [
      { type: "paragraph", text: "Browser security policy hai jo control karti hai ki ek origin ki web page doosre origin se response access kar sakti hai ya nahi." },
      { type: "list", items: ["Frontend: https://shop.example.com", "Backend: https://api.example.com"] },
      { type: "paragraph", text: "Ye alag origins hain, isliye browser ko suitable CORS headers ki zaroorat ho sakti hai." },
      { type: "paragraph", text: "Important: CORS authentication nahi hai aur na hi ye server ko har tarah ke direct requests se protect karta hai." },
    ],
    question: "CORS error browser mein kyun aata hai, jab API Postman mein chal rahi hoti hai?",
  },
  {
    id: 22,
    title: "OAuth 2.0 aur OpenID Connect (OIDC)",
    category: "Security",
    blocks: [
      { type: "list", items: ["OAuth 2.0: Application ko kisi resource ka limited access authorize karne ka framework.", "OpenID Connect: OAuth 2.0 ke upar identity/authentication layer."] },
      { type: "paragraph", text: "Example: User kisi app ko Google account se sign in karne deta hai. Sign-in ke liye OIDC use ho sakta hai." },
      { type: "paragraph", text: "OAuth 2.0 akela user identity establish karne ka complete login protocol nahi hai." },
    ],
    question: "OAuth 2.0 aur JWT same cheez hain kya? Nahi—OAuth ek authorization framework hai, jabki JWT ek token format hai.",
  },
  {
    id: 23,
    title: "Secrets Management",
    category: "Security",
    blocks: [
      { type: "paragraph", text: "Database password, API keys aur signing secrets ko source code ya Docker image mein hardcode nahi karna chahiye." },
      { type: "paragraph", text: "Example: Tumhare Docker project mein MySQL credentials environment variables se configure ho sakte hain. Production mein dedicated secret manager ya platform-managed secrets behtar hote hain." },
      { type: "list", items: [".env file ko Git mein commit mat karo.", "Environment variables apne aap encrypted secret storage nahi hote.", "Least privilege rakho aur secrets rotate karo."] },
    ],
    question: "Docker image mein password hardcode karna risky kyun hai?",
  },
  {
    id: 24,
    title: "Blue-Green Deployment aur Canary Release",
    category: "Deployment",
    blocks: [
      { type: "paragraph", text: "Ye dono production mein naye version ko deploy karne ki strategies hain." },
      { type: "steps", items: ["Blue-Green Deployment: Do environments hote hain: ek current version serve karta hai, doosra naye version ke liye prepare hota hai. Validation ke baad traffic switch kiya ja sakta hai. Fayda: Rollback relatively fast ho sakta hai.", "Canary Release: Naye version ko pehle chhote traffic percentage par release karte hain, phir metrics theek rehne par rollout badhate hain. Fayda: Problem hone par affected traffic limited rakha ja sakta hai."] },
    ],
    question: "Blue-green deployment aur canary release mein kya difference hai?",
  },

  // Senior backend concepts 25–36
  {
    id: 25,
    title: "Idempotency aur Duplicate Requests",
    category: "Senior Backend",
    blocks: [
      { type: "paragraph", text: "Scenario: Customer ne Pay button ek baar dabaya, lekin network timeout hone par mobile app ne request dobara bhej di. Ab customer se do baar payment nahi katni chahiye." },
      { type: "list", items: ["Client unique idempotency key bhejta hai.", "Backend key ko persist karke request ka result record karta hai.", "Same key se retry aane par duplicate operation execute karne ke bajay stored result return karta hai.", "Database constraints aur payment provider ki idempotency support se duplicate protection ko strong banata hai."] },
    ],
    question: "Agar do identical requests ek hi samay par aa jaayein, toh sirf Redis mein key check karna enough hai?",
  },
  {
    id: 26,
    title: "Race Conditions aur Optimistic Locking",
    category: "Senior Backend",
    blocks: [
      { type: "paragraph", text: "Scenario: Product ka stock sirf 1 bacha hai. Do customers ek hi samay par order place karte hain. Dono ko order successful nahi hona chahiye." },
      { type: "list", items: ["Atomic conditional update.", "Row-level locking aur transaction.", "Version column ke saath optimistic concurrency control."] },
      { type: "diagram", lines: ["UPDATE products", "SET stock = stock - 1", "WHERE id = 101 AND stock > 0;"] },
      { type: "paragraph", text: "Backend check karega ki kitni rows update hui. Agar 0 rows update hui, toh stock available nahi hai." },
    ],
    question: "Optimistic locking aur pessimistic locking mein kya trade-off hai?",
  },
  {
    id: 27,
    title: "Distributed Transactions aur Saga Pattern",
    category: "Senior Backend",
    blocks: [
      { type: "paragraph", text: "Scenario: E-commerce mein order create hua, stock reserve hua, lekin payment fail ho gayi. Ab stock aur order ko kaise handle karoge?" },
      { type: "paragraph", text: "Ek single database transaction tab kaam kar sakti hai jab relevant changes ek transactional database ke andar hon. Lekin multiple independent services aur databases mein ek simple SQL transaction sab kuch atomically commit nahi kar sakti." },
      { type: "steps", items: ["Order create karo", "Stock reserve karo", "Payment process karo", "Success → Order confirm", "Failure → Compensate"] },
      { type: "paragraph", text: "Compensation example: reserved stock release karo aur order ko failed/cancelled mark karo." },
    ],
    question: "Agar payment successful ho gayi, lekin uska response timeout ho gaya, toh kya order cancel kar dena chahiye?",
  },
  {
    id: 28,
    title: "Transactional Outbox Pattern",
    category: "Senior Backend",
    blocks: [
      { type: "paragraph", text: "Scenario: Order MySQL mein save ho gaya, lekin RabbitMQ/Kafka par event publish nahi hua. Ab inventory service ko order ke baare mein pata hi nahi chalega." },
      { type: "paragraph", text: "Agar database save aur message publish do alag operations hain, toh ek successful aur doosra failed ho sakta hai." },
      { type: "steps", items: ["Ek hi database transaction mein order aur outbox event save karo.", "Background publisher outbox se event publish kare.", "Publish hone ke baad event ko processed mark karo.", "Consumers duplicate events ko safely handle karein."] },
    ],
    question: "Database transaction ke andar message queue publish karna enough kyun nahi hai?",
  },
  {
    id: 29,
    title: "Eventual Consistency",
    category: "Senior Backend",
    blocks: [
      { type: "paragraph", text: "Scenario: Customer ne order place kiya, lekin order history mein kuch seconds tak purana data dikh raha hai." },
      { type: "paragraph", text: "Distributed systems mein alag services ya read replicas ka data turant synchronize hona guaranteed nahi hota." },
      { type: "list", items: ["Order Service ne order create kiya.", "Event queue ke through analytics service ko event mila.", "Analytics dashboard kuch der baad updated hua."] },
      { type: "paragraph", text: "Is model ko eventual consistency kehte hain: agar naye updates ruk jaayein aur replication/process successful rahe, toh systems eventually consistent state tak pahunch sakte hain." },
    ],
    question: "Payment balance ya inventory jaise data mein eventual consistency kab risky ho sakti hai?",
  },
  {
    id: 30,
    title: "Cache Stampede, Cache Penetration aur Cache Avalanche",
    category: "Senior Backend",
    blocks: [
      { type: "paragraph", text: "Scenario: Redis mein popular product ka cached data expire hua. Ek hi samay par 20,000 requests MySQL ko hit karne lag gayin." },
      { type: "table", headers: ["Problem", "Kya hota hai?", "Possible solution"], rows: [["Cache stampede", "Ek key expire hote hi bahut requests DB par jaati hain", "Single-flight, request coalescing, TTL jitter"], ["Cache penetration", "Non-existent keys baar-baar DB hit karti hain", "Short-lived negative caching, validation"], ["Cache avalanche", "Bahut saari keys ek saath expire ya cache service unavailable ho jaati hai", "TTL randomization, controlled fallback, load shedding"]] },
    ],
    question: "Agar Redis down ho jaye, toh kya sab requests ko seedha MySQL par bhej dena chahiye?",
  },
  {
    id: 31,
    title: "Backpressure aur Load Shedding",
    category: "Senior Backend",
    blocks: [
      { type: "paragraph", text: "Scenario: Tumhara Node.js backend 5,000 requests/second process kar sakta hai, lekin achanak 30,000 requests/second aa rahi hain." },
      { type: "paragraph", text: "Agar system har request ko queue mein rakhta rahe, toh memory badh sakti hai, latency bahut high ho sakti hai aur application crash kar sakti hai." },
      { type: "list", items: ["Backpressure: Upstream ko signal dena ki system ki capacity limited hai; intake ya production rate ko control karna.", "Load shedding: Overloaded system mein kuch requests reject karna, taaki system completely fail na ho.", "Bounded queue: Pending work ki maximum limit rakhna.", "Timeouts: Requests ko indefinitely wait nahi karne dena."] },
      { type: "paragraph", text: "Example: Overload mein API kuch requests ko 429 Too Many Requests ya 503 Service Unavailable de sakti hai, situation ke mutabik." },
    ],
    question: "Sab requests ko accept karke queue mein rakhna achha design kyun nahi hai?",
  },
  {
    id: 32,
    title: "Bulkhead Pattern aur Fault Isolation",
    category: "Senior Backend",
    blocks: [
      { type: "paragraph", text: "Scenario: Tumhari application mein payment, search aur notifications services hain. Search service slow ho gayi aur usne saare worker connections occupy kar liye. Ab payment requests bhi fail hone lagi." },
      { type: "paragraph", text: "Bulkhead pattern independent resource limits ya execution pools se failure ko isolate karta hai." },
      { type: "list", items: ["Payment requests ke liye alag connection pool.", "Search ke liye bounded concurrency.", "Notifications ko background queue mein process karna."] },
      { type: "paragraph", text: "Circuit breaker se difference: Circuit breaker repeated failures par calls rok sakta hai; bulkhead resources aur capacity ko isolate karta hai. Dono saath use ho sakte hain." },
    ],
    question: "Ek external API slow ho, toh sirf retry lagana dangerous kyun ho sakta hai?",
  },
  {
    id: 33,
    title: "Graceful Shutdown aur Zero-Downtime Deployment",
    category: "Senior Backend",
    blocks: [
      { type: "paragraph", text: "Scenario: Docker naya Node.js container deploy karne ke liye purana container stop kar raha hai. Purane container mein 20 requests abhi process ho rahi hain." },
      { type: "steps", items: ["Application termination signal, jaise SIGTERM, receive karti hai.", "Naye requests accept karna band karti hai.", "Load balancer se instance ko remove/drain karne ka mechanism use hota hai.", "In-flight requests aur necessary tasks ko limited time tak complete hone diya jata hai.", "Database connections aur workers close kiye jaate hain.", "Deadline ke baad process terminate ho sakta hai."] },
    ],
    question: "Sirf Docker ka restart: unless-stopped graceful shutdown guarantee karta hai?",
  },
  {
    id: 34,
    title: "Backward-Compatible Database Migrations",
    category: "Senior Backend",
    blocks: [
      { type: "paragraph", text: "Scenario: Production mein 10 Node.js instances chal rahe hain. Tum users.name column ko first_name aur last_name mein split karna chahte ho." },
      { type: "paragraph", text: "Agar column turant rename ya delete kar diya, toh purane application instances fail ho sakte hain." },
      { type: "steps", items: ["Step 1 — Expand: Naye columns add karo, purana column abhi rakho.", "Step 2 — Migrate: Data backfill karo aur compatibility ke saath application ko update karo.", "Step 3 — Contract: Jab old code aur old column ki zaroorat na rahe, tab unhe remove karo."] },
    ],
    question: "Rolling deployment ke dauran old aur new application versions ek hi database use kar rahe hon, toh migration kaise design karoge?",
  },
  {
    id: 35,
    title: "Multi-Tenancy aur Tenant Data Isolation",
    category: "Senior Backend",
    blocks: [
      { type: "paragraph", text: "Scenario: Tum SaaS application bana rahe ho jise 500 companies use karengi. Har company ko sirf apna data dekhna chahiye." },
      { type: "list", items: ["Shared database, shared tables: Rows mein tenant_id hota hai.", "Separate schema: Har tenant ke liye separate schema.", "Separate database: Tenants ke databases alag hote hain."] },
      { type: "diagram", lines: ["SELECT *", "FROM orders", "WHERE tenant_id = ? AND id = ?;"] },
      { type: "paragraph", text: "Lekin sirf query mein tenant_id add karna enough nahi, agar application us filter ko kahin bhool sakti hai. Tenant identity trusted authentication context se aani chahiye; authorization checks, unique constraints aur suitable database protections bhi important hain." },
    ],
    question: "User request mein tenant_id badal kar doosri company ka data access karne se kaise rokoge?",
  },
  {
    id: 36,
    title: "SLI, SLO, SLA aur Error Budget",
    category: "Senior Backend",
    blocks: [
      { type: "paragraph", text: "Scenario: Business bolta hai ki API “hamesha fast aur available” honi chahiye. Tum senior engineer ke roop mein is expectation ko measurable kaise banaoge?" },
      { type: "list", items: ["SLI (Service Level Indicator): Actual measured metric, jaise successful requests ka percentage ya p95 latency.", "SLO (Service Level Objective): Internal reliability target, jaise monthly 99.9% successful requests.", "SLA (Service Level Agreement): Customer ke saath contractual commitment; ismein breach ke consequences ho sakte hain.", "Error budget: SLO ke against acceptable unreliability ka remaining allowance."] },
      { type: "paragraph", text: "Example: Agar availability SLO 99.9% hai, toh idealized 30-day month mein total downtime budget lagbhag 43.2 minutes ke barabar hota hai. Exact calculation metric aur measurement window par depend karti hai." },
    ],
    question: "Agar application ka error budget jaldi consume ho raha ho, toh kya karoge?",
  },

  // 20 additional senior scenario-based topics
  {
    id: 37,
    title: "Database Query Optimization (N+1 Query Problem)",
    category: "Performance",
    blocks: [
      { type: "paragraph", text: "Concept: Kabhi ek API ko 100 users return karne hote hain, lekin har user ke orders laane ke liye alag query chalti hai. Isse 1 query ke badle 101 queries execute ho sakti hain." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "Tumhari /api/users API 100 users return karti hai. Har user ke orders fetch karne ke liye separate SQL query chalti hai. Response time 3 seconds hai." },
    ],
    question: "Senior backend engineer ke roop mein tum queries ko kaise optimize karoge, aur kaise prove karoge ki optimization se improvement hui hai?",
  },
  {
    id: 38,
    title: "Database Connection Pool Exhaustion",
    category: "Database",
    blocks: [
      { type: "paragraph", text: "Concept: Application database connections ka ek limited pool maintain karti hai. Agar saare connections busy ho jaayein, to naye requests connection milne ka wait karte hain." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "Traffic normal hai, phir bhi API kabhi-kabhi timeout hoti hai. MySQL CPU sirf 35% hai, lekin logs mein Connection pool exhausted aa raha hai." },
    ],
    question: "Tum kaise identify karoge ki connections leak ho rahe hain, queries slow hain, ya pool capacity insufficient hai?",
  },
  {
    id: 39,
    title: "Hot Partition / Hot Key",
    category: "Scalability",
    blocks: [
      { type: "paragraph", text: "Concept: Distributed database ya cache mein data multiple partitions par hota hai. Agar saara traffic ek hi partition ya key par aaye, to woh bottleneck ban sakta hai." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "Tumhari e-commerce application mein ek popular product par lakhon users ek saath requests bhej rahe hain. Baaki products normally work kar rahe hain, lekin us product ki requests timeout ho rahi hain." },
    ],
    question: "Tum hot partition ya hot key kaise detect aur mitigate karoge?",
  },
  {
    id: 40,
    title: "Write Amplification",
    category: "Storage",
    blocks: [
      { type: "paragraph", text: "Concept: Ek logical write ki wajah se database ya storage system ko multiple physical writes karni pad sakti hain. Indexes, replication aur storage-engine behavior write cost badha sakte hain." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "Ek table mein sirf ek field update hoti hai, lekin update throughput badhne par disk I/O bahut zyada ho jata hai aur write latency badh jaati hai." },
    ],
    question: "Tum kaise investigate karoge ki indexes, replication, storage engine ya workload write amplification mein kitna contribute kar rahe hain?",
  },
  {
    id: 41,
    title: "Database Vacuuming / Table Bloat",
    category: "PostgreSQL",
    blocks: [
      { type: "paragraph", text: "Concept: PostgreSQL mein updates aur deletes purane row versions chhod sakte hain. Vacuuming unki cleanup aur space reuse mein help karti hai. Poor maintenance se table/index bloat ho sakta hai." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "PostgreSQL application mein kuch hafton ke baad table size bahut badh gaya hai, queries slow ho rahi hain aur disk space tezi se consume ho rahi hai." },
    ],
    question: "Tum kaise pata karoge ki table bloat, vacuum lag, ya actual data growth problem hai? Production mein safe remediation kya hogi?",
  },
  {
    id: 42,
    title: "Database Schema Design and Normalization",
    category: "Data modeling",
    blocks: [
      { type: "paragraph", text: "Concept: Schema ko is tarah design karna ki data duplication aur inconsistency control mein rahe. Normalization aur denormalization ke beech workload ke hisaab se balance karna hota hai." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "Ek orders table mein customer ka naam aur address har order ke saath duplicate store kiya ja raha hai. Ab customer address update karne par purane orders ka data inconsistent ho jata hai." },
    ],
    question: "Tum schema ko kaise redesign karoge? Aur historical invoice mein purana address preserve karna ho to kya approach loge?",
  },
  {
    id: 43,
    title: "Online Index Creation",
    category: "Zero-downtime DB changes",
    blocks: [
      { type: "paragraph", text: "Concept: Production database mein index create karte waqt writes block hone, CPU/I/O spike ya replication lag ka risk ho sakta hai. Database engine ke hisaab se online/concurrent index creation ke options alag hote hain." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "Ek 500-million-row table par naya index add karna hai. Normal index creation se production writes block ho sakti hain." },
    ],
    question: "Tum index safely create, monitor aur verify kaise karoge? Agar index creation fail ho jaye to recovery plan kya hoga?",
  },
  {
    id: 44,
    title: "Data Retention and Archival",
    category: "Data lifecycle",
    blocks: [
      { type: "paragraph", text: "Concept: Har record ko forever hot database mein rakhna zaroori nahi hota. Retention, archival aur deletion policies storage cost, query performance aur compliance ko affect karti hain." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "Application mein 5 saal ke audit logs hain. Recent 30 days ka data frequently access hota hai, lekin purane records rarely read hote hain. Table ab bahut large ho chuki hai." },
    ],
    question: "Tum retention, partitioning, archival aur deletion ka design kaise karoge, bina required audit history lose kiye?",
  },
  {
    id: 45,
    title: "Object Storage and Presigned URLs",
    category: "File uploads",
    blocks: [
      { type: "paragraph", text: "Concept: Images aur videos ko application server ke through stream karne ke bajaye object storage mein rakhna scalable ho sakta hai. Presigned URLs clients ko limited time ke liye direct upload/download access dete hain." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "Tumhari API par large video uploads aate hain. Traffic badhne par Node.js memory usage aur bandwidth cost bahut badh jaati hai." },
    ],
    question: "Tum direct-to-object-storage upload design kaise karoge? File validation, access control aur incomplete uploads ko kaise handle karoge?",
  },
  {
    id: 46,
    title: "Content Delivery and Media Processing Pipeline",
    category: "Media systems",
    blocks: [
      { type: "paragraph", text: "Concept: File upload aur uski processing ko separate stages mein baantne se API responsive reh sakti hai. Thumbnails, compression aur format conversion background mein ho sakte hain." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "User profile image upload karta hai, lekin image processing ke dauran upload API 15 seconds tak response nahi deti. Kabhi processing fail hone par user ko broken image bhi dikhai deti hai." },
    ],
    question: "Tum upload response, asynchronous processing, status tracking aur retry handling kaise design karoge?",
  },
  {
    id: 47,
    title: "Search Index Consistency",
    category: "Search systems",
    blocks: [
      { type: "paragraph", text: "Concept: Search engines jaise Elasticsearch/OpenSearch aksar primary database se asynchronously update hote hain. Isliye search results kuch samay tak purane ho sakte hain." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "User product ka price update karta hai, database mein naya price aa jata hai, lekin search result mein purana price 30 seconds tak dikhai deta hai." },
    ],
    question: "Tum indexing pipeline, event delivery aur search freshness ko kaise improve karoge? Agar user ko immediately updated price chahiye, to source of truth kya hona chahiye?",
  },
  {
    id: 48,
    title: "API Versioning and Deprecation",
    category: "API design",
    blocks: [
      { type: "paragraph", text: "Concept: API contract change karte waqt purane clients ko achanak break nahi karna chahiye. Versioning, compatibility aur deprecation policy important hoti hai." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "Tum /v1/orders response se customer_name field remove karke customer object introduce karna chahte ho. Mobile apps ke kuch users mahino tak purane versions use karenge." },
    ],
    question: "Tum API migration, compatibility, usage monitoring aur old version sunset ka plan kaise banaoge?",
  },
  {
    id: 49,
    title: "GraphQL Query Complexity and Abuse",
    category: "API security",
    blocks: [
      { type: "paragraph", text: "Concept: GraphQL flexible queries allow karta hai, lekin deeply nested ya overly broad queries database aur server resources ko exhaust kar sakti hain." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "Tumhare GraphQL server par ek request deeply nested relationships query karti hai aur hazaaron database operations trigger kar deti hai. Request count kam hai, phir bhi CPU high ho raha hai." },
    ],
    question: "Tum query depth, complexity, pagination, batching aur authorization ko kaise use karoge? Sirf request-rate limiting kyun sufficient nahi ho sakti?",
  },
  {
    id: 50,
    title: "API Pagination at Scale",
    category: "Large datasets",
    blocks: [
      { type: "paragraph", text: "Concept: Offset pagination simple hai, lekin large offsets expensive ho sakte hain aur concurrent inserts/deletes ke kaaran pages inconsistent ho sakte hain. Cursor/keyset pagination ek alternative hai." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "Ek activity feed mein 20 million records hain. LIMIT 50 OFFSET 5000000 bahut slow hai, aur users ko scrolling ke dauran duplicate items bhi dikh rahe hain." },
    ],
    question: "Tum cursor-based pagination kaise design karoge? Stable sorting, unique cursor aur newly inserted records ka kya behavior hoga?",
  },
  {
    id: 51,
    title: "File and Data Import Pipeline",
    category: "Batch processing",
    blocks: [
      { type: "paragraph", text: "Concept: CSV ya bulk data imports ko validate, process aur report karne ke liye chunking, checkpoints aur partial failure handling useful hain." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "Ek customer 2-million-row CSV import karta hai. Process 70% par crash ho jata hai. Dobara run karne par pehle se imported rows duplicate hone ka risk hai." },
    ],
    question: "Tum resumable import pipeline kaise design karoge, jisme validation errors report hon, checkpoints hon aur retries safe hon?",
  },
  {
    id: 52,
    title: "Multi-Region Architecture and Data Residency",
    category: "Global systems",
    blocks: [
      { type: "paragraph", text: "Concept: Multiple geographic regions latency aur availability improve kar sakte hain, lekin cross-region replication, conflicting writes, failover aur data-residency requirements complexity badhate hain." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "Tumhari application India aur Europe mein users serve karti hai. Europe ke users ke liye latency high hai, aur kuch data Europe mein hi store rehna chahiye." },
    ],
    question: "Tum regional reads/writes, replication, failover aur data residency ka architecture kaise design karoge? Network partition ke dauran kaun-se trade-offs consider karoge?",
  },
  {
    id: 53,
    title: "Feature Flags and Kill Switches",
    category: "Safe releases",
    blocks: [
      { type: "paragraph", text: "Concept: Feature flags se code deploy kiye bina feature enable/disable ya selected users ko rollout kiya ja sakta hai. Kill switch kisi risky functionality ko quickly disable kar sakta hai." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "Naya recommendation feature deploy hua aur achanak database load 3x ho gaya. Full rollback se doosre important bug fixes bhi reverse ho jayenge." },
    ],
    question: "Tum feature flag se impact kaise contain karoge? Flag evaluation, default behavior aur stale flags ko clean up karne ka plan kya hoga?",
  },
  {
    id: 54,
    title: "Disaster Recovery: RPO and RTO",
    category: "Reliability",
    blocks: [
      { type: "paragraph", text: "Concept: RPO (Recovery Point Objective): Maximum acceptable data loss, time ke terms mein. RTO (Recovery Time Objective): Service ko recover karne ka maximum target time." },
      { type: "paragraph", text: "Backups hona aur backup se successfully restore kar paana do alag cheezein hain." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "Business kehta hai ki database failure ke baad service 30 minutes mein restore honi chahiye aur maximum 5 minutes ka data lose ho sakta hai." },
    ],
    question: "Tum backup frequency, replication, point-in-time recovery aur restore drills ka plan kaise banaoge? Sirf daily backup kyun enough nahi hoga?",
  },
  {
    id: 55,
    title: "Capacity Planning and Load Testing",
    category: "Performance engineering",
    blocks: [
      { type: "paragraph", text: "Concept: Load testing se pata chalta hai ki system expected traffic, traffic spikes aur saturation points par kaise behave karta hai. Sirf average latency dekhna enough nahi hota." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "Next month tumhari application par expected traffic 5x hone wala hai. Current system load test mein 2x traffic tak stable hai, uske baad p99 latency sharply increase hoti hai." },
    ],
    question: "Tum realistic load test kaise plan karoge? Kaun-se metrics, traffic patterns aur saturation signals use karke capacity decide karoge?",
  },
  {
    id: 56,
    title: "Resource Leaks and Long-Running Process Stability",
    category: "Node.js production",
    blocks: [
      { type: "paragraph", text: "Concept: Memory leak, unclosed sockets, timers, event listeners ya database cursors long-running service ko gradually unstable bana sakte hain. Container restart symptoms ko temporarily hide kar sakta hai, root cause fix nahi karta." },
      { type: "paragraph", text: "Scenario-based question:" },
      { type: "paragraph", text: "Node.js service deploy ke baad initially normal hoti hai, lekin 24–48 hours mein memory 300 MB se 2.5 GB tak badh jaati hai. Container restart karne par memory reset ho jaati hai." },
    ],
    question: "Tum memory leak aur normal caching ke beech difference kaise identify karoge? Heap snapshots, GC metrics aur production-safe debugging kaise use karoge?",
  },
];

export const architectureDiagram = [
  "DNS",
  "CDN / DDoS Protection",
  "Load Balancer / Reverse Proxy",
  "API Gateway — agar architecture mein use ho",
  "Node.js Backend",
  "Authentication, business logic, rate limits",
  "Redis — Cache",
  "MySQL — Persistent data",
  "Message Queue — Background tasks",
  "Monitoring — Logs, metrics, traces",
];

export const learningChecklist = [
  {
    id: 1,
    title: "Reverse proxy aur port mapping",
    detail: "Nginx → Node.js; host port vs container port",
  },
  {
    id: 2,
    title: "Docker networking aur DNS",
    detail: "Containers service names se ek-doosre ko kaise find karte hain",
  },
  {
    id: 3,
    title: "Environment variables aur secrets",
    detail: "DB passwords aur config ko securely manage karna",
  },
  {
    id: 4,
    title: "Redis caching",
    detail: "Cache hit/miss, TTL aur invalidation",
  },
  {
    id: 5,
    title: "MySQL connection pooling aur indexes",
    detail: "Efficient database access",
  },
  {
    id: 6,
    title: "Authentication aur authorization",
    detail: "JWT, sessions, roles aur permissions",
  },
  {
    id: 7,
    title: "Rate limiting aur timeouts",
    detail: "Overload aur slow dependencies ko handle karna",
  },
  {
    id: 8,
    title: "Load balancing aur health checks",
    detail: "Multiple backend instances chalana",
  },
  {
    id: 9,
    title: "Message queues aur background jobs",
    detail: "Email, notifications, asynchronous work",
  },
  {
    id: 10,
    title: "Logs, monitoring aur CI/CD",
    detail: "Production debugging aur deployment",
  },
];