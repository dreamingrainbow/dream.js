import { element } from "../element.js";


export const Tooltip = (props) => element(
    "span",
    "rounded bg-gray-900 px-2 py-1 text-xs text-white shadow",
    props,
    { role: "tooltip" }
);
