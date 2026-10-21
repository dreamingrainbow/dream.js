import { createElement } from "../createElement.js";

// Feedback
// --------

export const Toast = (props) => createElement("div", props, { role: "status" });
