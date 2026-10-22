/**
 * Dream.js
 * Lightweight DOM Serialization & Rendering Library
 *
 * Convert DOM ↔ Object ↔ JSON with a simple, portable format.
 *
 * Features:
 * - Build DOM from JSON-like objects
 * - Convert DOM nodes to objects
 * - Serialize and deserialize structures
 * - Render to any DOM element
 * - Browser, ESM, and CommonJS support ??
 *
 * Author: Michael Dennis
 * Project: Dream JS
 * Name: dream.js
 * Version: v1.0.0
 * License: MIT
 * Copyright (c) 2026 Michael Dennis
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const VERSION = "1.0.0";

/**
 * Builds a DOM node from a Dream.js object definition.
 *
 * Supports text nodes, element nodes, attributes, content, and nested children.
 * Arrays are treated as a fragment containing multiple child nodes.
 *
 * @param {*} node - A node descriptor, nested array, or primitive value.
 * @returns {Node|DocumentFragment|null} The constructed DOM node, fragment, or null.
 */
function buildDom(node) {
    if (!node) {
        return null;
    }
    if (Array.isArray(node)) {
        const fragment = document.createDocumentFragment();

        node.forEach(child => {
            fragment.appendChild(buildDom(child));
        });

        return fragment;
    }
    // Text node
    if (node.el === null || node.el === undefined) {
        return document.createTextNode(node.content || "");
    }

    // Element node
    const element = document.createElement(node.el);

    // Attributes
    if (Array.isArray(node.a)) {
        node.a.forEach(attr => {
            Object.entries(attr).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        });
    }

    // Content
    if (node.content != null) {
        element.appendChild(
            document.createTextNode(node.content)
        );
    }

    // Children
    if (Array.isArray(node.children)) {
        node.children.forEach(child => {
            if (child) {
                element.appendChild(buildDom(child));
            }
        });
    }

    return element;
}

/**
 * Converts a DOM node into a Dream.js object representation.
 *
 * Text nodes become objects with `el: null` and `content`; regular elements
 * capture tag name, attributes, child nodes, and optional text content.
 *
 * @param {Node|null} node - The DOM node to convert.
 * @returns {Object|null} A JSON-like object describing the node, or null if it should be ignored.
 */
function domToObject(node) {
    if (!node) {
        return null;
    }
    // Text node
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();

        if (!text) return null;

        return {
            el: null,
            a: [],
            children: [],
            content: text
        };
    }

    // Ignore comments
    if (node.nodeType !== Node.ELEMENT_NODE) {
        return null;
    }

    const json = {
        el: node.tagName.toLowerCase(),
        a: [],
        children: [],
        content: null
    };

    // Attributes
    for (const attr of node.attributes) {
        json.a.push({
            [attr.name]: attr.value
        });
    }

    // Children
    for (const child of node.childNodes) {
        const childJson = domToObject(child);

        if (childJson) {
            json.children.push(childJson);
        }
    }


    return json;
};

/**
 * Renders a Dream.js node definition into a target element.
 *
 * @param {{ node: Object|Array|Node|null, el: string|Node }} options - The render configuration.
 * @returns {void}
 */
function renderObject({ node, el }) {
    const dom = buildDom(node);
    render({ el, node: dom });
}

/**
 * Serializes a DOM node into pretty-printed JSON.
 *
 * @param {Node} node - The DOM node to stringify.
 * @returns {string} A formatted JSON string representing the node.
 */
function stringifyObject(node) {
    const obj = domToObject(node);
    return JSON.stringify(obj, null, 2);
}

/**
 * Parses a JSON string into a Dream.js node definition and builds DOM.
 *
 * @param {string} json - JSON-encoded node data.
 * @returns {Node|DocumentFragment|null} The rendered DOM output.
 */
function parseObject(json) {
    return buildDom(JSON.parse(json));
}

/**
 * Appends a node or node descriptor to a target element.
 *
 * @param {{ el: string|Node, node: Object|Array|Node|null }} options - The target element and content to render.
 * @returns {void}
 */
const render = ({ el, node }) => {
    let _e = null;
    if (typeof el === "string") {
        _e = document.getElementById(el);
    } else if (el instanceof Node) {
        _e = el
    } else {
        _e = document.body;
    }
    if (_e) {
        if (node instanceof Node) {
            _e.appendChild(node);
        } else {
            _e.appendChild(buildDom(node));
        }
    }
}

