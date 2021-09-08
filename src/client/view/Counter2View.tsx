import {Store} from "../store/Store";
import {decreaseCount, decreaseCount2, increaseCount, increaseCount2, redo, setCount, setCount2, undo} from "../action/Action";
import {useState} from 'react';

export function CounterView2() {
    const [count2, setNumber] = useState(Store.getState().present.count2);
    Store.subscribe(() => setNumber(Store.getState().present.count2));
    return (
        <div>
            <h1>{count2}</h1>
            <button onClick={increaseCount2}>IncreaseAction</button>
            <button onClick={decreaseCount2}>DecreaseAction</button>
            <input type="range" min="1" max="100" onMouseUp={() => {
                undo();
                redo();
            }} onChange={(e) => setCount2(Number(e.target.value))} value={count2} className="slider" id="myRange" />
            <button onClick={undo}>UNDO</button>
            <button onClick={redo}>REDO</button>
        </div>
    );
}