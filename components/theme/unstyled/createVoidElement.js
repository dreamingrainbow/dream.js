import { createAttributes } from "./createAttributes.js";


export const createVoidElement = (
    tag,
    { className = "", ...props } = {},
    defaults = {}
) => ({
    el: tag,
    a: createAttributes(className, props, defaults),
    children: [],
    content: null
});
