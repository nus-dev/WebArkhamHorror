import {Place} from "../Place";

export abstract class Location extends Place {
    public abstract readonly isStable: boolean;
}