/// <reference path="../lib/babylon.2.4.d.ts"/>
// get locallock foreach GameObject ref.
// see SvenFrankson github wiki for informations about locallock concept.
class LocalLocks {

  public static List : Array<Array<BABYLON.Vector3>> = new Array<Array<BABYLON.Vector3>>();

  static Initialize(): void {
    let dataNames : Array<string> = ["cube", "s-bar", "m-bar", "l-bar", "ground"];
    for (let i : number = 0; i < dataNames.length; i++) {
      LocalLocks.List[dataNames[i]] = LocalLocks.GetLocalLock(dataNames[i]);
    }
  }

  private static GetLocalLock(ref : string): Array<BABYLON.Vector3> {
    let lockLocal : Array<BABYLON.Vector3> = null;
    if (ref === "cube") {
      lockLocal = [
        new BABYLON.Vector3(0, 0, 0)
      ];
    } else if (ref === "s-bar") {
      lockLocal = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(0, 0, 1)
      ];
    } else if (ref === "m-bar") {
      lockLocal = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(0, 0, 1),
        new BABYLON.Vector3(0, 0, 2),
        new BABYLON.Vector3(0, 0, 3)
      ];
    } else if (ref === "ground") {
      lockLocal = [];
      for (let i : number = 10; i <= 10; i++) {
        for (let k : number = 10; k <= 10; k++) {
          lockLocal.push(new BABYLON.Vector3(i, 0, k));
        }
      }
    }
    return lockLocal;
  }
}
