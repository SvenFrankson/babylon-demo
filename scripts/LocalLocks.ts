/// <reference path="../lib/babylon.2.4.d.ts"/>
// get locallock foreach GameObject ref.
// see SvenFrankson github wiki for informations about locallock concept.
class LocalLocks {

  public static List: Array<Array<BABYLON.Vector3>> = new Array<Array<BABYLON.Vector3>>();

  static Initialize(): void {
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

      LocalLocks.List["corner-slide"] = LocalLocks.CreateLocalLock(2, 3, 2);
      LocalLocks.List["xs-slide"] = LocalLocks.CreateLocalLock(2, 3, 1);
      LocalLocks.List["s-slide"] = LocalLocks.CreateLocalLock(2, 3, 2);
      LocalLocks.List["m-slide"] = LocalLocks.CreateLocalLock(2, 3, 4);
      LocalLocks.List["l-slide"] = LocalLocks.CreateLocalLock(2, 3, 6);
      LocalLocks.List["xl-slide"] = LocalLocks.CreateLocalLock(2, 3, 8);

      LocalLocks.List["corner-edge"] = LocalLocks.CreateLocalLock(2, 6, 2);
      LocalLocks.List["xs-edge"] = LocalLocks.CreateLocalLock(2, 6, 1);
      LocalLocks.List["s-edge"] = LocalLocks.CreateLocalLock(2, 6, 2);
      LocalLocks.List["m-edge"] = LocalLocks.CreateLocalLock(2, 6, 4);
      LocalLocks.List["l-edge"] = LocalLocks.CreateLocalLock(2, 6, 6);
      LocalLocks.List["xl-edge"] = LocalLocks.CreateLocalLock(2, 6, 8);

      LocalLocks.List["xs-barrel"] = LocalLocks.CreateLocalLock(1, 3, 1);
      LocalLocks.List["s-barrel"] = LocalLocks.CreateLocalLock(2, 3, 2);

      LocalLocks.List["flame"] = LocalLocks.CreateLocalLock(1, 9, 1);

      LocalLocks.List["ground"] = LocalLocks.CreateLocalLock(1, 1, 1);
  }

  private static CreateLocalLock(
    width: number,
    height: number,
    length: number
  ): Array<BABYLON.Vector3> {
    let lockLocal: Array<BABYLON.Vector3> = [];
    for (let i: number = 0; i < width; i++) {
      for (let j: number = 0; j < height; j++) {
        for (let k: number = 0; k < length; k++) {
          lockLocal.push(new BABYLON.Vector3(i, j, k));
        }
      }
    }
    return lockLocal;
  }
}
