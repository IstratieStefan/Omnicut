function pyth(x1, y1, x2, y2){
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}

export function convert2Gcode(precision, multiplier, feed, offsetX, offsetY, offsetZ){
    let final = "";
    let pathTypes = [
        document.getElementById('SVGtransform').getElementsByTagName('path'),
        document.getElementById('SVGtransform').getElementsByTagName('polygon')
    ];
    let lastX, lastY;
    let raised = 1;
    let rise = +document.getElementById('rise').value;
    final += `G91\nG0 X0 Y0 Z${rise+offsetZ}\nG90\n`;
    for (let j = 0; j < pathTypes.length; j++){
        for (let i = 0; i < pathTypes[j].length; i++){
            let len = pathTypes[j][i].getTotalLength();
            var pt = pathTypes[j][i].getPointAtLength(0);
            final += `G0 X${(pt.x*multiplier+offsetX).toFixed(3)} Y${(pt.y*multiplier+offsetY).toFixed(3)}\n`;
            lastX = pt.x, lastY = pt.y;
            if (raised){
                final += `G91\nG0 X0 Y0 Z${-rise+offsetZ}\nG90\n`;
                raised = 0;
            }
            document.getElementById('file').max = len;
            document.getElementById('file').value = 0;
            for (let p = 1; p < len; p += precision){
                document.getElementById('file').value = +document.getElementById('file').value+precision;
                pt = pathTypes[j][i].getPointAtLength(p);
                if (pyth(pt.x, pt.y, lastX, lastY) > precision*1.1){
                    if (!raised){
                        final += `G91\nG0 X0 Y0 Z${rise+offsetZ}\nG90\n`;
                        raised = 1;
                    }
                    final += `G0 X${(pt.x*multiplier+offsetX).toFixed(3)} Y${(pt.y*multiplier+offsetY).toFixed(3)}\n`;
                } else {
                    if (raised){
                        final += `G91\nG0 X0 Y0 Z${-rise+offsetZ}\nG90\n`;
                        raised = 0;
                    }
                    final += `G1 X${(pt.x*multiplier+offsetX).toFixed(3)} Y${(pt.y*multiplier+offsetY).toFixed(3)} E40 F${feed}\n`;
                }
                lastX = pt.x, lastY = pt.y;
                
            }
            pt = pathTypes[j][i].getPointAtLength(len-1);
            lastX = pt.x, lastY = pt.y;
            pt = pathTypes[j][i].getPointAtLength(0);
        }
    }
    final += `G91\nG0 X0 Y0 Z${rise+offsetZ}\nG90\n`;
    final += `G0 X0 Y0\n`;
    final += `G91\nG0 X0 Y0 Z${-rise+offsetZ}\nG90\n`;
    return final;
}