class GameObject {
  private static Id: number = 0;
  private _id: number;
  private _pos: BABYLON.Vector3;
  private _rot: number;
  private _ref: string;
  private _mesh: BABYLON.Mesh;

  constructor(pos: BABYLON.Vector3, rot: number, ref: string) {
    this._id = GameObject.Id;
    GameObject.Id = GameObject.Id + 1;
    this._pos = pos;
    this._rot = rot;
    this._ref = ref;

    this._mesh = BABYLON.MeshBuilder.CreateBox('mesh_' + this._id, {size: 1}, Game.Instance.getScene());
    this._mesh.position = this._pos;
    this._mesh.position.y += 0.5;
  }
}
