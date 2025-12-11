const TARGET_FPS = 244;
const TARGET_FRAME_TIME = 1000 / TARGET_FPS;

let last_time = 0;

function render()
{
    clear_screen();
    draw();
    ctx.putImageData(image_data, 0, 0);
}

function frame(time)
{
    const dt = time - last_time;

    if (dt >= TARGET_FRAME_TIME)
    {
        update(dt / 1000);
        render();
        last_time = time;
    }

    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
