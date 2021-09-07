import { Rect } from "./Rect";

export class Item {
    constructor(public itemName: string) {
        //
    }
    public boundingBox: Rect;
}