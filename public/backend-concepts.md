
# Backend ke 12 important concepts

## 1. Pehle architecture ke concepts

### 1. DNS (Domain Name System)

Domain name ko IP address se resolve karta hai.

Example: api.example.com ko us server ke IP address tak pahunchane mein help karta hai.

Interview: Browser ko kaise pata chalta hai ki domain kis server par hai?

### 2. HTTPS / TLS

Client aur server ke beech communication encrypt karta hai.

Example: Login password network par plain text mein bhejne se bachana.

Interview: HTTPS aur HTTP mein kya difference hai?

### 3. CDN (Content Delivery Network)

Images, CSS, JavaScript aur doosra cache-able content users ke paas ke servers se deliver karta hai.

Example: India ka user image India ke nearby CDN location se load kar sakta hai, origin server se har baar nahi.

Interview: CDN website ko fast kaise banata hai?

### 4. Caching (Redis)

Frequently used data ko fast storage mein temporarily rakhta hai, taaki database par baar-baar query na karni pade.

Example: Product details ko Redis se return karna.

Interview: Cache miss, cache hit aur cache invalidation kya hain?

## 2. Backend aur database ke concepts

### 5. Message Queue — RabbitMQ / Kafka

Services ke beech messages ko queue ya event stream ke through communicate karwata hai.

Example: User order place kare, toh order response turant mil jaaye aur email bhejne ka kaam background mein ho.

Interview: Synchronous aur asynchronous processing mein kya difference hai?

### 6. Connection Pooling

Database connections ko baar-baar create aur close karne ke bajay reuse karta hai.

Example: Node.js app MySQL ke liye limited connections ka pool maintain karti hai.

Interview: Har request par naya database connection banana problem kyun hai?

### 7. Authentication vs Authorization

- Authentication: Tum kaun ho?
- Authorization: Tumhe kya karne ki permission hai?

Example: Login successful hai, lekin normal user ko admin endpoint access karne ki permission nahi hai.

Interview: JWT kya hai? Authentication aur authorization mein kya antar hai?

### 8. Rate Limiting

Ek client se aane wali requests ki frequency limit karta hai.

Example: Ek IP address se 1 minute mein maximum 100 requests allow karna.

Interview: Rate limiting server ko abuse aur overload se kaise bachati hai?

## 3. Production reliability ke concepts

### 9. Circuit Breaker

Agar koi dependent service baar-baar fail ho rahi ho, toh kuch samay ke liye usko requests bhejna rok sakta hai.

Example: Payment service down hai, toh har request ko wait karwate rehne ke bajay circuit breaker fail-fast kar sakta hai.

Interview: Circuit breaker aur retry mein kya difference hai?

### 10. Timeouts, Retries aur Idempotency

- Timeout: Request kitni der tak wait karegi.
- Retry: Temporary failure par request dobara bhejna.
- Idempotency: Same operation dobara aane par unintended duplicate effect se bachna.

Example: Payment API ka response timeout ho gaya. Retry karne par customer se do baar paise nahi katne chahiye.

Interview: Payment API mein idempotency key kyun important hai?

### 11. Logging, Metrics aur Distributed Tracing

Production mein application ki problems samajhne ke alag tareeke:

- Logs: Kya hua?
- Metrics: Kitni baar hua aur performance kaisi hai?
- Tracing: Ek request kin services se hokar gayi?

Example: API slow hai; tracing se pata lag sakta hai ki delay Node.js mein hai ya MySQL query mein.

### 12. CI/CD aur Deployment

Code ko automatically build, test aur deploy karne ka process.

Example: GitHub par code push hua, tests chale, Docker image build hui aur application deploy hui.

Interview: Docker image aur container mein kya difference hai? Deployment fail ho toh rollback kaise karoge?

## 4. Ye sab ek production application mein kahan fit hote hain?

Ye ek representative architecture hai; har application mein har component zaroori nahi hota.

