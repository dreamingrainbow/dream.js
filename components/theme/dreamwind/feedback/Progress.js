import { element } from "../element.js";


export const Progress = (props) => element(
    "progress",
    "h-2 w-full overflow-hidden rounded-full accent-blue-600",
    props
);
