# Roguelike Pumpkin Patch

A library to help you build a cool new roguelike in JavaScript or TypeScript. Pumpkin vines can get pretty long and gnarly, but your code doesn't have to.

## Current Features
- HTML and CSS based display; you can use all the CSS features you know and love
- A cool event manager
- Pathfinding using A*
- Field of View
- Random numbers, and helpful utilities to go with them
- and more to come!

## Building

Start by cloning the repository:

```git clone https://github.com/laurheth/roguelike-pumpkin-patch.git```

Next, install npm packages:

```npm install```

Finally, build:

```npm run build```

## Usage

In the `dist` directory, there's both a bundled `roguelike-pumpkin-patch.js`, and a minified `roguelike-pumpkin-patch.min.js`; include whichever version you prefer in the head of your page. I would recommend unminified for development, then switch to minified for the published version.

You can also import individual modules into your JavaScript or TypeScript projects.

## History

This was partially inspired by [rot.js](http://ondras.github.io/rot.js/hp/), which is super cool and I've used for several projects. I wanted to try my hand at building a library, and did much of the work on this as part of [pumpkin-related game](https://github.com/laurheth/pumpkin-oubliette) (hence the pumpkin theme). I made it to help myself with future projects, and I hope that it will be useful for you as well!
