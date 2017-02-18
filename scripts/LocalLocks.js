var LocalLocks = (function () {
    function LocalLocks() {
    }
    LocalLocks.Initialize = function () {
        var dataNames = ["cube", "s-bar", "m-bar", "l-bar", "ground", "delete", "s-brick", "m-brick", "l-brick"];
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
        else if (ref === "l-bar") {
            lockLocal = [
                new BABYLON.Vector3(0, 0, 0),
                new BABYLON.Vector3(0, 0, 1),
                new BABYLON.Vector3(0, 0, 2),
                new BABYLON.Vector3(0, 0, 3),
                new BABYLON.Vector3(0, 0, 4),
                new BABYLON.Vector3(0, 0, 5),
                new BABYLON.Vector3(0, 0, 6),
                new BABYLON.Vector3(0, 0, 7)
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
        else if (ref === "delete") {
            lockLocal = [];
        }
        else if (ref === "s-brick") {
            lockLocal = [];
            for (var i = 0; i <= 1; i++) {
                for (var k = 0; k <= 1; k++) {
                    lockLocal.push(new BABYLON.Vector3(i, 0, k));
                }
            }
        }
        else if (ref === "m-brick") {
            lockLocal = [];
            for (var i = 0; i <= 1; i++) {
                for (var k = 0; k <= 3; k++) {
                    lockLocal.push(new BABYLON.Vector3(i, 0, k));
                }
            }
        }
        else if (ref === "l-brick") {
            lockLocal = [];
            for (var i = 0; i <= 1; i++) {
                for (var k = 0; k <= 7; k++) {
                    lockLocal.push(new BABYLON.Vector3(i, 0, k));
                }
            }
        }
        return lockLocal;
    };
    return LocalLocks;
}());
LocalLocks.List = new Array();
