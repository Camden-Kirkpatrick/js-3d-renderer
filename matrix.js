function mat4_t()
{
    return {
        m: [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]
    };
}

function mat4_mul_vec4(m, v)
{
    let result = vec4_t(0, 0, 0, 0);

    result.x = m.m[0][0] * v.x + m.m[0][1] * v.y + m.m[0][2] * v.z + m.m[0][3] * v.w;
    result.y = m.m[1][0] * v.x + m.m[1][1] * v.y + m.m[1][2] * v.z + m.m[1][3] * v.w;
    result.z = m.m[2][0] * v.x + m.m[2][1] * v.y + m.m[2][2] * v.z + m.m[2][3] * v.w;
    result.w = m.m[3][0] * v.x + m.m[3][1] * v.y + m.m[3][2] * v.z + m.m[3][3] * v.w;

    return result;
}

function mat4_mul_mat4(a, b)
{
    let result = mat4_t();

    for (let i = 0; i < 4; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            result.m[i][j] = (a.m[i][0] * b.m[0][j]) +
                             (a.m[i][1] * b.m[1][j]) +
                             (a.m[i][2] * b.m[2][j]) +
                             (a.m[i][3] * b.m[3][j]);
        }
    }

    return result;
}

function mat4_make_scale(sx, sy, sz)
{
    let m = mat4_t();
    m.m[0][0] = sx;
    m.m[1][1] = sy;
    m.m[2][2] = sz;
    return m;
}

function mat4_make_translation(tx, ty, tz)
{
    let m = mat4_t();
    m.m[0][3] = tx;
    m.m[1][3] = ty;
    m.m[2][3] = tz;
    return m;
}

function mat4_make_rotation_x(angle)
{
    let c = Math.cos(angle);
    let s = Math.sin(angle);

    let m = mat4_t();
    m.m[1][1] = c;
    m.m[1][2] = -s;
    m.m[2][1] = s;
    m.m[2][2] = c;

    return m;
}

function mat4_make_rotation_y(angle)
{
    let c = Math.cos(angle);
    let s = Math.sin(angle);

    let m = mat4_t();
    m.m[0][0] = c;
    m.m[0][2] = s;
    m.m[2][0] = -s;
    m.m[2][2] = c;

    return m;
}

function mat4_make_rotation_z(angle)
{
    let c = Math.cos(angle);
    let s = Math.sin(angle);

    let m = mat4_t();
    m.m[0][0] = c;
    m.m[0][1] = -s;
    m.m[1][0] = s;
    m.m[1][1] = c;

    return m;
}

// function mat4_make_perspective(fovy, aspect_ratio, z_near, z_far)
// {
//     let d = 1 / Math.tan(fovy * 0.5);
//     let a = z_far / (z_far - z_near);
//     let b = -(z_far * z_near) / (z_far - z_near);

//     let m = mat4_t();

//     // Initialize all to 0
//     for (let i = 0; i < 4; i++)
//     {
//         for (let j = 0; j < 4; j++)
//         {
//             m.m[i][j] = 0;
//         }
//     }

//     m.m[0][0] = d / aspect_ratio;
//     m.m[1][1] = d;
//     m.m[2][2] = a;
//     m.m[2][3] = b;
//     m.m[3][2] = 1.0;

//     return m;
// }

function persp_proj(point)
{
    return vec2_t(
        point.x / point.z,
        point.y / point.z
    );
}


function mat4_mul_vec4_project(proj_mat, v)
{
    let result = mat4_mul_vec4(proj_mat, v);

    if (result.w != 0.0)
    {
        result.x /= result.w;
        result.y /= result.w;
        result.z /= result.w;
    }

    return result;
}

function mat4_look_at(eye, target, up)
{
    let z = vec3_sub(target, eye);
    vec3_normalize(z);

    let x = vec3_cross(up, z);
    vec3_normalize(x);

    let y = vec3_cross(z, x);

    let view_matrix = {
        m: [
            [x.x, x.y, x.z, -vec3_dot(x, eye)],
            [y.x, y.y, y.z, -vec3_dot(y, eye)],
            [z.x, z.y, z.z, -vec3_dot(z, eye)],
            [0.0, 0.0, 0.0, 1.0]
        ]
    };

    return view_matrix;
}
