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

async function findBoards() {
	await eel.connectBoards("", "")().then(async firstBoard => {
		if (firstBoard[1] == "main"){
			mainPort = firstBoard[0];
			await eel.connectBoards(firstBoard[0], "")().then(secondBoard => {
				secondaryPort = secondBoard[0];
			});
		} else {
			secondaryPort = firstBoard[0];
			console.log(firstBoard);
			await eel.connectBoards("", firstBoard[0])().then(secondBoard => {
				mainPort = secondBoard[0];
			});
		}
	});

	console.log(typeof a);
}

findBoards();