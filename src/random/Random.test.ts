// Honestly, how the hell do you test a random number generator?
import Random from './Random';

describe("Random number generation tests.", ()=>{
    // An array to fill with some random shit
    const output: Array<number> = [];

    const rng = new Random();

    afterEach(()=>{
        // Clear the output array
        while(output.length>0) {
            output.pop();
        }
    });

    test("Just plain ol' getRandom", ()=>{
        for (let i=0;i<1000;i++) {
            output.push(rng.getRandom());
        }

        expect(Math.max(...output)).toBeLessThan(1);
        expect(Math.min(...output)).toBeGreaterThanOrEqual(0);
    });

    test("getNumber with integers", ()=>{
        for (let i=0;i<1000;i++) {
            output.push(rng.getNumber(0,10,true));
        }

        expect(Math.max(...output)).toBeLessThanOrEqual(10);
        expect(Math.min(...output)).toBeGreaterThanOrEqual(0);
    });

    test("getNumber with non-integers", ()=>{
        for (let i=0;i<1000;i++) {
            output.push(rng.getNumber(0,10));
        }

        expect(Math.max(...output)).toBeLessThanOrEqual(10);
        expect(Math.min(...output)).toBeGreaterThanOrEqual(0);
    });

    test("Random elements from an array", ()=>{
        const array = [1,2,3,4];

        for(let i=0;i<1000;i++) {
            output.push(rng.getRandomElement(array));
        }
        for (let i=1;i<=4;i++) {
            expect(output.indexOf(i)).toBeGreaterThanOrEqual(0);
        }
    });

    test("Random elements from weighted array, integer weights", ()=>{
        const array = [
            {
                option:()=>output.push(1),
                weight:1
            },
            {
                option:()=>output.push(2),
                weight:2
            },
            {
                option:()=>output.push(3),
                weight:3
            },
        ];

        for(let i=0;i<1000;i++) {
            output.push((rng.getWeightedElement(array))());
        }

        const one = output.filter(x=>x===1).reduce((x,y)=>x+y);
        const two = output.filter(x=>x===2).reduce((x,y)=>x+y);
        const three = output.filter(x=>x===3).reduce((x,y)=>x+y);

        expect(three/one).toBeGreaterThan(2);
        expect(three/one).toBeLessThan(4);

        expect(two/one).toBeGreaterThan(1);
        expect(two/one).toBeLessThan(3);
    });

    test("Random elements from weighted array, integer weights", ()=>{
        const array = [
            {
                option:()=>output.push(1),
                weight:1.3
            },
            {
                option:()=>output.push(2),
                weight:2.6
            },
            {
                option:()=>output.push(3),
                weight:3.9
            },
        ];

        for(let i=0;i<1000;i++) {
            output.push((rng.getWeightedElement(array))());
        }
        const one = output.filter(x=>x===1).reduce((x,y)=>x+y);
        const two = output.filter(x=>x===2).reduce((x,y)=>x+y);
        const three = output.filter(x=>x===3).reduce((x,y)=>x+y);

        expect(three/one).toBeGreaterThan(2);
        expect(three/one).toBeLessThan(4);

        expect(two/one).toBeGreaterThan(1);
        expect(two/one).toBeLessThan(3);
    });
});