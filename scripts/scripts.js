import { setupGround, updateGround } from "./ground.js";
import { setupDino, updateDino } from "./dino.js";

//

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const worldElement = document.querySelector("[data-world]");
const scoreElement = document.querySelector("[data-score]");
const startScreenElement = document.querySelector("[data-start-screen");

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true }); //press any key to start game

//update loop - runs every frame and updates positions of game elements
let lastTime;
let speedScale;
let score;
function update(time) {
	if (lastTime == null) {
		lastTime = time;
		window.requestAnimationFrame(update);
		return;
	}
	const delta = time - lastTime;
	//
	updateGround(delta, speedScale);
	updateDino(delta, speedScale);
	updateSpeedScale(delta);
	updateScore(delta);
	//
	lastTime = time;
	window.requestAnimationFrame(update);
}

function updateSpeedScale(delta) {
	speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
	score += delta * 0.01;
	scoreElement.textContent = Math.floor(score);
}

//start
function handleStart() {
	lastTime = null;
	speedScale = 1;
	score = 0;
	setupGround();
	setupDino();
	startScreenElement.classList.add("hide");
	window.requestAnimationFrame(update);
}
//
//scale game to screen size
function setPixelToWorldScale() {
	let worldToPixelScale;
	if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
		worldToPixelScale = window.innerWidth / WORLD_WIDTH;
	} else {
		worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
	}
	worldElement.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
	worldElement.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
