import {Place} from "../place/Place";

export abstract class Board {
    public readonly places: Array<Place> = [];

    constructor(public readonly boardName: string) {
        //
    }
}