import { Display, EventManager, Random, PathFinder, FOV } from '../lib/index';

// First, select the target element you want the display to be within
const target = document.getElementById("displayExample");

// Paramaters object
const params = {
    // Required! The display must go somewhere
    target: target,
    // Width of the display in tiles
    width: 40,
    // Height of the display in tiles
    height: 30,
};

// Start the display!
const display = new Display(params);

// Set the tile size so that it fits its container
display.tileSize = display.calculateTileSize();

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

// You can define a seed if you would like; if not, the current time is used.
const optionalSeed = 546456732;

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
