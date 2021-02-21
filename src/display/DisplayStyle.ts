// Default styling for the display.
const css = `
.pumpkin-container {
    position: relative;
    overflow: hidden;
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