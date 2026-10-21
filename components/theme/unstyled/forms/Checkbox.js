import { createVoidElement } from "../createVoidElement.js";


export const Checkbox = (props) => createVoidElement("input", props, { type: "checkbox" });
