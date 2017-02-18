/// <reference path="../lib/babylon.2.4.d.ts"/>
class GameObject {
  private static Id: number = 0;
  private static Instances: Array<GameObject> = new Array<GameObject>();
  // list all locks taken by activate gameobjects.
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
  private _disposable : boolean;

  constructor(pos: BABYLON.Vector3, rot: number, ref: string, col : string, disposable : boolean = true, isEditor : boolean = false) {
    if (!isEditor) {
      this._id = GameObject.Id;
      GameObject.Id = GameObject.Id + 1;
      GameObject.Instances[this._id] = this;
    } else {
      this._id = -1;
    }

    this._pos = pos;
    this._rot = rot;
    this._ref = ref;
    this._col = col;
    this._disposable = disposable;

    this.Initialize(disposable, isEditor);
  }

  private Initialize(disposable : boolean, isEditor : boolean): void {
    // load information concerning GameObject lock
    if (!isEditor) {
      this._lockLocal = LocalLocks.List[this._ref];
      if (!this._lockLocal) {
        alert("Lock : Unknown Ref " + this._ref + ", can't instantiate GameObject");
        return;
      }
      this.SetLockWorld();
      // check if mesh will fit
      if (!this.CanLock()) {
        return;
      }
    }
    let data : BABYLON.VertexData = Meshes.List[this._ref];
    if (!data) {
      alert("Data : Unknown Ref " + this._ref + ", can't instantiate GameObject");
      return;
    }
    let mat : BABYLON.Material = null;
    if (!isEditor) {
      mat = Materials.List[this._col];
    } else {
      mat = Materials.ListEditor[this._col];
    }
    if (!mat) {
      alert("Unknown Color " + this._col + ", can't instantiate GameObject");
      return;
    }
    if (!isEditor) {
      this._mesh = new BABYLON.Mesh("GameObject_" + this._id, Game.Instance.getScene());
      this._mesh.position = this._pos.multiply(Data.XYZSize());
    } else {
      this._mesh = new BABYLON.Mesh("GameObject_" + this._id, EditorPreview.Instance.getScene());
      this._mesh.position = new BABYLON.Vector3(0, 0, 0);
    }
    this._mesh.rotation = new BABYLON.Vector3(0, Math.PI / 2 * this._rot, 0);
    this._mesh.renderOutline = true;
    this._mesh.outlineWidth = 0.02;
    this._mesh.outlineColor = new BABYLON.Color3(0, 0, 0);

    data.applyToMesh(this._mesh);
    this._mesh.material = mat;
    if (!isEditor) {
      this.Lock();
    }

    // run animation
    let anim : BABYLON.Animation = new BABYLON.Animation(
      "popup",
      "scaling",
      60,
      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    let keys : Array<{frame : number, value : BABYLON.Vector3}> = new Array<{frame : number, value : BABYLON.Vector3}>();
    keys.push({
      frame: 0,
      value: new BABYLON.Vector3(0.1, 0.1, 0.1)
    });
    keys.push({
      frame: 10,
      value: new BABYLON.Vector3(1, 1, 1)
    });
    anim.setKeys(keys);
    this._mesh.animations.push(anim);
    Game.Instance.getScene().beginAnimation(this._mesh, 0, 10, true);
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

  // check if all locks can be taken.
  // having all locks free means the GameObject has enough space to be put in the scene.
  private CanLock(): boolean {
    for (let i : number = 0; i < this._lockWorld.length; i++) {
      if (GameObject.Locks.indexOf(this._lockWorld[i]) !== -1) {
        return false;
      }
    }
    return true;
  }

  // take all locks for the gameObject.
  // call CanLock() before to check if all locks are free to be taken.
  // returns false if a lock had already been taken.
  private Lock(): boolean {
    let ok : boolean = true;
    for (let i : number = 0; i < this._lockWorld.length; i++) {
      if (GameObject.Locks.indexOf(this._lockWorld[i]) === -1) {
        GameObject.Locks.push(this._lockWorld[i]);
      } else {
        ok = false;
      }
    }
    return ok;
  }

  // release all locks for the gameObject.
  private Unlock(): void {
    if (this._lockWorld) {
      for (let i : number = 0; i < this._lockWorld.length; i++) {
        let index : number = GameObject.Locks.indexOf(this._lockWorld[i]);
        if (index !== -1) {
          GameObject.Locks.splice(index, 1);
        }
      }
    }
  }

  public Dispose(): void {
    if (this._disposable) {
      this.Unlock();
      this._mesh.dispose();
      delete this;
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
