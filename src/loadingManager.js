import * as THREE from "three";
import {onFinishedLoading, onProgress} from "./ui-loading";

function createManager(){
	const manager = new THREE.LoadingManager();
	manager.onStart = onStart;
	manager.onProgress = onProgress;
	manager.onLoad = function(){
		manager.isLoading = false;
		onFinishedLoading();
	};
	manager.isLoading = true;
	return manager;
}

function onStart( url, itemsLoaded, itemsTotal ) {
	console.log("Started loading file: " + url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + " files.");
}

export default createManager;