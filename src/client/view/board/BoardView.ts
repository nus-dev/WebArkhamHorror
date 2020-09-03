import {View} from "../View";
import {Board} from "../../../common/model/board/Board";
import {LocationView} from "../place/LocationView";
import {Place} from "../../../common/model/place/Place";

export class BoardView extends View {
    private locationsViews: Array<LocationView> = [];

    constructor(board: Board) {
        super();

        board.places.forEach((place: Place) => {
            this.locationsViews.push(new LocationView());
        });
    }

    public render(): void {
        super.render();
        this.locationsViews.forEach((locationView: LocationView) => locationView.setParentNode(this.element));
        this.locationsViews.forEach((locationView: LocationView) => locationView.render());
    }

    protected createElement(): HTMLElement {
        return document.createElement('div');
    }
}