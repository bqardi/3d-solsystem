import * as THREE from "three";

export default function createLights(scene){
	const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
	scene.add(ambientLight);
	
	const sunLight = new THREE.PointLight(0xffee88, 1.5, 400, 5);
	scene.add(sunLight);
}