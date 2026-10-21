import { createAttributes } from "./createAttributes.js";


export const createElement = (
    tag,
    { className = "", text = null, children = [], ...props } = {},
    defaults = {}
) => ({
    el: tag,
    a: createAttributes(className, props, defaults),
    children,
    content: text
});
