import { startLoadingProgressive } from "./init-preview.js";
import { convert2Gcode } from "./svg2gcode.js";

function loadModel(){
	let file = SVGinput.files[0]; //get first file
	if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        if (file.type.toLowerCase().includes('svg')){ //if the file is an SVG
            reader.onload = function (evt) {
                if (document.getElementById('precision') != "" && document.getElementById('multiplier') != ""){
                    document.getElementById('SVGtransform').innerHTML = evt.target.result; //sets the SVGtransform div content to the SVG
                    let code = convert2Gcode(+document.getElementById('precision').value, +document.getElementById('multiplier').value, +document.getElementById('feed').value, +document.getElementById('ofX').value, +document.getElementById('ofY').value, +document.getElementById('ofZ').value); //converts to g-code
                    startLoadingProgressive(code); //loads g-code
                    document.getElementById('gcode').value = code.replaceAll(' E40', ''); //writes g-code to g-code text area
                } else {
                    alert("You must fill in the precision and the multiplier to submit an SVG file.")
                }
            }
        } else { //if the file is g-code
            reader.onload = function (evt) {
                startLoadingProgressive(evt.target.result); //loads g-code
                document.getElementById('gcode').value = evt.target.result.replaceAll(' E40', ''); //writes g-code to g-code text area
            }   
        }
        reader.onerror = function () {
            console.log("Error while reading file");
        }
	}
    preview.resize(); //resizes preview
}

export function refresh(){ //see documentation
    let code = convert2Gcode(+document.getElementById('precision').value, +document.getElementById('multiplier').value, +document.getElementById('feed').value, +document.getElementById('ofX').value, +document.getElementById('ofY').value, +document.getElementById('ofZ').value);
    startLoadingProgressive(code);
    document.getElementById('gcode').value = code.replaceAll(' E40', '');
}

function reload(){ //see documentation
    startLoadingProgressive(document.getElementById('gcode').value);
    preview.resize();
}

let SVGinput = document.getElementById('convertSVG');
SVGinput.onchange = loadModel;
document.getElementById('refresh').onclick = refresh;
document.getElementById('reload').onclick = reload;