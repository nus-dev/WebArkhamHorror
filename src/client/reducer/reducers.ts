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

function pipeReducer(state = initialState.pipe, action: Action): boolean {
    switch (action.type) {
        case 'pipe':
            return !state;
        default:
            return state;
    }
}

export default combineReducers({
    color: colorReducer,
    count: undoable(counter, {
        // filter: (action, currentState, previousHistory) => {
        //     console.log(action, currentState, previousHistory);
        //     return true;
        // },
        // groupBy: (action, currentState, previousHistory) => {
        //     console.log(action, currentState, previousHistory);
        // }
        groupBy: groupByActionTypes([
            'SETCOUNT'
        ])
    }),
    // page: combineReducers({
    //     items: itemsReducer
    // })
    pipe: pipeReducer
});