\`\`\`text
DNS
 |
CDN / DDoS Protection
 |
Load Balancer / Reverse Proxy
 |
API Gateway — agar architecture mein use ho
 |
Node.js Backend
 |-- Authentication, business logic, rate limits
 |-- Redis Cache
 |-- MySQL Persistent data
 |-- Message Queue Background tasks
 |-- Monitoring: Logs, metrics, traces
\`\`\`

## 5. Kis order mein seekhna chahiye?

Tumhare current level ke liye main ye sequence recommend karunga:

### Learning checklist

0 / 10 complete

1. Reverse proxy aur port mapping

   Nginx → Node.js; host port vs container port

2. Docker networking aur DNS

   Containers service names se ek-doosre ko kaise find karte hain

3. Environment variables aur secrets

   DB passwords aur config ko securely manage karna

4. Redis caching

   Cache hit/miss, TTL aur invalidation

5. MySQL connection pooling aur indexes

   Efficient database access

6. Authentication aur authorization

   JWT, sessions, roles aur permissions

7. Rate limiting aur timeouts

   Overload aur slow dependencies ko handle karna

8. Load balancing aur health checks

   Multiple backend instances chalana

9. Message queues aur background jobs

   Email, notifications, asynchronous work

10. Logs, monitoring aur CI/CD

    Production debugging aur deployment

Meri advice: abhi saare 12 concepts ek saath ratne ki zaroorat nahi. Pehle Docker networking, environment variables, Redis caching aur MySQL connection pooling ko apne current project mein practically samjho. Ye tumhari existing knowledge se naturally connect hote hain aur backend interviews mein bhi kaafi useful hain.

# Agle 12 backend concepts (13–24)

## 13. Database Replication

Maan lo tumhari application par 1 lakh users hain aur database par bahut saari read queries aa rahi hain.

- Primary database: Aam taur par writes handle karta hai.
- Replica database: Primary se data replicate karke reads serve kar sakta hai.

Example: Order create karna primary par, aur product reports read replica se.

Interview: Replication aur backup mein kya difference hai?

## 14. Database Sharding

Jab ek database ka data ya workload bahut bada ho jaye, toh data ko multiple databases mein divide kar sakte hain.

Example:

- Shard 1: User IDs 1–1 million
- Shard 2: User IDs 1 million–2 million

Ye sirf illustrative partitioning hai; actual shard key aur distribution workload par depend karte hain.

Interview: Replication aur sharding mein kya difference hai?

## 15. Database Indexing

Index database ko records jaldi find karne mein help karta hai.

Example: users.email par index ho toh email se user dhoondhna faster ho sakta hai.

\`\`\`sql
CREATE INDEX idx_users_email ON users(email);
\`\`\`

Har column par index banana sahi nahi—indexes extra storage lete hain aur writes ko slow kar sakte hain.

Interview: Index query fast kaise karta hai aur uska drawback kya hai?

## 16. SQL Transactions aur ACID

Maan lo ek bank account se doosre account mein ₹1,000 transfer karne hain. Debit ho jaaye lekin credit fail ho, toh data inconsistent ho sakta hai.

Transaction related database operations ko ek unit ke roop mein manage karti hai.

ACID ka matlab:

- Atomicity: Saare operations successful hon ya transaction rollback ho.
- Consistency: Database constraints maintain hon.
- Isolation: Concurrent transactions ek-doosre ko kis tarah affect karti hain, use control karna.
- Durability: Commit hua data failure ke baad bhi persist rehna chahiye, database guarantees ke mutabik.

Interview: COMMIT aur ROLLBACK kya karte hain?

## 17. Database Deadlock

Do transactions ek-doosre ke locked resources ka wait karti reh jaayein, toh deadlock ho sakta hai.

Example:

- Transaction A ne Row 1 lock ki aur Row 2 ka wait kar rahi hai.
- Transaction B ne Row 2 lock ki aur Row 1 ka wait kar rahi hai.

MySQL deadlock detect karke aam taur par ek transaction ko rollback karta hai.

Prevention: Consistent order mein rows update karna, transactions chhoti rakhna aur failed transactions ko safely retry karna.

Interview: Deadlock aur normal query timeout mein kya difference hai?

## 18. Event Loop aur Non-blocking I/O

Node.js JavaScript ko aam taur par ek main thread par execute karta hai aur asynchronous I/O ke through bahut saari concurrent requests handle kar sakta hai.

Example: MySQL query ka result wait karte waqt Node.js doosre requests par kaam kar sakta hai.

Lekin heavy CPU work, jaise bahut bada synchronous calculation, event loop block kar sakta hai.

Interview: Node.js single-threaded hone ke bawajood multiple requests kaise handle karta hai?

## 19. Worker Threads aur Child Processes

Jab CPU-intensive kaam ho, toh sirf asynchronous I/O kaafi nahi hota.

- Worker Threads: CPU-heavy JavaScript tasks ko alag threads par chala sakte hain.
- Child Processes: Alag OS processes run kar sakte hain; isolation aur external commands ke liye useful hain.

Example: Large file ka CPU-heavy processing task background mein karna.

Email ya report generation jaise kaam ke liye message queue aur worker service bhi use kar sakte ho.

Interview: Worker Threads aur worker queue mein kya difference hai?

## 20. WebSockets aur Real-time Communication

Normal HTTP mein client request bhejta hai aur server response deta hai. WebSocket connection establish hone ke baad client aur server dono connection par messages bhej sakte hain.

Example: Chat application, live notifications, multiplayer games.

Har real-time feature ko WebSocket ki zaroorat nahi—kuch cases mein Server-Sent Events (SSE) bhi kaafi hote hain.

Interview: HTTP polling, SSE aur WebSocket mein kya difference hai?

## 21. CORS (Cross-Origin Resource Sharing)

Browser security policy hai jo control karti hai ki ek origin ki web page doosre origin se response access kar sakti hai ya nahi.

Example:

- Frontend: https://shop.example.com
- Backend: https://api.example.com

Ye alag origins hain, isliye browser ko suitable CORS headers ki zaroorat ho sakti hai.

Important: CORS authentication nahi hai aur na hi ye server ko har tarah ke direct requests se protect karta hai.

Interview: CORS error browser mein kyun aata hai, jab API Postman mein chal rahi hoti hai?

## 22. OAuth 2.0 aur OpenID Connect (OIDC)

Ye identity aur access ke liye related, lekin alag protocols hain.

- OAuth 2.0: Application ko kisi resource ka limited access authorize karne ka framework.
- OpenID Connect: OAuth 2.0 ke upar identity/authentication layer.

Example: User kisi app ko Google account se sign in karne deta hai. Sign-in ke liye OIDC use ho sakta hai.

OAuth 2.0 akela user identity establish karne ka complete login protocol nahi hai.

Interview: OAuth 2.0 aur JWT same cheez hain kya? Nahi—OAuth ek authorization framework hai, jabki JWT ek token format hai.

## 23. Secrets Management

Database password, API keys aur signing secrets ko source code ya Docker image mein hardcode nahi karna chahiye.

Example: Tumhare Docker project mein MySQL credentials environment variables se configure ho sakte hain. Production mein dedicated secret manager ya platform-managed secrets behtar hote hain.

Yaad rakho:

- .env file ko Git mein commit mat karo.
- Environment variables apne aap encrypted secret storage nahi hote.
- Least privilege rakho aur secrets rotate karo.

Interview: Docker image mein password hardcode karna risky kyun hai?

## 24. Blue-Green Deployment aur Canary Release

Ye dono production mein naye version ko deploy karne ki strategies hain.

### Blue-Green Deployment

Do environments hote hain: ek current version serve karta hai, doosra naye version ke liye prepare hota hai. Validation ke baad traffic switch kiya ja sakta hai.

Fayda: Rollback relatively fast ho sakta hai.

### Canary Release

Naye version ko pehle chhote traffic percentage par release karte hain, phir metrics theek rehne par rollout badhate hain.

Fayda: Problem hone par affected traffic limited rakha ja sakta hai.

Interview: Blue-green deployment aur canary release mein kya difference hai?

### Ab tak ke 24 concepts ka next step

| Group | Concepts |
|---|---|
| Database | Replication, sharding, indexing, transactions, deadlocks |
| Node.js | Event loop, worker threads, WebSockets |
| API security | CORS, OAuth/OIDC, secrets management |
| Production | Blue-green, canary deployment |

Agla useful practical step tumhare existing Node.js + Nginx + Redis + MySQL project mein database indexing, transactions aur Redis caching implement karna hoga. Isse concepts sirf theoretical nahi rahenge, aur interview mein real examples ke saath explain kar paoge.

# Senior backend ke 12 important concepts (25–36)

Bhai, ab chalte hain senior backend developer interview wale concepts par. Yahan interviewer sirf definition nahi poochta; woh scenario deta hai aur dekhta hai ki tum production mein problem kaise solve karoge.

Example: “Tumhari API par 50,000 requests per second aa rahi hain, database slow hai aur kuch users ko duplicate payment ho rahi hai. Design kaise karoge?”

Is level par tumhe scalability, consistency, failure handling, trade-offs aur debugging samajhna hota hai.

## 25. Idempotency aur Duplicate Requests

Scenario: Customer ne Pay button ek baar dabaya, lekin network timeout hone par mobile app ne request dobara bhej di. Ab customer se do baar payment nahi katni chahiye.

Solution:

- Client unique idempotency key bhejta hai.
- Backend key ko persist karke request ka result record karta hai.
- Same key se retry aane par duplicate operation execute karne ke bajay stored result return karta hai.
- Database constraints aur payment provider ki idempotency support se duplicate protection ko strong banata hai.

Senior interview question: Agar do identical requests ek hi samay par aa jaayein, toh sirf Redis mein key check karna enough hai?

Nahi, agar check aur write atomic nahi hain toh race condition ho sakti hai. Atomic operation, unique constraint ya transactional design chahiye.

## 26. Race Conditions aur Optimistic Locking

Scenario: Product ka stock sirf 1 bacha hai. Do customers ek hi samay par order place karte hain. Dono ko order successful nahi hona chahiye.

Agar backend pehle stock read kare, phir baad mein update kare, toh dono purana stock 1 padh sakte hain.

Possible solutions:

- Atomic conditional update.
- Row-level locking aur transaction.
- Version column ke saath optimistic concurrency control.

MySQL ka example:

\`\`\`sql
UPDATE products
SET stock = stock - 1
WHERE id = 101 AND stock > 0;
\`\`\`

Backend check karega ki kitni rows update hui. Agar 0 rows update hui, toh stock available nahi hai.

Senior question: Optimistic locking aur pessimistic locking mein kya trade-off hai?

## 27. Distributed Transactions aur Saga Pattern

Scenario: E-commerce mein order create hua, stock reserve hua, lekin payment fail ho gayi. Ab stock aur order ko kaise handle karoge?

Ek single database transaction tab kaam kar sakti hai jab relevant changes ek transactional database ke andar hon. Lekin multiple independent services aur databases mein ek simple SQL transaction sab kuch atomically commit nahi kar sakti.

Saga pattern mein business operation ko chhote steps mein divide karte hain:

1. Order create karo
2. Stock reserve karo
3. Payment process karo

Success → Order confirm

Failure → Compensate

Compensation example: reserved stock release karo aur order ko failed/cancelled mark karo.

Senior interview question: Agar payment successful ho gayi, lekin uska response timeout ho gaya, toh kya order cancel kar dena chahiye?

Zaroori nahi. Pehle payment ki actual status verify karni hogi. Compensation operations bhi retry-safe aur idempotent honi chahiye.

## 28. Transactional Outbox Pattern

Scenario: Order MySQL mein save ho gaya, lekin RabbitMQ/Kafka par event publish nahi hua. Ab inventory service ko order ke baare mein pata hi nahi chalega.

Agar database save aur message publish do alag operations hain, toh ek successful aur doosra failed ho sakta hai.

Outbox solution:

1. Ek hi database transaction mein order aur outbox event save karo.
2. Background publisher outbox se event publish kare.
3. Publish hone ke baad event ko processed mark karo.
4. Consumers duplicate events ko safely handle karein.

Isse database update aur event publish ke beech failure ka risk kaafi had tak manage hota hai. Publisher retry ki wajah se duplicate delivery phir bhi ho sakti hai.

Interview question: Database transaction ke andar message queue publish karna enough kyun nahi hai?

Kyunki database aur broker ke beech ek common atomic transaction usually available nahi hoti.

## 29. Eventual Consistency

Scenario: Customer ne order place kiya, lekin order history mein kuch seconds tak purana data dikh raha hai.

Distributed systems mein alag services ya read replicas ka data turant synchronize hona guaranteed nahi hota.

Example:

- Order Service ne order create kiya.
- Event queue ke through analytics service ko event mila.
- Analytics dashboard kuch der baad updated hua.

Is model ko eventual consistency kehte hain: agar naye updates ruk jaayein aur replication/process successful rahe, toh systems eventually consistent state tak pahunch sakte hain.

Senior question: Payment balance ya inventory jaise data mein eventual consistency kab risky ho sakti hai?

Jab stale data se overselling, incorrect balance ya business invariant violate hone ka risk ho. Aise cases mein suitable transactional guarantees aur concurrency controls chahiye.

## 30. Cache Stampede, Cache Penetration aur Cache Avalanche

Scenario: Redis mein popular product ka cached data expire hua. Ek hi samay par 20,000 requests MySQL ko hit karne lag gayin.

Ye cache stampede hai.

| Problem | Kya hota hai? | Possible solution |
|---|---|---|
| Cache stampede | Ek key expire hote hi bahut requests DB par jaati hain | Single-flight, request coalescing, TTL jitter |
| Cache penetration | Non-existent keys baar-baar DB hit karti hain | Short-lived negative caching, validation |
| Cache avalanche | Bahut saari keys ek saath expire ya cache service unavailable ho jaati hai | TTL randomization, controlled fallback, load shedding |

Senior question: Agar Redis down ho jaye, toh kya sab requests ko seedha MySQL par bhej dena chahiye?

Usually nahi. Database overload ho sakta hai. Timeouts, concurrency limits, controlled fallback aur rate limiting lagani pad sakti hai.

## 31. Backpressure aur Load Shedding

Scenario: Tumhara Node.js backend 5,000 requests/second process kar sakta hai, lekin achanak 30,000 requests/second aa rahi hain.

Agar system har request ko queue mein rakhta rahe, toh memory badh sakti hai, latency bahut high ho sakti hai aur application crash kar sakti hai.

- Backpressure: Upstream ko signal dena ki system ki capacity limited hai; intake ya production rate ko control karna.
- Load shedding: Overloaded system mein kuch requests reject karna, taaki system completely fail na ho.
- Bounded queue: Pending work ki maximum limit rakhna.
- Timeouts: Requests ko indefinitely wait nahi karne dena.

Example: Overload mein API kuch requests ko 429 Too Many Requests ya 503 Service Unavailable de sakti hai, situation ke mutabik.

Senior question: Sab requests ko accept karke queue mein rakhna achha design kyun nahi hai?

Kyunki unlimited queue overload ko solve nahi karti—sirf delay karti hai aur resources exhaust kar sakti hai.

## 32. Bulkhead Pattern aur Fault Isolation

Scenario: Tumhari application mein payment, search aur notifications services hain. Search service slow ho gayi aur usne saare worker connections occupy kar liye. Ab payment requests bhi fail hone lagi.

Bulkhead pattern independent resource limits ya execution pools se failure ko isolate karta hai.

Example:

- Payment requests ke liye alag connection pool.
- Search ke liye bounded concurrency.
- Notifications ko background queue mein process karna.

Isse ek slow dependency poori application ko affect karne ki sambhavna kam hoti hai.

Circuit breaker se difference: Circuit breaker repeated failures par calls rok sakta hai; bulkhead resources aur capacity ko isolate karta hai. Dono saath use ho sakte hain.

Senior question: Ek external API slow ho, toh sirf retry lagana dangerous kyun ho sakta hai?

Retries load aur badha sakti hain. Retry budget, backoff, timeouts aur concurrency limits zaroori hain.

## 33. Graceful Shutdown aur Zero-Downtime Deployment

Scenario: Docker naya Node.js container deploy karne ke liye purana container stop kar raha hai. Purane container mein 20 requests abhi process ho rahi hain.

Agar process turant terminate ho gaya, toh requests fail ho sakti hain.

Graceful shutdown mein:

1. Application termination signal, jaise SIGTERM, receive karti hai.
2. Naye requests accept karna band karti hai.
3. Load balancer se instance ko remove/drain karne ka mechanism use hota hai.
4. In-flight requests aur necessary tasks ko limited time tak complete hone diya jata hai.
5. Database connections aur workers close kiye jaate hain.
6. Deadline ke baad process terminate ho sakta hai.

Senior question: Sirf Docker ka restart: unless-stopped graceful shutdown guarantee karta hai?

Nahi. Restart policy process ko dobara start karne mein help karti hai; request draining aur application cleanup separately implement karne hote hain.

## 34. Backward-Compatible Database Migrations

Scenario: Production mein 10 Node.js instances chal rahe hain. Tum users.name column ko first_name aur last_name mein split karna chahte ho.

Agar column turant rename ya delete kar diya, toh purane application instances fail ho sakte hain.

Ek safer approach expand-and-contract migration hai:

### Step 1 — Expand

Naye columns add karo, purana column abhi rakho.

### Step 2 — Migrate

Data backfill karo aur compatibility ke saath application ko update karo.

### Step 3 — Contract

Jab old code aur old column ki zaroorat na rahe, tab unhe remove karo.

Senior question: Rolling deployment ke dauran old aur new application versions ek hi database use kar rahe hon, toh migration kaise design karoge?

Schema ko temporarily dono versions ke compatible rakhoge aur destructive changes last mein karoge.

## 35. Multi-Tenancy aur Tenant Data Isolation

Scenario: Tum SaaS application bana rahe ho jise 500 companies use karengi. Har company ko sirf apna data dekhna chahiye.

Common models:

- Shared database, shared tables: Rows mein tenant_id hota hai.
- Separate schema: Har tenant ke liye separate schema.
- Separate database: Tenants ke databases alag hote hain.

Shared tables example:

\`\`\`sql
SELECT *
FROM orders
WHERE tenant_id = ? AND id = ?;
\`\`\`

Lekin sirf query mein tenant_id add karna enough nahi, agar application us filter ko kahin bhool sakti hai. Tenant identity trusted authentication context se aani chahiye; authorization checks, unique constraints aur suitable database protections bhi important hain.

Senior question: User request mein tenant_id badal kar doosri company ka data access karne se kaise rokoge?

Client ke bheje hue tenant ID par blindly trust nahi karoge. Server authenticated user ki tenant membership verify karega aur har relevant data operation ko enforce karega.

## 36. SLI, SLO, SLA aur Error Budget

Scenario: Business bolta hai ki API “hamesha fast aur available” honi chahiye. Tum senior engineer ke roop mein is expectation ko measurable kaise banaoge?

- SLI (Service Level Indicator): Actual measured metric, jaise successful requests ka percentage ya p95 latency.
- SLO (Service Level Objective): Internal reliability target, jaise monthly 99.9% successful requests.
- SLA (Service Level Agreement): Customer ke saath contractual commitment; ismein breach ke consequences ho sakte hain.
- Error budget: SLO ke against acceptable unreliability ka remaining allowance.

Example: Agar availability SLO 99.9% hai, toh idealized 30-day month mein total downtime budget lagbhag 43.2 minutes ke barabar hota hai. Exact calculation metric aur measurement window par depend karti hai.

Senior question: Agar application ka error budget jaldi consume ho raha ho, toh kya karoge?

Incident causes investigate karoge, risky releases ko temporarily slow/freeze karne par vichaar karoge aur reliability improvements prioritize karoge.

# 20 naye Senior Backend Engineering Concepts

## 1. Database Query Optimization (N+1 Query Problem)

**Performance**

Concept: Kabhi ek API ko 100 users return karne hote hain, lekin har user ke orders laane ke liye alag query chalti hain. Isse 1 query ke badle 101 queries execute ho sakti hain.

Scenario-based question:

Tumhari /api/users API 100 users return karti hai. Har user ke orders fetch karne ke liye separate SQL query chalti hai. Response time 3 seconds hai.

Senior backend engineer ke roop mein tum queries ko kaise optimize karoge, aur kaise prove karoge ki optimization se improvement hui hai?

## 2. Database Connection Pool Exhaustion

**Database**

Concept: Application database connections ka ek limited pool maintain karti hai. Agar saare connections busy ho jaayein, to naye requests connection milne ka wait karte hain.

Scenario-based question:

Traffic normal hai, phir bhi API kabhi-kabhi timeout hoti hai. MySQL CPU sirf 35% hai, lekin logs mein Connection pool exhausted aa raha hai.

Tum kaise identify karoge ki connections leak ho rahe hain, queries slow hain, ya pool capacity insufficient hai?

## 3. Hot Partition / Hot Key

**Scalability**

Concept: Distributed database ya cache mein data multiple partitions par hota hai. Agar saara traffic ek hi partition ya key par aaye, to woh bottleneck ban sakta hai.

Scenario-based question:

Tumhari e-commerce application mein ek popular product par lakhon users ek saath requests bhej rahe hain. Baaki products normally work kar rahe hain, lekin us product ki requests timeout ho rahi hain.

Tum hot partition ya hot key kaise detect aur mitigate karoge?

## 4. Write Amplification

**Storage**

Concept: Ek logical write ki wajah se database ya storage system ko multiple physical writes karni pad sakti hain. Indexes, replication aur storage-engine behavior write cost badha sakte hain.

Scenario-based question:

Ek table mein sirf ek field update hoti hai, lekin update throughput badhne par disk I/O bahut zyada ho jata hai aur write latency badh jaati hai.

Tum kaise investigate karoge ki indexes, replication, storage engine ya workload write amplification mein kitna contribute kar rahe hain?

## 5. Database Vacuuming / Table Bloat

**PostgreSQL**

Concept: PostgreSQL mein updates aur deletes purane row versions chhod sakte hain. Vacuuming unki cleanup aur space reuse mein help karti hai. Poor maintenance se table/index bloat ho sakta hai.

Scenario-based question:

PostgreSQL application mein kuch hafton ke baad table size bahut badh gaya hai, queries slow ho rahi hain aur disk space tezi se consume ho rahi hai.

Tum kaise pata karoge ki table bloat, vacuum lag, ya actual data growth problem hai? Production mein safe remediation kya hogi?

## 6. Database Schema Design and Normalization

**Data modeling**

Concept: Schema ko is tarah design karna ki data duplication aur inconsistency control mein rahe. Normalization aur denormalization ke beech workload ke hisaab se balance karna hota hai.

Scenario-based question:

Ek orders table mein customer ka naam aur address har order ke saath duplicate store kiya ja raha hai. Ab customer address update karne par purane orders ka data inconsistent ho jata hai.

Tum schema ko kaise redesign karoge? Aur historical invoice mein purana address preserve karna ho to kya approach loge?

## 7. Online Index Creation

**Zero-downtime DB changes**

Concept: Production database mein index create karte waqt writes block hone, CPU/I/O spike ya replication lag ka risk ho sakta hai. Database engine ke hisaab se online/concurrent index creation ke options alag hote hain.

Scenario-based question:

Ek 500-million-row table par naya index add karna hai. Normal index creation se production writes block ho sakti hain.

Tum index safely create, monitor aur verify kaise karoge? Agar index creation fail ho jaye to recovery plan kya hoga?

## 8. Data Retention and Archival

**Data lifecycle**

Concept: Har record ko forever hot database mein rakhna zaroori nahi hota. Retention, archival aur deletion policies storage cost, query performance aur compliance ko affect karti hain.

Scenario-based question:

Application mein 5 saal ke audit logs hain. Recent 30 days ka data frequently access hota hai, lekin purane records rarely read hote hain. Table ab bahut large ho chuki hai.

Tum retention, partitioning, archival aur deletion ka design kaise karoge, bina required audit history lose kiye?

## 9. Object Storage and Presigned URLs

**File uploads**

Concept: Images aur videos ko application server ke through stream karne ke bajaye object storage mein rakhna scalable ho sakta hai. Presigned URLs clients ko limited time ke liye direct upload/download access dete hain.

Scenario-based question:

Tumhari API par large video uploads aate hain. Traffic badhne par Node.js memory usage aur bandwidth cost bahut badh jaati hai.

Tum direct-to-object-storage upload design kaise karoge? File validation, access control aur incomplete uploads ko kaise handle karoge?

## 10. Content Delivery and Media Processing Pipeline

**Media systems**

Concept: File upload aur uski processing ko separate stages mein baantne se API responsive reh sakti hai. Thumbnails, compression aur format conversion background mein ho sakte hain.

Scenario-based question:

User profile image upload karta hai, lekin image processing ke dauran upload API 15 seconds tak response nahi deti. Kabhi processing fail hone par user ko broken image bhi dikhai deti hai.

Tum upload response, asynchronous processing, status tracking aur retry handling kaise design karoge?

## 11. Search Index Consistency

**Search systems**

Concept: Search engines jaise Elasticsearch/OpenSearch aksar primary database se asynchronously update hote hain. Isliye search results kuch samay tak purane ho sakte hain.

Scenario-based question:

User product ka price update karta hai, database mein naya price aa jata hai, lekin search result mein purana price 30 seconds tak dikhai deta hai.

Tum indexing pipeline, event delivery aur search freshness ko kaise improve karoge? Agar user ko immediately updated price chahiye, to source of truth kya hona chahiye?

## 12. API Versioning and Deprecation

**API design**

Concept: API contract change karte waqt purane clients ko achanak break nahi karna chahiye. Versioning, compatibility aur deprecation policy important hoti hai.

Scenario-based question:

Tum /v1/orders response se customer_name field remove karke customer object introduce karna chahte ho. Mobile apps ke kuch users mahino tak purane versions use karenge.

Tum API migration, compatibility, usage monitoring aur old version sunset ka plan kaise banaoge?

## 13. GraphQL Query Complexity and Abuse

**API security**

Concept: GraphQL flexible queries allow karta hai, lekin deeply nested ya overly broad queries database aur server resources ko exhaust kar sakti hain.

Scenario-based question:

Tumhare GraphQL server par ek request deeply nested relationships query karti hai aur hazaaron database operations trigger kar deti hai. Request count kam hai, phir bhi CPU high ho raha hai.

Tum query depth, complexity, pagination, batching aur authorization ko kaise use karoge? Sirf request-rate limiting kyun sufficient nahi ho sakti?

## 14. API Pagination at Scale

**Large datasets**

Concept: Offset pagination simple hai, lekin large offsets expensive ho sakte hain aur concurrent inserts/deletes ke kaaran pages inconsistent ho sakte hain. Cursor/keyset pagination ek alternative hai.

Scenario-based question:

Ek activity feed mein 20 million records hain. LIMIT 50 OFFSET 5000000 bahut slow hai, aur users ko scrolling ke dauran duplicate items bhi dikh rahe hain.

Tum cursor-based pagination kaise design karoge? Stable sorting, unique cursor aur newly inserted records ka kya behavior hoga?

## 15. File and Data Import Pipeline

**Batch processing**

Concept: CSV ya bulk data imports ko validate, process aur report karne ke liye chunking, checkpoints aur partial failure handling useful hain.

Scenario-based question:

Ek customer 2-million-row CSV import karta hai. Process 70% par crash ho jata hai. Dobara run karne par pehle se imported rows duplicate hone ka risk hai.

Tum resumable import pipeline kaise design karoge, jisme validation errors report hon, checkpoints hon aur retries safe hon?

## 16. Multi-Region Architecture and Data Residency

**Global systems**

Concept: Multiple geographic regions latency aur availability improve kar sakte hain, lekin cross-region replication, conflicting writes, failover aur data-residency requirements complexity badhate hain.

Scenario-based question:

Tumhari application India aur Europe mein users serve karti hai. Europe ke users ke liye latency high hai, aur kuch data Europe mein hi store rehna chahiye.

Tum regional reads/writes, replication, failover aur data residency ka architecture kaise design karoge? Network partition ke dauran kaun-se trade-offs consider karoge?

## 17. Feature Flags and Kill Switches

**Safe releases**

Concept: Feature flags se code deploy kiye bina feature enable/disable ya selected users ko rollout kiya ja sakta hai. Kill switch kisi risky functionality ko quickly disable kar sakta hai.

Scenario-based question:

Naya recommendation feature deploy hua aur achanak database load 3x ho gaya. Full rollback se doosre important bug fixes bhi reverse ho jayenge.

Tum feature flag se impact kaise contain karoge? Flag evaluation, default behavior aur stale flags ko clean up karne ka plan kya hoga?

## 18. Disaster Recovery: RPO and RTO

**Reliability**

Concept:

- RPO (Recovery Point Objective): Maximum acceptable data loss, time ke terms mein.
- RTO (Recovery Time Objective): Service ko recover karne ka maximum target time.

Backups hona aur backup se successfully restore kar paana do alag cheezein hain.

Scenario-based question:

Business kehta hai ki database failure ke baad service 30 minutes mein restore honi chahiye aur maximum 5 minutes ka data lose ho sakta hai.

Tum backup frequency, replication, point-in-time recovery aur restore drills ka plan kaise banaoge? Sirf daily backup kyun enough nahi hoga?

## 19. Capacity Planning and Load Testing

**Performance engineering**

Concept: Load testing se pata chalta hai ki system expected traffic, traffic spikes aur saturation points par kaise behave karta hai. Sirf average latency dekhna enough nahi hota.

Scenario-based question:

Next month tumhari application par expected traffic 5x hone wala hai. Current system load test mein 2x traffic tak stable hai, uske baad p99 latency sharply increase hoti hai.

Tum realistic load test kaise plan karoge? Kaun-se metrics, traffic patterns aur saturation signals use karke capacity decide karoge?

## 20. Resource Leaks and Long-Running Process Stability

**Node.js production**

Concept: Memory leak, unclosed sockets, timers, event listeners ya database cursors long-running service ko gradually unstable bana sakte hain. Container restart symptoms ko temporarily hide kar sakta hai, root cause fix nahi karta.

Scenario-based question:

Node.js service deploy ke baad initially normal hoti hai, lekin 24–48 hours mein memory 300 MB se 2.5 GB tak badh jaati hai. Container restart karne par memory reset ho jaati hai.

Tum memory leak aur normal caching ke beech difference kaise identify karoge? Heap snapshots, GC metrics aur production-safe debugging kaise use karoge?
