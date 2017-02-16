var Editor = (function () {
    function Editor() {
    }
    Editor.setRef = function (ref) {
        Editor._ref = ref;
    };
    Editor.setColor = function (col) {
        Editor._color = col;
    };
    Editor.rotate = function () {
        Editor._rot += 1;
        Editor._rot = Editor._rot % 4;
    };
    Editor.OnClick = function (evt) {
        Editor.GetRelativeMousePos(evt, Editor.PutMeshAtPos);
    };
    Editor.GetRelativeMousePos = function (evt, callback) {
        var canvas = Game.Instance.getCanvas();
        var x = evt.clientX;
        var y = evt.clientY;
        x -= canvas.getBoundingClientRect().left;
        y -= canvas.getBoundingClientRect().top;
        callback(x, y);
    };
    Editor.PutMeshAtPos = function (x, y) {
        var pickResult = Game.Instance.getScene().pick(x, y);
        if (pickResult.hit) {
            var mesh = pickResult.pickedMesh;
            if (mesh) {
                if (mesh.name.indexOf("GameObject_") === 0) {
                    var gameObject = GameObject.FindByMesh(mesh);
                    if (gameObject) {
                        var newPos = Editor.GetCreatePos(gameObject.getPos(), pickResult.pickedPoint);
                        new GameObject(newPos, Editor._rot, Editor._ref, Editor._color);
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
Editor._ref = "cube";
Editor._color = "red";
Editor._rot = 0;
window.addEventListener("click", Editor.OnClick);
window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("red").addEventListener("click", function () {
        Editor.setColor("red");
    });
    document.getElementById("green").addEventListener("click", function () {
        Editor.setColor("green");
    });
    document.getElementById("blue").addEventListener("click", function () {
        Editor.setColor("blue");
    });
    document.getElementById("rotate").addEventListener("click", function () {
        Editor.rotate();
    });
    document.getElementById("cube").addEventListener("click", function () {
        Editor.setRef("cube");
    });
    document.getElementById("s-bar").addEventListener("click", function () {
        Editor.setRef("s-bar");
    });
});
