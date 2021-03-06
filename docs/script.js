import { Display, EventManager, Random, PathFinder, FOV, WFC } from '../lib/index';

// First, select the target element you want the display to be within
const target = document.getElementById("displayExample");

// Paramaters object
const params = {
    // Required! The display must go somewhere
    target: target,
    // Width of the display in tiles
    width: 20,
    // Height of the display in tiles
    height: 15,
};

// Start the display!
const display = new Display(params);

// Set the tile size so that it fits its container
display.tileSize = display.calculateTileSize();

// One cool thing you can do is add a listener for window resizing
// Keep your display looking good!
window.addEventListener("resize",()=>{
    display.tileSize = display.calculateTileSize();
});

// Lets draw some stuff
for (let x=0; x < params.width; x++) {
    for (let y=0; y < params.height; y++) {
        // Draw some walls
        if (x===0 || y===0 || x===params.width-1 || y===params.height-1) {
            display.setTile(x,y,{
                // Content can be a string, or ANY html element! (including images!)
                content: '#',
                className: "brickWall"
            });

        // Add our player!
        } else if (x===3 && y===5) {
            display.setTile(x,y,{
                content: '@',
                // You can use as many classes as you would like!
                classList: ["player"]
            });
        // Some floor everywhere else
        } else {
            display.setTile(x,y,{
                content: '.',
                className: "coolFloor"
            });
        }
    }
}

// Hmm actually I want to change some of the tiles a bit. updateTile changes the
// parameters that you specify; setTile replaces everything.

for (let i=5; i < 10; i++) {
    display.updateTile(i,i,{className:"superAwesome"});
}

const randomStuff = ()=>{
    // You can define a seed if you would like; if not, the current time is used.
    const optionalSeed = Math.floor(Date.now());
    
    // Start the random number generator
    const random = new Random(optionalSeed);
    
    // If you want a random number from 0 <= x < 1:
    const x = random.getRandom();
    
    // If you would like a random number in the range of lower <= y <= upper you can use getNumber.
    const lower = 0;
    const upper = 10;
    const y = random.getNumber(lower,upper);
    
    // If the given bounds are integers, it will generate integers.
    // If not, it will generate decimals.
    // If you want to specify explicitly, use the integer boolean parameter.
    const noThanksNotInteger = random.getNumber(lower,upper,false);
    
    // If you want a random element from an array, use getRandomElement.
    const coolArray = [1, 2, 3, 4, 5, 6, 7];
    const randomElement = random.getRandomElement(coolArray);
    
    // If you want to provide weights for each value, you can use getWeightedElement.
    const weightedArray = [
        {
            weight: 10,
            option: "Cute dog"
        },
        {
            weight: 15,
            option: "Awesome cat"
        },
        {
            weight: 1,
            option: "Rare Franklin"
        }
    ];
    
    const randomWeightedElement = random.getWeightedElement(weightedArray);
    
    const resultsList = document.getElementById("randomResults");

    // Clear it out, then fill it up again
    while(resultsList.lastChild) {
        resultsList.removeChild(resultsList.lastChild);
    }
    
    const attachResult = function (name, result) {
        const li = document.createElement("li");
        const text = `${name} : ${result}`;
        li.appendChild(document.createTextNode(text));
        resultsList.appendChild(li);
    }
    
    attachResult("x", x.toString());
    attachResult("y", y.toString());
    attachResult("noThanksNotInteger", noThanksNotInteger.toString());
    attachResult("randomElement", randomElement.toString());
    attachResult("randomWeightedElement", randomWeightedElement.toString());
}

// Do it once on page load
randomStuff();

// Attach it to a button so the reader can push it
document.getElementById("randomButton").addEventListener("click",randomStuff);

// Colorful display, hooray
const colorTarget = document.querySelector(".colorDisplay");

// Initialize it
const colorDisplay = new Display({target:colorTarget, width: 10, height: 10});

// Draw some stuff
for(let i=0;i<10;i++) {
    for(let j=0;j<10;j++) {
        if (i===0 || j===0 || i===9 || j===9) {
            // Did you know you can use a shorthand here? Now you do!
            colorDisplay.setTile(i,j,'#');
        } else if (i===3 && j===3) {
            colorDisplay.setTile(i,j,'@');
        } else if (i===4 && j===5) {
            colorDisplay.setTile(i,j,{
                content: 'g',
                // You can use inline colors and backgrounds if
                // you REALLY want to, but I discourage it.
                color: 'green',
                background: 'rgba(128,0,0,0.2)',
            });
        } else {
            colorDisplay.setTile(i,j,'.');
        }
    }
}

