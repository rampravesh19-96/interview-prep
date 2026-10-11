export const debounceThrottleComparison = {
  headings: ["Feature", "Debouncing", "Throttling"],
  rows: [
    ["Purpose", "Wait until repeated calls stop", "Limit calls during continuous activity"],
    ["Execution", "After the specified quiet period", "At most once per interval"],
    ["Search box", "Commonly used", "Less common for search input"],
    ["Scroll events", "Useful after scrolling stops", "Useful during scrolling"],
    ["Main idea", "Wait for silence", "Control frequency"],
  ],
  summary: "Debouncing waits for the activity to stop. Throttling limits how often a function can run while the activity continues.",
};
