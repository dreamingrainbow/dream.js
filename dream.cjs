var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dream.js
var dream_exports = {};
__export(dream_exports, {
  Dream: () => Dream,
  default: () => dream_default
});
module.exports = __toCommonJS(dream_exports);
var VERSION = "1.0.0";
function buildDom(node) {
  if (!node) {
    return null;
  }
  if (Array.isArray(node)) {
    const fragment = document.createDocumentFragment();
    node.forEach((child) => {
      fragment.appendChild(buildDom(child));
    });
    return fragment;
  }
  if (node.el === null || node.el === void 0) {
    return document.createTextNode(node.content || "");
  }
  const element = document.createElement(node.el);
  if (Array.isArray(node.a)) {
    node.a.forEach((attr) => {
      Object.entries(attr).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    });
  }
  if (node.content != null) {
    element.appendChild(
      document.createTextNode(node.content)
    );
  }
  if (Array.isArray(node.children)) {
    node.children.forEach((child) => {
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
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }
  const json = {
    el: node.tagName.toLowerCase(),
    a: [],
    children: [],
    content: null
  };
  for (const attr of node.attributes) {
    json.a.push({
      [attr.name]: attr.value
    });
  }
  for (const child of node.childNodes) {
    const childJson = domToObject(child);
    if (childJson) {
      json.children.push(childJson);
    }
  }
  return json;
}
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
var render = ({ el, node }) => {
  let _e = null;
  if (typeof el === "string") {
    _e = document.getElementById(el);
  } else if (el instanceof Node) {
    _e = el;
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
};
var update = ({ el, node }, fn = () => {
}) => {
  let _e = null;
  if (typeof el === "string") {
    _e = document.getElementById(el);
  } else if (el instanceof Node) {
    _e = el;
  } else {
    _e = document.body;
  }
  _e.innerHTML = "";
  render({ el, node });
  fn();
};
var onReady = (passthru, init = () => {
}) => {
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
var useState = (initial) => {
  let value = initial;
  return [
    () => value,
    (newValue) => value = newValue
  ];
};
var state = /* @__PURE__ */ Object.create(null);
var registry = {};
var register = (name, initial) => {
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
      registry[name].subscribers.forEach((callback) => {
        callback(newValue, oldValue);
      });
    }
  });
};
var subscribe = (name, callback) => {
  if (!registry[name]) {
    throw new Error(
      `Dream State ('${name}') does not exist.`
    );
  }
  registry[name].subscribers.push(callback);
  return () => {
    registry[name].subscribers = registry[name].subscribers.filter(
      (subscriber) => subscriber !== callback
    );
  };
};
var unsubscribeAll = (name) => {
  if (!registry[name]) {
    return;
  }
  registry[name].subscribers.length = 0;
};
var unregister = (name) => {
  if (!registry[name]) {
    return;
  }
  delete registry[name];
  delete state[name];
};
var exists = (name) => Object.hasOwn(state, name);
var registered = () => Object.keys(registry);
var reset = (name) => {
  if (!registry[name]) {
    return;
  }
  state[name] = registry[name].initial;
};
var resetAll = () => {
  Object.keys(registry).forEach(reset);
};
var Dream = {
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
var dream_default = Dream;
if (typeof window !== "undefined") {
  window.Dream = Dream;
}
