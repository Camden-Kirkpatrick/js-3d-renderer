let cube_vertices = [
    vec3_t(-1, -1, -1),
    vec3_t( 1, -1, -1),
    vec3_t( 1,  1, -1),
    vec3_t(-1,  1, -1),

    vec3_t(-1, -1,  1),
    vec3_t( 1, -1,  1),
    vec3_t( 1,  1,  1),
    vec3_t(-1,  1,  1)
];

let cube_faces = [
    // Front (-Z)
    face_t(0, 1, 2, 0xFF0000),
    face_t(0, 2, 3, 0xFF0000),

    // Right (+X)
    face_t(1, 5, 6, 0xFF0000),
    face_t(1, 6, 2, 0xFF0000),

    // Back (+Z)
    face_t(5, 4, 7, 0xFF0000),
    face_t(5, 7, 6, 0xFF0000),

    // Left (-X)
    face_t(4, 0, 3, 0xFF0000),
    face_t(4, 3, 7, 0xFF0000),

    // Top (+Y)
    face_t(3, 2, 6, 0xFF0000),
    face_t(3, 6, 7, 0xFF0000),

    // Bottom (-Y)
    face_t(4, 5, 1, 0xFF0000),
    face_t(4, 1, 0, 0xFF0000)
];
