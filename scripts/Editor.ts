/// <reference path="../lib/babylon.2.4.d.ts"/>
class Editor {

  public static OnClick(evt) {
    var pickResult = Game.Instance.getScene().pick(evt.clientX, evt.clientY);
    // If clic hits an object.
    if (pickResult.hit) {
      let mesh = pickResult.pickedMesh;
      // If clic hits a mesh.
      if (mesh) {
        // If Mesh is a GameObject.
        if (mesh.name.indexOf("GameObject_") === 0) {
          let gameObject = GameObject.FindByMesh(mesh);
          // If GameObject has been found.
          if (gameObject) {
            let newPos = Editor.GetCreatePos(gameObject.getPos(), pickResult.pickedPoint);
            let newGameObject = new GameObject(newPos, 0, "noRef");
          }
        }
      }
    }
  };

  // Given an object position and a clic position.
  // Returns the most likely desired position for creating a new GameObject.
  private static GetCreatePos(targetPos: BABYLON.Vector3, hitPos: BABYLON.Vector3) {
    let offset = hitPos.subtract(targetPos);
    let X = Math.abs(offset.x);
    let Y = Math.abs(offset.y);
    let Z = Math.abs(offset.z);

    // Set offset to be a 'up, down, right, left, front or back' unit Vector.
    if (X >= Y && X >= Z) {
      if (offset.x >= 0) {
        offset = new BABYLON.Vector3(1, 0, 0);
      }
      else {
        offset = new BABYLON.Vector3(-1, 0, 0);
      }
    }
    else if (Y >= X && Y >= Z) {
      if (offset.y >= 0) {
        offset = new BABYLON.Vector3(0, 1, 0);
      }
      else {
        offset = new BABYLON.Vector3(0, -1, 0);
      }
    }
    else if (Z >= X && Z >= Y) {
      if (offset.z >= 0) {
        offset = new BABYLON.Vector3(0, 0, 1);
      }
      else {
        offset = new BABYLON.Vector3(0, 0, -1);
      }
    }

    return targetPos.add(offset);
  }
}

window.addEventListener('click', Editor.OnClick);
