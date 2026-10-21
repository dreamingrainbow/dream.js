import { element } from "../element.js";


export const Tabs = (props) => element("div", "flex gap-1 border-b border-gray-200", props, { role: "tablist" });
