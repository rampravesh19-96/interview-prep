import type { TechnicalQuestion } from "../../../types/interview";

export const debouncingQuestion: TechnicalQuestion = {
  id: "debouncing",
  question: "What is debouncing in JavaScript?",
  definition: "Debouncing means executing a function only after the user stops performing an action for a specific amount of time.",
  memoryLine: "Wait until the user stops doing something.",
  steps: [
    "The user types something in a search box.",
    "A timer starts.",
    "If the user types again before the timer finishes, the previous timer is cancelled.",
    "A new timer starts.",
    "The function executes only when the user stops typing for the specified delay.",
  ],
  examples: [
    {
      title: "Search box with API call",
      code: `function debounce(callback, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

const searchUsers = debounce((query) => {
  console.log("Searching API for:", query);
}, 500);

searchUsers("R");
searchUsers("Ra");
searchUsers("Ram");`,
      explanations: [
        "timer is remembered through a closure.",
        "clearTimeout() cancels the previous pending timer, then a new timer starts.",
        "The callback runs after 500 milliseconds without another call. The final query here is \"Ram\".",
        "This example only logs the query; it does not make an HTTP request. In a real app, debouncing can avoid an API request for every keystroke.",
      ],
    },
    {
      title: "Autosaving a form",
      code: `function debounce(callback, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
}

const saveDraft = debounce((draft) => {
  console.log("Saving draft:", draft);
}, 1000);

saveDraft({ title: "Support ticket" });
saveDraft({ title: "Updated support ticket" });`,
      explanations: [
        "Each edit resets the one-second timer.",
        "When the user stops editing for one second, the latest draft is passed to saveDraft.",
        "This example logs the draft to show when saving would start. A production app should handle failed saves and keep track of changes that are still waiting to be saved.",
      ],
    },
    {
      title: "Window resize handler",
      environment: "Browser-only example",
      code: `function debounce(callback, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
}

const handleResize = debounce(() => {
  console.log("Window width:", window.innerWidth);
}, 200);

window.addEventListener("resize", handleResize);`,
      explanations: [
        "The browser sends many resize events while the window is changing size.",
        "Each event clears and restarts the 200 millisecond timer.",
        "The handler runs after resizing pauses. This can reduce repeated expensive layout or calculation work.",
      ],
    },
  ],
  interviewAnswer: "Debouncing is a technique in JavaScript where a function runs only after a certain delay since its last call.\n\nFor example, in a search box, we do not want to call the API on every keystroke. We wait until the user stops typing, and then we make the API call.\n\nIt is also useful for autosaving forms and handling resize events. Debouncing helps reduce unnecessary function executions and API requests.",
  memoryPoints: ["Wait for the user to stop", "Clear the previous timer", "Search API optimization", "Autosave", "Resize handler", "Closure remembers the timer"],
};
