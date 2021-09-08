import {Action, AnyAction, combineReducers } from "redux";
import undoable, {groupByActionTypes} from "redux-undo";
import {initialState} from "../State/state";

function counter(state = initialState.count, action: AnyAction) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        case 'SETCOUNT':
            return action.count
        default:
            return state
    }
}

function counter2(state = initialState.count2, action: AnyAction) {
    switch (action.type) {
        case 'INCREMENT2':
            return state + 1
        case 'DECREMENT2':
            return state - 1
        case 'SETCOUNT2':
            return action.count
        default:
            return state
    }
}

function itemsReducer(items = initialState.page.items, action: AnyAction) {
    switch (action.type) {
        case 'ADDITEM':
            return items.concat(action.item);
        default:
            return items;
    }
}

function colorReducer(state = initialState.color, action: AnyAction) {
    switch (action.type) {
        case 'SETCOLOR': 
            return action.color;
        default:
            return state;
    }
};

export default undoable(
    combineReducers({
        color: colorReducer,
        count: counter,
        count2: counter2,
        page: combineReducers({
            items: itemsReducer
        })
    }), {
        groupBy: groupByActionTypes([
            'SETCOUNT', 'SETCOUNT2'
        ])
    }
);