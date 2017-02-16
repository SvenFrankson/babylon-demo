/// <reference path="../lib/babylon.2.4.d.ts"/>
class Meshes {

  /*private static PushTriangle(vertices : Array<Array<number>>,
                              a : number, b : number, c : number,
                              positions : Array<number>,
                              indices : Array<number>): void {
    positions.push.apply(vertices[a]);
    positions.push.apply(vertices[b]);
    positions.push.apply(vertices[c]);
    indices.push(a);
    indices.push(b);
    indices.push(c);
  }*/

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

  public static CreateCube(): BABYLON.VertexData {
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

    Meshes.PushQuad(vertices, 0, 1, 2, 3, positions, indices);
    Meshes.PushQuad(vertices, 1, 5, 6, 2, positions, indices);
    Meshes.PushQuad(vertices, 5, 4, 7, 6, positions, indices);
    Meshes.PushQuad(vertices, 0, 4, 5, 1, positions, indices);
    Meshes.PushQuad(vertices, 3, 7, 4, 0, positions, indices);
    Meshes.PushQuad(vertices, 2, 6, 7, 3, positions, indices);

    let normals : Array<number> = new Array<number>();
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);
    cubeData.positions = positions;
    cubeData.indices = indices;
    cubeData.normals = normals;

    return cubeData;
  }

  public static CreateSBar(): BABYLON.VertexData {
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

    Meshes.PushQuad(vertices, 0, 1, 2, 3, positions, indices);
    Meshes.PushQuad(vertices, 1, 5, 6, 2, positions, indices);
    Meshes.PushQuad(vertices, 5, 4, 7, 6, positions, indices);
    Meshes.PushQuad(vertices, 0, 4, 5, 1, positions, indices);
    Meshes.PushQuad(vertices, 3, 7, 4, 0, positions, indices);
    Meshes.PushQuad(vertices, 2, 6, 7, 3, positions, indices);

    let normals : Array<number> = new Array<number>();
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);
    cubeData.positions = positions;
    cubeData.indices = indices;
    cubeData.normals = normals;

    return cubeData;
  }
}
