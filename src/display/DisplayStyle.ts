// Default styling for the display. This gets inserted into the document head, before other stylesheets (so that you can override them if desired!)
const css = `
.pumpkin-container {
    position: relative;
    overflow: hidden;
    background-color: #000000;
    color: #ffffff;
}

.pumpkin-display {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.pumpkin-tile {
    position: absolute;
}

.pumpkin-tile > * {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
}
`;

export default css;