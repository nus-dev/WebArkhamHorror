// import 'd3-contour';
// import 'bitmap-sdf';
// let d3 = require('d3-contour');
// let sdf = require('bitmap-sdf');

import {contours} from 'd3-contour';
import * as sdf from 'bitmap-sdf';

class Client {
    private canvas: HTMLCanvasElement;

    constructor() {
        const playGround: HTMLDivElement = document.getElementById('playGround') as HTMLDivElement;
        this.canvas = document.createElement('canvas');
        playGround.appendChild(this.canvas);
        this.draw();
    }

    private loadImage(src: string): Promise<HTMLImageElement> {
        const image: HTMLImageElement = new Image();

        return new Promise<HTMLImageElement>((resolve, reject) => {
            image.onload = () => resolve(image);
            image.onerror = (e) => reject(e);
            image.src = src;
        });
    }

    private async draw() {
        const targets0: number[] = []
        const targets1 = [-30]
        const targets2 = [-30, -35]
        const targets3 = [-15, -30, -45]
        const targets5 = [0, -10, -20, -30, -40]
        const targets30 = [
            0, -10, -20, -30, -40, -50, -60, -70, -80, -90,
            -3, -13, -23, -33, -43, -53, -63, -73, -83, -93,
            -6, -16, -26, -36, -46, -56, -66, -76, -86, -96,
        ]

        const targets: Array<number> = targets2.map(x => x);

        const srcPath = "./resources/image/sample_400_500.png";
        //const srcPath = "./resources/image/sample_1000_1000.png";
        //const srcPath = "./resources/image/sample_5000_5000.png";

        const image: HTMLImageElement = await this.loadImage(srcPath);
        const ctx = this.canvas.getContext('2d');

        const contours = this.createContours(ctx, targets, image);
        this.drawContours(contours, ctx);


        // this.drawContours(contours, ctx, ()=>{});
        // this.drawContours(contours, ctx, (ring) => console.log(ring));
        console.log(contours);
    }

    /**등고선을 그린다.*/
    private drawContours(contours: any, ctx: CanvasRenderingContext2D, drawer = this.drawLinearring) {
        contours.forEach((contour: { value: number; coordinates: number[][][][]; }) => {

            contour.coordinates.forEach((polygon: number[][][]) => {
                //polygon은 linearring의 배열로 첫 요소는 가장 바깥 폐곡선이다

                //가장 바깥 테두리만 가져오기
                polygon = polygon.slice(0, 1);

                polygon.forEach((linearring: number[][]) => {
                    drawer(linearring, ctx);
                });
            });
        });
    }

    //폐곡선 그리기
    //input: Array of points
    //effect: Draw a linear-ring on the CanvasRenderingContext2D
    private drawLinearring(linearring: Array<Array<number>>, ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.beginPath();
        const last = linearring[linearring.length - 1];
        ctx.moveTo(last[0], last[1]);
        linearring.forEach((point: number[]) => {
            ctx.lineTo(point[0], point[1]);
        });
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }

    //side-effect: 캔버스 더러워짐
    private createContours(ctx: CanvasRenderingContext2D, targets: Array<number>, image: HTMLImageElement) {

        const maxAbsoluteValueOfTargets = Math.ceil(
            targets
                .map(Math.abs)
                .reduce((acc, val) => Math.max(acc, val)));

        // 외각선 잘림 방지를 위해 원본 그림 주위에 여백을 둔다
        const margin = maxAbsoluteValueOfTargets;
        const width = image.width + margin * 2;
        const height = image.height + margin * 2;

        ctx.canvas.width = width;
        ctx.canvas.height = height;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        //샘플 이미지를 그린다.
        ctx.drawImage(image, margin, margin);

        const opaque = 1;
        const transparent = 0;
        const values = Float32Array.from(
            ctx.getImageData(0, 0, width, height)
                .data
                .filter((elem, index) => index % 4 == 3) //Take alpha channel
                .map((alpha: number) => alpha < 0.5 ? transparent : opaque)
        );

        // 라이브러리 bitmap-sdf에서 거리 값을 임의로 [0,1]범위에 맞춘다
        // https://github.com/dy/bitmap-sdf/blob/master/index.js#L86
        // 따라서 거리 값을 온전히 얻고 싶다면 radius와 cutoff를 적절히 설정해야 한다.
        // radius는 적당히 큰 수로 그림에서 등고선까지 거리의 두배 보다 크면 된다.
        // cutoff는 0.5; [0,1] 사이의 값으로 radius의 기준이 된다.
        const radius = margin * 16
        const cutoff = 0.5;

        // values는 Float32Array로 할 것
        // Uint8ClampedArray일 경우 distance가 의도치 않은 손실 발생
        console.log(sdf)
        let distance = sdf(values, { radius: radius, width: width, height: height, cutoff: cutoff });

        // [0,1]범위로 축소된 거리를 복원하는 함수
        let recoverDistance = (x: number) => (x - cutoff) * radius;
        distance = distance.map(recoverDistance);

        // 등고선 적용
        const contours4 = contours()
            .size([width, height])
            .thresholds(targets)(distance);
        return contours4;
    }
}

