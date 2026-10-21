import { createElement } from "../createElement.js";


export const Spinner = (props) => createElement("span", props, { role: "status", "aria-label": "Loading" });
