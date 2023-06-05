let mainOutput = "", secondOutput = "", prevGRBL = "Grbl 0.9j ['$' for help]", commands = [], index = 0, milling = false, lower = 0;

let ta = document.getElementById('gcode');
let cl = document.getElementById('commandLine');
let ch = document.getElementById('commandHistory');
let step = document.getElementById('stepSize');

let limits = true;

function readFromSecondBoard(){
    eel.readData()().then(obj => {
        secondOutput += obj; //the global second output gets the new value appended
        if (secondOutput.includes('\n')){ //if a command finished (a '\n' was found), update values
            secondOutput = secondOutput.split('\n');
            let data = secondOutput[secondOutput.length-2].split(' ');
            document.getElementById('topTemp').innerHTML = data[3] + " °C";
            document.getElementById('bottomTemp').innerHTML = data[4] + " °C";
            document.getElementById('topHum').innerHTML = data[5] + " %";
            document.getElementById('bottomHum').innerHTML = data[6] + " %";
            document.getElementById('fan').innerHTML = Math.floor(data[7]*100/255) + " %";
            document.getElementById('spindle').innerHTML = Math.floor(data[8]*100/255) + " %";
            secondOutput = secondOutput[secondOutput.length-1]; // the second output is set to the last unfinished sent output
        }
        
        setTimeout(readFromSecondBoard, 1000); //recall the function in 1000ms
    });
}

function readFromMainBoard(){
    eel.readGRBL()().then(obj => {
        mainOutput += obj; //the global main output gets the new value appended
        if (mainOutput.includes('\n')){ //if a command finished (a '\n' was found), update
            mainOutput = mainOutput.split('\n');
            let len = mainOutput.length-1;
            for (let i = 0; i < len; i++){ //for each command
                if (mainOutput[i][0] == '<'){ //if the output starts with '<', it is a "?" command feedback, so update position
                    let data = mainOutput[i].split(':')[1].split(',');
                    document.getElementById('Xval').innerHTML = data[0];
                    document.getElementById('Yval').innerHTML = data[1];
                    document.getElementById('Zval').innerHTML = data[2];
                    //check if spindle is outside boundaries
                    if ((data[0] < 0 || data[0] > 250 || data[1] < 0 || data[1] > 270 || data[2]+(+document.getElementById('Tdepth').value) < 0 || data[2] > 69) && limits){
                        commands = [`\x18`];
                        index = 0;
                        evalNext();
                    }
                } else if (mainOutput[i].includes('end')) { // G-code command finished; send the next one
                    if (index < commands.length){ // there are still commands to be sent
                        document.getElementById('file').value = +document.getElementById('file').value+1;
                        evalNext();
                    } else if (milling) { //the process finished, however we are milling so we might need to start another cycle
                        if (lower < +document.getElementById('Tdepth').value){ // if spindle is not low enough
                            if (lower+(+document.getElementById('depth').value) >= +document.getElementById('Tdepth').value){
                                lower = +document.getElementById('Tdepth').value;
                            } else {
                                lower += +document.getElementById('depth').value;
                            }
                            index = 0;
                            commands[commands.length-1] = `G0 X0 Y0 Z-${lower}`;
                            evalNext();
                        } else { // action finished; go to start.
                            commands = [`G0 X0 Y0 Z0`];
                            index = 0;
                            milling = false;
                            document.getElementById('file').value = 0;
                            lower = 0;
                            evalNext();
                        }
                    }
                } else if (!mainOutput[i].includes('ok')){ // any other command is given, as long as it is not "ok", will be displayed in command history
                    ch.value += mainOutput[i] + '\n';
                }
            }
            mainOutput = mainOutput[mainOutput.length-1]; // the main output is set to the last unfinished sent output
        }
        setTimeout(readFromMainBoard, 100); //recall the function in 100ms
    });
}

function ask(){ //see documentation
    eel.evalGcode('?');
    setTimeout(ask, 200); //recall the function in 200ms
}

