import {Store} from "../store/Store";
import {DecreaseCountAction, IncreaseCountAction} from "../action/Action";
import {useState} from 'react';

export function CounterView() {
    const [count, setNumber] = useState(Store.getState().count);
    Store.subscribe(() => setNumber(Store.getState().count));
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => Store.dispatch(IncreaseCountAction)}>IncreaseAction</button>
            <button onClick={() => Store.dispatch(DecreaseCountAction)}>DecreaseAction</button>
        </div>
    );
  }