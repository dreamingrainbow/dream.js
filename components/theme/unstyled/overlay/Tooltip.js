import { createElement } from "../createElement.js";


export const Tooltip = (props) => createElement("span", props, { role: "tooltip" });
