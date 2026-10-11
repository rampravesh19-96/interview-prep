import type { TechnicalQuestion } from "../../../types/interview";

export const iteratorsQuestion: TechnicalQuestion = {
  id: "iterators",
  question: "What is an iterator in JavaScript?",
  definition: "An iterator is an object that lets us access values one by one by calling its next() method. Each call returns an object containing value and done.",
  memoryLine: "An iterator gives us the next value whenever we ask for it.",
  contentSections: [
    {
      title: "Basic example: array iterator",
      blocks: [
        {
          type: "code",
          code: `const numbers = [10, 20, 30];

const iterator = numbers[Symbol.iterator]();

console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true }`,
          explanations: [
            "An array is iterable. Calling its Symbol.iterator method gives us an iterator.",
            "Each call to next() returns an object with value and done.",
            "done: false means there is a value to read. done: true means the iterator has finished.",
            "After this array iterator is exhausted, further next() calls keep returning done: true.",
          ],
        },
      ],
    },
    {
      title: "Iterable vs iterator",
      blocks: [
        {
          type: "table",
          headings: ["Feature", "Iterable", "Iterator"],
          rows: [
            ["Purpose", "Can provide an iterator", "Provides values one at a time"],
            ["Main interface", "Symbol.iterator", "next()"],
            ["Examples", "Array, string, Map, Set", "An object returned by Symbol.iterator()"],
            ["Used by", "for...of can request its iterator", "next() calls read the values"],
          ],
        },
        {
          type: "text",
          text: "An iterable can create an iterator. They are often different objects, though the same object can be both iterable and iterator.",
        },
      ],
    },
    {
      title: "Create a custom iterable",
      blocks: [
        {
          type: "code",
          code: `const ticketQueue = {
  tickets: ["T-101", "T-102", "T-103"],

  [Symbol.iterator]() {
    let index = 0;
    const tickets = this.tickets;

    return {
      next() {
        if (index < tickets.length) {
          return { value: tickets[index++], done: false };
        }

        return { value: undefined, done: true };
      }
    };
  }
};

for (const ticketId of ticketQueue) {
  console.log(ticketId);
}`,
          explanations: [
            "Symbol.iterator makes ticketQueue iterable.",
            "It returns an iterator with a next() method.",
            "Each next() call returns one ticket and done: false, until there are no tickets left.",
            "for...of gets the iterator and keeps calling next() until done is true.",
            "For ordinary arrays, the built-in array iterator is usually enough; a custom iterator is useful when we need custom iteration behavior.",
          ],
        },
      ],
    },
    {
      title: "Iterator vs generator",
      blocks: [
        {
          type: "table",
          headings: ["Feature", "Iterator", "Generator"],
          rows: [
            ["What it is", "An object that returns values through next()", "A function* that creates a generator object"],
            ["Creation", "Can be written by hand with Symbol.iterator and next()", "Created by calling a generator function"],
            ["Producing values", "next() returns { value, done }", "yield produces values as next() is called"],
            ["State", "The iterator implementation tracks its progress", "The generator automatically remembers where it paused"],
            ["Common use", "Custom step-by-step access to values", "A simpler way to create an iterator"],
          ],
        },
        {
          type: "text",
          text: "A generator object is both an iterator and an iterable. Generator functions make it easier to implement the iterator protocol with the yield keyword.",
        },
      ],
    },
  ],
  examplesHeading: "Production examples",
  examples: [
    {
      title: "Process ticket IDs one by one",
      code: `const ticketIds = ["T-201", "T-202", "T-203"];
const ticketIterator = ticketIds[Symbol.iterator]();

let result = ticketIterator.next();

while (!result.done) {
  console.log("Processing ticket " + result.value);
  result = ticketIterator.next();
}`,
      explanations: [
        "The array provides an iterator for its ticket IDs.",
        "The while loop processes one value at a time until done becomes true.",
        "This gives us step-by-step control over iteration. For ordinary list processing, for...of is usually shorter.",
      ],
    },
    {
      title: "Read pages from an in-memory list",
      code: `const pages = ["Page 1", "Page 2", "Page 3"];
const pageIterator = pages[Symbol.iterator]();

console.log(pageIterator.next().value); // Page 1
console.log(pageIterator.next().value); // Page 2` ,
      explanations: [
        "Each next() call gives us the next page value from this in-memory array.",
        "This can be helpful when code needs manual control over stepping through values.",
        "A normal array iterator does not fetch API pages. Real API pagination needs explicit requests; an iterator or generator can be used to organize that fetching logic.",
      ],
    },
    {
      title: "Process unique support roles",
      code: `const roles = new Set(["admin", "agent", "viewer"]);

for (const role of roles) {
  console.log(role);
}`,
      explanations: [
        "A Set is iterable, and it provides an iterator for its values.",
        "for...of consumes that iterator and gives us each role in turn.",
        "A Set stores unique values, which can be useful when processing a list of distinct roles.",
      ],
    },
  ],
  interviewAnswer: "An iterator is an object that allows us to access values one by one using its next() method.\n\nEach call to next() returns an object containing value and done. The value contains the current result, and done tells us whether iteration has finished.\n\nIn JavaScript, arrays, strings, Maps, and Sets are iterable. We can get an iterator by calling their Symbol.iterator method.\n\nFor example, in a helpdesk application, I can iterate through ticket IDs one by one using an array iterator.\n\nGenerators are also related to iterators because a generator function provides an easy way to create an iterator using the yield keyword.",
  memoryPoints: [
    "An iterator is an object that provides values one by one.",
    "next() moves to the next value.",
    "The result contains value and done.",
    "An iterable provides an iterator through Symbol.iterator.",
    "Arrays, strings, Maps, and Sets are iterable.",
    "for...of consumes an iterable.",
    "A custom iterator implements next().",
    "A generator object is both an iterator and an iterable.",
    "Generators make custom iterator logic easier with yield.",
  ],
};
