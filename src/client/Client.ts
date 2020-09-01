import {ArkhamBoard} from "../common/model/board/ArkhamBoard";
import {BoardVC} from "./vc/board/BoardVC";
import { LeftBarVC } from "./vc/leftbar/LeftBarVC";

class Client {
    constructor() {
        const arkhamBoard = new ArkhamBoard();
        const boardVC = new BoardVC(arkhamBoard);
        boardVC.render();

        new LeftBarVC();
    }
}

export default new Client();