import {Item} from '../model/Item';

export const initialState = {
    color: 'black',
    count: 0,
    count2: 0,
    page: {
        items: [] as Array<Item>
    }
};