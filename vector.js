///////////////////////////////////////////////////////////////////////
// 2D VECTOR FUNCTIONS
///////////////////////////////////////////////////////////////////////

function vec2_t(x = 0, y = 0)
{
    return {
        x: x,
        y: y
    };
}

function vec2_length(v)
{
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

function vec2_add(a, b)
{
    return vec2_t(a.x + b.x, a.y + b.y);
}

function vec2_sub(a, b)
{
    return vec2_t(a.x - b.x, a.y - b.y);
}

function vec2_mul(v, s)
{
    return vec2_t(v.x * s, v.y * s);
}

function vec2_div(v, s)
{
    return vec2_t(v.x / s, v.y / s);
}

function vec2_dot(a, b)
{
    return (a.x * b.x) + (a.y * b.y);
}

function vec2_normalize(v)
{
    let length = vec2_length(v);

    v.x /= length;
    v.y /= length;
}

///////////////////////////////////////////////////////////////////////
// 3D VECTOR FUNCTIONS
///////////////////////////////////////////////////////////////////////
function vec3_t(x = 0, y = 0, z = 0)
{
    return {
        x: x,
        y: y,
        z: z
    };
}

function vec3_length(v)
{
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

function vec3_add(a, b)
{
    return vec3_t(a.x + b.x, a.y + b.y, a.z + b.z);
}

function vec3_sub(a, b)
{
    return vec3_t(a.x - b.x, a.y - b.y, a.z - b.z);
}

function vec3_mul(v, s)
{
    return vec3_t(v.x * s, v.y * s, v.z * s);
}

function vec3_div(v, s)
{
    return vec3_t(v.x / s, v.y / s, v.z / s);
}

function vec3_dot(a, b)
{
    return (a.x * b.x) + (a.y * b.y) + (a.z * b.z);
}

function vec3_normalize(v)
{
    let length = vec3_length(v);

    v.x /= length;
    v.y /= length;
    v.z /= length;
}

function vec3_cross(a, b)
{
    let result = vec3_t(0, 0, 0);

    result.x = a.y * b.z - a.z * b.y;
    result.y = a.z * b.x - a.x * b.z;
    result.z = a.x * b.y - a.y * b.x;

    return result;
}

function vec3_rotate_x(v, angle)
{
    let rotated_vector = {
        x: v.x,
        y: v.y * Math.cos(angle) - v.z * Math.sin(angle),
        z: v.y * Math.sin(angle) + v.z * Math.cos(angle)
    };

    return rotated_vector;
}

function vec3_rotate_y(v, angle)
{
    let rotated_vector = {
        x: v.x * Math.cos(angle) + v.z * Math.sin(angle),
        y: v.y,
        z: -v.x * Math.sin(angle) + v.z * Math.cos(angle)
    };

    return rotated_vector;
}

function vec3_rotate_z(v, angle)
{
    let rotated_vector = {
        x: v.x * Math.cos(angle) - v.y * Math.sin(angle),
        y: v.x * Math.sin(angle) + v.y * Math.cos(angle),
        z: v.z
    };

    return rotated_vector;
}

function vec4_t(x = 0, y = 0, z = 0, w = 0)
{
    return {
        x: x,
        y: y,
        z: z,
        w: w
    };
}

function vec3_to_vec4(v)
{
    return vec4_t(v.x, v.y, v.z, 1.0);
}

