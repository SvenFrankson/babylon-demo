var GameObject = (function () {
    function GameObject(pos, rot, ref) {
        this._id = GameObject.Id;
        GameObject.Id = GameObject.Id + 1;
        GameObject.Instances[this._id] = this;
        this._pos = pos;
        this._rot = rot;
        this._ref = ref;
        this._mesh = BABYLON.MeshBuilder.CreateBox('GameObject_' + this._id, { size: 1 }, Game.Instance.getScene());
        this._mesh.position = this._pos;
    }
    GameObject.prototype.getPos = function () {
        return this._pos;
    };
    GameObject.FindByMesh = function (mesh) {
        var idString = mesh.name.slice(11);
        var id = parseInt(idString);
        if (id != NaN) {
            return GameObject.Instances[id];
        }
        return null;
    };
    return GameObject;
}());
GameObject.Id = 0;
GameObject.Instances = new Array();
