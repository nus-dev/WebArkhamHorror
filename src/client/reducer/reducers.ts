import {Action, combineReducers } from "redux";
import {initialState} from "../State/state";
import {colorReducer} from "./Color/ColorReducer";

function counter(state = initialState.count, action: Action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

function itemsReducer(items = initialState.page.items, action: any) {
    switch (action.type) {
        case 'ADDITEM':
            return items.concat(action.item);
        default:
            return items;
    }
}

export default combineReducers({
    color: colorReducer,
    count: counter,
    page: combineReducers({
        items: itemsReducer
    })
});