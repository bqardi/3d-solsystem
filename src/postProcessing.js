import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default function createPostProcessing(renderer, scene, camera){
	const composer = new EffectComposer(renderer);
  
  const renderPass = new RenderPass(scene, camera);
  composer.addPass( renderPass );

  const bloomPass = new UnrealBloomPass({x: 1024, y: 1024}, 0.5, 2, 0);
  composer.addPass( bloomPass );

	return composer;
}