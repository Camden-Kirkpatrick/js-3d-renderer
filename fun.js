let rects = [
    { x: 0, y: 0, vx: 300, vy: 300, w: 100, h: 100, color: 0xFF0000 },
    { x: canvas.width / 2, y: canvas.height / 2, vx: 300, vy: 300, w: 100, h: 150, color: 0x0000FF }
];

function update_rect_animation(dt)
{
    for (let r of rects)
    {
        if (r.x <= 0)
        {
            r.x = 0; r.vx = -r.vx;
        }
        else if (r.x + r.w >= canvas.width)
        {
            r.x = canvas.width - r.w; 
            r.vx = -r.vx;
        }

        if (r.y <= 0)
        {
            r.y = 0; r.vy = -r.vy;
        }
        else if (r.y + r.h >= canvas.height)
        {
            r.y = canvas.height - r.h;
            r.vy = -r.vy;
        }

        r.x += r.vx * dt;
        r.y += r.vy * dt;
    }
}

function draw_rect_animaiton()
{
    for (let r of rects)
    {
        draw_rect(r.x | 0, r.y | 0, r.w, r.h, r.color);
    }
}