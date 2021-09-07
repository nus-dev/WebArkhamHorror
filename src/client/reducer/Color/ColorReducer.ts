import {AnyAction} from "redux";
import {initialState} from "../../State/state";

export function colorReducer(state = initialState.color, action: AnyAction) {
    switch (action.type) {
        case 'SETCOLOR': 
            return action.color;
        default:
            return state;
    }
};