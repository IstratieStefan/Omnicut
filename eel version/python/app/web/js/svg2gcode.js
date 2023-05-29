function pyth(x1, y1, x2, y2){
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}

export function convert2Gcode(svg, precision, multiplier){
    document.getElementById('SVGtransform').innerHTML = svg;
    let final = "";
    let paths = document.getElementById('SVGtransform').getElementsByTagName('path');
    let polygons = document.getElementById('SVGtransform').getElementsByTagName('polygon');
    let lastX, lastY;

    for (let i = 0; i < paths.length; i++){
        let len = paths[i].getTotalLength();
        var pt = paths[i].getPointAtLength(0);
        final += `G0 X${pt.x*multiplier} Y${pt.y*multiplier}\n`;
        lastX = pt.x, lastY = pt.y;
        final += "G91\nG0 X0 Y0 Z-1\nG90\n";
        document.getElementById('file').max = len;
        document.getElementById('file').value = 0;
        for (let p = 1; p < len; p += precision){
            ++document.getElementById('file').value;
            pt = paths[i].getPointAtLength(p);
            if (pyth(pt.x, pt.y, lastX, lastY) > precision*1.1){
                final += `G0 X${pt.x*multiplier} Y${pt.y*multiplier}\n`;
            } else {
                final += `G1 X${pt.x*multiplier} Y${pt.y*multiplier} E40 F400\n`;
            }
            lastX = pt.x, lastY = pt.y;
            
        }
        final += "G91\nG0 X0 Y0 Z1\nG90\n";
    }

    for (let i = 0; i < polygons.length; i++){
        let len = paths[i].getTotalLength();
        var pt = paths[i].getPointAtLength(0);
        final += `G0 X${pt.x*multiplier} Y${pt.y*multiplier}\n`;
        lastX = pt.x, lastY = pt.y;
        final += "G90\nG0 X0 Y0 Z-1\nG90";
        for (let p = 1; p < len; p += precision){
            pt = paths[i].getPointAtLength(p);
            if (pyth(pt.x, pt.y, lastX, lastY) > precision*1.1){
                final += `G0 X${pt.x*multiplier} Y${pt.y*multiplier}\n`;
            } else {
                final += `G1 X${pt.x*multiplier} Y${pt.y*multiplier} E40 F400\n`;
            }
            lastX = pt.x, lastY = pt.y;
        }
        final += "G91\nG1 X0 Y0 Z1\nG90";
    }
    return final;
}