/**
 * @jest-environment jsdom
 */

import Display from './Display';

describe("Test the display.",()=>{
    let target:HTMLDivElement;
    beforeEach(()=>{
        document.body.innerHTML = `
            <div id="target" style="width:500px;height:500px;"></div>
        `;
        target = document.querySelector("div#target");
    });

    test("Small, simple display.",()=>{
        const display = new Display({target:target, width:10, height:10});

        for(let i=0;i<10;i++) {
            for(let j=0;j<10;j++) {
                if (i===0 || j===0 || j===9 || i===9) {
                    display.setTile(i,j,'#');
                } else if (i===5 && j===5) {
                    display.setTile(i,j,{content:'@',classList:["player","critter"]});
                } else if (i===7 && j===8) {
                    const gobbo = document.createElement('div');
                    gobbo.appendChild(document.createTextNode('g'));
                    gobbo.style.color = "green";
                    display.setTile(i,j,gobbo);
                    display.updateTile(i,j,{className:"critter"});
                } else {
                    display.setTile(i,j,'.');
                }
            }
        }

        display.centerDisplay(1,1);

        expect(document.head).toMatchSnapshot();
        expect(document.body).toMatchSnapshot();
    });

    test("Rainbow display test.", ()=>{
        const display = new Display({target:target, width:20, height:20});

        for(let i=0;i<20;i++) {
            for (let j=0;j<20;j++) {
                const color = `rgb(${12 * i},0,${12*j})`;
                display.setTile(i,j,{content:'.',background:color});
                display.updateTile(i,j,{classList:["asdf","fdsa"]});
            }
        }

        expect(document.body).toMatchSnapshot();
    });

    test("Test resize calculators.", ()=>{
        const display = new Display({target:target, width:10, height:10});

        // Fake DOMRect for testing
        const modelRect:DOMRect = {
            right: 1000,
            left: 0,
            top: 500,
            bottom: 0,
            height: 500,
            width: 1000,
            x: 0,
            y: 0,
            toJSON: ()=>{}
        };

        display.tileSize = display.calculateTileSize(modelRect);
        expect(display.tileSize.tileHeight).toBe(50);
        expect(display.tileSize.tileWidth).toBe(50);

        display.tileSize = {tileHeight:10, tileWidth:10};
        display.dimensions = display.calculateDimensions(modelRect);
        expect(display.dimensions.width).toBe(100);
        expect(display.dimensions.height).toBe(50);
    });
});