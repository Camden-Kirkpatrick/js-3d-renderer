// Target update rate
const TARGET_FPS = 60;
// How long one update should take (ms)
const FRAME_TIME = 1000 / TARGET_FPS; 

// Time of the last frame() call (ms)
let previous_time = performance.now();
// Saved-up time waiting to be simulated (ms)
let accumulator = 0;

const WHITE  = { r: 255, g: 255, b: 255, a: 255 };
const BLACK  = { r:   0, g:   0, b:   0, a: 255 };
const RED    = { r: 255, g:   0, b:   0, a: 255 };
const GREEN  = { r:   0, g: 255, b:   0, a: 255 };
const BLUE   = { r:   0, g:   0, b: 255, a: 255 };
const YELLOW = { r: 255, g: 255, b:   0, a: 255 };
const TEAL   = { r:   0, g: 255, b: 255, a: 255 };
const MAGENTA = { r: 255, g:  0, b: 255, a: 255 };

function put_pixel(img, x, y, color)
{
    x = x | 0;
    y = y | 0;

    if (x < 0 || x >= can_w || y < 0 || y >= can_h)
        return;

    const i = (y * can_w + x) * 4;
    img.data[i + 0] = color.r;
    img.data[i + 1] = color.g;
    img.data[i + 2] = color.b;
    img.data[i + 3] = color.a;
}

function draw_rect(img, x, y, w, h, color)
{
    for (let i = 0; i < h; i++)
    {
        for (let j = 0; j < w; j++)
        {
            put_pixel(img, x + j, y + i, color)
        }
    }
}

function clear_screen(img, color)
{
    for (let i = 0; i < can_w * can_h * 4; i+=4)
    {
        img.data[i + 0] = color.r;
        img.data[i + 1] = color.g;
        img.data[i + 2] = color.b;
        img.data[i + 3] = color.a;
    }
}

function draw_line(img, x0, y0, x1, y1, color)
{
    let dx = x1 - x0;
    let dy = y1 - y0;

    let length = Math.max(Math.abs(dx), Math.abs(dy));
    if (length === 0)
    {
        put_pixel(img, x0, y0, color);
        return;
    }

    let x_inc = dx / length;
    let y_inc = dy / length;

    let x = x0;
    let y = y0;

    for (let i = 0; i <= length; i++)
    {
        put_pixel(img, Math.round(x), Math.round(y), color);
        x += x_inc;
        y += y_inc;
    }
}


function draw_triangle(img, x0, y0, x1, y1, x2, y2, color)
{
    draw_line(img, x0, y0, x1, y1, color);
    draw_line(img, x1, y1, x2, y2, color);
    draw_line(img, x2, y2, x0, y0, color);
}