function draw(){ //see documentation
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

function cut(){ //see documentation
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

function evalNext(){ //see documentation
    document.getElementById('command').innerHTML = commands[index];
    eel.evalGcode(commands[index]);
    do {
        index++;
    } while (commands[index] == "" && index < commands.length);
}

/* old "eel-comunication.js" file starts from here */

function up(){ //see documentation
	if (step.value == ""){
		step.value = 5;
	}
    commands = ["G91", `G0 X0 Y0 Z${+step.value}`, "G90"];
	index = 0;
    evalNext();
}

function down(){ //see documentation
	if (step.value == ""){
		step.value = 5;
	}
    commands = ["G91", `G0 X0 Y0 Z${-step.value}`, "G90"];
	index = 0;
    evalNext();
}

function forward(){ //see documentation
	if (step.value == ""){
		step.value = 5;
	}
    commands = ["G91", `G0 X${-step.value} Y0 Z0`, "G90"];
	index = 0;
    evalNext();
}

function backward(){ //see documentation
	if (step.value == ""){
		step.value = 5;
	}
    commands = ["G91", `G0 X${+step.value} Y0 Z0`, "G90"];
	index = 0;
    evalNext();
}

function left(){ //see documentation
	if (step.value == ""){
		step.value = 5;
	}
    commands = ["G91", `G0 X0 Y${+step.value} Z0`, "G90"];
	index = 0;
    evalNext();
}

function right(){ //see documentation
	if (step.value == ""){
		step.value = 5;
	}
    commands = ["G91", `G0 X0 Y${-step.value} Z0`, "G90"];
	index = 0;
    evalNext();
}

function center(){ //see documentation
    commands = [`G0 X0 Y0 Z0`];
	index = 0;
    evalNext();
}

function stopp(){ //see documentation
	commands = [`\x18`];
	index = 0;
    evalNext();
}

function pause(){ //see documentation
	commands = [`!`];
	index = 0;
    evalNext();
}

function resume(){ //see documentation
	commands = [`~`];
	index = 0;
    evalNext();
}

function keyUp(e){
	if (e.key === "Enter" && cl.value != ""){
		if (cl.value == '*clear'){ //if value is *clear, then clears history
			ch.value = '';
		} else if (cl.value == '*limits'){ //if value is *limits, toggles limits
            limits = !limits;
            ch.value += `>>> *limits\nLimits set to ${limits}\n`;
        } else { //otherwise, execute command via GRBL
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
function sendGcodeFeedback(msg){ //see documentation
	ch.value += msg + '\n';
}

let controllerIndex = null;
let leftPressed = 0;
let ok1 = 0, ok2 = 0, ok3 = 0, ok4 = 0, ok5 = 0, ok6 = 0, ok7 = 0, ok8 = 0, ok9 = 0;

function gamepadconnected(e){ //see documentation
    controllerIndex = e.gamepad.index;
}

function gamepaddisconnected(){ //see documentation
    controllerIndex = null;
}

step = document.getElementById('stepSize');

function readControlls(){
    if (controllerIndex != null){ //if a controller was found
        let gp = navigator.getGamepads()[controllerIndex];
        //The next conditions check if all of the following buttons are or aren't being pressed and act accordingly
        if (gp.buttons[12].pressed){
            if (!ok1){
                if (step.value == ""){
                    step.value = 5;
                }
                forward();
                ok1 = 1;
            }
        } else {
            ok1 = 0;
        }
        
        if (gp.buttons[13].pressed){
            if (!ok2){
                if (step.value == ""){
                    step.value = 5;
                }
                backward();
                ok2 = 1;
            }
        } else {
            ok2 = 0;
        }
        
        if (gp.buttons[14].pressed){
            if (!ok3){
                if (step.value == ""){
                    step.value = 5;
                }
                left();
                ok3 = 1;
            }
        } else {
            ok3 = 0;
        }
    
        if (gp.buttons[15].pressed){
            if (!ok4){
                if (step.value == ""){
                    step.value = 5;
                }
                right();
                ok4 = 1;
            }
        } else {
            ok4 = 0;
        }

        if (gp.buttons[0].pressed){
            if (!ok5){
                if (step.value == ""){
                    step.value = 5;
                }
                down();
                ok5 = 1;
            }
        } else {
            ok5 = 0;
        }

        if (gp.buttons[3].pressed){
            if (!ok6){
                if (step.value == ""){
                    step.value = 5;
                }
                up();
                ok6 = 1;
            }
        } else {
            ok6 = 0;
        }

        if (gp.buttons[4].pressed){
            if (!ok7){
                if (step.value == ""){
                    step.value = 5;
                }
                step.value = +step.value - 10**Math.floor(Math.log10(+step.value-1));
                ok7 = 1;
            }
        } else {
            ok7 = 0;
        }

        if (gp.buttons[5].pressed){
            if (!ok8){
                if (step.value == ""){
                    step.value = 5;
                }
                step.value = +step.value + 10**Math.floor(Math.log10(+step.value));
                ok8 = 1;
            }
        } else {
            ok8 = 0;
        }

        if (gp.buttons[8].pressed){
            if (!ok9){
                center();
                ok9 = 1;
            }
        } else {
            ok9 = 0;
        }
    }
    setTimeout(readControlls, 50); //recall the function in 50ms
}

eel.readSerial();

//starting loops for the functions
setTimeout(readFromSecondBoard, 1000);
setTimeout(readFromMainBoard, 100);
setTimeout(ask, 200);
setTimeout(readControlls, 50);

//setting event listeners
document.getElementById('draw').onclick = draw;
document.getElementById('cut').onclick = cut;
document.getElementById('up').onclick = up;
document.getElementById('down').onclick = down;
document.getElementById('forward').onclick = forward;
document.getElementById('backward').onclick = backward;
document.getElementById('left').onclick = left;
document.getElementById('right').onclick = right;
document.getElementById('center').onclick = center;
document.getElementById('stop').onclick = stopp;
document.getElementById('pause').onclick = pause;
document.getElementById('resume').onclick = resume;
cl.onkeyup = keyUp;
window.addEventListener('gamepadconnected', gamepadconnected);
window.addEventListener('gamepaddisconnected', gamepaddisconnected);