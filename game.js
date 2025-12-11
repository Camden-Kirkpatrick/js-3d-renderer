import { isDown, wasPressed } from "./keyboard.js";

let triangles_to_render = [];
let scale_factor = 800;
let camera_z = -5;
let cube_scale = { x: 1, y: 1, z: 1 };
let cube_rot =   { x: 0, y: 0, z: 0 };
let cube_trans = { x: 0, y: 0, z: 0 };
let move_speed = 5;   // units per second
const rot_speed  = 1.5; // radians per second

export function update(dt)
{
    triangles_to_render = [];

    // Translation: WASD moves the cube in X/Z
    if (isDown("w")) cube_trans.z += move_speed * dt;
    if (isDown("s") && cube_trans.z > -2.7) cube_trans.z -= move_speed * dt;
    if (isDown("a")) cube_trans.x -= move_speed * dt;
    if (isDown("d")) cube_trans.x += move_speed * dt;

    // Up/Down movement
    if (isDown(" ")) cube_trans.y += move_speed * dt;  // Space = up
    if (isDown("Shift")) cube_trans.y -= move_speed * dt; // Shift = down

    // Rotation: Arrow keys rotate the cube
    if (isDown("ArrowLeft"))  cube_rot.y -= rot_speed * dt;
    if (isDown("ArrowRight")) cube_rot.y += rot_speed * dt;
    if (isDown("ArrowUp"))    cube_rot.x -= rot_speed * dt;
    if (isDown("ArrowDown"))  cube_rot.x += rot_speed * dt;
    if (isDown("/"))    cube_rot.z -= rot_speed * dt;
    if (isDown("."))  cube_rot.z += rot_speed * dt;

    if (wasPressed("=")) move_speed++;
    if (wasPressed("-") && move_speed >= 2) move_speed--;

    // Reset to default
    if (isDown("r"))
    {
        cube_scale = { x: 1, y: 1, z: 1 };
        cube_rot =   { x: 0, y: 0, z: 0 };
        cube_trans = { x: 0, y: 0, z: 0 };
        move_speed = 5;
    }

    console.log(cube_trans.z);

    // cube_rot.x += 1 * dt;
    // cube_rot.y += 1 * dt;
    // cube_rot.z += 1 * dt;

    // Build world matrix
    let scale_mat = mat4_make_scale(cube_scale.x, cube_scale.y, cube_scale.z);
    let rot_mat_x = mat4_make_rotation_x(cube_rot.x);
    let rot_mat_y = mat4_make_rotation_y(cube_rot.y);
    let rot_mat_z = mat4_make_rotation_z(cube_rot.z);
    let trans_mat = mat4_make_translation(cube_trans.x, cube_trans.y, cube_trans.z);

    // MUST START WITH IDENTITY
    let world_mat = mat4_t();
    world_mat = mat4_mul_mat4(scale_mat, world_mat);
    world_mat = mat4_mul_mat4(rot_mat_x, world_mat);
    world_mat = mat4_mul_mat4(rot_mat_y, world_mat);
    world_mat = mat4_mul_mat4(rot_mat_z, world_mat);
    world_mat = mat4_mul_mat4(trans_mat, world_mat);

    for (let i = 0; i < cube_faces.length; i++)
    {
        let face = cube_faces[i];

        // Get the three vertices for this face
        let face_verts = [
            cube_vertices[face.a],
            cube_vertices[face.b],
            cube_vertices[face.c]
        ];

        // Create the triangle
        let tri = triangle_t(null, null, null, face.color);

        // Transform + project each vertex
        for (let j = 0; j < 3; j++)
        {
            let v = face_verts[j];

            // Convert vec3 → vec4 for matrix math
            let p = vec4_t(v.x, v.y, v.z, 1);

            // Apply WORLD MATRIX
            p = mat4_mul_vec4(world_mat, p);

            // Push the vertex away from the camera
            p.z -= camera_z;

            // Perspective projection
            let proj = persp_proj(p);

            // Scale and translate the point so its on the screen
            proj.x = proj.x * scale_factor + canvas.width  / 2;
            proj.y = proj.y * scale_factor + canvas.height / 2;

            // Store inside triangle
            tri.points[j] = proj;
        }

        // Store this triangle
        triangles_to_render[i] = tri;
    }
}

export function draw()
{
    for (let tri of triangles_to_render)
    {
        let p0 = tri.points[0];
        let p1 = tri.points[1];
        let p2 = tri.points[2];

        draw_triangle(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, tri.color);
    }
}