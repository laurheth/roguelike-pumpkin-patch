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
});