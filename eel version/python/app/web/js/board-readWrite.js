let mainOutput = "", secondOutput = "", prevGRBL = "Grbl 0.9j ['$' for help]", commands = [], index = 0, milling = false, lower = 0;

let ta = document.getElementById('gcode');
let cl = document.getElementById('commandLine');
let ch = document.getElementById('commandHistory');
let step = document.getElementById('stepSize');

let limits = true;

function readFromSecondBoard(){
    eel.readData()().then(obj => {
        secondOutput += obj;
        if (secondOutput.includes('\n')){
            secondOutput = secondOutput.split('\n');
            let data = secondOutput[secondOutput.length-2].split(' ');
            document.getElementById('topTemp').innerHTML = data[3] + " °C";
            document.getElementById('bottomTemp').innerHTML = data[4] + " °C";
            document.getElementById('topHum').innerHTML = data[5] + " %";
            document.getElementById('bottomHum').innerHTML = data[6] + " %";
            document.getElementById('fan').innerHTML = Math.floor(data[7]*100/255) + " %";
            document.getElementById('spindle').innerHTML = Math.floor(data[8]*100/255) + " %";
            secondOutput = secondOutput[secondOutput.length-1];
        }
        
        setTimeout(readFromSecondBoard, 1000);
    });
}

function readFromMainBoard(){
    eel.readGRBL()().then(obj => {
        mainOutput += obj;
        if (mainOutput.includes('\n')){
            mainOutput = mainOutput.split('\n');
            let len = mainOutput.length-1;
            for (let i = 0; i < len; i++){
                if (mainOutput[i][0] == '<'){
                    let data = mainOutput[i].split(':')[1].split(',');
                    document.getElementById('Xval').innerHTML = data[0];
                    document.getElementById('Yval').innerHTML = data[1];
                    document.getElementById('Zval').innerHTML = data[2];
                    if ((data[0] < 0 || data[0] > 250 || data[1] < 0 || data[1] > 270 || data[2]+(+document.getElementById('Tdepth').value) < 0 || data[2] > 69) && limits){
                        commands = [`\x18`];
                        index = 0;
                        evalNext();
                    }
                } else if (mainOutput[i].includes('end')) {
                    if (index < commands.length){
                        document.getElementById('file').value = +document.getElementById('file').value+1;
                        evalNext();
                    } else if (milling) {
                        if (lower < +document.getElementById('Tdepth').value){
                            if (lower+(+document.getElementById('depth').value) >= +document.getElementById('Tdepth').value){
                                lower = +document.getElementById('Tdepth').value;
                            } else {
                                lower += +document.getElementById('depth').value;
                            }
                            index = 0;
                            commands[commands.length-1] = `G0 X0 Y0 Z-${lower}`;
                            evalNext();
                        } else {
                            commands = [`G0 X0 Y0 Z0`];
                            index = 0;
                            milling = false;
                            document.getElementById('file').value = 0;
                            lower = 0;
                            evalNext();
                        }
                    }
                } else if (!mainOutput[i].includes('ok')){
                    ch.value += mainOutput[i] + '\n';
                }
            }
            mainOutput = mainOutput[mainOutput.length-1];
        }
        setTimeout(readFromMainBoard, 100);
    });
}

function ask(){
    eel.evalGcode('?');
    setTimeout(ask, 200);
}

document.getElementById('draw').onclick = function(){
    if (limits){
        commands = document.getElementById('gcode').value.split('\n');
        document.getElementById('file').value = 0;
        document.getElementById('file').max = commands.length;
        index = 0;
        evalNext();
    } else {
        alert("Can't draw while limits are turned off!")
    }
    
}

document.getElementById('cut').onclick = function(){
    if (!limits){
        alert("Can't cut while limits are turned off!");
    } else if (+document.getElementById('spindle').innerHTML.replace(' %', '') < 50){
        alert("Spindle speed must be over 50% to cut!")
    } else {
        commands = document.getElementById('gcode').value.split('\n');
        commands.push(`G0 X0 Y0 Z-${lower}`);
        document.getElementById('file').value = 0;
        document.getElementById('file').max = commands.length;
        index = 0;
        milling = true;
        evalNext();
    }
}

function evalNext(){
    document.getElementById('command').innerHTML = commands[index];
    eel.evalGcode(commands[index]);
    do {
        index++;
    } while (commands[index] == "" && index < commands.length);
}

/* old "eel-comunication.js" file starts from here */

document.getElementById('up').onclick = function(){
	if (step.value == ""){
		step.value = 5;
	}
    commands = ["G91", `G0 X0 Y0 Z${+step.value}`, "G90"];
	index = 0;
    evalNext();
}

document.getElementById('down').onclick = function(){
	if (step.value == ""){
		step.value = 5;
	}
    commands = ["G91", `G0 X0 Y0 Z${-step.value}`, "G90"];
	index = 0;
    evalNext();
}

document.getElementById('forward').onclick = function(){
	if (step.value == ""){
		step.value = 5;
	}
    commands = ["G91", `G0 X${-step.value} Y0 Z0`, "G90"];
	index = 0;
    evalNext();
}

document.getElementById('backward').onclick = function(){
	if (step.value == ""){
		step.value = 5;
	}
    commands = ["G91", `G0 X${+step.value} Y0 Z0`, "G90"];
	index = 0;
    evalNext();
}

document.getElementById('left').onclick = function(){
	if (step.value == ""){
		step.value = 5;
	}
    commands = ["G91", `G0 X0 Y${+step.value} Z0`, "G90"];
	index = 0;
    evalNext();
}

document.getElementById('right').onclick = function(){
	if (step.value == ""){
		step.value = 5;
	}
    commands = ["G91", `G0 X0 Y${-step.value} Z0`, "G90"];
	index = 0;
    evalNext();
}

document.getElementById('center').onclick = function(){
    commands = [`G0 X0 Y0 Z0`];
	index = 0;
    evalNext();
}

/*document.getElementById('reset').onclick = function(){
    commands = [`G92 X0 Y0 Z0`];
	index = 0;
    evalNext();
}*/

document.getElementById('stop').onclick = function(){
	commands = [`\x18`];
	index = 0;
    evalNext();
}

document.getElementById('pause').onclick = function(){
	commands = [`!`];
	index = 0;
    evalNext();
}

document.getElementById('resume').onclick = function(){
	commands = [`~`];
	index = 0;
    evalNext();
}

cl.onkeyup = function(e){
	if (e.key === "Enter" && cl.value != ""){
		if (cl.value == '*clear'){
			ch.value = '';
		} else if (cl.value == '*limits'){
            limits = !limits;
            ch.value += `>>> *limits\nLimits set to ${limits}\n`;
        } else {
			ch.value += `>>> ${cl.value}\n`;
			ch.scrollTop = ch.scrollHeight;
			commands = [cl.value];
            index = 0;
            evalNext();
		}
		cl.value = '';
	}
}

eel.expose(sendGcodeFeedback);
function sendGcodeFeedback(msg){
	ch.value += msg + '\n';
}

eel.readSerial();

setTimeout(readFromSecondBoard, 1000);
setTimeout(readFromMainBoard, 100);
setTimeout(ask, 200);