export abstract class View {
    protected element: HTMLElement;
    protected parentNode: HTMLElement;

    constructor() {
        // this.element = this.createElement();
        // this.parentNode.appendChild(this.element);
    }

    public render(): void {
        if (!this.element) {
            this.element = this.createElement();
            this.parentNode.appendChild(this.element);
        }
    }

    public setParentNode(parentNode: HTMLElement) {
        if (parentNode !== this.parentNode && this.element) {
            parentNode.appendChild(this.parentNode);
        }
        
        this.parentNode = parentNode;
    }

    protected abstract createElement(): HTMLElement;
}