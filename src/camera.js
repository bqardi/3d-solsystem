import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function createCamera(sizes, position){
	const fov = 40;
	const aspect = sizes.width / sizes.height;
	const near = 0.1;
	const far = 1000;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.up.set(0, 1, 0);
	camera.lookAt(0, 0, 0);
  camera.position.set(position.x, position.y, position.z);
	return camera;
}

export function createOrbitControls(camera, webgl){
	const controls = new OrbitControls(camera, webgl);
  controls.minDistance = 10;
  controls.maxDistance = 250;
  controls.zoomSpeed = 2
  controls.enabled = true;
  controls.update();
	return controls;
}