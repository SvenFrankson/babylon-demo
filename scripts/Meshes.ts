/// <reference path="../lib/babylon.2.4.d.ts"/>
// get shared VertexData from exposed arrays.
// obviously not the easiest way to get shapes : mostly an attempt at complete procedural generation.
class Meshes {

  public static List : Array<BABYLON.VertexData> = new Array<BABYLON.VertexData>();

  static Initialize(): void {
    let dataNames : Array<string> = ["cube", "s-bar", "m-bar", "l-bar", "ground", "delete", "s-brick", "m-brick", "l-brick"];
    Meshes.List[dataNames[0]] = Meshes.CubeData();
    Meshes.List[dataNames[1]] = Meshes.SBarData();
    Meshes.List[dataNames[2]] = Meshes.MBarData();
    Meshes.List[dataNames[3]] = Meshes.LBarData();
    Meshes.List[dataNames[4]] = Meshes.GroundData();
    Meshes.List[dataNames[5]] = Meshes.CubeData();
    Meshes.List[dataNames[6]] = Meshes.SBrickData();
    Meshes.List[dataNames[7]] = Meshes.MBrickData();
    Meshes.List[dataNames[8]] = Meshes.LBrickData();
  }

  public static CubeData(): BABYLON.VertexData {
    let cubeData : BABYLON.VertexData = new BABYLON.VertexData();

    let vertices : Array<Array<number>> = new Array<Array<number>>();
    let positions : Array<number> = new Array<number>();
    let indices : Array<number> = new Array<number>();

    vertices[0] = new Array<number>(-0.5, -0.5, -0.5);
    vertices[1] = new Array<number>(0.5, -0.5, -0.5);
    vertices[2] = new Array<number>(0.5, -0.5, 0.5);
    vertices[3] = new Array<number>(-0.5, -0.5, 0.5);
    vertices[4] = new Array<number>(-0.5, 0.5, -0.5);
    vertices[5] = new Array<number>(0.5, 0.5, -0.5);
    vertices[6] = new Array<number>(0.5, 0.5, 0.5);
    vertices[7] = new Array<number>(-0.5, 0.5, 0.5);
    for (let i : number = 0; i < vertices.length; i++) {
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

    let normals : Array<number> = new Array<number>();
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);
    cubeData.positions = positions;
    cubeData.indices = indices;
    cubeData.normals = normals;

    return cubeData;
  }

  public static SBarData(): BABYLON.VertexData {
    let cubeData : BABYLON.VertexData = new BABYLON.VertexData();

    let vertices : Array<Array<number>> = new Array<Array<number>>();
    let positions : Array<number> = new Array<number>();
    let indices : Array<number> = new Array<number>();

    vertices[0] = new Array<number>(-0.5, -0.5, -0.5);
    vertices[1] = new Array<number>(0.5, -0.5, -0.5);
    vertices[2] = new Array<number>(0.5, -0.5, 1.5);
    vertices[3] = new Array<number>(-0.5, -0.5, 1.5);
    vertices[4] = new Array<number>(-0.5, 0.5, -0.5);
    vertices[5] = new Array<number>(0.5, 0.5, -0.5);
    vertices[6] = new Array<number>(0.5, 0.5, 1.5);
    vertices[7] = new Array<number>(-0.5, 0.5, 1.5);
    for (let i : number = 0; i < vertices.length; i++) {
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

    let normals : Array<number> = new Array<number>();
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);
    cubeData.positions = positions;
    cubeData.indices = indices;
    cubeData.normals = normals;

    return cubeData;
  }

