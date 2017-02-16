/// <reference path="../lib/babylon.2.4.d.ts"/>
class GameObject {
  private static Id: number = 0;
  private static Instances: Array<GameObject> = new Array<GameObject>();
  private _id: number;
  private _pos: BABYLON.Vector3;
  getPos() {
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

    this._mesh = BABYLON.MeshBuilder.CreateBox('GameObject_' + this._id, {size: 1}, Game.Instance.getScene());
    this._mesh.position = this._pos;
  }

  public static FindByMesh(mesh: BABYLON.AbstractMesh) {
    let idString = mesh.name.slice(11);
    let id = parseInt(idString);
    if (id != NaN) {
      return GameObject.Instances[id];
    }
    return null;
  }
}
