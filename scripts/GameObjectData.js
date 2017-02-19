var GameObjectData = (function () {
    function GameObjectData() {
    }
    GameObjectData.prototype.SetFromGameObject = function (g) {
        this.posX = g.GetPos().x;
        this.posY = g.GetPos().y;
        this.posZ = g.GetPos().z;
        this.rot = g.GetRot();
        this.ref = g.GetRef();
        this.col = g.GetCol();
    };
    return GameObjectData;
}());
window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("save").addEventListener("click", function () {
        document.getElementById("json-datas").innerHTML = GameObject.InstancesToJSON();
    });
});
