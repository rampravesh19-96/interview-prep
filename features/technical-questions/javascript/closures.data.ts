import type { TechnicalQuestion } from "../../../types/interview";

export const closureQuestion: TechnicalQuestion = {
  id: "closures",
  question: "What is a Closure in JavaScript?",
  definition: "A closure is when a function remembers and can access variables from its outer function, even after the outer function has finished executing.",
  memoryLine: "A function remembers the variables around it.",
  examples: [
    {
      title: "Debouncing",
      code: `function debounce(callback, delay) {
  let timer;

  return function () {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback();
    }, delay);
  };
}

const searchUsers = debounce(() => {
  console.log("API call");
}, 500);

searchUsers();
searchUsers();
searchUsers();`,
      explanations: [
        "timer belongs to the debounce function.",
        "debounce() returns another function.",
        "Even after debounce() has finished, the returned function can still access timer. That is closure.",
        "In a real application, this can be used for search boxes so we do not call the API on every keystroke.",
      ],
    },
    {
      title: "Cart / createCart",
      code: `function createCart() {
  let items = [];

  return {
    addItem(item) {
      items.push(item);
    },

    removeItem(id) {
      items = items.filter(item => item.id !== id);
    },

    getItems() {
      return items;
    }
  };
}

const cart = createCart();

cart.addItem({ id: 1, name: "Laptop" });
cart.addItem({ id: 2, name: "Mouse" });

console.log(cart.getItems());`,
      explanations: [
        "items is inside createCart.",
        "Outside code cannot directly access items.",
        "The returned methods can still access items. Those methods remember items because of closure.",
        "This pattern can be useful when we want to keep some data private and expose controlled functions to work with it.",
      ],
    },
    {
      title: "API / Event Handler",
      code: `function createUserHandler(userId) {
  return function () {
    console.log(\`Fetching data for user: \${userId}\`);
  };
}

const handleUser = createUserHandler(101);

handleUser();`,
      explanations: [
        "userId belongs to createUserHandler.",
        "The returned function remembers userId.",
        "Even after createUserHandler() has finished, the returned function can still use userId.",
        "In real applications, a similar pattern can be useful for event handlers, callbacks, API handlers, or configuration-specific functions.",
      ],
    },
  ],
  interviewAnswer: "Closure in JavaScript means a function can remember and access variables from its outer scope even after the outer function has finished executing.\n\nFor example, closures are commonly used in debouncing, where the returned function remembers the timer. They can also be used in patterns like createCart, where methods remember private cart data. Another common use is callbacks or event handlers that need to remember some specific value such as a user ID.\n\nSo the simple idea is: a function remembers the variables from its surrounding scope.",
  memoryPoints: ["Outer function", "Inner function", "Function remembers variables", "Debouncing → timer", "createCart → private items", "Callback → remembers userId"],
};
