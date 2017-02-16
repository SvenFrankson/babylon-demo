/// <reference path="../lib/babylon.2.4.d.ts"/>
class GameObject {
  private static Id: number = 0;
  private static Instances: Array<GameObject> = new Array<GameObject>();
  private static Locks: Array<string> = new Array<string>();
  private _id: number;
  private _pos: BABYLON.Vector3;
  getPos(): BABYLON.Vector3 {
    return this._pos;
  }
  private _rot: number;
  private _ref: string;
  private _col: string;
  private _mesh: BABYLON.Mesh;
  private _lockLocal : Array<BABYLON.Vector3>;
  private _lockWorld : Array<string>;

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
    // load information concerning GameObject lock
    let lockFound : boolean = this.SetLockLocal();
    if (!lockFound) {
      alert("Unknown Ref " + this._ref + ", can't instantiate GameObject");
      return;
    }
    this.SetLockWorld();
    // check if mesh will fit
    if (!this.CanLock()) {
      return;
    }
    let data : BABYLON.VertexData = Meshes.List[this._ref];
    if (!data) {
      alert("Unknown Ref " + this._ref + ", can't instantiate GameObject");
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
    this.Lock();
  }

  private SetLockLocal(): boolean {
    if (this._ref === "cube") {
      this._lockLocal = [
        new BABYLON.Vector3(0, 0, 0)
      ];
      return true;
    }
    if (this._ref === "s-bar") {
      this._lockLocal = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(0, 0, 1)
      ];
      return true;
    }
    return false;
  }

  private SetLockWorld(): boolean {
    this._lockWorld = new Array<string>();
    let lockWorldVector : Array<BABYLON.Vector3> = new Array<BABYLON.Vector3>();
    for (let i : number = 0; i < this._lockLocal.length; i++) {
      if (this._rot === 0) {
        lockWorldVector[i] = new BABYLON.Vector3(this._lockLocal[i].x, this._lockLocal[i].y, this._lockLocal[i].z);
      }
      if (this._rot === 1) {
        lockWorldVector[i] = new BABYLON.Vector3(this._lockLocal[i].z, this._lockLocal[i].y, -this._lockLocal[i].x);
      } else if (this._rot === 2) {
        lockWorldVector[i] = new BABYLON.Vector3(-this._lockLocal[i].x, this._lockLocal[i].y, -this._lockLocal[i].z);
      } else if (this._rot === 3) {
        lockWorldVector[i] = new BABYLON.Vector3(-this._lockLocal[i].z, this._lockLocal[i].y, this._lockLocal[i].x);
      }
    }

    for (let i : number = 0; i < lockWorldVector.length; i++) {
      lockWorldVector[i] = lockWorldVector[i].add(this._pos);
      this._lockWorld.push(lockWorldVector[i].x + "_" + lockWorldVector[i].y + "_" + lockWorldVector[i].z);
    }
    return true;
  }

  private CanLock(): boolean {
    for (let i : number = 0; i < this._lockWorld.length; i++) {
      if (GameObject.Locks.indexOf(this._lockWorld[i]) !== -1) {
        return false;
      }
    }
    return true;
  }

  private Lock(): void {
    for (let i : number = 0; i < this._lockWorld.length; i++) {
      if (GameObject.Locks.indexOf(this._lockWorld[i]) !== -1) {
        return;
      }
      GameObject.Locks.push(this._lockWorld[i]);
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
