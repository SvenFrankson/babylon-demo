var Editor = (function () {
    function Editor() {
    }
    Editor.setRef = function (ref) {
        Editor._ref = ref;
        Editor._preview.Dispose();
        Editor.setPreview();
    };
    Editor.setColor = function (col) {
        Editor._color = col;
        Editor._preview.Dispose();
        Editor.setPreview();
    };
    Editor.rotate = function () {
        Editor._rot += 1;
        Editor._rot = Editor._rot % 4;
        Editor._preview.Dispose();
        Editor.setPreview();
    };
    Editor.setPreview = function () {
        Editor._preview = new GameObject(new BABYLON.Vector3(0, 0, 0), Editor._rot, Editor._ref, Editor._color, true, true);
    };
    Editor.OnClick = function (evt) {
        var coordinates = Editor.GetRelativeMousePos(evt);
        if (Editor._ref !== "delete") {
            Editor.CreateGameObjectAtPos(coordinates);
        }
        else {
            Editor.DisposeGameObjectAtPos(coordinates);
        }
    };
    Editor.GetRelativeMousePos = function (evt) {
        var canvas = Game.Instance.getCanvas();
        var coordinates = {
            x: evt.clientX - canvas.getBoundingClientRect().left,
            y: evt.clientY - canvas.getBoundingClientRect().top
        };
        return coordinates;
    };
    Editor.CreateGameObjectAtPos = function (coordinates) {
        var pickResult = Game.Instance.getScene().pick(coordinates.x, coordinates.y);
        if (pickResult.hit) {
            var mesh = pickResult.pickedMesh;
            if (mesh) {
                if (mesh.name.indexOf("GameObject_") === 0) {
                    var gameObject = GameObject.FindByMesh(mesh);
                    if (gameObject) {
                        var newPos = Editor.GetCoordinates(pickResult.pickedPoint);
                        new GameObject(newPos, Editor._rot, Editor._ref, Editor._color);
                    }
                }
            }
        }
    };
    ;
    Editor.DisposeGameObjectAtPos = function (coordinates) {
        var pickResult = Game.Instance.getScene().pick(coordinates.x, coordinates.y);
        if (pickResult.hit) {
            var mesh = pickResult.pickedMesh;
            if (mesh) {
                if (mesh.name.indexOf("GameObject_") === 0) {
                    var gameObject = GameObject.FindByMesh(mesh);
                    gameObject.Dispose();
                }
            }
        }
    };
    ;
    Editor.GetCoordinates = function (hitPos) {
        hitPos = hitPos.divide(Data.XYZSize());
        var epsilon = BABYLON.Vector3.Normalize(hitPos.subtract(Game.Instance.getCamera().position));
        epsilon = epsilon.multiplyByFloats(0.1, 0.1, 0.1);
        var pos = hitPos;
        pos = hitPos.subtract(epsilon);
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
    document.getElementById("yellow").addEventListener("click", function () {
        Editor.setColor("yellow");
    });
    document.getElementById("rotate").addEventListener("click", function () {
        Editor.rotate();
    });
    document.getElementById("delete").addEventListener("click", function () {
        Editor.setRef("delete");
    });
    document.getElementById("cube").addEventListener("click", function () {
        Editor.setRef("cube");
    });
    document.getElementById("s-bar").addEventListener("click", function () {
        Editor.setRef("s-bar");
    });
    document.getElementById("m-bar").addEventListener("click", function () {
        Editor.setRef("m-bar");
    });
    document.getElementById("l-bar").addEventListener("click", function () {
        Editor.setRef("l-bar");
    });
    document.getElementById("s-brick").addEventListener("click", function () {
        Editor.setRef("s-brick");
    });
    document.getElementById("m-brick").addEventListener("click", function () {
        Editor.setRef("m-brick");
    });
    document.getElementById("l-brick").addEventListener("click", function () {
        Editor.setRef("l-brick");
    });
});
