const canvas = document.getElementById("viewport");
const ctx = canvas.getContext("2d");

const can_w = canvas.width;
const can_h = canvas.height;

let my_img_data = ctx.createImageData(can_w, can_h)

function put_pixel(img, x, y, r, g, b, a=255)
{
    if (x < 0 || x >= can_w || y < 0 || y >= can_h)
        return;
    const i = (y * can_w + x) * 4
    img.data[i + 0] = r;
    img.data[i + 1] = g;
    img.data[i + 2] = b;
    img.data[i + 3] = a;
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

function frame()
{
    clear_screen(my_img_data, 0, 0, 0);

    put_pixel(my_img_data, 0, 0, 255, 255, 255);

    ctx.putImageData(my_img_data, 0, 0);
    
    // schedule the NEXT frame (keeps the loop running)
    requestAnimationFrame(frame);
}

// schedule the FIRST frame (starts the loop)
requestAnimationFrame(frame);