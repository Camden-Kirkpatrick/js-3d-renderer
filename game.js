let triangles_to_render = [];

function update(dt)
{
    triangles_to_render = [];

    // Animation just like your C code
    cube_rot.x += 0.005;
    cube_rot.y += 0.005;
    cube_rot.z += 0.005;

    // -------------------------------
    // BUILD WORLD MATRIX (this replaces the 3 rotate + translate steps in C)
    // -------------------------------
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

    // ------------------------------------
    // EXACT C-STYLE NESTED FACE LOOP
    // ------------------------------------
    for (let i = 0; i < cube_faces.length; i++)
    {
        let face = cube_faces[i];

        // 1. Get the three vertices for this face
        let face_verts = [
            cube_vertices[face.a],
            cube_vertices[face.b],
            cube_vertices[face.c]
        ];

        // 2. Create the triangle (points are filled inside the loop)
        let tri = triangle_t(null, null, null, face.color);

        // 3. Transform + project each vertex
        for (let j = 0; j < 3; j++)
        {
            let v = face_verts[j];

            // Convert vec3 → vec4 for matrix math
            let p = vec4_t(v.x, v.y, v.z, 1);

            // Apply WORLD MATRIX (THIS is your matrix version of the C code)
            p = mat4_mul_vec4(world_mat, p);

            // C code: translated vertex.z -= camera_position.z;
            p.z -= camera_z;

            // Perspective projection (your existing function, same as C)
            let proj = persp_proj(p);

            // Scale + screen center (same as C)
            proj.x = proj.x * scale_factor + canvas.width  / 2;
            proj.y = proj.y * scale_factor + canvas.height / 2;

            // Store inside triangle
            tri.points[j] = proj;
        }

        // 4. Store this triangle just like C
        triangles_to_render[i] = tri;
    }
}

function draw()
{
    for (let tri of triangles_to_render)
    {
        let p0 = tri.points[0];
        let p1 = tri.points[1];
        let p2 = tri.points[2];

        draw_triangle(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, tri.color);
    }
}