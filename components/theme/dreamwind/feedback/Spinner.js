import { element } from "../element.js";


export const Spinner = (props) => element(
    "span",
    "inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-r-transparent",
    props,
    { role: "status", "aria-label": "Loading" }
);
