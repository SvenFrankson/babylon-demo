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
        var data = Meshes.List[this._ref];
        if (!data) {
            alert("Unknown Data " + this._ref + ", can't instantiate GameObject");
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
