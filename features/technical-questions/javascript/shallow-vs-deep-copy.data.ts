import type { TechnicalQuestion } from "../../../types/interview";

export const shallowVsDeepCopyQuestion: TechnicalQuestion = {
  id: "shallow-vs-deep-copy",
  question: "What is the difference between shallow copy and deep copy?",
  definition: "A shallow copy creates a new outer object, but nested objects are still shared with the original object.",
  definitionItems: [
    { label: "Shallow Copy", text: "A shallow copy creates a new outer object, but nested objects are still shared with the original object." },
    { label: "Deep Copy", text: "A deep copy creates a new object and also copies its nested objects, so changes to the copied nested data do not affect the original." },
  ],
  memoryLine: "Outer object is new, but nested objects are shared.",
  memoryLines: [
    { label: "Shallow copy", text: "Outer object is new, but nested objects are shared." },
    { label: "Deep copy", text: "Nested objects are copied too." },
  ],
  examplesHeading: "Basic and production examples",
  contentSections: [
    {
      title: "Basic example: shallow copy",
      blocks: [
        { type: "code", code: `const original = {
  name: "Ram",
  address: {
    city: "Katihar"
  }
};

const shallowCopy = { ...original };

shallowCopy.name = "Amit";
shallowCopy.address.city = "Patna";

console.log(original.name); // "Ram"
console.log(original.address.city); // "Patna"`, explanations: [
          "The spread operator creates a new outer object.",
          "Changing shallowCopy.name does not change original.name.",
          "address is nested, and both objects reference the same address object. Changing shallowCopy.address.city also changes the original.",
          "Object spread ({ ...obj }) and Object.assign() make shallow copies, not deep copies.",
        ] },
      ],
    },
    {
      title: "Basic example: deep copy with structuredClone()",
      blocks: [
        { type: "code", code: `const original = {
  name: "Ram",
  address: {
    city: "Katihar"
  }
};

const deepCopy = structuredClone(original);

deepCopy.address.city = "Patna";

console.log(original.address.city); // "Katihar"
console.log(deepCopy.address.city); // "Patna"`, explanations: [
          "structuredClone() makes an independent copy of supported data, including nested objects.",
          "Changing the copied address does not change the original address.",
          "It supports many common data types and circular references, but not every JavaScript value. Functions and some other values cannot be cloned this way.",
        ] },
      ],
    },
    {
      title: "JSON stringify/parse caveat",
      blocks: [
        { type: "code", code: `const copy = JSON.parse(JSON.stringify(original));`, explanations: [
          "This is an older copying technique with important limits.",
          "It loses or changes values such as undefined, functions, and some special types. It also does not support circular references.",
          "It is not a general-purpose replacement for structuredClone().",
        ] },
      ],
    },
    {
      title: "Shallow copy vs deep copy",
      blocks: [
        { type: "table", headings: ["Feature", "Shallow Copy", "Deep Copy"], rows: [
          ["Outer object", "New object", "New object"],
          ["Nested objects", "Shared references", "Copied recursively for supported data"],
          ["Nested mutation", "May affect original", "Does not affect original for copied data"],
          ["Typical approach", "Spread operator, Object.assign()", "structuredClone()"],
          ["Common use", "Targeted immutable updates", "Independent copy of nested data"],
        ] },
      ],
    },
  ],
  examples: [
    {
      title: "React state: copy each changed level",
      code: `const user = {
  name: "Ram",
  address: {
    city: "Katihar"
  }
};

const updatedUser = {
  ...user,
  address: {
    ...user.address,
    city: "Patna"
  }
};`,
      explanations: [
        "The outer user object is copied, and the nested address object is also copied.",
        "Unchanged fields are preserved. This is a targeted immutable update, not a full deep clone of the entire object tree.",
        "In React, update state without mutating existing objects. Use the functional state setter when the new value depends on the previous value.",
      ],
    },
    {
      title: "Helpdesk ticket: update nested customer data",
      code: `const ticket = {
  id: 101,
  status: "open",
  customer: {
    name: "Ram",
    email: "ram@example.com"
  }
};

const updatedTicket = {
  ...ticket,
  customer: {
    ...ticket.customer,
    name: "Amit"
  }
};`,
      explanations: [
        "Copying only ticket with { ...ticket } would still share its nested customer object.",
        "This version copies both ticket and customer before changing the name, so the original ticket's customer data is not changed.",
      ],
    },
    {
      title: "Independent copy of nested settings",
      code: `const settings = {
  notifications: {
    email: true,
    sms: false
  }
};

const draftSettings = structuredClone(settings);

draftSettings.notifications.email = false;`,
      explanations: [
        "structuredClone() creates an independent copy of supported nested data.",
        "Changing draftSettings.notifications.email does not change settings.notifications.email, provided the values can be cloned by structuredClone().",
        "Do not deep-clone everything by default. Targeted copying is usually preferable for normal React state updates.",
      ],
    },
  ],
  interviewAnswer: "Shallow copy and deep copy are two ways to copy objects in JavaScript.\n\nA shallow copy creates a new outer object, but nested objects are still shared with the original. We can create a shallow copy using the spread operator or Object.assign.\n\nA deep copy also copies nested objects, so changes to the copied nested data do not affect the original. For supported data, we can use structuredClone.\n\nFor example, in React, if I copy a user object using the spread operator and then modify its nested address, the original address can also change because it is shared.\n\nTo avoid this, I can copy the nested address separately when updating the state. I use targeted immutable updates for normal state changes and deep cloning only when I need an independent copy of the nested data.",
  memoryPoints: [
    "Shallow copy: new outer object, shared nested references.",
    "Deep copy: nested data is copied too.",
    "{ ...obj } creates a shallow copy.",
    "Object.assign() creates a shallow copy.",
    "structuredClone() deep-clones supported data.",
    "Nested mutation after a shallow copy can affect the original.",
    "In React, use immutable updates and copy each changed level.",
    "Do not deep-clone everything unnecessarily.",
  ],
};
