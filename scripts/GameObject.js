var GameObject = (function () {
    function GameObject(pos, rot, ref) {
        this._id = GameObject.Id;
        GameObject.Id = GameObject.Id + 1;
        this._pos = pos;
        this._rot = rot;
        this._ref = ref;
        this._mesh = BABYLON.MeshBuilder.CreateBox('mesh_' + this._id, { size: 1 }, Game.Instance.getScene());
        this._mesh.position = this._pos;
        this._mesh.position.y += 0.5;
    }
    return GameObject;
}());
GameObject.Id = 0;
