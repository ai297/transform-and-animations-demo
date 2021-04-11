namespace components {
  const DEFAULT = 'default';

  abstract class ComponentBase extends HTMLElement {
    protected abstract template: string;
    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'closed' });
      shadow.innerHTML = `<link rel="stylesheet" href="./styles/components.css">${this.template}`;
    }
  }

  export class FullscreenSection extends ComponentBase {
    private get direction() { return this.getAttribute('direction') ?? 'column'; };
    protected get template() { return `<div class="fullscreen flex-${this.direction}"><slot></slot></div>`; }
  }

  export class ExampleBox extends HTMLElement {
    private static readonly instances = new Map<string, ExampleBox>();
    static get(name: string) { return ExampleBox.instances.get(name); }
    static UpdateTransform(transform: string, name = '') {
      ExampleBox.instances.forEach((item) => {
        if (item.name === name || name === '*') item.style.transform = transform;
      });
    }
    static UpdateOrigin(origin: string, name = '') {
      ExampleBox.instances.forEach((item) => {
        if (item.name === name || name === '*') item.style.transformOrigin = origin;
      });
    }

    private get name() { return this.getAttribute('name') ?? ''; }
    connectedCallback() { ExampleBox.instances.set(this.name, this); }
    disconnectedCallback() { ExampleBox.instances.delete(this.name); }
  }

  export class DisplayValue extends ComponentBase {
    private static readonly instances = new Map<string, DisplayValue>();
    static get(name: string) { return DisplayValue.instances.get(name); }

    protected get template() { return `<span class="label">${this.label}</span><span class="value"><slot>${this.value}</slot></span>`; }

    get label() { return this.getAttribute('label') ?? ''; }
    get name() { return this.getAttribute('name') ?? DEFAULT }
    get value() { return this.innerText; }
    set value(val: string) { this.innerText = val; }

    connectedCallback() {
      super.connectedCallback();
      DisplayValue.instances.set(this.name, this);
    }
    disconnectedCallback() { DisplayValue.instances.delete(this.name); }
  }

  export class CommandButton extends ComponentBase {
    static readonly Commands = new Map<string, (param?: string) => void>();
    private static lastButton?: CommandButton;

    private get command() { return this.getAttribute('command') ?? DEFAULT; }
    private get param() { return this.getAttribute('param') ?? undefined; }
    protected get template() { return `<div class="command-button"><slot></slot></div>`; }
    constructor() {
      super();
      this.addEventListener('click', () => {
        const command = CommandButton.lastButton !== this ? this.command : DEFAULT;
        CommandButton.Commands.get(command)?.(this.param);
        CommandButton.lastButton = CommandButton.lastButton !== this ? this : undefined;
      });
    }
  }

  export function registerAll() {
    window.customElements.define('fullscreen-section', FullscreenSection);
    window.customElements.define('example-box', ExampleBox);
    window.customElements.define('command-button', CommandButton);
    window.customElements.define('display-value', DisplayValue);
  }
}
