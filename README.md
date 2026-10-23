# Dream.js

Lightweight DOM Serialization & Rendering Library

<img width="476" height="244" alt="image" src="https://github.com/user-attachments/assets/9d02fee3-8aa7-40eb-a32e-1de0f55d4044" />


> Dream.js is a lightweight framework for building user interfaces using plain JavaScript objects.

Instead of JSX, templates, or virtual DOMs, Dream uses a simple serializable object format that can be:

- Rendered to HTML
- Converted from existing DOM
- Serialized to JSON
- Stored in databases
- Sent across APIs
- Restored later

Dream favors simplicity, separation of concerns, and plain JavaScript.


---

## Philosophy

Dream separates:

- Structure → Dream Objects
- Behavior → Controllers / Actions
- Styling → CSS

A Dream component is simply data.

```js
{
    el: "button",
    a: [
        { id: "connect" },
        { class: "holo-button" }
    ],
    content: "Connect Wallet"
}
```

No JSX.

No build tools.

No compilation step.

Just JavaScript.

---

## Installation

### Module

```js
import Dream from "./dream.js";
```

### CommonJS

```js
const { Dream } = require("./dream.cjs");
```

### Browser

```html
<script src="dream.js"></script>
```

```js
Dream.render(...);
```

---

## Quick Start

### Create A View

```js
const View = () => ({
    el: "div",
    children: [
        {
            el: "h1",
            content: "Hello Dream"
        }
    ]
});
```

### Render It

```js
Dream.onReady({
    el: "app",
    node: View()
});
```

### HTML

```html
<div id="app"></div>
```

Result:

```html
<div id="app">
    <div>
        <h1>Hello Dream</h1>
    </div>
</div>
```

---

## Components

Components are simply functions that return Dream objects.

```js
export const HoloButton = ({
    id,
    text
}) => ({
    el: "button",
    a: [
        { id },
        { class: "holo-button" }
    ],
    content: text
});
```

Usage:

```js
HoloButton({
    id: "connect",
    text: "Connect Wallet"
});
```

---

## Composing Components

```js
const Dashboard = () => ({
    el: "div",
    children: [
        HoloButton({
            id: "save",
            text: "Save"
        }),

        HoloButton({
            id: "load",
            text: "Load"
        })
    ]
});
```

---

## DOM To Object

Convert existing DOM into Dream's object format.

```js
const obj = Dream.domToObject(
    document.body
);
```

Result:

```js
{
    el: "body",
    children: [...]
}
```

---

## Object To DOM

```js
const dom = Dream.buildDom({
    el: "h1",
    content: "Hello World"
});
```

---

## Serialization

Dream objects can be serialized directly.

```js
const json =
    Dream.stringifyObject(
        document.body
    );
```

Restore later:

```js
const dom =
    Dream.parseObject(json);
```

---

## Updating Views

```js
Dream.update({
    el: "app",
    node: View()
});
```

The target element is cleared and rerendered.

---

## Controllers

Dream encourages keeping behavior separate from structure.

View:

```js
const View = () => ({
    el: "button",
    a: [
        { id: "connect" }
    ],
    content: "Connect Wallet"
});
```

Controller:

```js
const Controller = () => {

    document
        .getElementById("connect")
        ?.addEventListener(
            "click",
            () => {
                alert("Connected!");
            }
        );

};
```

Bootstrap:

```js
Dream.onReady({
    el: "app",
    node: View()
}, Controller);
```

---

## State

Dream includes a simple state concept.

```js
const [connected, setConnected] =
    Dream.useState(false);
```

Use state inside views and rerender when updated.

```js
if (!connected) {
    return HoloButton({
        id: "connect",
        text: "Connect Wallet"
    });
}
```

---

## Why Dream?

Dream was created as an experiment in designing user interfaces as plain data.

Advantages include:

- Human-readable
- JSON serializable
- No build step required
- Framework agnostic
- Easy to inspect
- Easy to save and restore
- Simple mental model

Dream is not competing with React, Vue, or Svelte.

Dream is focused on simplicity.

---

## Public API

```js
Dream.buildDom()
Dream.domToObject()

Dream.render()
Dream.update()

Dream.renderObject()

Dream.stringifyObject()
Dream.parseObject()

Dream.onReady()

Dream.useState()
```

---

## Example

```js
Dream.onReady({
    el: "app",
    node: HoloCard({
        children: [
            {
                el: "h2",
                content: "Welcome"
            },

            HoloButton({
                id: "connect",
                text: "Connect Wallet"
            })
        ]
    })
}, App);
```

---

## License

MIT License

Copyright (c) 2026 Michael Dennis

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.


# Join our Discord
https://discord.gg/ep2vE5hXZs

# Donations
If you like this project and want to help support the developer you can send donations to :
$dreamingrainbow on CashApp.
or 
Send any crypto to :
> 0x52e2e41F22A3adC894d8746146b449ec05d60179
