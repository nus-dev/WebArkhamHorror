import { View } from "../view/View";

export abstract class VC<VIEW extends View> {
    protected view: VIEW;

    constructor() {
        //
    }

    protected abstract createView(): VIEW;

    public render(): void {
        if (!this.view) {
            this.view = this.createView();
        }

        this.view.render();
    }
}