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
  private _mesh: BABYLON.Mesh;

  constructor(pos: BABYLON.Vector3, rot: number, ref: string) {
    this._id = GameObject.Id;
    GameObject.Id = GameObject.Id + 1;
    GameObject.Instances[this._id] = this;

    this._pos = pos;
    this._rot = rot;
    this._ref = ref;

    this.initialize();
  }

  private initialize(): void {
    this._mesh = BABYLON.MeshBuilder.CreateBox("GameObject_" + this._id, {size: 1}, Game.Instance.getScene());
    this._mesh.position = this._pos;
    this._mesh.renderOutline = true;
    this._mesh.outlineWidth = 0.02;
    this._mesh.outlineColor = new BABYLON.Color3(0, 0, 0);

    let mat : BABYLON.Material = Materials.List[this._ref];
    if (mat) {
      this._mesh.material = mat;
    }
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
