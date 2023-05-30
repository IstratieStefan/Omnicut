let mainOutput = "", secondOutput = "";

function readFromMainBoard(){
    eel.readData()().then(obj => {
        if (obj != ""){
            mainOutput += obj;
            if (mainOutput.includes('\r\n')){
                mainOutput = mainOutput.split('\r\n');
                for (let i = 0; i < mainOutput.length-1; i++){
                    if (mainOutput[i][0] != '<'){
                        document.getElementById('commandHistory').value += mainOutput[i] + '\n';
                    } else {
                        console.log(mainOutput[i]);
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