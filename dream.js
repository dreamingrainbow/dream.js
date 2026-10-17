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

function renderObject({ node, el }) {
    const dom = buildDom(node);
    render({ el, node: dom });
}

function stringifyObject(node) {
    const obj = domToObject(node);
    return JSON.stringify(obj, null, 2);
}

function parseObject(json) {
    return buildDom(JSON.parse(json));
}

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

const useState = initial => {
    let value = initial;

    return [
        () => value,
        newValue => value = newValue
    ];
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
    useState
};


/*
|--------------------------------------------------------------------------
| Dream Public API
|--------------------------------------------------------------------------
|
| buildDom(node)
| domToObject(node)
| stringifyObject(node)
| parseObject(json)
| render({ el, node })
| renderObject({ el, node })
| onReady({ el, node })
| useState(initialState)
|
| Examples:
|
| const json = Dream.stringifyObject(document.body);
| const dom = Dream.parseObject(json);
| 
| const [count, setCount] = Dream.useState(0);
|
*/


export { Dream };

export default Dream;

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Dream };
}

if (typeof window !== "undefined") {
    window.Dream = Dream;
}
