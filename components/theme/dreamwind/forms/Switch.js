import { voidElement } from "../voidElement.js";


export const Switch = (props) => voidElement(
    "input",
    "h-4 w-4 rounded-full border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500",
    props,
    { type: "checkbox", role: "switch" }
);