/**
 * Clears a container and renders new content while running an optional callback.
 *
 * @param {{ el: string|Node, node: Object|Array|Node|null }} options - The target container and new content.
 * @param {Function} [fn] - A callback to invoke after rendering.
 * @returns {void}
 */
const update = ({ el, node }, fn = () => {}) => {
    let _e = null;
    if (typeof el === "string") {
        _e = document.getElementById(el);
    } else if (el instanceof Node) {
        _e = el
    } else {
        _e = document.body;
    }
    _e.innerHTML = "";
    render({ el, node });
    fn();
}

/**
 * Executes a callback once the document is ready, rendering content before or after initialization.
 *
 * @param {{ el: string|Node, node: Object|Array|Node|null }|null} passthru - The render target or node payload.
 * @param {Function} [init] - A callback to run when initialization completes.
 * @returns {void}
 */
const onReady = (passthru, init = () => {}) => {
    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            () => {
                render(passthru);
                init();
            }
        );
    } else {
        render(passthru);
        init();
    }
};

/**
 * Creates a simple getter/setter pair around a state value.
 *
 * @param {*} initial - The initial value.
 * @returns {[Function, Function]} A tuple containing the getter and setter.
 */
const useState = initial => {
    let value = initial;

    return [
        () => value,
        newValue => value = newValue
    ];
};


const state = Object.create(null);
const registry = {};

/**
 * Registers a named state entry with an initial value and subscription registry.
 *
 * @param {string} name - The state name.
 * @param {*} initial - The default value for the state.
 * @returns {void}
 */
const register = (name, initial) => {
    //Check if property is defined throw error if exists. (cannot register the same name twice.)
    if (Object.hasOwn(state, name)) {
        throw new Error(
            `Dream State ('${name}') already exists.`
        );
    }

    let value = initial;

    registry[name] = {
        initial,
        subscribers: []
    };

    // assign state getters/setters
    Object.defineProperty(state, name, {
        enumerable: true,
        configurable: true,
        get() {
            return value;
        },
        set(newValue) {
            if (value === newValue) {
                return;
            }
            const oldValue = value;
            value = newValue;
            registry[name].subscribers.forEach(callback => {
                callback(newValue, oldValue);
            });
        }
    });
};

/**
 * Subscribes a callback to changes for a registered state.
 *
 * @param {string} name - The registered state name.
 * @param {Function} callback - The callback to run whenever the state changes.
 * @returns {Function} A cleanup function that unsubscribes the callback.
 */
const subscribe = (name, callback) => {
    if (!registry[name]) {
        throw new Error(
            `Dream State ('${name}') does not exist.`
        );
    }
    registry[name].subscribers.push(callback);
    return () => {
        registry[name].subscribers =
            registry[name].subscribers.filter(
                subscriber => subscriber !== callback
            );
    };
};

/**
 * Removes all subscribers from a registered state.
 *
 * @param {string} name - The registered state name.
 * @returns {void}
 */
const unsubscribeAll = name => {
    if (!registry[name]) {
        return;
    }

    registry[name].subscribers.length = 0;
};

/**
 * Unregisters a state by name and removes it from the state object.
 *
 * @param {string} name - The registered state name.
 * @returns {void}
 */
const unregister = name => {
    if (!registry[name]) {
        return;
    }
    delete registry[name];
    delete state[name];
};

/**
 * Checks whether a state with the provided name exists.
 *
 * @param {string} name - The state name to check.
 * @returns {boolean} True when the state is registered; otherwise false.
 */
const exists = name => Object.hasOwn(state, name);

/**
 * Returns all currently registered state names.
 *
 * @returns {string[]} An array of registered state names.
 */
const registered = () => Object.keys(registry);

/**
 * Resets a registered state back to its initial value.
 *
 * @param {string} name - The registered state name.
 * @returns {void}
 */
const reset = name => {
    if (!registry[name]) {
        return;
    }

    state[name] = registry[name].initial;
};

/**
 * Resets every registered state to its initial value.
 *
 * @returns {void}
 */
const resetAll = () => {
    Object.keys(registry).forEach(reset);
};

const Dream = {
    VERSION,
    buildDom,
    domToObject,
    renderObject,
    stringifyObject,
    parseObject,
    onReady,
    render,
    update,
    useState,
    state,
    register,
    subscribe,
    unsubscribeAll,
    unregister,
    exists,
    registered,
    reset,
    resetAll
};

Object.freeze(Dream);

export { Dream };

export default Dream;

if (typeof window !== "undefined") {
    window.Dream = Dream;
}
