const canvas = document.getElementById("viewport");
const ctx = canvas.getContext("2d");

const can_w = canvas.width;
const can_h = canvas.height;

let my_img_data = ctx.createImageData(can_w, can_h)

let paused = false;

let scale_factor = 500;

let camera_position = new Vec3(0, 0, -5);

function project(point)
{
    let projected_point = new Vec2(
        (scale_factor * point.x) / point.z,
        (scale_factor * point.y) / point.z,
    )
    return projected_point;
}

function setup()
{
    let point_count = 0;

    for (let x = -1; x <= 1; x += 0.25)
    {
        for (let y = -1; y <= 1; y += 0.25)
        {
            for (let z = -1; z <= 1; z += 0.25)
            {
                let new_point = new Vec3(x, y, z);
                cube_points[point_count++] = new_point;
            }
        }
    }
}

function update(dt)
{
    // if (p.x > can_w - 1 || p.y > can_h - 1)
    // {
    //     p.x = 0;
    //     p.y = 0;
    // }

    // p.x += 100 * dt;
    // p.y += 100 * dt;

    for (let i = 0; i < N_POINTS; i++)
    {

        let point = cube_points[i];

        // camera-space point (do NOT modify the original)
        let camera_point = new Vec3(
            point.x - camera_position.x,
            point.y - camera_position.y,
            point.z - camera_position.z
        );

        let projected_point = project(camera_point);
        projected_points[i] = projected_point;
    }
}

function render()
{
    clear_screen(my_img_data, BLACK);

    // draw_rect(my_img_data, (can_w / 2) - 100, (can_h / 2) - 100, 200, 200, RED);
    // draw_rect(my_img_data, (can_w - 1) - 99, (can_h - 1) - 99, 100, 100, BLUE);

    // draw_triangle(my_img_data, 0, 0, 300, 300, 0, 300, YELLOW);

    // put_pixel(my_img_data, p.x, p.y, MAGENTA);

    for (let i = 0; i < N_POINTS; i++)
    {
        let projected_point = projected_points[i];
        draw_rect(
            my_img_data,
            projected_point.x + (can_w / 2),
            projected_point.y + (can_h / 2),
            4,
            4,
            RED 
        );
    }


}

let p = new Vec2(0, 0, 100);

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
        if (!paused)
            update(dt)
        render();

        ctx.putImageData(my_img_data, 0, 0);
    }


    // schedule the NEXT frame (keeps the loop running)
    requestAnimationFrame(frame);
}

setup();
// schedule the FIRST frame (starts the loop)
requestAnimationFrame(frame);