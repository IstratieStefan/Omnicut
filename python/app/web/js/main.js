const cnv = document.querySelector('.gcode-previewer');
const chunkSize = 1000;
const topLayerColor = new THREE.Color(`hsl(180, 50%, 50%)`).getHex();
const lastSegmentColor = new THREE.Color(`hsl(270, 50%, 50%)`).getHex();

function initDemo() {
	const settings = JSON.parse(localStorage.getItem('settings'));
	console.log('settings', settings);
	
	const preview = (window.preview = new GCodePreview.init({
		canvas: document.querySelector('.gcode-previewer'),
		topLayerColor: topLayerColor,
		lastSegmentColor: lastSegmentColor,
		buildVolume: settings?.buildVolume || {x: 150, y: 150, z: 150},
		initialCameraPosition: [0,400,450],
		allowDragNDrop: true,
		startColor: [20, 20, 20],
		stopColor: [200, 200, 200]
	}));

	preview.renderExtrusion = true;
	preview.renderTravel = false;
}

window.addEventListener('resize', function() {
	preview.resize();
});

var mainPort = "", secondaryPort = "";

function foundMain(){
	document.getElementById('displayer1').style.display = 'flex';
	document.getElementById('connect2').style.display = 'none';
}

function foundSecondary(){
	console.log(0987654321234567876543)
	document.getElementById('displayer2').style.display = 'flex';
	document.getElementById('connect1').style.display = 'none';
}

async function findBoards() {
	await eel.connectBoards("", "")().then(async firstBoard => {
		console.log(firstBoard);
		if (firstBoard[1] == "main"){
			console.log(35824);
			mainPort = firstBoard[0];
			foundMain();
			await eel.connectBoards(firstBoard[0], "")().then(secondBoard => {
				secondaryPort = secondBoard[0];
				console.log(secondBoard);
				foundSecondary();
			});
		} else {
			console.log(6969420);
			secondaryPort = firstBoard[0];
			foundSecondary();
			await eel.connectBoards("", firstBoard[0])().then(secondBoard => {
				mainPort = secondBoard[0];
				console.log(secondBoard);
				foundMain();
			});
		}
		console.log(firstBoard);
	});
}

findBoards();

eel.expose(updateValues);
function updateValues(values){
	document.getElementById('topTemp').innerHTML = values[4] + " °C";
	document.getElementById('bottomTemp').innerHTML = values[5] + " °C";
	document.getElementById('topHum').innerHTML = values[6] + " %";
	document.getElementById('bottomHum').innerHTML = values[7] + " %";
}