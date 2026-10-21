import { createVoidElement } from "../createVoidElement.js";


export const Switch = (props) => createVoidElement("input", props, { type: "checkbox", role: "switch" });
