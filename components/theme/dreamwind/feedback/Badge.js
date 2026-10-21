import { element } from "../element.js";


export const Badge = (props) => element(
    "span",
    "inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800",
    props
);
