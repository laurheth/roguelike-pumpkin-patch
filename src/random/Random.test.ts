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

    test("Mean and standard deviation roughly what they should be?", ()=>{
        const reps = 5000;
        for (let i=0;i<reps;i++) {
            output.push(rng.getRandom());
        }

        const total = output.reduce((x,y)=>x+y);

        const mean = total / reps;

        const variance = output.reduce((y,x)=>(y + Math.pow(x - mean,2))) / reps;

        const expectedMean = 0.5;
        const expectedVariance = 1/12;

        expect(Math.abs(mean - expectedMean)).toBeLessThan(expectedVariance);
        expect(Math.abs(variance - expectedVariance)).toBeLessThan(expectedVariance);
    });

    test("Check getRandom doesn't go out of bounds.", ()=>{
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

    test("Random elements from an array gives expected results.", ()=>{
        const array = [1,2,3,4];

        const reps = 5000;

        for(let i=0;i<reps;i++) {
            output.push(rng.getRandomElement(array));
        }

        const one = output.filter(x=>x===1).reduce((x)=>x+1);
        const two = output.filter(x=>x===2).reduce((x)=>x+1);
        const three = output.filter(x=>x===3).reduce((x)=>x+1);
        const four = output.filter(x=>x===4).reduce((x)=>x+1);

        // Make sure every number is present, and not too much of an outlier.
        expect(one).toBeGreaterThan(0.15*reps);
        expect(two).toBeGreaterThan(0.15*reps);
        expect(three).toBeGreaterThan(0.15*reps);
        expect(four).toBeGreaterThan(0.15*reps);
        expect(one).toBeLessThan(0.35*reps);
        expect(two).toBeLessThan(0.35*reps);
        expect(three).toBeLessThan(0.35*reps);
        expect(four).toBeLessThan(0.35*reps);
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
            {
                option:()=>output.push(4),
                weight:4
            },
        ];

        for(let i=0;i<5000;i++) {
            output.push((rng.getWeightedElement(array))());
        }

        const one = output.filter(x=>x===1).reduce((x)=>x+1);
        const two = output.filter(x=>x===2).reduce((x)=>x+1);
        const three = output.filter(x=>x===3).reduce((x)=>x+1);
        const four = output.filter(x=>x===4).reduce((x)=>x+1);

        // RNG is hard to test. Using ranges to be "good enough".
        expect(four/one).toBeGreaterThan(3);
        expect(four/one).toBeLessThan(5);

        expect(three/one).toBeGreaterThan(2);
        expect(three/one).toBeLessThan(4);

        expect(two/one).toBeGreaterThan(1);
        expect(two/one).toBeLessThan(3);
    });

    test("Random elements from weighted array, non-integer weights", ()=>{
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
            {
                option:()=>output.push(4),
                weight:5.2
            },
        ];

        for(let i=0;i<5000;i++) {
            output.push((rng.getWeightedElement(array))());
        }
        const one = output.filter(x=>x===1).reduce((x)=>x+1);
        const two = output.filter(x=>x===2).reduce((x)=>x+1);
        const three = output.filter(x=>x===3).reduce((x)=>x+1);
        const four = output.filter(x=>x===4).reduce((x)=>x+1);

        // RNG is hard to test. Using ranges to be "good enough".
        expect(four/one).toBeGreaterThan(3);
        expect(four/one).toBeLessThan(5);
        
        expect(three/one).toBeGreaterThan(2);
        expect(three/one).toBeLessThan(4);

        expect(two/one).toBeGreaterThan(1);
        expect(two/one).toBeLessThan(3);
    });
});
