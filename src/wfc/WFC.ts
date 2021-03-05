import WfcTile from './WfcTile.js';
import Random from '../random/Random.js';

/**
 * Input can be an array of strings, or a 2d array.
 */
type WFCInput = Array<string | Array<any>>;

/**
 * Parameters for the WFC class.
 */
interface WFCParams {
    input:WFCInput,
    n?:number,
    m?:number,
    repeatInput?:boolean,
    repeatOutput?:boolean,
}

// Tile frequencies. Just casually going to structure this to match the format for Random...
interface TileFrequency {
    option:WfcTile,
    weight:number,
}

// Tile adjacency rule
interface Rule {
    up: Array<number>,
    down: Array<number>,
    left: Array<number>,
    right: Array<number>,
}

/**
 * Class that implements the Wave Function Collapse algorithm.
 */
export default class WFC {
    rules:Array<Rule>;
    frequencies:Array<TileFrequency>;
    n:number;
    m:number;
    constructor( params:WFCParams ) {
        const { input, n=1, m=n, repeatInput=false, ...rest } = params;
        
        // Convert into a 2d array
        const inputImage:Array<Array<any>> = input.map(row=>{
            if (typeof row === "string") {
                return row.split("");
            } else {
                return row;
            }
        });

        console.log(inputImage);

        // Process the input image and store that data
        [this.rules, this.frequencies] = this.processInput(inputImage, repeatInput, n, m);
        this.n=n;
        this.m=m;
    }

    /**
     * Method that processes the image to generate adjacency rules and tile frequencies.
     */
    processInput(input:Array<Array<any>>, repeatInput:boolean, n:number, m:number):[Array<Rule>, Array<TileFrequency>] {
        // Get dimensions
        // Height is just the length of the array
        const height = input.length;
        const heightTiles = height  - ((!repeatInput) ? (m - 1) : 0)
        // Width is the minimum length of a subarray; force it to be square.
        const width = Math.min(...input.map(row=>row.length));
        const widthTiles = width  - ((!repeatInput) ? (n - 1) : 0)


        // Get all tiles in the input
        const rawTiles:Array<WfcTile> = [];
        for (let i=0;i<widthTiles;i++) {
            for(let j=0;j<heightTiles;j++) {
                const tileInput:Array<Array<any>> = [];
                for(let y=0;y<m;y++) {
                    const row:Array<any> = [];
                    const yPos = (j+y) % height;
                    for(let x=0;x<n;x++) {
                        const xPos = x+i % width;
                        row.push(input[yPos][xPos]);
                    }
                    tileInput.push(row);
                }
                const newTile = new WfcTile(tileInput);
                rawTiles.push(newTile);
            }
        }

        console.log(rawTiles);

        // Filter down, to get rid of repeats
        const tiles:Array<WfcTile> = [];
        const frequencies:Array<TileFrequency> = [];

        rawTiles.forEach(tile=>{
            const index = tiles.findIndex((otherTile)=>otherTile.equals(tile));
            if (index >= 0) {
                frequencies[index].weight++;
            } else {
                tiles.push(tile);
                frequencies.push({
                    option:tile,
                    weight:1,
                });
            }
        });

        // Next, we need adjacency rules
        const rules:Array<Rule> = tiles.map((tile)=>{
            // Begin a new rule!
            const rule:Rule = {
                up:[],
                down:[],
                left:[],
                right:[],
            };

            // Check if the tile is compatible with every other tile, in the 4 directions
            tiles.forEach((otherTile,i)=>{
                if(tile.compatible(otherTile,-1,0)) {
                    rule.right.push(i);
                }
                if(tile.compatible(otherTile,1,0)) {
                    rule.left.push(i);
                }
                if(tile.compatible(otherTile,0,-1)) {
                    rule.down.push(i);
                }
                if(tile.compatible(otherTile,0,1)) {
                    rule.up.push(i);
                }
            });

            // Done, return the finished rule
            return rule;
        });

        console.log(rules);
        return [rules, frequencies];
    }
}