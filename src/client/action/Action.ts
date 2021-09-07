import {ActionCreators} from "redux-undo";
import {Item} from "../model/Item";
import {Store} from "../store/Store";

export const increateAction = {type: 'INCREMENT'};
export function increaseCount(): void {
    Store.dispatch(increateAction);
}

export function decreaseCount(): void {
    Store.dispatch({type: 'DECREMENT'});
}

export function setCount(count: number): void {
    Store.dispatch({type: 'SETCOUNT', count});
}

export function setColor(color: string): void {
    Store.dispatch({type: 'SETCOLOR', color});
}

export function addItem(item: Item): void { Store.dispatch({type: 'ADDITEM', item}); };

export function undo(): void { Store.dispatch(ActionCreators.undo()); };
export function redo(): void { Store.dispatch(ActionCreators.redo()); };

