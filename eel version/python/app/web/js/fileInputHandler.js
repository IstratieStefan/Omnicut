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
                    let code = convert2Gcode(evt.target.result, +document.getElementById('precision').value, +document.getElementById('multiplier').value);
                    startLoadingProgressive(code);
                    document.getElementById('gcode').value = code;
                } else {
                    alert("You must fill in the precision and the multiplier to submit an SVG file.")
                }
            }  
        } else {
            reader.onload = function (evt) {
                startLoadingProgressive(evt.target.result);
                document.getElementById('gcode').value = evt.target.result;
            }   
        }
        reader.onerror = function () {
            console.log("Error while reading file");
        }
	}
}