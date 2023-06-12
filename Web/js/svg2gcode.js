function pyth(x1, y1, x2, y2){ //see documentation
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}

var outside = 0, loaded = 0;

export function convert2Gcode(precision, multiplier, feed, offsetX, offsetY, offsetZ){
    outside = 0;
    let final = "";
    let pathTypes = [ //the paths that will be considered
        document.getElementById('SVGtransform').getElementsByTagName('path'),
        document.getElementById('SVGtransform').getElementsByTagName('circle'),
        document.getElementById('SVGtransform').getElementsByTagName('rect'),
        document.getElementById('SVGtransform').getElementsByTagName('ellipse')
    ];
    let lastX, lastY, x, y;
    let raised = 1;
    let rise = +document.getElementById('rise').value;
    function raise(direction){  //see documentation
        if (direction != raised){ //if the direction is different from the current rise state
            raised = !raised;
            final += `G91\nG0 X0 Y0 Z${(direction?rise:-rise)+offsetZ}\nG90\n`;
        }
    }
    final += `G91\nG0 X0 Y0 Z${rise+offsetZ}\nG90\n`;
    for (let j = 0; j < pathTypes.length; j++){ //for each path type
        for (let i = 0; i < pathTypes[j].length; i++){ //for each path in a path type
            loaded = 1;
            let len = pathTypes[j][i].getTotalLength(); //get length
            var pt = pathTypes[j][i].getPointAtLength(0); //get starting point
            raise(1);
            x = (pt.x*multiplier+offsetX).toFixed(3);
            y = -(pt.y*multiplier-offsetY).toFixed(3);
            final += `G0 X${x} Y${y}\n`;
            if (!outside && (x < 0 || x > +document.getElementById('volX').value || y < 0 || y > +document.getElementById('volY').value)){
                outside = 1;
            }
            lastX = pt.x, lastY = pt.y;
            raise(0);
             //initialises progress bar
            document.getElementById('file').max = len;
            document.getElementById('file').value = 0;
            for (let p = 1; p < len; p += precision){
                document.getElementById('file').value = +document.getElementById('file').value+precision; //updates progress bar
                pt = pathTypes[j][i].getPointAtLength(p);
                if (pyth(pt.x, pt.y, lastX, lastY) > precision*1.1){ //if 2 consecutive points are further than precision*1.1 units away from eachother
                    raise(1); //raise
                    x = (pt.x*multiplier+offsetX).toFixed(3);
                    y = -(pt.y*multiplier-offsetY).toFixed(3);
                    final += `G0 X${x} Y${y}\n`; //move to next position
                    if (!outside && (x < 0 || x > +document.getElementById('volX').value || y < 0 || y > +document.getElementById('volY').value)){
                        outside = 1;
                    }
                } else {
                    raise(0); //lower
                    x = (pt.x*multiplier+offsetX).toFixed(3);
                    y = -(pt.y*multiplier-offsetY).toFixed(3);
                    final += `G1 X${x} Y${y} E40 F${feed}\n`; //cut to next position
                    if (!outside && (x < 0 || x > +document.getElementById('volX').value || y < 0 || y > +document.getElementById('volY').value)){
                        outside = 1;
                    }
                }
                lastX = pt.x, lastY = pt.y;
                
            }
            pt = pathTypes[j][i].getPointAtLength(len-1);
            lastX = pt.x, lastY = pt.y;
            pt = pathTypes[j][i].getPointAtLength(0);
        }
    }
    final += `G91\nG0 X0 Y0 Z${rise+offsetZ}\nG90\n`; //rise spindle
    final += `G0 X0 Y0\n`; //go to start point (only X and Y axis)
    final += `G91\nG0 X0 Y0 Z${-rise+offsetZ}\nG90\n`; //lower spindle
    return final;
}

export function isOutside(){
    return outside;
}

export function isLoaded(){
    return loaded;
}