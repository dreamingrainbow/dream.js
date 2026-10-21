import { createVoidElement } from "../createVoidElement.js";


export const Radio = (props) => createVoidElement("input", props, { type: "radio" });
