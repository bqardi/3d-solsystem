const loading = document.querySelector(".loading");
const loadingMetre = document.querySelector(".loading__metre");
const loadingProgress = document.querySelector(".loading__progress");

export function onFinishedLoading(){
	// loading.classList.remove("loading--progress");
}

export function onProgress(url, itemsLoaded, itemsTotal) {
	loadingMetre.style.width = itemsLoaded / itemsTotal * 100 + "%";
	loadingProgress.textContent = "Loading: " + url;
	console.log("Loading file: " + url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + " files.");
}