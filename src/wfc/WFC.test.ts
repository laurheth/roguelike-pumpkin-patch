import WFC from './WFC';
import WfcTile from './WfcTile';

describe("Test the WFC system generator",()=>{

    const inputImage = [
        ".#..",
        ".#..",
        "####",
        ".#..",
    ];

    test("Test the preprocessing.",()=>{
        const wfc = new WFC({input:inputImage,n:3,repeatInput:true});
        const tiles = wfc.frequencies.map(freq=>freq.option);

        expect(tiles.findIndex(tile=>tile.equals(new WfcTile([[".","#","."],[".","#","."],["#","#","#"]])))).toBeGreaterThanOrEqual(0);
        expect(tiles.findIndex(tile=>tile.equals(new WfcTile([["#",".","."],["#","#","#"],["#",".","."]])))).toBeGreaterThanOrEqual(0);
        expect(tiles.findIndex(tile=>tile.equals(new WfcTile([[".","#","."],["#","#","#"],[".","#","."]])))).toBeGreaterThanOrEqual(0);
        expect(tiles.findIndex(tile=>tile.equals(new WfcTile([[".",".","."],[".",".","."],[".",".","."]])))).toBeGreaterThanOrEqual(0);
        expect(tiles.length).toBe(16);
    });

    test("Test the rules generated",()=>{
        const wfc = new WFC({input:inputImage,n:3,repeatInput:true});
        const tiles = wfc.frequencies.map(freq=>freq.option);
        const rules = wfc.rules;

        const xTile = tiles.findIndex(tile=>tile.equals(new WfcTile([[".","#","."],["#","#","#"],[".","#","."]])));
        const tTile = tiles.findIndex(tile=>tile.equals(new WfcTile([["#","#","#"],[".","#","."],[".","#","."]])))
        const lTile = tiles.findIndex(tile=>tile.equals(new WfcTile([[".",".","#"],["#","#","#"],[".",".","#"]])))
        const rTile = tiles.findIndex(tile=>tile.equals(new WfcTile([["#",".","."],["#","#","#"],["#",".","."]])))

        expect(rules[xTile].down.includes(tTile)).toBe(true);
        expect(rules[tTile].up.includes(xTile)).toBe(true);
        expect(rules[xTile].left.includes(lTile)).toBe(true);
        expect(rules[lTile].right.includes(xTile)).toBe(true);
        expect(rules[xTile].right.includes(rTile)).toBe(true);
        expect(rules[rTile].left.includes(xTile)).toBe(true);
    });

});