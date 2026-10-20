
export type BackendConcept = {
  id: number;
  title: string;
  category: string;
  explanation: string;
  example: string;
  points: string[];
};

export const backendConcepts: BackendConcept[] = [
  {
    id: 1,
    title: "What is Node.js?",
    category: "Node.js",
    explanation:
      "Node.js is a JavaScript runtime. It allows us to run JavaScript outside the browser, mainly for backend development.",
    example:
      'const http = require("http");\n\nconst server = http.createServer((req, res) => {\n  res.end("Hello from Node.js");\n});\n\nserver.listen(3000);',
    points: [
      "Node.js uses the V8 JavaScript engine.",
      "It is useful for I/O-heavy applications.",
      "It provides modules for HTTP, files, streams and other operations.",
    ],
  },
  {
    id: 2,
    title: "Event Loop",
    category: "Node.js",
    explanation:
      "The event loop allows Node.js to handle asynchronous operations without blocking JavaScript execution while waiting for many I/O operations.",
    example:
      'console.log("Start");\n\nsetTimeout(() => {\n  console.log("Timer");\n}, 0);\n\nconsole.log("End");\n\n// Output:\n// Start\n// End\n// Timer',
    points: [
      "Synchronous code runs first.",
      "Callbacks run according to the event loop and their scheduling rules.",
      "Long CPU-heavy JavaScript can block the event loop.",
    ],
  },
  {
    id: 3,
    title: "Process vs Worker Thread",
    category: "Node.js",
    explanation:
      "A process is an independent running program. Worker threads run JavaScript in separate threads within the same Node.js process.",
    example:
      'const { Worker } = require("worker_threads");\n\nconst worker = new Worker(\n  "console.log(\'Running in worker thread\')",\n  { eval: true }\n);',
    points: [
      "Separate processes have separate process memory spaces.",
      "Worker threads can communicate using messages and can transfer data.",
      "Worker threads are useful for CPU-intensive JavaScript tasks.",
    ],
  },
  {
    id: 4,
    title: "Callbacks, Promises and Async/Await",
    category: "JavaScript",
    explanation:
      "These are ways to work with asynchronous operations. Promises represent future results, and async/await makes Promise-based code easier to read.",
    example:
      'async function getUser() {\n  try {\n    const user = await fetchUser();\n    console.log(user);\n  } catch (error) {\n    console.error(error);\n  }\n}',
    points: [
      "A callback is a function passed to another function.",
      "A Promise can be pending, fulfilled or rejected.",
      "Use try/catch to handle errors from awaited Promises.",
    ],
  },
  {
    id: 5,
    title: "Express Middleware",
    category: "Express.js",
    explanation:
      "Middleware is a function that can access the request, response and next function. It can run logic before the request reaches the final route handler.",
    example:
      'const express = require("express");\nconst app = express();\n\napp.use(express.json());\n\napp.use((req, res, next) => {\n  console.log(req.method, req.url);\n  next();\n});\n\napp.get("/users", (req, res) => {\n  res.json([]);\n});',
    points: [
      "Middleware can log requests, validate data and check authentication.",
      "Call next() to continue to the next middleware when appropriate.",
      "Error-handling middleware uses four parameters: err, req, res and next.",
    ],
  },
  {
    id: 6,
    title: "REST API",
    category: "API",
    explanation:
      "A REST-style API exposes resources through HTTP endpoints and uses HTTP methods to perform operations on those resources.",
    example:
      "GET    /users       - Get users\nPOST   /users       - Create a user\nGET    /users/10    - Get one user\nPATCH  /users/10    - Update part of a user\nDELETE /users/10    - Delete a user",
    points: [
      "GET is commonly used to read data.",
      "POST is commonly used to create data.",
      "PUT replaces a resource; PATCH updates selected fields.",
      "Use suitable HTTP status codes in responses.",
    ],
  },
  {
    id: 7,
    title: "Authentication vs Authorization",
    category: "Security",
    explanation:
      "Authentication checks who the user is. Authorization checks what that user is allowed to do.",
    example:
      'app.get("/admin", authenticateUser, (req, res) => {\n  if (req.user.role !== "admin") {\n    return res.status(403).json({ message: "Forbidden" });\n  }\n\n  res.json({ message: "Welcome admin" });\n});',
    points: [
      "A login process commonly performs authentication.",
      "Roles and permissions are commonly used for authorization.",
      "Never trust a role or user ID sent by the client without verification.",
    ],
  },
  {
    id: 8,
    title: "JWT",
    category: "Security",
    explanation:
      "A JSON Web Token is a compact token format often used to carry signed claims between a client and a server.",
    example:
      'const jwt = require("jsonwebtoken");\n\nconst token = jwt.sign(\n  { userId: "123" },\n  process.env.JWT_SECRET,\n  { expiresIn: "1h" }\n);',
    points: [
      "Verify the token before trusting its claims.",
      "Keep signing secrets outside source code.",
      "A signed JWT is not automatically encrypted.",
      "Use expiration and an appropriate token-revocation strategy.",
    ],
  },
  {
    id: 9,
    title: "MongoDB and Mongoose",
    category: "Database",
    explanation:
      "MongoDB is a document database. Mongoose is an ODM library that provides schemas, models and validation for MongoDB in Node.js.",
    example:
      'const mongoose = require("mongoose");\n\nconst userSchema = new mongoose.Schema({\n  name: { type: String, required: true },\n  email: { type: String, required: true, unique: true }\n});\n\nconst User = mongoose.model("User", userSchema);',
    points: [
      "A collection contains documents.",
      "A schema defines the expected structure and validation rules.",
      "Use indexes to improve suitable query patterns.",
      "Handle database errors and duplicate-key errors.",
    ],
  },
  {
    id: 10,
    title: "SQL Joins and Indexes",
    category: "Database",
    explanation:
      "A JOIN combines related rows from tables. An index helps the database find matching records more efficiently for supported queries.",
    example:
      "SELECT users.name, orders.total\nFROM users\nJOIN orders ON orders.user_id = users.id\nWHERE users.id = 10;",
    points: [
      "INNER JOIN returns matching rows.",
      "LEFT JOIN keeps all rows from the left table.",
      "Indexes can speed up reads but add storage and write overhead.",
      "Use EXPLAIN to inspect query plans where supported.",
    ],
  },
  {
    id: 11,
    title: "Caching with Redis",
    category: "Performance",
    explanation:
      "Redis is an in-memory data store often used for caching, rate limiting, queues and temporary data.",
    example:
      'const cachedUser = await redis.get("user:123");\n\nif (cachedUser) {\n  return JSON.parse(cachedUser);\n}\n\nconst user = await User.findById("123");\n\nif (user) {\n  await redis.set("user:123", JSON.stringify(user), {\n    EX: 60\n  });\n}\n\nreturn user;',
    points: [
      "A cache can reduce repeated database reads.",
      "Choose a suitable expiration time (TTL).",
      "Plan how cached data will be invalidated after updates.",
      "Handle cache failures according to the application requirements.",
    ],
  },
  {
    id: 12,
    title: "Error Handling",
    category: "Express.js",
    explanation:
      "Error handling ensures failures are logged and clients receive predictable responses without exposing internal details.",
    example:
      'app.use((err, req, res, next) => {\n  console.error(err);\n\n  if (res.headersSent) {\n    return next(err);\n  }\n\n  res.status(500).json({\n    message: "Internal server error"\n  });\n});',
    points: [
      "Validate incoming request data.",
      "Use centralized error handling where practical.",
      "Do not expose stack traces or secrets in production responses.",
      "Log enough information to investigate failures.",
    ],
  },
  {
    id: 13,
    title: "Pagination",
    category: "Database",
    explanation:
      "Pagination returns a limited portion of a large result set instead of loading every record at once.",
    example:
      'const page = Math.max(1, Number(req.query.page) || 1);\nconst limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));\nconst skip = (page - 1) * limit;\n\nconst users = await User.find()\n  .skip(skip)\n  .limit(limit);',
    points: [
      "Set a reasonable maximum page size.",
      "Offset pagination is simple but can become costly for large offsets.",
      "Cursor-based pagination can work better for large or frequently changing datasets.",
    ],
  },
  {
    id: 14,
    title: "Rate Limiting",
    category: "Security",
    explanation:
      "Rate limiting restricts how many requests a client can make during a period to help protect APIs from excessive traffic and abuse.",
    example:
      'const rateLimit = require("express-rate-limit");\n\napp.use("/api", rateLimit({\n  windowMs: 15 * 60 * 1000,\n  limit: 100,\n  standardHeaders: true,\n  legacyHeaders: false\n}));',
    points: [
      "Apply stricter limits to sensitive endpoints such as login.",
      "Use a shared store when limits must work across multiple server instances.",
      "Configure client IP handling carefully behind proxies.",
    ],
  },
  {
    id: 15,
    title: "Environment Variables",
    category: "Deployment",
    explanation:
      "Environment variables keep configuration separate from application code, such as ports, database URLs and secret keys.",
    example:
      'require("dotenv").config();\n\nconst port = process.env.PORT || 3000;\nconst databaseUrl = process.env.DATABASE_URL;\n\nif (!databaseUrl) {\n  throw new Error("DATABASE_URL is required");\n}',
    points: [
      "Do not commit real secrets to version control.",
      "Validate required configuration at startup.",
      "Use different configuration for development, testing and production.",
    ],
  },
  {
    id: 16,
    title: "Queues and Background Jobs",
    category: "Architecture",
    explanation:
      "A job queue lets the application process work asynchronously outside the main HTTP request, such as sending emails or generating reports.",
    example:
      'app.post("/reports", async (req, res) => {\n  const job = await reportQueue.add("generate-report", {\n    userId: req.user.id\n  });\n\n  res.status(202).json({ jobId: job.id });\n});',
    points: [
      "Return quickly when work does not need to finish during the request.",
      "Design jobs to handle retries safely.",
      "Use idempotency to avoid duplicate side effects.",
      "Monitor failed jobs and queue backlog.",
    ],
  },
  {
    id: 17,
    title: "Database Transactions",
    category: "Database",
    explanation:
      "A transaction groups database operations so they can succeed or fail together according to the database's transaction guarantees.",
    example:
      "BEGIN;\n\nUPDATE accounts\nSET balance = balance - 100\nWHERE id = 1;\n\nUPDATE accounts\nSET balance = balance + 100\nWHERE id = 2;\n\nCOMMIT;",
    points: [
      "Transactions help preserve consistency across related updates.",
      "Rollback changes when a transaction fails.",
      "Keep transactions short where possible.",
      "Transaction APIs differ between database systems.",
    ],
  },
  {
    id: 18,
    title: "Unit and Integration Testing",
    category: "Testing",
    explanation:
      "Unit tests check a small unit in isolation. Integration tests check whether multiple components work together, such as an API and its database.",
    example:
      'const sum = (a, b) => a + b;\n\ntest("adds two numbers", () => {\n  expect(sum(2, 3)).toBe(5);\n});',
    points: [
      "Test normal cases, edge cases and failures.",
      "Integration tests should verify important interactions.",
      "Avoid depending on production data in tests.",
      "Keep tests repeatable and independent.",
    ],
  },
];