  public static MBarData(): BABYLON.VertexData {
    let cubeData : BABYLON.VertexData = new BABYLON.VertexData();

    let vertices : Array<Array<number>> = new Array<Array<number>>();
    let positions : Array<number> = new Array<number>();
    let indices : Array<number> = new Array<number>();

    vertices[0] = new Array<number>(-0.5, -0.5, -0.5);
    vertices[1] = new Array<number>(0.5, -0.5, -0.5);
    vertices[2] = new Array<number>(0.5, -0.5, 3.5);
    vertices[3] = new Array<number>(-0.5, -0.5, 3.5);
    vertices[4] = new Array<number>(-0.5, 0.5, -0.5);
    vertices[5] = new Array<number>(0.5, 0.5, -0.5);
    vertices[6] = new Array<number>(0.5, 0.5, 3.5);
    vertices[7] = new Array<number>(-0.5, 0.5, 3.5);
    for (let i : number = 0; i < vertices.length; i++) {
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

    let normals : Array<number> = new Array<number>();
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);
    cubeData.positions = positions;
    cubeData.indices = indices;
    cubeData.normals = normals;

    return cubeData;
  }

  public static LBarData(): BABYLON.VertexData {
    let cubeData : BABYLON.VertexData = new BABYLON.VertexData();

    let vertices : Array<Array<number>> = new Array<Array<number>>();
    let positions : Array<number> = new Array<number>();
    let indices : Array<number> = new Array<number>();

    vertices[0] = new Array<number>(-0.5, -0.5, -0.5);
    vertices[1] = new Array<number>(0.5, -0.5, -0.5);
    vertices[2] = new Array<number>(0.5, -0.5, 7.5);
    vertices[3] = new Array<number>(-0.5, -0.5, 7.5);
    vertices[4] = new Array<number>(-0.5, 0.5, -0.5);
    vertices[5] = new Array<number>(0.5, 0.5, -0.5);
    vertices[6] = new Array<number>(0.5, 0.5, 7.5);
    vertices[7] = new Array<number>(-0.5, 0.5, 7.5);
    for (let i : number = 0; i < vertices.length; i++) {
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
    Meshes.PushSlot(0, 0, 4, positions, indices);
    Meshes.PushSlot(0, 0, 5, positions, indices);
    Meshes.PushSlot(0, 0, 6, positions, indices);
    Meshes.PushSlot(0, 0, 7, positions, indices);

    let normals : Array<number> = new Array<number>();
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);
    cubeData.positions = positions;
    cubeData.indices = indices;
    cubeData.normals = normals;

    return cubeData;
  }

  public static GroundData(): BABYLON.VertexData {
    let cubeData : BABYLON.VertexData = new BABYLON.VertexData();

    let vertices : Array<Array<number>> = new Array<Array<number>>();
    let positions : Array<number> = new Array<number>();
    let indices : Array<number> = new Array<number>();

    vertices[0] = new Array<number>(-10.5, -0.5, -10.5);
    vertices[1] = new Array<number>(10.5, -0.5, -10.5);
    vertices[2] = new Array<number>(10.5, -0.5, 10.5);
    vertices[3] = new Array<number>(-10.5, -0.5, 10.5);
    vertices[4] = new Array<number>(-10.5, 0.5, -10.5);
    vertices[5] = new Array<number>(10.5, 0.5, -10.5);
    vertices[6] = new Array<number>(10.5, 0.5, 10.5);
    vertices[7] = new Array<number>(-10.5, 0.5, 10.5);
    for (let i : number = 0; i < vertices.length; i++) {
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

    for (let i : number = -10; i <= 10; i++) {
      for (let k : number = -10; k <= 10; k++) {
        Meshes.PushSlot(i, 0, k, positions, indices);
      }
    }

    let normals : Array<number> = new Array<number>();
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);
    cubeData.positions = positions;
    cubeData.indices = indices;
    cubeData.normals = normals;

    return cubeData;
  }

