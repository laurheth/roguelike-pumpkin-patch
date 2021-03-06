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
    input:WFCInput;
    n?:number;
    m?:number;
    repeatInput?:boolean;
    random?:Random
}

/** Parameters for the WFC output. */
interface WFCOutputParams {
    width: number;
    height: number;
    repeatOutput?:boolean;
}

/**
 * Tile frequencies. Just casually going to structure this to match the format for Random...
 */ 
interface TileFrequency {
    option:WfcTile;
    weight:number;
}

/**
 * Tile adjacency rule
 */
interface Rule {
    up: Array<number>;
    down: Array<number>;
    left: Array<number>;
    right: Array<number>;
}

/**
 * Interface to keep track of possibilities for a particular location
 */
interface Options {
    options: Array<number>;
    position: [number, number];
}

/**
 * Class that implements the Wave Function Collapse algorithm.
 */
export default class WFC {
    readonly rules:Array<Rule>;
    readonly frequencies:Array<TileFrequency>;
    private n:number;
    private m:number;
    private random:Random;

    constructor( params:WFCParams ) {
        const { input, n=1, m=n, repeatInput=false, random, ...rest } = params;
        
        // Convert into a 2d array
        const inputImage:Array<Array<any>> = input.map(row=>{
            if (typeof row === "string") {
                return row.split("");
            } else {
                return row;
            }
        });

        // Process the input image and store that data
        [this.rules, this.frequencies] = this.processInput(inputImage, repeatInput, n, m);
        this.n=n;
        this.m=m;

        if (!random) {
            this.random = new Random();
        } else {
            this.random = random;
        }
    }

