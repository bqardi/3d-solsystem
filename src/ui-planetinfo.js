const planetinfo = document.querySelector(".planetinfo");

export function showPlanetinfo(planetData){
	["name", "radius", "rotation", "orbit"].forEach(id => {
		const item = document.getElementById("planet-" + id);
		item.textContent = planetData[id].toLocaleString();
	});
	planetinfo.classList.add("planetinfo--display");
}
export function hidePlanetinfo(){
	planetinfo.classList.remove("planetinfo--display");
}