export default new Client();



// var INF = 1e20;

// function TinySDF(fontSize, buffer, radius, cutoff, fontFamily, fontWeight) {
//     this.fontSize = fontSize || 24;
//     this.buffer = buffer === undefined ? 3 : buffer;
//     this.cutoff = cutoff || 0.25;
//     this.fontFamily = fontFamily || 'sans-serif';
//     this.fontWeight = fontWeight || 'normal';
//     this.radius = radius || 8;
//     var size = this.size = this.fontSize + this.buffer * 2;

//     this.canvas = document.createElement('canvas');
//     this.canvas.width = this.canvas.height = size;

//     this.ctx = this.canvas.getContext('2d');
//     this.ctx.font = this.fontWeight + ' ' + this.fontSize + 'px ' + this.fontFamily;
//     this.ctx.textBaseline = 'middle';
//     this.ctx.fillStyle = 'black';

//     // temporary arrays for the distance transform
//     this.gridOuter = new Float64Array(size * size);
//     this.gridInner = new Float64Array(size * size);
//     this.f = new Float64Array(size);
//     this.z = new Float64Array(size + 1);
//     this.v = new Uint16Array(size);

//     // hack around https://bugzilla.mozilla.org/show_bug.cgi?id=737852
//     this.middle = Math.round((size / 2) * (navigator.userAgent.indexOf('Gecko/') >= 0 ? 1.2 : 1));
// }

// const sdf = function (char) {
//     this.ctx.clearRect(0, 0, this.size, this.size);
//     this.ctx.fillText(char, this.buffer, this.middle);

//     var imgData = this.ctx.getImageData(0, 0, this.size, this.size);
//     var alphaChannel = new Uint8ClampedArray(this.size * this.size);

//     for (var i = 0; i < this.size * this.size; i++) {
//         var a = imgData.data[i * 4 + 3] / 255; // alpha value
//         this.gridOuter[i] = a === 1 ? 0 : a === 0 ? INF : Math.pow(Math.max(0, 0.5 - a), 2);
//         this.gridInner[i] = a === 1 ? INF : a === 0 ? 0 : Math.pow(Math.max(0, a - 0.5), 2);
//     }

//     edt(this.gridOuter, this.size, this.size, this.f, this.v, this.z);
//     edt(this.gridInner, this.size, this.size, this.f, this.v, this.z);

//     for (i = 0; i < this.size * this.size; i++) {
//         var d = Math.sqrt(this.gridOuter[i]) - Math.sqrt(this.gridInner[i]);
//         alphaChannel[i] = Math.round(255 - 255 * (d / this.radius + this.cutoff));
//     }

//     return alphaChannel;
// };

// // 2D Euclidean squared distance transform by Felzenszwalb & Huttenlocher https://cs.brown.edu/~pff/papers/dt-final.pdf
// function edt(data, width, height, f, v, z) {
//     for (var x = 0; x < width; x++) edt1d(data, x, width, height, f, v, z);
//     for (var y = 0; y < height; y++) edt1d(data, y * width, 1, width, f, v, z);
// }

// // 1D squared distance transform
// function edt1d(grid, offset, stride, length, f, v, z) {
//     var q, k, s, r;
//     v[0] = 0;
//     z[0] = -INF;
//     z[1] = INF;

//     for (q = 0; q < length; q++) f[q] = grid[offset + q * stride];

//     for (q = 1, k = 0, s = 0; q < length; q++) {
//         do {
//             r = v[k];
//             s = (f[q] - f[r] + q * q - r * r) / (q - r) / 2;
//         } while (s <= z[k] && --k > -1);

//         k++;
//         v[k] = q;
//         z[k] = s;
//         z[k + 1] = INF;
//     }

//     for (q = 0, k = 0; q < length; q++) {
//         while (z[k + 1] < q) k++;
//         r = v[k];
//         grid[offset + q * stride] = f[r] + (q - r) * (q - r);
//     }
// }