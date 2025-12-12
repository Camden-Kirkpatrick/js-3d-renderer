import { isDown, wasPressed, keys } from "./keyboard.js";
import { update, draw } from "./game.js";

const TARGET_FPS = 244;
const TARGET_FRAME_TIME = 1000 / TARGET_FPS;
let last_time = 0;
let paused = false;

function render()
{
    clear_screen();
    draw();
    ctx.putImageData(image_data, 0, 0);
}

function frame(time)
{
    const dt = time - last_time;

    if (wasPressed("p"))
    {
        paused = !paused;
    }

    if (dt >= TARGET_FRAME_TIME)
    {
        if (!paused)
            update(dt / 1000);
        render();
        last_time = time;
    }

    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
