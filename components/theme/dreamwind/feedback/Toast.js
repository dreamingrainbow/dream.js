import { element } from "../element.js";

// Feedback
// --------

export const Toast = (props) => element(
    "div",
    "rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-900 shadow-lg",
    props,
    { role: "status" }
);
