var Materials = (function () {
    function Materials() {
    }
    Materials.Initialize = function () {
        Materials.AddColor("White", "#FFFFFF");
        Materials.AddColor("Grey", "#808080");
        Materials.AddColor("Yellow", "#FFFF00");
        Materials.AddColor("Red", "#FF0000");
        Materials.AddColor("Lime", "#00FF00");
        Materials.AddColor("Blue", "#0000FF");
        Materials.AddColor("OrangeRed", "#FF4500");
        Materials.AddColor("Violet", "#EE82EE");
        Materials.AddColor("Purple", "#800080");
        Materials.AddColor("MediumTurquoise", "#48D1CC");
        Materials.AddColor("RoyalBlue", "#4169E1");
        Materials.AddColor("Navy", "#000080");
        Materials.AddColor("GreenYellow", "#ADFF2F");
        Materials.AddColor("Green", "#008000");
        Materials.AddColor("Chocolate", "#D2691E");
    };
    Materials.AddColor = function (name, hexColor) {
        var red = parseInt(hexColor.substr(1, 2), 16) / 255.0;
        var green = parseInt(hexColor.substr(3, 2), 16) / 255.0;
        var blue = parseInt(hexColor.substr(5, 2), 16) / 255.0;
        Materials.List[name] = new BABYLON.StandardMaterial(name, Game.Instance.getScene());
        Materials.List[name].diffuseColor = new BABYLON.Color3(red, green, blue);
        Materials.ListEditor[name] = new BABYLON.StandardMaterial(name, EditorPreview.Instance.getScene());
        Materials.ListEditor[name].diffuseColor = new BABYLON.Color3(red, green, blue);
    };
    return Materials;
}());
Materials.List = new Array();
Materials.ListEditor = new Array();
