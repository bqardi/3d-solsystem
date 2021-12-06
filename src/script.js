import "./style.css";
import * as THREE from "three";
import planetSettings from "./planetSettings";
import {cameraProximityToPlanet, getPlanetPosition, lerp, lerpV3} from "./helper";
import {initUI} from "./ui";

import createLights from "./lights";
import createCamera, { createOrbitControls } from "./camera";
import createPostProcessing from "./postProcessing";
import { animateCamera, onStopAnimation, setClearAnimationEvent } from "./animation";
import init from "./initialization";
import addPlanetClickEvent, { raycast } from "./raycast";
import { hidePlanetinfo, showPlanetinfo } from "./ui-planetinfo";

(function() {
  const {manager, renderer, webgl, scene, planets, resetPlanetsMaterial, earth, sizes} = init();

  const cameraPos = {
    x: earth.mesh.position.x + 2.0,
    y: earth.mesh.position.y + 2.5,
    z: earth.mesh.position.z - 0.35
  }

  var orbitSpeed = .000005;
  var rotationSpeed = .0025;
  var speedFactor = 0.001;
  const finalSpeedFactor = 0.32;
  var newSpeedFactor = speedFactor;

  initUI(finalSpeedFactor, onSlider, onToggle);

  const camera = createCamera(sizes, cameraPos);
  const controls = createOrbitControls(camera, webgl);

  createLights(scene);
  
  onStopAnimation(onAnimationFinished);
  setClearAnimationEvent(controls, onAnimationFinished);

  window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(window.devicePixelRatio);
  });
  
  var prevTime = 0;
  var displayText = false;
  var displayTextOverride = false;
  var textOpacity = 0;
  var isAnimating = true;
  var selectedPlanet = null;
  var usingControls = false;
  
  function onAnimationFinished(){
    newSpeedFactor = finalSpeedFactor;
    displayText = true;
    isAnimating = false;

    controls.addEventListener("change", () => {
      usingControls = true;
      translateCamera = false;
    });
    controls.addEventListener("end", () => setTimeout(() => usingControls = false));
    
    addPlanetClickEvent(renderer, planets, camera, planet => {
      if (usingControls) {
        usingControls = false;
        return;
      }
      hidePlanetinfo();
      if (planet === undefined) {
        selectedPlanet = null;
        return;
      };
      selectedPlanet = planet;
      translateCamera = true;
    });
  }

  function onSlider(value){
    newSpeedFactor = value;
  }
  function onToggle(value){
    displayTextOverride = true;
    planets.forEach(planet => {
      planet.text.material.opacity = value ? 1 : 0;
      planet.text.matrixWorldNeedsUpdates;
    });
  }

  const composer = createPostProcessing(renderer, scene, camera);
  var translateCamera = false;
  var translateLerp = 0;
  var lookPos = new THREE.Vector3(0, 0, 0);

  function render(currTime) {
    if (manager.isLoading) {
      requestAnimationFrame(render);
      return;
    };
    speedFactor = lerp(speedFactor, newSpeedFactor, 0.05);
    const time = (currTime - prevTime) * speedFactor;
    prevTime = currTime;
    if (!isAnimating) {
      resetPlanetsMaterial();
      raycast(planets, camera, planet => {
        if (planet === undefined) return;
        const planetObj = planets.find(item => item.name === planet.object.name.id);
        planetObj.mesh.material.transparent = true;
        planetObj.mesh.material.opacity = 0.75;
      });
      if (selectedPlanet !== null) {
        var pos = getPlanetPosition(selectedPlanet);
        const planetSetting = planetSettings[selectedPlanet.object.name.id]
        const offset = planetSetting.scale * 4;
        const proximity = cameraProximityToPlanet(camera, pos, offset);
        if (proximity === 0) {
          translateCamera = false;
          translateLerp = 0;
          showPlanetinfo(planetSetting.data);
        } else if (translateCamera) {
          translateLerp = lerp(translateLerp, 3, 0.01);
          camera.translateZ(translateLerp * proximity);
        }
        lookPos = lerpV3(lookPos, pos, 0.1);
        camera.lookAt(lookPos);
        controls.target = lookPos;
      }
    }
    animateCamera(currTime, camera, cameraPos, earth.mesh.position, () => {
      isAnimating = false;
      controls.update();
    });
    planets.forEach(planet => {
      if (!displayTextOverride && displayText) {
        textOpacity = lerp(textOpacity, 1, 0.001);
        planet.text.material.opacity = textOpacity;
      }
      planet.text.up = camera.up;
      planet.text.lookAt(camera.position);
      planet.mesh.rotation.y += (time * rotationSpeed * planetSettings[planet.name].speed.rotation);
      planet.orbit.rotation.y += (time * orbitSpeed * planetSettings[planet.name].speed.orbit);
    });

    if (!displayTextOverride && textOpacity > 0.95) {
      displayText = false;
      textOpacity = 1;
    }

    composer.render();
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();