import * as THREE from "three";

var raycaster;
const mouse = {x: 0, y: 0};

raycaster = new THREE.Raycaster();

export default function addPlanetClickEvent(renderer, scene, camera, callback){
	renderer.domElement.addEventListener("click", () => {
		raycast(scene, camera, callback);
	}, false);
}

window.addEventListener("mousemove", e => {
	mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

export function raycast(planets, camera, callback) {
	raycaster.setFromCamera(mouse, camera);

	const planetArray = planets.map(planet => planet.mesh.name && planet.mesh);

	var intersects = raycaster.intersectObjects(planetArray);

	const closest = intersects.sort((a, b) => a.distance - b.distance)[0];
	callback(closest);
}