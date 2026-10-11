import type { TechnicalQuestion } from "../../../types/interview";

export const prototypesInheritanceQuestion: TechnicalQuestion = {
  id: "prototypes-inheritance",
  question: "What are prototypes, the prototype chain, and prototypal inheritance?",
  definition: "Prototypes in JavaScript allow objects to inherit properties and methods from other objects. JavaScript uses the prototype chain to look for a property or method when it is not found directly on an object.",
  memoryLine: "An object can use properties and methods from another object through its prototype.",
  examplesHeading: "Real-world examples",
  contentSections: [
    {
      title: "What is a prototype?",
      blocks: [
        { type: "text", text: "Every JavaScript object has an internal link to another object called its prototype, or it has null as its prototype. When we read a property, JavaScript checks the object first. If it is not there, JavaScript looks at the prototype. This continues up the chain until the property is found or the chain reaches null." },
        { type: "code", code: `const user = {
  name: "Ram",
  greet() {
    console.log(\`Hello, \${this.name}\`);
  }
};

user.greet(); // Hello, Ram`, explanations: ["name and greet are own properties of user. An own property is stored directly on that object.", "Objects can also access properties and methods inherited through their prototype chain."] },
      ],
    },
    {
      title: "The constructor's prototype property",
      blocks: [
        { type: "text", text: "A normal constructible function has a prototype property. When we create an object with new User(), that object's internal prototype is linked to User.prototype. Methods added there can be shared by all instances." },
        { type: "code", code: `function User(name) {
  this.name = name;
}

User.prototype.greet = function () {
  return \`Hello, \${this.name}\`;
};

const user1 = new User("Ram");
const user2 = new User("Amit");

console.log(user1.greet()); // Hello, Ram
console.log(user2.greet()); // Hello, Amit

console.log(user1.greet === user2.greet); // true`, explanations: ["User is the constructor function. User.prototype is the object used as the prototype for instances created with new User().", "Both instances use the same greet method. Each instance has its own name property.", "Arrow functions do not have their own prototype property for creating constructor instances."] },
      ],
    },
    {
      title: "prototype and __proto__ are related, but different",
      blocks: [
        { type: "text", text: "User.prototype is a property on the constructor. It is the object linked as the prototype of instances created with new User()." },
        { type: "code", code: `function User(name) {
  this.name = name;
}

const user = new User("Ram");

console.log(Object.getPrototypeOf(user) === User.prototype); // true
console.log(user.__proto__ === User.prototype); // true in standard environments`, explanations: ["user.__proto__ is a legacy accessor for this object's internal prototype. It is not the same property as User.prototype, and it is not the same as Object.prototype.", "Object.getPrototypeOf(user) is the recommended way to inspect an object's prototype.", "Object.setPrototypeOf() can change an object's prototype, but changing prototypes often at runtime can hurt performance.", "The prototype property does not mean the prototype of the function itself. It is used as the prototype for instances made with new."] },
      ],
    },
    {
      title: "The prototype chain",
      blocks: [
        { type: "text", text: "The prototype chain is the sequence of objects JavaScript checks when it looks for a property." },
        { type: "code", code: `const animal = {
  eats: true,
  walk() {
    return "Walking";
  }
};

const dog = Object.create(animal);
dog.barks = true;

console.log(dog.barks); // true
console.log(dog.eats); // true
console.log(dog.walk()); // Walking

console.log(Object.hasOwn(dog, "barks")); // true
console.log(Object.hasOwn(dog, "eats")); // false`, explanations: ["JavaScript checks dog for barks and finds it directly.", "It checks dog for eats but does not find it there. It then checks dog's prototype, animal, and finds eats. The same lookup finds walk().", "Object.hasOwn() checks only properties stored directly on dog. It does not count inherited properties.", "If a property is not found anywhere in the chain, JavaScript returns undefined."] },
        { type: "diagram", text: "dog → animal → Object.prototype → null" },
        { type: "text", text: "This is the typical chain for this example in a standard JavaScript environment. animal itself normally links to Object.prototype, whose prototype is null." },
      ],
    },
    {
      title: "Prototypal inheritance",
      blocks: [
        { type: "text", text: "Prototypal inheritance means an object can access properties and methods from another object through the prototype chain." },
        { type: "code", code: `const userMethods = {
  greet() {
    return \`Hello, \${this.name}\`;
  }
};

const user1 = Object.create(userMethods);
user1.name = "Ram";

const user2 = Object.create(userMethods);
user2.name = "Amit";

console.log(user1.greet()); // Hello, Ram
console.log(user2.greet()); // Hello, Amit`, explanations: ["Object.create(userMethods) makes a new object whose prototype is userMethods.", "Both objects can use the shared greet method. this.name refers to the object that calls greet()."] },
        { type: "text", text: "JavaScript classes also use prototypes under the hood. Classes provide a familiar syntax, but they do not replace the prototype system." },
      ],
    },
    {
      title: "One example that connects the concepts",
      blocks: [
        { type: "code", code: `function Employee(name) {
  this.name = name;
}

Employee.prototype.work = function () {
  return \`\${this.name} is working\`;
};

const employee = new Employee("Ram");

console.log(employee.name); // Ram
console.log(employee.work()); // Ram is working

console.log(
  Object.getPrototypeOf(employee) === Employee.prototype
); // true

console.log(
  Object.hasOwn(employee, "name")
); // true

console.log(
  Object.hasOwn(employee, "work")
); // false`, explanations: ["employee.name is Ram, and name is an own property of employee.", "employee.work() returns Ram is working. JavaScript finds work on Employee.prototype through the prototype chain.", "Object.getPrototypeOf(employee) is Employee.prototype, so the comparison is true.", "employee has its own name property, but work is inherited, so the last two checks are true and false."] },
      ],
    },
    {
      title: "Important interview differences",
      blocks: [
        { type: "table", headings: ["Concept", "Meaning"], rows: [
          ["prototype", "A property on constructible functions used as the prototype for objects created by new."],
          ["__proto__", "A legacy accessor for an object's internal prototype."],
          ["Object.getPrototypeOf()", "The recommended way to retrieve an object's prototype."],
          ["Prototype chain", "The sequence of prototype objects searched during property lookup."],
          ["Prototypal inheritance", "The ability to access properties and methods through prototypes."],
          ["Own property", "A property stored directly on the object itself."],
          ["Inherited property", "A property found on the object's prototype or higher in the chain."],
        ] },
        { type: "list", items: ["prototype does not mean the prototype of the function itself.", "__proto__ is not the same property as Object.prototype.", "The prototype chain is how JavaScript looks up inherited properties.", "Prototypal inheritance is the broader way objects share and inherit behavior."] },
      ],
    },
  ],
  examples: [
    {
      title: "Shared methods across instances",
      code: `function Ticket(id, title) {
  this.id = id;
  this.title = title;
}

Ticket.prototype.getSummary = function () {
  return \`\${this.id}: \${this.title}\`;
};

const ticket1 = new Ticket(101, "Login issue");
const ticket2 = new Ticket(102, "Payment issue");

console.log(ticket1.getSummary());
console.log(ticket2.getSummary());`,
      explanations: ["Many ticket instances can share one getSummary method through Ticket.prototype, instead of creating a separate method function for each instance."],
    },
    {
      title: "Built-in array methods",
      code: `const numbers = [1, 2, 3];

console.log(numbers.map((number) => number * 2));
// [2, 4, 6]

console.log(
  Object.getPrototypeOf(numbers) === Array.prototype
); // true`,
      explanations: ["Arrays can call methods such as map() because the methods are available through Array.prototype.", "The array object's prototype is Array.prototype in a standard JavaScript environment."],
    },
    {
      title: "Class methods are shared through the prototype",
      code: `class Ticket {
  constructor(id) {
    this.id = id;
  }

  getLabel() {
    return \`Ticket #\${this.id}\`;
  }
}

const ticket = new Ticket(101);

console.log(ticket.getLabel()); // Ticket #101
console.log(
  Object.hasOwn(ticket, "getLabel")
); // false`,
      explanations: ["id is an own property of the ticket instance.", "getLabel() is generally stored on Ticket.prototype and found through the chain, so it is not an own property of ticket."],
    },
  ],
  interviewAnswer: "JavaScript uses prototypes to allow objects to share and inherit properties and methods.\n\nEvery object has an internal prototype link, unless its prototype is null. When we access a property, JavaScript first checks the object itself. If the property is not found, it looks up the prototype chain.\n\nThe prototype property on a constructor function is used as the prototype for objects created with new. The __proto__ accessor lets us inspect an object's prototype, but Object.getPrototypeOf() is the recommended approach.\n\nFor example, I can define a method on Employee.prototype and let multiple employee objects share that method instead of creating a separate copy for every instance.\n\nThis mechanism is called prototypal inheritance. JavaScript classes also use prototypes internally.",
  memoryPoints: [
    "Object property lookup starts on the object itself.",
    "If not found, JavaScript checks the prototype chain.",
    "Constructor.prototype is used by instances created with new Constructor().",
    "__proto__ is a legacy accessor, not the recommended API.",
    "Prefer Object.getPrototypeOf() to inspect prototypes.",
    "Object.create(obj) creates an object whose prototype is obj.",
    "Own properties belong directly to an object; inherited properties come through its prototype chain.",
    "Class methods are generally shared through the class prototype.",
  ],
  quickSelfTest: [
    { question: "What happens when JavaScript cannot find a property on an object?", answer: "JavaScript searches the prototype chain; if the property is not found, it returns undefined." },
    { question: "What is the difference between prototype and __proto__?", answer: "prototype is a constructor function property used for instances; __proto__ is a legacy accessor for an object's internal prototype." },
    { question: "Where is a method declared in a class body usually stored?", answer: "On the class's prototype object." },
    { question: "What does Object.create(animal) do?", answer: "It creates a new object whose prototype is animal." },
    { question: "How can you check whether a property belongs directly to an object?", answer: "Use Object.hasOwn(object, propertyName)." },
  ],
};
