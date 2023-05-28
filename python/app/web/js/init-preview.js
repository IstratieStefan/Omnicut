const topLayerColor = new THREE.Color(`hsl(180, 50%, 50%)`).getHex();
const lastSegmentColor = new THREE.Color(`hsl(270, 50%, 50%)`).getHex();

const settings = JSON.parse(localStorage.getItem('settings'));

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


window.addEventListener('resize', function() {
	preview.resize();
});