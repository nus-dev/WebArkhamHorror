import {Board} from "../../../common/model/board/Board";
import {VC} from "../VC";
import {BoardView} from "../../view/board/BoardView";
import {Place} from "../../../common/model/place/Place";

export class BoardVC<BOARD extends Board> extends VC<BoardView> {
    public createView(): BoardView {
        const view: BoardView = new BoardView(this.board);
        view.setParentNode(document.getElementById('board'));
        return view;
    }

    // public render(): void {
    //     super.render();
    //     this.view.setParentNode(document.getElementById('board'));
        
    // }

    constructor(private board: BOARD) {
        super();
    }
}