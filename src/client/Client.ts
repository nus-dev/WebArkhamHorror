import {CounterView} from "./view/CounterView";
import {createElement} from 'react';
import ReactDOM from 'react-dom';
import { ColorView } from "./view/ColorView";
import { PageView } from "./view/page/PageView";
import { CounterView2 } from "./view/Counter2View";

(() => {
    const playGround1: HTMLDivElement = document.getElementById('playGround1') as HTMLDivElement;
    const counterView = ReactDOM.render(createElement(CounterView, {}), playGround1);

    const playGround2: HTMLDivElement = document.getElementById('playGround2') as HTMLDivElement;
    const counterView2 = ReactDOM.render(createElement(CounterView2, {}), playGround2);

    const playGround3: HTMLDivElement = document.getElementById('playGround3') as HTMLDivElement;
    const counterView3 = ReactDOM.render(createElement(PageView, {}), playGround3);
})();