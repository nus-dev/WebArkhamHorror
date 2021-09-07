import {Store} from "../../store/Store";
import {useState} from 'react';
import {ItemView} from "./item/ItemView";
import {Item} from "../../model/Item";

// export function PageView() {
//     const [items, setItems] = useState(Store.getState().page.items);
//     Store.subscribe(() => setItems(Store.getState().page.items));
//     return (
//         <div>
//             <button onClick={() => Store.dispatch({type: 'ADDITEM', item: new Item('itemName')})}>Add Item</button>
//             {items.map((item: Item, idx: number)=> <ItemView key={idx} item={item} />)}
//         </div>
//     );
// }