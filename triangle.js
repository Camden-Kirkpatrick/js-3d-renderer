function face_t(a, b, c, color)
{
    return {
        a: a,
        b: b,
        c: c,
        color: color
    };
}

function triangle_t(p0, p1, p2, color)
{
    return {
        points: [p0, p1, p2],
        color: color
    };
}

function draw_triangle(x0, y0, x1, y1, x2, y2, color)
{
    draw_line(x0, y0, x1, y1, color);
    draw_line(x1, y1, x2, y2, color);
    draw_line(x2, y2, x0, y0, color);
}

function int_swap(a, b)
{
    let temp = a.value;
    a.value = b.value;
    b.value = temp;
}

function float_swap(a, b)
{
    let temp = a.value;
    a.value = b.value;
    b.value = temp;
}

function draw_filled_triangle(
        x0, y0, z0, w0,
        x1, y1, z1, w1,
        x2, y2, z2, w2,
        color
    )
{
    // We need to sort the vertices by y-coordinate ascending (y0 < y1 < y2)

    // Wrap values so they can be swapped like C pointers
    let vx0 = { value: x0 }, vy0 = { value: y0 }, vz0 = { value: z0 }, vw0 = { value: w0 };
    let vx1 = { value: x1 }, vy1 = { value: y1 }, vz1 = { value: z1 }, vw1 = { value: w1 };
    let vx2 = { value: x2 }, vy2 = { value: y2 }, vz2 = { value: z2 }, vw2 = { value: w2 };

    if (vy0.value > vy1.value)
    {
        int_swap(vy0, vy1);
        int_swap(vx0, vx1);
        float_swap(vz0, vz1);
        float_swap(vw0, vw1);
    }

    if (vy1.value > vy2.value)
    {
        int_swap(vy1, vy2);
        int_swap(vx1, vx2);
        float_swap(vz1, vz2);
        float_swap(vw1, vw2);

        if (vy0.value > vy1.value)
        {
            int_swap(vy0, vy1);
            int_swap(vx0, vx1);
            float_swap(vz0, vz1);
            float_swap(vw0, vw1);
        }
    }

    // Unwrap swapped values
    x0 = vx0.value;  y0 = vy0.value;  z0 = vz0.value;  w0 = vw0.value;
    x1 = vx1.value;  y1 = vy1.value;  z1 = vz1.value;  w1 = vw1.value;
    x2 = vx2.value;  y2 = vy2.value;  z2 = vz2.value;  w2 = vw2.value;

    let point_a = vec4_t(x0, y0, z0, w0);
    let point_b = vec4_t(x1, y1, z1, w1);
    let point_c = vec4_t(x2, y2, z2, w2);

    ///////////////////////////////////////////////////////
    // Render the upper part of the triangle (flat-bottom)
    ///////////////////////////////////////////////////////

    let inv_slope_1 = (x1 - x0) / (y1 - y0);
    let inv_slope_2 = (x2 - x0) / (y2 - y0);

    if (y0 != y1)
    {
        for (let y = y0; y <= y1; y++)
        {
            let x_start = x1 + (y - y1) * inv_slope_1;
            let x_end   = x0 + (y - y0) * inv_slope_2;

            if (x_end < x_start)
            {
                let a = { value: x_start };
                let b = { value: x_end };
                float_swap(a, b);
                x_start = a.value;
                x_end   = b.value;
            }

            for (let x = x_start; x <= x_end; x++)
            {
                draw_triangle_pixel(x, y, color, point_a, point_b, point_c);
            }
        }
    }

    ///////////////////////////////////////////////////////
    // Render the bottom part of the triangle (flat-top)
    ///////////////////////////////////////////////////////

    inv_slope_1 = (x2 - x1) / (y2 - y1);
    inv_slope_2 = (x2 - x0) / (y2 - y0);

    if (y1 != y2)
    {
        for (let y = y1; y <= y2; y++)
        {
            let x_start = x1 + (y - y1) * inv_slope_1;
            let x_end   = x0 + (y - y0) * inv_slope_2;

            if (x_end < x_start)
            {
                let a = { value: x_start };
                let b = { value: x_end };
                float_swap(a, b);
                x_start = a.value;
                x_end   = b.value;
            }

            for (let x = x_start; x <= x_end; x++)
            {
                draw_triangle_pixel(x, y, color, point_a, point_b, point_c);
            }
        }
    }
}
