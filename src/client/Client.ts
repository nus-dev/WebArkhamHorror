// import 'd3-contour';
// import 'bitmap-sdf';
// let d3 = require('d3-contour');
// let sdf = require('bitmap-sdf');

import { contours } from 'd3-contour';
import * as calcSDF from 'bitmap-sdf';

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
        const targets1 = [0]
        const targets2 = [-30, -1000]
        const targets3 = [-15, -30, -45]
        const targets5 = [0, -10, -20, -30, -40]
        const targets30 = [
            0, -10, -20, -30, -40, -50, -60, -70, -80, -90,
            -3, -13, -23, -33, -43, -53, -63, -73, -83, -93,
            -6, -16, -26, -36, -46, -56, -66, -76, -86, -96,
        ]

        const targets: Array<number> = targets2.map(x => x);

        const srcPath = "./resources/image/sample_400_500.png";
        // const srcPath = "./resources/image/sample_1000_1000.png";
        // const srcPath = "./resources/image/sample_1080_1080.png";
        //const srcPath = "./resources/image/sample_5000_5000.png";

        const image: HTMLImageElement = await this.loadImage(srcPath);
        const ctx = this.canvas.getContext('2d');


        const maxAbsoluteValueOfTargets = Math.ceil(
            targets
                .map(Math.abs)
                .reduce((acc, val) => Math.max(acc, val)));
        const margin = maxAbsoluteValueOfTargets;
        const dimension = this.marginalDimension(margin, image);
        const distance = this.createSDF(ctx, margin, image)
        const contours = this.createContours(distance, targets, margin, dimension);

        // 기존 그림 위에 등고선 그리기
        this.drawContours(contours, ctx);

        // targetFunction(x) <= target 를 만족하는 x
        function binarySearch(start: number, end: number, epsilon: number, target: number, targetFunction: Function): number {
            if (start + epsilon > end) { return start }
            const mid = (start + end) / 2;
            const guessValue = targetFunction(mid);
            console.log(mid, guessValue)
            if (target < guessValue) {
                end = mid;
            }
            else {
                start = mid;
            }
            return binarySearch(start, end, epsilon, target, targetFunction)
        }

        const polygonCounter = (target:number)=>{return this.createContours(distance, [target],margin,dimension)[0].coordinates.length}

        const mytarget = binarySearch(-(image.width+image.height)/2,0, 1, 1, polygonCounter)
        console.log(mytarget)

        ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
        const mycontours = this.createContours(distance, [mytarget],margin,dimension)
        console.log(mycontours)
        this.drawContours(mycontours,ctx)

        // var path = new Path2D();
        // // 외각선을 path로 변환하는 함수
        // function fillPolygon(linearring: Array<Array<number>>, ctx: CanvasRenderingContext2D): void {
        //     const firstPosition = linearring[0]
        //     path.moveTo(firstPosition[0], firstPosition[1])
        //     linearring.forEach(position => {
        //         path.lineTo(position[0], position[1])
        //     });
        //     path.closePath()
        // }
        // this.drawContours(contours, ctx, fillPolygon)

        //원본, 외각선, 

        // // 얻은 path 안을 채우기
        // ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // ctx.save()
        // ctx.fillStyle = '#ffff'
        // ctx.fill(path)
        // ctx.restore()


        // this.drawContours(contours, ctx, ()=>{});
        // this.drawContours(contours, ctx, (ring) => console.log(ring));
        console.log(contours);
    }

    /**등고선을 그린다.*/
    private drawContours(contours: any, ctx: CanvasRenderingContext2D, drawer = this.drawLinearring) {
        contours.forEach((contour: { value: number; coordinates: number[][][][]; }) => {

            contour.coordinates.forEach((polygon: number[][][]) => {
                //polygon은 linearring의 배열로 첫 요소는 가장 바깥 폐곡선이다

                // //가장 바깥 테두리만 가져오기
                // if(polygon.length===0){return;}
                // const firstPolygon = polygon[0]
                // polygon = polygon.slice(1)

                polygon = polygon.slice(0,1)
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

    private marginalDimension(margin: number, image: HTMLImageElement): [number, number] {
        const width = image.width + margin * 2;
        const height = image.height + margin * 2;
        return [width, height]

    }

    //side-effect: 캔버스 더러워짐
    private createSDF(ctx: CanvasRenderingContext2D, margin: number, image: HTMLImageElement): Array<number> {

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
        const radius = margin * 16 + 1
        const cutoff = 0.5;

        // values는 Float32Array로 할 것
        // Uint8ClampedArray일 경우 distance가 의도치 않은 손실 발생
        let distance = calcSDF(values, { radius: radius, width: width, height: height, cutoff: cutoff });

        // [0,1]범위로 축소된 거리를 복원하는 함수
        let recoverDistance = (x: number) => (x - cutoff) * radius;
        distance = distance.map(recoverDistance);

        return distance;

    }
    private createContours(distance: any, targets: Array<number>, margin: number, dimension: [number, number]) {

        // 등고선 적용
        const contours4 = contours()
            .size(dimension)
            .thresholds(targets)(distance);
        return contours4;
    }
}

export default new Client();
