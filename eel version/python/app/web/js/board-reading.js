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