import * as ot from "https://unpkg.com/opentype.js/dist/opentype.module.js";
import { convert2Gcode } from "./svg2gcode.js";
import { startLoadingProgressive } from "./init-preview.js";

var buffer, font = null;

function text2path(str, x, y, size, font){
    let d = "";
    let path = font.getPath(str, x, y, size, {}).commands;
    for (let i = 0; i < path.length; i++){
        let data = Object.values(path[i]);
        console.log(data);
        for (let j = 0; j < data.length; j++){
            d += data[j] + ' ';
        }
    }
    return d;
}

function loadFont(){
    buffer = document.getElementById('openFont').files[0].arrayBuffer();

    buffer.then(data => {
        font = ot.parse(data);
    });
}

function write(){
    if (font == null){
        alert("No font selected!");
        return;
    }
    document.getElementById('SVGtransform').innerHTML = `<svg id="textSVG"></svg>`;
    let texts = document.getElementById('writeArea').value.split('\n');
    let svg = document.getElementById('textSVG');
    //console.log(svg);
    //console.log(texts);
    for (let i = 0; i < texts.length; i++){
        //console.log("cv mere")
        svg.innerHTML += `<path d="${text2path(texts[i], +document.getElementById('textX').value,  +document.getElementById('textY').value+i*(+document.getElementById('fontSize').value), +document.getElementById('fontSize').value, font)}" />`
    }
    let code = convert2Gcode(+document.getElementById('precision').value, +document.getElementById('multiplier').value, +document.getElementById('feed').value, +document.getElementById('ofX').value, +document.getElementById('ofY').value, +document.getElementById('ofZ').value); //converts to g-code
    startLoadingProgressive(code); //loads g-code
    document.getElementById('gcode').value = code.replaceAll(' E40', ''); //writes g-code to g-code text area
}

document.getElementById('openFont').onchange = loadFont;
document.getElementById('write').onclick = write;