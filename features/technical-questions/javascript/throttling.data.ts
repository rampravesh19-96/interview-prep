import type { TechnicalQuestion } from "../../../types/interview";

export const throttlingQuestion: TechnicalQuestion = {
  id: "throttling",
  question: "What is throttling in JavaScript?",
  definition: "Throttling means executing a function at most once during a specified time interval, even if the user triggers it many times.",
  memoryLine: "Run at controlled intervals, even if the event keeps happening.",
  steps: [
    "An event happens repeatedly.",
    "The function executes immediately when it is allowed.",
    "Further calls during the waiting interval are ignored.",
    "After the interval, another call is allowed.",
    "Throttling is useful when an event continues happening and we want to limit how often its handler runs.",
  ],
  examples: [
    {
      title: "Scroll event",
      environment: "Browser-only example",
      code: `function throttle(callback, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
}

const handleScroll = throttle(() => {
  console.log("Scroll handler executed");
}, 200);

window.addEventListener("scroll", handleScroll);`,
      explanations: [
        "lastCall remembers the previous execution time through a closure.",
        "Date.now() gives the current time. The callback runs only when at least 200 milliseconds have passed.",
        "Frequent scroll events do not run the callback every time. This simple leading-edge throttle does not guarantee a final run after scrolling stops.",
        "In production, this can help with scroll-based calculations or UI updates.",
      ],
    },
    {
      title: "Limit repeated button actions",
      environment: "Browser-only example",
      code: `function throttle(callback, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
}

const handleOrderClick = throttle(() => {
  console.log("Order action started");
}, 1000);

document
  .querySelector("#order-button")
  ?.addEventListener("click", handleOrderClick);`,
      explanations: [
        "Rapid clicks run the handler at most once in each one-second interval.",
        "This can reduce repeated event-handler executions in the interface.",
        "Throttling alone does not protect against duplicate orders or payments. Production systems also need request-state handling and server-side idempotency where appropriate.",
      ],
    },
    {
      title: "Mouse or pointer tracking",
      environment: "Browser-only example",
      code: `function throttle(callback, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
}

const trackPointer = throttle((event) => {
  console.log("Pointer position:", event.clientX, event.clientY);
}, 100);

window.addEventListener("pointermove", trackPointer);`,
      explanations: [
        "Pointer movement can fire many events in a short time.",
        "This handler checks and logs the pointer position at most once every 100 milliseconds.",
        "Limiting event processing can help when each update includes expensive calculations.",
      ],
    },
  ],
  interviewAnswer: "Throttling is a technique in JavaScript where a function is allowed to run at most once during a specified time interval.\n\nFor example, scrolling a page can trigger many scroll events. Instead of running expensive calculations for every event, we can use throttling to run the handler at controlled intervals.\n\nIt is also useful for pointer tracking and limiting repeated event-handler execution. Throttling helps control how frequently a function runs.",
  memoryPoints: ["Control the execution rate", "Run at most once per interval", "Scroll events", "Pointer movement", "Repeated button actions", "Closure remembers the previous execution time"],
};
