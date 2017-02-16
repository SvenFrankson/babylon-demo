/// <reference path="../lib/babylon.2.4.d.ts"/>
class GameObject {
  private static Id: number = 0;
  private static Instances: Array<GameObject> = new Array<GameObject>();
  private _id: number;
  private _pos: BABYLON.Vector3;
  getPos(): BABYLON.Vector3 {
    return this._pos;
  }
  private _rot: number;
  private _ref: string;
  private _col: string;
  private _mesh: BABYLON.Mesh;

  constructor(pos: BABYLON.Vector3, rot: number, ref: string, col : string) {
    this._id = GameObject.Id;
    GameObject.Id = GameObject.Id + 1;
    GameObject.Instances[this._id] = this;

    this._pos = pos;
    this._rot = rot;
    this._ref = ref;
    this._col = col;

    this.Initialize();
  }

  private Initialize(): void {
    let data : BABYLON.VertexData = Meshes.List[this._ref];
    if (!data) {
      alert("Unknown Data " + this._ref + ", can't instantiate GameObject");
      return;
    }
    let mat : BABYLON.Material = Materials.List[this._col];
    if (!mat) {
      alert("Unknown Color " + this._col + ", can't instantiate GameObject");
      return;
    }
    this._mesh = BABYLON.MeshBuilder.CreateBox("GameObject_" + this._id, {size: 1}, Game.Instance.getScene());
    this._mesh.position = this._pos;
    this._mesh.rotation = new BABYLON.Vector3(0, Math.PI / 2 * this._rot, 0);
    this._mesh.renderOutline = true;
    this._mesh.outlineWidth = 0.02;
    this._mesh.outlineColor = new BABYLON.Color3(0, 0, 0);

    data.applyToMesh(this._mesh);
    this._mesh.material = mat;
  }

  public static FindByMesh(mesh: BABYLON.AbstractMesh): GameObject {
    let idString : string = mesh.name.slice(11);
    let id : number = parseInt(idString, 10);
    if (id !== NaN) {
      return GameObject.Instances[id];
    }
    return null;
  }
}
