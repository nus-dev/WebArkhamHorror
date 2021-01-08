import 'd3-contour';
import 'bitmap-sdf';
let d3 = require('d3-contour');
let sdf = require('bitmap-sdf');

class Client {
    constructor() {
        const playGround: HTMLDivElement = document.getElementById('playGround') as HTMLDivElement;
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const sample = new Image();
        playGround.appendChild(canvas);

        function draw() {

            let targets0: number[] = []
            let targets1 = [-30]
            let targets3 = [-15, -30, -45]
            let targets5 = [0, -10, -20, -30, -40]
            let targets30 = [
                0, -10, -20, -30, -40, -50, -60, -70, -80, -90,
                -3, -13, -23, -33, -43, -53, -63, -73, -83, -93,
                -6, -16, -26, -36, -46, -56, -66, -76, -86, -96,
            ]

            let targets = targets5.map(x => x);


            sample.onload = () => {

                let ctx = canvas.getContext("2d");
                var contours = createContours(ctx, targets);

                ctx.lineWidth = 3;
                ctx.strokeStyle = '#000'

                drawContours(contours, ctx);

                // drawContours(contours, ctx, ()=>{});
                // drawContours(contours, ctx, (ring) => console.log(ring));
                console.log(contours);
            }

            function createContours(ctx: CanvasRenderingContext2D, targets: number[]) {
                // 외각선 잘림 방지를 위해 원본 그림 주위에 여백을 둔다
                let margin = Math.ceil(
                    targets
                        .map(Math.abs)
                        .reduce((acc, val) => Math.max(acc, val)))

                var n, m;
                n = sample.width + margin * 2;
                m = sample.height + margin * 2;

                ctx.canvas.width = n;
                ctx.canvas.height = m;

                console.assert(ctx.canvas.width >= n)
                console.assert(ctx.canvas.height >= m)


                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


                //샘플 이미지를 그린다.
                ctx.drawImage(sample, margin, margin);


                const opaque = 1;
                const transparent = 0;
                var values = Float32Array.from(
                    ctx.getImageData(0, 0, n, m)
                        .data
                        .filter((elem, index) => index % 4 == 3) //Take alpha channel
                        .map((alpha: number) => alpha < 0.5 ? transparent : opaque)
                );
                // console.log(values)

                // 라이브러리 bitmap-sdf에서 거리 값을 임의로 [0,1]범위에 맞춘다
                // https://github.com/dy/bitmap-sdf/blob/master/index.js#L86
                // 따라서 거리 값을 온전히 얻고 싶다면 radius와 cutoff를 적절히 설정해야 한다.
                // radius는 적당히 큰 수로 그림에서 등고선까지 거리보다 크면 된다.
                // cutoff는 0.5; [0,1] 사이의 값으로 radius의 기준이 된다.
                let radius = 100000;
                let cutoff = 0.5;

                // values는 Float32Array로 할 것
                // Uint8ClampedArray일 경우 distance가 의도치 않은 손실 발생
                let distance = sdf(values, { radius: radius, width: n, height: m, cutoff: cutoff });
                // console.log(distance)
                // [0,1]범위로 축소된 거리를 복원하는 함수
                let recoverDistance = (x: number) => (x - cutoff) * radius;
                distance = distance.map(recoverDistance);

                // 등고선 적용
                var contours = d3.contours()
                    .size([n, m])
                    .thresholds(targets)(distance);
                return contours;
            }

            /**등고선을 그린다.*/
            function drawContours(contours: any, ctx: CanvasRenderingContext2D, drawer = drawLinearring) {
                contours.forEach((contour: { value: number; coordinates: any[][]; }) => {
                    let hue = (contour.value * 5) % 360;
                    ctx.strokeStyle = 'hsl(' + hue + ',100%,50%)';

                    contour.coordinates.forEach((polygon: any[]) => {
                        //polygon은 linearring의 배열로 첫 요소는 가장 바깥 폐곡선이다

                        //가장 바깥 테두리만 가져오기
                        polygon = polygon.slice(0, 1);

                        polygon.forEach((linearring: any[]) => {
                            drawer(linearring, ctx);
                        });
                    });
                });
            }

            //폐곡선 그리기
            function drawLinearring(linearring: any[], ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                let last = linearring[linearring.length - 1];
                ctx.moveTo(last[0], last[1]);
                linearring.forEach((point: number[]) => {
                    ctx.lineTo(point[0], point[1]);
                });
                ctx.closePath();
                ctx.stroke();
            }
        }

        draw();
        sample.src = "./resources/image/sample_400_500.png";
        // sample.src = "./resources/image/sample_1000_1000.png";
        // sample.src = "./resources/image/sample_5000_5000.png";

    }
}

export default new Client();