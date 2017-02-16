var GameObject = (function () {
    function GameObject(pos, rot, ref, col) {
        this._id = GameObject.Id;
        GameObject.Id = GameObject.Id + 1;
        GameObject.Instances[this._id] = this;
        this._pos = pos;
        this._rot = rot;
        this._ref = ref;
        this._col = col;
        this.Initialize();
    }
    GameObject.prototype.getPos = function () {
        return this._pos;
    };
    GameObject.prototype.Initialize = function () {
        var lockFound = this.SetLockLocal();
        if (!lockFound) {
            alert("Unknown Ref " + this._ref + ", can't instantiate GameObject");
            return;
        }
        this.SetLockWorld();
        if (!this.CanLock()) {
            return;
        }
        var data = Meshes.List[this._ref];
        if (!data) {
            alert("Unknown Ref " + this._ref + ", can't instantiate GameObject");
            return;
        }
        var mat = Materials.List[this._col];
        if (!mat) {
            alert("Unknown Color " + this._col + ", can't instantiate GameObject");
            return;
        }
        this._mesh = BABYLON.MeshBuilder.CreateBox("GameObject_" + this._id, { size: 1 }, Game.Instance.getScene());
        this._mesh.position = this._pos;
        this._mesh.rotation = new BABYLON.Vector3(0, Math.PI / 2 * this._rot, 0);
        this._mesh.renderOutline = true;
        this._mesh.outlineWidth = 0.02;
        this._mesh.outlineColor = new BABYLON.Color3(0, 0, 0);
        data.applyToMesh(this._mesh);
        this._mesh.material = mat;
        this.Lock();
    };
    GameObject.prototype.SetLockLocal = function () {
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
    };
    GameObject.prototype.SetLockWorld = function () {
        this._lockWorld = new Array();
        var lockWorldVector = new Array();
        for (var i = 0; i < this._lockLocal.length; i++) {
            if (this._rot === 0) {
                lockWorldVector[i] = new BABYLON.Vector3(this._lockLocal[i].x, this._lockLocal[i].y, this._lockLocal[i].z);
            }
            if (this._rot === 1) {
                lockWorldVector[i] = new BABYLON.Vector3(this._lockLocal[i].z, this._lockLocal[i].y, -this._lockLocal[i].x);
            }
            else if (this._rot === 2) {
                lockWorldVector[i] = new BABYLON.Vector3(-this._lockLocal[i].x, this._lockLocal[i].y, -this._lockLocal[i].z);
            }
            else if (this._rot === 3) {
                lockWorldVector[i] = new BABYLON.Vector3(-this._lockLocal[i].z, this._lockLocal[i].y, this._lockLocal[i].x);
            }
        }
        for (var i = 0; i < lockWorldVector.length; i++) {
            lockWorldVector[i] = lockWorldVector[i].add(this._pos);
            this._lockWorld.push(lockWorldVector[i].x + "_" + lockWorldVector[i].y + "_" + lockWorldVector[i].z);
        }
        return true;
    };
    GameObject.prototype.CanLock = function () {
        for (var i = 0; i < this._lockWorld.length; i++) {
            if (GameObject.Locks.indexOf(this._lockWorld[i]) !== -1) {
                return false;
            }
        }
        return true;
    };
    GameObject.prototype.Lock = function () {
        for (var i = 0; i < this._lockWorld.length; i++) {
            if (GameObject.Locks.indexOf(this._lockWorld[i]) !== -1) {
                return;
            }
            GameObject.Locks.push(this._lockWorld[i]);
        }
    };
    GameObject.FindByMesh = function (mesh) {
        var idString = mesh.name.slice(11);
        var id = parseInt(idString, 10);
        if (id !== NaN) {
            return GameObject.Instances[id];
        }
        return null;
    };
    return GameObject;
}());
GameObject.Id = 0;
GameObject.Instances = new Array();
GameObject.Locks = new Array();
