import {Store} from "../store/Store";
import {decreaseCount, increaseCount, redo, setCount, undo} from "../action/Action";
import {useState} from 'react';

export function CounterView() {
    const [count, setNumber] = useState(Store.getState().present.count);
    Store.subscribe(() => setNumber(Store.getState().present.count));
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increaseCount}>IncreaseAction</button>
            <button onClick={decreaseCount}>DecreaseAction</button>
            <input type="range" min="1" max="100" onMouseUp={() => {
                undo();
                redo();
            }} onChange={(e) => setCount(Number(e.target.value))} value={count} className="slider" id="myRange" />
            <button onClick={undo}>UNDO</button>
            <button onClick={redo}>REDO</button>
        </div>
    );
}