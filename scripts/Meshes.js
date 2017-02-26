var Meshes = (function () {
    function Meshes() {
    }
    Meshes.Initialize = function () {
        Meshes.List["delete"] = Meshes.CubicalData(1, 1, 1);
        Meshes.List["cube"] = Meshes.CubicalData(1, 3, 1);
        Meshes.List["s-bar"] = Meshes.CubicalData(1, 3, 2);
        Meshes.List["m-bar"] = Meshes.CubicalData(1, 3, 4);
        Meshes.List["l-bar"] = Meshes.CubicalData(1, 3, 6);
        Meshes.List["xl-bar"] = Meshes.CubicalData(1, 3, 8);
        Meshes.List["s-brick"] = Meshes.CubicalData(2, 3, 2);
        Meshes.List["m-brick"] = Meshes.CubicalData(2, 3, 4);
        Meshes.List["l-brick"] = Meshes.CubicalData(2, 3, 6);
        Meshes.List["xl-brick"] = Meshes.CubicalData(2, 3, 8);
        Meshes.List["square"] = Meshes.CubicalData(1, 1, 1);
        Meshes.List["s-line"] = Meshes.CubicalData(1, 1, 2);
        Meshes.List["m-line"] = Meshes.CubicalData(1, 1, 4);
        Meshes.List["l-line"] = Meshes.CubicalData(1, 1, 6);
        Meshes.List["xl-line"] = Meshes.CubicalData(1, 1, 8);
        Meshes.List["s-plate"] = Meshes.CubicalData(2, 1, 2);
        Meshes.List["m-plate"] = Meshes.CubicalData(2, 1, 4);
        Meshes.List["l-plate"] = Meshes.CubicalData(2, 1, 6);
        Meshes.List["xl-plate"] = Meshes.CubicalData(2, 1, 8);
        Meshes.List["corner-slide"] = Meshes.VertexDataFromJSON(Data.SlideCorner);
        Meshes.List["xs-slide"] = Meshes.SlideData(2, 3, 1);
        Meshes.List["s-slide"] = Meshes.SlideData(2, 3, 2);
        Meshes.List["m-slide"] = Meshes.SlideData(2, 3, 4);
        Meshes.List["l-slide"] = Meshes.SlideData(2, 3, 6);
        Meshes.List["xl-slide"] = Meshes.SlideData(2, 3, 8);
        Meshes.List["corner-edge"] = Meshes.VertexDataFromJSON(Data.EdgeCorner);
        Meshes.List["xs-edge"] = Meshes.SlideData(2, 6, 1);
        Meshes.List["s-edge"] = Meshes.SlideData(2, 6, 2);
        Meshes.List["m-edge"] = Meshes.SlideData(2, 6, 4);
        Meshes.List["l-edge"] = Meshes.SlideData(2, 6, 6);
        Meshes.List["xl-edge"] = Meshes.SlideData(2, 6, 8);
        Meshes.List["xs-barrel"] = Meshes.VertexDataFromJSON(Data.XSBarrel);
        Meshes.List["s-barrel"] = Meshes.VertexDataFromJSON(Data.SBarrel);
        Meshes.List["flame"] = Meshes.VertexDataFromJSON(Data.Flame);
        Meshes.List["ground"] = Meshes.GroundData();
    };
    Meshes.VertexDataFromJSON = function (jsonData) {
        var tmp = JSON.parse(jsonData);
        var vertexData = new BABYLON.VertexData();
        vertexData.positions = tmp.positions;
        vertexData.normals = tmp.normals;
        for (var i = 0; i < vertexData.normals.length; i++) {
            vertexData.positions[i] = vertexData.positions[i] / 100.0;
            vertexData.normals[i] = vertexData.normals[i] / 100.0;
        }
        vertexData.indices = tmp.indices;
        return vertexData;
    };
    Meshes.CubicalData = function (width, height, length) {
        var cubeData = new BABYLON.VertexData();
        var vertices = new Array();
        var positions = new Array();
        var indices = new Array();
        vertices[0] = new Array(-0.5, -0.5, -0.5);
        vertices[1] = new Array(-0.5 + width, -0.5, -0.5);
        vertices[2] = new Array(-0.5 + width, -0.5, -0.5 + length);
        vertices[3] = new Array(-0.5, -0.5, -0.5 + length);
        vertices[4] = new Array(-0.5, -0.5 + height, -0.5);
        vertices[5] = new Array(-0.5 + width, -0.5 + height, -0.5);
        vertices[6] = new Array(-0.5 + width, -0.5 + height, -0.5 + length);
        vertices[7] = new Array(-0.5, -0.5 + height, -0.5 + length);
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
        for (var i = 0; i < width; i++) {
            for (var k = 0; k < length; k++) {
                Meshes.PushSlot(i, height - 1, k, positions, indices);
            }
        }
        var normals = new Array();
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        cubeData.positions = positions;
        cubeData.indices = indices;
        cubeData.normals = normals;
        return cubeData;
    };
    Meshes.SlideData = function (width, height, length) {
        var slideData = new BABYLON.VertexData();
        var vertices = new Array();
        var positions = new Array();
        var indices = new Array();
        vertices[0] = new Array(-0.5, -0.5, -0.5);
        vertices[1] = new Array(-0.5 + width / 2, -0.5, -0.5);
        vertices[2] = new Array(-0.5 + width / 2, -0.5, -0.5 + length);
        vertices[3] = new Array(-0.5, -0.5, -0.5 + length);
        vertices[4] = new Array(-0.5, -0.5 + height, -0.5);
        vertices[5] = new Array(-0.5 + width / 2, -0.5 + height, -0.5);
        vertices[6] = new Array(-0.5 + width / 2, -0.5 + height, -0.5 + length);
        vertices[7] = new Array(-0.5, -0.5 + height, -0.5 + length);
        vertices[8] = new Array(-0.5 + width, -0.5, -0.5);
        vertices[9] = new Array(-0.5 + width, -0.5, -0.5 + length);
        vertices[10] = new Array(-0.5 + width, 0.5, -0.5);
        vertices[11] = new Array(-0.5 + width, 0.5, -0.5 + length);
        for (var i = 0; i < vertices.length; i++) {
            vertices[i][0] = vertices[i][0] * Data.XSize;
            vertices[i][1] = vertices[i][1] * Data.YSize;
            vertices[i][2] = vertices[i][2] * Data.ZSize;
        }
        Meshes.PushQuad(vertices, 0, 1, 2, 3, positions, indices);
        Meshes.PushQuad(vertices, 5, 4, 7, 6, positions, indices);
        Meshes.PushQuad(vertices, 0, 4, 5, 1, positions, indices);
        Meshes.PushQuad(vertices, 3, 7, 4, 0, positions, indices);
        Meshes.PushQuad(vertices, 2, 6, 7, 3, positions, indices);
        Meshes.PushQuad(vertices, 8, 10, 11, 9, positions, indices);
        Meshes.PushQuad(vertices, 5, 6, 11, 10, positions, indices);
        Meshes.PushQuad(vertices, 1, 8, 9, 2, positions, indices);
        Meshes.PushQuad(vertices, 1, 5, 10, 8, positions, indices);
        Meshes.PushQuad(vertices, 9, 11, 6, 2, positions, indices);
        for (var i = 0; i < width / 2; i++) {
            for (var k = 0; k < length; k++) {
                Meshes.PushSlot(i, height - 1, k, positions, indices);
            }
        }
        var normals = new Array();
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        slideData.positions = positions;
        slideData.indices = indices;
        slideData.normals = normals;
        return slideData;
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
        vertices[8] = new Array(-0.1, 1.1, -0.25);
        vertices[9] = new Array(0.1, 1.1, -0.25);
        vertices[10] = new Array(0.25, 1.1, -0.1);
        vertices[11] = new Array(0.25, 1.1, 0.1);
        vertices[12] = new Array(0.1, 1.1, 0.25);
        vertices[13] = new Array(-0.1, 1.1, 0.25);
        vertices[14] = new Array(-0.25, 1.1, 0.1);
        vertices[15] = new Array(-0.25, 1.1, -0.1);
        vertices[16] = new Array(0, 1.1, 0);
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
