"use strict";
var components;
(function (components) {
    const DEFAULT = 'default';
    class ComponentBase extends HTMLElement {
        connectedCallback() {
            const shadow = this.attachShadow({ mode: 'closed' });
            shadow.innerHTML = `<link rel="stylesheet" href="./styles/components.css">${this.template}`;
        }
    }
    class FullscreenSection extends ComponentBase {
        get direction() { var _a; return (_a = this.getAttribute('direction')) !== null && _a !== void 0 ? _a : 'column'; }
        ;
        get template() { return `<div class="fullscreen flex-${this.direction}"><slot></slot></div>`; }
    }
    components.FullscreenSection = FullscreenSection;
    class ExampleBox extends HTMLElement {
        static get(name) { return ExampleBox.instances.get(name); }
        static UpdateTransform(transform, name = '') {
            ExampleBox.instances.forEach((item) => {
                if (item.name === name || name === '*')
                    item.style.transform = transform;
            });
        }
        static UpdateOrigin(origin, name = '') {
            ExampleBox.instances.forEach((item) => {
                if (item.name === name || name === '*')
                    item.style.transformOrigin = origin;
            });
        }
        get name() { var _a; return (_a = this.getAttribute('name')) !== null && _a !== void 0 ? _a : ''; }
        connectedCallback() { ExampleBox.instances.set(this.name, this); }
        disconnectedCallback() { ExampleBox.instances.delete(this.name); }
    }
    ExampleBox.instances = new Map();
    components.ExampleBox = ExampleBox;
    class DisplayValue extends ComponentBase {
        static get(name) { return DisplayValue.instances.get(name); }
        get template() { return `<span class="label">${this.label}</span><span class="value"><slot>${this.value}</slot></span>`; }
        get label() { var _a; return (_a = this.getAttribute('label')) !== null && _a !== void 0 ? _a : ''; }
        get name() { var _a; return (_a = this.getAttribute('name')) !== null && _a !== void 0 ? _a : DEFAULT; }
        get value() { return this.innerText; }
        set value(val) { this.innerText = val; }
        connectedCallback() {
            super.connectedCallback();
            DisplayValue.instances.set(this.name, this);
        }
        disconnectedCallback() { DisplayValue.instances.delete(this.name); }
    }
    DisplayValue.instances = new Map();
    components.DisplayValue = DisplayValue;
    class CommandButton extends ComponentBase {
        constructor() {
            super();
            this.addEventListener('click', () => {
                var _a;
                const command = CommandButton.lastButton !== this ? this.command : DEFAULT;
                (_a = CommandButton.Commands.get(command)) === null || _a === void 0 ? void 0 : _a(this.param);
                CommandButton.lastButton = CommandButton.lastButton !== this ? this : undefined;
            });
        }
        get command() { var _a; return (_a = this.getAttribute('command')) !== null && _a !== void 0 ? _a : DEFAULT; }
        get param() { var _a; return (_a = this.getAttribute('param')) !== null && _a !== void 0 ? _a : undefined; }
        get template() { return `<div class="command-button"><slot></slot></div>`; }
    }
    CommandButton.Commands = new Map();
    components.CommandButton = CommandButton;
    function registerAll() {
        window.customElements.define('fullscreen-section', FullscreenSection);
        window.customElements.define('example-box', ExampleBox);
        window.customElements.define('command-button', CommandButton);
        window.customElements.define('display-value', DisplayValue);
    }
    components.registerAll = registerAll;
})(components || (components = {}));
