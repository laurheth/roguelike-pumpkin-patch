# Roguelike Pumpkin Patch

A library to help you build a cool new roguelike in JavaScript or TypeScript. Pumpkin vines can get pretty long and gnarly, but your code doesn't have to.

See below for instructions on getting or building the library! For usage instructions after that, head over to the [documentation](https://laurheth.github.io/roguelike-pumpkin-patch/)!

## Current Features
- HTML and CSS based display; you can use all the CSS features you know and love
- A cool event manager
- Pathfinding using A*
- Field of View
- Random numbers, and helpful utilities to go with them
- and more to come!


## Getting the library

You can get the library by running (once it has actually been published... come back in a week if this doesn't work yet :P):

```npm install roguelike-pumpkin-patch```

If you want to use a bundle, in the `dist` directory, there's both a bundled `roguelike-pumpkin-patch.js`, and a minified `roguelike-pumpkin-patch.min.js`; link to whichever version you prefer in the head of your page. You can then access the entire library via the bundled `RPP` object.

If you're using a build system like Webpack, you can import whatever components you need directly, i.e.

```import { Display, EventManager, Random, FOV, PathFinder } from "roguelike-pumpkin-patch";```

You can also use the modules directly in your browser via a similar method, i.e.

```import { Display } from "./node_modules/roguelike-pumpkin-patch/lib/index.js"```

or even

```import Display from "./node_modules/roguelike-pumpkin-patch/lib/display/Display.js"```

## Building

If you want to build the library locally, these instructions are for you!

Start by cloning the repository:

```git clone https://github.com/laurheth/roguelike-pumpkin-patch.git```

Next, install npm packages:

```npm install```

Finally, build:

```npm run build```

## History

This was partially inspired by [rot.js](http://ondras.github.io/rot.js/hp/), which is super cool and I've used for several projects. I wanted to try my hand at building a library, and did much of the work on this as part of [pumpkin-related game](https://github.com/laurheth/pumpkin-oubliette) (hence the pumpkin theme). I made it to help myself with future projects, and I hope that it will be useful for you as well!
