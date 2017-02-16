var GameObject = (function () {
    function GameObject(pos, rot, ref) {
        this._id = GameObject.Id;
        GameObject.Id = GameObject.Id + 1;
        GameObject.Instances[this._id] = this;
        this._pos = pos;
        this._rot = rot;
        this._ref = ref;
        this.initialize();
    }
    GameObject.prototype.getPos = function () {
        return this._pos;
    };
    GameObject.prototype.initialize = function () {
        this._mesh = BABYLON.MeshBuilder.CreateBox("GameObject_" + this._id, { size: 1 }, Game.Instance.getScene());
        this._mesh.position = this._pos;
        this._mesh.renderOutline = true;
        this._mesh.outlineWidth = 0.02;
        this._mesh.outlineColor = new BABYLON.Color3(0, 0, 0);
        var data = Meshes.CreateSBar();
        data.applyToMesh(this._mesh);
        var mat = Materials.List[this._ref];
        if (mat) {
            this._mesh.material = mat;
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
