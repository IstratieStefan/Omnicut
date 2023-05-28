ta = document.getElementById('gcode');

eel.expose(updateValues);
function updateValues(values){
	document.getElementById('topTemp').innerHTML = values[4] + " °C";
	document.getElementById('bottomTemp').innerHTML = values[5] + " °C";
	document.getElementById('topHum').innerHTML = values[6] + " %";
	document.getElementById('bottomHum').innerHTML = values[7] + " %";
}

eel.expose(mainBoardFound);
function mainBoardFound(){
    document.getElementById('displayer1').style.display = 'flex';
	document.getElementById('connect2').style.display = 'none';
}

eel.expose(secondBoardFound);
function secondBoardFound(){
    document.getElementById('displayer2').style.display = 'flex';
	document.getElementById('connect1').style.display = 'none';
}

eel.expose(mainBoardDisconnected);
function mainBoardDisconnected(){
    document.getElementById('displayer1').style.display = 'none';
	document.getElementById('connect2').style.display = 'flex';
}

eel.expose(secondBoardDisconnected);
function secondBoardDisconnected(){
	document.getElementById('displayer2').style.display = 'none';
	document.getElementById('connect1').style.display = 'flex';
}

eel.expose(sendGcodeFeedback);
function sendGcodeFeedback(msg){
	ta.value += msg + '\n';
}