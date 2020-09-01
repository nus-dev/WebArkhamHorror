import {NormalLocation} from "./NormalLocation";
import {Area} from "../../../area/Area";

export class IndependentSquare extends NormalLocation {
    public readonly isStable: boolean = false;

    constructor() {
        super('독립광장', Area.북부);
    }
}