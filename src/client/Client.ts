import 'd3-contour';
import 'd3-array';

class Client {
    constructor() {
        const playGround: HTMLDivElement = document.getElementById('playGround') as HTMLDivElement;
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const sample = new Image();
        playGround.appendChild(canvas);

        function isTransparent(pixel: ImageData) {
            return pixel.data[3] < 0.5
        }

        function draw() {
            let w: number, h: number;

            w = canvas.width = 400;
            h = canvas.height = 500;

            sample.onload = () => {

                let ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, w, h);

                //샘플 이미지를 그린다.
                ctx.drawImage(sample, 0, 0);
                var d3 = require('d3-contour');

                var n, m;
                n = sample.width;
                m = sample.height;

                var high = 100;
                var mid = 50;
                var low = 0;
                var values = new Array(n * m);
                for (let j = 0, k = 0; j < m; j++) {
                    for (let i = 0; i < n; i++, k++) {
                        var pixel = ctx.getImageData(i, j, 1, 1);

                        // 투명한 픽셀 대응시 low, 아닐시 high 값을 준다
                        values[k] = isTransparent(pixel)
                                    ? low
                                    : high;
                    }
                }

                // 등고선 적용
                var contours = d3.contours()
                    .size([n, m])
                    .thresholds([mid])
                    (values)

                ctx.lineWidth = 5;
                ctx.strokeStyle = '#f05'
                console.log(contours)

                //등고선 타입에 맞춰 선분을 그린다
                contours[0].coordinates.forEach((polygon: any[]) => {
                    //구멍난 도형의 가장 바깥 테두리 가져올 경우 아래 주석 활성화
                    //polygon=polygon.slice(0,1)
                    polygon.forEach((linearring: any[]) => {
                        ctx.beginPath();
                        let last = linearring[linearring.length - 1];
                        ctx.moveTo(last[0], last[1])
                        linearring.forEach((point: number[]) => {
                            ctx.lineTo(point[0], point[1])
                        });
                        ctx.closePath();
                        ctx.stroke();
                    });
                });


            }
            console.log("wow");

        }

        draw();
        sample.src = "./resources/image/sample2.png";

    }
}

export default new Client();