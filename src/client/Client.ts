class Client {
    constructor() {
        const playGround: HTMLDivElement = document.getElementById('playGround') as HTMLDivElement;
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        playGround.appendChild(canvas);
    }
}

export default new Client();