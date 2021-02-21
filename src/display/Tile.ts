import { TileSize, Position, TileOptions } from './DisplayInterfaces.js';

const baseClassName = "pumpkin-tile";

/** Class to keep track of each individual tile in the display */
export class Tile {
    /** Contents of the tile  */
    private contentElement: HTMLElement;
    private _content: string | HTMLElement;
    /** Background colour. */
    private _background: string;
    /** Foreground colour */
    private _foreground: string;

    /** Position */
    private _position: Position;

    /** Size of a title, in CSS units */
    private _tileHeight: number;
    private _tileWidth: number;

    private _classList: Array<string>;

    /** Element this tile corresponds to in the DOM */
    readonly element: HTMLDivElement;

    constructor(
        tileOptions: TileOptions,
        position: Position,
        tileSize?: TileSize,
    ) {
        // Create necessary elements and apply classes
        this.element = document.createElement('div');
        this.element.classList.add(baseClassName);
        
        // Set tile content and colour scheme
        const { content='', foreground='', background='', className='', classList = [], ...rest } = tileOptions;
        this.content = content;
        this.foreground = foreground;
        this.background = background;
        if (classList.length > 0) {
            this.classList = classList;
        } else {
            this.className = className;
        }

        // Set the tile size
        this.tileWidth = (tileSize?.tileWidth) ? tileSize.tileWidth : 16;
        this.tileHeight = (tileSize?.tileHeight) ? tileSize.tileHeight : this.tileWidth;

        // Set the tile position
        this.position = position;

    };

    /** Get or set the tile contents */
    get content(): string | HTMLElement {
        return this._content;
    }

    set content(newContent: string | HTMLElement) {
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
                while(this.contentElement.lastElementChild) {
                    this.contentElement.removeChild(this.contentElement.lastElementChild);
                }
                this.contentElement.appendChild(newContent);
            }
            this._content = newContent;
        }
    }

    /** Get or set the background colour */
    get background(): string {
        return this._background;
    }
    
    set background(newBackground: string) {
        if (newBackground !== this._background) {
            this._background = newBackground;
            this.element.style.backgroundColor = newBackground;
        }
    }

    /** Get or set the foreground colour */
    get foreground(): string {
        return this._foreground;
    }

    set foreground(newForeground: string) {
        if (newForeground !== this._foreground) {
            this._foreground = newForeground;
            this.element.style.color = newForeground;
        }
    }

    /** Get or set position */
    get position(): Position {
        return this._position;
    }

    set position(position: Position) {
        this._position = {...position};
        this.element.style.left = `${position.x * this.tileWidth}px`;
        this.element.style.top = `${position.y * this.tileHeight}px`;
    }

    /** Get or set tile width */
    get tileWidth():number {
        return this._tileWidth;
    }

    set tileWidth(newWidth: number) {
        this._tileWidth = newWidth;
        this.element.style.width = `${newWidth}px`;
    }

    /** Get or set the tile height */
    get tileHeight():number {
        return this._tileHeight;
    }

    set tileHeight(newHeight: number) {
        this._tileHeight = newHeight;
        this.element.style.height = `${newHeight}px`;
    }

    /** Get or set the classname */
    get className():string {
        return this.classList.join(" ");
    }

    set className(newClass:string) {
        this.classList = newClass.split(" ");
    }

    /** Get or set the list of classes */
    get classList():Array<string> {
        return [baseClassName, ...this._classList];
    }

    set classList(newClassList:Array<string>) {
        if (!this._classList) {
            this._classList = [];
        }
        if (newClassList.length !== this._classList.length || !newClassList.every(name=>this._classList.includes(name))) {
            if (this._classList.length > 0) {
                this.element.classList.remove(...this._classList);
            }
            this._classList = newClassList.filter(x=>x.trim() && x!==baseClassName);
            if (newClassList.length > 0) {
                // Set using the getter, to ensure baseClassName is still on the list.
                this.element.classList.add(...this.classList);
            }
        }
    }

    /** Set options for the tile */
    setOptions(newOptions: TileOptions) {
        const {content="", background="", foreground="", className="", classList} = newOptions;
        
        this.content = content;
        this.background = background;
        this.foreground = foreground;
        if (classList) {
            this.classList = classList;
        } else {
            this.className = className;
        }
    }

    
    /** 
     * Update options for the tile
     */
    updateOptions(newOptions: TileOptions) {
        const {content, background, foreground, className, classList} = newOptions;
        if (typeof content !== "undefined") {
            this.content = content;
        }
        if (typeof background !== "undefined") {
            this.background = background;
        }
        if (typeof foreground !== "undefined") {
            this.foreground = foreground;
        }
        if (classList && classList.length>0) {
            this.classList = classList;
        } else if (typeof className !== "undefined") {
            this.className = className;
        }
    }

    /** Check if a contentElement exists, and if it doesn't, add it */
    confirmContentElement() {
        if (!this.contentElement) {
            this.contentElement = document.createElement('div');
            this.element.appendChild(this.contentElement);
        }
    }
}
