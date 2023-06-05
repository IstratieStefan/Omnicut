import { startLoadingProgressive } from "./init-preview.js";
import { convert2Gcode } from "./svg2gcode.js";

let SVGinput = document.getElementById('convertSVG');

SVGinput.onchange = function(){
	let file = SVGinput.files[0];
	if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        if (file.type.toLowerCase().includes('svg')){
            reader.onload = function (evt) {
                if (document.getElementById('precision') != "" && document.getElementById('multiplier') != ""){
                    console.log(document.getElementById('precision').value, document.getElementById('multiplier'));
                    document.getElementById('SVGtransform').innerHTML = evt.target.result;
                    let code = convert2Gcode(+document.getElementById('precision').value, +document.getElementById('multiplier').value, +document.getElementById('feed').value, +document.getElementById('ofX').value, +document.getElementById('ofY').value, +document.getElementById('ofZ').value);
                    startLoadingProgressive(code);
                    document.getElementById('gcode').value = code.replaceAll(' E40', '');
                } else {
                    alert("You must fill in the precision and the multiplier to submit an SVG file.")
                }
            }  
        } else {
            reader.onload = function (evt) {
                startLoadingProgressive(evt.target.result);
                document.getElementById('gcode').value = evt.target.result.replaceAll(' E40', '');
            }   
        }
        reader.onerror = function () {
            console.log("Error while reading file");
        }
	}
    preview.resize();
}

document.getElementById('refresh').onclick = function(){
    let code = convert2Gcode(+document.getElementById('precision').value, +document.getElementById('multiplier').value, +document.getElementById('feed').value, +document.getElementById('ofX').value, +document.getElementById('ofY').value, +document.getElementById('ofZ').value);
    startLoadingProgressive(code);
    document.getElementById('gcode').value = code.replaceAll(' E40', '');
}

document.getElementById('reload').onclick = function(){
    startLoadingProgressive(document.getElementById('gcode').value);
    preview.resize();
}