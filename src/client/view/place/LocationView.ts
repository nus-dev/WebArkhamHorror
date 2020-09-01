import {PlaceView} from "./PlaceView";

export class LocationView extends PlaceView {
    // public render(): void {
    //     // const div = document.createElement('div');
    //     // div.className = 'location';
    //     // this.parentNode.appendChild(div);
    // }

    public createElement(): HTMLElement {
        const div = document.createElement('div');
        div.className = 'location';
        return div;
    }
}