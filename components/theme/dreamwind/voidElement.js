import { attributes } from "./attributes";

export const voidElement = (tag, baseClass, props = {}, defaults = {}) => ({
    el: tag,
    a: attributes(baseClass, props, defaults),
    children: [],
    content: null
});
