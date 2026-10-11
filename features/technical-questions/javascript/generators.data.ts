import type { TechnicalQuestion } from "../../../types/interview";

export const generatorsQuestion: TechnicalQuestion = {
  id: "generators",
  question: "What is a generator in JavaScript?",
  definition: "A generator is a special function that can pause its execution using yield and continue from where it stopped when we call next().",
  memoryLine: "A generator can pause and resume its execution.",
  contentSections: [
    {
      title: "Basic example: pause and resume",
      blocks: [
        { type: "code", code: `function* generateNumbers() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = generateNumbers();

console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: undefined, done: true }`, explanations: [
          "function* defines a generator function.",
          "Calling generateNumbers() returns a generator object. It does not run the whole function immediately.",
          "yield provides a value and pauses the function. Each next() continues from where it stopped until the next yield or the function finishes.",
          "done: false means this value was yielded and the generator can continue. done: true means it has finished. If the function has an explicit return value, that value can appear in the final result.",
        ] },
      ],
    },
    {
      title: "Generator function vs normal function",
      blocks: [
        { type: "table", headings: ["Feature", "Normal Function", "Generator Function"], rows: [
          ["Syntax", "function", "function*"],
          ["Calling it", "Executes the function normally", "Returns a generator object"],
          ["Pause and resume", "No built-in yield behavior", "Yes, using yield and next()"],
          ["Return behavior", "Returns a value or undefined", "Produces an iterator with value and done"],
          ["Common use", "Normal business logic", "Custom iterators and lazy sequences"],
        ] },
        { type: "text", text: "A generator is not automatically asynchronous. JavaScript also supports async function* generators, which can yield values while working with asynchronous operations." },
      ],
    },
  ],
  examplesHeading: "Production examples",
  examples: [
    {
      title: "Process records in batches",
      code: `function* getBatches(items, batchSize) {
  for (let i = 0; i < items.length; i += batchSize) {
    yield items.slice(i, i + batchSize);
  }
}

const records = [1, 2, 3, 4, 5, 6, 7];

for (const batch of getBatches(records, 3)) {
  console.log(batch);
}`,
      explanations: [
        "Each iteration produces one batch of records.",
        "This can make batch-processing logic easier to organize.",
        "The original array is already in memory, so this example does not reduce the memory needed to hold it.",
      ],
    },
    {
      title: "Generate sequential ticket IDs",
      code: `function* ticketIdGenerator() {
  let id = 1000;

  while (true) {
    yield id++;
  }
}

const ticketIds = ticketIdGenerator();

console.log(ticketIds.next().value); // 1000
console.log(ticketIds.next().value); // 1001
console.log(ticketIds.next().value); // 1002`,
      explanations: [
        "The generator remembers id between calls.",
        "Each next() call produces the next number.",
        "This only demonstrates sequential IDs in one generator instance. It is not a production-safe globally unique ID system. A real multi-user application should usually use a database or a suitable ID service to avoid collisions.",
      ],
    },
    {
      title: "Generate values only when requested",
      code: `function* numbersUpTo(limit) {
  for (let i = 1; i <= limit; i++) {
    yield i;
  }
}

const numbers = numbersUpTo(3);

console.log(numbers.next().value); // 1
console.log(numbers.next().value); // 2`,
      explanations: [
        "Values are produced when the caller requests them. This is called lazy evaluation.",
        "Lazy generation can help with large or potentially unbounded sequences.",
        "A generator does not automatically stream database or API responses. The data source must support the behavior needed.",
      ],
    },
  ],
  interviewAnswer: "A generator is a special function in JavaScript that can pause and resume its execution.\n\nWe define it using function star syntax, and we use the yield keyword to return a value and pause the function.\n\nWhen we call next(), the generator continues from where it stopped and returns an object containing value and done.\n\nGenerators are useful for lazy value generation, custom iteration, and processing data in batches.\n\nFor example, I can use a generator to produce records in batches instead of writing all the iteration logic in one place. However, a generator does not automatically reduce memory usage if all the data is already loaded into an array.",
  memoryPoints: [
    "function* defines a generator.",
    "Calling it returns a generator object.",
    "yield pauses execution and provides a value.",
    "next() resumes execution.",
    "The result contains value and done.",
    "Generators can remember their local state between calls.",
    "Lazy generation produces values when requested.",
    "Generators are synchronous unless using async generator syntax.",
    "Generators do not automatically stream database or API data.",
  ],
};
