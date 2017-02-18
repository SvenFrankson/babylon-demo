var LocalLocks = (function () {
    function LocalLocks() {
    }
    LocalLocks.Initialize = function () {
        var dataNames = ["cube", "s-bar", "m-bar", "l-bar", "ground"];
        for (var i = 0; i < dataNames.length; i++) {
            LocalLocks.List[dataNames[i]] = LocalLocks.GetLocalLock(dataNames[i]);
        }
    };
    LocalLocks.GetLocalLock = function (ref) {
        var lockLocal = null;
        if (ref === "cube") {
            lockLocal = [
                new BABYLON.Vector3(0, 0, 0)
            ];
        }
        else if (ref === "s-bar") {
            lockLocal = [
                new BABYLON.Vector3(0, 0, 0),
                new BABYLON.Vector3(0, 0, 1)
            ];
        }
        else if (ref === "m-bar") {
            lockLocal = [
                new BABYLON.Vector3(0, 0, 0),
                new BABYLON.Vector3(0, 0, 1),
                new BABYLON.Vector3(0, 0, 2),
                new BABYLON.Vector3(0, 0, 3)
            ];
        }
        else if (ref === "ground") {
            lockLocal = [];
            for (var i = 10; i <= 10; i++) {
                for (var k = 10; k <= 10; k++) {
                    lockLocal.push(new BABYLON.Vector3(i, 0, k));
                }
            }
        }
        return lockLocal;
    };
    return LocalLocks;
}());
LocalLocks.List = new Array();
