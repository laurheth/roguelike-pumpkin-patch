/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./docs/script.js":
/*!************************!*\
  !*** ./docs/script.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/index */ "./lib/index.js");


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
const display = new _lib_index__WEBPACK_IMPORTED_MODULE_0__.Display(params);

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
    const random = new _lib_index__WEBPACK_IMPORTED_MODULE_0__.Random(optionalSeed);
    
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
const colorDisplay = new _lib_index__WEBPACK_IMPORTED_MODULE_0__.Display({target:colorTarget, width: 10, height: 10});

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
const fovDisplay = new _lib_index__WEBPACK_IMPORTED_MODULE_0__.Display(fovDisplayParams);
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
const fov = new _lib_index__WEBPACK_IMPORTED_MODULE_0__.FOV(canSee, optionalRange);

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
const simpleEvents = new _lib_index__WEBPACK_IMPORTED_MODULE_0__.EventManager({type:"simple"});

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
const complexEvents = new _lib_index__WEBPACK_IMPORTED_MODULE_0__.EventManager({type:"complex"});

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
const pathDisplay = new _lib_index__WEBPACK_IMPORTED_MODULE_0__.Display(pathDisplayParams);
pathDisplay.tileSize = pathDisplay.calculateTileSize();

// Lets draw the map to start
map.forEach((row,y)=>row.split('').forEach((tile,x)=>{
    pathDisplay.setTile(x,y,tile);
}));

// Now, lets setup the pathfinder!
// The PathFinder takes a "canPass" callback to determine what is passable.
// This looks similar to the canSee callback from before, but it doesn't have to.
const pathfinder = new _lib_index__WEBPACK_IMPORTED_MODULE_0__.PathFinder({
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
const wfcDisplay = new _lib_index__WEBPACK_IMPORTED_MODULE_0__.Display(wfcDisplayParams);
wfcDisplay.tileSize = wfcDisplay.calculateTileSize();

// The WFC generator takes an input "image", which it uses to figure out rules for the output.
const inputImage = [
    ".#..",
    ".#..",
    "####",
    ".#..",
];

const wfc = new _lib_index__WEBPACK_IMPORTED_MODULE_0__.WFC({input:inputImage,n:3,repeatInput:true});
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
const wfcDisplayTwo = new _lib_index__WEBPACK_IMPORTED_MODULE_0__.Display(wfcDisplayParamsTwo);
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

const wfcTwo = new _lib_index__WEBPACK_IMPORTED_MODULE_0__.WFC({input:inputImageTwo,n:3,repeatInput:true,includeMirrors:true,includeRotations:true});
wfcTwo.generate({width:20,height:20,repeatOutput:true}).then(result=>{
    result.forEach((row,j)=>{
        row.forEach((col,i)=>{
            wfcDisplayTwo.setTile(i,j,col);
        });
    });
});



/***/ }),

/***/ "./lib/display/Display.js":
/*!********************************!*\
  !*** ./lib/display/Display.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile.js */ "./lib/display/Tile.js");
/* harmony import */ var _DisplayStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DisplayStyle.js */ "./lib/display/DisplayStyle.js");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};


/** Display class, to create and control a display */
var Display = /** @class */ (function () {
    /** Create a new Display
     *  @param {DisplayParams} parameters - Object of parameters to initialize the display.
     */
    function Display(parameters) {
        var target = parameters.target, _a = parameters.width, width = _a === void 0 ? 1 : _a, _b = parameters.height, height = _b === void 0 ? 1 : _b, tileWidth = parameters.tileWidth, tileHeight = parameters.tileHeight, rest = __rest(parameters, ["target", "width", "height", "tileWidth", "tileHeight"]);
        // Set the target
        this.target = target;
        if (this.target.className) {
            this.target.classList.add("pumpkin-container");
        }
        else {
            this.target.className = "pumpkin-container";
        }
        // Create the element for the display
        this.element = document.createElement('div');
        this.element.className = "pumpkin-display";
        this.element.setAttribute("aria-hidden", "true");
        // Set the display dimensions
        this.dimensions = { width: width, height: height };
        this.tileSize = {
            tileWidth: (tileWidth) ? tileWidth : 16,
            tileHeight: (tileHeight) ? tileHeight : (tileWidth) ? tileWidth : 16
        };
        // Add style to the page for the display
        this.applyDefaultStyles();
        // Append to the container element
        this.target.appendChild(this.element);
    }
    ;
    Object.defineProperty(Display.prototype, "tileSize", {
        /** Tile size */
        get: function () {
            return this._tileSize;
        },
        set: function (newTileSize) {
            var _a;
            this._tileSize = newTileSize;
            this.element.style.fontSize = newTileSize.tileHeight + "px";
            (_a = this.tiles) === null || _a === void 0 ? void 0 : _a.forEach(function (tile) {
                tile.tileWidth = newTileSize.tileWidth;
                tile.tileHeight = newTileSize.tileHeight;
                tile.position = tile.position;
            });
            this.resetSize();
        },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Display.prototype, "dimensions", {
        /** Get or set the display dimensions */
        get: function () {
            return { width: this._width, height: this._height };
        },
        set: function (newDimensions) {
            if (newDimensions.width !== this._width && newDimensions.height !== this._height) {
                this._width = newDimensions.width;
                this._height = newDimensions.height;
                // Reset the display to accomodate the new size
                this.allocateDisplay();
                this.resetSize();
                this.moveToCenter();
            }
        },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    /** Reset display element size */
    Display.prototype.resetSize = function () {
        if (this._width && this._height && this.tileSize) {
            this.element.style.width = this._width * this.tileSize.tileWidth + "px";
            this.element.style.height = this._height * this.tileSize.tileHeight + "px";
        }
    };
    /** Position to center the display view on */
    Display.prototype.centerDisplay = function (x, y) {
        if (typeof x === "undefined" || typeof y === "undefined") {
            this.centerPosition = undefined;
        }
        else {
            this.centerPosition = {
                x: x,
                y: y
            };
        }
        this.moveToCenter();
    };
    Display.prototype.moveToCenter = function () {
        if (this.centerPosition) {
            var xPercent = (this.centerPosition.x + 0.5) / this.dimensions.width;
            var yPercent = (this.centerPosition.y + 0.5) / this.dimensions.height;
            this.element.style.transform = "translate(" + -xPercent * 100 + "%," + -yPercent * 100 + "%)";
        }
        else {
            this.element.style.transform = "";
        }
    };
    /** Build the array of tiles and attach them to the display */
    Display.prototype.allocateDisplay = function () {
        var _this = this;
        // Start a fresh tiles array
        if (this.tiles) {
            // Empty display if it has contents already
            this.tiles.forEach(function (tile) {
                _this.element.removeChild(tile.element);
            });
        }
        this.tiles = [];
        // Generate tiles
        for (var y = 0; y < this._height; y++) {
            for (var x = 0; x < this._width; x++) {
                // Make a new tile
                var newTile = new _Tile_js__WEBPACK_IMPORTED_MODULE_0__.default({
                    content: '',
                }, { x: x, y: y }, this.tileSize);
                // Add it to the list of tiles
                this.tiles.push(newTile);
                // Append to the actual display
                this.element.appendChild(newTile.element);
            }
        }
    };
    ;
    /** Get the display tile at the specified position
     * @param {number} x - Position from the left side of the display
     * @param {number} y - Position from the top of the display
    */
    Display.prototype.getTile = function (x, y) {
        if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
            var index = x + y * this._width;
            return this.tiles[index];
        }
        else {
            return undefined;
        }
    };
    ;
    /** Take input and format into TileOptions */
    Display.prototype.formatTileOptions = function (input) {
        if (typeof input === "string") {
            return { content: input };
        }
        else if (input instanceof HTMLElement) {
            return { content: input };
        }
        else {
            return input;
        }
    };
    /** Set details for the specified tile */
    Display.prototype.setTile = function (x, y, newOptions) {
        var tile = this.getTile(x, y);
        if (tile) {
            tile.setOptions(this.formatTileOptions(newOptions));
        }
    };
    ;
    /** Update details for the specified tile, preserving every unset property. */
    Display.prototype.updateTile = function (x, y, newOptions) {
        var tile = this.getTile(x, y);
        if (tile) {
            tile.updateOptions(this.formatTileOptions(newOptions));
        }
    };
    ;
    /** Given the size of the target container, and the tile size, determine the number of tiles needed. */
    Display.prototype.calculateDimensions = function (clientRect) {
        if (clientRect === void 0) { clientRect = this.target.getBoundingClientRect(); }
        var clientWidth = Math.abs(clientRect.right - clientRect.left);
        var clientHeight = Math.abs(clientRect.bottom - clientRect.top);
        // Round down; we do not want partial tiles
        return {
            width: Math.floor(clientWidth / this.tileSize.tileWidth),
            height: Math.floor(clientHeight / this.tileSize.tileHeight)
        };
    };
    ;
    /** Given the size of the target container, and the number of tiles, determine the tile size needed
     *  This assumes square tiles are desired.
    */
    Display.prototype.calculateTileSize = function (clientRect) {
        if (clientRect === void 0) { clientRect = this.target.getBoundingClientRect(); }
        var clientWidth = Math.abs(clientRect.right - clientRect.left);
        var clientHeight = Math.abs(clientRect.bottom - clientRect.top);
        // This could potentially give absurd results, so get the "naive first-guess" here
        var size = {
            tileWidth: clientWidth / this.dimensions.width,
            tileHeight: clientHeight / this.dimensions.height
        };
        // Choose the lowest of the two. This is the maximum square tile size that will fit the given dimensions
        var maxTileSize = Math.min(size.tileWidth, size.tileHeight);
        // Don't bother rounding; fonts can be precise numbers
        return {
            tileWidth: maxTileSize,
            tileHeight: maxTileSize
        };
    };
    ;
    /** Add the default styles to the head of the page. */
    Display.prototype.applyDefaultStyles = function () {
        var stylesId = "pumpkin-default-styles";
        // Check to make sure the styles aren't already present
        if (!document.getElementById(stylesId)) {
            // Create the style element
            var styles = document.createElement("style");
            styles.id = stylesId;
            styles.type = "text/css";
            styles.appendChild(document.createTextNode(_DisplayStyle_js__WEBPACK_IMPORTED_MODULE_1__.default));
            // Get the head of the page
            var head = document.head;
            // Find the first style or link element, and insert in front of it
            var firstStyle = document.querySelector("style, link");
            head.insertBefore(styles, firstStyle);
        }
    };
    return Display;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Display);
;
//# sourceMappingURL=Display.js.map

/***/ }),

/***/ "./lib/display/DisplayStyle.js":
/*!*************************************!*\
  !*** ./lib/display/DisplayStyle.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Default styling for the display. This gets inserted into the document head, before other stylesheets (so that you can override them if desired!)
var css = "\n.pumpkin-container {\n    position: relative;\n    overflow: hidden;\n    background-color: #000000;\n    color: #ffffff;\n}\n\n.pumpkin-display {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n}\n\n.pumpkin-tile {\n    position: absolute;\n}\n\n.pumpkin-tile > * {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    z-index: 10;\n}\n";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (css);
//# sourceMappingURL=DisplayStyle.js.map

/***/ }),

