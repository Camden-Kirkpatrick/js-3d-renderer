function put_pixel(x, y, color, a = 255)
{
    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return;

    const index = (y * canvas.width + x) * 4;

    pixels[index]     = (color >> 16) & 0xFF;
    pixels[index + 1] = (color >>  8) & 0xFF;
    pixels[index + 2] =  color        & 0xFF;
    pixels[index + 3] = a;
}

function draw_rect(x, y, w, h, color)
{
    for (i = 0; i < h; i++)
    {
        for (j = 0; j < w; j++)
        {
            put_pixel(x + j, y + i, color);
        }
    }
}

function clear_screen()
{
    for (let i = 0; i < pixels.length; i += 4)
    {
        pixels[i] = 0;
        pixels[i+1] = 0;
        pixels[i+2] = 0;
        pixels[i+3] = 255;
    }
}

function draw_line(x0, y0, x1, y1, color)
{
    let delta_x = x1 - x0;
    let delta_y = y1 - y0;

    let longest_side_length = (Math.abs(delta_x) >= Math.abs(delta_y)) ? Math.abs(delta_x) : Math.abs(delta_y);

    let x_inc = delta_x / longest_side_length;
    let y_inc = delta_y / longest_side_length;

    let current_x = x0;
    let current_y = y0;

    for (let i = 0; i <= longest_side_length; i++)
    {
        put_pixel(Math.round(current_x), Math.round(current_y), color);
        current_x += x_inc;
        current_y += y_inc;
    }
}