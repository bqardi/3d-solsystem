import { lerp } from "./helper";
import { showHelptext, showSlider } from "./ui";

const animationDelay = 8000;
var isAnimating = true;
var timing = 0.00001;

var timeout;

function onStopAnimation(callback){
	timeout = setTimeout(() => {
		showSlider();
		showHelptext();
		callback();
	}, animationDelay + 20000);
}

function animateCamera(currTime, camera, cameraPos, earthPos, onStopAnimating){
	if (!isAnimating || currTime < animationDelay) return;

	const xOffset = earthPos.x + 100;

	if (cameraPos.x >= xOffset - 1) {
		isAnimating = false;
		onStopAnimating();
		return;
	}

	cameraPos.x = lerp(cameraPos.x, xOffset, timing);
	cameraPos.y = lerp(cameraPos.y, earthPos.y + 70.0, timing);
	cameraPos.z = lerp(cameraPos.z, earthPos.z + 90.0, timing);

	if (currTime > animationDelay + 10000) {
		timing = lerp(timing, 0.005, 0.0005);
	}
	
	camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
	camera.lookAt(0, 0, 0);
}

function setClearAnimationEvent(controls, callback){
	function controlsEvent(){
		isAnimating = false;
		showSlider();
		showHelptext();
		clearTimeout(timeout);
		callback();
		controls.removeEventListener("change", controlsEvent);
	}
	controls.addEventListener("change", controlsEvent);
}

export {
	onStopAnimation,
	animateCamera,
	setClearAnimationEvent,
}