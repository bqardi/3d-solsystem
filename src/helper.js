import * as THREE from "three";
import planetSettings from "./planetSettings";

export function lerp(start, end, t) {
	return (1 - t) * start + t * end;
}

export function lerpV3(start, end, t){
	const x = lerp(start.x, end.x, t);
	const y = lerp(start.y, end.y, t);
	const z = lerp(start.z, end.z, t);
	return new THREE.Vector3(x, y, z);
}

export function compareV3(a, b){
	if (a.x !== b.x) return false; 
	if (a.y !== b.y) return false; 
	if (a.z !== b.z) return false;
	return true; 
}

export function getPlanetPosition(planet){
	return new THREE.Vector3().setFromMatrixPosition(planet.object.matrixWorld);
}

export function cameraProximityToPlanet(camera, planetPosition, offset){
	const distance = camera.position.distanceTo(planetPosition);
	if (distance > offset + 1) {
		return -1;
	} else if (distance < offset - 1) {
		return 1;
	}
	return 0;
}