/***/ "./lib/display/Tile.js":
/*!*****************************!*\
  !*** ./lib/display/Tile.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var baseClassName = "pumpkin-tile";
/** Class to keep track of each individual tile in the display */
var Tile = /** @class */ (function () {
    function Tile(tileOptions, position, tileSize) {
        // Create necessary elements and apply classes
        this.element = document.createElement('div');
        this.element.classList.add(baseClassName);
        // Set tile content and colour scheme
        var _a = tileOptions.content, content = _a === void 0 ? '' : _a, _b = tileOptions.color, color = _b === void 0 ? '' : _b, _c = tileOptions.background, background = _c === void 0 ? '' : _c, _d = tileOptions.className, className = _d === void 0 ? '' : _d, _e = tileOptions.classList, classList = _e === void 0 ? [] : _e, rest = __rest(tileOptions, ["content", "color", "background", "className", "classList"]);
        this.content = content;
        this.color = color;
        this.background = background;
        if (classList.length > 0) {
            this.classList = classList;
        }
        else {
            this.className = className;
        }
        // Set the tile size
        this.tileWidth = (tileSize === null || tileSize === void 0 ? void 0 : tileSize.tileWidth) ? tileSize.tileWidth : 16;
        this.tileHeight = (tileSize === null || tileSize === void 0 ? void 0 : tileSize.tileHeight) ? tileSize.tileHeight : this.tileWidth;
        // Set the tile position
        this.position = position;
    }
    ;
    Object.defineProperty(Tile.prototype, "content", {
        /** Get or set the tile contents */
        get: function () {
            return this._content;
        },
        set: function (newContent) {
            // Create contentElement if it doesn't already exist
            this.confirmContentElement();
            // Only update if the new and old content don't match
            if (this._content !== newContent) {
                // If content is a string, just add it
                if (typeof newContent === 'string') {
                    this.contentElement.innerHTML = newContent;
                }
                // If it is an element, empty the tile and append the new content
                else {
                    while (this.contentElement.lastElementChild) {
                        this.contentElement.removeChild(this.contentElement.lastElementChild);
                    }
                    this.contentElement.appendChild(newContent);
                }
                this._content = newContent;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "background", {
        /** Get or set the background colour */
        get: function () {
            return this._background;
        },
        set: function (newBackground) {
            if (newBackground !== this._background) {
                this._background = newBackground;
                this.element.style.backgroundColor = newBackground;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "color", {
        /** Get or set the color colour */
        get: function () {
            return this._color;
        },
        set: function (newcolor) {
            if (newcolor !== this._color) {
                this._color = newcolor;
                this.element.style.color = newcolor;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "position", {
        /** Get or set position */
        get: function () {
            return this._position;
        },
        set: function (position) {
            this._position = __assign({}, position);
            this.element.style.left = position.x * this.tileWidth + "px";
            this.element.style.top = position.y * this.tileHeight + "px";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "tileWidth", {
        /** Get or set tile width */
        get: function () {
            return this._tileWidth;
        },
        set: function (newWidth) {
            this._tileWidth = newWidth;
            this.element.style.width = newWidth + "px";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "tileHeight", {
        /** Get or set the tile height */
        get: function () {
            return this._tileHeight;
        },
        set: function (newHeight) {
            this._tileHeight = newHeight;
            this.element.style.height = newHeight + "px";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "className", {
        /** Get or set the classname */
        get: function () {
            return this.classList.join(" ");
        },
        set: function (newClass) {
            if (newClass) {
                this.classList = newClass.split(" ");
            }
            else {
                this.classList = [];
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "classList", {
        /** Get or set the list of classes */
        get: function () {
            return __spreadArrays([baseClassName], this._classList);
        },
        set: function (newClassList) {
            var _a, _b;
            var _this = this;
            if (!this._classList) {
                this._classList = [];
            }
            // Only add/remove classes if the two lists are actually different
            // This is ugly, but changing the DOM is more expensive than this is.
            if (newClassList.length !== this._classList.length ||
                !newClassList.every(function (name) { return _this._classList.includes(name); }) ||
                !this._classList.every(function (name) { return newClassList.includes(name); })) {
                if (this._classList.length > 0) {
                    (_a = this.element.classList).remove.apply(_a, this._classList);
                }
                this._classList = newClassList.filter(function (x) { return x.trim() && x !== baseClassName; });
                if (newClassList.length > 0) {
                    // Set using the getter, to ensure baseClassName is still on the list.
                    (_b = this.element.classList).add.apply(_b, this.classList);
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    /** Set options for the tile */
    Tile.prototype.setOptions = function (newOptions) {
        var _a = newOptions.content, content = _a === void 0 ? "" : _a, _b = newOptions.background, background = _b === void 0 ? "" : _b, _c = newOptions.color, color = _c === void 0 ? "" : _c, _d = newOptions.className, className = _d === void 0 ? "" : _d, classList = newOptions.classList;
        this.content = content;
        this.background = background;
        this.color = color;
        if (classList) {
            this.classList = classList;
        }
        else {
            this.className = className;
        }
    };
    /**
     * Update options for the tile
     */
    Tile.prototype.updateOptions = function (newOptions) {
        var content = newOptions.content, background = newOptions.background, color = newOptions.color, className = newOptions.className, classList = newOptions.classList;
        if (typeof content !== "undefined") {
            this.content = content;
        }
        if (typeof background !== "undefined") {
            this.background = background;
        }
        if (typeof color !== "undefined") {
            this.color = color;
        }
        if (classList && classList.length > 0) {
            this.classList = classList;
        }
        else if (typeof className !== "undefined") {
            this.className = className;
        }
    };
    /** Check if a contentElement exists, and if it doesn't, add it */
    Tile.prototype.confirmContentElement = function () {
        if (!this.contentElement) {
            this.contentElement = document.createElement('div');
            this.element.appendChild(this.contentElement);
        }
    };
    return Tile;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tile);
//# sourceMappingURL=Tile.js.map

/***/ }),

/***/ "./lib/event/EventManager.js":
/*!***********************************!*\
  !*** ./lib/event/EventManager.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/** Event manager, to keep track of turns */
var EventManager = /** @class */ (function () {
    function EventManager(parameters) {
        if (!parameters) {
            parameters = {};
        }
        ;
        var _a = parameters.type, type = _a === void 0 ? "simple" : _a;
        this.type = type;
        this.queue = [];
        this.time = 0;
    }
    ;
    /** Add an event to the queue */
    EventManager.prototype.add = function (addedEvent) {
        var event = {};
        // Determine type of the input, and handle accordingly
        if (addedEvent instanceof Function) {
            event.callback = addedEvent;
        }
        else if ("act" in addedEvent) {
            event.actor = addedEvent;
        }
        else {
            Object.assign(event, addedEvent);
        }
        // Assume repeating if an actor was provided
        if (typeof event.repeats === "undefined" && event.actor) {
            event.repeats = true;
        }
        // Complex event queue uses delay time a bit better
        if (this.type === "complex") {
            if (!event.delay) {
                event.delay = 1;
            }
            var scheduleFor = event.delay + this.time;
            // Insert the event at the appropriate time
            if (this.queue.length === 0 || this.queue[this.queue.length - 1].time <= scheduleFor) {
                this.queue.push({
                    event: event,
                    time: scheduleFor
                });
            }
            else {
                for (var i = 0; i < this.queue.length; i++) {
                    if (scheduleFor < this.queue[i].time) {
                        this.queue.splice(i, 0, {
                            event: event,
                            time: scheduleFor
                        });
                        break;
                    }
                }
            }
        }
        else {
            // Simple, no weird time shit
            this.queue.push({
                event: event,
                time: 0
            });
        }
    };
    /** Run the next event */
    EventManager.prototype.advance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var thisEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Confirm if there is anything in the queue
                        if (this.queue.length === 0) {
                            throw new Error("Event queue is empty.");
                        }
                        thisEvent = this.queue.shift();
                        // Update the time
                        this.time = thisEvent.time;
                        // If repeats is a number, reduce it.
                        if (typeof thisEvent.event.repeats === "number") {
                            thisEvent.event.repeats--;
                        }
                        // Check if it needs to repeat
                        if (thisEvent.event.repeats) {
                            // re-add to the queue
                            this.add(thisEvent.event);
                        }
                        if (!thisEvent.event.callback) return [3 /*break*/, 2];
                        return [4 /*yield*/, thisEvent.event.callback()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!thisEvent.event.actor) return [3 /*break*/, 4];
                        return [4 /*yield*/, thisEvent.event.actor.act()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** Remove actor from the event queue */
    EventManager.prototype.remove = function (actor) {
        var _this = this;
        var matches = [];
        this.queue.forEach(function (event, index) {
            if (event.event.actor === actor) {
                matches.push(index);
            }
        });
        // Reverse matches (work from the end first)
        matches.reverse();
        // Remove each match
        matches.forEach(function (match) {
            _this.queue.splice(match, 1);
        });
    };
    Object.defineProperty(EventManager.prototype, "length", {
        /** Determine the number of queued events in the queue. */
        get: function () {
            return this.queue.length;
        },
        enumerable: false,
        configurable: true
    });
    return EventManager;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventManager);
//# sourceMappingURL=EventManager.js.map

/***/ }),

/***/ "./lib/fov/FOV.js":
/*!************************!*\
  !*** ./lib/fov/FOV.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Field of view */
var FOV = /** @class */ (function () {
    /** Accepts a callback function to determine if a location is seethrough */
    function FOV(canSee, range) {
        this.canSee = canSee;
        this.range = range ? range : 8;
    }
    ;
    /** Do the FOV calculation */
    FOV.prototype.look = function (position, lookRangeOverride) {
        var range = (lookRangeOverride) ? lookRangeOverride : this.range;
        // See the starting location (hooray! Great start)
        this.canSee(position);
        // const lookTiles:Array<Tile> = [];
        var shadows = [];
        var newShadows = [];
        // From nearby to far away
        var i = 0;
        var j = 0;
        for (var distance = 1; distance <= range; distance++) {
            // Get square shell around position
            for (var side = 0; side < 4; side++) {
                for (var edge = -distance; edge <= distance; edge++) {
                    if (side === 0) {
                        i = edge;
                        j = distance;
                    }
                    else if (side === 1) {
                        j = edge;
                        i = distance;
                    }
                    else if (side === 2) {
                        i = edge;
                        j = -distance;
                    }
                    else {
                        j = edge;
                        i = -distance;
                    }
                    var lookPos = [position[0] + i, position[1] + j];
                    var dist = this.distance(position, lookPos);
                    // Out of range? Skip.
                    if (dist > range) {
                        continue;
                    }
                    // In shadows? Skip.
                    var angleTo = this.angleTo(position, lookPos);
                    var angularSize = this.angularSize(position, lookPos) / 2;
                    var inShadows = false;
                    if (this.isInShadows(angleTo, shadows) &&
                        this.isInShadows(angleTo + angularSize, shadows) &&
                        this.isInShadows(angleTo - angularSize, shadows)) {
                        inShadows = true;
                    }
                    // Now, test if we can see through the tile
                    if (inShadows || !this.canSee(lookPos)) {
                        // Square is opaque! Add its shadow
                        newShadows.push({
                            startAngle: angleTo - angularSize,
                            endAngle: angleTo + angularSize
                        });
                    }
                }
            }
            // Add newShadows to shadows
            while (newShadows.length > 0) {
                // shadows.push(newShadows.pop());
                this.combineShadow(shadows, newShadows.pop());
            }
            // Check if we should call it quits
            if (shadows.length === 1 && shadows[0].endAngle - shadows[0].startAngle >= 360) {
                return;
            }
        }
    };
    ;
    /** Get angle a tile resides in
     * This ranges from -180 to 180, so be careful
    */
    FOV.prototype.angleTo = function (startPosition, endPosition) {
        var y = endPosition[1] - startPosition[1];
        var x = endPosition[0] - startPosition[0];
        var angle = 180 * Math.atan2(y, x) / Math.PI;
        return (angle >= 0) ? angle : angle + 360;
    };
    ;
    /** Get angular size of a square */
    FOV.prototype.angularSize = function (startPosition, endPosition) {
        var distance = this.distance(startPosition, endPosition);
        return 360 * Math.atan(1 / (2 * distance)) / Math.PI;
    };
    ;
    /** Get distance */
    FOV.prototype.distance = function (startPosition, endPosition) {
        return Math.sqrt(Math.pow((endPosition[1] - startPosition[1]), 2) + Math.pow((endPosition[0] - startPosition[0]), 2));
    };
    /** Check if in shadows */
    FOV.prototype.isInShadows = function (angle, shadows) {
        var negAngle = angle - 360;
        for (var _i = 0, shadows_1 = shadows; _i < shadows_1.length; _i++) {
            var shadow = shadows_1[_i];
            if ((angle <= shadow.endAngle && angle >= shadow.startAngle) || (negAngle <= shadow.endAngle && negAngle >= shadow.startAngle)) {
                return true;
            }
        }
        return false;
    };
    /** Add a shadow to the shadow array */
    FOV.prototype.combineShadow = function (shadows, newShadow) {
        var overLapArr = [];
        for (var i = 0; i < shadows.length; i++) {
            var shadow = shadows[i];
            // Check if they overlap
            if (newShadow.startAngle < shadow.endAngle && newShadow.endAngle > shadow.startAngle) {
                newShadow.startAngle = Math.min(shadow.startAngle, newShadow.startAngle);
                newShadow.endAngle = Math.max(shadow.endAngle, newShadow.endAngle);
                overLapArr.push(i);
            }
        }
        if (overLapArr.length > 0) {
            var mainShadow = shadows[overLapArr.shift()];
            mainShadow.startAngle = newShadow.startAngle;
            mainShadow.endAngle = newShadow.endAngle;
            for (var i = overLapArr.length - 1; i >= 0; i--) {
                shadows.splice(overLapArr[i], 1);
            }
        }
        else {
            shadows.push(newShadow);
        }
    };
    return FOV;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FOV);
//# sourceMappingURL=FOV.js.map

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Display": () => (/* reexport safe */ _display_Display_js__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "EventManager": () => (/* reexport safe */ _event_EventManager_js__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "Random": () => (/* reexport safe */ _random_Random_js__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "PathFinder": () => (/* reexport safe */ _pathfinder_PathFinder_js__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "FOV": () => (/* reexport safe */ _fov_FOV_js__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "WFC": () => (/* reexport safe */ _wfc_WFC_js__WEBPACK_IMPORTED_MODULE_5__.default)
/* harmony export */ });
/* harmony import */ var _display_Display_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display/Display.js */ "./lib/display/Display.js");
/* harmony import */ var _event_EventManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event/EventManager.js */ "./lib/event/EventManager.js");
/* harmony import */ var _random_Random_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./random/Random.js */ "./lib/random/Random.js");
/* harmony import */ var _pathfinder_PathFinder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pathfinder/PathFinder.js */ "./lib/pathfinder/PathFinder.js");
/* harmony import */ var _fov_FOV_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fov/FOV.js */ "./lib/fov/FOV.js");
/* harmony import */ var _wfc_WFC_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./wfc/WFC.js */ "./lib/wfc/WFC.js");






//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./lib/pathfinder/PathFinder.js":
/*!**************************************!*\
  !*** ./lib/pathfinder/PathFinder.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/** Pathfinder to determine how to travel from one point to another */
var PathFinder = /** @class */ (function () {
    function PathFinder(parameters) {
        var canPass = parameters.canPass, metric = parameters.metric, maxIterations = parameters.maxIterations, weight = parameters.weight, rest = __rest(parameters, ["canPass", "metric", "maxIterations", "weight"]);
        this.canPass = canPass;
        if (!metric) {
            // Default metric is Manhattan metric, if none provided
            metric = function (position1, position2) {
                return Math.abs(position2[1] - position1[1]) + Math.abs(position2[0] - position1[0]);
            };
        }
        if (!weight) {
            // Default to everything being length of 1
            weight = function (position) { return 1; };
        }
        this.maxIterations = maxIterations;
        this.metric = metric;
        this.weight = weight;
    }
    /** Find route from startPosition to endPosition, via A* */
    PathFinder.prototype.findPath = function (startPosition, endPosition, orthogonalOnly) {
        var _this = this;
        if (orthogonalOnly === void 0) { orthogonalOnly = false; }
        var route = [];
        // Limit the loop so it doesn't break things
        var maxIterations = (this.maxIterations) ? this.maxIterations : 40 * this.metric(startPosition, endPosition);
        var iterations = 0;
        // Initialize the list, and add the start to it
        var closedList = [
            {
                position: __spreadArrays(startPosition),
                steps: 0,
                distanceFromGoal: this.metric(startPosition, endPosition),
                previousLocation: null
            }
        ];
        var openList = [];
        // Handle diagonals
        var stepSizeArr = [0, 1, 1.2];
        // Find a path
        while (iterations < maxIterations &&
            !this.contains(closedList, endPosition)) {
            iterations++;
            // Expand the open list
            closedList.forEach(function (location) {
                for (var i = -1; i < 2; i++) {
                    for (var j = -1; j < 2; j++) {
                        if (orthogonalOnly && i !== 0 && j !== 0) {
                            continue;
                        }
                        var newPosition = [location.position[0] + i, location.position[1] + j];
                        // Determine the cost / size of step into the square
                        var stepSize = stepSizeArr[Math.abs(i) + Math.abs(j)] * _this.weight(newPosition);
                        if (!_this.canPass(newPosition)) {
                            continue;
                        }
                        var inClosedListAlready = _this.getLocation(closedList, newPosition);
                        var inOpenListAlready = _this.getLocation(openList, newPosition);
                        // New position is in neither list
                        if (!inClosedListAlready && !inOpenListAlready) {
                            openList.push({
                                position: newPosition,
                                steps: location.steps + stepSize,
                                distanceFromGoal: _this.metric(newPosition, endPosition),
                                previousLocation: location
                            });
                        }
                        else {
                            // if the position is already in the list, adjust to be whichever version is shorter
                            if (inClosedListAlready && inClosedListAlready.steps > location.steps + stepSize) {
                                inClosedListAlready.steps = location.steps + stepSize;
                                inClosedListAlready.previousLocation = location;
                            }
                            if (inOpenListAlready && inOpenListAlready.steps > location.steps + stepSize) {
                                inOpenListAlready.steps = location.steps + stepSize;
                                inOpenListAlready.previousLocation = location;
                            }
                        }
                    }
                }
            });
            // Sort the open list (highest --> lowest)
            openList.sort(function (a, b) { return (b.steps + b.distanceFromGoal) - (a.steps + a.distanceFromGoal); });
            // Pop off the lowest openList item and add it to the closed list
            closedList.push(openList.pop());
        }
        // Found a route! Put the pieces together by working backwards
        var location = this.getLocation(closedList, endPosition);
        if (this.contains(closedList, endPosition)) {
            iterations = 0;
            while ((location.position[0] !== startPosition[0] || location.position[1] !== startPosition[1]) && iterations < maxIterations) {
                iterations++;
                route.push(location.position);
                location = location.previousLocation;
            }
        }
        return route.reverse();
    };
    PathFinder.prototype.isEqual = function (position1, position2) {
        return (position1.position[0] === position2.position[0] && position1.position[1] === position2.position[1]);
    };
    PathFinder.prototype.contains = function (locationList, testLocation) {
        var _this = this;
        if (Array.isArray(testLocation)) {
            return locationList.some(function (location) {
                return (location.position[0] === testLocation[0] && location.position[1] === testLocation[1]);
            });
        }
        else {
            return locationList.some(function (location) {
                return _this.isEqual(location, testLocation);
            });
        }
    };
    PathFinder.prototype.getLocation = function (locationList, testPosition) {
        for (var _i = 0, locationList_1 = locationList; _i < locationList_1.length; _i++) {
            var location_1 = locationList_1[_i];
            if (location_1.position[0] === testPosition[0] && location_1.position[1] === testPosition[1]) {
                return location_1;
            }
        }
        return undefined;
    };
    return PathFinder;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PathFinder);
//# sourceMappingURL=PathFinder.js.map

/***/ }),

/***/ "./lib/random/Random.js":
/*!******************************!*\
  !*** ./lib/random/Random.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Random": () => (/* binding */ Random),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Random generator */
var Random = /** @class */ (function () {
    function Random(seed, base) {
        if (!seed) {
            // Get seed from milliseconds since Jan 1st, 1970
            seed = Date.now();
        }
        this.seed = Math.floor(seed);
        this.weyl = 0;
        this.x = 0;
        this.base = (base) ? base : 100000;
        // Run it a couple of times, in case the seed isn't that good.
        for (var i = 0; i < 10; i++) {
            this.getRandom();
        }
    }
    ;
    /** Generate a random number from 0 <= number < 1 */
    // An attempt to reproduce something resembling the Middle Square Weyl Sequence PRNG
    // See Widynski (2017) https://arxiv.org/abs/1704.00358v5
    // The above algorithm uses unsigned ints. JS uses signed floats. Further testing required to see whether or not this is actually a problem.
    Random.prototype.getRandom = function () {
        this.x *= this.x;
        this.x += (this.weyl += this.seed);
        // Note, >>> makes the shift be unsigned. The >>> 0 at the end flips the "sign" bit to be positive, ensuring a non-negative result.
        this.x = ((this.x >>> 32) | (this.x << 32)) >>> 0;
        return (this.x % this.base) / this.base;
    };
    /** Get a random number in a range */
    Random.prototype.getNumber = function (min, max, integer) {
        if (typeof integer === "undefined") {
            if (Number.isInteger(min) && Number.isInteger(max)) {
                integer = true;
            }
        }
        if (integer) {
            return Math.floor(this.getRandom() * (max + 1 - min)) + Math.ceil(min);
        }
        else {
            return (this.getRandom() * (max - min)) + min;
        }
    };
    /** Get a random element from an array */
    Random.prototype.getRandomElement = function (array) {
        var randomIndex = this.getNumber(0, array.length - 1, true);
        return array[randomIndex];
    };
    /** Get a random element, with weights */
    Random.prototype.getWeightedElement = function (array) {
        var totalWeight = 0;
        var integer = true;
        array.forEach(function (element) {
            totalWeight += element.weight;
            integer = integer && Number.isInteger(element.weight);
        });
        var randomNumber = this.getNumber((integer) ? 1 : 0, totalWeight, integer);
        // Go through the array until we have a winner
        for (var i = 0; i < array.length; i++) {
            randomNumber -= array[i].weight;
            if (randomNumber <= 0) {
                // Found it!
                return array[i].option;
            }
        }
        // Not found; seems like a problem
        throw new Error("No match found.");
    };
    return Random;
}());

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Random);
//# sourceMappingURL=Random.js.map

/***/ }),

/***/ "./lib/wfc/WFC.js":
/*!************************!*\
  !*** ./lib/wfc/WFC.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WfcTile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WfcTile.js */ "./lib/wfc/WfcTile.js");
/* harmony import */ var _random_Random_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../random/Random.js */ "./lib/random/Random.js");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};


/**
 * Class that implements the Wave Function Collapse algorithm.
 */
var WFC = /** @class */ (function () {
    function WFC(params) {
        var _a;
        var input = params.input, _b = params.n, n = _b === void 0 ? 1 : _b, _c = params.m, m = _c === void 0 ? n : _c, _d = params.repeatInput, repeatInput = _d === void 0 ? false : _d, random = params.random, _e = params.includeMirrors, includeMirrors = _e === void 0 ? false : _e, _f = params.includeRotations, includeRotations = _f === void 0 ? false : _f, rest = __rest(params, ["input", "n", "m", "repeatInput", "random", "includeMirrors", "includeRotations"]);
        // Convert into a 2d array
        var inputImage = input.map(function (row) {
            if (typeof row === "string") {
                return row.split("");
            }
            else {
                return row;
            }
        });
        // Process the input image and store that data
        _a = this.processInput(inputImage, repeatInput, n, m, includeRotations, includeMirrors), this.rules = _a[0], this.frequencies = _a[1];
        this.n = n;
        this.m = m;
        if (!random) {
            this.random = new _random_Random_js__WEBPACK_IMPORTED_MODULE_1__.default();
        }
        else {
            this.random = random;
        }
    }
    /**
     * Method that processes the image to generate adjacency rules and tile frequencies.
     */
    WFC.prototype.processInput = function (input, repeatInput, n, m, rotations, mirrors) {
        // Get dimensions
        // Height is just the length of the array
        var height = input.length;
        var heightTiles = height - ((!repeatInput) ? (m - 1) : 0);
        // Width is the minimum length of a subarray; force it to be square.
        var width = Math.min.apply(Math, input.map(function (row) { return row.length; }));
        var widthTiles = width - ((!repeatInput) ? (n - 1) : 0);
        // Get all tiles in the input
        var rawTiles = [];
        for (var i = 0; i < widthTiles; i++) {
            for (var j = 0; j < heightTiles; j++) {
                var tileInput = [];
                for (var y = 0; y < m; y++) {
                    var row = [];
                    var yPos = (j + y) % height;
                    for (var x = 0; x < n; x++) {
                        var xPos = (x + i) % width;
                        row.push(input[yPos][xPos]);
                    }
                    tileInput.push(row);
                }
                var newTile = new _WfcTile_js__WEBPACK_IMPORTED_MODULE_0__.default(tileInput);
                rawTiles.push(newTile);
            }
        }
        // Add in rotations and mirrors, if requested.
        if (mirrors) {
            __spreadArrays(rawTiles).forEach(function (tile) {
                var verticalMirror = tile.contents.map(function (row) { return __spreadArrays(row); }).reverse();
                var horizontalMirror = tile.contents.map(function (row) { return __spreadArrays(row).reverse(); });
                rawTiles.push(new _WfcTile_js__WEBPACK_IMPORTED_MODULE_0__.default(verticalMirror));
                rawTiles.push(new _WfcTile_js__WEBPACK_IMPORTED_MODULE_0__.default(horizontalMirror));
            });
        }
        if (rotations) {
            __spreadArrays(rawTiles).forEach(function (tile) {
                var templateTile = tile.contents.map(function (row) { return __spreadArrays(row); });
                for (var i = 0; i < 3; i++) {
                    templateTile = templateTile[0].map(function (_, index) {
                        return templateTile.map(function (row) { return row[index]; });
                    });
                    rawTiles.push(new _WfcTile_js__WEBPACK_IMPORTED_MODULE_0__.default(templateTile.map(function (row) { return __spreadArrays(row); })));
                }
            });
        }
        // Filter down, to get rid of repeats
        var tiles = [];
        var frequencies = [];
        rawTiles.forEach(function (tile) {
            var index = tiles.findIndex(function (otherTile) { return otherTile.equals(tile); });
            if (index >= 0) {
                frequencies[index].weight++;
            }
            else {
                tiles.push(tile);
                frequencies.push({
                    option: tile,
                    weight: 1,
                });
            }
        });
        console.log(tiles);
        // Next, we need adjacency rules
        var rules = tiles.map(function (tile) {
            // Begin a new rule!
            var rule = {
                up: new Set(),
                down: new Set(),
                left: new Set(),
                right: new Set(),
            };
            // Check if the tile is compatible with every other tile, in the 4 directions
            tiles.forEach(function (otherTile, i) {
                if (tile.compatible(otherTile, -1, 0)) {
                    rule.right.add(i);
                }
                if (tile.compatible(otherTile, 1, 0)) {
                    rule.left.add(i);
                }
                if (tile.compatible(otherTile, 0, -1)) {
                    rule.down.add(i);
                }
                if (tile.compatible(otherTile, 0, 1)) {
                    rule.up.add(i);
                }
            });
            // Done, return the finished rule
            return rule;
        });
        return [rules, frequencies];
    };
    /**
     * Generate an output image.
     */
    WFC.prototype.generate = function (params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.generateSync(params, resolve, reject);
        });
    };
    /**
     * Generate an output image.
     */
    WFC.prototype.generateSync = function (params, resolve, reject) {
        var _this = this;
        var width = params.width, height = params.height, repeatOutput = params.repeatOutput, rest = __rest(params, ["width", "height", "repeatOutput"]);
        // Initialize with all tiles being possible
        var waveFunction = [];
        var entropyList = [];
        var doneList = [];
        for (var j = 0; j < height; j++) {
            var row = [];
            for (var i = 0; i < width; i++) {
                var column = [];
                for (var num = 0; num < this.frequencies.length; num++) {
                    for (var count = 0; count < this.frequencies[num].weight; count++) {
                        column.push(num);
                    }
                }
                // Same data is in both; one is just for positions, one is for sorting
                var options = {
                    options: column,
                    position: [i, j],
                };
                row.push(options);
                entropyList.push(options);
            }
            waveFunction.push(row);
        }
        // TODO: Add step for applying constraints to the image
        // Begin the main loop!
        // I want to make this non-blocking, so going to do some weird shit with setTimeout.
        var loopStep = function () {
            if (entropyList.length > 0) {
                // Sort the entropyList, to put the option with fewest possibilities first
                entropyList.sort(function (a, b) {
                    return a.options.length - b.options.length;
                });
                // Get the first set of options
                var options = entropyList.shift();
                // Make sure it's length is not 0. If it is, we fucked up.
                if (options.options.length <= 0) {
                    // TODO: Other options for failure (maybe a default tile? Ugly but not terrible for a roguelike)
                    reject(new Error("WFC contradiction encountered."));
                }
                // Choose an option;
                var choice = [_this.random.getRandomElement(options.options)];
                options.options = choice;
                doneList.push(options);
                // Propagate that choice to the other tiles
                _this.applyAdjacency(waveFunction, options.position, repeatOutput, loopStep);
            }
            else {
                resolve(_this.postProcess(waveFunction));
            }
        };
        loopStep();
    };
    /** Convert the array of numbers into the desired output */
    WFC.prototype.postProcess = function (waveFunction) {
        var _this = this;
        var height = waveFunction.length + (this.m - 1);
        var width = waveFunction.length + (this.n - 1);
        var output = [];
        for (var j = 0; j < height; j++) {
            var row = [];
            for (var i = 0; i < width; i++) {
                row.push(null);
            }
            output.push(row);
        }
        waveFunction.forEach(function (row, j) {
            row.forEach(function (option, i) {
                if (option.options.length > 0) {
                    var tile = _this.frequencies[option.options[0]].option;
                    for (var x = 0; x < _this.n; x++) {
                        for (var y = 0; y < _this.m; y++) {
                            output[j + y][i + x] = tile.contents[y][x];
                        }
                    }
                }
            });
        });
        return output;
    };
    /** Apply adjacency rules */
    WFC.prototype.applyAdjacency = function (waveFunction, _a, repeatOutput, callback, backTrack) {
        var _this = this;
        var x = _a[0], y = _a[1];
        if (backTrack === void 0) { backTrack = false; }
        var toDoTiles = [waveFunction[y][x]];
        var doneTiles = [];
        var propogateStep = function () {
            var index = 0;
            while (toDoTiles.length > 0 && index < 10) {
                index++;
                var doTile = toDoTiles.pop();
                _this.propogate(waveFunction, doTile.position, repeatOutput, doneTiles).forEach(function (newTile) {
                    toDoTiles.push(newTile);
                });
                if (!backTrack) {
                    doneTiles.push(doTile);
                }
            }
            if (toDoTiles.length > 0) {
                setTimeout(propogateStep);
            }
            else {
                callback();
            }
        };
        propogateStep();
    };
    /** Individual propogation step */
    WFC.prototype.propogate = function (waveFunction, _a, repeatOutput, ignoreList) {
        var _this = this;
        var x = _a[0], y = _a[1];
        if (ignoreList === void 0) { ignoreList = []; }
        var options = waveFunction[y][x];
        var aggregateRules = {
            up: new Set(),
            down: new Set(),
            left: new Set(),
            right: new Set(),
        };
        // Get all available possibilities
        options.options.forEach(function (option) {
            var rule = _this.rules[option];
            rule.up.forEach(function (x) {
                aggregateRules.up.add(x);
            });
            rule.down.forEach(function (x) {
                aggregateRules.down.add(x);
            });
            rule.left.forEach(function (x) {
                aggregateRules.left.add(x);
            });
            rule.right.forEach(function (x) {
                aggregateRules.right.add(x);
            });
        });
        // Maintain list of next tiles to go to
        var nextTiles = [];
        // Apply for each direction
        var steps = ["up", "down", "left", "right"];
        var stepDirections = {
            up: [0, -1],
            down: [0, 1],
            left: [-1, 0],
            right: [1, 0],
        };
        steps.forEach(function (step) {
            var xx = x + stepDirections[step][0];
            var yy = y + stepDirections[step][1];
            if (repeatOutput) {
                xx += waveFunction[0].length;
                xx = xx % waveFunction[0].length;
                yy += waveFunction.length;
                yy = yy % waveFunction.length;
            }
            if (xx >= 0 && xx < waveFunction[0].length && yy >= 0 && yy < waveFunction.length) {
                if (ignoreList.includes(waveFunction[yy][xx])) {
                    return;
                }
                var beforeLength = waveFunction[yy][xx].options.length;
                waveFunction[yy][xx].options = waveFunction[yy][xx].options.filter(function (x) {
                    return aggregateRules[step].has(x);
                });
                if (beforeLength > waveFunction[yy][xx].options.length) {
                    nextTiles.push(waveFunction[yy][xx]);
                }
            }
        });
        return nextTiles;
    };
    return WFC;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WFC);
//# sourceMappingURL=WFC.js.map

/***/ }),

/***/ "./lib/wfc/WfcTile.js":
/*!****************************!*\
  !*** ./lib/wfc/WfcTile.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/**
 * A tile, as defined for Wave Function Collapse purposes
 */
var WfcTile = /** @class */ (function () {
    function WfcTile(input) {
        this.contents = input.map(function (row) { return __spreadArrays(row); });
    }
    /** Check if two WfcTile's are equal, to remove duplicates. */
    WfcTile.prototype.equals = function (tile) {
        return this.compatible(tile, 0, 0);
    };
    /** Check if two WfcTile's are compatible (i.e. can be neighbours) */
    WfcTile.prototype.compatible = function (tile, x, y) {
        return this.contents.every(function (row, j) {
            return row.every(function (val, i) {
                var xPos = i + x;
                var yPos = j + y;
                if (xPos >= 0 && yPos >= 0 && yPos < tile.contents.length && xPos < tile.contents[yPos].length) {
                    return val === tile.contents[yPos][xPos];
                }
                else {
                    return true;
                }
            });
        });
    };
    /** Check if this tile work with a given constraint */
    WfcTile.prototype.constrain = function (constraint, x, y) {
        if (y >= 0 && y < this.contents.length) {
            if (x >= 0 && x < this.contents[y].length) {
                return this.contents[y][x] === constraint;
            }
        }
        return true;
    };
    return WfcTile;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WfcTile);
//# sourceMappingURL=WfcTile.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./docs/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb2d1ZWxpa2UtcHVtcGtpbi1wYXRjaC8uL2RvY3Mvc2NyaXB0LmpzIiwid2VicGFjazovL3JvZ3VlbGlrZS1wdW1wa2luLXBhdGNoLy4vbGliL2Rpc3BsYXkvRGlzcGxheS5qcyIsIndlYnBhY2s6Ly9yb2d1ZWxpa2UtcHVtcGtpbi1wYXRjaC8uL2xpYi9kaXNwbGF5L0Rpc3BsYXlTdHlsZS5qcyIsIndlYnBhY2s6Ly9yb2d1ZWxpa2UtcHVtcGtpbi1wYXRjaC8uL2xpYi9kaXNwbGF5L1RpbGUuanMiLCJ3ZWJwYWNrOi8vcm9ndWVsaWtlLXB1bXBraW4tcGF0Y2gvLi9saWIvZXZlbnQvRXZlbnRNYW5hZ2VyLmpzIiwid2VicGFjazovL3JvZ3VlbGlrZS1wdW1wa2luLXBhdGNoLy4vbGliL2Zvdi9GT1YuanMiLCJ3ZWJwYWNrOi8vcm9ndWVsaWtlLXB1bXBraW4tcGF0Y2gvLi9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcm9ndWVsaWtlLXB1bXBraW4tcGF0Y2gvLi9saWIvcGF0aGZpbmRlci9QYXRoRmluZGVyLmpzIiwid2VicGFjazovL3JvZ3VlbGlrZS1wdW1wa2luLXBhdGNoLy4vbGliL3JhbmRvbS9SYW5kb20uanMiLCJ3ZWJwYWNrOi8vcm9ndWVsaWtlLXB1bXBraW4tcGF0Y2gvLi9saWIvd2ZjL1dGQy5qcyIsIndlYnBhY2s6Ly9yb2d1ZWxpa2UtcHVtcGtpbi1wYXRjaC8uL2xpYi93ZmMvV2ZjVGlsZS5qcyIsIndlYnBhY2s6Ly9yb2d1ZWxpa2UtcHVtcGtpbi1wYXRjaC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yb2d1ZWxpa2UtcHVtcGtpbi1wYXRjaC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcm9ndWVsaWtlLXB1bXBraW4tcGF0Y2gvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yb2d1ZWxpa2UtcHVtcGtpbi1wYXRjaC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3JvZ3VlbGlrZS1wdW1wa2luLXBhdGNoL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBbUY7O0FBRW5GO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLCtDQUFPOztBQUUzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLGFBQWEsa0JBQWtCO0FBQy9CLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCOztBQUUvQixhQUFhLFFBQVE7QUFDckIsNEJBQTRCLHlCQUF5QjtBQUNyRDs7QUFFQTtBQUNBLCtDQUErQztBQUMvQzs7QUFFQTtBQUNBLHVCQUF1Qiw4Q0FBTTs7QUFFN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLEtBQUssS0FBSyxPQUFPO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUIsK0NBQU8sRUFBRSwwQ0FB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QixTQUFJLElBQUksU0FBSTtBQUNsQyxpREFBaUQsUUFBUTtBQUN6RCx3Q0FBd0MsUUFBUTtBQUNoRCx3REFBd0QsUUFBUTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlFQUFlLEdBQUcsRUFBQztBQUNuQiwrQjs7Ozs7Ozs7Ozs7Ozs7QUN6VUEsc0JBQXNCLFNBQUksSUFBSSxTQUFJO0FBQ2xDLGlEQUFpRCxRQUFRO0FBQ3pELHdDQUF3QyxRQUFRO0FBQ2hELHdEQUF3RCxRQUFRO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsNEJBQTRCLEVBQUU7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxpRUFBZSxPQUFPLEVBQUM7QUFDdkIsbUM7Ozs7OztVQzdDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoic2NyaXB0YnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlzcGxheSwgRXZlbnRNYW5hZ2VyLCBSYW5kb20sIFBhdGhGaW5kZXIsIEZPViwgV0ZDIH0gZnJvbSAnLi4vbGliL2luZGV4JztcclxuXHJcbi8vIEZpcnN0LCBzZWxlY3QgdGhlIHRhcmdldCBlbGVtZW50IHlvdSB3YW50IHRoZSBkaXNwbGF5IHRvIGJlIHdpdGhpblxyXG5jb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXlFeGFtcGxlXCIpO1xyXG5cclxuLy8gUGFyYW1hdGVycyBvYmplY3RcclxuY29uc3QgcGFyYW1zID0ge1xyXG4gICAgLy8gUmVxdWlyZWQhIFRoZSBkaXNwbGF5IG11c3QgZ28gc29tZXdoZXJlXHJcbiAgICB0YXJnZXQ6IHRhcmdldCxcclxuICAgIC8vIFdpZHRoIG9mIHRoZSBkaXNwbGF5IGluIHRpbGVzXHJcbiAgICB3aWR0aDogMjAsXHJcbiAgICAvLyBIZWlnaHQgb2YgdGhlIGRpc3BsYXkgaW4gdGlsZXNcclxuICAgIGhlaWdodDogMTUsXHJcbn07XHJcblxyXG4vLyBTdGFydCB0aGUgZGlzcGxheSFcclxuY29uc3QgZGlzcGxheSA9IG5ldyBEaXNwbGF5KHBhcmFtcyk7XHJcblxyXG4vLyBTZXQgdGhlIHRpbGUgc2l6ZSBzbyB0aGF0IGl0IGZpdHMgaXRzIGNvbnRhaW5lclxyXG5kaXNwbGF5LnRpbGVTaXplID0gZGlzcGxheS5jYWxjdWxhdGVUaWxlU2l6ZSgpO1xyXG5cclxuLy8gT25lIGNvb2wgdGhpbmcgeW91IGNhbiBkbyBpcyBhZGQgYSBsaXN0ZW5lciBmb3Igd2luZG93IHJlc2l6aW5nXHJcbi8vIEtlZXAgeW91ciBkaXNwbGF5IGxvb2tpbmcgZ29vZCFcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwoKT0+e1xyXG4gICAgZGlzcGxheS50aWxlU2l6ZSA9IGRpc3BsYXkuY2FsY3VsYXRlVGlsZVNpemUoKTtcclxufSk7XHJcblxyXG4vLyBMZXRzIGRyYXcgc29tZSBzdHVmZlxyXG5mb3IgKGxldCB4PTA7IHggPCBwYXJhbXMud2lkdGg7IHgrKykge1xyXG4gICAgZm9yIChsZXQgeT0wOyB5IDwgcGFyYW1zLmhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgLy8gRHJhdyBzb21lIHdhbGxzXHJcbiAgICAgICAgaWYgKHg9PT0wIHx8IHk9PT0wIHx8IHg9PT1wYXJhbXMud2lkdGgtMSB8fCB5PT09cGFyYW1zLmhlaWdodC0xKSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXkuc2V0VGlsZSh4LHkse1xyXG4gICAgICAgICAgICAgICAgLy8gQ29udGVudCBjYW4gYmUgYSBzdHJpbmcsIG9yIEFOWSBodG1sIGVsZW1lbnQhIChpbmNsdWRpbmcgaW1hZ2VzISlcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICcjJyxcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJicmlja1dhbGxcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQWRkIG91ciBwbGF5ZXIhXHJcbiAgICAgICAgfSBlbHNlIGlmICh4PT09MyAmJiB5PT09NSkge1xyXG4gICAgICAgICAgICBkaXNwbGF5LnNldFRpbGUoeCx5LHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICdAJyxcclxuICAgICAgICAgICAgICAgIC8vIFlvdSBjYW4gdXNlIGFzIG1hbnkgY2xhc3NlcyBhcyB5b3Ugd291bGQgbGlrZSFcclxuICAgICAgICAgICAgICAgIGNsYXNzTGlzdDogW1wicGxheWVyXCJdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vIFNvbWUgZmxvb3IgZXZlcnl3aGVyZSBlbHNlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGlzcGxheS5zZXRUaWxlKHgseSx7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnLicsXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiY29vbEZsb29yXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBIbW0gYWN0dWFsbHkgSSB3YW50IHRvIGNoYW5nZSBzb21lIG9mIHRoZSB0aWxlcyBhIGJpdC4gdXBkYXRlVGlsZSBjaGFuZ2VzIHRoZVxyXG4vLyBwYXJhbWV0ZXJzIHRoYXQgeW91IHNwZWNpZnk7IHNldFRpbGUgcmVwbGFjZXMgZXZlcnl0aGluZy5cclxuXHJcbmZvciAobGV0IGk9NTsgaSA8IDEwOyBpKyspIHtcclxuICAgIGRpc3BsYXkudXBkYXRlVGlsZShpLGkse2NsYXNzTmFtZTpcInN1cGVyQXdlc29tZVwifSk7XHJcbn1cclxuXHJcbmNvbnN0IHJhbmRvbVN0dWZmID0gKCk9PntcclxuICAgIC8vIFlvdSBjYW4gZGVmaW5lIGEgc2VlZCBpZiB5b3Ugd291bGQgbGlrZTsgaWYgbm90LCB0aGUgY3VycmVudCB0aW1lIGlzIHVzZWQuXHJcbiAgICBjb25zdCBvcHRpb25hbFNlZWQgPSBNYXRoLmZsb29yKERhdGUubm93KCkpO1xyXG4gICAgXHJcbiAgICAvLyBTdGFydCB0aGUgcmFuZG9tIG51bWJlciBnZW5lcmF0b3JcclxuICAgIGNvbnN0IHJhbmRvbSA9IG5ldyBSYW5kb20ob3B0aW9uYWxTZWVkKTtcclxuICAgIFxyXG4gICAgLy8gSWYgeW91IHdhbnQgYSByYW5kb20gbnVtYmVyIGZyb20gMCA8PSB4IDwgMTpcclxuICAgIGNvbnN0IHggPSByYW5kb20uZ2V0UmFuZG9tKCk7XHJcbiAgICBcclxuICAgIC8vIElmIHlvdSB3b3VsZCBsaWtlIGEgcmFuZG9tIG51bWJlciBpbiB0aGUgcmFuZ2Ugb2YgbG93ZXIgPD0geSA8PSB1cHBlciB5b3UgY2FuIHVzZSBnZXROdW1iZXIuXHJcbiAgICBjb25zdCBsb3dlciA9IDA7XHJcbiAgICBjb25zdCB1cHBlciA9IDEwO1xyXG4gICAgY29uc3QgeSA9IHJhbmRvbS5nZXROdW1iZXIobG93ZXIsdXBwZXIpO1xyXG4gICAgXHJcbiAgICAvLyBJZiB0aGUgZ2l2ZW4gYm91bmRzIGFyZSBpbnRlZ2VycywgaXQgd2lsbCBnZW5lcmF0ZSBpbnRlZ2Vycy5cclxuICAgIC8vIElmIG5vdCwgaXQgd2lsbCBnZW5lcmF0ZSBkZWNpbWFscy5cclxuICAgIC8vIElmIHlvdSB3YW50IHRvIHNwZWNpZnkgZXhwbGljaXRseSwgdXNlIHRoZSBpbnRlZ2VyIGJvb2xlYW4gcGFyYW1ldGVyLlxyXG4gICAgY29uc3Qgbm9UaGFua3NOb3RJbnRlZ2VyID0gcmFuZG9tLmdldE51bWJlcihsb3dlcix1cHBlcixmYWxzZSk7XHJcbiAgICBcclxuICAgIC8vIElmIHlvdSB3YW50IGEgcmFuZG9tIGVsZW1lbnQgZnJvbSBhbiBhcnJheSwgdXNlIGdldFJhbmRvbUVsZW1lbnQuXHJcbiAgICBjb25zdCBjb29sQXJyYXkgPSBbMSwgMiwgMywgNCwgNSwgNiwgN107XHJcbiAgICBjb25zdCByYW5kb21FbGVtZW50ID0gcmFuZG9tLmdldFJhbmRvbUVsZW1lbnQoY29vbEFycmF5KTtcclxuICAgIFxyXG4gICAgLy8gSWYgeW91IHdhbnQgdG8gcHJvdmlkZSB3ZWlnaHRzIGZvciBlYWNoIHZhbHVlLCB5b3UgY2FuIHVzZSBnZXRXZWlnaHRlZEVsZW1lbnQuXHJcbiAgICBjb25zdCB3ZWlnaHRlZEFycmF5ID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2VpZ2h0OiAxMCxcclxuICAgICAgICAgICAgb3B0aW9uOiBcIkN1dGUgZG9nXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2VpZ2h0OiAxNSxcclxuICAgICAgICAgICAgb3B0aW9uOiBcIkF3ZXNvbWUgY2F0XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgd2VpZ2h0OiAxLFxyXG4gICAgICAgICAgICBvcHRpb246IFwiUmFyZSBGcmFua2xpblwiXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuICAgIFxyXG4gICAgY29uc3QgcmFuZG9tV2VpZ2h0ZWRFbGVtZW50ID0gcmFuZG9tLmdldFdlaWdodGVkRWxlbWVudCh3ZWlnaHRlZEFycmF5KTtcclxuICAgIFxyXG4gICAgY29uc3QgcmVzdWx0c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhbmRvbVJlc3VsdHNcIik7XHJcblxyXG4gICAgLy8gQ2xlYXIgaXQgb3V0LCB0aGVuIGZpbGwgaXQgdXAgYWdhaW5cclxuICAgIHdoaWxlKHJlc3VsdHNMaXN0Lmxhc3RDaGlsZCkge1xyXG4gICAgICAgIHJlc3VsdHNMaXN0LnJlbW92ZUNoaWxkKHJlc3VsdHNMaXN0Lmxhc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IGF0dGFjaFJlc3VsdCA9IGZ1bmN0aW9uIChuYW1lLCByZXN1bHQpIHtcclxuICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICAgICAgICBjb25zdCB0ZXh0ID0gYCR7bmFtZX0gOiAke3Jlc3VsdH1gO1xyXG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpKTtcclxuICAgICAgICByZXN1bHRzTGlzdC5hcHBlbmRDaGlsZChsaSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGF0dGFjaFJlc3VsdChcInhcIiwgeC50b1N0cmluZygpKTtcclxuICAgIGF0dGFjaFJlc3VsdChcInlcIiwgeS50b1N0cmluZygpKTtcclxuICAgIGF0dGFjaFJlc3VsdChcIm5vVGhhbmtzTm90SW50ZWdlclwiLCBub1RoYW5rc05vdEludGVnZXIudG9TdHJpbmcoKSk7XHJcbiAgICBhdHRhY2hSZXN1bHQoXCJyYW5kb21FbGVtZW50XCIsIHJhbmRvbUVsZW1lbnQudG9TdHJpbmcoKSk7XHJcbiAgICBhdHRhY2hSZXN1bHQoXCJyYW5kb21XZWlnaHRlZEVsZW1lbnRcIiwgcmFuZG9tV2VpZ2h0ZWRFbGVtZW50LnRvU3RyaW5nKCkpO1xyXG59XHJcblxyXG4vLyBEbyBpdCBvbmNlIG9uIHBhZ2UgbG9hZFxyXG5yYW5kb21TdHVmZigpO1xyXG5cclxuLy8gQXR0YWNoIGl0IHRvIGEgYnV0dG9uIHNvIHRoZSByZWFkZXIgY2FuIHB1c2ggaXRcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYW5kb21CdXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIscmFuZG9tU3R1ZmYpO1xyXG5cclxuLy8gQ29sb3JmdWwgZGlzcGxheSwgaG9vcmF5XHJcbmNvbnN0IGNvbG9yVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb2xvckRpc3BsYXlcIik7XHJcblxyXG4vLyBJbml0aWFsaXplIGl0XHJcbmNvbnN0IGNvbG9yRGlzcGxheSA9IG5ldyBEaXNwbGF5KHt0YXJnZXQ6Y29sb3JUYXJnZXQsIHdpZHRoOiAxMCwgaGVpZ2h0OiAxMH0pO1xyXG5cclxuLy8gRHJhdyBzb21lIHN0dWZmXHJcbmZvcihsZXQgaT0wO2k8MTA7aSsrKSB7XHJcbiAgICBmb3IobGV0IGo9MDtqPDEwO2orKykge1xyXG4gICAgICAgIGlmIChpPT09MCB8fCBqPT09MCB8fCBpPT09OSB8fCBqPT09OSkge1xyXG4gICAgICAgICAgICAvLyBEaWQgeW91IGtub3cgeW91IGNhbiB1c2UgYSBzaG9ydGhhbmQgaGVyZT8gTm93IHlvdSBkbyFcclxuICAgICAgICAgICAgY29sb3JEaXNwbGF5LnNldFRpbGUoaSxqLCcjJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpPT09MyAmJiBqPT09Mykge1xyXG4gICAgICAgICAgICBjb2xvckRpc3BsYXkuc2V0VGlsZShpLGosJ0AnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGk9PT00ICYmIGo9PT01KSB7XHJcbiAgICAgICAgICAgIGNvbG9yRGlzcGxheS5zZXRUaWxlKGksaix7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnZycsXHJcbiAgICAgICAgICAgICAgICAvLyBZb3UgY2FuIHVzZSBpbmxpbmUgY29sb3JzIGFuZCBiYWNrZ3JvdW5kcyBpZlxyXG4gICAgICAgICAgICAgICAgLy8geW91IFJFQUxMWSB3YW50IHRvLCBidXQgSSBkaXNjb3VyYWdlIGl0LlxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdncmVlbicsXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgxMjgsMCwwLDAuMiknLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb2xvckRpc3BsYXkuc2V0VGlsZShpLGosJy4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIE1ha2UgdGhlIGRpc3BsYXkgZml0IHRoZSBjb250YWluZXJcclxuY29sb3JEaXNwbGF5LnRpbGVTaXplID0gY29sb3JEaXNwbGF5LmNhbGN1bGF0ZVRpbGVTaXplKCk7XHJcblxyXG4vLyBDZW50ZXIgaXQgb24gdGhlIHBsYXllclxyXG5jb2xvckRpc3BsYXkuY2VudGVyRGlzcGxheSgzLDMpO1xyXG5cclxuLy8gSGVyZSdzIGEgY29vbCBtYXAgdG8gbGl2ZSBpblxyXG5jb25zdCBtYXAgPSBbXHJcbiAgICBcIiMjIyMjIyMjIyMjIyMjIyMjIyMjXCIsXHJcbiAgICBcIiMuLi4uLi4uLi4uLi4uLi4uLi4jXCIsXHJcbiAgICBcIiMuLiMuLi4uLiMuLi4uIy4uLi4jXCIsXHJcbiAgICBcIiMuLiMuLi4uLiMjIy4uLiMjLi4jXCIsXHJcbiAgICBcIiMuLiMuLi4uLiMuLi4uLi4uLi4jXCIsXHJcbiAgICBcIiMuLi4uLi4uLi4uLi4uIyMjIy4jXCIsXHJcbiAgICBcIiMuLi4uLi4uLiMuLi4uIy4uLi4jXCIsXHJcbiAgICBcIiMjIyMuLi4jIyMuLi4uIy4uLi4jXCIsXHJcbiAgICBcIiMuLi4uLi4uLiMuLi4uIy4uLi4jXCIsXHJcbiAgICBcIiMjIyMjIyMjIyMjIyMjIyMjIyMjXCIsXHJcbl07XHJcbmNvbnN0IHdpZHRoID0gbWFwWzBdLmxlbmd0aDtcclxuY29uc3QgaGVpZ2h0ID0gbWFwLmxlbmd0aDtcclxuXHJcbi8vIEFuZCBsZXRzIHN0YXJ0IHVwIGEgZGlzcGxheSB0byB1c2VcclxuY29uc3QgZm92RGlzcGxheVBhcmFtcyA9IHtcclxuICAgIHRhcmdldDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3ZNYXBcIiksXHJcbiAgICB3aWR0aDogd2lkdGgsXHJcbiAgICBoZWlnaHQ6IGhlaWdodCxcclxufTtcclxuY29uc3QgZm92RGlzcGxheSA9IG5ldyBEaXNwbGF5KGZvdkRpc3BsYXlQYXJhbXMpO1xyXG5mb3ZEaXNwbGF5LnRpbGVTaXplID0gZm92RGlzcGxheS5jYWxjdWxhdGVUaWxlU2l6ZSgpO1xyXG5cclxuLy8gRk9WIHRha2VzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBkZWNpZGVzIHdoZXRoZXIgb3Igbm90IHlvdSBjYW4gc2VlIHNvbWV0aGluZy5cclxuLy8gSXQgdGFrZXMgb25lIHBhcmFtZXRlciwgd2hpY2ggaXMgYSB0d28gZWxlbWVudCBwb3NpdGlvbiBhcnJheSBwb3MgPSBbeCx5XVxyXG4vLyBhbmQgcmV0dXJucyB0cnVlIG9yIGZhbHNlLlxyXG5jb25zdCBjYW5TZWUgPSAocG9zaXRpb24pID0+IHtcclxuICAgIGNvbnN0IHggPSBwb3NpdGlvblswXTtcclxuICAgIGNvbnN0IHkgPSBwb3NpdGlvblsxXTtcclxuXHJcbiAgICAvLyBNYWtlIHN1cmUgaXQncyBldmVuIG9uIHRoZSBtYXBcclxuICAgIGlmICggeDwwIHx8IHg+PXdpZHRoIHx8IHk8MCB8fCB5Pj1oZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0aWxlID0gbWFwW3ldW3hdO1xyXG5cclxuICAgIC8vIEZpcnN0LCByZWdhcmRsZXNzIG9mIHN1Y2Nlc3Mgb3Igbm90LCBzZWUgdGhpcyB0aWxlXHJcbiAgICBmb3ZEaXNwbGF5LnNldFRpbGUoeCx5LHRpbGUpO1xyXG5cclxuICAgIC8vIE5leHQsIHVzZSB3aGF0ZXZlciBjcml0ZXJpYSB3ZSB3YW50IHRvIGRlY2lkZSBpZiBpdCBpcyBzZWV0aHJvdWdoIG9yIG5vdC5cclxuICAgIC8vIEluIHRoaXMgY2FzZSwgaWYgaXQncyBub3QgYSB3YWxsIChvciAjIGNoYXJhY3RlciksIHdlIGNhbiBzZWUgdGhyb3VnaCBpdC5cclxuICAgIHJldHVybiB0aWxlICE9PSAnIyc7XHJcbn1cclxuXHJcbi8vIEl0IGhhcyBhbiBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIGZvciBkaXN0YW5jZS4gVGhlIGRlZmF1bHQgaXMgOC5cclxuY29uc3Qgb3B0aW9uYWxSYW5nZSA9IDIwO1xyXG5cclxuLy8gSW5pdGlhbGl6ZSB0aGUgRk9WIG9iamVjdCFcclxuY29uc3QgZm92ID0gbmV3IEZPVihjYW5TZWUsIG9wdGlvbmFsUmFuZ2UpO1xyXG5cclxuLy8gQ2hvb3NlIGEgcG9zaXRpb24gZm9yIHRoZSBwbGF5ZXIgdG8gYmVcclxuY29uc3QgcGxheWVyUG9zID0gWzUsNV07XHJcblxyXG4vLyBTbGlnaHRseSBoYWNreSB3YXkgdG8gYWRkIHRoZSBwbGF5ZXI7IHVzZSBhIGJldHRlciBkYXRhIHN0cnVjdHVyZSBmb3IgeW91ciBnYW1lcyFcclxuY29uc3QgbWFwUm93ID0gbWFwW3BsYXllclBvc1sxXV07XHJcbm1hcFtwbGF5ZXJQb3NbMV1dID0gbWFwUm93LnNsaWNlKDAscGxheWVyUG9zWzBdKSArICdAJyArIG1hcFJvdy5zbGljZShwbGF5ZXJQb3NbMF0rMSk7XHJcblxyXG4vLyBOb3csIExPT0shXHJcbmZvdi5sb29rKHBsYXllclBvcyk7XHJcblxyXG4vLyBGaXJzdCwgc29tZSBzZXR1cCwgc28gd2UgY2FuIHJlY29yZCBvdXIgb3V0cHV0XHJcbmNvbnN0IHNpbXBsZUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpbXBsZUV2ZW50TGlzdFwiKTtcclxuY29uc3QgY29tcGxleExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXBsZXhFdmVudExpc3RcIik7XHJcblxyXG5cclxuLy8gTGV0cyBtYWtlIGEgaGVscGVyIGZ1bmN0aW9uIHRvIHJlY29yZCBvdXIgb3V0cHV0XHJcbmNvbnN0IHNob3dBY3Rpb24gPSAoYWN0aW9uLCBsaXN0KSA9PiB7XHJcbiAgICAvLyBNYWtlIGEgbGlzdCBpdGVtIGFuZCBhZGQgdGhlIGFjdGlvbiB0byBpdC5cclxuICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXHJcbiAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShhY3Rpb24pKTtcclxuICAgIC8vIEF0dGFjaCBpdCB0byB0aGUgbGlzdCwgc28gd2UgY2FuIHNlZSB3aGF0IGhhcHBlbnMuXHJcbiAgICBsaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcclxufTtcclxuXHJcbi8vIFRoZXJlJ3MgdHdvIHR5cGVzIG9mIGV2ZW50IG1hbmFnZXJzIHlvdSBjYW4gbWFrZS5cclxuLy8gTGV0cyBzdGFydCB3aXRoIHRoZSBzaW1wbGUgb25lLiBFdmVyeW9uZSB0YWtlcyB0dXJucywgb25lIGFmdGVyIHRoZSBvdGhlci5cclxuY29uc3Qgc2ltcGxlRXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcih7dHlwZTpcInNpbXBsZVwifSk7XHJcblxyXG4vLyBVc3VhbGx5LCB3ZSB3YW50IHRvIGFkZCBzb21lIGFjdG9ycyB0byB0aGUgc3lzdGVtLlxyXG4vLyBUaGUgc3lzdGVtIGNhbGxzIHRoZWlyIFwiYWN0XCIgbWV0aG9kLlxyXG5cclxuY29uc3Qgc2ltcGxlR29ibGluID0ge1xyXG4gICAgYWN0OiAoKT0+c2hvd0FjdGlvbihcIlRoZSBHb2JsaW4gZ29ibGlucyFcIiwgc2ltcGxlTGlzdClcclxufVxyXG5cclxuY29uc3Qgc2ltcGxlQ2F0ID0ge1xyXG4gICAgYWN0OiAoKT0+c2hvd0FjdGlvbihcIlRoZSBjYXQgbWVvd3MhXCIsIHNpbXBsZUxpc3QpXHJcbn1cclxuXHJcbi8vIEFkZCB0aGVtIHRvIHRoZSBldmVudCBtYW5hZ2VyXHJcbnNpbXBsZUV2ZW50cy5hZGQoc2ltcGxlR29ibGluKTtcclxuc2ltcGxlRXZlbnRzLmFkZChzaW1wbGVDYXQpO1xyXG5cclxuLy8gWW91IGNhbiBhbHNvIGFkZCBjYWxsYmFjayBmdW5jdGlvbnMgb24gdGhlaXIgb3duLCBhcyBldmVudHMgb3Igd2hhdGV2ZXIgeW91ciBoZWFydCBwbGVhc2VzLlxyXG4vLyBUaGV5IGNhbiByZXBlYXQgZm9yZXZlci4uLlxyXG5zaW1wbGVFdmVudHMuYWRkKHtcclxuICAgIGNhbGxiYWNrOiAoKT0+c2hvd0FjdGlvbihcIkRyaXAgZHJpcCBnb2VzIHRoZSBmYXVjZXQuXCIsIHNpbXBsZUxpc3QpLFxyXG4gICAgcmVwZWF0czogdHJ1ZVxyXG59KVxyXG5cclxuLy8gUmVwZWF0IGEgZmV3IHRpbWVzXHJcbnNpbXBsZUV2ZW50cy5hZGQoe1xyXG4gICAgY2FsbGJhY2s6ICgpPT5zaG93QWN0aW9uKFwiUnVzaGluZyB3aW5kISBPaCBubyFcIiwgc2ltcGxlTGlzdCksXHJcbiAgICByZXBlYXRzOiAyXHJcbn0pXHJcblxyXG4vLyBPciBub3QgcmVwZWF0IGF0IGFsbCFcclxuc2ltcGxlRXZlbnRzLmFkZCh7XHJcbiAgICBjYWxsYmFjazogKCk9PnNob3dBY3Rpb24oXCJUaGUgaG91c2Ugb2YgY2FyZHMgZmFsbHMgb3Zlci4gV2hvb3BzIVwiLCBzaW1wbGVMaXN0KVxyXG59KTtcclxuXHJcbi8vIFRoZW4geW91IGp1c3Qga2ljayBpdCBvZmYgaW4geW91ciBwcmVmZXJyZWQgbWFubmVyLlxyXG4vLyBFYWNoIHRpbWUgeW91IGNhbGwgYWR2YW5jZSwgaXQgd2lsbCBzdGVwIGZvcndhcmQgb25lIHN0ZXAuXHJcbi8vIElmIGFjdCByZXR1cm5zIGEgcHJvbWlzZSAoc2F5LCBpZiB5b3UncmUgd2FpdGluZyBmb3IgcGxheWVyIGlucHV0KVxyXG4vLyBpdCB3aWxsIHdhaXQgZm9yIHRoYXQgYWN0aW9uIHRvIGNvbmNsdWRlLlxyXG5mb3IobGV0IGk9MDtpPDIwO2krKykge1xyXG4gICAgc2ltcGxlRXZlbnRzLmFkdmFuY2UoKTtcclxufVxyXG5cclxuLy8gVGhlIHNlY29uZCB0eXBlIG9mIGV2ZW50IG1hbmFnZXIgaXMgY29tcGxleDpcclxuY29uc3QgY29tcGxleEV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoe3R5cGU6XCJjb21wbGV4XCJ9KTtcclxuXHJcbi8vIFRoZSBjb21wbGV4IGV2ZW50IG1hbmFnZXIgYWNjZXB0cyBkaWZmZXJlbnQgZGVsYXlzIGZvciBkaWZmZXJlbnQgYWN0b3JzXHJcblxyXG5jb25zdCBmYXN0Q2F0ID0ge1xyXG4gICAgYWN0OigpPT5zaG93QWN0aW9uKFwiRmFzdCBjYXQgbnlvb21zIVwiLCBjb21wbGV4TGlzdClcclxufVxyXG5cclxuY29uc3Qgc2xvd09ncmUgPSB7XHJcbiAgICBhY3Q6KCk9PnNob3dBY3Rpb24oXCJTbG93IG9ncmUgaXMgc2xvb29vd1wiLCBjb21wbGV4TGlzdClcclxufVxyXG5cclxuLy8gVGhlIGRlbGF5IHByb3BlcnR5IGRlZmluZXMgaG93IHNsb3cgYW4gYWN0b3IgaXNcclxuY29tcGxleEV2ZW50cy5hZGQoe1xyXG4gICAgYWN0b3I6ZmFzdENhdCxcclxuICAgIGRlbGF5OjFcclxufSk7XHJcblxyXG5jb21wbGV4RXZlbnRzLmFkZCh7XHJcbiAgICBhY3RvcjpzbG93T2dyZSxcclxuICAgIGRlbGF5OjVcclxufSk7XHJcblxyXG4vLyBPciBob3cgbG9uZyBhbiBldmVudCB0YWtlc1xyXG5jb21wbGV4RXZlbnRzLmFkZCh7XHJcbiAgICBjYWxsYmFjazooKT0+c2hvd0FjdGlvbihcIlRoZSBtYWlsIGhhcyBqdXN0IGFycml2ZWQuIFN3ZWV0IVwiLCBjb21wbGV4TGlzdCksXHJcbiAgICBkZWxheTogMTZcclxufSk7XHJcblxyXG4vLyBBZHZhbmNlIHRoZSBjbG9jay4uLlxyXG5mb3IobGV0IGk9MDtpPDIwO2krKykge1xyXG4gICAgY29tcGxleEV2ZW50cy5hZHZhbmNlKCk7XHJcbn1cclxuXHJcbm1hcFtwbGF5ZXJQb3NbMV1dID0gbWFwUm93LnNsaWNlKDAscGxheWVyUG9zWzBdKSArICcuJyArIG1hcFJvdy5zbGljZShwbGF5ZXJQb3NbMF0rMSk7XHJcblxyXG4vLyBGaXJzdCwgbGV0cyBzZXR1cCBhbm90aGVyIGRpc3BsYXkhIEkgd2FudCB0byBkcmF3IHRoZSBwYXRoIHdlIGZpbmQuXHJcbi8vIEFuZCBsZXRzIHN0YXJ0IHVwIGEgZGlzcGxheSB0byB1c2UuXHJcbi8vIFdlJ3JlIGdvaW5nIHRvIHVzZSB0aGUgc2FtZSBtYXAgZnJvbSB0aGUgRk9WIHNlY3Rpb24uXHJcbmNvbnN0IHBhdGhEaXNwbGF5UGFyYW1zID0ge1xyXG4gICAgdGFyZ2V0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhdGhEaXNwbGF5XCIpLFxyXG4gICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgaGVpZ2h0OiBoZWlnaHQsXHJcbn07XHJcbmNvbnN0IHBhdGhEaXNwbGF5ID0gbmV3IERpc3BsYXkocGF0aERpc3BsYXlQYXJhbXMpO1xyXG5wYXRoRGlzcGxheS50aWxlU2l6ZSA9IHBhdGhEaXNwbGF5LmNhbGN1bGF0ZVRpbGVTaXplKCk7XHJcblxyXG4vLyBMZXRzIGRyYXcgdGhlIG1hcCB0byBzdGFydFxyXG5tYXAuZm9yRWFjaCgocm93LHkpPT5yb3cuc3BsaXQoJycpLmZvckVhY2goKHRpbGUseCk9PntcclxuICAgIHBhdGhEaXNwbGF5LnNldFRpbGUoeCx5LHRpbGUpO1xyXG59KSk7XHJcblxyXG4vLyBOb3csIGxldHMgc2V0dXAgdGhlIHBhdGhmaW5kZXIhXHJcbi8vIFRoZSBQYXRoRmluZGVyIHRha2VzIGEgXCJjYW5QYXNzXCIgY2FsbGJhY2sgdG8gZGV0ZXJtaW5lIHdoYXQgaXMgcGFzc2FibGUuXHJcbi8vIFRoaXMgbG9va3Mgc2ltaWxhciB0byB0aGUgY2FuU2VlIGNhbGxiYWNrIGZyb20gYmVmb3JlLCBidXQgaXQgZG9lc24ndCBoYXZlIHRvLlxyXG5jb25zdCBwYXRoZmluZGVyID0gbmV3IFBhdGhGaW5kZXIoe1xyXG4gICAgY2FuUGFzczooW3gseV0pPT57XHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIGl0J3MgZXZlbiBvbiB0aGUgbWFwXHJcbiAgICAgICAgaWYgKCB4PDAgfHwgeD49d2lkdGggfHwgeTwwIHx8IHk+PWhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRpbGUgPSBtYXBbeV1beF07XHJcblxyXG4gICAgICAgIC8vIE5leHQsIHVzZSB3aGF0ZXZlciBjcml0ZXJpYSB3ZSB3YW50IHRvIGRlY2lkZSBpZiBpdCBpcyBwYXNzYWJsZS5cclxuICAgICAgICAvLyBJbiB0aGlzIGNhc2UsIGlmIGl0J3Mgbm90IGEgd2FsbCAob3IgIyBjaGFyYWN0ZXIpLCB3ZSBjYW4gd2FsayB0aHJvdWdoIGl0LlxyXG4gICAgICAgIHJldHVybiB0aWxlICE9PSAnIyc7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gTGV0IGNob29zZSBhIHN0YXJ0aW5nIHBvc2l0aW9uLCBhbmQgYSB0YXJnZXQgcG9zaXRpb24hXHJcbmNvbnN0IHN0YXJ0UG9zID0gWzEsOF07XHJcbmNvbnN0IGVuZFBvcyA9IFsxNSw4XTtcclxuXHJcbi8vIEl0IGNhbiBhbHNvIHRha2UgYW4gb3B0aW9uYWwgXCJvcnRob2dvbmFsT25seVwiIHBhcmFtZXRlci5cclxuLy8gVGhpcyBzZXRzIHdoZXRoZXIgb3Igbm90IHRoZSBwYXRoZmluZGVyIHdpbGwgdXNlIGRpYWdvbmFscy5cclxuY29uc3Qgb3B0aW9uYWxPcnRob2dvbmFsT25seSA9IGZhbHNlO1xyXG5cclxuLy8gTm93LCBsZXRzIGZpbmQgdGhlIHBhdGghXHJcbmNvbnN0IHBhdGggPSBwYXRoZmluZGVyLmZpbmRQYXRoKHN0YXJ0UG9zLCBlbmRQb3MsIG9wdGlvbmFsT3J0aG9nb25hbE9ubHkpO1xyXG5cclxuLy8gRHJhdyBpdCBvbnRvIHRoZSBtYXAgdG8gdGFrZSBhIGxvb2sgYXQgaXQuXHJcbnBhdGguZm9yRWFjaCgoW3gseV0pPT57XHJcbiAgICBwYXRoRGlzcGxheS51cGRhdGVUaWxlKHgseSx7XHJcbiAgICAgICAgY29udGVudDonWCcsXHJcbiAgICAgICAgY2xhc3NOYW1lOiBcInBhdGhNYXJrZXJcIlxyXG4gICAgfSlcclxufSk7XHJcblxyXG4vLyBOb3RlIHRoYXQgdGhlIGRyYXduIHBhdGggZG9lc24ndCBpbmNsdWRlIHRoZSBzdGFydGluZyBwb3NpdGlvbi5cclxuLy8gVGhpcyBpcyBzbyB5b3UgY2FuIGp1c3QgZ3JhYiBwYXRoWzBdIHRvIGdldCB0aGUgZmlyc3Qgc3RlcCBpbiB5b3VyIGpvdXJuZXkuXHJcbi8vIExldHMgZHJhdyBvbiB0aGUgcGxheWVyLCB0b28sIGZvciBpbGx1c3RyYXRpb24uXHJcbnBhdGhEaXNwbGF5LnVwZGF0ZVRpbGUoc3RhcnRQb3NbMF0sIHN0YXJ0UG9zWzFdLCAnQCcpO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwoKT0+e1xyXG4gICAgY29sb3JEaXNwbGF5LnRpbGVTaXplID0gY29sb3JEaXNwbGF5LmNhbGN1bGF0ZVRpbGVTaXplKCk7XHJcbiAgICBmb3ZEaXNwbGF5LnRpbGVTaXplID0gZm92RGlzcGxheS5jYWxjdWxhdGVUaWxlU2l6ZSgpO1xyXG4gICAgcGF0aERpc3BsYXkudGlsZVNpemUgPSBwYXRoRGlzcGxheS5jYWxjdWxhdGVUaWxlU2l6ZSgpO1xyXG59KTtcclxuXHJcbi8vIFdGQyBkaXNwbGF5XHJcbmNvbnN0IHdmY0Rpc3BsYXlQYXJhbXMgPSB7XHJcbiAgICB0YXJnZXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2ZjRGlzcGxheVwiKSxcclxuICAgIHdpZHRoOiAyMCxcclxuICAgIGhlaWdodDogMjAsXHJcbn07XHJcbmNvbnN0IHdmY0Rpc3BsYXkgPSBuZXcgRGlzcGxheSh3ZmNEaXNwbGF5UGFyYW1zKTtcclxud2ZjRGlzcGxheS50aWxlU2l6ZSA9IHdmY0Rpc3BsYXkuY2FsY3VsYXRlVGlsZVNpemUoKTtcclxuXHJcbi8vIFRoZSBXRkMgZ2VuZXJhdG9yIHRha2VzIGFuIGlucHV0IFwiaW1hZ2VcIiwgd2hpY2ggaXQgdXNlcyB0byBmaWd1cmUgb3V0IHJ1bGVzIGZvciB0aGUgb3V0cHV0LlxyXG5jb25zdCBpbnB1dEltYWdlID0gW1xyXG4gICAgXCIuIy4uXCIsXHJcbiAgICBcIi4jLi5cIixcclxuICAgIFwiIyMjI1wiLFxyXG4gICAgXCIuIy4uXCIsXHJcbl07XHJcblxyXG5jb25zdCB3ZmMgPSBuZXcgV0ZDKHtpbnB1dDppbnB1dEltYWdlLG46MyxyZXBlYXRJbnB1dDp0cnVlfSk7XHJcbndmYy5nZW5lcmF0ZSh7d2lkdGg6MjAsaGVpZ2h0OjIwLHJlcGVhdE91dHB1dDp0cnVlfSkudGhlbihyZXN1bHQ9PntcclxuICAgIHJlc3VsdC5mb3JFYWNoKChyb3csaik9PntcclxuICAgICAgICByb3cuZm9yRWFjaCgoY29sLGkpPT57XHJcbiAgICAgICAgICAgIHdmY0Rpc3BsYXkuc2V0VGlsZShpLGosY29sKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG5jb25zdCB3ZmNEaXNwbGF5UGFyYW1zVHdvID0ge1xyXG4gICAgdGFyZ2V0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndmY0Rpc3BsYXlUd29cIiksXHJcbiAgICB3aWR0aDogMjAsXHJcbiAgICBoZWlnaHQ6IDIwLFxyXG59O1xyXG5jb25zdCB3ZmNEaXNwbGF5VHdvID0gbmV3IERpc3BsYXkod2ZjRGlzcGxheVBhcmFtc1R3byk7XHJcbndmY0Rpc3BsYXlUd28udGlsZVNpemUgPSB3ZmNEaXNwbGF5VHdvLmNhbGN1bGF0ZVRpbGVTaXplKCk7XHJcblxyXG4vLyBUaGUgV0ZDIGdlbmVyYXRvciB0YWtlcyBhbiBpbnB1dCBcImltYWdlXCIsIHdoaWNoIGl0IHVzZXMgdG8gZmlndXJlIG91dCBydWxlcyBmb3IgdGhlIG91dHB1dC5cclxuY29uc3QgaW5wdXRJbWFnZVR3byA9IFtcclxuICAgIFwiICAgICAgICAgICAgICAgICBcIixcclxuICAgIFwiICAgICAgICAgICAgIFggICBcIixcclxuICAgIFwiICAgIFgjICAgICAgICMgICBcIixcclxuICAgIFwiICAgICAjICAgICAgICMgICBcIixcclxuICAgIFwiICAgICAjICBYICAgICMgICBcIixcclxuICAgIFwiICAgICAjIyMjIyMjIyMgICBcIixcclxuICAgIFwiICAgICAjICAgICAjICAgICBcIixcclxuICAgIFwiICAgICAjICAgICBYICAgICBcIixcclxuICAgIFwiICAgICBYICAgICAgICAgICBcIixcclxuICAgIFwiICAgICAgICAgICAgICAgICBcIixcclxuXTtcclxuXHJcbmNvbnN0IHdmY1R3byA9IG5ldyBXRkMoe2lucHV0OmlucHV0SW1hZ2VUd28sbjozLHJlcGVhdElucHV0OnRydWUsaW5jbHVkZU1pcnJvcnM6dHJ1ZSxpbmNsdWRlUm90YXRpb25zOnRydWV9KTtcclxud2ZjVHdvLmdlbmVyYXRlKHt3aWR0aDoyMCxoZWlnaHQ6MjAscmVwZWF0T3V0cHV0OnRydWV9KS50aGVuKHJlc3VsdD0+e1xyXG4gICAgcmVzdWx0LmZvckVhY2goKHJvdyxqKT0+e1xyXG4gICAgICAgIHJvdy5mb3JFYWNoKChjb2wsaSk9PntcclxuICAgICAgICAgICAgd2ZjRGlzcGxheVR3by5zZXRUaWxlKGksaixjb2wpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuIiwidmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn07XHJcbmltcG9ydCBUaWxlIGZyb20gJy4vVGlsZS5qcyc7XHJcbmltcG9ydCBjc3MgZnJvbSAnLi9EaXNwbGF5U3R5bGUuanMnO1xyXG4vKiogRGlzcGxheSBjbGFzcywgdG8gY3JlYXRlIGFuZCBjb250cm9sIGEgZGlzcGxheSAqL1xyXG52YXIgRGlzcGxheSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKiBDcmVhdGUgYSBuZXcgRGlzcGxheVxyXG4gICAgICogIEBwYXJhbSB7RGlzcGxheVBhcmFtc30gcGFyYW1ldGVycyAtIE9iamVjdCBvZiBwYXJhbWV0ZXJzIHRvIGluaXRpYWxpemUgdGhlIGRpc3BsYXkuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIERpc3BsYXkocGFyYW1ldGVycykge1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSBwYXJhbWV0ZXJzLnRhcmdldCwgX2EgPSBwYXJhbWV0ZXJzLndpZHRoLCB3aWR0aCA9IF9hID09PSB2b2lkIDAgPyAxIDogX2EsIF9iID0gcGFyYW1ldGVycy5oZWlnaHQsIGhlaWdodCA9IF9iID09PSB2b2lkIDAgPyAxIDogX2IsIHRpbGVXaWR0aCA9IHBhcmFtZXRlcnMudGlsZVdpZHRoLCB0aWxlSGVpZ2h0ID0gcGFyYW1ldGVycy50aWxlSGVpZ2h0LCByZXN0ID0gX19yZXN0KHBhcmFtZXRlcnMsIFtcInRhcmdldFwiLCBcIndpZHRoXCIsIFwiaGVpZ2h0XCIsIFwidGlsZVdpZHRoXCIsIFwidGlsZUhlaWdodFwiXSk7XHJcbiAgICAgICAgLy8gU2V0IHRoZSB0YXJnZXRcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICBpZiAodGhpcy50YXJnZXQuY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJwdW1wa2luLWNvbnRhaW5lclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmNsYXNzTmFtZSA9IFwicHVtcGtpbi1jb250YWluZXJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBlbGVtZW50IGZvciB0aGUgZGlzcGxheVxyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSBcInB1bXBraW4tZGlzcGxheVwiO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcbiAgICAgICAgLy8gU2V0IHRoZSBkaXNwbGF5IGRpbWVuc2lvbnNcclxuICAgICAgICB0aGlzLmRpbWVuc2lvbnMgPSB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfTtcclxuICAgICAgICB0aGlzLnRpbGVTaXplID0ge1xyXG4gICAgICAgICAgICB0aWxlV2lkdGg6ICh0aWxlV2lkdGgpID8gdGlsZVdpZHRoIDogMTYsXHJcbiAgICAgICAgICAgIHRpbGVIZWlnaHQ6ICh0aWxlSGVpZ2h0KSA/IHRpbGVIZWlnaHQgOiAodGlsZVdpZHRoKSA/IHRpbGVXaWR0aCA6IDE2XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBBZGQgc3R5bGUgdG8gdGhlIHBhZ2UgZm9yIHRoZSBkaXNwbGF5XHJcbiAgICAgICAgdGhpcy5hcHBseURlZmF1bHRTdHlsZXMoKTtcclxuICAgICAgICAvLyBBcHBlbmQgdG8gdGhlIGNvbnRhaW5lciBlbGVtZW50XHJcbiAgICAgICAgdGhpcy50YXJnZXQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcclxuICAgIH1cclxuICAgIDtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEaXNwbGF5LnByb3RvdHlwZSwgXCJ0aWxlU2l6ZVwiLCB7XHJcbiAgICAgICAgLyoqIFRpbGUgc2l6ZSAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGlsZVNpemU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdUaWxlU2l6ZSkge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbGVTaXplID0gbmV3VGlsZVNpemU7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IG5ld1RpbGVTaXplLnRpbGVIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIChfYSA9IHRoaXMudGlsZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5mb3JFYWNoKGZ1bmN0aW9uICh0aWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aWxlLnRpbGVXaWR0aCA9IG5ld1RpbGVTaXplLnRpbGVXaWR0aDtcclxuICAgICAgICAgICAgICAgIHRpbGUudGlsZUhlaWdodCA9IG5ld1RpbGVTaXplLnRpbGVIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB0aWxlLnBvc2l0aW9uID0gdGlsZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRTaXplKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgO1xyXG4gICAgO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERpc3BsYXkucHJvdG90eXBlLCBcImRpbWVuc2lvbnNcIiwge1xyXG4gICAgICAgIC8qKiBHZXQgb3Igc2V0IHRoZSBkaXNwbGF5IGRpbWVuc2lvbnMgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgd2lkdGg6IHRoaXMuX3dpZHRoLCBoZWlnaHQ6IHRoaXMuX2hlaWdodCB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3RGltZW5zaW9ucykge1xyXG4gICAgICAgICAgICBpZiAobmV3RGltZW5zaW9ucy53aWR0aCAhPT0gdGhpcy5fd2lkdGggJiYgbmV3RGltZW5zaW9ucy5oZWlnaHQgIT09IHRoaXMuX2hlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSBuZXdEaW1lbnNpb25zLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gbmV3RGltZW5zaW9ucy5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAvLyBSZXNldCB0aGUgZGlzcGxheSB0byBhY2NvbW9kYXRlIHRoZSBuZXcgc2l6ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxvY2F0ZURpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRTaXplKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb0NlbnRlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgO1xyXG4gICAgO1xyXG4gICAgLyoqIFJlc2V0IGRpc3BsYXkgZWxlbWVudCBzaXplICovXHJcbiAgICBEaXNwbGF5LnByb3RvdHlwZS5yZXNldFNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3dpZHRoICYmIHRoaXMuX2hlaWdodCAmJiB0aGlzLnRpbGVTaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IHRoaXMuX3dpZHRoICogdGhpcy50aWxlU2l6ZS50aWxlV2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLl9oZWlnaHQgKiB0aGlzLnRpbGVTaXplLnRpbGVIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKiBQb3NpdGlvbiB0byBjZW50ZXIgdGhlIGRpc3BsYXkgdmlldyBvbiAqL1xyXG4gICAgRGlzcGxheS5wcm90b3R5cGUuY2VudGVyRGlzcGxheSA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB4ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiB5ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNlbnRlclBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgIHk6IHlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb3ZlVG9DZW50ZXIoKTtcclxuICAgIH07XHJcbiAgICBEaXNwbGF5LnByb3RvdHlwZS5tb3ZlVG9DZW50ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2VudGVyUG9zaXRpb24pIHtcclxuICAgICAgICAgICAgdmFyIHhQZXJjZW50ID0gKHRoaXMuY2VudGVyUG9zaXRpb24ueCArIDAuNSkgLyB0aGlzLmRpbWVuc2lvbnMud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciB5UGVyY2VudCA9ICh0aGlzLmNlbnRlclBvc2l0aW9uLnkgKyAwLjUpIC8gdGhpcy5kaW1lbnNpb25zLmhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKFwiICsgLXhQZXJjZW50ICogMTAwICsgXCIlLFwiICsgLXlQZXJjZW50ICogMTAwICsgXCIlKVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKiBCdWlsZCB0aGUgYXJyYXkgb2YgdGlsZXMgYW5kIGF0dGFjaCB0aGVtIHRvIHRoZSBkaXNwbGF5ICovXHJcbiAgICBEaXNwbGF5LnByb3RvdHlwZS5hbGxvY2F0ZURpc3BsYXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAvLyBTdGFydCBhIGZyZXNoIHRpbGVzIGFycmF5XHJcbiAgICAgICAgaWYgKHRoaXMudGlsZXMpIHtcclxuICAgICAgICAgICAgLy8gRW1wdHkgZGlzcGxheSBpZiBpdCBoYXMgY29udGVudHMgYWxyZWFkeVxyXG4gICAgICAgICAgICB0aGlzLnRpbGVzLmZvckVhY2goZnVuY3Rpb24gKHRpbGUpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmVsZW1lbnQucmVtb3ZlQ2hpbGQodGlsZS5lbGVtZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGlsZXMgPSBbXTtcclxuICAgICAgICAvLyBHZW5lcmF0ZSB0aWxlc1xyXG4gICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgdGhpcy5faGVpZ2h0OyB5KyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB0aGlzLl93aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBNYWtlIGEgbmV3IHRpbGVcclxuICAgICAgICAgICAgICAgIHZhciBuZXdUaWxlID0gbmV3IFRpbGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgfSwgeyB4OiB4LCB5OiB5IH0sIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgLy8gQWRkIGl0IHRvIHRoZSBsaXN0IG9mIHRpbGVzXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVzLnB1c2gobmV3VGlsZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBBcHBlbmQgdG8gdGhlIGFjdHVhbCBkaXNwbGF5XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGlsZS5lbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICA7XHJcbiAgICAvKiogR2V0IHRoZSBkaXNwbGF5IHRpbGUgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvblxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHggLSBQb3NpdGlvbiBmcm9tIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIGRpc3BsYXlcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gUG9zaXRpb24gZnJvbSB0aGUgdG9wIG9mIHRoZSBkaXNwbGF5XHJcbiAgICAqL1xyXG4gICAgRGlzcGxheS5wcm90b3R5cGUuZ2V0VGlsZSA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICAgICAgaWYgKHggPj0gMCAmJiB4IDwgdGhpcy5fd2lkdGggJiYgeSA+PSAwICYmIHkgPCB0aGlzLl9oZWlnaHQpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0geCArIHkgKiB0aGlzLl93aWR0aDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGlsZXNbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgO1xyXG4gICAgLyoqIFRha2UgaW5wdXQgYW5kIGZvcm1hdCBpbnRvIFRpbGVPcHRpb25zICovXHJcbiAgICBEaXNwbGF5LnByb3RvdHlwZS5mb3JtYXRUaWxlT3B0aW9ucyA9IGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgY29udGVudDogaW5wdXQgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5wdXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4geyBjb250ZW50OiBpbnB1dCB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKiogU2V0IGRldGFpbHMgZm9yIHRoZSBzcGVjaWZpZWQgdGlsZSAqL1xyXG4gICAgRGlzcGxheS5wcm90b3R5cGUuc2V0VGlsZSA9IGZ1bmN0aW9uICh4LCB5LCBuZXdPcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHRpbGUgPSB0aGlzLmdldFRpbGUoeCwgeSk7XHJcbiAgICAgICAgaWYgKHRpbGUpIHtcclxuICAgICAgICAgICAgdGlsZS5zZXRPcHRpb25zKHRoaXMuZm9ybWF0VGlsZU9wdGlvbnMobmV3T3B0aW9ucykpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICA7XHJcbiAgICAvKiogVXBkYXRlIGRldGFpbHMgZm9yIHRoZSBzcGVjaWZpZWQgdGlsZSwgcHJlc2VydmluZyBldmVyeSB1bnNldCBwcm9wZXJ0eS4gKi9cclxuICAgIERpc3BsYXkucHJvdG90eXBlLnVwZGF0ZVRpbGUgPSBmdW5jdGlvbiAoeCwgeSwgbmV3T3B0aW9ucykge1xyXG4gICAgICAgIHZhciB0aWxlID0gdGhpcy5nZXRUaWxlKHgsIHkpO1xyXG4gICAgICAgIGlmICh0aWxlKSB7XHJcbiAgICAgICAgICAgIHRpbGUudXBkYXRlT3B0aW9ucyh0aGlzLmZvcm1hdFRpbGVPcHRpb25zKG5ld09wdGlvbnMpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgO1xyXG4gICAgLyoqIEdpdmVuIHRoZSBzaXplIG9mIHRoZSB0YXJnZXQgY29udGFpbmVyLCBhbmQgdGhlIHRpbGUgc2l6ZSwgZGV0ZXJtaW5lIHRoZSBudW1iZXIgb2YgdGlsZXMgbmVlZGVkLiAqL1xyXG4gICAgRGlzcGxheS5wcm90b3R5cGUuY2FsY3VsYXRlRGltZW5zaW9ucyA9IGZ1bmN0aW9uIChjbGllbnRSZWN0KSB7XHJcbiAgICAgICAgaWYgKGNsaWVudFJlY3QgPT09IHZvaWQgMCkgeyBjbGllbnRSZWN0ID0gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7IH1cclxuICAgICAgICB2YXIgY2xpZW50V2lkdGggPSBNYXRoLmFicyhjbGllbnRSZWN0LnJpZ2h0IC0gY2xpZW50UmVjdC5sZWZ0KTtcclxuICAgICAgICB2YXIgY2xpZW50SGVpZ2h0ID0gTWF0aC5hYnMoY2xpZW50UmVjdC5ib3R0b20gLSBjbGllbnRSZWN0LnRvcCk7XHJcbiAgICAgICAgLy8gUm91bmQgZG93bjsgd2UgZG8gbm90IHdhbnQgcGFydGlhbCB0aWxlc1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBNYXRoLmZsb29yKGNsaWVudFdpZHRoIC8gdGhpcy50aWxlU2l6ZS50aWxlV2lkdGgpLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IE1hdGguZmxvb3IoY2xpZW50SGVpZ2h0IC8gdGhpcy50aWxlU2l6ZS50aWxlSGVpZ2h0KVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgO1xyXG4gICAgLyoqIEdpdmVuIHRoZSBzaXplIG9mIHRoZSB0YXJnZXQgY29udGFpbmVyLCBhbmQgdGhlIG51bWJlciBvZiB0aWxlcywgZGV0ZXJtaW5lIHRoZSB0aWxlIHNpemUgbmVlZGVkXHJcbiAgICAgKiAgVGhpcyBhc3N1bWVzIHNxdWFyZSB0aWxlcyBhcmUgZGVzaXJlZC5cclxuICAgICovXHJcbiAgICBEaXNwbGF5LnByb3RvdHlwZS5jYWxjdWxhdGVUaWxlU2l6ZSA9IGZ1bmN0aW9uIChjbGllbnRSZWN0KSB7XHJcbiAgICAgICAgaWYgKGNsaWVudFJlY3QgPT09IHZvaWQgMCkgeyBjbGllbnRSZWN0ID0gdGhpcy50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7IH1cclxuICAgICAgICB2YXIgY2xpZW50V2lkdGggPSBNYXRoLmFicyhjbGllbnRSZWN0LnJpZ2h0IC0gY2xpZW50UmVjdC5sZWZ0KTtcclxuICAgICAgICB2YXIgY2xpZW50SGVpZ2h0ID0gTWF0aC5hYnMoY2xpZW50UmVjdC5ib3R0b20gLSBjbGllbnRSZWN0LnRvcCk7XHJcbiAgICAgICAgLy8gVGhpcyBjb3VsZCBwb3RlbnRpYWxseSBnaXZlIGFic3VyZCByZXN1bHRzLCBzbyBnZXQgdGhlIFwibmFpdmUgZmlyc3QtZ3Vlc3NcIiBoZXJlXHJcbiAgICAgICAgdmFyIHNpemUgPSB7XHJcbiAgICAgICAgICAgIHRpbGVXaWR0aDogY2xpZW50V2lkdGggLyB0aGlzLmRpbWVuc2lvbnMud2lkdGgsXHJcbiAgICAgICAgICAgIHRpbGVIZWlnaHQ6IGNsaWVudEhlaWdodCAvIHRoaXMuZGltZW5zaW9ucy5oZWlnaHRcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIENob29zZSB0aGUgbG93ZXN0IG9mIHRoZSB0d28uIFRoaXMgaXMgdGhlIG1heGltdW0gc3F1YXJlIHRpbGUgc2l6ZSB0aGF0IHdpbGwgZml0IHRoZSBnaXZlbiBkaW1lbnNpb25zXHJcbiAgICAgICAgdmFyIG1heFRpbGVTaXplID0gTWF0aC5taW4oc2l6ZS50aWxlV2lkdGgsIHNpemUudGlsZUhlaWdodCk7XHJcbiAgICAgICAgLy8gRG9uJ3QgYm90aGVyIHJvdW5kaW5nOyBmb250cyBjYW4gYmUgcHJlY2lzZSBudW1iZXJzXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGlsZVdpZHRoOiBtYXhUaWxlU2l6ZSxcclxuICAgICAgICAgICAgdGlsZUhlaWdodDogbWF4VGlsZVNpemVcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIDtcclxuICAgIC8qKiBBZGQgdGhlIGRlZmF1bHQgc3R5bGVzIHRvIHRoZSBoZWFkIG9mIHRoZSBwYWdlLiAqL1xyXG4gICAgRGlzcGxheS5wcm90b3R5cGUuYXBwbHlEZWZhdWx0U3R5bGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzdHlsZXNJZCA9IFwicHVtcGtpbi1kZWZhdWx0LXN0eWxlc1wiO1xyXG4gICAgICAgIC8vIENoZWNrIHRvIG1ha2Ugc3VyZSB0aGUgc3R5bGVzIGFyZW4ndCBhbHJlYWR5IHByZXNlbnRcclxuICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHN0eWxlc0lkKSkge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIHN0eWxlIGVsZW1lbnRcclxuICAgICAgICAgICAgdmFyIHN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuICAgICAgICAgICAgc3R5bGVzLmlkID0gc3R5bGVzSWQ7XHJcbiAgICAgICAgICAgIHN0eWxlcy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG4gICAgICAgICAgICBzdHlsZXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgaGVhZCBvZiB0aGUgcGFnZVxyXG4gICAgICAgICAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQ7XHJcbiAgICAgICAgICAgIC8vIEZpbmQgdGhlIGZpcnN0IHN0eWxlIG9yIGxpbmsgZWxlbWVudCwgYW5kIGluc2VydCBpbiBmcm9udCBvZiBpdFxyXG4gICAgICAgICAgICB2YXIgZmlyc3RTdHlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzdHlsZSwgbGlua1wiKTtcclxuICAgICAgICAgICAgaGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVzLCBmaXJzdFN0eWxlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIERpc3BsYXk7XHJcbn0oKSk7XHJcbmV4cG9ydCBkZWZhdWx0IERpc3BsYXk7XHJcbjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RGlzcGxheS5qcy5tYXAiLCIvLyBEZWZhdWx0IHN0eWxpbmcgZm9yIHRoZSBkaXNwbGF5LiBUaGlzIGdldHMgaW5zZXJ0ZWQgaW50byB0aGUgZG9jdW1lbnQgaGVhZCwgYmVmb3JlIG90aGVyIHN0eWxlc2hlZXRzIChzbyB0aGF0IHlvdSBjYW4gb3ZlcnJpZGUgdGhlbSBpZiBkZXNpcmVkISlcclxudmFyIGNzcyA9IFwiXFxuLnB1bXBraW4tY29udGFpbmVyIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xcbiAgICBjb2xvcjogI2ZmZmZmZjtcXG59XFxuXFxuLnB1bXBraW4tZGlzcGxheSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICB0b3A6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxufVxcblxcbi5wdW1wa2luLXRpbGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxufVxcblxcbi5wdW1wa2luLXRpbGUgPiAqIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRvcDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gICAgei1pbmRleDogMTA7XFxufVxcblwiO1xyXG5leHBvcnQgZGVmYXVsdCBjc3M7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURpc3BsYXlTdHlsZS5qcy5tYXAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXHJcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn07XHJcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59O1xyXG52YXIgX19zcHJlYWRBcnJheXMgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXlzKSB8fCBmdW5jdGlvbiAoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxudmFyIGJhc2VDbGFzc05hbWUgPSBcInB1bXBraW4tdGlsZVwiO1xyXG4vKiogQ2xhc3MgdG8ga2VlcCB0cmFjayBvZiBlYWNoIGluZGl2aWR1YWwgdGlsZSBpbiB0aGUgZGlzcGxheSAqL1xyXG52YXIgVGlsZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFRpbGUodGlsZU9wdGlvbnMsIHBvc2l0aW9uLCB0aWxlU2l6ZSkge1xyXG4gICAgICAgIC8vIENyZWF0ZSBuZWNlc3NhcnkgZWxlbWVudHMgYW5kIGFwcGx5IGNsYXNzZXNcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChiYXNlQ2xhc3NOYW1lKTtcclxuICAgICAgICAvLyBTZXQgdGlsZSBjb250ZW50IGFuZCBjb2xvdXIgc2NoZW1lXHJcbiAgICAgICAgdmFyIF9hID0gdGlsZU9wdGlvbnMuY29udGVudCwgY29udGVudCA9IF9hID09PSB2b2lkIDAgPyAnJyA6IF9hLCBfYiA9IHRpbGVPcHRpb25zLmNvbG9yLCBjb2xvciA9IF9iID09PSB2b2lkIDAgPyAnJyA6IF9iLCBfYyA9IHRpbGVPcHRpb25zLmJhY2tncm91bmQsIGJhY2tncm91bmQgPSBfYyA9PT0gdm9pZCAwID8gJycgOiBfYywgX2QgPSB0aWxlT3B0aW9ucy5jbGFzc05hbWUsIGNsYXNzTmFtZSA9IF9kID09PSB2b2lkIDAgPyAnJyA6IF9kLCBfZSA9IHRpbGVPcHRpb25zLmNsYXNzTGlzdCwgY2xhc3NMaXN0ID0gX2UgPT09IHZvaWQgMCA/IFtdIDogX2UsIHJlc3QgPSBfX3Jlc3QodGlsZU9wdGlvbnMsIFtcImNvbnRlbnRcIiwgXCJjb2xvclwiLCBcImJhY2tncm91bmRcIiwgXCJjbGFzc05hbWVcIiwgXCJjbGFzc0xpc3RcIl0pO1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IGJhY2tncm91bmQ7XHJcbiAgICAgICAgaWYgKGNsYXNzTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0ID0gY2xhc3NMaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNldCB0aGUgdGlsZSBzaXplXHJcbiAgICAgICAgdGhpcy50aWxlV2lkdGggPSAodGlsZVNpemUgPT09IG51bGwgfHwgdGlsZVNpemUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRpbGVTaXplLnRpbGVXaWR0aCkgPyB0aWxlU2l6ZS50aWxlV2lkdGggOiAxNjtcclxuICAgICAgICB0aGlzLnRpbGVIZWlnaHQgPSAodGlsZVNpemUgPT09IG51bGwgfHwgdGlsZVNpemUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRpbGVTaXplLnRpbGVIZWlnaHQpID8gdGlsZVNpemUudGlsZUhlaWdodCA6IHRoaXMudGlsZVdpZHRoO1xyXG4gICAgICAgIC8vIFNldCB0aGUgdGlsZSBwb3NpdGlvblxyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgIH1cclxuICAgIDtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaWxlLnByb3RvdHlwZSwgXCJjb250ZW50XCIsIHtcclxuICAgICAgICAvKiogR2V0IG9yIHNldCB0aGUgdGlsZSBjb250ZW50cyAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0NvbnRlbnQpIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGNvbnRlbnRFbGVtZW50IGlmIGl0IGRvZXNuJ3QgYWxyZWFkeSBleGlzdFxyXG4gICAgICAgICAgICB0aGlzLmNvbmZpcm1Db250ZW50RWxlbWVudCgpO1xyXG4gICAgICAgICAgICAvLyBPbmx5IHVwZGF0ZSBpZiB0aGUgbmV3IGFuZCBvbGQgY29udGVudCBkb24ndCBtYXRjaFxyXG4gICAgICAgICAgICBpZiAodGhpcy5fY29udGVudCAhPT0gbmV3Q29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgY29udGVudCBpcyBhIHN0cmluZywganVzdCBhZGQgaXRcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRFbGVtZW50LmlubmVySFRNTCA9IG5ld0NvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBpdCBpcyBhbiBlbGVtZW50LCBlbXB0eSB0aGUgdGlsZSBhbmQgYXBwZW5kIHRoZSBuZXcgY29udGVudFxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuY29udGVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuY29udGVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3Q29udGVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50ID0gbmV3Q29udGVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaWxlLnByb3RvdHlwZSwgXCJiYWNrZ3JvdW5kXCIsIHtcclxuICAgICAgICAvKiogR2V0IG9yIHNldCB0aGUgYmFja2dyb3VuZCBjb2xvdXIgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tncm91bmQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdCYWNrZ3JvdW5kKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdCYWNrZ3JvdW5kICE9PSB0aGlzLl9iYWNrZ3JvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYWNrZ3JvdW5kID0gbmV3QmFja2dyb3VuZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBuZXdCYWNrZ3JvdW5kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbGUucHJvdG90eXBlLCBcImNvbG9yXCIsIHtcclxuICAgICAgICAvKiogR2V0IG9yIHNldCB0aGUgY29sb3IgY29sb3VyICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld2NvbG9yKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdjb2xvciAhPT0gdGhpcy5fY29sb3IpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbG9yID0gbmV3Y29sb3I7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuY29sb3IgPSBuZXdjb2xvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaWxlLnByb3RvdHlwZSwgXCJwb3NpdGlvblwiLCB7XHJcbiAgICAgICAgLyoqIEdldCBvciBzZXQgcG9zaXRpb24gKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAocG9zaXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBfX2Fzc2lnbih7fSwgcG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCA9IHBvc2l0aW9uLnggKiB0aGlzLnRpbGVXaWR0aCArIFwicHhcIjtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnRvcCA9IHBvc2l0aW9uLnkgKiB0aGlzLnRpbGVIZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbGUucHJvdG90eXBlLCBcInRpbGVXaWR0aFwiLCB7XHJcbiAgICAgICAgLyoqIEdldCBvciBzZXQgdGlsZSB3aWR0aCAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGlsZVdpZHRoO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3V2lkdGgpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGlsZVdpZHRoID0gbmV3V2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IG5ld1dpZHRoICsgXCJweFwiO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaWxlLnByb3RvdHlwZSwgXCJ0aWxlSGVpZ2h0XCIsIHtcclxuICAgICAgICAvKiogR2V0IG9yIHNldCB0aGUgdGlsZSBoZWlnaHQgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpbGVIZWlnaHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdIZWlnaHQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGlsZUhlaWdodCA9IG5ld0hlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArIFwicHhcIjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGlsZS5wcm90b3R5cGUsIFwiY2xhc3NOYW1lXCIsIHtcclxuICAgICAgICAvKiogR2V0IG9yIHNldCB0aGUgY2xhc3NuYW1lICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsYXNzTGlzdC5qb2luKFwiIFwiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0NsYXNzKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdDbGFzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QgPSBuZXdDbGFzcy5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbGUucHJvdG90eXBlLCBcImNsYXNzTGlzdFwiLCB7XHJcbiAgICAgICAgLyoqIEdldCBvciBzZXQgdGhlIGxpc3Qgb2YgY2xhc3NlcyAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19zcHJlYWRBcnJheXMoW2Jhc2VDbGFzc05hbWVdLCB0aGlzLl9jbGFzc0xpc3QpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3Q2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGFzc0xpc3QgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBPbmx5IGFkZC9yZW1vdmUgY2xhc3NlcyBpZiB0aGUgdHdvIGxpc3RzIGFyZSBhY3R1YWxseSBkaWZmZXJlbnRcclxuICAgICAgICAgICAgLy8gVGhpcyBpcyB1Z2x5LCBidXQgY2hhbmdpbmcgdGhlIERPTSBpcyBtb3JlIGV4cGVuc2l2ZSB0aGFuIHRoaXMgaXMuXHJcbiAgICAgICAgICAgIGlmIChuZXdDbGFzc0xpc3QubGVuZ3RoICE9PSB0aGlzLl9jbGFzc0xpc3QubGVuZ3RoIHx8XHJcbiAgICAgICAgICAgICAgICAhbmV3Q2xhc3NMaXN0LmV2ZXJ5KGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBfdGhpcy5fY2xhc3NMaXN0LmluY2x1ZGVzKG5hbWUpOyB9KSB8fFxyXG4gICAgICAgICAgICAgICAgIXRoaXMuX2NsYXNzTGlzdC5ldmVyeShmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gbmV3Q2xhc3NMaXN0LmluY2x1ZGVzKG5hbWUpOyB9KSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NsYXNzTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gdGhpcy5lbGVtZW50LmNsYXNzTGlzdCkucmVtb3ZlLmFwcGx5KF9hLCB0aGlzLl9jbGFzc0xpc3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2xhc3NMaXN0ID0gbmV3Q2xhc3NMaXN0LmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4geC50cmltKCkgJiYgeCAhPT0gYmFzZUNsYXNzTmFtZTsgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3Q2xhc3NMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdXNpbmcgdGhlIGdldHRlciwgdG8gZW5zdXJlIGJhc2VDbGFzc05hbWUgaXMgc3RpbGwgb24gdGhlIGxpc3QuXHJcbiAgICAgICAgICAgICAgICAgICAgKF9iID0gdGhpcy5lbGVtZW50LmNsYXNzTGlzdCkuYWRkLmFwcGx5KF9iLCB0aGlzLmNsYXNzTGlzdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICAvKiogU2V0IG9wdGlvbnMgZm9yIHRoZSB0aWxlICovXHJcbiAgICBUaWxlLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gKG5ld09wdGlvbnMpIHtcclxuICAgICAgICB2YXIgX2EgPSBuZXdPcHRpb25zLmNvbnRlbnQsIGNvbnRlbnQgPSBfYSA9PT0gdm9pZCAwID8gXCJcIiA6IF9hLCBfYiA9IG5ld09wdGlvbnMuYmFja2dyb3VuZCwgYmFja2dyb3VuZCA9IF9iID09PSB2b2lkIDAgPyBcIlwiIDogX2IsIF9jID0gbmV3T3B0aW9ucy5jb2xvciwgY29sb3IgPSBfYyA9PT0gdm9pZCAwID8gXCJcIiA6IF9jLCBfZCA9IG5ld09wdGlvbnMuY2xhc3NOYW1lLCBjbGFzc05hbWUgPSBfZCA9PT0gdm9pZCAwID8gXCJcIiA6IF9kLCBjbGFzc0xpc3QgPSBuZXdPcHRpb25zLmNsYXNzTGlzdDtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IGJhY2tncm91bmQ7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIGlmIChjbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QgPSBjbGFzc0xpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgb3B0aW9ucyBmb3IgdGhlIHRpbGVcclxuICAgICAqL1xyXG4gICAgVGlsZS5wcm90b3R5cGUudXBkYXRlT3B0aW9ucyA9IGZ1bmN0aW9uIChuZXdPcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIGNvbnRlbnQgPSBuZXdPcHRpb25zLmNvbnRlbnQsIGJhY2tncm91bmQgPSBuZXdPcHRpb25zLmJhY2tncm91bmQsIGNvbG9yID0gbmV3T3B0aW9ucy5jb2xvciwgY2xhc3NOYW1lID0gbmV3T3B0aW9ucy5jbGFzc05hbWUsIGNsYXNzTGlzdCA9IG5ld09wdGlvbnMuY2xhc3NMaXN0O1xyXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGJhY2tncm91bmQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gYmFja2dyb3VuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb2xvciAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjbGFzc0xpc3QgJiYgY2xhc3NMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QgPSBjbGFzc0xpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBjbGFzc05hbWUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKiBDaGVjayBpZiBhIGNvbnRlbnRFbGVtZW50IGV4aXN0cywgYW5kIGlmIGl0IGRvZXNuJ3QsIGFkZCBpdCAqL1xyXG4gICAgVGlsZS5wcm90b3R5cGUuY29uZmlybUNvbnRlbnRFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jb250ZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFRpbGU7XHJcbn0oKSk7XHJcbmV4cG9ydCBkZWZhdWx0IFRpbGU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRpbGUuanMubWFwIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbi8qKiBFdmVudCBtYW5hZ2VyLCB0byBrZWVwIHRyYWNrIG9mIHR1cm5zICovXHJcbnZhciBFdmVudE1hbmFnZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBFdmVudE1hbmFnZXIocGFyYW1ldGVycykge1xyXG4gICAgICAgIGlmICghcGFyYW1ldGVycykge1xyXG4gICAgICAgICAgICBwYXJhbWV0ZXJzID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIDtcclxuICAgICAgICB2YXIgX2EgPSBwYXJhbWV0ZXJzLnR5cGUsIHR5cGUgPSBfYSA9PT0gdm9pZCAwID8gXCJzaW1wbGVcIiA6IF9hO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xyXG4gICAgICAgIHRoaXMudGltZSA9IDA7XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICAvKiogQWRkIGFuIGV2ZW50IHRvIHRoZSBxdWV1ZSAqL1xyXG4gICAgRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoYWRkZWRFdmVudCkge1xyXG4gICAgICAgIHZhciBldmVudCA9IHt9O1xyXG4gICAgICAgIC8vIERldGVybWluZSB0eXBlIG9mIHRoZSBpbnB1dCwgYW5kIGhhbmRsZSBhY2NvcmRpbmdseVxyXG4gICAgICAgIGlmIChhZGRlZEV2ZW50IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgZXZlbnQuY2FsbGJhY2sgPSBhZGRlZEV2ZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChcImFjdFwiIGluIGFkZGVkRXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuYWN0b3IgPSBhZGRlZEV2ZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihldmVudCwgYWRkZWRFdmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFzc3VtZSByZXBlYXRpbmcgaWYgYW4gYWN0b3Igd2FzIHByb3ZpZGVkXHJcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudC5yZXBlYXRzID09PSBcInVuZGVmaW5lZFwiICYmIGV2ZW50LmFjdG9yKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnJlcGVhdHMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBDb21wbGV4IGV2ZW50IHF1ZXVlIHVzZXMgZGVsYXkgdGltZSBhIGJpdCBiZXR0ZXJcclxuICAgICAgICBpZiAodGhpcy50eXBlID09PSBcImNvbXBsZXhcIikge1xyXG4gICAgICAgICAgICBpZiAoIWV2ZW50LmRlbGF5KSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5kZWxheSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHNjaGVkdWxlRm9yID0gZXZlbnQuZGVsYXkgKyB0aGlzLnRpbWU7XHJcbiAgICAgICAgICAgIC8vIEluc2VydCB0aGUgZXZlbnQgYXQgdGhlIGFwcHJvcHJpYXRlIHRpbWVcclxuICAgICAgICAgICAgaWYgKHRoaXMucXVldWUubGVuZ3RoID09PSAwIHx8IHRoaXMucXVldWVbdGhpcy5xdWV1ZS5sZW5ndGggLSAxXS50aW1lIDw9IHNjaGVkdWxlRm9yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXVlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lOiBzY2hlZHVsZUZvclxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVldWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2NoZWR1bGVGb3IgPCB0aGlzLnF1ZXVlW2ldLnRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWV1ZS5zcGxpY2UoaSwgMCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogc2NoZWR1bGVGb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gU2ltcGxlLCBubyB3ZWlyZCB0aW1lIHNoaXRcclxuICAgICAgICAgICAgdGhpcy5xdWV1ZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgIHRpbWU6IDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKiBSdW4gdGhlIG5leHQgZXZlbnQgKi9cclxuICAgIEV2ZW50TWFuYWdlci5wcm90b3R5cGUuYWR2YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGlzRXZlbnQ7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbmZpcm0gaWYgdGhlcmUgaXMgYW55dGhpbmcgaW4gdGhlIHF1ZXVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnF1ZXVlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXZlbnQgcXVldWUgaXMgZW1wdHkuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNFdmVudCA9IHRoaXMucXVldWUuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSB0aW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IHRoaXNFdmVudC50aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiByZXBlYXRzIGlzIGEgbnVtYmVyLCByZWR1Y2UgaXQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc0V2ZW50LmV2ZW50LnJlcGVhdHMgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNFdmVudC5ldmVudC5yZXBlYXRzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgaXQgbmVlZHMgdG8gcmVwZWF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzRXZlbnQuZXZlbnQucmVwZWF0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmUtYWRkIHRvIHRoZSBxdWV1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGQodGhpc0V2ZW50LmV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXNFdmVudC5ldmVudC5jYWxsYmFjaykgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXNFdmVudC5ldmVudC5jYWxsYmFjaygpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzRXZlbnQuZXZlbnQuYWN0b3IpIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzRXZlbnQuZXZlbnQuYWN0b3IuYWN0KCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBSZW1vdmUgYWN0b3IgZnJvbSB0aGUgZXZlbnQgcXVldWUgKi9cclxuICAgIEV2ZW50TWFuYWdlci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGFjdG9yKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgbWF0Y2hlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMucXVldWUuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5ldmVudC5hY3RvciA9PT0gYWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIG1hdGNoZXMucHVzaChpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBSZXZlcnNlIG1hdGNoZXMgKHdvcmsgZnJvbSB0aGUgZW5kIGZpcnN0KVxyXG4gICAgICAgIG1hdGNoZXMucmV2ZXJzZSgpO1xyXG4gICAgICAgIC8vIFJlbW92ZSBlYWNoIG1hdGNoXHJcbiAgICAgICAgbWF0Y2hlcy5mb3JFYWNoKGZ1bmN0aW9uIChtYXRjaCkge1xyXG4gICAgICAgICAgICBfdGhpcy5xdWV1ZS5zcGxpY2UobWF0Y2gsIDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudE1hbmFnZXIucHJvdG90eXBlLCBcImxlbmd0aFwiLCB7XHJcbiAgICAgICAgLyoqIERldGVybWluZSB0aGUgbnVtYmVyIG9mIHF1ZXVlZCBldmVudHMgaW4gdGhlIHF1ZXVlLiAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZS5sZW5ndGg7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIEV2ZW50TWFuYWdlcjtcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgRXZlbnRNYW5hZ2VyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1FdmVudE1hbmFnZXIuanMubWFwIiwiLyoqIEZpZWxkIG9mIHZpZXcgKi9cclxudmFyIEZPViA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKiBBY2NlcHRzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIGEgbG9jYXRpb24gaXMgc2VldGhyb3VnaCAqL1xyXG4gICAgZnVuY3Rpb24gRk9WKGNhblNlZSwgcmFuZ2UpIHtcclxuICAgICAgICB0aGlzLmNhblNlZSA9IGNhblNlZTtcclxuICAgICAgICB0aGlzLnJhbmdlID0gcmFuZ2UgPyByYW5nZSA6IDg7XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICAvKiogRG8gdGhlIEZPViBjYWxjdWxhdGlvbiAqL1xyXG4gICAgRk9WLnByb3RvdHlwZS5sb29rID0gZnVuY3Rpb24gKHBvc2l0aW9uLCBsb29rUmFuZ2VPdmVycmlkZSkge1xyXG4gICAgICAgIHZhciByYW5nZSA9IChsb29rUmFuZ2VPdmVycmlkZSkgPyBsb29rUmFuZ2VPdmVycmlkZSA6IHRoaXMucmFuZ2U7XHJcbiAgICAgICAgLy8gU2VlIHRoZSBzdGFydGluZyBsb2NhdGlvbiAoaG9vcmF5ISBHcmVhdCBzdGFydClcclxuICAgICAgICB0aGlzLmNhblNlZShwb3NpdGlvbik7XHJcbiAgICAgICAgLy8gY29uc3QgbG9va1RpbGVzOkFycmF5PFRpbGU+ID0gW107XHJcbiAgICAgICAgdmFyIHNoYWRvd3MgPSBbXTtcclxuICAgICAgICB2YXIgbmV3U2hhZG93cyA9IFtdO1xyXG4gICAgICAgIC8vIEZyb20gbmVhcmJ5IHRvIGZhciBhd2F5XHJcbiAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgIHZhciBqID0gMDtcclxuICAgICAgICBmb3IgKHZhciBkaXN0YW5jZSA9IDE7IGRpc3RhbmNlIDw9IHJhbmdlOyBkaXN0YW5jZSsrKSB7XHJcbiAgICAgICAgICAgIC8vIEdldCBzcXVhcmUgc2hlbGwgYXJvdW5kIHBvc2l0aW9uXHJcbiAgICAgICAgICAgIGZvciAodmFyIHNpZGUgPSAwOyBzaWRlIDwgNDsgc2lkZSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBlZGdlID0gLWRpc3RhbmNlOyBlZGdlIDw9IGRpc3RhbmNlOyBlZGdlKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2lkZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gZWRnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaiA9IGRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzaWRlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGogPSBlZGdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNpZGUgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGVkZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGogPSAtZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqID0gZWRnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IC1kaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvb2tQb3MgPSBbcG9zaXRpb25bMF0gKyBpLCBwb3NpdGlvblsxXSArIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXN0ID0gdGhpcy5kaXN0YW5jZShwb3NpdGlvbiwgbG9va1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT3V0IG9mIHJhbmdlPyBTa2lwLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0ID4gcmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEluIHNoYWRvd3M/IFNraXAuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFuZ2xlVG8gPSB0aGlzLmFuZ2xlVG8ocG9zaXRpb24sIGxvb2tQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhbmd1bGFyU2l6ZSA9IHRoaXMuYW5ndWxhclNpemUocG9zaXRpb24sIGxvb2tQb3MpIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5TaGFkb3dzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJblNoYWRvd3MoYW5nbGVUbywgc2hhZG93cykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0luU2hhZG93cyhhbmdsZVRvICsgYW5ndWxhclNpemUsIHNoYWRvd3MpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNJblNoYWRvd3MoYW5nbGVUbyAtIGFuZ3VsYXJTaXplLCBzaGFkb3dzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpblNoYWRvd3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBOb3csIHRlc3QgaWYgd2UgY2FuIHNlZSB0aHJvdWdoIHRoZSB0aWxlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluU2hhZG93cyB8fCAhdGhpcy5jYW5TZWUobG9va1BvcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3F1YXJlIGlzIG9wYXF1ZSEgQWRkIGl0cyBzaGFkb3dcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2hhZG93cy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0QW5nbGU6IGFuZ2xlVG8gLSBhbmd1bGFyU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZEFuZ2xlOiBhbmdsZVRvICsgYW5ndWxhclNpemVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEFkZCBuZXdTaGFkb3dzIHRvIHNoYWRvd3NcclxuICAgICAgICAgICAgd2hpbGUgKG5ld1NoYWRvd3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gc2hhZG93cy5wdXNoKG5ld1NoYWRvd3MucG9wKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21iaW5lU2hhZG93KHNoYWRvd3MsIG5ld1NoYWRvd3MucG9wKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHdlIHNob3VsZCBjYWxsIGl0IHF1aXRzXHJcbiAgICAgICAgICAgIGlmIChzaGFkb3dzLmxlbmd0aCA9PT0gMSAmJiBzaGFkb3dzWzBdLmVuZEFuZ2xlIC0gc2hhZG93c1swXS5zdGFydEFuZ2xlID49IDM2MCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIDtcclxuICAgIC8qKiBHZXQgYW5nbGUgYSB0aWxlIHJlc2lkZXMgaW5cclxuICAgICAqIFRoaXMgcmFuZ2VzIGZyb20gLTE4MCB0byAxODAsIHNvIGJlIGNhcmVmdWxcclxuICAgICovXHJcbiAgICBGT1YucHJvdG90eXBlLmFuZ2xlVG8gPSBmdW5jdGlvbiAoc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgeSA9IGVuZFBvc2l0aW9uWzFdIC0gc3RhcnRQb3NpdGlvblsxXTtcclxuICAgICAgICB2YXIgeCA9IGVuZFBvc2l0aW9uWzBdIC0gc3RhcnRQb3NpdGlvblswXTtcclxuICAgICAgICB2YXIgYW5nbGUgPSAxODAgKiBNYXRoLmF0YW4yKHksIHgpIC8gTWF0aC5QSTtcclxuICAgICAgICByZXR1cm4gKGFuZ2xlID49IDApID8gYW5nbGUgOiBhbmdsZSArIDM2MDtcclxuICAgIH07XHJcbiAgICA7XHJcbiAgICAvKiogR2V0IGFuZ3VsYXIgc2l6ZSBvZiBhIHNxdWFyZSAqL1xyXG4gICAgRk9WLnByb3RvdHlwZS5hbmd1bGFyU2l6ZSA9IGZ1bmN0aW9uIChzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbikge1xyXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IHRoaXMuZGlzdGFuY2Uoc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pO1xyXG4gICAgICAgIHJldHVybiAzNjAgKiBNYXRoLmF0YW4oMSAvICgyICogZGlzdGFuY2UpKSAvIE1hdGguUEk7XHJcbiAgICB9O1xyXG4gICAgO1xyXG4gICAgLyoqIEdldCBkaXN0YW5jZSAqL1xyXG4gICAgRk9WLnByb3RvdHlwZS5kaXN0YW5jZSA9IGZ1bmN0aW9uIChzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coKGVuZFBvc2l0aW9uWzFdIC0gc3RhcnRQb3NpdGlvblsxXSksIDIpICsgTWF0aC5wb3coKGVuZFBvc2l0aW9uWzBdIC0gc3RhcnRQb3NpdGlvblswXSksIDIpKTtcclxuICAgIH07XHJcbiAgICAvKiogQ2hlY2sgaWYgaW4gc2hhZG93cyAqL1xyXG4gICAgRk9WLnByb3RvdHlwZS5pc0luU2hhZG93cyA9IGZ1bmN0aW9uIChhbmdsZSwgc2hhZG93cykge1xyXG4gICAgICAgIHZhciBuZWdBbmdsZSA9IGFuZ2xlIC0gMzYwO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgc2hhZG93c18xID0gc2hhZG93czsgX2kgPCBzaGFkb3dzXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzaGFkb3cgPSBzaGFkb3dzXzFbX2ldO1xyXG4gICAgICAgICAgICBpZiAoKGFuZ2xlIDw9IHNoYWRvdy5lbmRBbmdsZSAmJiBhbmdsZSA+PSBzaGFkb3cuc3RhcnRBbmdsZSkgfHwgKG5lZ0FuZ2xlIDw9IHNoYWRvdy5lbmRBbmdsZSAmJiBuZWdBbmdsZSA+PSBzaGFkb3cuc3RhcnRBbmdsZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcbiAgICAvKiogQWRkIGEgc2hhZG93IHRvIHRoZSBzaGFkb3cgYXJyYXkgKi9cclxuICAgIEZPVi5wcm90b3R5cGUuY29tYmluZVNoYWRvdyA9IGZ1bmN0aW9uIChzaGFkb3dzLCBuZXdTaGFkb3cpIHtcclxuICAgICAgICB2YXIgb3ZlckxhcEFyciA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2hhZG93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc2hhZG93ID0gc2hhZG93c1tpXTtcclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhleSBvdmVybGFwXHJcbiAgICAgICAgICAgIGlmIChuZXdTaGFkb3cuc3RhcnRBbmdsZSA8IHNoYWRvdy5lbmRBbmdsZSAmJiBuZXdTaGFkb3cuZW5kQW5nbGUgPiBzaGFkb3cuc3RhcnRBbmdsZSkge1xyXG4gICAgICAgICAgICAgICAgbmV3U2hhZG93LnN0YXJ0QW5nbGUgPSBNYXRoLm1pbihzaGFkb3cuc3RhcnRBbmdsZSwgbmV3U2hhZG93LnN0YXJ0QW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgbmV3U2hhZG93LmVuZEFuZ2xlID0gTWF0aC5tYXgoc2hhZG93LmVuZEFuZ2xlLCBuZXdTaGFkb3cuZW5kQW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgb3ZlckxhcEFyci5wdXNoKGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvdmVyTGFwQXJyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIG1haW5TaGFkb3cgPSBzaGFkb3dzW292ZXJMYXBBcnIuc2hpZnQoKV07XHJcbiAgICAgICAgICAgIG1haW5TaGFkb3cuc3RhcnRBbmdsZSA9IG5ld1NoYWRvdy5zdGFydEFuZ2xlO1xyXG4gICAgICAgICAgICBtYWluU2hhZG93LmVuZEFuZ2xlID0gbmV3U2hhZG93LmVuZEFuZ2xlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gb3ZlckxhcEFyci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgc2hhZG93cy5zcGxpY2Uob3ZlckxhcEFycltpXSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNoYWRvd3MucHVzaChuZXdTaGFkb3cpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gRk9WO1xyXG59KCkpO1xyXG5leHBvcnQgZGVmYXVsdCBGT1Y7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZPVi5qcy5tYXAiLCJleHBvcnQgeyBkZWZhdWx0IGFzIERpc3BsYXkgfSBmcm9tICcuL2Rpc3BsYXkvRGlzcGxheS5qcyc7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRXZlbnRNYW5hZ2VyIH0gZnJvbSAnLi9ldmVudC9FdmVudE1hbmFnZXIuanMnO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFJhbmRvbSB9IGZyb20gJy4vcmFuZG9tL1JhbmRvbS5qcyc7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGF0aEZpbmRlciB9IGZyb20gJy4vcGF0aGZpbmRlci9QYXRoRmluZGVyLmpzJztcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBGT1YgfSBmcm9tICcuL2Zvdi9GT1YuanMnO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFdGQyB9IGZyb20gJy4vd2ZjL1dGQy5qcyc7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsInZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59O1xyXG52YXIgX19zcHJlYWRBcnJheXMgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXlzKSB8fCBmdW5jdGlvbiAoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuLyoqIFBhdGhmaW5kZXIgdG8gZGV0ZXJtaW5lIGhvdyB0byB0cmF2ZWwgZnJvbSBvbmUgcG9pbnQgdG8gYW5vdGhlciAqL1xyXG52YXIgUGF0aEZpbmRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFBhdGhGaW5kZXIocGFyYW1ldGVycykge1xyXG4gICAgICAgIHZhciBjYW5QYXNzID0gcGFyYW1ldGVycy5jYW5QYXNzLCBtZXRyaWMgPSBwYXJhbWV0ZXJzLm1ldHJpYywgbWF4SXRlcmF0aW9ucyA9IHBhcmFtZXRlcnMubWF4SXRlcmF0aW9ucywgd2VpZ2h0ID0gcGFyYW1ldGVycy53ZWlnaHQsIHJlc3QgPSBfX3Jlc3QocGFyYW1ldGVycywgW1wiY2FuUGFzc1wiLCBcIm1ldHJpY1wiLCBcIm1heEl0ZXJhdGlvbnNcIiwgXCJ3ZWlnaHRcIl0pO1xyXG4gICAgICAgIHRoaXMuY2FuUGFzcyA9IGNhblBhc3M7XHJcbiAgICAgICAgaWYgKCFtZXRyaWMpIHtcclxuICAgICAgICAgICAgLy8gRGVmYXVsdCBtZXRyaWMgaXMgTWFuaGF0dGFuIG1ldHJpYywgaWYgbm9uZSBwcm92aWRlZFxyXG4gICAgICAgICAgICBtZXRyaWMgPSBmdW5jdGlvbiAocG9zaXRpb24xLCBwb3NpdGlvbjIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyhwb3NpdGlvbjJbMV0gLSBwb3NpdGlvbjFbMV0pICsgTWF0aC5hYnMocG9zaXRpb24yWzBdIC0gcG9zaXRpb24xWzBdKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF3ZWlnaHQpIHtcclxuICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBldmVyeXRoaW5nIGJlaW5nIGxlbmd0aCBvZiAxXHJcbiAgICAgICAgICAgIHdlaWdodCA9IGZ1bmN0aW9uIChwb3NpdGlvbikgeyByZXR1cm4gMTsgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXhJdGVyYXRpb25zID0gbWF4SXRlcmF0aW9ucztcclxuICAgICAgICB0aGlzLm1ldHJpYyA9IG1ldHJpYztcclxuICAgICAgICB0aGlzLndlaWdodCA9IHdlaWdodDtcclxuICAgIH1cclxuICAgIC8qKiBGaW5kIHJvdXRlIGZyb20gc3RhcnRQb3NpdGlvbiB0byBlbmRQb3NpdGlvbiwgdmlhIEEqICovXHJcbiAgICBQYXRoRmluZGVyLnByb3RvdHlwZS5maW5kUGF0aCA9IGZ1bmN0aW9uIChzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbiwgb3J0aG9nb25hbE9ubHkpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChvcnRob2dvbmFsT25seSA9PT0gdm9pZCAwKSB7IG9ydGhvZ29uYWxPbmx5ID0gZmFsc2U7IH1cclxuICAgICAgICB2YXIgcm91dGUgPSBbXTtcclxuICAgICAgICAvLyBMaW1pdCB0aGUgbG9vcCBzbyBpdCBkb2Vzbid0IGJyZWFrIHRoaW5nc1xyXG4gICAgICAgIHZhciBtYXhJdGVyYXRpb25zID0gKHRoaXMubWF4SXRlcmF0aW9ucykgPyB0aGlzLm1heEl0ZXJhdGlvbnMgOiA0MCAqIHRoaXMubWV0cmljKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKTtcclxuICAgICAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgbGlzdCwgYW5kIGFkZCB0aGUgc3RhcnQgdG8gaXRcclxuICAgICAgICB2YXIgY2xvc2VkTGlzdCA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IF9fc3ByZWFkQXJyYXlzKHN0YXJ0UG9zaXRpb24pLFxyXG4gICAgICAgICAgICAgICAgc3RlcHM6IDAsXHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZUZyb21Hb2FsOiB0aGlzLm1ldHJpYyhzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbiksXHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c0xvY2F0aW9uOiBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgICAgIHZhciBvcGVuTGlzdCA9IFtdO1xyXG4gICAgICAgIC8vIEhhbmRsZSBkaWFnb25hbHNcclxuICAgICAgICB2YXIgc3RlcFNpemVBcnIgPSBbMCwgMSwgMS4yXTtcclxuICAgICAgICAvLyBGaW5kIGEgcGF0aFxyXG4gICAgICAgIHdoaWxlIChpdGVyYXRpb25zIDwgbWF4SXRlcmF0aW9ucyAmJlxyXG4gICAgICAgICAgICAhdGhpcy5jb250YWlucyhjbG9zZWRMaXN0LCBlbmRQb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgaXRlcmF0aW9ucysrO1xyXG4gICAgICAgICAgICAvLyBFeHBhbmQgdGhlIG9wZW4gbGlzdFxyXG4gICAgICAgICAgICBjbG9zZWRMaXN0LmZvckVhY2goZnVuY3Rpb24gKGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gLTE7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gLTE7IGogPCAyOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ydGhvZ29uYWxPbmx5ICYmIGkgIT09IDAgJiYgaiAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1Bvc2l0aW9uID0gW2xvY2F0aW9uLnBvc2l0aW9uWzBdICsgaSwgbG9jYXRpb24ucG9zaXRpb25bMV0gKyBqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBjb3N0IC8gc2l6ZSBvZiBzdGVwIGludG8gdGhlIHNxdWFyZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcFNpemUgPSBzdGVwU2l6ZUFycltNYXRoLmFicyhpKSArIE1hdGguYWJzKGopXSAqIF90aGlzLndlaWdodChuZXdQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMuY2FuUGFzcyhuZXdQb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbkNsb3NlZExpc3RBbHJlYWR5ID0gX3RoaXMuZ2V0TG9jYXRpb24oY2xvc2VkTGlzdCwgbmV3UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5PcGVuTGlzdEFscmVhZHkgPSBfdGhpcy5nZXRMb2NhdGlvbihvcGVuTGlzdCwgbmV3UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOZXcgcG9zaXRpb24gaXMgaW4gbmVpdGhlciBsaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW5DbG9zZWRMaXN0QWxyZWFkeSAmJiAhaW5PcGVuTGlzdEFscmVhZHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5MaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBuZXdQb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwczogbG9jYXRpb24uc3RlcHMgKyBzdGVwU2l6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZUZyb21Hb2FsOiBfdGhpcy5tZXRyaWMobmV3UG9zaXRpb24sIGVuZFBvc2l0aW9uKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0xvY2F0aW9uOiBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcG9zaXRpb24gaXMgYWxyZWFkeSBpbiB0aGUgbGlzdCwgYWRqdXN0IHRvIGJlIHdoaWNoZXZlciB2ZXJzaW9uIGlzIHNob3J0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbkNsb3NlZExpc3RBbHJlYWR5ICYmIGluQ2xvc2VkTGlzdEFscmVhZHkuc3RlcHMgPiBsb2NhdGlvbi5zdGVwcyArIHN0ZXBTaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5DbG9zZWRMaXN0QWxyZWFkeS5zdGVwcyA9IGxvY2F0aW9uLnN0ZXBzICsgc3RlcFNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5DbG9zZWRMaXN0QWxyZWFkeS5wcmV2aW91c0xvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5PcGVuTGlzdEFscmVhZHkgJiYgaW5PcGVuTGlzdEFscmVhZHkuc3RlcHMgPiBsb2NhdGlvbi5zdGVwcyArIHN0ZXBTaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5PcGVuTGlzdEFscmVhZHkuc3RlcHMgPSBsb2NhdGlvbi5zdGVwcyArIHN0ZXBTaXplO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluT3Blbkxpc3RBbHJlYWR5LnByZXZpb3VzTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIFNvcnQgdGhlIG9wZW4gbGlzdCAoaGlnaGVzdCAtLT4gbG93ZXN0KVxyXG4gICAgICAgICAgICBvcGVuTGlzdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiAoYi5zdGVwcyArIGIuZGlzdGFuY2VGcm9tR29hbCkgLSAoYS5zdGVwcyArIGEuZGlzdGFuY2VGcm9tR29hbCk7IH0pO1xyXG4gICAgICAgICAgICAvLyBQb3Agb2ZmIHRoZSBsb3dlc3Qgb3Blbkxpc3QgaXRlbSBhbmQgYWRkIGl0IHRvIHRoZSBjbG9zZWQgbGlzdFxyXG4gICAgICAgICAgICBjbG9zZWRMaXN0LnB1c2gob3Blbkxpc3QucG9wKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBGb3VuZCBhIHJvdXRlISBQdXQgdGhlIHBpZWNlcyB0b2dldGhlciBieSB3b3JraW5nIGJhY2t3YXJkc1xyXG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0TG9jYXRpb24oY2xvc2VkTGlzdCwgZW5kUG9zaXRpb24pO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5zKGNsb3NlZExpc3QsIGVuZFBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICBpdGVyYXRpb25zID0gMDtcclxuICAgICAgICAgICAgd2hpbGUgKChsb2NhdGlvbi5wb3NpdGlvblswXSAhPT0gc3RhcnRQb3NpdGlvblswXSB8fCBsb2NhdGlvbi5wb3NpdGlvblsxXSAhPT0gc3RhcnRQb3NpdGlvblsxXSkgJiYgaXRlcmF0aW9ucyA8IG1heEl0ZXJhdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGl0ZXJhdGlvbnMrKztcclxuICAgICAgICAgICAgICAgIHJvdXRlLnB1c2gobG9jYXRpb24ucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24gPSBsb2NhdGlvbi5wcmV2aW91c0xvY2F0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByb3V0ZS5yZXZlcnNlKCk7XHJcbiAgICB9O1xyXG4gICAgUGF0aEZpbmRlci5wcm90b3R5cGUuaXNFcXVhbCA9IGZ1bmN0aW9uIChwb3NpdGlvbjEsIHBvc2l0aW9uMikge1xyXG4gICAgICAgIHJldHVybiAocG9zaXRpb24xLnBvc2l0aW9uWzBdID09PSBwb3NpdGlvbjIucG9zaXRpb25bMF0gJiYgcG9zaXRpb24xLnBvc2l0aW9uWzFdID09PSBwb3NpdGlvbjIucG9zaXRpb25bMV0pO1xyXG4gICAgfTtcclxuICAgIFBhdGhGaW5kZXIucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGxvY2F0aW9uTGlzdCwgdGVzdExvY2F0aW9uKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0ZXN0TG9jYXRpb24pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhdGlvbkxpc3Quc29tZShmdW5jdGlvbiAobG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAobG9jYXRpb24ucG9zaXRpb25bMF0gPT09IHRlc3RMb2NhdGlvblswXSAmJiBsb2NhdGlvbi5wb3NpdGlvblsxXSA9PT0gdGVzdExvY2F0aW9uWzFdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbG9jYXRpb25MaXN0LnNvbWUoZnVuY3Rpb24gKGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuaXNFcXVhbChsb2NhdGlvbiwgdGVzdExvY2F0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFBhdGhGaW5kZXIucHJvdG90eXBlLmdldExvY2F0aW9uID0gZnVuY3Rpb24gKGxvY2F0aW9uTGlzdCwgdGVzdFBvc2l0aW9uKSB7XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBsb2NhdGlvbkxpc3RfMSA9IGxvY2F0aW9uTGlzdDsgX2kgPCBsb2NhdGlvbkxpc3RfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIGxvY2F0aW9uXzEgPSBsb2NhdGlvbkxpc3RfMVtfaV07XHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbl8xLnBvc2l0aW9uWzBdID09PSB0ZXN0UG9zaXRpb25bMF0gJiYgbG9jYXRpb25fMS5wb3NpdGlvblsxXSA9PT0gdGVzdFBvc2l0aW9uWzFdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jYXRpb25fMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBQYXRoRmluZGVyO1xyXG59KCkpO1xyXG5leHBvcnQgZGVmYXVsdCBQYXRoRmluZGVyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1QYXRoRmluZGVyLmpzLm1hcCIsIi8qKiBSYW5kb20gZ2VuZXJhdG9yICovXHJcbnZhciBSYW5kb20gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBSYW5kb20oc2VlZCwgYmFzZSkge1xyXG4gICAgICAgIGlmICghc2VlZCkge1xyXG4gICAgICAgICAgICAvLyBHZXQgc2VlZCBmcm9tIG1pbGxpc2Vjb25kcyBzaW5jZSBKYW4gMXN0LCAxOTcwXHJcbiAgICAgICAgICAgIHNlZWQgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlZWQgPSBNYXRoLmZsb29yKHNlZWQpO1xyXG4gICAgICAgIHRoaXMud2V5bCA9IDA7XHJcbiAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICB0aGlzLmJhc2UgPSAoYmFzZSkgPyBiYXNlIDogMTAwMDAwO1xyXG4gICAgICAgIC8vIFJ1biBpdCBhIGNvdXBsZSBvZiB0aW1lcywgaW4gY2FzZSB0aGUgc2VlZCBpc24ndCB0aGF0IGdvb2QuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0UmFuZG9tKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgLyoqIEdlbmVyYXRlIGEgcmFuZG9tIG51bWJlciBmcm9tIDAgPD0gbnVtYmVyIDwgMSAqL1xyXG4gICAgLy8gQW4gYXR0ZW1wdCB0byByZXByb2R1Y2Ugc29tZXRoaW5nIHJlc2VtYmxpbmcgdGhlIE1pZGRsZSBTcXVhcmUgV2V5bCBTZXF1ZW5jZSBQUk5HXHJcbiAgICAvLyBTZWUgV2lkeW5za2kgKDIwMTcpIGh0dHBzOi8vYXJ4aXYub3JnL2Ficy8xNzA0LjAwMzU4djVcclxuICAgIC8vIFRoZSBhYm92ZSBhbGdvcml0aG0gdXNlcyB1bnNpZ25lZCBpbnRzLiBKUyB1c2VzIHNpZ25lZCBmbG9hdHMuIEZ1cnRoZXIgdGVzdGluZyByZXF1aXJlZCB0byBzZWUgd2hldGhlciBvciBub3QgdGhpcyBpcyBhY3R1YWxseSBhIHByb2JsZW0uXHJcbiAgICBSYW5kb20ucHJvdG90eXBlLmdldFJhbmRvbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnggKj0gdGhpcy54O1xyXG4gICAgICAgIHRoaXMueCArPSAodGhpcy53ZXlsICs9IHRoaXMuc2VlZCk7XHJcbiAgICAgICAgLy8gTm90ZSwgPj4+IG1ha2VzIHRoZSBzaGlmdCBiZSB1bnNpZ25lZC4gVGhlID4+PiAwIGF0IHRoZSBlbmQgZmxpcHMgdGhlIFwic2lnblwiIGJpdCB0byBiZSBwb3NpdGl2ZSwgZW5zdXJpbmcgYSBub24tbmVnYXRpdmUgcmVzdWx0LlxyXG4gICAgICAgIHRoaXMueCA9ICgodGhpcy54ID4+PiAzMikgfCAodGhpcy54IDw8IDMyKSkgPj4+IDA7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnggJSB0aGlzLmJhc2UpIC8gdGhpcy5iYXNlO1xyXG4gICAgfTtcclxuICAgIC8qKiBHZXQgYSByYW5kb20gbnVtYmVyIGluIGEgcmFuZ2UgKi9cclxuICAgIFJhbmRvbS5wcm90b3R5cGUuZ2V0TnVtYmVyID0gZnVuY3Rpb24gKG1pbiwgbWF4LCBpbnRlZ2VyKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbnRlZ2VyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKG1pbikgJiYgTnVtYmVyLmlzSW50ZWdlcihtYXgpKSB7XHJcbiAgICAgICAgICAgICAgICBpbnRlZ2VyID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW50ZWdlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmdldFJhbmRvbSgpICogKG1heCArIDEgLSBtaW4pKSArIE1hdGguY2VpbChtaW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmdldFJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKiogR2V0IGEgcmFuZG9tIGVsZW1lbnQgZnJvbSBhbiBhcnJheSAqL1xyXG4gICAgUmFuZG9tLnByb3RvdHlwZS5nZXRSYW5kb21FbGVtZW50ID0gZnVuY3Rpb24gKGFycmF5KSB7XHJcbiAgICAgICAgdmFyIHJhbmRvbUluZGV4ID0gdGhpcy5nZXROdW1iZXIoMCwgYXJyYXkubGVuZ3RoIC0gMSwgdHJ1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5W3JhbmRvbUluZGV4XTtcclxuICAgIH07XHJcbiAgICAvKiogR2V0IGEgcmFuZG9tIGVsZW1lbnQsIHdpdGggd2VpZ2h0cyAqL1xyXG4gICAgUmFuZG9tLnByb3RvdHlwZS5nZXRXZWlnaHRlZEVsZW1lbnQgPSBmdW5jdGlvbiAoYXJyYXkpIHtcclxuICAgICAgICB2YXIgdG90YWxXZWlnaHQgPSAwO1xyXG4gICAgICAgIHZhciBpbnRlZ2VyID0gdHJ1ZTtcclxuICAgICAgICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRvdGFsV2VpZ2h0ICs9IGVsZW1lbnQud2VpZ2h0O1xyXG4gICAgICAgICAgICBpbnRlZ2VyID0gaW50ZWdlciAmJiBOdW1iZXIuaXNJbnRlZ2VyKGVsZW1lbnQud2VpZ2h0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgcmFuZG9tTnVtYmVyID0gdGhpcy5nZXROdW1iZXIoKGludGVnZXIpID8gMSA6IDAsIHRvdGFsV2VpZ2h0LCBpbnRlZ2VyKTtcclxuICAgICAgICAvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSB1bnRpbCB3ZSBoYXZlIGEgd2lubmVyXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICByYW5kb21OdW1iZXIgLT0gYXJyYXlbaV0ud2VpZ2h0O1xyXG4gICAgICAgICAgICBpZiAocmFuZG9tTnVtYmVyIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIEZvdW5kIGl0IVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5W2ldLm9wdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBOb3QgZm91bmQ7IHNlZW1zIGxpa2UgYSBwcm9ibGVtXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gbWF0Y2ggZm91bmQuXCIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSYW5kb207XHJcbn0oKSk7XHJcbmV4cG9ydCB7IFJhbmRvbSB9O1xyXG5leHBvcnQgZGVmYXVsdCBSYW5kb207XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJhbmRvbS5qcy5tYXAiLCJ2YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxudmFyIF9fc3ByZWFkQXJyYXlzID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5cykgfHwgZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcbmltcG9ydCBXZmNUaWxlIGZyb20gJy4vV2ZjVGlsZS5qcyc7XHJcbmltcG9ydCBSYW5kb20gZnJvbSAnLi4vcmFuZG9tL1JhbmRvbS5qcyc7XHJcbi8qKlxyXG4gKiBDbGFzcyB0aGF0IGltcGxlbWVudHMgdGhlIFdhdmUgRnVuY3Rpb24gQ29sbGFwc2UgYWxnb3JpdGhtLlxyXG4gKi9cclxudmFyIFdGQyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFdGQyhwYXJhbXMpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgdmFyIGlucHV0ID0gcGFyYW1zLmlucHV0LCBfYiA9IHBhcmFtcy5uLCBuID0gX2IgPT09IHZvaWQgMCA/IDEgOiBfYiwgX2MgPSBwYXJhbXMubSwgbSA9IF9jID09PSB2b2lkIDAgPyBuIDogX2MsIF9kID0gcGFyYW1zLnJlcGVhdElucHV0LCByZXBlYXRJbnB1dCA9IF9kID09PSB2b2lkIDAgPyBmYWxzZSA6IF9kLCByYW5kb20gPSBwYXJhbXMucmFuZG9tLCBfZSA9IHBhcmFtcy5pbmNsdWRlTWlycm9ycywgaW5jbHVkZU1pcnJvcnMgPSBfZSA9PT0gdm9pZCAwID8gZmFsc2UgOiBfZSwgX2YgPSBwYXJhbXMuaW5jbHVkZVJvdGF0aW9ucywgaW5jbHVkZVJvdGF0aW9ucyA9IF9mID09PSB2b2lkIDAgPyBmYWxzZSA6IF9mLCByZXN0ID0gX19yZXN0KHBhcmFtcywgW1wiaW5wdXRcIiwgXCJuXCIsIFwibVwiLCBcInJlcGVhdElucHV0XCIsIFwicmFuZG9tXCIsIFwiaW5jbHVkZU1pcnJvcnNcIiwgXCJpbmNsdWRlUm90YXRpb25zXCJdKTtcclxuICAgICAgICAvLyBDb252ZXJ0IGludG8gYSAyZCBhcnJheVxyXG4gICAgICAgIHZhciBpbnB1dEltYWdlID0gaW5wdXQubWFwKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiByb3cgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByb3cuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gUHJvY2VzcyB0aGUgaW5wdXQgaW1hZ2UgYW5kIHN0b3JlIHRoYXQgZGF0YVxyXG4gICAgICAgIF9hID0gdGhpcy5wcm9jZXNzSW5wdXQoaW5wdXRJbWFnZSwgcmVwZWF0SW5wdXQsIG4sIG0sIGluY2x1ZGVSb3RhdGlvbnMsIGluY2x1ZGVNaXJyb3JzKSwgdGhpcy5ydWxlcyA9IF9hWzBdLCB0aGlzLmZyZXF1ZW5jaWVzID0gX2FbMV07XHJcbiAgICAgICAgdGhpcy5uID0gbjtcclxuICAgICAgICB0aGlzLm0gPSBtO1xyXG4gICAgICAgIGlmICghcmFuZG9tKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmFuZG9tID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yYW5kb20gPSByYW5kb207XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRob2QgdGhhdCBwcm9jZXNzZXMgdGhlIGltYWdlIHRvIGdlbmVyYXRlIGFkamFjZW5jeSBydWxlcyBhbmQgdGlsZSBmcmVxdWVuY2llcy5cclxuICAgICAqL1xyXG4gICAgV0ZDLnByb3RvdHlwZS5wcm9jZXNzSW5wdXQgPSBmdW5jdGlvbiAoaW5wdXQsIHJlcGVhdElucHV0LCBuLCBtLCByb3RhdGlvbnMsIG1pcnJvcnMpIHtcclxuICAgICAgICAvLyBHZXQgZGltZW5zaW9uc1xyXG4gICAgICAgIC8vIEhlaWdodCBpcyBqdXN0IHRoZSBsZW5ndGggb2YgdGhlIGFycmF5XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IGlucHV0Lmxlbmd0aDtcclxuICAgICAgICB2YXIgaGVpZ2h0VGlsZXMgPSBoZWlnaHQgLSAoKCFyZXBlYXRJbnB1dCkgPyAobSAtIDEpIDogMCk7XHJcbiAgICAgICAgLy8gV2lkdGggaXMgdGhlIG1pbmltdW0gbGVuZ3RoIG9mIGEgc3ViYXJyYXk7IGZvcmNlIGl0IHRvIGJlIHNxdWFyZS5cclxuICAgICAgICB2YXIgd2lkdGggPSBNYXRoLm1pbi5hcHBseShNYXRoLCBpbnB1dC5tYXAoZnVuY3Rpb24gKHJvdykgeyByZXR1cm4gcm93Lmxlbmd0aDsgfSkpO1xyXG4gICAgICAgIHZhciB3aWR0aFRpbGVzID0gd2lkdGggLSAoKCFyZXBlYXRJbnB1dCkgPyAobiAtIDEpIDogMCk7XHJcbiAgICAgICAgLy8gR2V0IGFsbCB0aWxlcyBpbiB0aGUgaW5wdXRcclxuICAgICAgICB2YXIgcmF3VGlsZXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpZHRoVGlsZXM7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGhlaWdodFRpbGVzOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aWxlSW5wdXQgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgbTsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB5UG9zID0gKGogKyB5KSAlIGhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IG47IHgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgeFBvcyA9ICh4ICsgaSkgJSB3aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93LnB1c2goaW5wdXRbeVBvc11beFBvc10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aWxlSW5wdXQucHVzaChyb3cpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1RpbGUgPSBuZXcgV2ZjVGlsZSh0aWxlSW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgcmF3VGlsZXMucHVzaChuZXdUaWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBZGQgaW4gcm90YXRpb25zIGFuZCBtaXJyb3JzLCBpZiByZXF1ZXN0ZWQuXHJcbiAgICAgICAgaWYgKG1pcnJvcnMpIHtcclxuICAgICAgICAgICAgX19zcHJlYWRBcnJheXMocmF3VGlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHRpbGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2ZXJ0aWNhbE1pcnJvciA9IHRpbGUuY29udGVudHMubWFwKGZ1bmN0aW9uIChyb3cpIHsgcmV0dXJuIF9fc3ByZWFkQXJyYXlzKHJvdyk7IH0pLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgICAgIHZhciBob3Jpem9udGFsTWlycm9yID0gdGlsZS5jb250ZW50cy5tYXAoZnVuY3Rpb24gKHJvdykgeyByZXR1cm4gX19zcHJlYWRBcnJheXMocm93KS5yZXZlcnNlKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgcmF3VGlsZXMucHVzaChuZXcgV2ZjVGlsZSh2ZXJ0aWNhbE1pcnJvcikpO1xyXG4gICAgICAgICAgICAgICAgcmF3VGlsZXMucHVzaChuZXcgV2ZjVGlsZShob3Jpem9udGFsTWlycm9yKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocm90YXRpb25zKSB7XHJcbiAgICAgICAgICAgIF9fc3ByZWFkQXJyYXlzKHJhd1RpbGVzKS5mb3JFYWNoKGZ1bmN0aW9uICh0aWxlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcGxhdGVUaWxlID0gdGlsZS5jb250ZW50cy5tYXAoZnVuY3Rpb24gKHJvdykgeyByZXR1cm4gX19zcHJlYWRBcnJheXMocm93KTsgfSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVGlsZSA9IHRlbXBsYXRlVGlsZVswXS5tYXAoZnVuY3Rpb24gKF8sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZVRpbGUubWFwKGZ1bmN0aW9uIChyb3cpIHsgcmV0dXJuIHJvd1tpbmRleF07IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJhd1RpbGVzLnB1c2gobmV3IFdmY1RpbGUodGVtcGxhdGVUaWxlLm1hcChmdW5jdGlvbiAocm93KSB7IHJldHVybiBfX3NwcmVhZEFycmF5cyhyb3cpOyB9KSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRmlsdGVyIGRvd24sIHRvIGdldCByaWQgb2YgcmVwZWF0c1xyXG4gICAgICAgIHZhciB0aWxlcyA9IFtdO1xyXG4gICAgICAgIHZhciBmcmVxdWVuY2llcyA9IFtdO1xyXG4gICAgICAgIHJhd1RpbGVzLmZvckVhY2goZnVuY3Rpb24gKHRpbGUpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGlsZXMuZmluZEluZGV4KGZ1bmN0aW9uIChvdGhlclRpbGUpIHsgcmV0dXJuIG90aGVyVGlsZS5lcXVhbHModGlsZSk7IH0pO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgZnJlcXVlbmNpZXNbaW5kZXhdLndlaWdodCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGlsZXMucHVzaCh0aWxlKTtcclxuICAgICAgICAgICAgICAgIGZyZXF1ZW5jaWVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbjogdGlsZSxcclxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IDEsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRpbGVzKTtcclxuICAgICAgICAvLyBOZXh0LCB3ZSBuZWVkIGFkamFjZW5jeSBydWxlc1xyXG4gICAgICAgIHZhciBydWxlcyA9IHRpbGVzLm1hcChmdW5jdGlvbiAodGlsZSkge1xyXG4gICAgICAgICAgICAvLyBCZWdpbiBhIG5ldyBydWxlIVxyXG4gICAgICAgICAgICB2YXIgcnVsZSA9IHtcclxuICAgICAgICAgICAgICAgIHVwOiBuZXcgU2V0KCksXHJcbiAgICAgICAgICAgICAgICBkb3duOiBuZXcgU2V0KCksXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBuZXcgU2V0KCksXHJcbiAgICAgICAgICAgICAgICByaWdodDogbmV3IFNldCgpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgdGlsZSBpcyBjb21wYXRpYmxlIHdpdGggZXZlcnkgb3RoZXIgdGlsZSwgaW4gdGhlIDQgZGlyZWN0aW9uc1xyXG4gICAgICAgICAgICB0aWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChvdGhlclRpbGUsIGkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aWxlLmNvbXBhdGlibGUob3RoZXJUaWxlLCAtMSwgMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBydWxlLnJpZ2h0LmFkZChpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aWxlLmNvbXBhdGlibGUob3RoZXJUaWxlLCAxLCAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bGUubGVmdC5hZGQoaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZS5jb21wYXRpYmxlKG90aGVyVGlsZSwgMCwgLTEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVsZS5kb3duLmFkZChpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aWxlLmNvbXBhdGlibGUob3RoZXJUaWxlLCAwLCAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bGUudXAuYWRkKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gRG9uZSwgcmV0dXJuIHRoZSBmaW5pc2hlZCBydWxlXHJcbiAgICAgICAgICAgIHJldHVybiBydWxlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBbcnVsZXMsIGZyZXF1ZW5jaWVzXTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlIGFuIG91dHB1dCBpbWFnZS5cclxuICAgICAqL1xyXG4gICAgV0ZDLnByb3RvdHlwZS5nZW5lcmF0ZSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIF90aGlzLmdlbmVyYXRlU3luYyhwYXJhbXMsIHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZSBhbiBvdXRwdXQgaW1hZ2UuXHJcbiAgICAgKi9cclxuICAgIFdGQy5wcm90b3R5cGUuZ2VuZXJhdGVTeW5jID0gZnVuY3Rpb24gKHBhcmFtcywgcmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgd2lkdGggPSBwYXJhbXMud2lkdGgsIGhlaWdodCA9IHBhcmFtcy5oZWlnaHQsIHJlcGVhdE91dHB1dCA9IHBhcmFtcy5yZXBlYXRPdXRwdXQsIHJlc3QgPSBfX3Jlc3QocGFyYW1zLCBbXCJ3aWR0aFwiLCBcImhlaWdodFwiLCBcInJlcGVhdE91dHB1dFwiXSk7XHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB3aXRoIGFsbCB0aWxlcyBiZWluZyBwb3NzaWJsZVxyXG4gICAgICAgIHZhciB3YXZlRnVuY3Rpb24gPSBbXTtcclxuICAgICAgICB2YXIgZW50cm9weUxpc3QgPSBbXTtcclxuICAgICAgICB2YXIgZG9uZUxpc3QgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGhlaWdodDsgaisrKSB7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sdW1uID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBudW0gPSAwOyBudW0gPCB0aGlzLmZyZXF1ZW5jaWVzLmxlbmd0aDsgbnVtKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjb3VudCA9IDA7IGNvdW50IDwgdGhpcy5mcmVxdWVuY2llc1tudW1dLndlaWdodDsgY291bnQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4ucHVzaChudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIFNhbWUgZGF0YSBpcyBpbiBib3RoOyBvbmUgaXMganVzdCBmb3IgcG9zaXRpb25zLCBvbmUgaXMgZm9yIHNvcnRpbmdcclxuICAgICAgICAgICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGNvbHVtbixcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogW2ksIGpdLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJvdy5wdXNoKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgZW50cm9weUxpc3QucHVzaChvcHRpb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3YXZlRnVuY3Rpb24ucHVzaChyb3cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBUT0RPOiBBZGQgc3RlcCBmb3IgYXBwbHlpbmcgY29uc3RyYWludHMgdG8gdGhlIGltYWdlXHJcbiAgICAgICAgLy8gQmVnaW4gdGhlIG1haW4gbG9vcCFcclxuICAgICAgICAvLyBJIHdhbnQgdG8gbWFrZSB0aGlzIG5vbi1ibG9ja2luZywgc28gZ29pbmcgdG8gZG8gc29tZSB3ZWlyZCBzaGl0IHdpdGggc2V0VGltZW91dC5cclxuICAgICAgICB2YXIgbG9vcFN0ZXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChlbnRyb3B5TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTb3J0IHRoZSBlbnRyb3B5TGlzdCwgdG8gcHV0IHRoZSBvcHRpb24gd2l0aCBmZXdlc3QgcG9zc2liaWxpdGllcyBmaXJzdFxyXG4gICAgICAgICAgICAgICAgZW50cm9weUxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLm9wdGlvbnMubGVuZ3RoIC0gYi5vcHRpb25zLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBmaXJzdCBzZXQgb2Ygb3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBlbnRyb3B5TGlzdC5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIGl0J3MgbGVuZ3RoIGlzIG5vdCAwLiBJZiBpdCBpcywgd2UgZnVja2VkIHVwLlxyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMub3B0aW9ucy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IE90aGVyIG9wdGlvbnMgZm9yIGZhaWx1cmUgKG1heWJlIGEgZGVmYXVsdCB0aWxlPyBVZ2x5IGJ1dCBub3QgdGVycmlibGUgZm9yIGEgcm9ndWVsaWtlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJXRkMgY29udHJhZGljdGlvbiBlbmNvdW50ZXJlZC5cIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gQ2hvb3NlIGFuIG9wdGlvbjtcclxuICAgICAgICAgICAgICAgIHZhciBjaG9pY2UgPSBbX3RoaXMucmFuZG9tLmdldFJhbmRvbUVsZW1lbnQob3B0aW9ucy5vcHRpb25zKV07XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLm9wdGlvbnMgPSBjaG9pY2U7XHJcbiAgICAgICAgICAgICAgICBkb25lTGlzdC5wdXNoKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgLy8gUHJvcGFnYXRlIHRoYXQgY2hvaWNlIHRvIHRoZSBvdGhlciB0aWxlc1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYXBwbHlBZGphY2VuY3kod2F2ZUZ1bmN0aW9uLCBvcHRpb25zLnBvc2l0aW9uLCByZXBlYXRPdXRwdXQsIGxvb3BTdGVwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMucG9zdFByb2Nlc3Mod2F2ZUZ1bmN0aW9uKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxvb3BTdGVwKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqIENvbnZlcnQgdGhlIGFycmF5IG9mIG51bWJlcnMgaW50byB0aGUgZGVzaXJlZCBvdXRwdXQgKi9cclxuICAgIFdGQy5wcm90b3R5cGUucG9zdFByb2Nlc3MgPSBmdW5jdGlvbiAod2F2ZUZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gd2F2ZUZ1bmN0aW9uLmxlbmd0aCArICh0aGlzLm0gLSAxKTtcclxuICAgICAgICB2YXIgd2lkdGggPSB3YXZlRnVuY3Rpb24ubGVuZ3RoICsgKHRoaXMubiAtIDEpO1xyXG4gICAgICAgIHZhciBvdXRwdXQgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGhlaWdodDsgaisrKSB7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICByb3cucHVzaChudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChyb3cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3YXZlRnVuY3Rpb24uZm9yRWFjaChmdW5jdGlvbiAocm93LCBqKSB7XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKGZ1bmN0aW9uIChvcHRpb24sIGkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb24ub3B0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbGUgPSBfdGhpcy5mcmVxdWVuY2llc1tvcHRpb24ub3B0aW9uc1swXV0ub3B0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgX3RoaXMubjsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgX3RoaXMubTsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRbaiArIHldW2kgKyB4XSA9IHRpbGUuY29udGVudHNbeV1beF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9O1xyXG4gICAgLyoqIEFwcGx5IGFkamFjZW5jeSBydWxlcyAqL1xyXG4gICAgV0ZDLnByb3RvdHlwZS5hcHBseUFkamFjZW5jeSA9IGZ1bmN0aW9uICh3YXZlRnVuY3Rpb24sIF9hLCByZXBlYXRPdXRwdXQsIGNhbGxiYWNrLCBiYWNrVHJhY2spIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciB4ID0gX2FbMF0sIHkgPSBfYVsxXTtcclxuICAgICAgICBpZiAoYmFja1RyYWNrID09PSB2b2lkIDApIHsgYmFja1RyYWNrID0gZmFsc2U7IH1cclxuICAgICAgICB2YXIgdG9Eb1RpbGVzID0gW3dhdmVGdW5jdGlvblt5XVt4XV07XHJcbiAgICAgICAgdmFyIGRvbmVUaWxlcyA9IFtdO1xyXG4gICAgICAgIHZhciBwcm9wb2dhdGVTdGVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSAodG9Eb1RpbGVzLmxlbmd0aCA+IDAgJiYgaW5kZXggPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICAgIHZhciBkb1RpbGUgPSB0b0RvVGlsZXMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5wcm9wb2dhdGUod2F2ZUZ1bmN0aW9uLCBkb1RpbGUucG9zaXRpb24sIHJlcGVhdE91dHB1dCwgZG9uZVRpbGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChuZXdUaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9Eb1RpbGVzLnB1c2gobmV3VGlsZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmICghYmFja1RyYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9uZVRpbGVzLnB1c2goZG9UaWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodG9Eb1RpbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocHJvcG9nYXRlU3RlcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBwcm9wb2dhdGVTdGVwKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEluZGl2aWR1YWwgcHJvcG9nYXRpb24gc3RlcCAqL1xyXG4gICAgV0ZDLnByb3RvdHlwZS5wcm9wb2dhdGUgPSBmdW5jdGlvbiAod2F2ZUZ1bmN0aW9uLCBfYSwgcmVwZWF0T3V0cHV0LCBpZ25vcmVMaXN0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgeCA9IF9hWzBdLCB5ID0gX2FbMV07XHJcbiAgICAgICAgaWYgKGlnbm9yZUxpc3QgPT09IHZvaWQgMCkgeyBpZ25vcmVMaXN0ID0gW107IH1cclxuICAgICAgICB2YXIgb3B0aW9ucyA9IHdhdmVGdW5jdGlvblt5XVt4XTtcclxuICAgICAgICB2YXIgYWdncmVnYXRlUnVsZXMgPSB7XHJcbiAgICAgICAgICAgIHVwOiBuZXcgU2V0KCksXHJcbiAgICAgICAgICAgIGRvd246IG5ldyBTZXQoKSxcclxuICAgICAgICAgICAgbGVmdDogbmV3IFNldCgpLFxyXG4gICAgICAgICAgICByaWdodDogbmV3IFNldCgpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gR2V0IGFsbCBhdmFpbGFibGUgcG9zc2liaWxpdGllc1xyXG4gICAgICAgIG9wdGlvbnMub3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChvcHRpb24pIHtcclxuICAgICAgICAgICAgdmFyIHJ1bGUgPSBfdGhpcy5ydWxlc1tvcHRpb25dO1xyXG4gICAgICAgICAgICBydWxlLnVwLmZvckVhY2goZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZVJ1bGVzLnVwLmFkZCh4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJ1bGUuZG93bi5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgICAgICBhZ2dyZWdhdGVSdWxlcy5kb3duLmFkZCh4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJ1bGUubGVmdC5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgICAgICBhZ2dyZWdhdGVSdWxlcy5sZWZ0LmFkZCh4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJ1bGUucmlnaHQuZm9yRWFjaChmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICAgICAgYWdncmVnYXRlUnVsZXMucmlnaHQuYWRkKHgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBNYWludGFpbiBsaXN0IG9mIG5leHQgdGlsZXMgdG8gZ28gdG9cclxuICAgICAgICB2YXIgbmV4dFRpbGVzID0gW107XHJcbiAgICAgICAgLy8gQXBwbHkgZm9yIGVhY2ggZGlyZWN0aW9uXHJcbiAgICAgICAgdmFyIHN0ZXBzID0gW1widXBcIiwgXCJkb3duXCIsIFwibGVmdFwiLCBcInJpZ2h0XCJdO1xyXG4gICAgICAgIHZhciBzdGVwRGlyZWN0aW9ucyA9IHtcclxuICAgICAgICAgICAgdXA6IFswLCAtMV0sXHJcbiAgICAgICAgICAgIGRvd246IFswLCAxXSxcclxuICAgICAgICAgICAgbGVmdDogWy0xLCAwXSxcclxuICAgICAgICAgICAgcmlnaHQ6IFsxLCAwXSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHN0ZXBzLmZvckVhY2goZnVuY3Rpb24gKHN0ZXApIHtcclxuICAgICAgICAgICAgdmFyIHh4ID0geCArIHN0ZXBEaXJlY3Rpb25zW3N0ZXBdWzBdO1xyXG4gICAgICAgICAgICB2YXIgeXkgPSB5ICsgc3RlcERpcmVjdGlvbnNbc3RlcF1bMV07XHJcbiAgICAgICAgICAgIGlmIChyZXBlYXRPdXRwdXQpIHtcclxuICAgICAgICAgICAgICAgIHh4ICs9IHdhdmVGdW5jdGlvblswXS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB4eCA9IHh4ICUgd2F2ZUZ1bmN0aW9uWzBdLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHl5ICs9IHdhdmVGdW5jdGlvbi5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB5eSA9IHl5ICUgd2F2ZUZ1bmN0aW9uLmxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoeHggPj0gMCAmJiB4eCA8IHdhdmVGdW5jdGlvblswXS5sZW5ndGggJiYgeXkgPj0gMCAmJiB5eSA8IHdhdmVGdW5jdGlvbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpZ25vcmVMaXN0LmluY2x1ZGVzKHdhdmVGdW5jdGlvblt5eV1beHhdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBiZWZvcmVMZW5ndGggPSB3YXZlRnVuY3Rpb25beXldW3h4XS5vcHRpb25zLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHdhdmVGdW5jdGlvblt5eV1beHhdLm9wdGlvbnMgPSB3YXZlRnVuY3Rpb25beXldW3h4XS5vcHRpb25zLmZpbHRlcihmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhZ2dyZWdhdGVSdWxlc1tzdGVwXS5oYXMoeCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChiZWZvcmVMZW5ndGggPiB3YXZlRnVuY3Rpb25beXldW3h4XS5vcHRpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRUaWxlcy5wdXNoKHdhdmVGdW5jdGlvblt5eV1beHhdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBuZXh0VGlsZXM7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFdGQztcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgV0ZDO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1XRkMuanMubWFwIiwidmFyIF9fc3ByZWFkQXJyYXlzID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5cykgfHwgZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcbi8qKlxyXG4gKiBBIHRpbGUsIGFzIGRlZmluZWQgZm9yIFdhdmUgRnVuY3Rpb24gQ29sbGFwc2UgcHVycG9zZXNcclxuICovXHJcbnZhciBXZmNUaWxlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gV2ZjVGlsZShpbnB1dCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudHMgPSBpbnB1dC5tYXAoZnVuY3Rpb24gKHJvdykgeyByZXR1cm4gX19zcHJlYWRBcnJheXMocm93KTsgfSk7XHJcbiAgICB9XHJcbiAgICAvKiogQ2hlY2sgaWYgdHdvIFdmY1RpbGUncyBhcmUgZXF1YWwsIHRvIHJlbW92ZSBkdXBsaWNhdGVzLiAqL1xyXG4gICAgV2ZjVGlsZS5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKHRpbGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21wYXRpYmxlKHRpbGUsIDAsIDApO1xyXG4gICAgfTtcclxuICAgIC8qKiBDaGVjayBpZiB0d28gV2ZjVGlsZSdzIGFyZSBjb21wYXRpYmxlIChpLmUuIGNhbiBiZSBuZWlnaGJvdXJzKSAqL1xyXG4gICAgV2ZjVGlsZS5wcm90b3R5cGUuY29tcGF0aWJsZSA9IGZ1bmN0aW9uICh0aWxlLCB4LCB5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudHMuZXZlcnkoZnVuY3Rpb24gKHJvdywgaikge1xyXG4gICAgICAgICAgICByZXR1cm4gcm93LmV2ZXJ5KGZ1bmN0aW9uICh2YWwsIGkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB4UG9zID0gaSArIHg7XHJcbiAgICAgICAgICAgICAgICB2YXIgeVBvcyA9IGogKyB5O1xyXG4gICAgICAgICAgICAgICAgaWYgKHhQb3MgPj0gMCAmJiB5UG9zID49IDAgJiYgeVBvcyA8IHRpbGUuY29udGVudHMubGVuZ3RoICYmIHhQb3MgPCB0aWxlLmNvbnRlbnRzW3lQb3NdLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgPT09IHRpbGUuY29udGVudHNbeVBvc11beFBvc107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIENoZWNrIGlmIHRoaXMgdGlsZSB3b3JrIHdpdGggYSBnaXZlbiBjb25zdHJhaW50ICovXHJcbiAgICBXZmNUaWxlLnByb3RvdHlwZS5jb25zdHJhaW4gPSBmdW5jdGlvbiAoY29uc3RyYWludCwgeCwgeSkge1xyXG4gICAgICAgIGlmICh5ID49IDAgJiYgeSA8IHRoaXMuY29udGVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICh4ID49IDAgJiYgeCA8IHRoaXMuY29udGVudHNbeV0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50c1t5XVt4XSA9PT0gY29uc3RyYWludDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gV2ZjVGlsZTtcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgV2ZjVGlsZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9V2ZjVGlsZS5qcy5tYXAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vZG9jcy9zY3JpcHQuanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9