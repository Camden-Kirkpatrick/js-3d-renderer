const canvas = document.getElementById("viewport");
const ctx = canvas.getContext("2d");

let image_data, pixels;

function resize_canvas()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    image_data = ctx.createImageData(canvas.width, canvas.height);
    pixels = image_data.data;
}

resize_canvas();
window.addEventListener("resize", resize_canvas);
