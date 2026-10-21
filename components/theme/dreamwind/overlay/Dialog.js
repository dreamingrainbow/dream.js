import { element } from "../element.js";


export const Dialog = (props) => element(
    "dialog",
    "m-auto max-h-[90vh] w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-xl backdrop:bg-black/50",
    props
);
