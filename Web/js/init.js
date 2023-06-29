import { refresh } from "./fileInputHandler.js";

setTimeout(function() {
    document.getElementById('loading-screen').style.display = 'none';
}, 4500);

setTimeout(function() {
    document.getElementById('main-window').style.transform = 'translateY(-100%)';
    setTimeout(function(){
        document.getElementById('main-window').style.transitionDuration = '0s';
        document.getElementById('loadSlow').style.opacity = '100%';
        preview.resize();
    }, 1000);
}, 5000);

var headerMode = 1, areaMode = 1, volX = 50, volY = 50, volZ = 0;

document.getElementById('menu').onclick = function(){
    switch (headerMode){
        case 0:
            document.getElementById('menu').src = "./Assets/analytics_FILL0_wght700_GRAD200_opsz48.svg";
            document.getElementById('textEditor').style.display = 'none';
            document.getElementById('displayer2').style.display = 'flex';
            break;
        
        case 1:
            document.getElementById('menu').src = "./Assets/build_FILL0_wght700_GRAD200_opsz48.svg";
            document.getElementById('settings').style.display = 'flex';
            document.getElementById('displayer2').style.display = 'none';
            break;

        case 2:
            document.getElementById('menu').src = "./Assets/font_download_FILL0_wght700_GRAD200_opsz48.svg";
            document.getElementById('textEditor').style.display = 'flex';
            document.getElementById('settings').style.display = 'none';
            break;
    }
    headerMode = (headerMode+1)%3;
}

document.getElementById('areaSize').onclick = function(){
    switch (areaMode){
        case 0:
            document.getElementById('areaSize').src = "./Assets/crop_square_FILL0_wght700_GRAD200_opsz48.svg";
            volX = +document.getElementById('volX').value;
            volY = +document.getElementById('volY').value;
            volZ = +document.getElementById('volZ').value;
            preview.buildVolume = {x: 250, y: 270, z: 0};
            document.getElementById('volX').disabled = true;
            document.getElementById('volY').disabled = true;
            document.getElementById('volZ').disabled = true;
            document.getElementById('volX').value = 250;
            document.getElementById('volY').value = 270;
            document.getElementById('volZ').value = 0;
            break;
        
        case 1:
            document.getElementById('areaSize').src = "./Assets/note_FILL0_wght700_GRAD200_opsz48.svg";
            preview.buildVolume = {x: 175, y: 262, z: 0};
            document.getElementById('volX').value = 175;
            document.getElementById('volY').value = 262;
            document.getElementById('volZ').value = 0;
            break;

        case 2:
            document.getElementById('volX').value = volX;
            document.getElementById('volY').value = volY;
            document.getElementById('volZ').value = volZ;
            preview.buildVolume = {x:+document.getElementById('volX').value, y: +document.getElementById('volY').value, z: +document.getElementById('volZ').value};
            document.getElementById('areaSize').src = "./Assets/tune_FILL0_wght700_GRAD200_opsz48.svg";
            document.getElementById('volX').disabled = false;
            document.getElementById('volY').disabled = false;
            document.getElementById('volZ').disabled = false;
            break;
    }
    refresh();
    preview.resize();
    areaMode = (areaMode+1)%3;
}

document.getElementById('volX').onchange = editVolume;
document.getElementById('volY').onchange = editVolume;
document.getElementById('volZ').onchange = editVolume;

document.getElementById('volX').onkeyup = editVolume;
document.getElementById('volY').onkeyup = editVolume;
document.getElementById('volZ').onkeyup = editVolume;

function editVolume(){
    preview.buildVolume = {x: +document.getElementById('volX').value, y: +document.getElementById('volY').value, z: +document.getElementById('volZ').value};
    refresh();
    preview.resize();
}

refresh();
preview.resize();

//test