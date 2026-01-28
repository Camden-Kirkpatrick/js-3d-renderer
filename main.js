const canvas = document.getElementById("viewport");
const ctx = canvas.getContext("2d");

const can_w = canvas.width;
const can_h = canvas.height;

// Target update rate
const TARGET_FPS = 60;
// How long one update should take (ms)
const FRAME_TIME = 1000 / TARGET_FPS; 

// Time of the last frame() call (ms)
let previous_time = performance.now();
// Saved-up time waiting to be simulated (ms)
let accumulator = 0;

let my_img_data = ctx.createImageData(can_w, can_h)

class Point
{
    constructor(x, y, velocity)
    {
        this.x = x;
        this.y = y;
        this.velocity = 100;
    }
}

function put_pixel(img, x, y, r, g, b, a=255)
{
    x = x | 0;
    y = y | 0;

    if (x < 0 || x >= can_w || y < 0 || y >= can_h)
        return;

    const i = (y * can_w + x) * 4
    img.data[i + 0] = r;
    img.data[i + 1] = g;
    img.data[i + 2] = b;
    img.data[i + 3] = a;
}

function draw_rect(img, x, y, w, h, r, g, b, a=255)
{
    for (let i = 0; i < h; i++)
    {
        for (let j = 0; j < w; j++)
        {
            put_pixel(img, x + j, y + i, r, g, b, a)
        }
    }
}

function clear_screen(img, r, g, b, a=255)
{
    for (let i = 0; i < can_w * can_h * 4; i+=4)
    {
        img.data[i + 0] = r;
        img.data[i + 1] = g;
        img.data[i + 2] = b;
        img.data[i + 3] = a;
    }
}

function update(dt)
{
    if (p.x > can_w - 1 || p.y > can_h - 1)
    {
        p.x = 0;
        p.y = 0;
    }

    p.x += p.velocity * dt;
    p.y += p.velocity * dt;
}

function render()
{
    clear_screen(my_img_data, 0, 0, 0);

    put_pixel(my_img_data, p.x, p.y, 255, 255, 255);
    draw_rect(my_img_data, (can_w / 2) - 100, (can_h / 2) - 100, 200, 200, 255, 0, 0);
    draw_rect(my_img_data, (can_w - 1) - 99, (can_h - 1) - 99, 100, 100, 0, 0, 255);
}

let p = new Point(0, 0, 100);

function frame(now)
{
    // Time since last frame (ms)
    let delta_ms = now - previous_time;
    previous_time = now;

    // Accumulate real time
    accumulator += delta_ms;

    // Update only when enough time has passed
    if (accumulator >= FRAME_TIME)
    {
        const dt = accumulator / 1000; // ms to seconds
        accumulator = 0;

        update(dt)
        render();

        ctx.putImageData(my_img_data, 0, 0);
    }


    // schedule the NEXT frame (keeps the loop running)
    requestAnimationFrame(frame);
}

// schedule the FIRST frame (starts the loop)
requestAnimationFrame(frame);