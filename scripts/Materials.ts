/// <reference path="../lib/babylon.2.4.d.ts"/>
// get shared materials from the exposed arrays.
class Materials {
  public static List : Array<BABYLON.Material> = new Array<BABYLON.Material>();
  public static ListEditor : Array<BABYLON.Material> = new Array<BABYLON.Material>();

  static Initialize(): void {
    let colorNames : Array<string> = ["red", "green", "blue", "yellow"];
    Materials.List[colorNames[0]] = new BABYLON.StandardMaterial(colorNames[0], Game.Instance.getScene());
    Materials.List[colorNames[0]].diffuseColor = new BABYLON.Color3(1.0, 0, 0);
    Materials.List[colorNames[1]] = new BABYLON.StandardMaterial(colorNames[1], Game.Instance.getScene());
    Materials.List[colorNames[1]].diffuseColor = new BABYLON.Color3(0, 1.0, 0);
    Materials.List[colorNames[2]] = new BABYLON.StandardMaterial(colorNames[2], Game.Instance.getScene());
    Materials.List[colorNames[2]].diffuseColor = new BABYLON.Color3(0, 0, 1.0);
    Materials.List[colorNames[3]] = new BABYLON.StandardMaterial(colorNames[3], Game.Instance.getScene());
    Materials.List[colorNames[3]].diffuseColor = new BABYLON.Color3(1.0, 1.0, 0);

    Materials.ListEditor[colorNames[0]] = new BABYLON.StandardMaterial(colorNames[0], EditorPreview.Instance.getScene());
    Materials.ListEditor[colorNames[0]].diffuseColor = new BABYLON.Color3(1.0, 0, 0);
    Materials.ListEditor[colorNames[1]] = new BABYLON.StandardMaterial(colorNames[1], EditorPreview.Instance.getScene());
    Materials.ListEditor[colorNames[1]].diffuseColor = new BABYLON.Color3(0, 1.0, 0);
    Materials.ListEditor[colorNames[2]] = new BABYLON.StandardMaterial(colorNames[2], EditorPreview.Instance.getScene());
    Materials.ListEditor[colorNames[2]].diffuseColor = new BABYLON.Color3(0, 0, 1.0);
    Materials.ListEditor[colorNames[3]] = new BABYLON.StandardMaterial(colorNames[3], EditorPreview.Instance.getScene());
    Materials.ListEditor[colorNames[3]].diffuseColor = new BABYLON.Color3(1.0, 1.0, 0);
  }
}
