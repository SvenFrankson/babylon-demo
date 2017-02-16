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
                        var newGameObject = new GameObject(newPos, 0, "noRef");
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
                offset = new BABYLON.Vector3(1, 0, 0);
            }
            else {
                offset = new BABYLON.Vector3(-1, 0, 0);
            }
        }
        else if (Y >= X && Y >= Z) {
            if (offset.y >= 0) {
                offset = new BABYLON.Vector3(0, 1, 0);
            }
            else {
                offset = new BABYLON.Vector3(0, -1, 0);
            }
        }
        else if (Z >= X && Z >= Y) {
            if (offset.z >= 0) {
                offset = new BABYLON.Vector3(0, 0, 1);
            }
            else {
                offset = new BABYLON.Vector3(0, 0, -1);
            }
        }
        return targetPos.add(offset);
    };
    return Editor;
}());
window.addEventListener('click', Editor.OnClick);
