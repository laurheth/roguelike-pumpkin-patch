import EventManager from './EventManager';

describe("Event manager tests.", ()=>{

    // An array, and some actors + an event to fill the array
    const output: Array<number> = [];
    const actor1 = {
        act:()=>{
            output.push(1);
        }
    };
    const actor2 = {
        act:()=>{
            output.push(2);
        }
    };
    const actor3 = {
        act:()=>{
            output.push(3);
        }
    };
    const randomEvent = ()=>{
        output.push(4);
    }
    const randomEvent2 = ()=>{
        output.push(5);
    }

    afterEach(()=>{
        // Clear the output array
        while(output.length>0) {
            output.pop();
        }
    });

    test('Simple event manager with 3 actors.', ()=>{
        const eventManager = new EventManager({type:'simple'});

        eventManager.add({actor:actor1});
        eventManager.add({actor:actor2});
        eventManager.add({actor:actor3});

        for(let i=0;i<9;i++) {
            eventManager.advance();
        }

        expect(eventManager.length).toBe(3);
        expect(output).toStrictEqual([1,2,3,1,2,3,1,2,3]);
    });

    test('Simple event manager with 3 actors, and a bonus event.', ()=>{
        const eventManager = new EventManager({type:'simple'});

        eventManager.add({actor:actor1});
        eventManager.add({actor:actor2});
        eventManager.add({callback:randomEvent, repeats:2});
        eventManager.add({actor:actor3});

        expect(eventManager.length).toBe(4);

        for(let i=0;i<14;i++) {
            eventManager.advance();
        }

        expect(eventManager.length).toBe(3);

        expect(output).toStrictEqual([1,2,4,3,1,2,4,3,1,2,3,1,2,3]);
    });

    test('Simple event manager with 3 actors, and two bonus events. Mixed addition methods.', ()=>{
        const eventManager = new EventManager({type:'simple'});

        eventManager.add({actor:actor1});
        eventManager.add(actor2);
        eventManager.add({callback:randomEvent, repeats:2});
        eventManager.add(actor3);
        eventManager.add(randomEvent2);

        expect(eventManager.length).toBe(5);

        for(let i=0;i<15;i++) {
            eventManager.advance();
        }

        expect(eventManager.length).toBe(3);

        expect(output).toStrictEqual([1,2,4,3,5,1,2,4,3,1,2,3,1,2,3]);
    });

    test('Test removing an actor from the event manager.', ()=>{
        const eventManager = new EventManager({type:'simple'});

        eventManager.add({actor:actor1});
        eventManager.add({actor:actor2});
        eventManager.add({actor:actor3});

        expect(eventManager.length).toBe(3);

        for(let i=0;i<9;i++) {
            eventManager.advance();
            if (i===2) {
                eventManager.remove(actor3);
                expect(eventManager.length).toBe(2);
            }
        }

        expect(eventManager.length).toBe(2);

        expect(output).toStrictEqual([1,2,3,1,2,1,2,1,2]);
    });

    test('Complex event manager, with three actors.', ()=>{
        const eventManager = new EventManager({type:'complex'});

        eventManager.add({actor:actor1, delay:1});
        eventManager.add({actor:actor2, delay:2});
        eventManager.add({actor:actor3, delay:3});

        for(let i=0;i<14;i++) {
            eventManager.advance();
        }
        expect(eventManager.length).toBe(3);
        expect(output).toStrictEqual([1,2,1,3,1,2,1,1,3,2,1,1,2,1]);
    });

    test('Complex event manager, with three actors, plus an event.', ()=>{
        const eventManager = new EventManager({type:'complex'});

        eventManager.add({actor:actor1, delay:1});
        eventManager.add({actor:actor2, delay:2});
        eventManager.add({actor:actor3, delay:3});
        eventManager.add({callback:randomEvent,delay:6});

        expect(eventManager.length).toBe(4);

        for(let i=0;i<14;i++) {
            eventManager.advance();
        }

        expect(eventManager.length).toBe(3);

        expect(output).toStrictEqual([1,2,1,3,1,2,1,1,4,3,2,1,1,2]);
    });
});