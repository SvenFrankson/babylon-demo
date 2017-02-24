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
        Editor._cursor.Dispose();
    };
    Editor.setPreview = function () {
        Editor._preview = new GameObject(new BABYLON.Vector3(0, 0, 0), Editor._rot, Editor._ref, Editor._color, true, true);
    };
    Editor.setCursor = function () {
        if (Editor._cursor) {
            Editor._cursor.Dispose();
        }
        Editor._cursor = new GameObject(Editor._cursorPos, Editor._rot, Editor._ref, Editor._color, true, false, true);
    };
    Editor.disposeCursor = function () {
        if (Editor._cursor) {
            Editor._cursor.Dispose();
        }
    };
    Editor.OnKeyDown = function (evt) {
        if (evt.code === "KeyR") {
            Editor.rotate();
        }
    };
    Editor.OnClick = function (evt) {
        Editor.disposeCursor();
        if (evt.button === 0) {
            var coordinates = Editor.GetRelativeMousePos(evt);
            if (Editor._ref !== "delete") {
                Editor.CreateGameObjectAtPos(coordinates);
            }
            else {
                Editor.DisposeGameObjectAtPos(coordinates);
            }
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
                        console.log("Create GameObject");
                        new GameObject(Editor._cursorPos, Editor._rot, Editor._ref, Editor._color);
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
                var gameObject = GameObject.FindByMesh(mesh);
                gameObject.Dispose();
            }
        }
    };
    ;
    Editor.OnMouseOver = function (evt) {
        var coordinates = Editor.GetRelativeMousePos(evt);
        if (Editor._ref !== "delete") {
            Editor.CreateCursorAtPos(coordinates);
        }
    };
    Editor.CreateCursorAtPos = function (coordinates) {
        var pickResult = Game.Instance.getScene().pick(coordinates.x, coordinates.y);
        if (pickResult.hit) {
            var mesh = pickResult.pickedMesh;
            if (mesh) {
                if (mesh.name.indexOf("GameObject_") === 0) {
                    var gameObject = GameObject.FindByMesh(mesh);
                    if (gameObject) {
                        if (gameObject.GetId() !== -1) {
                            Editor._cursorPos = Editor.GetCoordinates(pickResult.pickedPoint);
                            Editor.setCursor();
                        }
                    }
                }
            }
        }
        else {
            Editor.disposeCursor();
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
    Editor.LoadJSONDescription = function () {
        var jsonDescription = document.getElementById("load-input-content").value;
        alert(jsonDescription);
        GameObject.InstantiateFromJSON(jsonDescription);
    };
    return Editor;
}());
Editor._ref = "cube";
Editor._color = "Red";
Editor._rot = 0;
Editor._cursorPos = new BABYLON.Vector3(0, 0, 0);
window.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("keydown", Editor.OnKeyDown);
    document.getElementById("renderCanvas").addEventListener("click", Editor.OnClick);
    document.getElementById("load-input-btn").addEventListener("click", Editor.LoadJSONDescription);
    document.getElementById("renderCanvas").addEventListener("mousemove", Editor.OnMouseOver);
    document.getElementById("renderCanvas").addEventListener("mouseout", function () {
        Editor.disposeCursor();
    });
    var colors = document.getElementsByClassName("colorpicker");
    var _loop_1 = function (i) {
        var htmlColor = colors[i];
        htmlColor.style.backgroundColor = htmlColor.id;
        htmlColor.addEventListener("click", function () {
            Editor.setColor(htmlColor.id);
        });
    };
    for (var i = 0; i < colors.length; i++) {
        _loop_1(i);
    }
    var shapes = document.getElementsByClassName("shape-picker");
    var _loop_2 = function (i) {
        var htmlShape = shapes[i];
        htmlShape.addEventListener("click", function () {
            Editor.setRef(htmlShape.id);
        });
    };
    for (var i = 0; i < shapes.length; i++) {
        _loop_2(i);
    }
    document.getElementById("rotate").addEventListener("click", function () {
        Editor.rotate();
    });
    document.getElementById("delete").addEventListener("click", function () {
        Editor.setRef("delete");
    });
});
