import {Action, AnyAction, combineReducers } from "redux";
import undoable, {groupByActionTypes} from "redux-undo";
import { increateAction } from "../action/Action";
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

// function itemsReducer(items = initialState.page.items, action: AnyAction) {
//     switch (action.type) {
//         case 'ADDITEM':
//             return items.concat(action.item);
//         default:
//             return items;
//     }
// }

function colorReducer(state = initialState.color, action: AnyAction) {
    switch (action.type) {
        case 'SETCOLOR': 
            return action.color;
        default:
            return state;
    }
};

export default combineReducers({
    color: colorReducer,
    count: undoable(counter, {
        groupBy: groupByActionTypes([
            'SETCOUNT'
        ])
    }),
    // count: counter,
    // page: combineReducers({
    //     items: itemsReducer
    // })
});