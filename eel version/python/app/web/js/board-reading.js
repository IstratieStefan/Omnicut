/*let mainOutput = "", secondOutput = "", advance = false;

function readFromMainBoard(){
    eel.evalGcode(['?']);
    eel.readData()().then(obj => {
        if (obj != ""){
            mainOutput += obj;
            if (mainOutput.includes('\r\n')){
                mainOutput = mainOutput.split('\r\n');
                for (let i = 0; i < mainOutput.length-1; i++){
                    if (mainOutput[i][0] != '<'){
                        if (mainOutput[i].includes('ok')){
                            advance = true;
                        } else {
                            document.getElementById('commandHistory').value += mainOutput[i] + '\n';
                        }
                    } else {
                        mainOutput[i] = mainOutput[i].split(':')[1].split(',');
                        document.getElementById('Xval').innerHTML = mainOutput[i][0];
                        document.getElementById('Yval').innerHTML = mainOutput[i][1];
                        document.getElementById('Zval').innerHTML = mainOutput[i][2];
                    }
                }
                mainOutput = mainOutput[mainOutput.length-1];
            }
        }
        setTimeout(readFromMainBoard, 100);
    });
}

function readFromSecondBoard(){

    setTimeout(readFromSecondBoard, 2000);
}

setTimeout(readFromMainBoard, 100);
setTimeout(readFromSecondBoard, 2000);

eel.expose(mayAdvance);
function mayAdvance(){
    return advance;
}*/

let mainOutput = "", secondOutput = "", advance = false;

function readFromSecondBoard(){
    eel.readData()().then(obj => {
        secondOutput += obj;
        console.log(obj);
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
        
        setTimeout(readFromSecondBoard, 500);
    });
}

setTimeout(readFromSecondBoard, 500);