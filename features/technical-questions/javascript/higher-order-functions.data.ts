import type { TechnicalQuestion } from "../../../types/interview";

export const higherOrderFunctionsQuestion: TechnicalQuestion = {
  id: "higher-order-functions",
  question: "What is a higher-order function in JavaScript?",
  definition: "A higher-order function is a function that takes another function as an argument, returns a function, or does both.",
  memoryLine: "A function that works with another function.",
  examplesHeading: "Basic and production examples",
  examples: [
    {
      title: "Basic example: pass a function as an argument",
      code: `function greet(name) {
  return \`Hello, \${name}\`;
}

function processUser(callback) {
  return callback("Ram");
}

console.log(processUser(greet)); // Hello, Ram`,
      explanations: [
        "greet is a normal function.",
        "processUser takes another function as an argument.",
        "Therefore, processUser is a higher-order function.",
      ],
    },
    {
      title: "Transform API data with map()",
      code: `const users = [
  { id: 1, name: "Ram" },
  { id: 2, name: "Amit" }
];

const userNames = users.map((user) => user.name);

console.log(userNames); // ["Ram", "Amit"]`,
      explanations: [
        "map() accepts a callback function and calls it for each user.",
        "It returns a new array of names, ready to use when displaying the API data in a React UI.",
      ],
    },
    {
      title: "Show open support tickets with filter()",
      code: `const tickets = [
  { id: 101, status: "open" },
  { id: 102, status: "closed" },
  { id: 103, status: "open" }
];

const openTickets = tickets.filter(
  (ticket) => ticket.status === "open"
);

console.log(openTickets);`,
      explanations: [
        "filter() accepts a callback to check each ticket.",
        "The callback decides which items stay in the new array.",
        "Here, openTickets contains only tickets with an open status, as a helpdesk screen might need.",
      ],
    },
    {
      title: "Add logging with a reusable function wrapper",
      code: `function withLogging(callback) {
  return function (...args) {
    console.log("Function called");

    return callback(...args);
  };
}

function add(a, b) {
  return a + b;
}

const loggedAdd = withLogging(add);

console.log(loggedAdd(2, 3)); // 5`,
      explanations: [
        "withLogging accepts a function and returns a new function.",
        "The wrapper logs a message before calling the original function with its arguments.",
        "This can add reusable behavior around another function.",
      ],
    },
  ],
  comparison: {
    title: "Higher-order function vs callback",
    examples: [
      {
        title: "See which function is which",
        code: `function greet(name) {
  return \`Hello, \${name}\`;
}

function processUser(callback) {
  return callback("Ram");
}

console.log(processUser(greet));`,
        explanations: [
          "processUser is the higher-order function because it accepts callback.",
          "greet is the callback because it is passed to processUser to be called.",
        ],
      },
    ],
    summary: "A higher-order function accepts or returns another function. A callback is the function passed in to be called.",
  },
  interviewAnswer: "A higher-order function is a function that takes another function as an argument or returns a function.\n\nIn JavaScript, we commonly use higher-order functions with array methods like map, filter, and reduce.\n\nFor example, in a helpdesk application, I can use filter to display only open tickets. The filter method takes a callback function that checks each ticket's status.\n\nWe can also create our own higher-order functions to reuse logic, such as adding logging around another function.\n\nHigher-order functions help us write reusable, clean, and flexible code.",
  memoryPoints: [
    "Takes a function as an argument, returns a function, or both.",
    "map() transforms array items.",
    "filter() selects matching items.",
    "reduce() combines array items into one result.",
    "Custom higher-order functions can wrap other functions.",
    "Callback = a function passed to another function.",
  ],
};
