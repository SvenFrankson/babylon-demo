var GameObjectData = (function () {
    function GameObjectData() {
    }
    GameObjectData.prototype.SetFromGameObject = function (g) {
        this.id = g.GetId();
        this.posX = g.GetPos().x;
        this.posY = g.GetPos().y;
        this.posZ = g.GetPos().z;
        this.rot = g.GetRot();
        this.ref = g.GetRef();
        this.col = g.GetCol();
    };
    return GameObjectData;
}());
