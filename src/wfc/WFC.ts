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

/**
 * Class that implements the Wave Function Collapse algorithm.
 */
export default class WFC {
    constructor( params:WFCParams ) {
        const { input, n=1, m=n, repeatInput=false, repeatOutput=false, ...rest } = params;
        
        // Convert into a 2d array
        const inputImage = input.map(row=>{
            if (typeof row === "string") {
                return row.split("");
            } else {
                return row;
            }
        });

        // Get dimensions
        // Height is just the length of the array
        const height = inputImage.length - ((!repeatInput) ? (m - 1) : 0);
        // Width is the minimum length of a subarray; force it to be square.
        const width = Math.min(...inputImage.map(row=>row.length)) - ((!repeatInput) ? (n - 1) : 0);

        
    }
}