export const attributes = (baseClass, props, defaults = {}) => [
    ...Object.entries(defaults).map(([key, value]) => ({ [key]: value })),
    { class: [baseClass, props.className].filter(Boolean).join(" ") },
    ...Object.entries(props).filter(([key]) => key !== "className").map(
        ([key, value]) => ({ [key]: value })
    )
];
