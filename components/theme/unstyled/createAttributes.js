export const createAttributes = (className, props, defaults = {}) => [
    ...Object.entries(defaults).map(([key, value]) => ({ [key]: value })),
    { class: className },
    ...Object.entries(props).map(([key, value]) => ({ [key]: value }))
];
