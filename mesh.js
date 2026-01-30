const CUBE_VERTS = 8;
const CUBE_FACES = 12;

const N_POINTS = 729
let cube_points = [];
let projected_points = [];

// const cube_vertices = [
//     { x: -1, y: -1, z: -1 },
//     { x: -1, y:  1, z: -1 },
//     { x:  1, y:  1, z: -1 },
//     { x:  1, y: -1, z: -1 },
//     { x:  1, y:  1, z:  1 },
//     { x:  1, y: -1, z:  1 },
//     { x: -1, y:  1, z:  1 },
//     { x: -1, y: -1, z:  1 }
// ];

// const cube_faces = [
//     // front
//     { p1: 0, p2: 1, p3: 2, color: RED},
//     { p1: 0, p2: 2, p3: 3, color: RED },

//     // right
//     { p1: 3, p2: 2, p3: 4, color: RED },
//     { p1: 3, p2: 4, p3: 5, color: RED },

//     // back
//     { p1: 5, p2: 4, p3: 6, color: RED },
//     { p1: 5, p2: 6, p3: 7, color: RED },

//     // left
//     { p1: 7, p2: 6, p3: 1, color: RED },
//     { p1: 7, p2: 1, p3: 0, color: RED },

//     // top
//     { p1: 1, p2: 6, p3: 4, color: RED },
//     { p1: 1, p2: 4, p3: 2, color: RED },

//     // bottom
//     { p1: 5, p2: 7, p3: 0, color: RED },
//     { p1: 5, p2: 0, p3: 3, color: RED }
// ];