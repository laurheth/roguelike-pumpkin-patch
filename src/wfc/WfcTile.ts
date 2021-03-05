/**
 * A tile, as defined for Wave Function Collapse purposes
 */
export default class WfcTile {
    readonly contents:Array<Array<any>>;

    constructor(input:Array<Array<any>>) {
        this.contents = input.map(row=>[...row]);
    }

    equals(tile:WfcTile):boolean {
        return this.compatible(tile,0,0);
    }

    compatible(tile:WfcTile, x:-1|0|1, y:-1|0|1):boolean {
        return this.contents.every((row,j)=>{
            return row.every((val,i)=>{
                const xPos = i + x;
                const yPos = j + y;
                if (xPos >= 0 && yPos >= 0 && yPos < tile.contents.length && xPos < tile.contents[yPos].length) {
                    return val === tile.contents[yPos][xPos];
                } else {
                    return true;
                }
            });
        });
    }
}