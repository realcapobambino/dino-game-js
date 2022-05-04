const dinoElement = document.querySelector("[data-dino]");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.011;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let dinoFrame;
let currentFrameTime;
export function setupDino() {
	isJumping = false;
	dinoFrame = 0;
	currentFrameTime = 0;
}

export function updateDino(delta, speedScale) {
	//
	handleRun(delta, speedScale);
	handleJump(delta);
}

function handleRun(delta, speedScale) {
	if (isJumping) {
		//
		dinoElement.src = "/img/dino-stationary.png";
		return;
	}

	if (currentFrameTime >= FRAME_TIME) {
		//update frame to next frame --
		dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
		dinoElement.src = `/img/dino-run-${dinoFrame}.png`;
		currentFrameTime -= FRAME_TIME;
	}
	currentFrameTime += delta * speedScale;
}

function handleJump() {
	//
}