  public static SBrickData(): BABYLON.VertexData {
    let cubeData : BABYLON.VertexData = new BABYLON.VertexData();

    let vertices : Array<Array<number>> = new Array<Array<number>>();
    let positions : Array<number> = new Array<number>();
    let indices : Array<number> = new Array<number>();

    vertices[0] = new Array<number>(-0.5, -0.5, -0.5);
    vertices[1] = new Array<number>(1.5, -0.5, -0.5);
    vertices[2] = new Array<number>(1.5, -0.5, 1.5);
    vertices[3] = new Array<number>(-0.5, -0.5, 1.5);
    vertices[4] = new Array<number>(-0.5, 0.5, -0.5);
    vertices[5] = new Array<number>(1.5, 0.5, -0.5);
    vertices[6] = new Array<number>(1.5, 0.5, 1.5);
    vertices[7] = new Array<number>(-0.5, 0.5, 1.5);
    for (let i : number = 0; i < vertices.length; i++) {
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
    Meshes.PushSlot(1, 0, 0, positions, indices);
    Meshes.PushSlot(1, 0, 1, positions, indices);

    let normals : Array<number> = new Array<number>();
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);
    cubeData.positions = positions;
    cubeData.indices = indices;
    cubeData.normals = normals;

    return cubeData;
  }

  public static MBrickData(): BABYLON.VertexData {
    let cubeData : BABYLON.VertexData = new BABYLON.VertexData();

    let vertices : Array<Array<number>> = new Array<Array<number>>();
    let positions : Array<number> = new Array<number>();
    let indices : Array<number> = new Array<number>();

    vertices[0] = new Array<number>(-0.5, -0.5, -0.5);
    vertices[1] = new Array<number>(1.5, -0.5, -0.5);
    vertices[2] = new Array<number>(1.5, -0.5, 3.5);
    vertices[3] = new Array<number>(-0.5, -0.5, 3.5);
    vertices[4] = new Array<number>(-0.5, 0.5, -0.5);
    vertices[5] = new Array<number>(1.5, 0.5, -0.5);
    vertices[6] = new Array<number>(1.5, 0.5, 3.5);
    vertices[7] = new Array<number>(-0.5, 0.5, 3.5);
    for (let i : number = 0; i < vertices.length; i++) {
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
    Meshes.PushSlot(1, 0, 0, positions, indices);
    Meshes.PushSlot(1, 0, 1, positions, indices);
    Meshes.PushSlot(0, 0, 2, positions, indices);
    Meshes.PushSlot(0, 0, 3, positions, indices);
    Meshes.PushSlot(1, 0, 2, positions, indices);
    Meshes.PushSlot(1, 0, 3, positions, indices);

    let normals : Array<number> = new Array<number>();
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);
    cubeData.positions = positions;
    cubeData.indices = indices;
    cubeData.normals = normals;

    return cubeData;
  }

