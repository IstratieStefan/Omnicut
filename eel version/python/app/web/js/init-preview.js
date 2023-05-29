const topLayerColor = new THREE.Color(`hsl(180, 50%, 50%)`).getHex();
const lastSegmentColor = new THREE.Color(`hsl(270, 50%, 50%)`).getHex();

const settings = JSON.parse(localStorage.getItem('settings'));

const chunkSize = 1000;

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

export function startLoadingProgressive(gcode) {
	let c = 0;
	function loadProgressive() {
	  const start = c * chunkSize;
	  const end = (c + 1) * chunkSize;
	  const chunk = lines.slice(start, end);
	  
	  c++;
	  if (c < chunks) {
		window.__loadTimer__ = requestAnimationFrame(loadProgressive)
	  }
	  else {
		console.log(preview.parser.metadata.thumbnails);
	  }
	  preview.processGCode(chunk);
	}
  
	const lines = gcode.split('\n');
	console.log('lines', lines.length);
	console.log('chunk size', chunkSize);
	const chunks = lines.length / chunkSize;
	console.log('chunks', chunks);
	console.log('loading');
	preview.clear();
	if (window.__loadTimer__) clearTimeout(window.__loadTimer__);
	loadProgressive();
}