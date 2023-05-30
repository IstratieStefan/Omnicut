let ta = document.getElementById('gcode');
let cl = document.getElementById('commandLine');
let ch = document.getElementById('commandHistory');
step = document.getElementById('stepSize');

document.getElementById('up').onclick = function(){
	eel.evalGcode(["G91", `G0 X0 Y0 Z${+step.value}`, "G90"]);
}

document.getElementById('down').onclick = function(){
	eel.evalGcode(["G91", `G0 X0 Y0 Z${-step.value}`, "G90"]);
}

document.getElementById('forward').onclick = function(){
	eel.evalGcode(["G91", `G0 X${-step.value} Y0 Z0`, "G90"]);
}

document.getElementById('backward').onclick = function(){
	eel.evalGcode(["G91", `G0 X${+step.value} Y0 Z0`, "G90"]);
}

document.getElementById('left').onclick = function(){
	eel.evalGcode(["G91", `G0 X0 Y${+step.value} Z0`, "G90"]);
}

document.getElementById('right').onclick = function(){
	eel.evalGcode(["G91", `G0 X0 Y${-step.value} Z0`, "G90"]);
}

document.getElementById('center').onclick = function(){
	eel.evalGcode([`G0 X0 Y0 Z0`]);
}

document.getElementById('reset').onclick = function(){
	eel.evalGcode([`G92 X0 Y0 Z0`]);
}

cl.onkeyup = function(e){
	if (e.key === "Enter" && cl.value != ""){
		if (cl.value == '*'){
			ch.value = '';
		} else {
			ch.value += `>>> ${cl.value}\n`;
			ch.scrollTop = ch.scrollHeight;
			eel.evalGcode([cl.value]);
		}
		cl.value = '';
	}
}

eel.expose(updateValues);
function updateValues(values){
	document.getElementById('topTemp').innerHTML = values[4] + " °C";
	document.getElementById('bottomTemp').innerHTML = values[5] + " °C";
	document.getElementById('topHum').innerHTML = values[6] + " %";
	document.getElementById('bottomHum').innerHTML = values[7] + " %";
}

eel.expose(sendGcodeFeedback);
function sendGcodeFeedback(msg){
	ch.value += msg + '\n';
}