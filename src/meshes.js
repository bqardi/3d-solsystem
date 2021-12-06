import * as THREE from "three";
import createManager from "./loadingManager";
import planetSettings from "./planetSettings";

const manager = createManager();
const textureLoader = new THREE.TextureLoader(manager);

export function createLabel(text, offset, scale) {
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");

	const fontSize = 30;
	const space = 40;
	
	canvas.width = 110;
	canvas.height = fontSize * 2 + 40 * scale + space;
	
	ctx.font = fontSize + "px Arial";
	
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = "white";
	ctx.fillText(text, canvas.width / 2, 15);

	var texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;

	var material = new THREE.MeshBasicMaterial({
		transparent: true,
		depthWrite: false,
		map: texture
	});

	var mesh = new THREE.Mesh(new THREE.PlaneGeometry(canvas.width, canvas.height, 10, 10), material);
	mesh.scale.set(0.05, 0.05, 0.05);
	mesh.position.set(offset, 0, 0);

	return mesh;
}

export function orbitSystem(parent, offset=0){
	const orbit = new THREE.Object3D();
	orbit.position.x = offset
	parent.add(orbit);
	return orbit;
}

export function createMaterial(texture, normalMap=null, bumpMap=null, alphaMap=null, specularMap=null, emissive=0x000000){
	const material = new THREE.MeshPhongMaterial({emissive});
	material.map = texture ? textureLoader.load(texture) : null;
	material.normalMap = normalMap ? textureLoader.load(normalMap) : null;
	material.bumpMap = bumpMap ? textureLoader.load(bumpMap) : null;
	material.transparent = !!alphaMap;
	material.alphaMap = alphaMap ? textureLoader.load(alphaMap) : null;
	material.specularMap = specularMap ? textureLoader.load(specularMap) : null;
	return material;
}

export function createPlanet(material, scale, offset=0){
	const sphereSegments = 64;
	const sphereGeometry = new THREE.SphereGeometry(1, sphereSegments, sphereSegments);
	const mesh = new THREE.Mesh(sphereGeometry, material);
	mesh.scale.set(scale, scale, scale);
	mesh.position.x = offset;
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	return mesh;
}

export function createFullPlanet(name, orbitObject, orbitObjectOffset=0){
	const {data, scale, offset, texture, normalMap, bumpMap, alphaMap, specularMap, emissive} = planetSettings[name];

	const orbit = orbitSystem(orbitObject, orbitObjectOffset);
	const material = createMaterial(texture, normalMap, bumpMap, alphaMap, specularMap, emissive);
	const mesh = createPlanet(material, scale, offset);
	mesh.name = {id: name, label: data.name};
	orbit.add(mesh);

	const text = createLabel(data.name, offset, scale);
	orbit.add(text);

	return {orbit, mesh, text, name};
}

export function createSkybox(texture){
  const material = createMaterial(texture);
  material.side = THREE.BackSide;
  const skybox = createPlanet(material, 500);
  return skybox;
}

export function createCircle(texture, radius, segments){
	const circleMaterial = createMaterial(texture);
  circleMaterial.side = THREE.DoubleSide;
	circleMaterial.transparent = true;
  const circleGeometry = new THREE.CircleGeometry(radius, segments);
  return new THREE.Mesh(circleGeometry, circleMaterial);
}

export default manager;