    /**
     * Method that processes the image to generate adjacency rules and tile frequencies.
     */
    private processInput(input:Array<Array<any>>, repeatInput:boolean, n:number, m:number):[Array<Rule>, Array<TileFrequency>] {
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
                        const xPos = (x+i) % width;
                        row.push(input[yPos][xPos]);
                    }
                    tileInput.push(row);
                }
                const newTile = new WfcTile(tileInput);
                rawTiles.push(newTile);
            }
        }

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

        return [rules, frequencies];
    }

    /**
     * Generate an output image.
     */
    public generate(params:WFCOutputParams):Array<Array<any>> {
        const { width, height, repeatOutput, ...rest } = params;

        // Initialize with all tiles being possible
        const waveFunction:Array<Array<Options>> = [];
        const entropyList:Array<Options> = [];
        const doneList:Array<Options> = [];
        for(let j=0;j<height;j++) {
            const row:Array<Options> = [];
            for(let i=0;i<width;i++) {
                const column:Array<number> = [];
                for (let num=0;num<this.frequencies.length;num++) {
                    for(let count=0;count<this.frequencies[num].weight;count++) {
                        column.push(num);
                    }
                }
                // Same data is in both; one is just for positions, one is for sorting
                const options:Options = {
                    options:column,
                    position: [i,j],
                }
                row.push(options);
                entropyList.push(options);
            }
            waveFunction.push(row);
        }

        // TODO: Add step for applying constraints to the image

        // Begin the main loop!
        // Put a hard cap on the duration, don't want to fuck with someones browser
        let cap = width*height+1;
        while(entropyList.length>0 && cap>=0) {
            // Sort the entropyList, to put the option with fewest possibilities first
            entropyList.sort((a,b)=>{
                return a.options.length - b.options.length;
            });

            // Get the first set of options
            const options = entropyList.shift();

            // Make sure it's length is not 0. If it is, we fucked up.
            if (options.options.length <= 0) {
                // TODO: Other options for failure (maybe a default tile? Ugly but not terrible for a roguelike)
                return null;
            }

            // Choose an option;
            const choice = [this.random.getRandomElement(options.options)];
            options.options = choice;
            doneList.push(options);

            // Propagate that choice to the other tiles
            this.applyAdjacency(waveFunction, options.position, repeatOutput);

            // Reduce the cap to avoid infinite looping.
            cap--;
        }
        return this.postProcess(waveFunction);
    }

    /** Convert the array of numbers into the desired output */
    postProcess(waveFunction:Array<Array<Options>>):Array<Array<any>> {
        const height = waveFunction.length + (this.m-1);
        const width = waveFunction.length + (this.n-1);

        const output:Array<Array<any>> = [];
        for (let j=0;j<height;j++) {
            const row:Array<any> = [];
            for(let i=0;i<width;i++) {
                row.push(null);
            }
            output.push(row);
        }

        waveFunction.forEach((row,j)=>{
            row.forEach((option,i)=>{
                if (option.options.length>0) {
                    const tile = this.frequencies[option.options[0]].option;

                    for(let x=0;x<this.n;x++) {
                        for(let y=0;y<this.m;y++) {
                            output[j+y][i+x] = tile.contents[y][x];
                        }
                    }
                }
            })
        });

        return output;
    }

    /** Apply adjacency rules */
    applyAdjacency(waveFunction:Array<Array<Options>>, [x,y]:[number,number], repeatOutput:boolean, backTrack=false) {
        const toDoTiles:Array<Options> = [waveFunction[y][x]];
        const doneTiles:Array<Options> = [];

        while(toDoTiles.length > 0) {
            const doTile = toDoTiles.pop();
            this.propogate(waveFunction, doTile.position, repeatOutput, doneTiles).forEach(newTile=>{
                toDoTiles.push(newTile);
            });
            if (!backTrack) {
                doneTiles.push(doTile);
            }
        }
    }

    /** Individual propogation step */
    propogate(waveFunction:Array<Array<Options>>, [x,y]:[number,number], repeatOutput:boolean, ignoreList:Array<Options>=[]):Array<Options> {
        const options:Options = waveFunction[y][x];

        const aggregateRules:Rule = {
            up:[],
            down:[],
            left:[],
            right:[],
        };

        // Get all available possibilities
        options.options.forEach(option=>{
            const rule:Rule = this.rules[option];
            rule.up.forEach(x=>aggregateRules.up.push(x));
            rule.down.forEach(x=>aggregateRules.down.push(x));
            rule.left.forEach(x=>aggregateRules.left.push(x));
            rule.right.forEach(x=>aggregateRules.right.push(x));
        });

        // Remove duplicates
        aggregateRules.up = aggregateRules.up.filter((x,i,arr)=>arr.indexOf(x)===i);
        aggregateRules.down = aggregateRules.down.filter((x,i,arr)=>arr.indexOf(x)===i);
        aggregateRules.left = aggregateRules.left.filter((x,i,arr)=>arr.indexOf(x)===i);
        aggregateRules.right = aggregateRules.right.filter((x,i,arr)=>arr.indexOf(x)===i);

        // Maintain list of next tiles to go to
        const nextTiles:Array<Options> = [];

        // Apply for each direction
        const steps:Array<"up"|"down"|"left"|"right"> = ["up","down","left","right"];
        const stepDirections = {
            up:[0,-1],
            down:[0,1],
            left:[-1,0],
            right:[1,0],
        }
        steps.forEach(step=>{
            let xx = x+stepDirections[step][0];
            let yy = y+stepDirections[step][1];
            if (repeatOutput) {
                xx += waveFunction[0].length;
                xx = xx % waveFunction[0].length;
                yy += waveFunction.length;
                yy = yy % waveFunction.length;
            }
            if (xx>=0 && xx<waveFunction[0].length && yy>=0 && yy<waveFunction.length) {
                if (ignoreList.includes(waveFunction[yy][xx])) {
                    return;
                }
                const beforeLength = waveFunction[yy][xx].options.length;
                waveFunction[yy][xx].options = waveFunction[yy][xx].options.filter(x=>{
                    return aggregateRules[step].includes(x);
                })

                if (beforeLength > waveFunction[yy][xx].options.length) {
                    // this.propogate(waveFunction,[xx,yy],repeatOutput);
                    nextTiles.push(waveFunction[yy][xx]);
                }
            }
        });
        return nextTiles;
    }
}