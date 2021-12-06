const range = document.getElementById("slider");
const slider = document.querySelector(".slider");
const helptext = document.querySelector(".helptext");
const speedAmount = document.querySelector(".slider__value");
const toggle = document.getElementById("toggle");

var usersSliderFnc;
var usersToggleFnc;

range.addEventListener("input", e => {
	const {value} = e.target;
	const floatValue = parseFloat(value);
	var finalValue = rootedValue(floatValue);
	setSpeedAmount(finalValue);
	usersSliderFnc(finalValue);
});
toggle.addEventListener("input", e => {
	usersToggleFnc(e.target.checked);
});

function initUI(startValue, sliderFnc, toggleFnc) {
	range.value = 10;
	setSpeedAmount(startValue);
	usersSliderFnc = sliderFnc;
	usersToggleFnc = toggleFnc;
}
function setSpeedAmount(amount){
	speedAmount.textContent = amount.toFixed(2);
}
function showSlider(){
	if (slider.classList.contains("slider--show")) return;
	slider.classList.add("slider--show");
}
function showHelptext(){
	if (helptext.classList.contains("helptext--show")) return;
	helptext.classList.add("helptext--show");
}

function rootedValue(value){
	return Math.sqrt(value / 100) * value / 10;
}

export {
	initUI,
	showSlider,
	showHelptext
};