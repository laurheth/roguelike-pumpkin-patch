import PathFinder from './PathFinder';

describe("PathFinder tests.", ()=>{
    // Generic map to try pathing through
    // rows 0-11, cols 0-19
    const mapFancy = [
        "####################",
        "#.....#...#...#....#",
        "#...###.....~.#....#",
        "#.........#.~...####",
        "#.....#...#...#....#",
        "####..############.#",
        "#.....#.....~...#..#",
        "#.....#..#..~......#",
        "#~~~###..########..#",
        "#.....#....~....#..#",
        "#........#...~.....#",
        "####################",
    ];

    // rows 0-6, cols 0-31
    const mapSimple = [
        "################################",
        "#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#",
        "#.~~~~~~~~~~~~~~~~~~~~~~~~~~~~.#",
        "#..............................#",
        "#..............................#",
        "#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#",
        "################################",
    ];
    
    const getTile = (pos:Array<number>,map:string[])=>map[pos[1]][pos[0]];

    const tileWeight = (tile:String) =>{
        if (tile === '#') {
            return Infinity;
        } else if (tile === '~') {
            return 10;
        } else {
            return 1;
        }
    }

    const isContinuous = (path:Array<Array<number>>) => {
        let continuous:boolean = true;
        for (let i=1;i<path.length;i++) {
            continuous &&= (Math.max(Math.abs(path[i][0] - path[i-1][0]), Math.abs(path[i][1] - path[i-1][1])) <= 1);
        }
        return continuous;
    }

    const isOrthogonal = (path:Array<Array<number>>) => {
        let continuous:boolean = true;
        for (let i=1;i<path.length;i++) {
            continuous &&= ((Math.abs(path[i][0] - path[i-1][0]) + Math.abs(path[i][1] - path[i-1][1])) <= 1);
        }
        return continuous;
    }

    test("A straight line.",()=>{
        const canPass = (pos:Array<number>)=>getTile(pos,mapSimple) !== '#';

        // Low number of iterations chosen. It SHOULD just go in a straight line, given the metric.
        const pathfinder = new PathFinder({canPass:canPass, maxIterations:30});

        let path = pathfinder.findPath([1,3], [30,3]);

        expect(path.length).toBe(29);
        expect(isContinuous(path)).toBeTruthy();

        // Reverse it, just in case
        path = pathfinder.findPath([30,3], [1,3]);

        expect(path.length).toBe(29);
        expect(isContinuous(path)).toBeTruthy();
    });

    test("Mostly straight line, with some water.",()=>{
        const canPass = (pos:Array<number>)=>getTile(pos,mapSimple) !== '#';
        const weight = (pos:Array<number>)=>tileWeight(getTile(pos,mapSimple));

        // Low number of iterations chosen. It SHOULD just go in a straight line, given the metric.
        const pathfinder = new PathFinder({canPass:canPass, weight:weight});

        const path = pathfinder.findPath([1,1], [30,1]);

        expect(path.length).toBe(31);
        expect(isContinuous(path)).toBeTruthy();

        // Do it again, but orthogonally.
        const orthoPath = pathfinder.findPath([1,1], [30,1],true);
        expect(orthoPath.length).toBe(33);
        expect(isContinuous(orthoPath) && isOrthogonal(orthoPath)).toBeTruthy();
    });

    test("A more complicated map.",()=>{
        const canPass = (pos:Array<number>)=>getTile(pos,mapFancy) !== '#';

        const pathfinder = new PathFinder({canPass:canPass});

        let path = pathfinder.findPath([1,1], [18,10]);

        expect(path.length).toBe(22);
        expect(isContinuous(path)).toBeTruthy();

        // Reverse it, just in case
        path = pathfinder.findPath([18,10], [1,1]);

        expect(path.length).toBe(22);
        expect(isContinuous(path)).toBeTruthy();

        // Do it again, but orthogonally.
        path = pathfinder.findPath([1,1], [18,10],true);

        expect(path.length).toBe(28);
        expect(isContinuous(path) && isOrthogonal(path)).toBeTruthy();

        // Reverse it, just in case
        path = pathfinder.findPath([18,10], [1,1],true);

        expect(path.length).toBe(28);
        expect(isContinuous(path) && isOrthogonal(path)).toBeTruthy();
    });

    test("A more complicated map, different positions.",()=>{
        const canPass = (pos:Array<number>)=>getTile(pos,mapFancy) !== '#';

        const pathfinder = new PathFinder({canPass:canPass});

        let path = pathfinder.findPath([1,6], [18,6]);

        expect(path.length).toBe(18);
        expect(isContinuous(path)).toBeTruthy();

        // Reverse it, just in case
        path = pathfinder.findPath([18,6], [1,6]);

        expect(path.length).toBe(18);
        expect(isContinuous(path)).toBeTruthy();

        // Do it again, but orthogonally.
        path = pathfinder.findPath([1,6], [18,6],true);

        expect(path.length).toBe(25);
        expect(isContinuous(path) && isOrthogonal(path)).toBeTruthy();

        // Reverse it, just in case
        path = pathfinder.findPath([18,6], [1,6],true);

        expect(path.length).toBe(25);
        expect(isContinuous(path) && isOrthogonal(path)).toBeTruthy();
    });

    test("A more complicated map, with water.",()=>{
        const canPass = (pos:Array<number>)=>getTile(pos,mapFancy) !== '#';
        const weight = (pos:Array<number>)=>tileWeight(getTile(pos,mapFancy));

        const pathfinder = new PathFinder({canPass:canPass, weight:weight});

        let path = pathfinder.findPath([1,6], [14,6]);

        expect(path.length).toBe(21);
        expect(isContinuous(path)).toBeTruthy();

        // Reverse it, just in case
        path = pathfinder.findPath([14,6], [1,6]);

        expect(path.length).toBe(21);
        expect(isContinuous(path)).toBeTruthy();

        // Do it again, but orthogonally.
        path = pathfinder.findPath([1,6], [14,6],true);

        expect(path.length).toBe(33);
        expect(isContinuous(path) && isOrthogonal(path)).toBeTruthy();

        // Reverse it, just in case
        path = pathfinder.findPath([14,6], [1,6],true);

        expect(path.length).toBe(33);
        expect(isContinuous(path) && isOrthogonal(path)).toBeTruthy();
    });
});
