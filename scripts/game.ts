/// <reference path="../lib/babylon.2.4.d.ts"/>
class Game {

  public static Instance: Game;
  private _canvas: HTMLCanvasElement;
  getCanvas(): HTMLCanvasElement {
    return this._canvas;
  }
  private _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  getScene(): BABYLON.Scene {
    return this._scene;
  }
  private _camera: BABYLON.ArcRotateCamera;
  getCamera(): BABYLON.ArcRotateCamera {
    return this._camera;
  }
  private _light: BABYLON.Light;

  constructor(canvasElement: string) {
    Game.Instance = this;
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  createScene(): void {
    this._scene = new BABYLON.Scene(this._engine);

    this._camera = new BABYLON.ArcRotateCamera("camera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this._scene);
    this._camera.setTarget(BABYLON.Vector3.Zero());
    this._camera.attachControl(this._canvas, false);
    this._camera.wheelPrecision = 10;

    this._light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this._scene);
    this._light.diffuse = new BABYLON.Color3(1, 1, 1);
    this._light.specular = new BABYLON.Color3(1, 1, 1);
  }

  animate(): void {
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });

    window.addEventListener("resize", () => {
      this._engine.resize();
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  let game : Game = new Game("renderCanvas");
  game.createScene();
  game.animate();
  let editorPreview : EditorPreview = new EditorPreview("renderCanvasEditorPreview");
  editorPreview.createScene();
  editorPreview.animate();
  Materials.Initialize();
  Meshes.Initialize();
  LocalLocks.Initialize();
  Editor.setPreview();

  new GameObject(new BABYLON.Vector3(0, -1, 0), 0, "ground", "Lime", false);
  //GameObject.InstantiateFromJSON('[{"id":0,"posX":0,"posY":-1,"posZ":0,"rot":0,"ref":"ground","col":"Lime"},{"id":1,"posX":0,"posY":-1,"posZ":0,"rot":0,"ref":"ground","col":"Lime"},{"id":2,"posX":-1,"posY":0,"posZ":0,"rot":0,"ref":"m-bar","col":"Blue"},{"id":3,"posX":2,"posY":0,"posZ":0,"rot":0,"ref":"m-bar","col":"Blue"},{"id":4,"posX":-1,"posY":1,"posZ":0,"rot":1,"ref":"m-bar","col":"Blue"},{"id":5,"posX":-1,"posY":1,"posZ":3,"rot":1,"ref":"m-bar","col":"Blue"},{"id":7,"posX":2,"posY":2,"posZ":3,"rot":2,"ref":"m-bar","col":"Red"},{"id":8,"posX":2,"posY":3,"posZ":0,"rot":3,"ref":"m-bar","col":"Red"},{"id":9,"posX":2,"posY":3,"posZ":3,"rot":3,"ref":"m-bar","col":"Red"},{"id":10,"posX":-1,"posY":4,"posZ":0,"rot":0,"ref":"m-bar","col":"Yellow"},{"id":12,"posX":-1,"posY":5,"posZ":0,"rot":1,"ref":"m-bar","col":"Yellow"},{"id":13,"posX":-1,"posY":5,"posZ":3,"rot":1,"ref":"m-bar","col":"Yellow"},{"id":15,"posX":2,"posY":6,"posZ":3,"rot":2,"ref":"m-bar","col":"Lime"},{"id":16,"posX":2,"posY":7,"posZ":0,"rot":3,"ref":"m-bar","col":"Lime"},{"id":17,"posX":2,"posY":7,"posZ":3,"rot":3,"ref":"m-bar","col":"Lime"},{"id":18,"posX":-1,"posY":6,"posZ":0,"rot":0,"ref":"l-bar","col":"Yellow"},{"id":19,"posX":2,"posY":4,"posZ":3,"rot":2,"ref":"l-bar","col":"Red"},{"id":20,"posX":-1,"posY":2,"posZ":0,"rot":0,"ref":"l-bar","col":"Blue"}]');
});