  public static LBrickData(): BABYLON.VertexData {
    let cubeData : BABYLON.VertexData = new BABYLON.VertexData();

    let vertices : Array<Array<number>> = new Array<Array<number>>();
    let positions : Array<number> = new Array<number>();
    let indices : Array<number> = new Array<number>();

    vertices[0] = new Array<number>(-0.5, -0.5, -0.5);
    vertices[1] = new Array<number>(1.5, -0.5, -0.5);
    vertices[2] = new Array<number>(1.5, -0.5, 7.5);
    vertices[3] = new Array<number>(-0.5, -0.5, 7.5);
    vertices[4] = new Array<number>(-0.5, 0.5, -0.5);
    vertices[5] = new Array<number>(1.5, 0.5, -0.5);
    vertices[6] = new Array<number>(1.5, 0.5, 7.5);
    vertices[7] = new Array<number>(-0.5, 0.5, 7.5);
    for (let i : number = 0; i < vertices.length; i++) {
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
    Meshes.PushSlot(1, 0, 0, positions, indices);
    Meshes.PushSlot(1, 0, 1, positions, indices);
    Meshes.PushSlot(0, 0, 2, positions, indices);
    Meshes.PushSlot(0, 0, 3, positions, indices);
    Meshes.PushSlot(1, 0, 2, positions, indices);
    Meshes.PushSlot(1, 0, 3, positions, indices);
    Meshes.PushSlot(0, 0, 4, positions, indices);
    Meshes.PushSlot(0, 0, 5, positions, indices);
    Meshes.PushSlot(1, 0, 4, positions, indices);
    Meshes.PushSlot(1, 0, 5, positions, indices);
    Meshes.PushSlot(0, 0, 6, positions, indices);
    Meshes.PushSlot(0, 0, 7, positions, indices);
    Meshes.PushSlot(1, 0, 6, positions, indices);
    Meshes.PushSlot(1, 0, 7, positions, indices)

    let normals : Array<number> = new Array<number>();
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);
    cubeData.positions = positions;
    cubeData.indices = indices;
    cubeData.normals = normals;

    return cubeData;
  }
  // tool method to add a lego plug on top of the brick.
  private static PushSlot(x : number, y : number, z : number,
                          positions : Array<number>,
                          indices : Array<number>): void {
    let vertices : Array<Array<number>> = new Array<Array<number>>();

    vertices[0] = new Array<number>(-0.1, 0.5, -0.25);
    vertices[1] = new Array<number>(0.1, 0.5, -0.25);
    vertices[2] = new Array<number>(0.25, 0.5, -0.1);
    vertices[3] = new Array<number>(0.25, 0.5, 0.1);
    vertices[4] = new Array<number>(0.1, 0.5, 0.25);
    vertices[5] = new Array<number>(-0.1, 0.5, 0.25);
    vertices[6] = new Array<number>(-0.25, 0.5, 0.1);
    vertices[7] = new Array<number>(-0.25, 0.5, -0.1);
    vertices[8] = new Array<number>(-0.1, 0.7, -0.25);
    vertices[9] = new Array<number>(0.1, 0.7, -0.25);
    vertices[10] = new Array<number>(0.25, 0.7, -0.1);
    vertices[11] = new Array<number>(0.25, 0.7, 0.1);
    vertices[12] = new Array<number>(0.1, 0.7, 0.25);
    vertices[13] = new Array<number>(-0.1, 0.7, 0.25);
    vertices[14] = new Array<number>(-0.25, 0.7, 0.1);
    vertices[15] = new Array<number>(-0.25, 0.7, -0.1);
    vertices[16] = new Array<number>(0, 0.7, 0);
    for (let i : number = 0; i < vertices.length; i++) {
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
  }

  // tool method to add a mesh triangle.
  private static PushTriangle(vertices : Array<Array<number>>,
                          a : number, b : number, c : number,
                          positions : Array<number>,
                          indices : Array<number>): void {
    let index : number = positions.length / 3;
    for (let n in vertices[a]) {
      if (vertices[a] != null) {
        positions.push(vertices[a][n]);
      }
    }
    for (let n in vertices[b]) {
      if (vertices[b] != null) {
        positions.push(vertices[b][n]);
      }
    }
    for (let n in vertices[c]) {
      if (vertices[c] != null) {
        positions.push(vertices[c][n]);
      }
    }
    indices.push(index);
    indices.push(index + 1);
    indices.push(index + 2);
  }

  // tool method to add two triangles forming a mesh quad.
  private static PushQuad(vertices : Array<Array<number>>,
                          a : number, b : number, c : number, d : number,
                          positions : Array<number>,
                          indices : Array<number>): void {
    let index : number = positions.length / 3;
    for (let n in vertices[a]) {
      if (vertices[a] != null) {
        positions.push(vertices[a][n]);
      }
    }
    for (let n in vertices[b]) {
      if (vertices[b] != null) {
        positions.push(vertices[b][n]);
      }
    }
    for (let n in vertices[c]) {
      if (vertices[c] != null) {
        positions.push(vertices[c][n]);
      }
    }
    for (let n in vertices[d]) {
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
  }
}
