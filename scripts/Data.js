var Data = (function () {
    function Data() {
    }
    Data.XYZSize = function () {
        return new BABYLON.Vector3(Data.XSize, Data.YSize, Data.ZSize);
    };
    return Data;
}());
Data.XSize = 0.7;
Data.YSize = 0.9;
Data.ZSize = 0.7;
