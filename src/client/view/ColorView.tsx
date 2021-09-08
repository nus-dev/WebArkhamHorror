import {Store} from "../store/Store";
import {useState} from 'react';

export function ColorView() {
    const [color, setColor] = useState(Store.getState().present.color);
    Store.subscribe(() => setColor(Store.getState().present.color));
    return (
        <div>
            <h1>{color}</h1>
            <button onClick={() => Store.dispatch({type: 'SETCOLOR', color: 'red' })}>Red</button>
            <button onClick={() => Store.dispatch({type: 'SETCOLOR', color: 'blue' })}>Blue</button>
        </div>
    );
}