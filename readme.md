# Solsystem i 3D
Dette er mit første forsøg på en 3D web-applikation, lavet i ren `html`, `css` og `javascript` med `three.js` biblioteket til 3D modellerne (spheres som planeter), belysning, 3d-animation, mm.

## Interaktivitet

Den er interaktiv med en range-slider til at kontrollere hastigheden på planeternes rotation/omløb, samt mulighed for at vise/skjule planetnavnene.

Med `three.js' OrbitControls` har jeg tilføjet muligheden for at styre kameraet rundt i scenen (zoom, orbit, pan).

Klik på en planet for at zoom'e til den og se detaljer omkring planeten.

## Referencer

De smukke textures har jeg fået fra https://www.solarsystemscope.com/textures/

Nedenfor er det originale indhold af readme filen fra starter sættet i en tutorial af [DesignCourse - Getting Started with THREE.JS in 2021!](https://www.youtube.com/watch?v=pUgWfqWZWmM):

### Three.js Starter
Courtesy of Bruno Simon of https://threejs-journey.xyz/

#### Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```
