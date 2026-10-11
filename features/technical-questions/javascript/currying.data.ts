import type { TechnicalQuestion } from "../../../types/interview";

export const curryingQuestion: TechnicalQuestion = {
  id: "currying",
  question: "What is currying in JavaScript?",
  definition: "Currying is a technique in JavaScript that converts a function with multiple arguments into a sequence of functions, where each function takes one argument at a time.",
  memoryLine: "One argument at a time.",
  examplesHeading: "Basic and reusable examples",
  examples: [
    {
      title: "Basic example: add one argument at a time",
      code: `function add(a) {
  return function (b) {
    return a + b;
  };
}

console.log(add(2)(3)); // 5`,
      explanations: [
        "add(2) calls the outer function with a = 2.",
        "It returns another function.",
        "The returned function receives b = 3.",
        "It returns 2 + 3, which is 5.",
        "The inner function remembers a through a closure. Currying creates a sequence of calls, and the closure remembers a value from an earlier call.",
      ],
    },
    {
      title: "E-commerce: reusable discount calculator",
      code: `function calculateDiscount(discountPercentage) {
  return function (price) {
    return price - (price * discountPercentage) / 100;
  };
}

const tenPercentDiscount = calculateDiscount(10);

console.log(tenPercentDiscount(1000)); // 900
console.log(tenPercentDiscount(2000)); // 1800`,
      explanations: [
        "The first call configures the discount percentage.",
        "The returned function remembers that percentage.",
        "We can calculate discounts for different prices without passing the percentage again.",
        "This pattern can create reusable, configured functions. Real pricing and discount rules should be validated against the application's business logic.",
      ],
    },
    {
      title: "Configurable logger",
      code: `function createLogger(level) {
  return function (message) {
    console.log(\`[\${level}] \${message}\`);
  };
}

const errorLogger = createLogger("ERROR");
const infoLogger = createLogger("INFO");

errorLogger("Database connection failed");
infoLogger("Application started");`,
      explanations: [
        "createLogger(\"ERROR\") creates a function configured for error messages.",
        "That returned function remembers the value \"ERROR\".",
        "The same function can log many messages without receiving the level every time.",
        "This is useful for configurable callbacks and logging utilities. Production logging systems may use a dedicated logging library.",
      ],
    },
    {
      title: "API request configuration: build URLs",
      code: `function createApiUrl(baseUrl) {
  return function (endpoint) {
    return \`\${baseUrl}/\${endpoint}\`;
  };
}

const apiUrl = createApiUrl("https://api.example.com");

console.log(apiUrl("users"));
// https://api.example.com/users

console.log(apiUrl("products"));
// https://api.example.com/products`,
      explanations: [
        "The first call configures the base URL.",
        "The returned function remembers the base URL.",
        "We can create URLs for different endpoints without repeating the base URL.",
        "This is an illustrative URL-building example. It does not make an HTTP request.",
      ],
    },
  ],
  comparison: {
    title: "Normal function vs curried function",
    examples: [
      {
        title: "Normal function",
        code: `function multiply(a, b) {
  return a * b;
}

console.log(multiply(2, 3)); // 6`,
        explanations: ["A normal function receives both arguments in one call."],
      },
      {
        title: "Curried function",
        code: `function multiply(a) {
  return function (b) {
    return a * b;
  };
}

console.log(multiply(2)(3)); // 6`,
        explanations: [
          "The curried function receives the arguments in separate function calls.",
          "Currying can help when we want to configure and reuse functions. It is a programming technique, not something required for every function.",
        ],
      },
    ],
    summary: "The normal function takes both values together. The curried function takes one value, then the next.",
  },
  interviewAnswer: "Currying is a technique in JavaScript where a function that takes multiple arguments is converted into a sequence of functions, with each function taking one argument at a time.\n\nFor example, instead of calling a function like add(2, 3), we can call it like add(2)(3).\n\nCurrying is useful for creating reusable functions, such as a discount calculator with a fixed discount percentage, a configurable logger, or a function with a predefined API base URL.\n\nCurrying also uses closures because inner functions can remember values passed during earlier function calls.",
  memoryPoints: [
    "Multiple arguments become a sequence of functions",
    "One argument at a time",
    "add(2)(3)",
    "Inner function remembers previous values",
    "Closure connection",
    "Reusable configured functions",
  ],
};
