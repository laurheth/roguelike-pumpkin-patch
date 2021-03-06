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
                up: [],
                down: [],
                left: [],
                right: [],
            };
            // Check if the tile is compatible with every other tile, in the 4 directions
            tiles.forEach(function (otherTile, i) {
                if (tile.compatible(otherTile, -1, 0)) {
                    rule.right.push(i);
                }
                if (tile.compatible(otherTile, 1, 0)) {
                    rule.left.push(i);
                }
                if (tile.compatible(otherTile, 0, -1)) {
                    rule.down.push(i);
                }
                if (tile.compatible(otherTile, 0, 1)) {
                    rule.up.push(i);
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
                _this.applyAdjacency(waveFunction, options.position, repeatOutput);
                setTimeout(loopStep, 0);
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
    WFC.prototype.applyAdjacency = function (waveFunction, _a, repeatOutput, backTrack) {
        var x = _a[0], y = _a[1];
        if (backTrack === void 0) { backTrack = false; }
        var toDoTiles = [waveFunction[y][x]];
        var doneTiles = [];
        while (toDoTiles.length > 0) {
            var doTile = toDoTiles.pop();
            this.propogate(waveFunction, doTile.position, repeatOutput, doneTiles).forEach(function (newTile) {
                toDoTiles.push(newTile);
            });
            if (!backTrack) {
                doneTiles.push(doTile);
            }
        }
    };
    /** Individual propogation step */
    WFC.prototype.propogate = function (waveFunction, _a, repeatOutput, ignoreList) {
        var _this = this;
        var x = _a[0], y = _a[1];
        if (ignoreList === void 0) { ignoreList = []; }
        var options = waveFunction[y][x];
        var aggregateRules = {
            up: [],
            down: [],
            left: [],
            right: [],
        };
        // Get all available possibilities
        options.options.forEach(function (option) {
            var rule = _this.rules[option];
            rule.up.forEach(function (x) {
                if (!aggregateRules.up.includes(x)) {
                    aggregateRules.up.push(x);
                }
            });
            rule.down.forEach(function (x) {
                if (!aggregateRules.down.includes(x)) {
                    aggregateRules.down.push(x);
                }
            });
            rule.left.forEach(function (x) {
                if (!aggregateRules.left.includes(x)) {
                    aggregateRules.left.push(x);
                }
            });
            rule.right.forEach(function (x) {
                if (!aggregateRules.right.includes(x)) {
                    aggregateRules.right.push(x);
                }
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
                    return aggregateRules[step].includes(x);
                });
                if (beforeLength > waveFunction[yy][xx].options.length) {
                    // this.propogate(waveFunction,[xx,yy],repeatOutput);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb2d1ZWxpa2UtcHVtcGtpbi1wYXRjaC8uL2RvY3Mvc2NyaXB0LmpzIiwid2VicGFjazovL3JvZ3VlbGlrZS1wdW1wa2luLXBhdGNoLy4vbGliL2Rpc3BsYXkvRGlzcGxheS5qcyIsIndlYnBhY2s6Ly9yb2d1ZWxpa2UtcHVtcGtpbi1wYXRjaC8uL2xpYi9kaXNwbGF5L0Rpc3BsYXlTdHlsZS5qcyIsIndlYnBhY2s6Ly9yb2d1ZWxpa2UtcHVtcGtpbi1wYXRjaC8uL2xpYi9kaXNwbGF5L1RpbGUuanMiLCJ3ZWJwYWNrOi8vcm9ndWVsaWtlLXB1bXBraW4tcGF0Y2gvLi9saWIvZXZlbnQvRXZlbnRNYW5hZ2VyLmpzIiwid2VicGFjazovL3JvZ3VlbGlrZS1wdW1wa2luLXBhdGNoLy4vbGliL2Zvdi9GT1YuanMiLCJ3ZWJwYWNrOi8vcm9ndWVsaWtlLXB1bXBraW4tcGF0Y2gvLi9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcm9ndWVsaWtlLXB1bXBraW4tcGF0Y2gvLi9saWIvcGF0aGZpbmRlci9QYXRoRmluZGVyLmpzIiwid2VicGFjazovL3JvZ3VlbGlrZS1wdW1wa2luLXBhdGNoLy4vbGliL3JhbmRvbS9SYW5kb20uanMiLCJ3ZWJwYWNrOi8vcm9ndWVsaWtlLXB1bXBraW4tcGF0Y2gvLi9saWIvd2ZjL1dGQy5qcyIsIndlYnBhY2s6Ly9yb2d1ZWxpa2UtcHVtcGtpbi1wYXRjaC8uL2xpYi93ZmMvV2ZjVGlsZS5qcyIsIndlYnBhY2s6Ly9yb2d1ZWxpa2UtcHVtcGtpbi1wYXRjaC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yb2d1ZWxpa2UtcHVtcGtpbi1wYXRjaC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcm9ndWVsaWtlLXB1bXBraW4tcGF0Y2gvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yb2d1ZWxpa2UtcHVtcGtpbi1wYXRjaC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3JvZ3VlbGlrZS1wdW1wa2luLXBhdGNoL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBbUY7O0FBRW5GO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLCtDQUFPOztBQUUzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLGFBQWEsa0JBQWtCO0FBQy9CLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCOztBQUUvQixhQUFhLFFBQVE7QUFDckIsNEJBQTRCLHlCQUF5QjtBQUNyRDs7QUFFQTtBQUNBLCtDQUErQztBQUMvQzs7QUFFQTtBQUNBLHVCQUF1Qiw4Q0FBTTs7QUFFN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLEtBQUssS0FBSyxPQUFPO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUIsK0NBQU8sRUFBRSwwQ0FB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QixTQUFJLElBQUksU0FBSTtBQUNsQyxpREFBaUQsUUFBUTtBQUN6RCx3Q0FBd0MsUUFBUTtBQUNoRCx3REFBd0QsUUFBUTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsaUVBQWUsR0FBRyxFQUFDO0FBQ25CLCtCOzs7Ozs7Ozs7Ozs7OztBQ3ZVQSxzQkFBc0IsU0FBSSxJQUFJLFNBQUk7QUFDbEMsaURBQWlELFFBQVE7QUFDekQsd0NBQXdDLFFBQVE7QUFDaEQsd0RBQXdELFFBQVE7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCw0QkFBNEIsRUFBRTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlFQUFlLE9BQU8sRUFBQztBQUN2QixtQzs7Ozs7O1VDN0NBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJzY3JpcHRidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXNwbGF5LCBFdmVudE1hbmFnZXIsIFJhbmRvbSwgUGF0aEZpbmRlciwgRk9WLCBXRkMgfSBmcm9tICcuLi9saWIvaW5kZXgnO1xyXG5cclxuLy8gRmlyc3QsIHNlbGVjdCB0aGUgdGFyZ2V0IGVsZW1lbnQgeW91IHdhbnQgdGhlIGRpc3BsYXkgdG8gYmUgd2l0aGluXHJcbmNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheUV4YW1wbGVcIik7XHJcblxyXG4vLyBQYXJhbWF0ZXJzIG9iamVjdFxyXG5jb25zdCBwYXJhbXMgPSB7XHJcbiAgICAvLyBSZXF1aXJlZCEgVGhlIGRpc3BsYXkgbXVzdCBnbyBzb21ld2hlcmVcclxuICAgIHRhcmdldDogdGFyZ2V0LFxyXG4gICAgLy8gV2lkdGggb2YgdGhlIGRpc3BsYXkgaW4gdGlsZXNcclxuICAgIHdpZHRoOiAyMCxcclxuICAgIC8vIEhlaWdodCBvZiB0aGUgZGlzcGxheSBpbiB0aWxlc1xyXG4gICAgaGVpZ2h0OiAxNSxcclxufTtcclxuXHJcbi8vIFN0YXJ0IHRoZSBkaXNwbGF5IVxyXG5jb25zdCBkaXNwbGF5ID0gbmV3IERpc3BsYXkocGFyYW1zKTtcclxuXHJcbi8vIFNldCB0aGUgdGlsZSBzaXplIHNvIHRoYXQgaXQgZml0cyBpdHMgY29udGFpbmVyXHJcbmRpc3BsYXkudGlsZVNpemUgPSBkaXNwbGF5LmNhbGN1bGF0ZVRpbGVTaXplKCk7XHJcblxyXG4vLyBPbmUgY29vbCB0aGluZyB5b3UgY2FuIGRvIGlzIGFkZCBhIGxpc3RlbmVyIGZvciB3aW5kb3cgcmVzaXppbmdcclxuLy8gS2VlcCB5b3VyIGRpc3BsYXkgbG9va2luZyBnb29kIVxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCgpPT57XHJcbiAgICBkaXNwbGF5LnRpbGVTaXplID0gZGlzcGxheS5jYWxjdWxhdGVUaWxlU2l6ZSgpO1xyXG59KTtcclxuXHJcbi8vIExldHMgZHJhdyBzb21lIHN0dWZmXHJcbmZvciAobGV0IHg9MDsgeCA8IHBhcmFtcy53aWR0aDsgeCsrKSB7XHJcbiAgICBmb3IgKGxldCB5PTA7IHkgPCBwYXJhbXMuaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICAvLyBEcmF3IHNvbWUgd2FsbHNcclxuICAgICAgICBpZiAoeD09PTAgfHwgeT09PTAgfHwgeD09PXBhcmFtcy53aWR0aC0xIHx8IHk9PT1wYXJhbXMuaGVpZ2h0LTEpIHtcclxuICAgICAgICAgICAgZGlzcGxheS5zZXRUaWxlKHgseSx7XHJcbiAgICAgICAgICAgICAgICAvLyBDb250ZW50IGNhbiBiZSBhIHN0cmluZywgb3IgQU5ZIGh0bWwgZWxlbWVudCEgKGluY2x1ZGluZyBpbWFnZXMhKVxyXG4gICAgICAgICAgICAgICAgY29udGVudDogJyMnLFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJyaWNrV2FsbFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBZGQgb3VyIHBsYXllciFcclxuICAgICAgICB9IGVsc2UgaWYgKHg9PT0zICYmIHk9PT01KSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXkuc2V0VGlsZSh4LHkse1xyXG4gICAgICAgICAgICAgICAgY29udGVudDogJ0AnLFxyXG4gICAgICAgICAgICAgICAgLy8gWW91IGNhbiB1c2UgYXMgbWFueSBjbGFzc2VzIGFzIHlvdSB3b3VsZCBsaWtlIVxyXG4gICAgICAgICAgICAgICAgY2xhc3NMaXN0OiBbXCJwbGF5ZXJcIl1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gU29tZSBmbG9vciBldmVyeXdoZXJlIGVsc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkaXNwbGF5LnNldFRpbGUoeCx5LHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICcuJyxcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJjb29sRmxvb3JcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEhtbSBhY3R1YWxseSBJIHdhbnQgdG8gY2hhbmdlIHNvbWUgb2YgdGhlIHRpbGVzIGEgYml0LiB1cGRhdGVUaWxlIGNoYW5nZXMgdGhlXHJcbi8vIHBhcmFtZXRlcnMgdGhhdCB5b3Ugc3BlY2lmeTsgc2V0VGlsZSByZXBsYWNlcyBldmVyeXRoaW5nLlxyXG5cclxuZm9yIChsZXQgaT01OyBpIDwgMTA7IGkrKykge1xyXG4gICAgZGlzcGxheS51cGRhdGVUaWxlKGksaSx7Y2xhc3NOYW1lOlwic3VwZXJBd2Vzb21lXCJ9KTtcclxufVxyXG5cclxuY29uc3QgcmFuZG9tU3R1ZmYgPSAoKT0+e1xyXG4gICAgLy8gWW91IGNhbiBkZWZpbmUgYSBzZWVkIGlmIHlvdSB3b3VsZCBsaWtlOyBpZiBub3QsIHRoZSBjdXJyZW50IHRpbWUgaXMgdXNlZC5cclxuICAgIGNvbnN0IG9wdGlvbmFsU2VlZCA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSk7XHJcbiAgICBcclxuICAgIC8vIFN0YXJ0IHRoZSByYW5kb20gbnVtYmVyIGdlbmVyYXRvclxyXG4gICAgY29uc3QgcmFuZG9tID0gbmV3IFJhbmRvbShvcHRpb25hbFNlZWQpO1xyXG4gICAgXHJcbiAgICAvLyBJZiB5b3Ugd2FudCBhIHJhbmRvbSBudW1iZXIgZnJvbSAwIDw9IHggPCAxOlxyXG4gICAgY29uc3QgeCA9IHJhbmRvbS5nZXRSYW5kb20oKTtcclxuICAgIFxyXG4gICAgLy8gSWYgeW91IHdvdWxkIGxpa2UgYSByYW5kb20gbnVtYmVyIGluIHRoZSByYW5nZSBvZiBsb3dlciA8PSB5IDw9IHVwcGVyIHlvdSBjYW4gdXNlIGdldE51bWJlci5cclxuICAgIGNvbnN0IGxvd2VyID0gMDtcclxuICAgIGNvbnN0IHVwcGVyID0gMTA7XHJcbiAgICBjb25zdCB5ID0gcmFuZG9tLmdldE51bWJlcihsb3dlcix1cHBlcik7XHJcbiAgICBcclxuICAgIC8vIElmIHRoZSBnaXZlbiBib3VuZHMgYXJlIGludGVnZXJzLCBpdCB3aWxsIGdlbmVyYXRlIGludGVnZXJzLlxyXG4gICAgLy8gSWYgbm90LCBpdCB3aWxsIGdlbmVyYXRlIGRlY2ltYWxzLlxyXG4gICAgLy8gSWYgeW91IHdhbnQgdG8gc3BlY2lmeSBleHBsaWNpdGx5LCB1c2UgdGhlIGludGVnZXIgYm9vbGVhbiBwYXJhbWV0ZXIuXHJcbiAgICBjb25zdCBub1RoYW5rc05vdEludGVnZXIgPSByYW5kb20uZ2V0TnVtYmVyKGxvd2VyLHVwcGVyLGZhbHNlKTtcclxuICAgIFxyXG4gICAgLy8gSWYgeW91IHdhbnQgYSByYW5kb20gZWxlbWVudCBmcm9tIGFuIGFycmF5LCB1c2UgZ2V0UmFuZG9tRWxlbWVudC5cclxuICAgIGNvbnN0IGNvb2xBcnJheSA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3XTtcclxuICAgIGNvbnN0IHJhbmRvbUVsZW1lbnQgPSByYW5kb20uZ2V0UmFuZG9tRWxlbWVudChjb29sQXJyYXkpO1xyXG4gICAgXHJcbiAgICAvLyBJZiB5b3Ugd2FudCB0byBwcm92aWRlIHdlaWdodHMgZm9yIGVhY2ggdmFsdWUsIHlvdSBjYW4gdXNlIGdldFdlaWdodGVkRWxlbWVudC5cclxuICAgIGNvbnN0IHdlaWdodGVkQXJyYXkgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3ZWlnaHQ6IDEwLFxyXG4gICAgICAgICAgICBvcHRpb246IFwiQ3V0ZSBkb2dcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3ZWlnaHQ6IDE1LFxyXG4gICAgICAgICAgICBvcHRpb246IFwiQXdlc29tZSBjYXRcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3ZWlnaHQ6IDEsXHJcbiAgICAgICAgICAgIG9wdGlvbjogXCJSYXJlIEZyYW5rbGluXCJcclxuICAgICAgICB9XHJcbiAgICBdO1xyXG4gICAgXHJcbiAgICBjb25zdCByYW5kb21XZWlnaHRlZEVsZW1lbnQgPSByYW5kb20uZ2V0V2VpZ2h0ZWRFbGVtZW50KHdlaWdodGVkQXJyYXkpO1xyXG4gICAgXHJcbiAgICBjb25zdCByZXN1bHRzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFuZG9tUmVzdWx0c1wiKTtcclxuXHJcbiAgICAvLyBDbGVhciBpdCBvdXQsIHRoZW4gZmlsbCBpdCB1cCBhZ2FpblxyXG4gICAgd2hpbGUocmVzdWx0c0xpc3QubGFzdENoaWxkKSB7XHJcbiAgICAgICAgcmVzdWx0c0xpc3QucmVtb3ZlQ2hpbGQocmVzdWx0c0xpc3QubGFzdENoaWxkKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgYXR0YWNoUmVzdWx0ID0gZnVuY3Rpb24gKG5hbWUsIHJlc3VsdCkge1xyXG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gICAgICAgIGNvbnN0IHRleHQgPSBgJHtuYW1lfSA6ICR7cmVzdWx0fWA7XHJcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkpO1xyXG4gICAgICAgIHJlc3VsdHNMaXN0LmFwcGVuZENoaWxkKGxpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgYXR0YWNoUmVzdWx0KFwieFwiLCB4LnRvU3RyaW5nKCkpO1xyXG4gICAgYXR0YWNoUmVzdWx0KFwieVwiLCB5LnRvU3RyaW5nKCkpO1xyXG4gICAgYXR0YWNoUmVzdWx0KFwibm9UaGFua3NOb3RJbnRlZ2VyXCIsIG5vVGhhbmtzTm90SW50ZWdlci50b1N0cmluZygpKTtcclxuICAgIGF0dGFjaFJlc3VsdChcInJhbmRvbUVsZW1lbnRcIiwgcmFuZG9tRWxlbWVudC50b1N0cmluZygpKTtcclxuICAgIGF0dGFjaFJlc3VsdChcInJhbmRvbVdlaWdodGVkRWxlbWVudFwiLCByYW5kb21XZWlnaHRlZEVsZW1lbnQudG9TdHJpbmcoKSk7XHJcbn1cclxuXHJcbi8vIERvIGl0IG9uY2Ugb24gcGFnZSBsb2FkXHJcbnJhbmRvbVN0dWZmKCk7XHJcblxyXG4vLyBBdHRhY2ggaXQgdG8gYSBidXR0b24gc28gdGhlIHJlYWRlciBjYW4gcHVzaCBpdFxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhbmRvbUJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixyYW5kb21TdHVmZik7XHJcblxyXG4vLyBDb2xvcmZ1bCBkaXNwbGF5LCBob29yYXlcclxuY29uc3QgY29sb3JUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbG9yRGlzcGxheVwiKTtcclxuXHJcbi8vIEluaXRpYWxpemUgaXRcclxuY29uc3QgY29sb3JEaXNwbGF5ID0gbmV3IERpc3BsYXkoe3RhcmdldDpjb2xvclRhcmdldCwgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwfSk7XHJcblxyXG4vLyBEcmF3IHNvbWUgc3R1ZmZcclxuZm9yKGxldCBpPTA7aTwxMDtpKyspIHtcclxuICAgIGZvcihsZXQgaj0wO2o8MTA7aisrKSB7XHJcbiAgICAgICAgaWYgKGk9PT0wIHx8IGo9PT0wIHx8IGk9PT05IHx8IGo9PT05KSB7XHJcbiAgICAgICAgICAgIC8vIERpZCB5b3Uga25vdyB5b3UgY2FuIHVzZSBhIHNob3J0aGFuZCBoZXJlPyBOb3cgeW91IGRvIVxyXG4gICAgICAgICAgICBjb2xvckRpc3BsYXkuc2V0VGlsZShpLGosJyMnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGk9PT0zICYmIGo9PT0zKSB7XHJcbiAgICAgICAgICAgIGNvbG9yRGlzcGxheS5zZXRUaWxlKGksaiwnQCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaT09PTQgJiYgaj09PTUpIHtcclxuICAgICAgICAgICAgY29sb3JEaXNwbGF5LnNldFRpbGUoaSxqLHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICdnJyxcclxuICAgICAgICAgICAgICAgIC8vIFlvdSBjYW4gdXNlIGlubGluZSBjb2xvcnMgYW5kIGJhY2tncm91bmRzIGlmXHJcbiAgICAgICAgICAgICAgICAvLyB5b3UgUkVBTExZIHdhbnQgdG8sIGJ1dCBJIGRpc2NvdXJhZ2UgaXQuXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2dyZWVuJyxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDEyOCwwLDAsMC4yKScsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbG9yRGlzcGxheS5zZXRUaWxlKGksaiwnLicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gTWFrZSB0aGUgZGlzcGxheSBmaXQgdGhlIGNvbnRhaW5lclxyXG5jb2xvckRpc3BsYXkudGlsZVNpemUgPSBjb2xvckRpc3BsYXkuY2FsY3VsYXRlVGlsZVNpemUoKTtcclxuXHJcbi8vIENlbnRlciBpdCBvbiB0aGUgcGxheWVyXHJcbmNvbG9yRGlzcGxheS5jZW50ZXJEaXNwbGF5KDMsMyk7XHJcblxyXG4vLyBIZXJlJ3MgYSBjb29sIG1hcCB0byBsaXZlIGluXHJcbmNvbnN0IG1hcCA9IFtcclxuICAgIFwiIyMjIyMjIyMjIyMjIyMjIyMjIyNcIixcclxuICAgIFwiIy4uLi4uLi4uLi4uLi4uLi4uLiNcIixcclxuICAgIFwiIy4uIy4uLi4uIy4uLi4jLi4uLiNcIixcclxuICAgIFwiIy4uIy4uLi4uIyMjLi4uIyMuLiNcIixcclxuICAgIFwiIy4uIy4uLi4uIy4uLi4uLi4uLiNcIixcclxuICAgIFwiIy4uLi4uLi4uLi4uLi4jIyMjLiNcIixcclxuICAgIFwiIy4uLi4uLi4uIy4uLi4jLi4uLiNcIixcclxuICAgIFwiIyMjIy4uLiMjIy4uLi4jLi4uLiNcIixcclxuICAgIFwiIy4uLi4uLi4uIy4uLi4jLi4uLiNcIixcclxuICAgIFwiIyMjIyMjIyMjIyMjIyMjIyMjIyNcIixcclxuXTtcclxuY29uc3Qgd2lkdGggPSBtYXBbMF0ubGVuZ3RoO1xyXG5jb25zdCBoZWlnaHQgPSBtYXAubGVuZ3RoO1xyXG5cclxuLy8gQW5kIGxldHMgc3RhcnQgdXAgYSBkaXNwbGF5IHRvIHVzZVxyXG5jb25zdCBmb3ZEaXNwbGF5UGFyYW1zID0ge1xyXG4gICAgdGFyZ2V0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvdk1hcFwiKSxcclxuICAgIHdpZHRoOiB3aWR0aCxcclxuICAgIGhlaWdodDogaGVpZ2h0LFxyXG59O1xyXG5jb25zdCBmb3ZEaXNwbGF5ID0gbmV3IERpc3BsYXkoZm92RGlzcGxheVBhcmFtcyk7XHJcbmZvdkRpc3BsYXkudGlsZVNpemUgPSBmb3ZEaXNwbGF5LmNhbGN1bGF0ZVRpbGVTaXplKCk7XHJcblxyXG4vLyBGT1YgdGFrZXMgYSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGRlY2lkZXMgd2hldGhlciBvciBub3QgeW91IGNhbiBzZWUgc29tZXRoaW5nLlxyXG4vLyBJdCB0YWtlcyBvbmUgcGFyYW1ldGVyLCB3aGljaCBpcyBhIHR3byBlbGVtZW50IHBvc2l0aW9uIGFycmF5IHBvcyA9IFt4LHldXHJcbi8vIGFuZCByZXR1cm5zIHRydWUgb3IgZmFsc2UuXHJcbmNvbnN0IGNhblNlZSA9IChwb3NpdGlvbikgPT4ge1xyXG4gICAgY29uc3QgeCA9IHBvc2l0aW9uWzBdO1xyXG4gICAgY29uc3QgeSA9IHBvc2l0aW9uWzFdO1xyXG5cclxuICAgIC8vIE1ha2Ugc3VyZSBpdCdzIGV2ZW4gb24gdGhlIG1hcFxyXG4gICAgaWYgKCB4PDAgfHwgeD49d2lkdGggfHwgeTwwIHx8IHk+PWhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRpbGUgPSBtYXBbeV1beF07XHJcblxyXG4gICAgLy8gRmlyc3QsIHJlZ2FyZGxlc3Mgb2Ygc3VjY2VzcyBvciBub3QsIHNlZSB0aGlzIHRpbGVcclxuICAgIGZvdkRpc3BsYXkuc2V0VGlsZSh4LHksdGlsZSk7XHJcblxyXG4gICAgLy8gTmV4dCwgdXNlIHdoYXRldmVyIGNyaXRlcmlhIHdlIHdhbnQgdG8gZGVjaWRlIGlmIGl0IGlzIHNlZXRocm91Z2ggb3Igbm90LlxyXG4gICAgLy8gSW4gdGhpcyBjYXNlLCBpZiBpdCdzIG5vdCBhIHdhbGwgKG9yICMgY2hhcmFjdGVyKSwgd2UgY2FuIHNlZSB0aHJvdWdoIGl0LlxyXG4gICAgcmV0dXJuIHRpbGUgIT09ICcjJztcclxufVxyXG5cclxuLy8gSXQgaGFzIGFuIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgZm9yIGRpc3RhbmNlLiBUaGUgZGVmYXVsdCBpcyA4LlxyXG5jb25zdCBvcHRpb25hbFJhbmdlID0gMjA7XHJcblxyXG4vLyBJbml0aWFsaXplIHRoZSBGT1Ygb2JqZWN0IVxyXG5jb25zdCBmb3YgPSBuZXcgRk9WKGNhblNlZSwgb3B0aW9uYWxSYW5nZSk7XHJcblxyXG4vLyBDaG9vc2UgYSBwb3NpdGlvbiBmb3IgdGhlIHBsYXllciB0byBiZVxyXG5jb25zdCBwbGF5ZXJQb3MgPSBbNSw1XTtcclxuXHJcbi8vIFNsaWdodGx5IGhhY2t5IHdheSB0byBhZGQgdGhlIHBsYXllcjsgdXNlIGEgYmV0dGVyIGRhdGEgc3RydWN0dXJlIGZvciB5b3VyIGdhbWVzIVxyXG5jb25zdCBtYXBSb3cgPSBtYXBbcGxheWVyUG9zWzFdXTtcclxubWFwW3BsYXllclBvc1sxXV0gPSBtYXBSb3cuc2xpY2UoMCxwbGF5ZXJQb3NbMF0pICsgJ0AnICsgbWFwUm93LnNsaWNlKHBsYXllclBvc1swXSsxKTtcclxuXHJcbi8vIE5vdywgTE9PSyFcclxuZm92Lmxvb2socGxheWVyUG9zKTtcclxuXHJcbi8vIEZpcnN0LCBzb21lIHNldHVwLCBzbyB3ZSBjYW4gcmVjb3JkIG91ciBvdXRwdXRcclxuY29uc3Qgc2ltcGxlTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2ltcGxlRXZlbnRMaXN0XCIpO1xyXG5jb25zdCBjb21wbGV4TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcGxleEV2ZW50TGlzdFwiKTtcclxuXHJcblxyXG4vLyBMZXRzIG1ha2UgYSBoZWxwZXIgZnVuY3Rpb24gdG8gcmVjb3JkIG91ciBvdXRwdXRcclxuY29uc3Qgc2hvd0FjdGlvbiA9IChhY3Rpb24sIGxpc3QpID0+IHtcclxuICAgIC8vIE1ha2UgYSBsaXN0IGl0ZW0gYW5kIGFkZCB0aGUgYWN0aW9uIHRvIGl0LlxyXG4gICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIilcclxuICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGFjdGlvbikpO1xyXG4gICAgLy8gQXR0YWNoIGl0IHRvIHRoZSBsaXN0LCBzbyB3ZSBjYW4gc2VlIHdoYXQgaGFwcGVucy5cclxuICAgIGxpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xyXG59O1xyXG5cclxuLy8gVGhlcmUncyB0d28gdHlwZXMgb2YgZXZlbnQgbWFuYWdlcnMgeW91IGNhbiBtYWtlLlxyXG4vLyBMZXRzIHN0YXJ0IHdpdGggdGhlIHNpbXBsZSBvbmUuIEV2ZXJ5b25lIHRha2VzIHR1cm5zLCBvbmUgYWZ0ZXIgdGhlIG90aGVyLlxyXG5jb25zdCBzaW1wbGVFdmVudHMgPSBuZXcgRXZlbnRNYW5hZ2VyKHt0eXBlOlwic2ltcGxlXCJ9KTtcclxuXHJcbi8vIFVzdWFsbHksIHdlIHdhbnQgdG8gYWRkIHNvbWUgYWN0b3JzIHRvIHRoZSBzeXN0ZW0uXHJcbi8vIFRoZSBzeXN0ZW0gY2FsbHMgdGhlaXIgXCJhY3RcIiBtZXRob2QuXHJcblxyXG5jb25zdCBzaW1wbGVHb2JsaW4gPSB7XHJcbiAgICBhY3Q6ICgpPT5zaG93QWN0aW9uKFwiVGhlIEdvYmxpbiBnb2JsaW5zIVwiLCBzaW1wbGVMaXN0KVxyXG59XHJcblxyXG5jb25zdCBzaW1wbGVDYXQgPSB7XHJcbiAgICBhY3Q6ICgpPT5zaG93QWN0aW9uKFwiVGhlIGNhdCBtZW93cyFcIiwgc2ltcGxlTGlzdClcclxufVxyXG5cclxuLy8gQWRkIHRoZW0gdG8gdGhlIGV2ZW50IG1hbmFnZXJcclxuc2ltcGxlRXZlbnRzLmFkZChzaW1wbGVHb2JsaW4pO1xyXG5zaW1wbGVFdmVudHMuYWRkKHNpbXBsZUNhdCk7XHJcblxyXG4vLyBZb3UgY2FuIGFsc28gYWRkIGNhbGxiYWNrIGZ1bmN0aW9ucyBvbiB0aGVpciBvd24sIGFzIGV2ZW50cyBvciB3aGF0ZXZlciB5b3VyIGhlYXJ0IHBsZWFzZXMuXHJcbi8vIFRoZXkgY2FuIHJlcGVhdCBmb3JldmVyLi4uXHJcbnNpbXBsZUV2ZW50cy5hZGQoe1xyXG4gICAgY2FsbGJhY2s6ICgpPT5zaG93QWN0aW9uKFwiRHJpcCBkcmlwIGdvZXMgdGhlIGZhdWNldC5cIiwgc2ltcGxlTGlzdCksXHJcbiAgICByZXBlYXRzOiB0cnVlXHJcbn0pXHJcblxyXG4vLyBSZXBlYXQgYSBmZXcgdGltZXNcclxuc2ltcGxlRXZlbnRzLmFkZCh7XHJcbiAgICBjYWxsYmFjazogKCk9PnNob3dBY3Rpb24oXCJSdXNoaW5nIHdpbmQhIE9oIG5vIVwiLCBzaW1wbGVMaXN0KSxcclxuICAgIHJlcGVhdHM6IDJcclxufSlcclxuXHJcbi8vIE9yIG5vdCByZXBlYXQgYXQgYWxsIVxyXG5zaW1wbGVFdmVudHMuYWRkKHtcclxuICAgIGNhbGxiYWNrOiAoKT0+c2hvd0FjdGlvbihcIlRoZSBob3VzZSBvZiBjYXJkcyBmYWxscyBvdmVyLiBXaG9vcHMhXCIsIHNpbXBsZUxpc3QpXHJcbn0pO1xyXG5cclxuLy8gVGhlbiB5b3UganVzdCBraWNrIGl0IG9mZiBpbiB5b3VyIHByZWZlcnJlZCBtYW5uZXIuXHJcbi8vIEVhY2ggdGltZSB5b3UgY2FsbCBhZHZhbmNlLCBpdCB3aWxsIHN0ZXAgZm9yd2FyZCBvbmUgc3RlcC5cclxuLy8gSWYgYWN0IHJldHVybnMgYSBwcm9taXNlIChzYXksIGlmIHlvdSdyZSB3YWl0aW5nIGZvciBwbGF5ZXIgaW5wdXQpXHJcbi8vIGl0IHdpbGwgd2FpdCBmb3IgdGhhdCBhY3Rpb24gdG8gY29uY2x1ZGUuXHJcbmZvcihsZXQgaT0wO2k8MjA7aSsrKSB7XHJcbiAgICBzaW1wbGVFdmVudHMuYWR2YW5jZSgpO1xyXG59XHJcblxyXG4vLyBUaGUgc2Vjb25kIHR5cGUgb2YgZXZlbnQgbWFuYWdlciBpcyBjb21wbGV4OlxyXG5jb25zdCBjb21wbGV4RXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcih7dHlwZTpcImNvbXBsZXhcIn0pO1xyXG5cclxuLy8gVGhlIGNvbXBsZXggZXZlbnQgbWFuYWdlciBhY2NlcHRzIGRpZmZlcmVudCBkZWxheXMgZm9yIGRpZmZlcmVudCBhY3RvcnNcclxuXHJcbmNvbnN0IGZhc3RDYXQgPSB7XHJcbiAgICBhY3Q6KCk9PnNob3dBY3Rpb24oXCJGYXN0IGNhdCBueW9vbXMhXCIsIGNvbXBsZXhMaXN0KVxyXG59XHJcblxyXG5jb25zdCBzbG93T2dyZSA9IHtcclxuICAgIGFjdDooKT0+c2hvd0FjdGlvbihcIlNsb3cgb2dyZSBpcyBzbG9vb293XCIsIGNvbXBsZXhMaXN0KVxyXG59XHJcblxyXG4vLyBUaGUgZGVsYXkgcHJvcGVydHkgZGVmaW5lcyBob3cgc2xvdyBhbiBhY3RvciBpc1xyXG5jb21wbGV4RXZlbnRzLmFkZCh7XHJcbiAgICBhY3RvcjpmYXN0Q2F0LFxyXG4gICAgZGVsYXk6MVxyXG59KTtcclxuXHJcbmNvbXBsZXhFdmVudHMuYWRkKHtcclxuICAgIGFjdG9yOnNsb3dPZ3JlLFxyXG4gICAgZGVsYXk6NVxyXG59KTtcclxuXHJcbi8vIE9yIGhvdyBsb25nIGFuIGV2ZW50IHRha2VzXHJcbmNvbXBsZXhFdmVudHMuYWRkKHtcclxuICAgIGNhbGxiYWNrOigpPT5zaG93QWN0aW9uKFwiVGhlIG1haWwgaGFzIGp1c3QgYXJyaXZlZC4gU3dlZXQhXCIsIGNvbXBsZXhMaXN0KSxcclxuICAgIGRlbGF5OiAxNlxyXG59KTtcclxuXHJcbi8vIEFkdmFuY2UgdGhlIGNsb2NrLi4uXHJcbmZvcihsZXQgaT0wO2k8MjA7aSsrKSB7XHJcbiAgICBjb21wbGV4RXZlbnRzLmFkdmFuY2UoKTtcclxufVxyXG5cclxubWFwW3BsYXllclBvc1sxXV0gPSBtYXBSb3cuc2xpY2UoMCxwbGF5ZXJQb3NbMF0pICsgJy4nICsgbWFwUm93LnNsaWNlKHBsYXllclBvc1swXSsxKTtcclxuXHJcbi8vIEZpcnN0LCBsZXRzIHNldHVwIGFub3RoZXIgZGlzcGxheSEgSSB3YW50IHRvIGRyYXcgdGhlIHBhdGggd2UgZmluZC5cclxuLy8gQW5kIGxldHMgc3RhcnQgdXAgYSBkaXNwbGF5IHRvIHVzZS5cclxuLy8gV2UncmUgZ29pbmcgdG8gdXNlIHRoZSBzYW1lIG1hcCBmcm9tIHRoZSBGT1Ygc2VjdGlvbi5cclxuY29uc3QgcGF0aERpc3BsYXlQYXJhbXMgPSB7XHJcbiAgICB0YXJnZXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGF0aERpc3BsYXlcIiksXHJcbiAgICB3aWR0aDogd2lkdGgsXHJcbiAgICBoZWlnaHQ6IGhlaWdodCxcclxufTtcclxuY29uc3QgcGF0aERpc3BsYXkgPSBuZXcgRGlzcGxheShwYXRoRGlzcGxheVBhcmFtcyk7XHJcbnBhdGhEaXNwbGF5LnRpbGVTaXplID0gcGF0aERpc3BsYXkuY2FsY3VsYXRlVGlsZVNpemUoKTtcclxuXHJcbi8vIExldHMgZHJhdyB0aGUgbWFwIHRvIHN0YXJ0XHJcbm1hcC5mb3JFYWNoKChyb3cseSk9PnJvdy5zcGxpdCgnJykuZm9yRWFjaCgodGlsZSx4KT0+e1xyXG4gICAgcGF0aERpc3BsYXkuc2V0VGlsZSh4LHksdGlsZSk7XHJcbn0pKTtcclxuXHJcbi8vIE5vdywgbGV0cyBzZXR1cCB0aGUgcGF0aGZpbmRlciFcclxuLy8gVGhlIFBhdGhGaW5kZXIgdGFrZXMgYSBcImNhblBhc3NcIiBjYWxsYmFjayB0byBkZXRlcm1pbmUgd2hhdCBpcyBwYXNzYWJsZS5cclxuLy8gVGhpcyBsb29rcyBzaW1pbGFyIHRvIHRoZSBjYW5TZWUgY2FsbGJhY2sgZnJvbSBiZWZvcmUsIGJ1dCBpdCBkb2Vzbid0IGhhdmUgdG8uXHJcbmNvbnN0IHBhdGhmaW5kZXIgPSBuZXcgUGF0aEZpbmRlcih7XHJcbiAgICBjYW5QYXNzOihbeCx5XSk9PntcclxuICAgICAgICAvLyBNYWtlIHN1cmUgaXQncyBldmVuIG9uIHRoZSBtYXBcclxuICAgICAgICBpZiAoIHg8MCB8fCB4Pj13aWR0aCB8fCB5PDAgfHwgeT49aGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdGlsZSA9IG1hcFt5XVt4XTtcclxuXHJcbiAgICAgICAgLy8gTmV4dCwgdXNlIHdoYXRldmVyIGNyaXRlcmlhIHdlIHdhbnQgdG8gZGVjaWRlIGlmIGl0IGlzIHBhc3NhYmxlLlxyXG4gICAgICAgIC8vIEluIHRoaXMgY2FzZSwgaWYgaXQncyBub3QgYSB3YWxsIChvciAjIGNoYXJhY3RlciksIHdlIGNhbiB3YWxrIHRocm91Z2ggaXQuXHJcbiAgICAgICAgcmV0dXJuIHRpbGUgIT09ICcjJztcclxuICAgIH1cclxufSk7XHJcblxyXG4vLyBMZXQgY2hvb3NlIGEgc3RhcnRpbmcgcG9zaXRpb24sIGFuZCBhIHRhcmdldCBwb3NpdGlvbiFcclxuY29uc3Qgc3RhcnRQb3MgPSBbMSw4XTtcclxuY29uc3QgZW5kUG9zID0gWzE1LDhdO1xyXG5cclxuLy8gSXQgY2FuIGFsc28gdGFrZSBhbiBvcHRpb25hbCBcIm9ydGhvZ29uYWxPbmx5XCIgcGFyYW1ldGVyLlxyXG4vLyBUaGlzIHNldHMgd2hldGhlciBvciBub3QgdGhlIHBhdGhmaW5kZXIgd2lsbCB1c2UgZGlhZ29uYWxzLlxyXG5jb25zdCBvcHRpb25hbE9ydGhvZ29uYWxPbmx5ID0gZmFsc2U7XHJcblxyXG4vLyBOb3csIGxldHMgZmluZCB0aGUgcGF0aCFcclxuY29uc3QgcGF0aCA9IHBhdGhmaW5kZXIuZmluZFBhdGgoc3RhcnRQb3MsIGVuZFBvcywgb3B0aW9uYWxPcnRob2dvbmFsT25seSk7XHJcblxyXG4vLyBEcmF3IGl0IG9udG8gdGhlIG1hcCB0byB0YWtlIGEgbG9vayBhdCBpdC5cclxucGF0aC5mb3JFYWNoKChbeCx5XSk9PntcclxuICAgIHBhdGhEaXNwbGF5LnVwZGF0ZVRpbGUoeCx5LHtcclxuICAgICAgICBjb250ZW50OidYJyxcclxuICAgICAgICBjbGFzc05hbWU6IFwicGF0aE1hcmtlclwiXHJcbiAgICB9KVxyXG59KTtcclxuXHJcbi8vIE5vdGUgdGhhdCB0aGUgZHJhd24gcGF0aCBkb2Vzbid0IGluY2x1ZGUgdGhlIHN0YXJ0aW5nIHBvc2l0aW9uLlxyXG4vLyBUaGlzIGlzIHNvIHlvdSBjYW4ganVzdCBncmFiIHBhdGhbMF0gdG8gZ2V0IHRoZSBmaXJzdCBzdGVwIGluIHlvdXIgam91cm5leS5cclxuLy8gTGV0cyBkcmF3IG9uIHRoZSBwbGF5ZXIsIHRvbywgZm9yIGlsbHVzdHJhdGlvbi5cclxucGF0aERpc3BsYXkudXBkYXRlVGlsZShzdGFydFBvc1swXSwgc3RhcnRQb3NbMV0sICdAJyk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCgpPT57XHJcbiAgICBjb2xvckRpc3BsYXkudGlsZVNpemUgPSBjb2xvckRpc3BsYXkuY2FsY3VsYXRlVGlsZVNpemUoKTtcclxuICAgIGZvdkRpc3BsYXkudGlsZVNpemUgPSBmb3ZEaXNwbGF5LmNhbGN1bGF0ZVRpbGVTaXplKCk7XHJcbiAgICBwYXRoRGlzcGxheS50aWxlU2l6ZSA9IHBhdGhEaXNwbGF5LmNhbGN1bGF0ZVRpbGVTaXplKCk7XHJcbn0pO1xyXG5cclxuLy8gV0ZDIGRpc3BsYXlcclxuY29uc3Qgd2ZjRGlzcGxheVBhcmFtcyA9IHtcclxuICAgIHRhcmdldDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZmNEaXNwbGF5XCIpLFxyXG4gICAgd2lkdGg6IDIwLFxyXG4gICAgaGVpZ2h0OiAyMCxcclxufTtcclxuY29uc3Qgd2ZjRGlzcGxheSA9IG5ldyBEaXNwbGF5KHdmY0Rpc3BsYXlQYXJhbXMpO1xyXG53ZmNEaXNwbGF5LnRpbGVTaXplID0gd2ZjRGlzcGxheS5jYWxjdWxhdGVUaWxlU2l6ZSgpO1xyXG5cclxuLy8gVGhlIFdGQyBnZW5lcmF0b3IgdGFrZXMgYW4gaW5wdXQgXCJpbWFnZVwiLCB3aGljaCBpdCB1c2VzIHRvIGZpZ3VyZSBvdXQgcnVsZXMgZm9yIHRoZSBvdXRwdXQuXHJcbmNvbnN0IGlucHV0SW1hZ2UgPSBbXHJcbiAgICBcIi4jLi5cIixcclxuICAgIFwiLiMuLlwiLFxyXG4gICAgXCIjIyMjXCIsXHJcbiAgICBcIi4jLi5cIixcclxuXTtcclxuXHJcbmNvbnN0IHdmYyA9IG5ldyBXRkMoe2lucHV0OmlucHV0SW1hZ2UsbjozLHJlcGVhdElucHV0OnRydWV9KTtcclxud2ZjLmdlbmVyYXRlKHt3aWR0aDoyMCxoZWlnaHQ6MjAscmVwZWF0T3V0cHV0OnRydWV9KS50aGVuKHJlc3VsdD0+e1xyXG4gICAgcmVzdWx0LmZvckVhY2goKHJvdyxqKT0+e1xyXG4gICAgICAgIHJvdy5mb3JFYWNoKChjb2wsaSk9PntcclxuICAgICAgICAgICAgd2ZjRGlzcGxheS5zZXRUaWxlKGksaixjb2wpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuXHJcbmNvbnN0IHdmY0Rpc3BsYXlQYXJhbXNUd28gPSB7XHJcbiAgICB0YXJnZXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2ZjRGlzcGxheVR3b1wiKSxcclxuICAgIHdpZHRoOiAyMCxcclxuICAgIGhlaWdodDogMjAsXHJcbn07XHJcbmNvbnN0IHdmY0Rpc3BsYXlUd28gPSBuZXcgRGlzcGxheSh3ZmNEaXNwbGF5UGFyYW1zVHdvKTtcclxud2ZjRGlzcGxheVR3by50aWxlU2l6ZSA9IHdmY0Rpc3BsYXlUd28uY2FsY3VsYXRlVGlsZVNpemUoKTtcclxuXHJcbi8vIFRoZSBXRkMgZ2VuZXJhdG9yIHRha2VzIGFuIGlucHV0IFwiaW1hZ2VcIiwgd2hpY2ggaXQgdXNlcyB0byBmaWd1cmUgb3V0IHJ1bGVzIGZvciB0aGUgb3V0cHV0LlxyXG5jb25zdCBpbnB1dEltYWdlVHdvID0gW1xyXG4gICAgXCIgICAgICAgICAgICAgICAgIFwiLFxyXG4gICAgXCIgICAgICAgICAgICAgWCAgIFwiLFxyXG4gICAgXCIgICAgWCMgICAgICAgIyAgIFwiLFxyXG4gICAgXCIgICAgICMgICAgICAgIyAgIFwiLFxyXG4gICAgXCIgICAgICMgIFggICAgIyAgIFwiLFxyXG4gICAgXCIgICAgICMjIyMjIyMjIyAgIFwiLFxyXG4gICAgXCIgICAgICMgICAgICMgICAgIFwiLFxyXG4gICAgXCIgICAgICMgICAgIFggICAgIFwiLFxyXG4gICAgXCIgICAgIFggICAgICAgICAgIFwiLFxyXG4gICAgXCIgICAgICAgICAgICAgICAgIFwiLFxyXG5dO1xyXG5cclxuY29uc3Qgd2ZjVHdvID0gbmV3IFdGQyh7aW5wdXQ6aW5wdXRJbWFnZVR3byxuOjMscmVwZWF0SW5wdXQ6dHJ1ZSxpbmNsdWRlTWlycm9yczp0cnVlLGluY2x1ZGVSb3RhdGlvbnM6dHJ1ZX0pO1xyXG53ZmNUd28uZ2VuZXJhdGUoe3dpZHRoOjIwLGhlaWdodDoyMCxyZXBlYXRPdXRwdXQ6dHJ1ZX0pLnRoZW4ocmVzdWx0PT57XHJcbiAgICByZXN1bHQuZm9yRWFjaCgocm93LGopPT57XHJcbiAgICAgICAgcm93LmZvckVhY2goKGNvbCxpKT0+e1xyXG4gICAgICAgICAgICB3ZmNEaXNwbGF5VHdvLnNldFRpbGUoaSxqLGNvbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG4iLCJ2YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxuaW1wb3J0IFRpbGUgZnJvbSAnLi9UaWxlLmpzJztcclxuaW1wb3J0IGNzcyBmcm9tICcuL0Rpc3BsYXlTdHlsZS5qcyc7XHJcbi8qKiBEaXNwbGF5IGNsYXNzLCB0byBjcmVhdGUgYW5kIGNvbnRyb2wgYSBkaXNwbGF5ICovXHJcbnZhciBEaXNwbGF5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqIENyZWF0ZSBhIG5ldyBEaXNwbGF5XHJcbiAgICAgKiAgQHBhcmFtIHtEaXNwbGF5UGFyYW1zfSBwYXJhbWV0ZXJzIC0gT2JqZWN0IG9mIHBhcmFtZXRlcnMgdG8gaW5pdGlhbGl6ZSB0aGUgZGlzcGxheS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gRGlzcGxheShwYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IHBhcmFtZXRlcnMudGFyZ2V0LCBfYSA9IHBhcmFtZXRlcnMud2lkdGgsIHdpZHRoID0gX2EgPT09IHZvaWQgMCA/IDEgOiBfYSwgX2IgPSBwYXJhbWV0ZXJzLmhlaWdodCwgaGVpZ2h0ID0gX2IgPT09IHZvaWQgMCA/IDEgOiBfYiwgdGlsZVdpZHRoID0gcGFyYW1ldGVycy50aWxlV2lkdGgsIHRpbGVIZWlnaHQgPSBwYXJhbWV0ZXJzLnRpbGVIZWlnaHQsIHJlc3QgPSBfX3Jlc3QocGFyYW1ldGVycywgW1widGFyZ2V0XCIsIFwid2lkdGhcIiwgXCJoZWlnaHRcIiwgXCJ0aWxlV2lkdGhcIiwgXCJ0aWxlSGVpZ2h0XCJdKTtcclxuICAgICAgICAvLyBTZXQgdGhlIHRhcmdldFxyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIGlmICh0aGlzLnRhcmdldC5jbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQuY2xhc3NMaXN0LmFkZChcInB1bXBraW4tY29udGFpbmVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQuY2xhc3NOYW1lID0gXCJwdW1wa2luLWNvbnRhaW5lclwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBDcmVhdGUgdGhlIGVsZW1lbnQgZm9yIHRoZSBkaXNwbGF5XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9IFwicHVtcGtpbi1kaXNwbGF5XCI7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuICAgICAgICAvLyBTZXQgdGhlIGRpc3BsYXkgZGltZW5zaW9uc1xyXG4gICAgICAgIHRoaXMuZGltZW5zaW9ucyA9IHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9O1xyXG4gICAgICAgIHRoaXMudGlsZVNpemUgPSB7XHJcbiAgICAgICAgICAgIHRpbGVXaWR0aDogKHRpbGVXaWR0aCkgPyB0aWxlV2lkdGggOiAxNixcclxuICAgICAgICAgICAgdGlsZUhlaWdodDogKHRpbGVIZWlnaHQpID8gdGlsZUhlaWdodCA6ICh0aWxlV2lkdGgpID8gdGlsZVdpZHRoIDogMTZcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEFkZCBzdHlsZSB0byB0aGUgcGFnZSBmb3IgdGhlIGRpc3BsYXlcclxuICAgICAgICB0aGlzLmFwcGx5RGVmYXVsdFN0eWxlcygpO1xyXG4gICAgICAgIC8vIEFwcGVuZCB0byB0aGUgY29udGFpbmVyIGVsZW1lbnRcclxuICAgICAgICB0aGlzLnRhcmdldC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERpc3BsYXkucHJvdG90eXBlLCBcInRpbGVTaXplXCIsIHtcclxuICAgICAgICAvKiogVGlsZSBzaXplICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aWxlU2l6ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1RpbGVTaXplKSB7XHJcbiAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgdGhpcy5fdGlsZVNpemUgPSBuZXdUaWxlU2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmZvbnRTaXplID0gbmV3VGlsZVNpemUudGlsZUhlaWdodCArIFwicHhcIjtcclxuICAgICAgICAgICAgKF9hID0gdGhpcy50aWxlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZvckVhY2goZnVuY3Rpb24gKHRpbGUpIHtcclxuICAgICAgICAgICAgICAgIHRpbGUudGlsZVdpZHRoID0gbmV3VGlsZVNpemUudGlsZVdpZHRoO1xyXG4gICAgICAgICAgICAgICAgdGlsZS50aWxlSGVpZ2h0ID0gbmV3VGlsZVNpemUudGlsZUhlaWdodDtcclxuICAgICAgICAgICAgICAgIHRpbGUucG9zaXRpb24gPSB0aWxlLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5yZXNldFNpemUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICA7XHJcbiAgICA7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGlzcGxheS5wcm90b3R5cGUsIFwiZGltZW5zaW9uc1wiLCB7XHJcbiAgICAgICAgLyoqIEdldCBvciBzZXQgdGhlIGRpc3BsYXkgZGltZW5zaW9ucyAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4geyB3aWR0aDogdGhpcy5fd2lkdGgsIGhlaWdodDogdGhpcy5faGVpZ2h0IH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdEaW1lbnNpb25zKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdEaW1lbnNpb25zLndpZHRoICE9PSB0aGlzLl93aWR0aCAmJiBuZXdEaW1lbnNpb25zLmhlaWdodCAhPT0gdGhpcy5faGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IG5ld0RpbWVuc2lvbnMud2lkdGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSBuZXdEaW1lbnNpb25zLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIC8vIFJlc2V0IHRoZSBkaXNwbGF5IHRvIGFjY29tb2RhdGUgdGhlIG5ldyBzaXplXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbG9jYXRlRGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldFNpemUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvQ2VudGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICA7XHJcbiAgICA7XHJcbiAgICAvKiogUmVzZXQgZGlzcGxheSBlbGVtZW50IHNpemUgKi9cclxuICAgIERpc3BsYXkucHJvdG90eXBlLnJlc2V0U2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fd2lkdGggJiYgdGhpcy5faGVpZ2h0ICYmIHRoaXMudGlsZVNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gdGhpcy5fd2lkdGggKiB0aGlzLnRpbGVTaXplLnRpbGVXaWR0aCArIFwicHhcIjtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmhlaWdodCA9IHRoaXMuX2hlaWdodCAqIHRoaXMudGlsZVNpemUudGlsZUhlaWdodCArIFwicHhcIjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqIFBvc2l0aW9uIHRvIGNlbnRlciB0aGUgZGlzcGxheSB2aWV3IG9uICovXHJcbiAgICBEaXNwbGF5LnByb3RvdHlwZS5jZW50ZXJEaXNwbGF5ID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHggPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIHkgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5jZW50ZXJQb3NpdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2VudGVyUG9zaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICAgICAgeTogeVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vdmVUb0NlbnRlcigpO1xyXG4gICAgfTtcclxuICAgIERpc3BsYXkucHJvdG90eXBlLm1vdmVUb0NlbnRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5jZW50ZXJQb3NpdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgeFBlcmNlbnQgPSAodGhpcy5jZW50ZXJQb3NpdGlvbi54ICsgMC41KSAvIHRoaXMuZGltZW5zaW9ucy53aWR0aDtcclxuICAgICAgICAgICAgdmFyIHlQZXJjZW50ID0gKHRoaXMuY2VudGVyUG9zaXRpb24ueSArIDAuNSkgLyB0aGlzLmRpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoXCIgKyAteFBlcmNlbnQgKiAxMDAgKyBcIiUsXCIgKyAteVBlcmNlbnQgKiAxMDAgKyBcIiUpXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqIEJ1aWxkIHRoZSBhcnJheSBvZiB0aWxlcyBhbmQgYXR0YWNoIHRoZW0gdG8gdGhlIGRpc3BsYXkgKi9cclxuICAgIERpc3BsYXkucHJvdG90eXBlLmFsbG9jYXRlRGlzcGxheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIC8vIFN0YXJ0IGEgZnJlc2ggdGlsZXMgYXJyYXlcclxuICAgICAgICBpZiAodGhpcy50aWxlcykge1xyXG4gICAgICAgICAgICAvLyBFbXB0eSBkaXNwbGF5IGlmIGl0IGhhcyBjb250ZW50cyBhbHJlYWR5XHJcbiAgICAgICAgICAgIHRoaXMudGlsZXMuZm9yRWFjaChmdW5jdGlvbiAodGlsZSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZWxlbWVudC5yZW1vdmVDaGlsZCh0aWxlLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aWxlcyA9IFtdO1xyXG4gICAgICAgIC8vIEdlbmVyYXRlIHRpbGVzXHJcbiAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCB0aGlzLl9oZWlnaHQ7IHkrKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHRoaXMuX3dpZHRoOyB4KyspIHtcclxuICAgICAgICAgICAgICAgIC8vIE1ha2UgYSBuZXcgdGlsZVxyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1RpbGUgPSBuZXcgVGlsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJycsXHJcbiAgICAgICAgICAgICAgICB9LCB7IHg6IHgsIHk6IHkgfSwgdGhpcy50aWxlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgaXQgdG8gdGhlIGxpc3Qgb2YgdGlsZXNcclxuICAgICAgICAgICAgICAgIHRoaXMudGlsZXMucHVzaChuZXdUaWxlKTtcclxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCB0byB0aGUgYWN0dWFsIGRpc3BsYXlcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChuZXdUaWxlLmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIDtcclxuICAgIC8qKiBHZXQgdGhlIGRpc3BsYXkgdGlsZSBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geCAtIFBvc2l0aW9uIGZyb20gdGhlIGxlZnQgc2lkZSBvZiB0aGUgZGlzcGxheVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSBQb3NpdGlvbiBmcm9tIHRoZSB0b3Agb2YgdGhlIGRpc3BsYXlcclxuICAgICovXHJcbiAgICBEaXNwbGF5LnByb3RvdHlwZS5nZXRUaWxlID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICBpZiAoeCA+PSAwICYmIHggPCB0aGlzLl93aWR0aCAmJiB5ID49IDAgJiYgeSA8IHRoaXMuX2hlaWdodCkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB4ICsgeSAqIHRoaXMuX3dpZHRoO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aWxlc1tpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICA7XHJcbiAgICAvKiogVGFrZSBpbnB1dCBhbmQgZm9ybWF0IGludG8gVGlsZU9wdGlvbnMgKi9cclxuICAgIERpc3BsYXkucHJvdG90eXBlLmZvcm1hdFRpbGVPcHRpb25zID0gZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICByZXR1cm4geyBjb250ZW50OiBpbnB1dCB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpbnB1dCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGNvbnRlbnQ6IGlucHV0IH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKiBTZXQgZGV0YWlscyBmb3IgdGhlIHNwZWNpZmllZCB0aWxlICovXHJcbiAgICBEaXNwbGF5LnByb3RvdHlwZS5zZXRUaWxlID0gZnVuY3Rpb24gKHgsIHksIG5ld09wdGlvbnMpIHtcclxuICAgICAgICB2YXIgdGlsZSA9IHRoaXMuZ2V0VGlsZSh4LCB5KTtcclxuICAgICAgICBpZiAodGlsZSkge1xyXG4gICAgICAgICAgICB0aWxlLnNldE9wdGlvbnModGhpcy5mb3JtYXRUaWxlT3B0aW9ucyhuZXdPcHRpb25zKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIDtcclxuICAgIC8qKiBVcGRhdGUgZGV0YWlscyBmb3IgdGhlIHNwZWNpZmllZCB0aWxlLCBwcmVzZXJ2aW5nIGV2ZXJ5IHVuc2V0IHByb3BlcnR5LiAqL1xyXG4gICAgRGlzcGxheS5wcm90b3R5cGUudXBkYXRlVGlsZSA9IGZ1bmN0aW9uICh4LCB5LCBuZXdPcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHRpbGUgPSB0aGlzLmdldFRpbGUoeCwgeSk7XHJcbiAgICAgICAgaWYgKHRpbGUpIHtcclxuICAgICAgICAgICAgdGlsZS51cGRhdGVPcHRpb25zKHRoaXMuZm9ybWF0VGlsZU9wdGlvbnMobmV3T3B0aW9ucykpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICA7XHJcbiAgICAvKiogR2l2ZW4gdGhlIHNpemUgb2YgdGhlIHRhcmdldCBjb250YWluZXIsIGFuZCB0aGUgdGlsZSBzaXplLCBkZXRlcm1pbmUgdGhlIG51bWJlciBvZiB0aWxlcyBuZWVkZWQuICovXHJcbiAgICBEaXNwbGF5LnByb3RvdHlwZS5jYWxjdWxhdGVEaW1lbnNpb25zID0gZnVuY3Rpb24gKGNsaWVudFJlY3QpIHtcclxuICAgICAgICBpZiAoY2xpZW50UmVjdCA9PT0gdm9pZCAwKSB7IGNsaWVudFJlY3QgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgfVxyXG4gICAgICAgIHZhciBjbGllbnRXaWR0aCA9IE1hdGguYWJzKGNsaWVudFJlY3QucmlnaHQgLSBjbGllbnRSZWN0LmxlZnQpO1xyXG4gICAgICAgIHZhciBjbGllbnRIZWlnaHQgPSBNYXRoLmFicyhjbGllbnRSZWN0LmJvdHRvbSAtIGNsaWVudFJlY3QudG9wKTtcclxuICAgICAgICAvLyBSb3VuZCBkb3duOyB3ZSBkbyBub3Qgd2FudCBwYXJ0aWFsIHRpbGVzXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IE1hdGguZmxvb3IoY2xpZW50V2lkdGggLyB0aGlzLnRpbGVTaXplLnRpbGVXaWR0aCksXHJcbiAgICAgICAgICAgIGhlaWdodDogTWF0aC5mbG9vcihjbGllbnRIZWlnaHQgLyB0aGlzLnRpbGVTaXplLnRpbGVIZWlnaHQpXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICA7XHJcbiAgICAvKiogR2l2ZW4gdGhlIHNpemUgb2YgdGhlIHRhcmdldCBjb250YWluZXIsIGFuZCB0aGUgbnVtYmVyIG9mIHRpbGVzLCBkZXRlcm1pbmUgdGhlIHRpbGUgc2l6ZSBuZWVkZWRcclxuICAgICAqICBUaGlzIGFzc3VtZXMgc3F1YXJlIHRpbGVzIGFyZSBkZXNpcmVkLlxyXG4gICAgKi9cclxuICAgIERpc3BsYXkucHJvdG90eXBlLmNhbGN1bGF0ZVRpbGVTaXplID0gZnVuY3Rpb24gKGNsaWVudFJlY3QpIHtcclxuICAgICAgICBpZiAoY2xpZW50UmVjdCA9PT0gdm9pZCAwKSB7IGNsaWVudFJlY3QgPSB0aGlzLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgfVxyXG4gICAgICAgIHZhciBjbGllbnRXaWR0aCA9IE1hdGguYWJzKGNsaWVudFJlY3QucmlnaHQgLSBjbGllbnRSZWN0LmxlZnQpO1xyXG4gICAgICAgIHZhciBjbGllbnRIZWlnaHQgPSBNYXRoLmFicyhjbGllbnRSZWN0LmJvdHRvbSAtIGNsaWVudFJlY3QudG9wKTtcclxuICAgICAgICAvLyBUaGlzIGNvdWxkIHBvdGVudGlhbGx5IGdpdmUgYWJzdXJkIHJlc3VsdHMsIHNvIGdldCB0aGUgXCJuYWl2ZSBmaXJzdC1ndWVzc1wiIGhlcmVcclxuICAgICAgICB2YXIgc2l6ZSA9IHtcclxuICAgICAgICAgICAgdGlsZVdpZHRoOiBjbGllbnRXaWR0aCAvIHRoaXMuZGltZW5zaW9ucy53aWR0aCxcclxuICAgICAgICAgICAgdGlsZUhlaWdodDogY2xpZW50SGVpZ2h0IC8gdGhpcy5kaW1lbnNpb25zLmhlaWdodFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQ2hvb3NlIHRoZSBsb3dlc3Qgb2YgdGhlIHR3by4gVGhpcyBpcyB0aGUgbWF4aW11bSBzcXVhcmUgdGlsZSBzaXplIHRoYXQgd2lsbCBmaXQgdGhlIGdpdmVuIGRpbWVuc2lvbnNcclxuICAgICAgICB2YXIgbWF4VGlsZVNpemUgPSBNYXRoLm1pbihzaXplLnRpbGVXaWR0aCwgc2l6ZS50aWxlSGVpZ2h0KTtcclxuICAgICAgICAvLyBEb24ndCBib3RoZXIgcm91bmRpbmc7IGZvbnRzIGNhbiBiZSBwcmVjaXNlIG51bWJlcnNcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0aWxlV2lkdGg6IG1heFRpbGVTaXplLFxyXG4gICAgICAgICAgICB0aWxlSGVpZ2h0OiBtYXhUaWxlU2l6ZVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgO1xyXG4gICAgLyoqIEFkZCB0aGUgZGVmYXVsdCBzdHlsZXMgdG8gdGhlIGhlYWQgb2YgdGhlIHBhZ2UuICovXHJcbiAgICBEaXNwbGF5LnByb3RvdHlwZS5hcHBseURlZmF1bHRTdHlsZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHN0eWxlc0lkID0gXCJwdW1wa2luLWRlZmF1bHQtc3R5bGVzXCI7XHJcbiAgICAgICAgLy8gQ2hlY2sgdG8gbWFrZSBzdXJlIHRoZSBzdHlsZXMgYXJlbid0IGFscmVhZHkgcHJlc2VudFxyXG4gICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3R5bGVzSWQpKSB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgc3R5bGUgZWxlbWVudFxyXG4gICAgICAgICAgICB2YXIgc3R5bGVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG4gICAgICAgICAgICBzdHlsZXMuaWQgPSBzdHlsZXNJZDtcclxuICAgICAgICAgICAgc3R5bGVzLnR5cGUgPSBcInRleHQvY3NzXCI7XHJcbiAgICAgICAgICAgIHN0eWxlcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuICAgICAgICAgICAgLy8gR2V0IHRoZSBoZWFkIG9mIHRoZSBwYWdlXHJcbiAgICAgICAgICAgIHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZDtcclxuICAgICAgICAgICAgLy8gRmluZCB0aGUgZmlyc3Qgc3R5bGUgb3IgbGluayBlbGVtZW50LCBhbmQgaW5zZXJ0IGluIGZyb250IG9mIGl0XHJcbiAgICAgICAgICAgIHZhciBmaXJzdFN0eWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInN0eWxlLCBsaW5rXCIpO1xyXG4gICAgICAgICAgICBoZWFkLmluc2VydEJlZm9yZShzdHlsZXMsIGZpcnN0U3R5bGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gRGlzcGxheTtcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgRGlzcGxheTtcclxuO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1EaXNwbGF5LmpzLm1hcCIsIi8vIERlZmF1bHQgc3R5bGluZyBmb3IgdGhlIGRpc3BsYXkuIFRoaXMgZ2V0cyBpbnNlcnRlZCBpbnRvIHRoZSBkb2N1bWVudCBoZWFkLCBiZWZvcmUgb3RoZXIgc3R5bGVzaGVldHMgKHNvIHRoYXQgeW91IGNhbiBvdmVycmlkZSB0aGVtIGlmIGRlc2lyZWQhKVxyXG52YXIgY3NzID0gXCJcXG4ucHVtcGtpbi1jb250YWluZXIge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XFxuICAgIGNvbG9yOiAjZmZmZmZmO1xcbn1cXG5cXG4ucHVtcGtpbi1kaXNwbGF5IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRvcDogNTAlO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG59XFxuXFxuLnB1bXBraW4tdGlsZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG59XFxuXFxuLnB1bXBraW4tdGlsZSA+ICoge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgICB6LWluZGV4OiAxMDtcXG59XFxuXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNzcztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RGlzcGxheVN0eWxlLmpzLm1hcCIsInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufTtcclxudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn07XHJcbnZhciBfX3NwcmVhZEFycmF5cyA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheXMpIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG52YXIgYmFzZUNsYXNzTmFtZSA9IFwicHVtcGtpbi10aWxlXCI7XHJcbi8qKiBDbGFzcyB0byBrZWVwIHRyYWNrIG9mIGVhY2ggaW5kaXZpZHVhbCB0aWxlIGluIHRoZSBkaXNwbGF5ICovXHJcbnZhciBUaWxlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVGlsZSh0aWxlT3B0aW9ucywgcG9zaXRpb24sIHRpbGVTaXplKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIG5lY2Vzc2FyeSBlbGVtZW50cyBhbmQgYXBwbHkgY2xhc3Nlc1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGJhc2VDbGFzc05hbWUpO1xyXG4gICAgICAgIC8vIFNldCB0aWxlIGNvbnRlbnQgYW5kIGNvbG91ciBzY2hlbWVcclxuICAgICAgICB2YXIgX2EgPSB0aWxlT3B0aW9ucy5jb250ZW50LCBjb250ZW50ID0gX2EgPT09IHZvaWQgMCA/ICcnIDogX2EsIF9iID0gdGlsZU9wdGlvbnMuY29sb3IsIGNvbG9yID0gX2IgPT09IHZvaWQgMCA/ICcnIDogX2IsIF9jID0gdGlsZU9wdGlvbnMuYmFja2dyb3VuZCwgYmFja2dyb3VuZCA9IF9jID09PSB2b2lkIDAgPyAnJyA6IF9jLCBfZCA9IHRpbGVPcHRpb25zLmNsYXNzTmFtZSwgY2xhc3NOYW1lID0gX2QgPT09IHZvaWQgMCA/ICcnIDogX2QsIF9lID0gdGlsZU9wdGlvbnMuY2xhc3NMaXN0LCBjbGFzc0xpc3QgPSBfZSA9PT0gdm9pZCAwID8gW10gOiBfZSwgcmVzdCA9IF9fcmVzdCh0aWxlT3B0aW9ucywgW1wiY29udGVudFwiLCBcImNvbG9yXCIsIFwiYmFja2dyb3VuZFwiLCBcImNsYXNzTmFtZVwiLCBcImNsYXNzTGlzdFwiXSk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gYmFja2dyb3VuZDtcclxuICAgICAgICBpZiAoY2xhc3NMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QgPSBjbGFzc0xpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2V0IHRoZSB0aWxlIHNpemVcclxuICAgICAgICB0aGlzLnRpbGVXaWR0aCA9ICh0aWxlU2l6ZSA9PT0gbnVsbCB8fCB0aWxlU2l6ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGlsZVNpemUudGlsZVdpZHRoKSA/IHRpbGVTaXplLnRpbGVXaWR0aCA6IDE2O1xyXG4gICAgICAgIHRoaXMudGlsZUhlaWdodCA9ICh0aWxlU2l6ZSA9PT0gbnVsbCB8fCB0aWxlU2l6ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGlsZVNpemUudGlsZUhlaWdodCkgPyB0aWxlU2l6ZS50aWxlSGVpZ2h0IDogdGhpcy50aWxlV2lkdGg7XHJcbiAgICAgICAgLy8gU2V0IHRoZSB0aWxlIHBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbGUucHJvdG90eXBlLCBcImNvbnRlbnRcIiwge1xyXG4gICAgICAgIC8qKiBHZXQgb3Igc2V0IHRoZSB0aWxlIGNvbnRlbnRzICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3Q29udGVudCkge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgY29udGVudEVsZW1lbnQgaWYgaXQgZG9lc24ndCBhbHJlYWR5IGV4aXN0XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlybUNvbnRlbnRFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIC8vIE9ubHkgdXBkYXRlIGlmIHRoZSBuZXcgYW5kIG9sZCBjb250ZW50IGRvbid0IG1hdGNoXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb250ZW50ICE9PSBuZXdDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBjb250ZW50IGlzIGEgc3RyaW5nLCBqdXN0IGFkZCBpdFxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudEVsZW1lbnQuaW5uZXJIVE1MID0gbmV3Q29udGVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIElmIGl0IGlzIGFuIGVsZW1lbnQsIGVtcHR5IHRoZSB0aWxlIGFuZCBhcHBlbmQgdGhlIG5ldyBjb250ZW50XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5jb250ZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5jb250ZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5hcHBlbmRDaGlsZChuZXdDb250ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQgPSBuZXdDb250ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbGUucHJvdG90eXBlLCBcImJhY2tncm91bmRcIiwge1xyXG4gICAgICAgIC8qKiBHZXQgb3Igc2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG91ciAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFja2dyb3VuZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0JhY2tncm91bmQpIHtcclxuICAgICAgICAgICAgaWYgKG5ld0JhY2tncm91bmQgIT09IHRoaXMuX2JhY2tncm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JhY2tncm91bmQgPSBuZXdCYWNrZ3JvdW5kO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG5ld0JhY2tncm91bmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGlsZS5wcm90b3R5cGUsIFwiY29sb3JcIiwge1xyXG4gICAgICAgIC8qKiBHZXQgb3Igc2V0IHRoZSBjb2xvciBjb2xvdXIgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3Y29sb3IpIHtcclxuICAgICAgICAgICAgaWYgKG5ld2NvbG9yICE9PSB0aGlzLl9jb2xvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29sb3IgPSBuZXdjb2xvcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jb2xvciA9IG5ld2NvbG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbGUucHJvdG90eXBlLCBcInBvc2l0aW9uXCIsIHtcclxuICAgICAgICAvKiogR2V0IG9yIHNldCBwb3NpdGlvbiAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChwb3NpdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IF9fYXNzaWduKHt9LCBwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5sZWZ0ID0gcG9zaXRpb24ueCAqIHRoaXMudGlsZVdpZHRoICsgXCJweFwiO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudG9wID0gcG9zaXRpb24ueSAqIHRoaXMudGlsZUhlaWdodCArIFwicHhcIjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGlsZS5wcm90b3R5cGUsIFwidGlsZVdpZHRoXCIsIHtcclxuICAgICAgICAvKiogR2V0IG9yIHNldCB0aWxlIHdpZHRoICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aWxlV2lkdGg7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdXaWR0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl90aWxlV2lkdGggPSBuZXdXaWR0aDtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLndpZHRoID0gbmV3V2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbGUucHJvdG90eXBlLCBcInRpbGVIZWlnaHRcIiwge1xyXG4gICAgICAgIC8qKiBHZXQgb3Igc2V0IHRoZSB0aWxlIGhlaWdodCAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGlsZUhlaWdodDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0hlaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLl90aWxlSGVpZ2h0ID0gbmV3SGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gbmV3SGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaWxlLnByb3RvdHlwZSwgXCJjbGFzc05hbWVcIiwge1xyXG4gICAgICAgIC8qKiBHZXQgb3Igc2V0IHRoZSBjbGFzc25hbWUgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0LmpvaW4oXCIgXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3Q2xhc3MpIHtcclxuICAgICAgICAgICAgaWYgKG5ld0NsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdCA9IG5ld0NsYXNzLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0ID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGlsZS5wcm90b3R5cGUsIFwiY2xhc3NMaXN0XCIsIHtcclxuICAgICAgICAvKiogR2V0IG9yIHNldCB0aGUgbGlzdCBvZiBjbGFzc2VzICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX3NwcmVhZEFycmF5cyhbYmFzZUNsYXNzTmFtZV0sIHRoaXMuX2NsYXNzTGlzdCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdDbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NsYXNzTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIE9ubHkgYWRkL3JlbW92ZSBjbGFzc2VzIGlmIHRoZSB0d28gbGlzdHMgYXJlIGFjdHVhbGx5IGRpZmZlcmVudFxyXG4gICAgICAgICAgICAvLyBUaGlzIGlzIHVnbHksIGJ1dCBjaGFuZ2luZyB0aGUgRE9NIGlzIG1vcmUgZXhwZW5zaXZlIHRoYW4gdGhpcyBpcy5cclxuICAgICAgICAgICAgaWYgKG5ld0NsYXNzTGlzdC5sZW5ndGggIT09IHRoaXMuX2NsYXNzTGlzdC5sZW5ndGggfHxcclxuICAgICAgICAgICAgICAgICFuZXdDbGFzc0xpc3QuZXZlcnkoZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIF90aGlzLl9jbGFzc0xpc3QuaW5jbHVkZXMobmFtZSk7IH0pIHx8XHJcbiAgICAgICAgICAgICAgICAhdGhpcy5fY2xhc3NMaXN0LmV2ZXJ5KGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBuZXdDbGFzc0xpc3QuaW5jbHVkZXMobmFtZSk7IH0pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2xhc3NMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAoX2EgPSB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0KS5yZW1vdmUuYXBwbHkoX2EsIHRoaXMuX2NsYXNzTGlzdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGFzc0xpc3QgPSBuZXdDbGFzc0xpc3QuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LnRyaW0oKSAmJiB4ICE9PSBiYXNlQ2xhc3NOYW1lOyB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdDbGFzc0xpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCB1c2luZyB0aGUgZ2V0dGVyLCB0byBlbnN1cmUgYmFzZUNsYXNzTmFtZSBpcyBzdGlsbCBvbiB0aGUgbGlzdC5cclxuICAgICAgICAgICAgICAgICAgICAoX2IgPSB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0KS5hZGQuYXBwbHkoX2IsIHRoaXMuY2xhc3NMaXN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIC8qKiBTZXQgb3B0aW9ucyBmb3IgdGhlIHRpbGUgKi9cclxuICAgIFRpbGUucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiAobmV3T3B0aW9ucykge1xyXG4gICAgICAgIHZhciBfYSA9IG5ld09wdGlvbnMuY29udGVudCwgY29udGVudCA9IF9hID09PSB2b2lkIDAgPyBcIlwiIDogX2EsIF9iID0gbmV3T3B0aW9ucy5iYWNrZ3JvdW5kLCBiYWNrZ3JvdW5kID0gX2IgPT09IHZvaWQgMCA/IFwiXCIgOiBfYiwgX2MgPSBuZXdPcHRpb25zLmNvbG9yLCBjb2xvciA9IF9jID09PSB2b2lkIDAgPyBcIlwiIDogX2MsIF9kID0gbmV3T3B0aW9ucy5jbGFzc05hbWUsIGNsYXNzTmFtZSA9IF9kID09PSB2b2lkIDAgPyBcIlwiIDogX2QsIGNsYXNzTGlzdCA9IG5ld09wdGlvbnMuY2xhc3NMaXN0O1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gYmFja2dyb3VuZDtcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgaWYgKGNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdCA9IGNsYXNzTGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSBvcHRpb25zIGZvciB0aGUgdGlsZVxyXG4gICAgICovXHJcbiAgICBUaWxlLnByb3RvdHlwZS51cGRhdGVPcHRpb25zID0gZnVuY3Rpb24gKG5ld09wdGlvbnMpIHtcclxuICAgICAgICB2YXIgY29udGVudCA9IG5ld09wdGlvbnMuY29udGVudCwgYmFja2dyb3VuZCA9IG5ld09wdGlvbnMuYmFja2dyb3VuZCwgY29sb3IgPSBuZXdPcHRpb25zLmNvbG9yLCBjbGFzc05hbWUgPSBuZXdPcHRpb25zLmNsYXNzTmFtZSwgY2xhc3NMaXN0ID0gbmV3T3B0aW9ucy5jbGFzc0xpc3Q7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgYmFja2dyb3VuZCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBiYWNrZ3JvdW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGNvbG9yICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNsYXNzTGlzdCAmJiBjbGFzc0xpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdCA9IGNsYXNzTGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGNsYXNzTmFtZSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqIENoZWNrIGlmIGEgY29udGVudEVsZW1lbnQgZXhpc3RzLCBhbmQgaWYgaXQgZG9lc24ndCwgYWRkIGl0ICovXHJcbiAgICBUaWxlLnByb3RvdHlwZS5jb25maXJtQ29udGVudEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudEVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gVGlsZTtcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgVGlsZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGlsZS5qcy5tYXAiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuLyoqIEV2ZW50IG1hbmFnZXIsIHRvIGtlZXAgdHJhY2sgb2YgdHVybnMgKi9cclxudmFyIEV2ZW50TWFuYWdlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEV2ZW50TWFuYWdlcihwYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgaWYgKCFwYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgICAgIHBhcmFtZXRlcnMgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgO1xyXG4gICAgICAgIHZhciBfYSA9IHBhcmFtZXRlcnMudHlwZSwgdHlwZSA9IF9hID09PSB2b2lkIDAgPyBcInNpbXBsZVwiIDogX2E7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLnF1ZXVlID0gW107XHJcbiAgICAgICAgdGhpcy50aW1lID0gMDtcclxuICAgIH1cclxuICAgIDtcclxuICAgIC8qKiBBZGQgYW4gZXZlbnQgdG8gdGhlIHF1ZXVlICovXHJcbiAgICBFdmVudE1hbmFnZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChhZGRlZEV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGV2ZW50ID0ge307XHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIHR5cGUgb2YgdGhlIGlucHV0LCBhbmQgaGFuZGxlIGFjY29yZGluZ2x5XHJcbiAgICAgICAgaWYgKGFkZGVkRXZlbnQgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5jYWxsYmFjayA9IGFkZGVkRXZlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKFwiYWN0XCIgaW4gYWRkZWRFdmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5hY3RvciA9IGFkZGVkRXZlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGV2ZW50LCBhZGRlZEV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQXNzdW1lIHJlcGVhdGluZyBpZiBhbiBhY3RvciB3YXMgcHJvdmlkZWRcclxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50LnJlcGVhdHMgPT09IFwidW5kZWZpbmVkXCIgJiYgZXZlbnQuYWN0b3IpIHtcclxuICAgICAgICAgICAgZXZlbnQucmVwZWF0cyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIENvbXBsZXggZXZlbnQgcXVldWUgdXNlcyBkZWxheSB0aW1lIGEgYml0IGJldHRlclxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IFwiY29tcGxleFwiKSB7XHJcbiAgICAgICAgICAgIGlmICghZXZlbnQuZGVsYXkpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LmRlbGF5ID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc2NoZWR1bGVGb3IgPSBldmVudC5kZWxheSArIHRoaXMudGltZTtcclxuICAgICAgICAgICAgLy8gSW5zZXJ0IHRoZSBldmVudCBhdCB0aGUgYXBwcm9wcmlhdGUgdGltZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5xdWV1ZS5sZW5ndGggPT09IDAgfHwgdGhpcy5xdWV1ZVt0aGlzLnF1ZXVlLmxlbmd0aCAtIDFdLnRpbWUgPD0gc2NoZWR1bGVGb3IpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucXVldWUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWU6IHNjaGVkdWxlRm9yXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5xdWV1ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2hlZHVsZUZvciA8IHRoaXMucXVldWVbaV0udGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXVlLnNwbGljZShpLCAwLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lOiBzY2hlZHVsZUZvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBTaW1wbGUsIG5vIHdlaXJkIHRpbWUgc2hpdFxyXG4gICAgICAgICAgICB0aGlzLnF1ZXVlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgdGltZTogMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqIFJ1biB0aGUgbmV4dCBldmVudCAqL1xyXG4gICAgRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5hZHZhbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRoaXNFdmVudDtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29uZmlybSBpZiB0aGVyZSBpcyBhbnl0aGluZyBpbiB0aGUgcXVldWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucXVldWUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFdmVudCBxdWV1ZSBpcyBlbXB0eS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc0V2ZW50ID0gdGhpcy5xdWV1ZS5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHRpbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lID0gdGhpc0V2ZW50LnRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHJlcGVhdHMgaXMgYSBudW1iZXIsIHJlZHVjZSBpdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzRXZlbnQuZXZlbnQucmVwZWF0cyA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc0V2ZW50LmV2ZW50LnJlcGVhdHMtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBpdCBuZWVkcyB0byByZXBlYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNFdmVudC5ldmVudC5yZXBlYXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZS1hZGQgdG8gdGhlIHF1ZXVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZCh0aGlzRXZlbnQuZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpc0V2ZW50LmV2ZW50LmNhbGxiYWNrKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpc0V2ZW50LmV2ZW50LmNhbGxiYWNrKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXNFdmVudC5ldmVudC5hY3RvcikgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXNFdmVudC5ldmVudC5hY3Rvci5hY3QoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gNDtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIFJlbW92ZSBhY3RvciBmcm9tIHRoZSBldmVudCBxdWV1ZSAqL1xyXG4gICAgRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoYWN0b3IpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBtYXRjaGVzID0gW107XHJcbiAgICAgICAgdGhpcy5xdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmV2ZW50LmFjdG9yID09PSBhY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIFJldmVyc2UgbWF0Y2hlcyAod29yayBmcm9tIHRoZSBlbmQgZmlyc3QpXHJcbiAgICAgICAgbWF0Y2hlcy5yZXZlcnNlKCk7XHJcbiAgICAgICAgLy8gUmVtb3ZlIGVhY2ggbWF0Y2hcclxuICAgICAgICBtYXRjaGVzLmZvckVhY2goZnVuY3Rpb24gKG1hdGNoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnF1ZXVlLnNwbGljZShtYXRjaCwgMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50TWFuYWdlci5wcm90b3R5cGUsIFwibGVuZ3RoXCIsIHtcclxuICAgICAgICAvKiogRGV0ZXJtaW5lIHRoZSBudW1iZXIgb2YgcXVldWVkIGV2ZW50cyBpbiB0aGUgcXVldWUuICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnF1ZXVlLmxlbmd0aDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gRXZlbnRNYW5hZ2VyO1xyXG59KCkpO1xyXG5leHBvcnQgZGVmYXVsdCBFdmVudE1hbmFnZXI7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV2ZW50TWFuYWdlci5qcy5tYXAiLCIvKiogRmllbGQgb2YgdmlldyAqL1xyXG52YXIgRk9WID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqIEFjY2VwdHMgYSBjYWxsYmFjayBmdW5jdGlvbiB0byBkZXRlcm1pbmUgaWYgYSBsb2NhdGlvbiBpcyBzZWV0aHJvdWdoICovXHJcbiAgICBmdW5jdGlvbiBGT1YoY2FuU2VlLCByYW5nZSkge1xyXG4gICAgICAgIHRoaXMuY2FuU2VlID0gY2FuU2VlO1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSByYW5nZSA/IHJhbmdlIDogODtcclxuICAgIH1cclxuICAgIDtcclxuICAgIC8qKiBEbyB0aGUgRk9WIGNhbGN1bGF0aW9uICovXHJcbiAgICBGT1YucHJvdG90eXBlLmxvb2sgPSBmdW5jdGlvbiAocG9zaXRpb24sIGxvb2tSYW5nZU92ZXJyaWRlKSB7XHJcbiAgICAgICAgdmFyIHJhbmdlID0gKGxvb2tSYW5nZU92ZXJyaWRlKSA/IGxvb2tSYW5nZU92ZXJyaWRlIDogdGhpcy5yYW5nZTtcclxuICAgICAgICAvLyBTZWUgdGhlIHN0YXJ0aW5nIGxvY2F0aW9uIChob29yYXkhIEdyZWF0IHN0YXJ0KVxyXG4gICAgICAgIHRoaXMuY2FuU2VlKHBvc2l0aW9uKTtcclxuICAgICAgICAvLyBjb25zdCBsb29rVGlsZXM6QXJyYXk8VGlsZT4gPSBbXTtcclxuICAgICAgICB2YXIgc2hhZG93cyA9IFtdO1xyXG4gICAgICAgIHZhciBuZXdTaGFkb3dzID0gW107XHJcbiAgICAgICAgLy8gRnJvbSBuZWFyYnkgdG8gZmFyIGF3YXlcclxuICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgdmFyIGogPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGRpc3RhbmNlID0gMTsgZGlzdGFuY2UgPD0gcmFuZ2U7IGRpc3RhbmNlKyspIHtcclxuICAgICAgICAgICAgLy8gR2V0IHNxdWFyZSBzaGVsbCBhcm91bmQgcG9zaXRpb25cclxuICAgICAgICAgICAgZm9yICh2YXIgc2lkZSA9IDA7IHNpZGUgPCA0OyBzaWRlKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGVkZ2UgPSAtZGlzdGFuY2U7IGVkZ2UgPD0gZGlzdGFuY2U7IGVkZ2UrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaWRlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBlZGdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqID0gZGlzdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNpZGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaiA9IGVkZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBkaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc2lkZSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gZWRnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaiA9IC1kaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGogPSBlZGdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gLWRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbG9va1BvcyA9IFtwb3NpdGlvblswXSArIGksIHBvc2l0aW9uWzFdICsgal07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3QgPSB0aGlzLmRpc3RhbmNlKHBvc2l0aW9uLCBsb29rUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBPdXQgb2YgcmFuZ2U/IFNraXAuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3QgPiByYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSW4gc2hhZG93cz8gU2tpcC5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYW5nbGVUbyA9IHRoaXMuYW5nbGVUbyhwb3NpdGlvbiwgbG9va1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFuZ3VsYXJTaXplID0gdGhpcy5hbmd1bGFyU2l6ZShwb3NpdGlvbiwgbG9va1BvcykgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpblNoYWRvd3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0luU2hhZG93cyhhbmdsZVRvLCBzaGFkb3dzKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzSW5TaGFkb3dzKGFuZ2xlVG8gKyBhbmd1bGFyU2l6ZSwgc2hhZG93cykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0luU2hhZG93cyhhbmdsZVRvIC0gYW5ndWxhclNpemUsIHNoYWRvd3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluU2hhZG93cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5vdywgdGVzdCBpZiB3ZSBjYW4gc2VlIHRocm91Z2ggdGhlIHRpbGVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5TaGFkb3dzIHx8ICF0aGlzLmNhblNlZShsb29rUG9zKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTcXVhcmUgaXMgb3BhcXVlISBBZGQgaXRzIHNoYWRvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTaGFkb3dzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRBbmdsZTogYW5nbGVUbyAtIGFuZ3VsYXJTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kQW5nbGU6IGFuZ2xlVG8gKyBhbmd1bGFyU2l6ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQWRkIG5ld1NoYWRvd3MgdG8gc2hhZG93c1xyXG4gICAgICAgICAgICB3aGlsZSAobmV3U2hhZG93cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzaGFkb3dzLnB1c2gobmV3U2hhZG93cy5wb3AoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJpbmVTaGFkb3coc2hhZG93cywgbmV3U2hhZG93cy5wb3AoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgd2Ugc2hvdWxkIGNhbGwgaXQgcXVpdHNcclxuICAgICAgICAgICAgaWYgKHNoYWRvd3MubGVuZ3RoID09PSAxICYmIHNoYWRvd3NbMF0uZW5kQW5nbGUgLSBzaGFkb3dzWzBdLnN0YXJ0QW5nbGUgPj0gMzYwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgO1xyXG4gICAgLyoqIEdldCBhbmdsZSBhIHRpbGUgcmVzaWRlcyBpblxyXG4gICAgICogVGhpcyByYW5nZXMgZnJvbSAtMTgwIHRvIDE4MCwgc28gYmUgY2FyZWZ1bFxyXG4gICAgKi9cclxuICAgIEZPVi5wcm90b3R5cGUuYW5nbGVUbyA9IGZ1bmN0aW9uIChzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbikge1xyXG4gICAgICAgIHZhciB5ID0gZW5kUG9zaXRpb25bMV0gLSBzdGFydFBvc2l0aW9uWzFdO1xyXG4gICAgICAgIHZhciB4ID0gZW5kUG9zaXRpb25bMF0gLSBzdGFydFBvc2l0aW9uWzBdO1xyXG4gICAgICAgIHZhciBhbmdsZSA9IDE4MCAqIE1hdGguYXRhbjIoeSwgeCkgLyBNYXRoLlBJO1xyXG4gICAgICAgIHJldHVybiAoYW5nbGUgPj0gMCkgPyBhbmdsZSA6IGFuZ2xlICsgMzYwO1xyXG4gICAgfTtcclxuICAgIDtcclxuICAgIC8qKiBHZXQgYW5ndWxhciBzaXplIG9mIGEgc3F1YXJlICovXHJcbiAgICBGT1YucHJvdG90eXBlLmFuZ3VsYXJTaXplID0gZnVuY3Rpb24gKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKSB7XHJcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gdGhpcy5kaXN0YW5jZShzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIDM2MCAqIE1hdGguYXRhbigxIC8gKDIgKiBkaXN0YW5jZSkpIC8gTWF0aC5QSTtcclxuICAgIH07XHJcbiAgICA7XHJcbiAgICAvKiogR2V0IGRpc3RhbmNlICovXHJcbiAgICBGT1YucHJvdG90eXBlLmRpc3RhbmNlID0gZnVuY3Rpb24gKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdygoZW5kUG9zaXRpb25bMV0gLSBzdGFydFBvc2l0aW9uWzFdKSwgMikgKyBNYXRoLnBvdygoZW5kUG9zaXRpb25bMF0gLSBzdGFydFBvc2l0aW9uWzBdKSwgMikpO1xyXG4gICAgfTtcclxuICAgIC8qKiBDaGVjayBpZiBpbiBzaGFkb3dzICovXHJcbiAgICBGT1YucHJvdG90eXBlLmlzSW5TaGFkb3dzID0gZnVuY3Rpb24gKGFuZ2xlLCBzaGFkb3dzKSB7XHJcbiAgICAgICAgdmFyIG5lZ0FuZ2xlID0gYW5nbGUgLSAzNjA7XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBzaGFkb3dzXzEgPSBzaGFkb3dzOyBfaSA8IHNoYWRvd3NfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIHNoYWRvdyA9IHNoYWRvd3NfMVtfaV07XHJcbiAgICAgICAgICAgIGlmICgoYW5nbGUgPD0gc2hhZG93LmVuZEFuZ2xlICYmIGFuZ2xlID49IHNoYWRvdy5zdGFydEFuZ2xlKSB8fCAobmVnQW5nbGUgPD0gc2hhZG93LmVuZEFuZ2xlICYmIG5lZ0FuZ2xlID49IHNoYWRvdy5zdGFydEFuZ2xlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuICAgIC8qKiBBZGQgYSBzaGFkb3cgdG8gdGhlIHNoYWRvdyBhcnJheSAqL1xyXG4gICAgRk9WLnByb3RvdHlwZS5jb21iaW5lU2hhZG93ID0gZnVuY3Rpb24gKHNoYWRvd3MsIG5ld1NoYWRvdykge1xyXG4gICAgICAgIHZhciBvdmVyTGFwQXJyID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaGFkb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzaGFkb3cgPSBzaGFkb3dzW2ldO1xyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGV5IG92ZXJsYXBcclxuICAgICAgICAgICAgaWYgKG5ld1NoYWRvdy5zdGFydEFuZ2xlIDwgc2hhZG93LmVuZEFuZ2xlICYmIG5ld1NoYWRvdy5lbmRBbmdsZSA+IHNoYWRvdy5zdGFydEFuZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdTaGFkb3cuc3RhcnRBbmdsZSA9IE1hdGgubWluKHNoYWRvdy5zdGFydEFuZ2xlLCBuZXdTaGFkb3cuc3RhcnRBbmdsZSk7XHJcbiAgICAgICAgICAgICAgICBuZXdTaGFkb3cuZW5kQW5nbGUgPSBNYXRoLm1heChzaGFkb3cuZW5kQW5nbGUsIG5ld1NoYWRvdy5lbmRBbmdsZSk7XHJcbiAgICAgICAgICAgICAgICBvdmVyTGFwQXJyLnB1c2goaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG92ZXJMYXBBcnIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgbWFpblNoYWRvdyA9IHNoYWRvd3Nbb3ZlckxhcEFyci5zaGlmdCgpXTtcclxuICAgICAgICAgICAgbWFpblNoYWRvdy5zdGFydEFuZ2xlID0gbmV3U2hhZG93LnN0YXJ0QW5nbGU7XHJcbiAgICAgICAgICAgIG1haW5TaGFkb3cuZW5kQW5nbGUgPSBuZXdTaGFkb3cuZW5kQW5nbGU7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBvdmVyTGFwQXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICBzaGFkb3dzLnNwbGljZShvdmVyTGFwQXJyW2ldLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2hhZG93cy5wdXNoKG5ld1NoYWRvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBGT1Y7XHJcbn0oKSk7XHJcbmV4cG9ydCBkZWZhdWx0IEZPVjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Rk9WLmpzLm1hcCIsImV4cG9ydCB7IGRlZmF1bHQgYXMgRGlzcGxheSB9IGZyb20gJy4vZGlzcGxheS9EaXNwbGF5LmpzJztcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBFdmVudE1hbmFnZXIgfSBmcm9tICcuL2V2ZW50L0V2ZW50TWFuYWdlci5qcyc7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUmFuZG9tIH0gZnJvbSAnLi9yYW5kb20vUmFuZG9tLmpzJztcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBQYXRoRmluZGVyIH0gZnJvbSAnLi9wYXRoZmluZGVyL1BhdGhGaW5kZXIuanMnO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIEZPViB9IGZyb20gJy4vZm92L0ZPVi5qcyc7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgV0ZDIH0gZnJvbSAnLi93ZmMvV0ZDLmpzJztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwidmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn07XHJcbnZhciBfX3NwcmVhZEFycmF5cyA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheXMpIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG4vKiogUGF0aGZpbmRlciB0byBkZXRlcm1pbmUgaG93IHRvIHRyYXZlbCBmcm9tIG9uZSBwb2ludCB0byBhbm90aGVyICovXHJcbnZhciBQYXRoRmluZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUGF0aEZpbmRlcihwYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgdmFyIGNhblBhc3MgPSBwYXJhbWV0ZXJzLmNhblBhc3MsIG1ldHJpYyA9IHBhcmFtZXRlcnMubWV0cmljLCBtYXhJdGVyYXRpb25zID0gcGFyYW1ldGVycy5tYXhJdGVyYXRpb25zLCB3ZWlnaHQgPSBwYXJhbWV0ZXJzLndlaWdodCwgcmVzdCA9IF9fcmVzdChwYXJhbWV0ZXJzLCBbXCJjYW5QYXNzXCIsIFwibWV0cmljXCIsIFwibWF4SXRlcmF0aW9uc1wiLCBcIndlaWdodFwiXSk7XHJcbiAgICAgICAgdGhpcy5jYW5QYXNzID0gY2FuUGFzcztcclxuICAgICAgICBpZiAoIW1ldHJpYykge1xyXG4gICAgICAgICAgICAvLyBEZWZhdWx0IG1ldHJpYyBpcyBNYW5oYXR0YW4gbWV0cmljLCBpZiBub25lIHByb3ZpZGVkXHJcbiAgICAgICAgICAgIG1ldHJpYyA9IGZ1bmN0aW9uIChwb3NpdGlvbjEsIHBvc2l0aW9uMikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKHBvc2l0aW9uMlsxXSAtIHBvc2l0aW9uMVsxXSkgKyBNYXRoLmFicyhwb3NpdGlvbjJbMF0gLSBwb3NpdGlvbjFbMF0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXdlaWdodCkge1xyXG4gICAgICAgICAgICAvLyBEZWZhdWx0IHRvIGV2ZXJ5dGhpbmcgYmVpbmcgbGVuZ3RoIG9mIDFcclxuICAgICAgICAgICAgd2VpZ2h0ID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7IHJldHVybiAxOyB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1heEl0ZXJhdGlvbnMgPSBtYXhJdGVyYXRpb25zO1xyXG4gICAgICAgIHRoaXMubWV0cmljID0gbWV0cmljO1xyXG4gICAgICAgIHRoaXMud2VpZ2h0ID0gd2VpZ2h0O1xyXG4gICAgfVxyXG4gICAgLyoqIEZpbmQgcm91dGUgZnJvbSBzdGFydFBvc2l0aW9uIHRvIGVuZFBvc2l0aW9uLCB2aWEgQSogKi9cclxuICAgIFBhdGhGaW5kZXIucHJvdG90eXBlLmZpbmRQYXRoID0gZnVuY3Rpb24gKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uLCBvcnRob2dvbmFsT25seSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKG9ydGhvZ29uYWxPbmx5ID09PSB2b2lkIDApIHsgb3J0aG9nb25hbE9ubHkgPSBmYWxzZTsgfVxyXG4gICAgICAgIHZhciByb3V0ZSA9IFtdO1xyXG4gICAgICAgIC8vIExpbWl0IHRoZSBsb29wIHNvIGl0IGRvZXNuJ3QgYnJlYWsgdGhpbmdzXHJcbiAgICAgICAgdmFyIG1heEl0ZXJhdGlvbnMgPSAodGhpcy5tYXhJdGVyYXRpb25zKSA/IHRoaXMubWF4SXRlcmF0aW9ucyA6IDQwICogdGhpcy5tZXRyaWMoc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pO1xyXG4gICAgICAgIHZhciBpdGVyYXRpb25zID0gMDtcclxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBsaXN0LCBhbmQgYWRkIHRoZSBzdGFydCB0byBpdFxyXG4gICAgICAgIHZhciBjbG9zZWRMaXN0ID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogX19zcHJlYWRBcnJheXMoc3RhcnRQb3NpdGlvbiksXHJcbiAgICAgICAgICAgICAgICBzdGVwczogMCxcclxuICAgICAgICAgICAgICAgIGRpc3RhbmNlRnJvbUdvYWw6IHRoaXMubWV0cmljKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKSxcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzTG9jYXRpb246IG51bGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdmFyIG9wZW5MaXN0ID0gW107XHJcbiAgICAgICAgLy8gSGFuZGxlIGRpYWdvbmFsc1xyXG4gICAgICAgIHZhciBzdGVwU2l6ZUFyciA9IFswLCAxLCAxLjJdO1xyXG4gICAgICAgIC8vIEZpbmQgYSBwYXRoXHJcbiAgICAgICAgd2hpbGUgKGl0ZXJhdGlvbnMgPCBtYXhJdGVyYXRpb25zICYmXHJcbiAgICAgICAgICAgICF0aGlzLmNvbnRhaW5zKGNsb3NlZExpc3QsIGVuZFBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICBpdGVyYXRpb25zKys7XHJcbiAgICAgICAgICAgIC8vIEV4cGFuZCB0aGUgb3BlbiBsaXN0XHJcbiAgICAgICAgICAgIGNsb3NlZExpc3QuZm9yRWFjaChmdW5jdGlvbiAobG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAtMTsgaSA8IDI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAtMTsgaiA8IDI7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3J0aG9nb25hbE9ubHkgJiYgaSAhPT0gMCAmJiBqICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UG9zaXRpb24gPSBbbG9jYXRpb24ucG9zaXRpb25bMF0gKyBpLCBsb2NhdGlvbi5wb3NpdGlvblsxXSArIGpdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGNvc3QgLyBzaXplIG9mIHN0ZXAgaW50byB0aGUgc3F1YXJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwU2l6ZSA9IHN0ZXBTaXplQXJyW01hdGguYWJzKGkpICsgTWF0aC5hYnMoaildICogX3RoaXMud2VpZ2h0KG5ld1Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5jYW5QYXNzKG5ld1Bvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluQ2xvc2VkTGlzdEFscmVhZHkgPSBfdGhpcy5nZXRMb2NhdGlvbihjbG9zZWRMaXN0LCBuZXdQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbk9wZW5MaXN0QWxyZWFkeSA9IF90aGlzLmdldExvY2F0aW9uKG9wZW5MaXN0LCBuZXdQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5ldyBwb3NpdGlvbiBpcyBpbiBuZWl0aGVyIGxpc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbkNsb3NlZExpc3RBbHJlYWR5ICYmICFpbk9wZW5MaXN0QWxyZWFkeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3Blbkxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IG5ld1Bvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBzOiBsb2NhdGlvbi5zdGVwcyArIHN0ZXBTaXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlRnJvbUdvYWw6IF90aGlzLm1ldHJpYyhuZXdQb3NpdGlvbiwgZW5kUG9zaXRpb24pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzTG9jYXRpb246IGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBwb3NpdGlvbiBpcyBhbHJlYWR5IGluIHRoZSBsaXN0LCBhZGp1c3QgdG8gYmUgd2hpY2hldmVyIHZlcnNpb24gaXMgc2hvcnRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluQ2xvc2VkTGlzdEFscmVhZHkgJiYgaW5DbG9zZWRMaXN0QWxyZWFkeS5zdGVwcyA+IGxvY2F0aW9uLnN0ZXBzICsgc3RlcFNpemUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbkNsb3NlZExpc3RBbHJlYWR5LnN0ZXBzID0gbG9jYXRpb24uc3RlcHMgKyBzdGVwU2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbkNsb3NlZExpc3RBbHJlYWR5LnByZXZpb3VzTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbk9wZW5MaXN0QWxyZWFkeSAmJiBpbk9wZW5MaXN0QWxyZWFkeS5zdGVwcyA+IGxvY2F0aW9uLnN0ZXBzICsgc3RlcFNpemUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbk9wZW5MaXN0QWxyZWFkeS5zdGVwcyA9IGxvY2F0aW9uLnN0ZXBzICsgc3RlcFNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5PcGVuTGlzdEFscmVhZHkucHJldmlvdXNMb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gU29ydCB0aGUgb3BlbiBsaXN0IChoaWdoZXN0IC0tPiBsb3dlc3QpXHJcbiAgICAgICAgICAgIG9wZW5MaXN0LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIChiLnN0ZXBzICsgYi5kaXN0YW5jZUZyb21Hb2FsKSAtIChhLnN0ZXBzICsgYS5kaXN0YW5jZUZyb21Hb2FsKTsgfSk7XHJcbiAgICAgICAgICAgIC8vIFBvcCBvZmYgdGhlIGxvd2VzdCBvcGVuTGlzdCBpdGVtIGFuZCBhZGQgaXQgdG8gdGhlIGNsb3NlZCBsaXN0XHJcbiAgICAgICAgICAgIGNsb3NlZExpc3QucHVzaChvcGVuTGlzdC5wb3AoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEZvdW5kIGEgcm91dGUhIFB1dCB0aGUgcGllY2VzIHRvZ2V0aGVyIGJ5IHdvcmtpbmcgYmFja3dhcmRzXHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRMb2NhdGlvbihjbG9zZWRMaXN0LCBlbmRQb3NpdGlvbik7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbnMoY2xvc2VkTGlzdCwgZW5kUG9zaXRpb24pKSB7XHJcbiAgICAgICAgICAgIGl0ZXJhdGlvbnMgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSAoKGxvY2F0aW9uLnBvc2l0aW9uWzBdICE9PSBzdGFydFBvc2l0aW9uWzBdIHx8IGxvY2F0aW9uLnBvc2l0aW9uWzFdICE9PSBzdGFydFBvc2l0aW9uWzFdKSAmJiBpdGVyYXRpb25zIDwgbWF4SXRlcmF0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgaXRlcmF0aW9ucysrO1xyXG4gICAgICAgICAgICAgICAgcm91dGUucHVzaChsb2NhdGlvbi5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbiA9IGxvY2F0aW9uLnByZXZpb3VzTG9jYXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJvdXRlLnJldmVyc2UoKTtcclxuICAgIH07XHJcbiAgICBQYXRoRmluZGVyLnByb3RvdHlwZS5pc0VxdWFsID0gZnVuY3Rpb24gKHBvc2l0aW9uMSwgcG9zaXRpb24yKSB7XHJcbiAgICAgICAgcmV0dXJuIChwb3NpdGlvbjEucG9zaXRpb25bMF0gPT09IHBvc2l0aW9uMi5wb3NpdGlvblswXSAmJiBwb3NpdGlvbjEucG9zaXRpb25bMV0gPT09IHBvc2l0aW9uMi5wb3NpdGlvblsxXSk7XHJcbiAgICB9O1xyXG4gICAgUGF0aEZpbmRlci5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAobG9jYXRpb25MaXN0LCB0ZXN0TG9jYXRpb24pIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRlc3RMb2NhdGlvbikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uTGlzdC5zb21lKGZ1bmN0aW9uIChsb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChsb2NhdGlvbi5wb3NpdGlvblswXSA9PT0gdGVzdExvY2F0aW9uWzBdICYmIGxvY2F0aW9uLnBvc2l0aW9uWzFdID09PSB0ZXN0TG9jYXRpb25bMV0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhdGlvbkxpc3Quc29tZShmdW5jdGlvbiAobG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5pc0VxdWFsKGxvY2F0aW9uLCB0ZXN0TG9jYXRpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgUGF0aEZpbmRlci5wcm90b3R5cGUuZ2V0TG9jYXRpb24gPSBmdW5jdGlvbiAobG9jYXRpb25MaXN0LCB0ZXN0UG9zaXRpb24pIHtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGxvY2F0aW9uTGlzdF8xID0gbG9jYXRpb25MaXN0OyBfaSA8IGxvY2F0aW9uTGlzdF8xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgbG9jYXRpb25fMSA9IGxvY2F0aW9uTGlzdF8xW19pXTtcclxuICAgICAgICAgICAgaWYgKGxvY2F0aW9uXzEucG9zaXRpb25bMF0gPT09IHRlc3RQb3NpdGlvblswXSAmJiBsb2NhdGlvbl8xLnBvc2l0aW9uWzFdID09PSB0ZXN0UG9zaXRpb25bMV0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsb2NhdGlvbl8xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFBhdGhGaW5kZXI7XHJcbn0oKSk7XHJcbmV4cG9ydCBkZWZhdWx0IFBhdGhGaW5kZXI7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVBhdGhGaW5kZXIuanMubWFwIiwiLyoqIFJhbmRvbSBnZW5lcmF0b3IgKi9cclxudmFyIFJhbmRvbSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFJhbmRvbShzZWVkLCBiYXNlKSB7XHJcbiAgICAgICAgaWYgKCFzZWVkKSB7XHJcbiAgICAgICAgICAgIC8vIEdldCBzZWVkIGZyb20gbWlsbGlzZWNvbmRzIHNpbmNlIEphbiAxc3QsIDE5NzBcclxuICAgICAgICAgICAgc2VlZCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2VlZCA9IE1hdGguZmxvb3Ioc2VlZCk7XHJcbiAgICAgICAgdGhpcy53ZXlsID0gMDtcclxuICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgIHRoaXMuYmFzZSA9IChiYXNlKSA/IGJhc2UgOiAxMDAwMDA7XHJcbiAgICAgICAgLy8gUnVuIGl0IGEgY291cGxlIG9mIHRpbWVzLCBpbiBjYXNlIHRoZSBzZWVkIGlzbid0IHRoYXQgZ29vZC5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRSYW5kb20oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICAvKiogR2VuZXJhdGUgYSByYW5kb20gbnVtYmVyIGZyb20gMCA8PSBudW1iZXIgPCAxICovXHJcbiAgICAvLyBBbiBhdHRlbXB0IHRvIHJlcHJvZHVjZSBzb21ldGhpbmcgcmVzZW1ibGluZyB0aGUgTWlkZGxlIFNxdWFyZSBXZXlsIFNlcXVlbmNlIFBSTkdcclxuICAgIC8vIFNlZSBXaWR5bnNraSAoMjAxNykgaHR0cHM6Ly9hcnhpdi5vcmcvYWJzLzE3MDQuMDAzNTh2NVxyXG4gICAgLy8gVGhlIGFib3ZlIGFsZ29yaXRobSB1c2VzIHVuc2lnbmVkIGludHMuIEpTIHVzZXMgc2lnbmVkIGZsb2F0cy4gRnVydGhlciB0ZXN0aW5nIHJlcXVpcmVkIHRvIHNlZSB3aGV0aGVyIG9yIG5vdCB0aGlzIGlzIGFjdHVhbGx5IGEgcHJvYmxlbS5cclxuICAgIFJhbmRvbS5wcm90b3R5cGUuZ2V0UmFuZG9tID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMueCAqPSB0aGlzLng7XHJcbiAgICAgICAgdGhpcy54ICs9ICh0aGlzLndleWwgKz0gdGhpcy5zZWVkKTtcclxuICAgICAgICAvLyBOb3RlLCA+Pj4gbWFrZXMgdGhlIHNoaWZ0IGJlIHVuc2lnbmVkLiBUaGUgPj4+IDAgYXQgdGhlIGVuZCBmbGlwcyB0aGUgXCJzaWduXCIgYml0IHRvIGJlIHBvc2l0aXZlLCBlbnN1cmluZyBhIG5vbi1uZWdhdGl2ZSByZXN1bHQuXHJcbiAgICAgICAgdGhpcy54ID0gKCh0aGlzLnggPj4+IDMyKSB8ICh0aGlzLnggPDwgMzIpKSA+Pj4gMDtcclxuICAgICAgICByZXR1cm4gKHRoaXMueCAlIHRoaXMuYmFzZSkgLyB0aGlzLmJhc2U7XHJcbiAgICB9O1xyXG4gICAgLyoqIEdldCBhIHJhbmRvbSBudW1iZXIgaW4gYSByYW5nZSAqL1xyXG4gICAgUmFuZG9tLnByb3RvdHlwZS5nZXROdW1iZXIgPSBmdW5jdGlvbiAobWluLCBtYXgsIGludGVnZXIpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGludGVnZXIgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIobWluKSAmJiBOdW1iZXIuaXNJbnRlZ2VyKG1heCkpIHtcclxuICAgICAgICAgICAgICAgIGludGVnZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbnRlZ2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuZ2V0UmFuZG9tKCkgKiAobWF4ICsgMSAtIG1pbikpICsgTWF0aC5jZWlsKG1pbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZ2V0UmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKiBHZXQgYSByYW5kb20gZWxlbWVudCBmcm9tIGFuIGFycmF5ICovXHJcbiAgICBSYW5kb20ucHJvdG90eXBlLmdldFJhbmRvbUVsZW1lbnQgPSBmdW5jdGlvbiAoYXJyYXkpIHtcclxuICAgICAgICB2YXIgcmFuZG9tSW5kZXggPSB0aGlzLmdldE51bWJlcigwLCBhcnJheS5sZW5ndGggLSAxLCB0cnVlKTtcclxuICAgICAgICByZXR1cm4gYXJyYXlbcmFuZG9tSW5kZXhdO1xyXG4gICAgfTtcclxuICAgIC8qKiBHZXQgYSByYW5kb20gZWxlbWVudCwgd2l0aCB3ZWlnaHRzICovXHJcbiAgICBSYW5kb20ucHJvdG90eXBlLmdldFdlaWdodGVkRWxlbWVudCA9IGZ1bmN0aW9uIChhcnJheSkge1xyXG4gICAgICAgIHZhciB0b3RhbFdlaWdodCA9IDA7XHJcbiAgICAgICAgdmFyIGludGVnZXIgPSB0cnVlO1xyXG4gICAgICAgIGFycmF5LmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdG90YWxXZWlnaHQgKz0gZWxlbWVudC53ZWlnaHQ7XHJcbiAgICAgICAgICAgIGludGVnZXIgPSBpbnRlZ2VyICYmIE51bWJlci5pc0ludGVnZXIoZWxlbWVudC53ZWlnaHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciByYW5kb21OdW1iZXIgPSB0aGlzLmdldE51bWJlcigoaW50ZWdlcikgPyAxIDogMCwgdG90YWxXZWlnaHQsIGludGVnZXIpO1xyXG4gICAgICAgIC8vIEdvIHRocm91Z2ggdGhlIGFycmF5IHVudGlsIHdlIGhhdmUgYSB3aW5uZXJcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJhbmRvbU51bWJlciAtPSBhcnJheVtpXS53ZWlnaHQ7XHJcbiAgICAgICAgICAgIGlmIChyYW5kb21OdW1iZXIgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRm91bmQgaXQhXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXlbaV0ub3B0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE5vdCBmb3VuZDsgc2VlbXMgbGlrZSBhIHByb2JsZW1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBtYXRjaCBmb3VuZC5cIik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJhbmRvbTtcclxufSgpKTtcclxuZXhwb3J0IHsgUmFuZG9tIH07XHJcbmV4cG9ydCBkZWZhdWx0IFJhbmRvbTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UmFuZG9tLmpzLm1hcCIsInZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59O1xyXG52YXIgX19zcHJlYWRBcnJheXMgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXlzKSB8fCBmdW5jdGlvbiAoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuaW1wb3J0IFdmY1RpbGUgZnJvbSAnLi9XZmNUaWxlLmpzJztcclxuaW1wb3J0IFJhbmRvbSBmcm9tICcuLi9yYW5kb20vUmFuZG9tLmpzJztcclxuLyoqXHJcbiAqIENsYXNzIHRoYXQgaW1wbGVtZW50cyB0aGUgV2F2ZSBGdW5jdGlvbiBDb2xsYXBzZSBhbGdvcml0aG0uXHJcbiAqL1xyXG52YXIgV0ZDID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gV0ZDKHBhcmFtcykge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICB2YXIgaW5wdXQgPSBwYXJhbXMuaW5wdXQsIF9iID0gcGFyYW1zLm4sIG4gPSBfYiA9PT0gdm9pZCAwID8gMSA6IF9iLCBfYyA9IHBhcmFtcy5tLCBtID0gX2MgPT09IHZvaWQgMCA/IG4gOiBfYywgX2QgPSBwYXJhbXMucmVwZWF0SW5wdXQsIHJlcGVhdElucHV0ID0gX2QgPT09IHZvaWQgMCA/IGZhbHNlIDogX2QsIHJhbmRvbSA9IHBhcmFtcy5yYW5kb20sIF9lID0gcGFyYW1zLmluY2x1ZGVNaXJyb3JzLCBpbmNsdWRlTWlycm9ycyA9IF9lID09PSB2b2lkIDAgPyBmYWxzZSA6IF9lLCBfZiA9IHBhcmFtcy5pbmNsdWRlUm90YXRpb25zLCBpbmNsdWRlUm90YXRpb25zID0gX2YgPT09IHZvaWQgMCA/IGZhbHNlIDogX2YsIHJlc3QgPSBfX3Jlc3QocGFyYW1zLCBbXCJpbnB1dFwiLCBcIm5cIiwgXCJtXCIsIFwicmVwZWF0SW5wdXRcIiwgXCJyYW5kb21cIiwgXCJpbmNsdWRlTWlycm9yc1wiLCBcImluY2x1ZGVSb3RhdGlvbnNcIl0pO1xyXG4gICAgICAgIC8vIENvbnZlcnQgaW50byBhIDJkIGFycmF5XHJcbiAgICAgICAgdmFyIGlucHV0SW1hZ2UgPSBpbnB1dC5tYXAoZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJvdyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvdy5zcGxpdChcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByb3c7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBQcm9jZXNzIHRoZSBpbnB1dCBpbWFnZSBhbmQgc3RvcmUgdGhhdCBkYXRhXHJcbiAgICAgICAgX2EgPSB0aGlzLnByb2Nlc3NJbnB1dChpbnB1dEltYWdlLCByZXBlYXRJbnB1dCwgbiwgbSwgaW5jbHVkZVJvdGF0aW9ucywgaW5jbHVkZU1pcnJvcnMpLCB0aGlzLnJ1bGVzID0gX2FbMF0sIHRoaXMuZnJlcXVlbmNpZXMgPSBfYVsxXTtcclxuICAgICAgICB0aGlzLm4gPSBuO1xyXG4gICAgICAgIHRoaXMubSA9IG07XHJcbiAgICAgICAgaWYgKCFyYW5kb20pIHtcclxuICAgICAgICAgICAgdGhpcy5yYW5kb20gPSBuZXcgUmFuZG9tKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJhbmRvbSA9IHJhbmRvbTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIE1ldGhvZCB0aGF0IHByb2Nlc3NlcyB0aGUgaW1hZ2UgdG8gZ2VuZXJhdGUgYWRqYWNlbmN5IHJ1bGVzIGFuZCB0aWxlIGZyZXF1ZW5jaWVzLlxyXG4gICAgICovXHJcbiAgICBXRkMucHJvdG90eXBlLnByb2Nlc3NJbnB1dCA9IGZ1bmN0aW9uIChpbnB1dCwgcmVwZWF0SW5wdXQsIG4sIG0sIHJvdGF0aW9ucywgbWlycm9ycykge1xyXG4gICAgICAgIC8vIEdldCBkaW1lbnNpb25zXHJcbiAgICAgICAgLy8gSGVpZ2h0IGlzIGp1c3QgdGhlIGxlbmd0aCBvZiB0aGUgYXJyYXlcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gaW5wdXQubGVuZ3RoO1xyXG4gICAgICAgIHZhciBoZWlnaHRUaWxlcyA9IGhlaWdodCAtICgoIXJlcGVhdElucHV0KSA/IChtIC0gMSkgOiAwKTtcclxuICAgICAgICAvLyBXaWR0aCBpcyB0aGUgbWluaW11bSBsZW5ndGggb2YgYSBzdWJhcnJheTsgZm9yY2UgaXQgdG8gYmUgc3F1YXJlLlxyXG4gICAgICAgIHZhciB3aWR0aCA9IE1hdGgubWluLmFwcGx5KE1hdGgsIGlucHV0Lm1hcChmdW5jdGlvbiAocm93KSB7IHJldHVybiByb3cubGVuZ3RoOyB9KSk7XHJcbiAgICAgICAgdmFyIHdpZHRoVGlsZXMgPSB3aWR0aCAtICgoIXJlcGVhdElucHV0KSA/IChuIC0gMSkgOiAwKTtcclxuICAgICAgICAvLyBHZXQgYWxsIHRpbGVzIGluIHRoZSBpbnB1dFxyXG4gICAgICAgIHZhciByYXdUaWxlcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2lkdGhUaWxlczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaGVpZ2h0VGlsZXM7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpbGVJbnB1dCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBtOyB5KyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHlQb3MgPSAoaiArIHkpICUgaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgbjsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4UG9zID0gKHggKyBpKSAlIHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cucHVzaChpbnB1dFt5UG9zXVt4UG9zXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRpbGVJbnB1dC5wdXNoKHJvdyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3VGlsZSA9IG5ldyBXZmNUaWxlKHRpbGVJbnB1dCk7XHJcbiAgICAgICAgICAgICAgICByYXdUaWxlcy5wdXNoKG5ld1RpbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFkZCBpbiByb3RhdGlvbnMgYW5kIG1pcnJvcnMsIGlmIHJlcXVlc3RlZC5cclxuICAgICAgICBpZiAobWlycm9ycykge1xyXG4gICAgICAgICAgICBfX3NwcmVhZEFycmF5cyhyYXdUaWxlcykuZm9yRWFjaChmdW5jdGlvbiAodGlsZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZlcnRpY2FsTWlycm9yID0gdGlsZS5jb250ZW50cy5tYXAoZnVuY3Rpb24gKHJvdykgeyByZXR1cm4gX19zcHJlYWRBcnJheXMocm93KTsgfSkucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhvcml6b250YWxNaXJyb3IgPSB0aWxlLmNvbnRlbnRzLm1hcChmdW5jdGlvbiAocm93KSB7IHJldHVybiBfX3NwcmVhZEFycmF5cyhyb3cpLnJldmVyc2UoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICByYXdUaWxlcy5wdXNoKG5ldyBXZmNUaWxlKHZlcnRpY2FsTWlycm9yKSk7XHJcbiAgICAgICAgICAgICAgICByYXdUaWxlcy5wdXNoKG5ldyBXZmNUaWxlKGhvcml6b250YWxNaXJyb3IpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyb3RhdGlvbnMpIHtcclxuICAgICAgICAgICAgX19zcHJlYWRBcnJheXMocmF3VGlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHRpbGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZVRpbGUgPSB0aWxlLmNvbnRlbnRzLm1hcChmdW5jdGlvbiAocm93KSB7IHJldHVybiBfX3NwcmVhZEFycmF5cyhyb3cpOyB9KTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVUaWxlID0gdGVtcGxhdGVUaWxlWzBdLm1hcChmdW5jdGlvbiAoXywgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlVGlsZS5tYXAoZnVuY3Rpb24gKHJvdykgeyByZXR1cm4gcm93W2luZGV4XTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmF3VGlsZXMucHVzaChuZXcgV2ZjVGlsZSh0ZW1wbGF0ZVRpbGUubWFwKGZ1bmN0aW9uIChyb3cpIHsgcmV0dXJuIF9fc3ByZWFkQXJyYXlzKHJvdyk7IH0pKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBGaWx0ZXIgZG93biwgdG8gZ2V0IHJpZCBvZiByZXBlYXRzXHJcbiAgICAgICAgdmFyIHRpbGVzID0gW107XHJcbiAgICAgICAgdmFyIGZyZXF1ZW5jaWVzID0gW107XHJcbiAgICAgICAgcmF3VGlsZXMuZm9yRWFjaChmdW5jdGlvbiAodGlsZSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aWxlcy5maW5kSW5kZXgoZnVuY3Rpb24gKG90aGVyVGlsZSkgeyByZXR1cm4gb3RoZXJUaWxlLmVxdWFscyh0aWxlKTsgfSk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBmcmVxdWVuY2llc1tpbmRleF0ud2VpZ2h0Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aWxlcy5wdXNoKHRpbGUpO1xyXG4gICAgICAgICAgICAgICAgZnJlcXVlbmNpZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uOiB0aWxlLFxyXG4gICAgICAgICAgICAgICAgICAgIHdlaWdodDogMSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGlsZXMpO1xyXG4gICAgICAgIC8vIE5leHQsIHdlIG5lZWQgYWRqYWNlbmN5IHJ1bGVzXHJcbiAgICAgICAgdmFyIHJ1bGVzID0gdGlsZXMubWFwKGZ1bmN0aW9uICh0aWxlKSB7XHJcbiAgICAgICAgICAgIC8vIEJlZ2luIGEgbmV3IHJ1bGUhXHJcbiAgICAgICAgICAgIHZhciBydWxlID0ge1xyXG4gICAgICAgICAgICAgICAgdXA6IFtdLFxyXG4gICAgICAgICAgICAgICAgZG93bjogW10sXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBbXSxcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiBbXSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHRpbGUgaXMgY29tcGF0aWJsZSB3aXRoIGV2ZXJ5IG90aGVyIHRpbGUsIGluIHRoZSA0IGRpcmVjdGlvbnNcclxuICAgICAgICAgICAgdGlsZXMuZm9yRWFjaChmdW5jdGlvbiAob3RoZXJUaWxlLCBpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZS5jb21wYXRpYmxlKG90aGVyVGlsZSwgLTEsIDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVsZS5yaWdodC5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUuY29tcGF0aWJsZShvdGhlclRpbGUsIDEsIDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVsZS5sZWZ0LnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZS5jb21wYXRpYmxlKG90aGVyVGlsZSwgMCwgLTEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVsZS5kb3duLnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZS5jb21wYXRpYmxlKG90aGVyVGlsZSwgMCwgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBydWxlLnVwLnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBEb25lLCByZXR1cm4gdGhlIGZpbmlzaGVkIHJ1bGVcclxuICAgICAgICAgICAgcmV0dXJuIHJ1bGU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIFtydWxlcywgZnJlcXVlbmNpZXNdO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGUgYW4gb3V0cHV0IGltYWdlLlxyXG4gICAgICovXHJcbiAgICBXRkMucHJvdG90eXBlLmdlbmVyYXRlID0gZnVuY3Rpb24gKHBhcmFtcykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgX3RoaXMuZ2VuZXJhdGVTeW5jKHBhcmFtcywgcmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlIGFuIG91dHB1dCBpbWFnZS5cclxuICAgICAqL1xyXG4gICAgV0ZDLnByb3RvdHlwZS5nZW5lcmF0ZVN5bmMgPSBmdW5jdGlvbiAocGFyYW1zLCByZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciB3aWR0aCA9IHBhcmFtcy53aWR0aCwgaGVpZ2h0ID0gcGFyYW1zLmhlaWdodCwgcmVwZWF0T3V0cHV0ID0gcGFyYW1zLnJlcGVhdE91dHB1dCwgcmVzdCA9IF9fcmVzdChwYXJhbXMsIFtcIndpZHRoXCIsIFwiaGVpZ2h0XCIsIFwicmVwZWF0T3V0cHV0XCJdKTtcclxuICAgICAgICAvLyBJbml0aWFsaXplIHdpdGggYWxsIHRpbGVzIGJlaW5nIHBvc3NpYmxlXHJcbiAgICAgICAgdmFyIHdhdmVGdW5jdGlvbiA9IFtdO1xyXG4gICAgICAgIHZhciBlbnRyb3B5TGlzdCA9IFtdO1xyXG4gICAgICAgIHZhciBkb25lTGlzdCA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaGVpZ2h0OyBqKyspIHtcclxuICAgICAgICAgICAgdmFyIHJvdyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb2x1bW4gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIG51bSA9IDA7IG51bSA8IHRoaXMuZnJlcXVlbmNpZXMubGVuZ3RoOyBudW0rKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGNvdW50ID0gMDsgY291bnQgPCB0aGlzLmZyZXF1ZW5jaWVzW251bV0ud2VpZ2h0OyBjb3VudCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbi5wdXNoKG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gU2FtZSBkYXRhIGlzIGluIGJvdGg7IG9uZSBpcyBqdXN0IGZvciBwb3NpdGlvbnMsIG9uZSBpcyBmb3Igc29ydGluZ1xyXG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogY29sdW1uLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBbaSwgal0sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcm93LnB1c2gob3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBlbnRyb3B5TGlzdC5wdXNoKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdhdmVGdW5jdGlvbi5wdXNoKHJvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFRPRE86IEFkZCBzdGVwIGZvciBhcHBseWluZyBjb25zdHJhaW50cyB0byB0aGUgaW1hZ2VcclxuICAgICAgICAvLyBCZWdpbiB0aGUgbWFpbiBsb29wIVxyXG4gICAgICAgIC8vIEkgd2FudCB0byBtYWtlIHRoaXMgbm9uLWJsb2NraW5nLCBzbyBnb2luZyB0byBkbyBzb21lIHdlaXJkIHNoaXQgd2l0aCBzZXRUaW1lb3V0LlxyXG4gICAgICAgIHZhciBsb29wU3RlcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGVudHJvcHlMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIFNvcnQgdGhlIGVudHJvcHlMaXN0LCB0byBwdXQgdGhlIG9wdGlvbiB3aXRoIGZld2VzdCBwb3NzaWJpbGl0aWVzIGZpcnN0XHJcbiAgICAgICAgICAgICAgICBlbnRyb3B5TGlzdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEub3B0aW9ucy5sZW5ndGggLSBiLm9wdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGZpcnN0IHNldCBvZiBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGVudHJvcHlMaXN0LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBNYWtlIHN1cmUgaXQncyBsZW5ndGggaXMgbm90IDAuIElmIGl0IGlzLCB3ZSBmdWNrZWQgdXAuXHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5vcHRpb25zLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogT3RoZXIgb3B0aW9ucyBmb3IgZmFpbHVyZSAobWF5YmUgYSBkZWZhdWx0IHRpbGU/IFVnbHkgYnV0IG5vdCB0ZXJyaWJsZSBmb3IgYSByb2d1ZWxpa2UpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIldGQyBjb250cmFkaWN0aW9uIGVuY291bnRlcmVkLlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBDaG9vc2UgYW4gb3B0aW9uO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNob2ljZSA9IFtfdGhpcy5yYW5kb20uZ2V0UmFuZG9tRWxlbWVudChvcHRpb25zLm9wdGlvbnMpXTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMub3B0aW9ucyA9IGNob2ljZTtcclxuICAgICAgICAgICAgICAgIGRvbmVMaXN0LnB1c2gob3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAvLyBQcm9wYWdhdGUgdGhhdCBjaG9pY2UgdG8gdGhlIG90aGVyIHRpbGVzXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5hcHBseUFkamFjZW5jeSh3YXZlRnVuY3Rpb24sIG9wdGlvbnMucG9zaXRpb24sIHJlcGVhdE91dHB1dCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGxvb3BTdGVwLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMucG9zdFByb2Nlc3Mod2F2ZUZ1bmN0aW9uKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxvb3BTdGVwKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqIENvbnZlcnQgdGhlIGFycmF5IG9mIG51bWJlcnMgaW50byB0aGUgZGVzaXJlZCBvdXRwdXQgKi9cclxuICAgIFdGQy5wcm90b3R5cGUucG9zdFByb2Nlc3MgPSBmdW5jdGlvbiAod2F2ZUZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gd2F2ZUZ1bmN0aW9uLmxlbmd0aCArICh0aGlzLm0gLSAxKTtcclxuICAgICAgICB2YXIgd2lkdGggPSB3YXZlRnVuY3Rpb24ubGVuZ3RoICsgKHRoaXMubiAtIDEpO1xyXG4gICAgICAgIHZhciBvdXRwdXQgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGhlaWdodDsgaisrKSB7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICByb3cucHVzaChudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChyb3cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3YXZlRnVuY3Rpb24uZm9yRWFjaChmdW5jdGlvbiAocm93LCBqKSB7XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKGZ1bmN0aW9uIChvcHRpb24sIGkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb24ub3B0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbGUgPSBfdGhpcy5mcmVxdWVuY2llc1tvcHRpb24ub3B0aW9uc1swXV0ub3B0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgX3RoaXMubjsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgX3RoaXMubTsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRbaiArIHldW2kgKyB4XSA9IHRpbGUuY29udGVudHNbeV1beF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICB9O1xyXG4gICAgLyoqIEFwcGx5IGFkamFjZW5jeSBydWxlcyAqL1xyXG4gICAgV0ZDLnByb3RvdHlwZS5hcHBseUFkamFjZW5jeSA9IGZ1bmN0aW9uICh3YXZlRnVuY3Rpb24sIF9hLCByZXBlYXRPdXRwdXQsIGJhY2tUcmFjaykge1xyXG4gICAgICAgIHZhciB4ID0gX2FbMF0sIHkgPSBfYVsxXTtcclxuICAgICAgICBpZiAoYmFja1RyYWNrID09PSB2b2lkIDApIHsgYmFja1RyYWNrID0gZmFsc2U7IH1cclxuICAgICAgICB2YXIgdG9Eb1RpbGVzID0gW3dhdmVGdW5jdGlvblt5XVt4XV07XHJcbiAgICAgICAgdmFyIGRvbmVUaWxlcyA9IFtdO1xyXG4gICAgICAgIHdoaWxlICh0b0RvVGlsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgZG9UaWxlID0gdG9Eb1RpbGVzLnBvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BvZ2F0ZSh3YXZlRnVuY3Rpb24sIGRvVGlsZS5wb3NpdGlvbiwgcmVwZWF0T3V0cHV0LCBkb25lVGlsZXMpLmZvckVhY2goZnVuY3Rpb24gKG5ld1RpbGUpIHtcclxuICAgICAgICAgICAgICAgIHRvRG9UaWxlcy5wdXNoKG5ld1RpbGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKCFiYWNrVHJhY2spIHtcclxuICAgICAgICAgICAgICAgIGRvbmVUaWxlcy5wdXNoKGRvVGlsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqIEluZGl2aWR1YWwgcHJvcG9nYXRpb24gc3RlcCAqL1xyXG4gICAgV0ZDLnByb3RvdHlwZS5wcm9wb2dhdGUgPSBmdW5jdGlvbiAod2F2ZUZ1bmN0aW9uLCBfYSwgcmVwZWF0T3V0cHV0LCBpZ25vcmVMaXN0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgeCA9IF9hWzBdLCB5ID0gX2FbMV07XHJcbiAgICAgICAgaWYgKGlnbm9yZUxpc3QgPT09IHZvaWQgMCkgeyBpZ25vcmVMaXN0ID0gW107IH1cclxuICAgICAgICB2YXIgb3B0aW9ucyA9IHdhdmVGdW5jdGlvblt5XVt4XTtcclxuICAgICAgICB2YXIgYWdncmVnYXRlUnVsZXMgPSB7XHJcbiAgICAgICAgICAgIHVwOiBbXSxcclxuICAgICAgICAgICAgZG93bjogW10sXHJcbiAgICAgICAgICAgIGxlZnQ6IFtdLFxyXG4gICAgICAgICAgICByaWdodDogW10sXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBHZXQgYWxsIGF2YWlsYWJsZSBwb3NzaWJpbGl0aWVzXHJcbiAgICAgICAgb3B0aW9ucy5vcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKG9wdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgcnVsZSA9IF90aGlzLnJ1bGVzW29wdGlvbl07XHJcbiAgICAgICAgICAgIHJ1bGUudXAuZm9yRWFjaChmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhZ2dyZWdhdGVSdWxlcy51cC5pbmNsdWRlcyh4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZVJ1bGVzLnVwLnB1c2goeCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBydWxlLmRvd24uZm9yRWFjaChmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhZ2dyZWdhdGVSdWxlcy5kb3duLmluY2x1ZGVzKHgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlUnVsZXMuZG93bi5wdXNoKHgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcnVsZS5sZWZ0LmZvckVhY2goZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghYWdncmVnYXRlUnVsZXMubGVmdC5pbmNsdWRlcyh4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZVJ1bGVzLmxlZnQucHVzaCh4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJ1bGUucmlnaHQuZm9yRWFjaChmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhZ2dyZWdhdGVSdWxlcy5yaWdodC5pbmNsdWRlcyh4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZVJ1bGVzLnJpZ2h0LnB1c2goeCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIE1haW50YWluIGxpc3Qgb2YgbmV4dCB0aWxlcyB0byBnbyB0b1xyXG4gICAgICAgIHZhciBuZXh0VGlsZXMgPSBbXTtcclxuICAgICAgICAvLyBBcHBseSBmb3IgZWFjaCBkaXJlY3Rpb25cclxuICAgICAgICB2YXIgc3RlcHMgPSBbXCJ1cFwiLCBcImRvd25cIiwgXCJsZWZ0XCIsIFwicmlnaHRcIl07XHJcbiAgICAgICAgdmFyIHN0ZXBEaXJlY3Rpb25zID0ge1xyXG4gICAgICAgICAgICB1cDogWzAsIC0xXSxcclxuICAgICAgICAgICAgZG93bjogWzAsIDFdLFxyXG4gICAgICAgICAgICBsZWZ0OiBbLTEsIDBdLFxyXG4gICAgICAgICAgICByaWdodDogWzEsIDBdLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3RlcHMuZm9yRWFjaChmdW5jdGlvbiAoc3RlcCkge1xyXG4gICAgICAgICAgICB2YXIgeHggPSB4ICsgc3RlcERpcmVjdGlvbnNbc3RlcF1bMF07XHJcbiAgICAgICAgICAgIHZhciB5eSA9IHkgKyBzdGVwRGlyZWN0aW9uc1tzdGVwXVsxXTtcclxuICAgICAgICAgICAgaWYgKHJlcGVhdE91dHB1dCkge1xyXG4gICAgICAgICAgICAgICAgeHggKz0gd2F2ZUZ1bmN0aW9uWzBdLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHh4ID0geHggJSB3YXZlRnVuY3Rpb25bMF0ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgeXkgKz0gd2F2ZUZ1bmN0aW9uLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHl5ID0geXkgJSB3YXZlRnVuY3Rpb24ubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh4eCA+PSAwICYmIHh4IDwgd2F2ZUZ1bmN0aW9uWzBdLmxlbmd0aCAmJiB5eSA+PSAwICYmIHl5IDwgd2F2ZUZ1bmN0aW9uLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlnbm9yZUxpc3QuaW5jbHVkZXMod2F2ZUZ1bmN0aW9uW3l5XVt4eF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGJlZm9yZUxlbmd0aCA9IHdhdmVGdW5jdGlvblt5eV1beHhdLm9wdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgd2F2ZUZ1bmN0aW9uW3l5XVt4eF0ub3B0aW9ucyA9IHdhdmVGdW5jdGlvblt5eV1beHhdLm9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFnZ3JlZ2F0ZVJ1bGVzW3N0ZXBdLmluY2x1ZGVzKHgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmVmb3JlTGVuZ3RoID4gd2F2ZUZ1bmN0aW9uW3l5XVt4eF0ub3B0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnByb3BvZ2F0ZSh3YXZlRnVuY3Rpb24sW3h4LHl5XSxyZXBlYXRPdXRwdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRUaWxlcy5wdXNoKHdhdmVGdW5jdGlvblt5eV1beHhdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBuZXh0VGlsZXM7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFdGQztcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgV0ZDO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1XRkMuanMubWFwIiwidmFyIF9fc3ByZWFkQXJyYXlzID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5cykgfHwgZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcbi8qKlxyXG4gKiBBIHRpbGUsIGFzIGRlZmluZWQgZm9yIFdhdmUgRnVuY3Rpb24gQ29sbGFwc2UgcHVycG9zZXNcclxuICovXHJcbnZhciBXZmNUaWxlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gV2ZjVGlsZShpbnB1dCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudHMgPSBpbnB1dC5tYXAoZnVuY3Rpb24gKHJvdykgeyByZXR1cm4gX19zcHJlYWRBcnJheXMocm93KTsgfSk7XHJcbiAgICB9XHJcbiAgICAvKiogQ2hlY2sgaWYgdHdvIFdmY1RpbGUncyBhcmUgZXF1YWwsIHRvIHJlbW92ZSBkdXBsaWNhdGVzLiAqL1xyXG4gICAgV2ZjVGlsZS5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKHRpbGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21wYXRpYmxlKHRpbGUsIDAsIDApO1xyXG4gICAgfTtcclxuICAgIC8qKiBDaGVjayBpZiB0d28gV2ZjVGlsZSdzIGFyZSBjb21wYXRpYmxlIChpLmUuIGNhbiBiZSBuZWlnaGJvdXJzKSAqL1xyXG4gICAgV2ZjVGlsZS5wcm90b3R5cGUuY29tcGF0aWJsZSA9IGZ1bmN0aW9uICh0aWxlLCB4LCB5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudHMuZXZlcnkoZnVuY3Rpb24gKHJvdywgaikge1xyXG4gICAgICAgICAgICByZXR1cm4gcm93LmV2ZXJ5KGZ1bmN0aW9uICh2YWwsIGkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB4UG9zID0gaSArIHg7XHJcbiAgICAgICAgICAgICAgICB2YXIgeVBvcyA9IGogKyB5O1xyXG4gICAgICAgICAgICAgICAgaWYgKHhQb3MgPj0gMCAmJiB5UG9zID49IDAgJiYgeVBvcyA8IHRpbGUuY29udGVudHMubGVuZ3RoICYmIHhQb3MgPCB0aWxlLmNvbnRlbnRzW3lQb3NdLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgPT09IHRpbGUuY29udGVudHNbeVBvc11beFBvc107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIENoZWNrIGlmIHRoaXMgdGlsZSB3b3JrIHdpdGggYSBnaXZlbiBjb25zdHJhaW50ICovXHJcbiAgICBXZmNUaWxlLnByb3RvdHlwZS5jb25zdHJhaW4gPSBmdW5jdGlvbiAoY29uc3RyYWludCwgeCwgeSkge1xyXG4gICAgICAgIGlmICh5ID49IDAgJiYgeSA8IHRoaXMuY29udGVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICh4ID49IDAgJiYgeCA8IHRoaXMuY29udGVudHNbeV0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50c1t5XVt4XSA9PT0gY29uc3RyYWludDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gV2ZjVGlsZTtcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgV2ZjVGlsZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9V2ZjVGlsZS5qcy5tYXAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vZG9jcy9zY3JpcHQuanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9