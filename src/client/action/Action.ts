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

export const increateAction2 = {type: 'INCREMENT2'};
export function increaseCount2(): void {
    Store.dispatch(increateAction2);
}

export function decreaseCount2(): void {
    Store.dispatch({type: 'DECREMENT2'});
}

export function setCount(count: number): void {
    Store.dispatch({type: 'SETCOUNT', count});
}

export function setCount2(count: number): void {
    Store.dispatch({type: 'SETCOUNT2', count});
}

export function setColor(color: string): void {
    Store.dispatch({type: 'SETCOLOR', color});
}

export function addItem(item: Item): void { Store.dispatch({type: 'ADDITEM', item}); };

export function undo(): void { Store.dispatch(ActionCreators.undo()); };
export function redo(): void { Store.dispatch(ActionCreators.redo()); };

