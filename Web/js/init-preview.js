const topLayerColor = new THREE.Color(`hsl(180, 50%, 50%)`).getHex();
const lastSegmentColor = new THREE.Color(`hsl(270, 50%, 50%)`).getHex();

const settings = JSON.parse(localStorage.getItem('settings'));
var preview;
const chunkSize = 1000;

function init(){  //see documentation
	preview = (window.preview = new GCodePreview.init({
		canvas: document.querySelector('.gcode-previewer'), //canvas of the preview
		topLayerColor: topLayerColor,
		lastSegmentColor: lastSegmentColor,
		buildVolume: settings?.buildVolume || {x: 250, y: 270, z: 0}, //grid size
		initialCameraPosition: [0,400,450],
		allowDragNDrop: false,
		startColor: [20, 20, 20],
		stopColor: [200, 200, 200]
	}));
	
	preview.renderExtrusion = true;
	preview.renderTravel = false;
	
	
	window.addEventListener('resize', function() { //resize preview when window is resized
		preview.resize();
	});
}

export async function startLoadingProgressive(gcode) { //loads g-code chunk by chunk from a string
	let c = 0;
	function loadProgressive() { //loads chunk by chunk
	  const start = c * chunkSize; //start of chunk
	  const end = (c + 1) * chunkSize; //end chunk
	  const chunk = lines.slice(start, end); // gets chunk
	  
	  c++; //updates chunk index
	  if (c < chunks) { //if it is not the last chunk, start animation
		window.__loadTimer__ = requestAnimationFrame(loadProgressive)
	  }
	  else {
		console.log(preview.parser.metadata.thumbnails);
	  }
	  preview.processGCode(chunk); //load a chunk
	}
  
	const lines = gcode.split('\n'); //gets the lines
	console.log('lines', lines.length);
	console.log('chunk size', chunkSize);
	const chunks = lines.length / chunkSize; //determines number of chunks
	console.log('chunks', chunks);
	console.log('loading');
	preview.clear();
	if (window.__loadTimer__) clearTimeout(window.__loadTimer__); //clears timeout of the window load timer
	loadProgressive();
}

init();