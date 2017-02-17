var Game = (function () {
    function Game(canvasElement) {
        Game.Instance = this;
        this._canvas = document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
    }
    Game.prototype.getCanvas = function () {
        return this._canvas;
    };
    Game.prototype.getScene = function () {
        return this._scene;
    };
    Game.prototype.getCamera = function () {
        return this._camera;
    };
    Game.prototype.createScene = function () {
        this._scene = new BABYLON.Scene(this._engine);
        this._camera = new BABYLON.ArcRotateCamera("camera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this._scene);
        this._camera.setTarget(BABYLON.Vector3.Zero());
        this._camera.attachControl(this._canvas, false);
        this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);
        BABYLON.MeshBuilder.CreateGround("ground1", { width: 6, height: 6, subdivisions: 2 }, this._scene);
    };
    Game.prototype.animate = function () {
        var _this = this;
        this._engine.runRenderLoop(function () {
            _this._scene.render();
        });
        window.addEventListener("resize", function () {
            _this._engine.resize();
        });
    };
    return Game;
}());
window.addEventListener("DOMContentLoaded", function () {
    var game = new Game("renderCanvas");
    game.createScene();
    game.animate();
    var editorPreview = new EditorPreview("renderCanvasEditorPreview");
    editorPreview.createScene();
    editorPreview.animate();
    Materials.Initialize();
    Meshes.Initialize();
    Editor.setPreview();
    new GameObject(new BABYLON.Vector3(0, 0, 0), 0, "cube", "red");
    new GameObject(new BABYLON.Vector3(1, 0, 0), 0, "s-bar", "green");
    new GameObject(new BABYLON.Vector3(0, 1, 0), 0, "cube", "blue");
});
