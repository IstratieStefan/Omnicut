let controllerIndex = null;
let leftPressed = 0;
let ok1 = 0, ok2 = 0, ok3 = 0, ok4 = 0, ok5 = 0, ok6 = 0, ok7 = 0, ok8 = 0;

window.addEventListener('gamepadconnected', function(e){
    controllerIndex = e.gamepad.index;
});

window.addEventListener('gamepaddisconnected', function(e){
    controllerIndex = null;
});

step = document.getElementById('stepSize');

function readControlls(){
    if (controllerIndex != null){
        let gp = navigator.getGamepads()[controllerIndex];
        if (gp.buttons[12].pressed){
            if (!ok1){
                if (step.value == ""){
                    step.value = 5;
                }
                eel.evalGcode(["G91", `G0 X0 Y${+step.value} Z0`, "G90"]);
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
                eel.evalGcode(["G91", `G0 X0 Y${-step.value} Z0`, "G90"]);
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
                eel.evalGcode(["G91", `G0 X${-step.value} Y0 Z0`, "G90"]);
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
                eel.evalGcode(["G91", `G0 X${+step.value} Y0 Z0`, "G90"]);
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
                eel.evalGcode(["G91", `G0 X0 Y0 Z${-step.value}`, "G90"]);
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
                eel.evalGcode(["G91", `G0 X0 Y0 Z${+step.value}`, "G90"]);
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
                eel.evalGcode([`G0 X0 Y0 Z0`]);
                ok9 = 1;
            }
        } else {
            ok9 = 0;
        }

        if (gp.buttons[9].pressed){
            if (!ok10){
                eel.evalGcode([`G92 X0 Y0 Z0`]);
                ok10 = 1;
            }
        } else {
            ok10 = 0;
        }
    }
    setTimeout(readControlls, 50);
}

setTimeout(readControlls, 50);