// Make the display fit the container
colorDisplay.tileSize = colorDisplay.calculateTileSize();

// Center it on the player
colorDisplay.centerDisplay(3,3);

// Here's a cool map to live in
const map = [
    "####################",
    "#..................#",
    "#..#.....#....#....#",
    "#..#.....###...##..#",
    "#..#.....#.........#",
    "#.............####.#",
    "#........#....#....#",
    "####...###....#....#",
    "#........#....#....#",
    "####################",
];
const width = map[0].length;
const height = map.length;

// And lets start up a display to use
const fovDisplayParams = {
    target: document.getElementById("fovMap"),
    width: width,
    height: height,
};
const fovDisplay = new Display(fovDisplayParams);
fovDisplay.tileSize = fovDisplay.calculateTileSize();

// FOV takes a callback function that decides whether or not you can see something.
// It takes one parameter, which is a two element position array pos = [x,y]
// and returns true or false.
const canSee = (position) => {
    const x = position[0];
    const y = position[1];

    // Make sure it's even on the map
    if ( x<0 || x>=width || y<0 || y>=height) {
        return false;
    }
    const tile = map[y][x];

    // First, regardless of success or not, see this tile
    fovDisplay.setTile(x,y,tile);

    // Next, use whatever criteria we want to decide if it is seethrough or not.
    // In this case, if it's not a wall (or # character), we can see through it.
    return tile !== '#';
}

// It has an optional second parameter for distance. The default is 8.
const optionalRange = 20;

// Initialize the FOV object!
const fov = new FOV(canSee, optionalRange);

// Choose a position for the player to be
const playerPos = [5,5];

// Slightly hacky way to add the player; use a better data structure for your games!
const mapRow = map[playerPos[1]];
map[playerPos[1]] = mapRow.slice(0,playerPos[0]) + '@' + mapRow.slice(playerPos[0]+1);

// Now, LOOK!
fov.look(playerPos);

// First, some setup, so we can record our output
const simpleList = document.getElementById("simpleEventList");
const complexList = document.getElementById("complexEventList");


// Lets make a helper function to record our output
const showAction = (action, list) => {
    // Make a list item and add the action to it.
    const listItem = document.createElement("li")
    listItem.appendChild(document.createTextNode(action));
    // Attach it to the list, so we can see what happens.
    list.appendChild(listItem);
};

// There's two types of event managers you can make.
// Lets start with the simple one. Everyone takes turns, one after the other.
const simpleEvents = new EventManager({type:"simple"});

// Usually, we want to add some actors to the system.
// The system calls their "act" method.

const simpleGoblin = {
    act: ()=>showAction("The Goblin goblins!", simpleList)
}

const simpleCat = {
    act: ()=>showAction("The cat meows!", simpleList)
}

// Add them to the event manager
simpleEvents.add(simpleGoblin);
simpleEvents.add(simpleCat);

// You can also add callback functions on their own, as events or whatever your heart pleases.
// They can repeat forever...
simpleEvents.add({
    callback: ()=>showAction("Drip drip goes the faucet.", simpleList),
    repeats: true
})

// Repeat a few times
simpleEvents.add({
    callback: ()=>showAction("Rushing wind! Oh no!", simpleList),
    repeats: 2
})

// Or not repeat at all!
simpleEvents.add({
    callback: ()=>showAction("The house of cards falls over. Whoops!", simpleList)
});

// Then you just kick it off in your preferred manner.
// Each time you call advance, it will step forward one step.
// If act returns a promise (say, if you're waiting for player input)
// it will wait for that action to conclude.
for(let i=0;i<20;i++) {
    simpleEvents.advance();
}

// The second type of event manager is complex:
const complexEvents = new EventManager({type:"complex"});

// The complex event manager accepts different delays for different actors

const fastCat = {
    act:()=>showAction("Fast cat nyooms!", complexList)
}

const slowOgre = {
    act:()=>showAction("Slow ogre is sloooow", complexList)
}

// The delay property defines how slow an actor is
complexEvents.add({
    actor:fastCat,
    delay:1
});

