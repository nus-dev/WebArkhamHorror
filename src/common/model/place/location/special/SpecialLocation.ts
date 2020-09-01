import {Location} from "../Location";

export abstract class SpecialLocation extends Location {
    public abstract readonly isStable: boolean;
}