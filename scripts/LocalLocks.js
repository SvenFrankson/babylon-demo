var LocalLocks = (function () {
    function LocalLocks() {
    }
    LocalLocks.Initialize = function () {
        LocalLocks.List["cube"] = LocalLocks.CreateLocalLock(1, 3, 1);
        LocalLocks.List["s-bar"] = LocalLocks.CreateLocalLock(1, 3, 2);
        LocalLocks.List["m-bar"] = LocalLocks.CreateLocalLock(1, 3, 4);
        LocalLocks.List["l-bar"] = LocalLocks.CreateLocalLock(1, 3, 6);
        LocalLocks.List["xl-bar"] = LocalLocks.CreateLocalLock(1, 3, 8);
        LocalLocks.List["s-brick"] = LocalLocks.CreateLocalLock(2, 3, 2);
        LocalLocks.List["m-brick"] = LocalLocks.CreateLocalLock(2, 3, 4);
        LocalLocks.List["l-brick"] = LocalLocks.CreateLocalLock(2, 3, 6);
        LocalLocks.List["xl-brick"] = LocalLocks.CreateLocalLock(2, 3, 8);
        LocalLocks.List["square"] = LocalLocks.CreateLocalLock(1, 1, 1);
        LocalLocks.List["s-line"] = LocalLocks.CreateLocalLock(1, 1, 2);
        LocalLocks.List["m-line"] = LocalLocks.CreateLocalLock(1, 1, 4);
        LocalLocks.List["l-line"] = LocalLocks.CreateLocalLock(1, 1, 6);
        LocalLocks.List["xl-line"] = LocalLocks.CreateLocalLock(1, 1, 8);
        LocalLocks.List["s-plate"] = LocalLocks.CreateLocalLock(2, 1, 2);
        LocalLocks.List["m-plate"] = LocalLocks.CreateLocalLock(2, 1, 4);
        LocalLocks.List["l-plate"] = LocalLocks.CreateLocalLock(2, 1, 6);
        LocalLocks.List["xl-plate"] = LocalLocks.CreateLocalLock(2, 1, 8);
        LocalLocks.List["xs-slide"] = LocalLocks.CreateLocalLock(2, 3, 2);
        LocalLocks.List["s-slide"] = LocalLocks.CreateLocalLock(2, 3, 2);
        LocalLocks.List["m-slide"] = LocalLocks.CreateLocalLock(2, 3, 4);
        LocalLocks.List["l-slide"] = LocalLocks.CreateLocalLock(2, 3, 6);
        LocalLocks.List["xl-slide"] = LocalLocks.CreateLocalLock(2, 3, 8);
        LocalLocks.List["xs-barrel"] = LocalLocks.CreateLocalLock(1, 3, 1);
        LocalLocks.List["s-barrel"] = LocalLocks.CreateLocalLock(2, 3, 2);
        LocalLocks.List["ground"] = LocalLocks.CreateLocalLock(1, 1, 1);
    };
    LocalLocks.CreateLocalLock = function (width, height, length) {
        var lockLocal = [];
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                for (var k = 0; k < length; k++) {
                    lockLocal.push(new BABYLON.Vector3(i, j, k));
                }
            }
        }
        return lockLocal;
    };
    return LocalLocks;
}());
LocalLocks.List = new Array();