complexEvents.add({
    actor:slowOgre,
    delay:5
});

// Or how long an event takes
complexEvents.add({
    callback:()=>showAction("The mail has just arrived. Sweet!", complexList),
    delay: 16
});

// Advance the clock...
for(let i=0;i<20;i++) {
    complexEvents.advance();
}

map[playerPos[1]] = mapRow.slice(0,playerPos[0]) + '.' + mapRow.slice(playerPos[0]+1);

// First, lets setup another display! I want to draw the path we find.
// And lets start up a display to use.
// We're going to use the same map from the FOV section.
const pathDisplayParams = {
    target: document.getElementById("pathDisplay"),
    width: width,
    height: height,
};
const pathDisplay = new Display(pathDisplayParams);
pathDisplay.tileSize = pathDisplay.calculateTileSize();

// Lets draw the map to start
map.forEach((row,y)=>row.split('').forEach((tile,x)=>{
    pathDisplay.setTile(x,y,tile);
}));

// Now, lets setup the pathfinder!
// The PathFinder takes a "canPass" callback to determine what is passable.
// This looks similar to the canSee callback from before, but it doesn't have to.
const pathfinder = new PathFinder({
    canPass:([x,y])=>{
        // Make sure it's even on the map
        if ( x<0 || x>=width || y<0 || y>=height) {
            return false;
        }
        const tile = map[y][x];

        // Next, use whatever criteria we want to decide if it is passable.
        // In this case, if it's not a wall (or # character), we can walk through it.
        return tile !== '#';
    }
});

// Let choose a starting position, and a target position!
const startPos = [1,8];
const endPos = [15,8];

// It can also take an optional "orthogonalOnly" parameter.
// This sets whether or not the pathfinder will use diagonals.
const optionalOrthogonalOnly = false;

// Now, lets find the path!
const path = pathfinder.findPath(startPos, endPos, optionalOrthogonalOnly);

// Draw it onto the map to take a look at it.
path.forEach(([x,y])=>{
    pathDisplay.updateTile(x,y,{
        content:'X',
        className: "pathMarker"
    })
});

// Note that the drawn path doesn't include the starting position.
// This is so you can just grab path[0] to get the first step in your journey.
// Lets draw on the player, too, for illustration.
pathDisplay.updateTile(startPos[0], startPos[1], '@');

window.addEventListener("resize",()=>{
    colorDisplay.tileSize = colorDisplay.calculateTileSize();
    fovDisplay.tileSize = fovDisplay.calculateTileSize();
    pathDisplay.tileSize = pathDisplay.calculateTileSize();
});

// WFC display
const wfcDisplayParams = {
    target: document.getElementById("wfcDisplay"),
    width: 20,
    height: 20,
};
const wfcDisplay = new Display(wfcDisplayParams);
wfcDisplay.tileSize = wfcDisplay.calculateTileSize();

// The WFC generator takes an input "image", which it uses to figure out rules for the output.
const inputImage = [
    ".#..",
    ".#..",
    "####",
    ".#..",
];

const wfc = new WFC({input:inputImage,n:3,repeatInput:true});
wfc.generate({width:20,height:20,repeatOutput:true}).then(result=>{
    result.forEach((row,j)=>{
        row.forEach((col,i)=>{
            wfcDisplay.setTile(i,j,col);
        });
    });
});


const wfcDisplayParamsTwo = {
    target: document.getElementById("wfcDisplayTwo"),
    width: 20,
    height: 20,
};
const wfcDisplayTwo = new Display(wfcDisplayParamsTwo);
wfcDisplayTwo.tileSize = wfcDisplayTwo.calculateTileSize();

// The WFC generator takes an input "image", which it uses to figure out rules for the output.
const inputImageTwo = [
    "                 ",
    "             X   ",
    "    X#       #   ",
    "     #       #   ",
    "     #  X    #   ",
    "     #########   ",
    "     #     #     ",
    "     #     X     ",
    "     X           ",
    "                 ",
];

const wfcTwo = new WFC({input:inputImageTwo,n:3,repeatInput:true});
wfcTwo.generate({width:20,height:20,repeatOutput:true}).then(result=>{
    result.forEach((row,j)=>{
        row.forEach((col,i)=>{
            wfcDisplayTwo.setTile(i,j,col);
        });
    });
});

