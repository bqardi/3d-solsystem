import * as THREE from "three";
import planetSettings from "./planetSettings";
import manager, {createSkybox, createFullPlanet, createCircle} from "./meshes";

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

export default function init(){
	const webgl = document.querySelector(".webgl");
  const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  const scene = new THREE.Scene();
  
  webgl.appendChild(renderer.domElement);

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const skybox = createSkybox("./textures/universe.jpg");
  skybox.rotation.y = 2.8;
  scene.add(skybox);

  const earth = createFullPlanet("earth", scene);
  const saturn = createFullPlanet("saturn", scene);
  
  earth.orbit.rotation.y = planetSettings.earth.startYPos;

  const saturnRing = createCircle("./textures/saturn_ring_alpha.png", 2.2, 64);
  saturnRing.rotation.set(Math.PI / 2, 0, 0);
  saturn.mesh.add(saturnRing);
  
  const planets = [
    createFullPlanet("sun", scene),
    createFullPlanet("mercury", scene),
    createFullPlanet("venus", scene),
    earth,
    createFullPlanet("moon", earth.orbit, planetSettings.earth.offset),
    createFullPlanet("mars", scene),
    createFullPlanet("jupiter", scene),
    saturn,
    createFullPlanet("uranus", scene),
    createFullPlanet("neptune", scene),
  ];

  planets.forEach(planet => {
    planet.orbit.rotation.y = planetSettings[planet.name].startYPos;
    planet.text.material.opacity = 0;
  });

	function resetPlanetsMaterial(){
		planets.forEach(planet => {
			planet.mesh.material.transparent = false;
			planet.mesh.material.opacity = 1;
		})
	}

	return {
		renderer,
		webgl,
		scene,
		planets,
		resetPlanetsMaterial,
		earth,
		sizes,
    manager
	}
}