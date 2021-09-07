import {Item} from "../../../model/Item";

export function ItemView(props: {item: Item}) {
    const {item} = props;
    return (
        <div>
            <h1>{item.itemName}</h1>
        </div>
    );
}