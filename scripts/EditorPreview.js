var EditorPreview = (function () {
    function EditorPreview(canvasElement) {
        EditorPreview.Instance = this;
        this._canvas = document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
    }
    EditorPreview.prototype.getCanvas = function () {
        return this._canvas;
    };
    EditorPreview.prototype.getScene = function () {
        return this._scene;
    };
    EditorPreview.prototype.createScene = function () {
        this._scene = new BABYLON.Scene(this._engine);
        this._camera = new BABYLON.ArcRotateCamera("editor-preview-camera", 1, 0.8, 5, new BABYLON.Vector3(0, 0, 0), this._scene);
        this._camera.setTarget(new BABYLON.Vector3(0, 0.9, 0));
        this._camera.attachControl(this._canvas, false);
        this._light = new BABYLON.HemisphericLight("light-preview-camera", new BABYLON.Vector3(0, 1, 0), this._scene);
    };
    EditorPreview.prototype.animate = function () {
        var _this = this;
        this._engine.runRenderLoop(function () {
            _this._scene.render();
            _this._camera.alpha = Game.Instance.getCamera().alpha;
            _this._camera.beta = Game.Instance.getCamera().beta;
        });
        window.addEventListener("resize", function () {
            _this._engine.resize();
        });
    };
    return EditorPreview;
}());
