import {Road} from "../road/Road";
import {RoadDirection} from "../road/RoadDirection";
import {Area} from "../area/Area";

export abstract class Place {
    public readonly roads: Array<Road> = [];
    
    constructor(public readonly name: string, public readonly area: Area) {
        //
    }

    public getNextBlackPlace(): Place {
        const road: Road = this.roads.find((road: Road) => RoadDirection.isBlack(road.direction) && road.srcPlace === this);
        return road ? road.dstPlace : null;
    }
}