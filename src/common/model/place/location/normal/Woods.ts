import {NormalLocation} from "./NormalLocation";
import {Area} from "../../../area/Area";

export class Woods extends NormalLocation {
    public readonly isStable: boolean = false;

    constructor() {
        super('숲', Area.남부);
    }
}