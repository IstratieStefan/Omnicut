function pyth(x1, y1, x2, y2){
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}

export function convert2Gcode(svg, precision, multiplier){
    document.getElementById('SVGtransform').innerHTML = svg;
    let final = "";
    let pathTypes = [
        document.getElementById('SVGtransform').getElementsByTagName('path'),
        document.getElementById('SVGtransform').getElementsByTagName('polygon')
    ];
    let lastX, lastY;
    let raised = 1;
    let rise = +document.getElementById('rise').value;
    //final += `G91\nG0 X0 Y0\nG90\n`;
    for (let j = 0; j < pathTypes.length; j++){
        for (let i = 0; i < pathTypes[j].length; i++){
            let len = pathTypes[j][i].getTotalLength();
            var pt = pathTypes[j][i].getPointAtLength(0);
            final += `G1 X${(pt.x*multiplier).toFixed(3)} Y${(pt.y*multiplier).toFixed(3)} E40 F200\n`;
            lastX = pt.x, lastY = pt.y;
            if (raised){
                //final += `G91\nG0 X0 Y0\nG90\n`;
                raised = 0;
            }
            document.getElementById('file').max = len;
            document.getElementById('file').value = 0;
            for (let p = 1; p < len; p += precision){
                ++document.getElementById('file').value;
                pt = pathTypes[j][i].getPointAtLength(p);
                if (pyth(pt.x, pt.y, lastX, lastY) > precision*1.1){
                    final += `G1 X${(pt.x*multiplier).toFixed(3)} Y${(pt.y*multiplier).toFixed(3)} E40 F200\n`;
                    raised = 1;
                } else {
                    final += `G1 X${(pt.x*multiplier).toFixed(3)} Y${(pt.y*multiplier).toFixed(3)} E40 F200\n`;
                    if (raised){
                        final += `G1 X${(pt.x*multiplier).toFixed(3)} Y${(pt.y*multiplier).toFixed(3)} E40 F200\n`;
                        raised = 0;
                    }
                }
                lastX = pt.x, lastY = pt.y;
                
            }
            if (!raised){
                //final += `G91\nG0 X0 Y0\nG90\n`;
                raised = 1;
            }
        }
    }
    final += `G91\nG0 X0 Y0 Z5\nG90\nG0 X0 Y0`;
    return final;
}