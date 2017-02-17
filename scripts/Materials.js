var Materials = (function () {
    function Materials() {
    }
    Materials.Initialize = function () {
        var colorNames = ["red", "green", "blue"];
        Materials.List[colorNames[0]] = new BABYLON.StandardMaterial(colorNames[0], Game.Instance.getScene());
        Materials.List[colorNames[0]].diffuseColor = new BABYLON.Color3(1.0, 0, 0);
        Materials.List[colorNames[1]] = new BABYLON.StandardMaterial(colorNames[1], Game.Instance.getScene());
        Materials.List[colorNames[1]].diffuseColor = new BABYLON.Color3(0, 1.0, 0);
        Materials.List[colorNames[2]] = new BABYLON.StandardMaterial(colorNames[2], Game.Instance.getScene());
        Materials.List[colorNames[2]].diffuseColor = new BABYLON.Color3(0, 0, 1.0);
        Materials.ListEditor[colorNames[0]] = new BABYLON.StandardMaterial(colorNames[0], EditorPreview.Instance.getScene());
        Materials.ListEditor[colorNames[0]].diffuseColor = new BABYLON.Color3(1.0, 0, 0);
        Materials.ListEditor[colorNames[1]] = new BABYLON.StandardMaterial(colorNames[1], EditorPreview.Instance.getScene());
        Materials.ListEditor[colorNames[1]].diffuseColor = new BABYLON.Color3(0, 1.0, 0);
        Materials.ListEditor[colorNames[2]] = new BABYLON.StandardMaterial(colorNames[2], EditorPreview.Instance.getScene());
        Materials.ListEditor[colorNames[2]].diffuseColor = new BABYLON.Color3(0, 0, 1.0);
        alert("Materials initialized");
    };
    return Materials;
}());
Materials.List = new Array();
Materials.ListEditor = new Array();
