import {Store} from "../../store/Store";
import {useState} from 'react';
import {ItemView} from "./item/ItemView";

export function PageView() {
    const [items, setItems] = useState(Store.getState().page.items);
    Store.subscribe(() => setItems(Store.getState().page.items));
    return (
        <div>
            <button onClick={() => Store.dispatch({type: 'ADDITEM', item: 'itemName'})}>Add Item</button>
            {items.map((item, idx)=> <ItemView key={idx} item={item} />)}
        </div>
    );
}