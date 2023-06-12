import * as ot from "https://unpkg.com/opentype.js/dist/opentype.module.js";

var buffer, font;

document.getElementById('openFont').onchange = function (){
    buffer = document.getElementById('openFont').files[0].arrayBuffer();

    buffer.then(data => {
        font = ot.parse(data);
        let d = "";
        let path = font.getPath("Isti simps Dani V", 0, 0, 72, {}).commands;
        console.log(path);
        for (let i = 0; i < path.length; i++){
            let data = Object.values(path[i]);
            console.log(data);
            for (let j = 0; j < data.length; j++){
                d += data[j] + ' ';
            }
        }

        path = font.getPath("And eats kids", 0, 100, 72, {}).commands;
        console.log(path);
        for (let i = 0; i < path.length; i++){
            let data = Object.values(path[i]);
            console.log(data);
            for (let j = 0; j < data.length; j++){
                d += data[j] + ' ';
            }
        }
        console.log(d);
    });
}

document.getElementById('write').onclick = function(){
    let texts = document.getElementById('writeArea').value.split('<format:').splice(1);
    for (let i = 0; i < texts.length; i++){
        console.log(texts[i]);
    }
}