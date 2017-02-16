var Editor = (function () {
    function Editor() {
    }
    Editor.OnClick = function (evt) {
        var pickResult = Game.Instance.getScene().pick(evt.clientX, evt.clientY);
        if (pickResult.hit) {
            var mesh = pickResult.pickedMesh;
            if (mesh) {
                if (mesh.name.indexOf("GameObject_") === 0) {
                    var gameObject = GameObject.FindByMesh(mesh);
                    if (gameObject) {
                        var newPos = Editor.GetCreatePos(gameObject.getPos(), pickResult.pickedPoint);
                        new GameObject(newPos, 0, "noRef");
                    }
                }
            }
        }
    };
    ;
    Editor.GetCreatePos = function (targetPos, hitPos) {
        var offset = hitPos.subtract(targetPos);
        var X = Math.abs(offset.x);
        var Y = Math.abs(offset.y);
        var Z = Math.abs(offset.z);
        if (X >= Y && X >= Z) {
            if (offset.x >= 0) {
                offset = new BABYLON.Vector3(0.5, 0, 0);
            }
            else {
                offset = new BABYLON.Vector3(-0.5, 0, 0);
            }
        }
        else if (Y >= X && Y >= Z) {
            if (offset.y >= 0) {
                offset = new BABYLON.Vector3(0, 0.5, 0);
            }
            else {
                offset = new BABYLON.Vector3(0, -0.5, 0);
            }
        }
        else if (Z >= X && Z >= Y) {
            if (offset.z >= 0) {
                offset = new BABYLON.Vector3(0, 0, 0.5);
            }
            else {
                offset = new BABYLON.Vector3(0, 0, -0.5);
            }
        }
        var pos = hitPos.add(offset);
        pos.x = Math.round(pos.x);
        pos.y = Math.round(pos.y);
        pos.z = Math.round(pos.z);
        return pos;
    };
    return Editor;
}());
window.addEventListener("click", Editor.OnClick);
