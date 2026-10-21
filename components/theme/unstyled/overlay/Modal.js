import { createElement } from "../createElement.js";

// Overlay
// -------

export const Modal = (props) => createElement("dialog", props, { "aria-modal": "true" });
