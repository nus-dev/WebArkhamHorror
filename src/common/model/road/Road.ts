import {RoadDirection} from "./RoadDirection";
import {Place} from "../place/Place";

export class Road {
    constructor(
        public readonly direction: RoadDirection,
        public readonly srcPlace: Place,
        public readonly dstPlace: Place
    ) {

    }
}