var GameObject = (function () {
    function GameObject(pos, rot, ref, col, disposable, isEditor, isCursor) {
        if (disposable === void 0) { disposable = true; }
        if (isEditor === void 0) { isEditor = false; }
        if (isCursor === void 0) { isCursor = false; }
        this._pos = pos;
        this._rot = rot;
        this._ref = ref;
        this._col = col;
        this._disposable = disposable;
        this._isCursor = isCursor;
        this.Initialize(disposable, isEditor, isCursor);
    }
    GameObject.prototype.GetId = function () {
        return this._id;
    };
    GameObject.prototype.GetPos = function () {
        return this._pos;
    };
    GameObject.prototype.GetRot = function () {
        return this._rot;
    };
    GameObject.prototype.GetRef = function () {
        return this._ref;
    };
    GameObject.prototype.GetCol = function () {
        return this._col;
    };
    GameObject.prototype.IsCursor = function () {
        return this._isCursor;
    };
    GameObject.GameObjectFromData = function (data) {
        return new GameObject(new BABYLON.Vector3(data.posX, data.posY, data.posZ), data.rot, data.ref, data.col);
    };
    GameObject.prototype.Initialize = function (disposable, isEditor, isCursor) {
        if (!isEditor && !isCursor) {
            this._lockLocal = LocalLocks.List[this._ref];
            if (!this._lockLocal) {
                alert("Lock: Unknown Ref " + this._ref + ", can't instantiate GameObject");
                return;
            }
            this.SetLockWorld();
            if (!this.CanLock()) {
                return;
            }
        }
        if (!isEditor && !isCursor) {
            this._id = GameObject.Id;
            GameObject.Id = GameObject.Id + 1;
            GameObject.Instances[this._id] = this;
        }
        else {
            this._id = -1;
        }
        var data = Meshes.List[this._ref];
        if (!data) {
            alert("Data: Unknown Ref " + this._ref + ", can't instantiate GameObject");
            return;
        }
        var mat = null;
        if (isEditor) {
            mat = Materials.ListEditor[this._col];
        }
        else if (isCursor) {
            mat = Materials.List[this._col];
        }
        else {
            mat = Materials.List[this._col];
        }
        if (!mat) {
            alert("Unknown Color " + this._col + ", can't instantiate GameObject");
            return;
        }
        if (isCursor) {
            this._mesh = new BABYLON.Mesh("Cursor", Game.Instance.getScene());
            this._mesh.position = this._pos.multiply(Data.XYZSize());
        }
        else if (isEditor) {
            this._mesh = new BABYLON.Mesh("Preview", EditorPreview.Instance.getScene());
            this._mesh.position = new BABYLON.Vector3(0, 0, 0);
        }
        else {
            this._mesh = new BABYLON.Mesh("GameObject_" + this._id, Game.Instance.getScene());
            this._mesh.position = this._pos.multiply(Data.XYZSize());
        }
        this._mesh.rotation = new BABYLON.Vector3(0, Math.PI / 2 * this._rot, 0);
        this._mesh.renderOutline = true;
        this._mesh.outlineWidth = 0.02;
        this._mesh.outlineColor = new BABYLON.Color3(0, 0, 0);
        data.applyToMesh(this._mesh);
        this._mesh.material = mat;
        if (!isEditor && !isCursor) {
            this.Lock();
        }
        if (!isCursor) {
            var anim = new BABYLON.Animation("popup", "scaling", 60, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            var keys = new Array();
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
        var ok = true;
        for (var i = 0; i < this._lockWorld.length; i++) {
            if (GameObject.Locks.indexOf(this._lockWorld[i]) === -1) {
                GameObject.Locks.push(this._lockWorld[i]);
            }
            else {
                ok = false;
            }
        }
        return ok;
    };
    GameObject.prototype.Unlock = function () {
        if (this._lockWorld) {
            for (var i = 0; i < this._lockWorld.length; i++) {
                var index = GameObject.Locks.indexOf(this._lockWorld[i]);
                if (index !== -1) {
                    GameObject.Locks.splice(index, 1);
                }
            }
        }
    };
    GameObject.prototype.Dispose = function () {
        if (this._disposable) {
            this.Unlock();
            this._mesh.dispose();
            delete GameObject.Instances[this.GetId()];
            delete this;
        }
    };
    GameObject.FindByMesh = function (mesh) {
        var idString = mesh.name.slice(11);
        var id = parseInt(idString, 10);
        console.log(id);
        if (id !== NaN) {
            return GameObject.Instances[id];
        }
        return null;
    };
    GameObject.InstancesToJSON = function () {
        var datas = new Array();
        for (var i = 0; i < GameObject.Instances.length; i++) {
            var g = GameObject.Instances[i];
            if (g) {
                var data = new GameObjectData();
                data.SetFromGameObject(g);
                datas.push(data);
            }
        }
        return JSON.stringify(datas);
    };
    return GameObject;
}());
GameObject.Id = 0;
GameObject.Instances = new Array();
GameObject.Locks = new Array();
