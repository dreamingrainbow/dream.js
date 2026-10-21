import { element } from "../element.js";


export const Popover = (props) => element(
    "div",
    "rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-900 shadow-lg",
    props
);
