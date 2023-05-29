let paths = document.getElementsByTagName('path');
let Gcodes = [];
let final = "";

for (let i = paths.length-1; i < paths.length; i++){
    let len = paths[i].getTotalLength();
    var pt = paths[i].getPointAtLength(0);
    final += `G0 X${pt.x} Y${pt.y}\n`;
    for (let p = 1; p < len; p += 100){
        pt = paths[i].getPointAtLength(p);
        final += `G1 X${pt.x/100} Y${pt.y/100} E30 F1500\n`;
    }
}

eel.wr(final)();
console.log(555555555)