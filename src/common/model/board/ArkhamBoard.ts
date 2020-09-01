import {Board} from "./Board";
import {Place} from "../place/Place";
import {Woods} from "../place/location/normal/Woods";
import {IndependentSquare} from "../place/location/normal/IndependentSquare";
import {Road} from "../road/Road";
import { RoadDirection } from "../road/RoadDirection";

export class ArkhamBoard extends Board {
    constructor() {
        super('아컴');

        const woods: Place = new Woods();
        const independentSquare: Place = new IndependentSquare();
        const road1: Road = new Road(RoadDirection.BLACKANDWHITE, woods, independentSquare);
        const road2: Road = new Road(RoadDirection.BLACKANDWHITE, independentSquare, woods);
        woods.roads.push(road1);
        independentSquare.roads.push(road2);

        this.places.push(woods);
        this.places.push(independentSquare);
    }
}