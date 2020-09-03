import {Location} from "../Location";

export abstract class NormalLocation extends Location {
    public abstract readonly isStable: boolean;
}