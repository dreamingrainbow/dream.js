import { element } from "../element.js";


export const Alert = (props) => element(
    "div",
    "rounded-md border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900",
    props,
    { role: "alert" }
);
