/** Vision callback function */
type canSee = (position:Array<number>)=>boolean

/** Angles that are in shadows */
interface Shadow {
    startAngle: number;
    endAngle: number;
}

/** Field of view */
export default class FOV {

    private canSee:canSee;
    private range:number;

    /** Accepts a callback function to determine if a location is seethrough */
    constructor(canSee:canSee, range?:number) {
        this.canSee = canSee;
        this.range = range ? range : 8;
    };

    /** Do the FOV calculation */
    look(position:Array<number>, lookRangeOverride?:number) {
        const range = (lookRangeOverride) ? lookRangeOverride : this.range;
        // See the starting location (hooray! Great start)
        this.canSee(position);
        // const lookTiles:Array<Tile> = [];
        const shadows:Array<Shadow> = [];
        const newShadows:Array<Shadow> = [];

        // From nearby to far away
        let i=0;
        let j=0;
        for (let distance=1;distance<=range;distance++) {
            // Get square shell around position
            for (let side=0;side<4;side++) {
                for (let edge=-distance;edge<=distance;edge++) {
                    if(side===0) {
                        i=edge;
                        j=distance;
                    } else if (side===1) {
                        j=edge;
                        i=distance;
                    } else if (side===2) {
                        i=edge;
                        j=-distance;
                    } else {
                        j=edge;
                        i=-distance;
                    }
                    const lookPos = [position[0]+i, position[1]+j];
                    const dist = this.distance(position, lookPos);
                    // Out of range? Skip.
                    if (dist > range) {
                        continue;
                    }
                    // In shadows? Skip.
                    const angleTo = this.angleTo(position, lookPos);
                    const angularSize = this.angularSize(position, lookPos) / 2;
                    let inShadows = false;
                    if(
                        this.isInShadows(angleTo, shadows) &&
                        this.isInShadows(angleTo+angularSize, shadows) &&
                        this.isInShadows(angleTo-angularSize, shadows )) {
                        inShadows=true;
                    }
                    // Now, test if we can see through the tile
                    if(inShadows || !this.canSee(lookPos)) {
                        // Square is opaque! Add its shadow
                        newShadows.push({
                            startAngle: angleTo - angularSize,
                            endAngle: angleTo + angularSize
                        });
                    }
                }
            }
            // Add newShadows to shadows
            while(newShadows.length>0) {
                // shadows.push(newShadows.pop());
                this.combineShadow(shadows, newShadows.pop());
            }
            // Check if we should call it quits
            if (shadows.length === 1 && shadows[0].endAngle - shadows[0].startAngle >= 360) {
                return;
            }
        }
    };

    /** Get angle a tile resides in
     * This ranges from -180 to 180, so be careful
    */
    angleTo(startPosition: Array<number>, endPosition: Array<number>) {
        const y = endPosition[1] - startPosition[1];
        const x = endPosition[0] - startPosition[0];
        const angle =  180*Math.atan2(y,x)/Math.PI;
        return (angle>=0) ? angle : angle + 360;
    };

    /** Get angular size of a square */
    angularSize(startPosition: Array<number>, endPosition: Array<number>) {
        const distance = this.distance(startPosition,endPosition);
        return 360*Math.atan(1/(2*distance))/Math.PI;
    };

    /** Get distance */
    distance(startPosition: Array<number>, endPosition: Array<number>) {
        return Math.sqrt((endPosition[1] - startPosition[1])**2 + (endPosition[0] - startPosition[0])**2);
    }

    /** Check if in shadows */
    isInShadows(angle:number, shadows:Array<Shadow>): boolean {
        const negAngle = angle - 360;
        for (const shadow of shadows) {
            if ((angle <= shadow.endAngle && angle >= shadow.startAngle) || (negAngle <= shadow.endAngle && negAngle >= shadow.startAngle)) {
                return true;
            }
        }
        return false;
    }

    /** Add a shadow to the shadow array */
    combineShadow(shadows:Array<Shadow>, newShadow:Shadow) {
        const overLapArr = [];
        for (let i=0;i<shadows.length;i++) {
            const shadow = shadows[i];
            // Check if they overlap
            if (newShadow.startAngle < shadow.endAngle && newShadow.endAngle > shadow.startAngle) {
                newShadow.startAngle = Math.min(shadow.startAngle, newShadow.startAngle);
                newShadow.endAngle = Math.max(shadow.endAngle, newShadow.endAngle);
                overLapArr.push(i);
            }
        }
        if (overLapArr.length > 0) {
            const mainShadow = shadows[overLapArr.shift()];
            mainShadow.startAngle = newShadow.startAngle;
            mainShadow.endAngle = newShadow.endAngle;
            for (let i = overLapArr.length-1; i>=0; i--) {
                shadows.splice(overLapArr[i],1);
            }
        } else {
            shadows.push(newShadow);
        }
    }
}