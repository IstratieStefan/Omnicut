let vent = document.getElementById('ventMode'), spindle = document.getElementById('spindleMode');

eel.expose(updateValues);
function updateValues(message){
    document.getElementById('topTemp').innerHTML = message[0] + ' °C';
    document.getElementById('bottomTemp').innerHTML = message[1] + ' °C';
    document.getElementById('topHum').innerHTML = message[2] + ' %';
    document.getElementById('bottomHum').innerHTML = message[3] + ' %';
}