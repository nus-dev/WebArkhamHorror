enum RoadDirection {
    NONE = 0,
    BLACK = 1,
    WHITE = 2,
    BLACKANDWHITE = 3
}

namespace RoadDirection {
    export function isBlack(direction: RoadDirection): boolean {
        return !!(direction & RoadDirection.BLACK);
    }

    export function isWhite(direction: RoadDirection): boolean {
        return !!(direction & RoadDirection.WHITE);
    }
}

export {RoadDirection};