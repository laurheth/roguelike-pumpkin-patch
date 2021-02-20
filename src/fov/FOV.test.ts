import FOV from './FOV';

describe("Test field of view.", ()=>{
    const map = [
        "####################",
        "#..................#",
        "#..#.....#....#....#",
        "#..#.....###...##..#",
        "#..#.....#.........#",
        "#.............#....#",
        "#........#.........#",
        "####...###....#....#",
        "#........#.........#",
        "####################",
    ];

    const createEmptyMap = (mapToEmpty:Array<string>) => {
        while(mapToEmpty.length>0) {
            mapToEmpty.pop();
        }
        map.forEach(row=>mapToEmpty.push(' '.repeat(row.length)))
    };

    const emptyMap:Array<string> = [];
    createEmptyMap(emptyMap);

    const canSee = (pos:Array<number>)=>{
        const x = pos[0];
        const y = pos[1];
        if (x<0 || x>= map[0].length || y<0 || y>=map.length) {
            return false;
        }
        const tile = map[y][x];
        const emptyMapRow = emptyMap[y];
        emptyMap[y] = emptyMapRow.slice(0, x) + tile + emptyMapRow.slice(x+1);
        if (tile === '#') {
            return false;
        } else {
            return true;
        }
    };

    beforeEach(()=>createEmptyMap(emptyMap));

    test("Range 8 FOV test.", ()=>{
        const fov = new FOV(canSee, 8);

        for(let x=0;x<map[0].length;x++) {
            for (let y=0;y<map.length;y++) {
                if (map[y][x] === '.') {
                    createEmptyMap(emptyMap);
                    fov.look([x,y]);
                    emptyMap[y] = emptyMap[y].slice(0,x) + '@' + emptyMap[y].slice(x+1);
                    expect(emptyMap).toMatchSnapshot();
                }

            }
        }
    });

    test("Range 2 FOV test.", ()=>{
        const fov = new FOV(canSee, 2);

        for(let x=0;x<map[0].length;x++) {
            for (let y=0;y<map.length;y++) {
                if (map[y][x] === '.') {
                    createEmptyMap(emptyMap);
                    fov.look([x,y]);
                    emptyMap[y] = emptyMap[y].slice(0,x) + '@' + emptyMap[y].slice(x+1);
                    expect(emptyMap).toMatchSnapshot();
                }

            }
        }
    });
});