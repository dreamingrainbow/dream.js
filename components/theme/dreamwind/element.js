import { attributes } from "./attributes";

export const element = (
    tag,
    baseClass,
    { className = "", text = null, children = [], ...props } = {},
    defaults = {}
) => ({
    el: tag,
    a: attributes(baseClass, { ...props, className }, defaults),
    children,
    content: text
});
