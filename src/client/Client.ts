import {ArkhamBoard} from "../common/model/board/ArkhamBoard";
import {BoardVC} from "./vc/board/BoardVC";
import { LeftBarVC } from "./vc/leftbar/LeftBarVC";
import ApiAgent from "./agent/ApiAgent";

class Client {
    constructor() {
        const arkhamBoard = new ArkhamBoard();
        const boardVC = new BoardVC(arkhamBoard);
        boardVC.render();

        new LeftBarVC();

        const btn = document.getElementById('btnLogin');
        const userMail = document.getElementById('userMail') as HTMLInputElement;
        const userPassword = document.getElementById('userPassword') as HTMLInputElement;
        btn.addEventListener('click', (ev) => {
            ApiAgent.post('http://localhost:8080/login', {
                id: userMail.value, password: userPassword.value
            }).then(() => {
                const loginDiv = document.getElementById('login');
                loginDiv.style.display = 'none';
            }).catch((e) => {
                userMail.classList.add('warning');
                userPassword.classList.add('warning');
                document.getElementById('textMail').classList.add('warning');
                document.getElementById('textPassword').classList.add('warning');
                console.error(e);
            });
        });
    }
}

export default new Client();