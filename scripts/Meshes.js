var Meshes = (function () {
    function Meshes() {
    }
    Meshes.Initialize = function () {
        var dataNames = ["cube", "s-bar", "m-bar", "l-bar"];
        Meshes.List[dataNames[0]] = Meshes.CubeData();
        Meshes.List[dataNames[1]] = Meshes.SBarData();
    };
    Meshes.PushQuad = function (vertices, a, b, c, d, positions, indices) {
        var index = positions.length / 3;
        for (var n in vertices[a]) {
            if (vertices[a] != null) {
                positions.push(vertices[a][n]);
            }
        }
        for (var n in vertices[b]) {
            if (vertices[b] != null) {
                positions.push(vertices[b][n]);
            }
        }
        for (var n in vertices[c]) {
            if (vertices[c] != null) {
                positions.push(vertices[c][n]);
            }
        }
        for (var n in vertices[d]) {
            if (vertices[d] != null) {
                positions.push(vertices[d][n]);
            }
        }
        indices.push(index);
        indices.push(index + 2);
        indices.push(index + 1);
        indices.push(index + 3);
        indices.push(index + 2);
        indices.push(index);
    };
    Meshes.CubeData = function () {
        var cubeData = new BABYLON.VertexData();
        var vertices = new Array();
        var positions = new Array();
        var indices = new Array();
        vertices[0] = new Array(-0.5, -0.5, -0.5);
        vertices[1] = new Array(0.5, -0.5, -0.5);
        vertices[2] = new Array(0.5, -0.5, 0.5);
        vertices[3] = new Array(-0.5, -0.5, 0.5);
        vertices[4] = new Array(-0.5, 0.5, -0.5);
        vertices[5] = new Array(0.5, 0.5, -0.5);
        vertices[6] = new Array(0.5, 0.5, 0.5);
        vertices[7] = new Array(-0.5, 0.5, 0.5);
        Meshes.PushQuad(vertices, 0, 1, 2, 3, positions, indices);
        Meshes.PushQuad(vertices, 1, 5, 6, 2, positions, indices);
        Meshes.PushQuad(vertices, 5, 4, 7, 6, positions, indices);
        Meshes.PushQuad(vertices, 0, 4, 5, 1, positions, indices);
        Meshes.PushQuad(vertices, 3, 7, 4, 0, positions, indices);
        Meshes.PushQuad(vertices, 2, 6, 7, 3, positions, indices);
        var normals = new Array();
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        cubeData.positions = positions;
        cubeData.indices = indices;
        cubeData.normals = normals;
        return cubeData;
    };
    Meshes.SBarData = function () {
        var cubeData = new BABYLON.VertexData();
        var vertices = new Array();
        var positions = new Array();
        var indices = new Array();
        vertices[0] = new Array(-0.5, -0.5, -0.5);
        vertices[1] = new Array(0.5, -0.5, -0.5);
        vertices[2] = new Array(0.5, -0.5, 1.5);
        vertices[3] = new Array(-0.5, -0.5, 1.5);
        vertices[4] = new Array(-0.5, 0.5, -0.5);
        vertices[5] = new Array(0.5, 0.5, -0.5);
        vertices[6] = new Array(0.5, 0.5, 1.5);
        vertices[7] = new Array(-0.5, 0.5, 1.5);
        Meshes.PushQuad(vertices, 0, 1, 2, 3, positions, indices);
        Meshes.PushQuad(vertices, 1, 5, 6, 2, positions, indices);
        Meshes.PushQuad(vertices, 5, 4, 7, 6, positions, indices);
        Meshes.PushQuad(vertices, 0, 4, 5, 1, positions, indices);
        Meshes.PushQuad(vertices, 3, 7, 4, 0, positions, indices);
        Meshes.PushQuad(vertices, 2, 6, 7, 3, positions, indices);
        var normals = new Array();
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        cubeData.positions = positions;
        cubeData.indices = indices;
        cubeData.normals = normals;
        return cubeData;
    };
    return Meshes;
}());
Meshes.List = new Array();
