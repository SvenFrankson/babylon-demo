var Meshes = (function () {
    function Meshes() {
    }
    Meshes.Initialize = function () {
        var dataNames = ["cube", "s-bar", "m-bar", "l-bar", "ground"];
        Meshes.List[dataNames[0]] = Meshes.CubeData();
        Meshes.List[dataNames[1]] = Meshes.SBarData();
        Meshes.List[dataNames[2]] = Meshes.MBarData();
        Meshes.List[dataNames[3]] = Meshes.MBarData();
        Meshes.List[dataNames[4]] = Meshes.GroundData();
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
        for (var i = 0; i < vertices.length; i++) {
            vertices[i][0] = vertices[i][0] * Data.XSize;
            vertices[i][1] = vertices[i][1] * Data.YSize;
            vertices[i][2] = vertices[i][2] * Data.ZSize;
        }
        Meshes.PushQuad(vertices, 0, 1, 2, 3, positions, indices);
        Meshes.PushQuad(vertices, 1, 5, 6, 2, positions, indices);
        Meshes.PushQuad(vertices, 5, 4, 7, 6, positions, indices);
        Meshes.PushQuad(vertices, 0, 4, 5, 1, positions, indices);
        Meshes.PushQuad(vertices, 3, 7, 4, 0, positions, indices);
        Meshes.PushQuad(vertices, 2, 6, 7, 3, positions, indices);
        Meshes.PushSlot(0, 0, 0, positions, indices);
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
        for (var i = 0; i < vertices.length; i++) {
            vertices[i][0] = vertices[i][0] * Data.XSize;
            vertices[i][1] = vertices[i][1] * Data.YSize;
            vertices[i][2] = vertices[i][2] * Data.ZSize;
        }
        Meshes.PushQuad(vertices, 0, 1, 2, 3, positions, indices);
        Meshes.PushQuad(vertices, 1, 5, 6, 2, positions, indices);
        Meshes.PushQuad(vertices, 5, 4, 7, 6, positions, indices);
        Meshes.PushQuad(vertices, 0, 4, 5, 1, positions, indices);
        Meshes.PushQuad(vertices, 3, 7, 4, 0, positions, indices);
        Meshes.PushQuad(vertices, 2, 6, 7, 3, positions, indices);
        Meshes.PushSlot(0, 0, 0, positions, indices);
        Meshes.PushSlot(0, 0, 1, positions, indices);
        var normals = new Array();
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        cubeData.positions = positions;
        cubeData.indices = indices;
        cubeData.normals = normals;
        return cubeData;
    };
    Meshes.MBarData = function () {
        var cubeData = new BABYLON.VertexData();
        var vertices = new Array();
        var positions = new Array();
        var indices = new Array();
        vertices[0] = new Array(-0.5, -0.5, -0.5);
        vertices[1] = new Array(0.5, -0.5, -0.5);
        vertices[2] = new Array(0.5, -0.5, 3.5);
        vertices[3] = new Array(-0.5, -0.5, 3.5);
        vertices[4] = new Array(-0.5, 0.5, -0.5);
        vertices[5] = new Array(0.5, 0.5, -0.5);
        vertices[6] = new Array(0.5, 0.5, 3.5);
        vertices[7] = new Array(-0.5, 0.5, 3.5);
        for (var i = 0; i < vertices.length; i++) {
            vertices[i][0] = vertices[i][0] * Data.XSize;
            vertices[i][1] = vertices[i][1] * Data.YSize;
            vertices[i][2] = vertices[i][2] * Data.ZSize;
        }
        Meshes.PushQuad(vertices, 0, 1, 2, 3, positions, indices);
        Meshes.PushQuad(vertices, 1, 5, 6, 2, positions, indices);
        Meshes.PushQuad(vertices, 5, 4, 7, 6, positions, indices);
        Meshes.PushQuad(vertices, 0, 4, 5, 1, positions, indices);
        Meshes.PushQuad(vertices, 3, 7, 4, 0, positions, indices);
        Meshes.PushQuad(vertices, 2, 6, 7, 3, positions, indices);
        Meshes.PushSlot(0, 0, 0, positions, indices);
        Meshes.PushSlot(0, 0, 1, positions, indices);
        Meshes.PushSlot(0, 0, 2, positions, indices);
        Meshes.PushSlot(0, 0, 3, positions, indices);
        var normals = new Array();
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        cubeData.positions = positions;
        cubeData.indices = indices;
        cubeData.normals = normals;
        return cubeData;
    };
    Meshes.GroundData = function () {
        var cubeData = new BABYLON.VertexData();
        var vertices = new Array();
        var positions = new Array();
        var indices = new Array();
        vertices[0] = new Array(-10.5, -0.5, -10.5);
        vertices[1] = new Array(10.5, -0.5, -10.5);
        vertices[2] = new Array(10.5, -0.5, 10.5);
        vertices[3] = new Array(-10.5, -0.5, 10.5);
        vertices[4] = new Array(-10.5, 0.5, -10.5);
        vertices[5] = new Array(10.5, 0.5, -10.5);
        vertices[6] = new Array(10.5, 0.5, 10.5);
        vertices[7] = new Array(-10.5, 0.5, 10.5);
        for (var i = 0; i < vertices.length; i++) {
            vertices[i][0] = vertices[i][0] * Data.XSize;
            vertices[i][1] = vertices[i][1] * Data.YSize;
            vertices[i][2] = vertices[i][2] * Data.ZSize;
        }
        Meshes.PushQuad(vertices, 0, 1, 2, 3, positions, indices);
        Meshes.PushQuad(vertices, 1, 5, 6, 2, positions, indices);
        Meshes.PushQuad(vertices, 5, 4, 7, 6, positions, indices);
        Meshes.PushQuad(vertices, 0, 4, 5, 1, positions, indices);
        Meshes.PushQuad(vertices, 3, 7, 4, 0, positions, indices);
        Meshes.PushQuad(vertices, 2, 6, 7, 3, positions, indices);
        for (var i = -10; i <= 10; i++) {
            for (var k = -10; k <= 10; k++) {
                Meshes.PushSlot(i, 0, k, positions, indices);
            }
        }
        var normals = new Array();
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        cubeData.positions = positions;
        cubeData.indices = indices;
        cubeData.normals = normals;
        return cubeData;
    };
    Meshes.PushSlot = function (x, y, z, positions, indices) {
        var vertices = new Array();
        vertices[0] = new Array(-0.1, 0.5, -0.25);
        vertices[1] = new Array(0.1, 0.5, -0.25);
        vertices[2] = new Array(0.25, 0.5, -0.1);
        vertices[3] = new Array(0.25, 0.5, 0.1);
        vertices[4] = new Array(0.1, 0.5, 0.25);
        vertices[5] = new Array(-0.1, 0.5, 0.25);
        vertices[6] = new Array(-0.25, 0.5, 0.1);
        vertices[7] = new Array(-0.25, 0.5, -0.1);
        vertices[8] = new Array(-0.1, 0.7, -0.25);
        vertices[9] = new Array(0.1, 0.7, -0.25);
        vertices[10] = new Array(0.25, 0.7, -0.1);
        vertices[11] = new Array(0.25, 0.7, 0.1);
        vertices[12] = new Array(0.1, 0.7, 0.25);
        vertices[13] = new Array(-0.1, 0.7, 0.25);
        vertices[14] = new Array(-0.25, 0.7, 0.1);
        vertices[15] = new Array(-0.25, 0.7, -0.1);
        vertices[16] = new Array(0, 0.7, 0);
        for (var i = 0; i < vertices.length; i++) {
            vertices[i][0] = (vertices[i][0] + x) * Data.XSize;
            vertices[i][1] = (vertices[i][1] + y) * Data.YSize;
            vertices[i][2] = (vertices[i][2] + z) * Data.ZSize;
        }
        Meshes.PushQuad(vertices, 0, 8, 9, 1, positions, indices);
        Meshes.PushQuad(vertices, 1, 9, 10, 2, positions, indices);
        Meshes.PushQuad(vertices, 2, 10, 11, 3, positions, indices);
        Meshes.PushQuad(vertices, 3, 11, 12, 4, positions, indices);
        Meshes.PushQuad(vertices, 4, 12, 13, 5, positions, indices);
        Meshes.PushQuad(vertices, 5, 13, 14, 6, positions, indices);
        Meshes.PushQuad(vertices, 6, 14, 15, 7, positions, indices);
        Meshes.PushQuad(vertices, 7, 15, 8, 0, positions, indices);
        Meshes.PushTriangle(vertices, 8, 9, 16, positions, indices);
        Meshes.PushTriangle(vertices, 9, 10, 16, positions, indices);
        Meshes.PushTriangle(vertices, 10, 11, 16, positions, indices);
        Meshes.PushTriangle(vertices, 11, 12, 16, positions, indices);
        Meshes.PushTriangle(vertices, 12, 13, 16, positions, indices);
        Meshes.PushTriangle(vertices, 13, 14, 16, positions, indices);
        Meshes.PushTriangle(vertices, 14, 15, 16, positions, indices);
        Meshes.PushTriangle(vertices, 15, 8, 16, positions, indices);
    };
    Meshes.PushTriangle = function (vertices, a, b, c, positions, indices) {
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
        indices.push(index);
        indices.push(index + 1);
        indices.push(index + 2);
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
    return Meshes;
}());
Meshes.List = new Array();
