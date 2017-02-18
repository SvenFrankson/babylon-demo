/// <reference path="../lib/babylon.2.4.d.ts"/>
// deals with adding/removing elements according to user's inputs.
class Editor {

  private static _ref : string = "cube";
  public static setRef(ref : string): void {
    Editor._ref = ref;
    Editor._preview.Dispose();
    Editor.setPreview();
  }

  private static _color : string = "red";
  public static setColor(col : string): void {
    Editor._color = col;
    Editor._preview.Dispose();
    Editor.setPreview();
  }

  private static _rot : number = 0;
  public static rotate(): void {
    Editor._rot += 1;
    Editor._rot = Editor._rot % 4;
    Editor._preview.Dispose();
    Editor.setPreview();
  }

  // instance of GameObject showing the current properties values (shown in the EditorPreview canvas)
  public static _preview : GameObject;
  public static setPreview(): void {
    Editor._preview = new GameObject(new BABYLON.Vector3(0, 0, 0), Editor._rot, Editor._ref, Editor._color, true, true);
  }

  public static OnClick(evt : MouseEvent): void {
    let coordinates : {x : number, y : number} = Editor.GetRelativeMousePos(evt);
    if (Editor._ref !== "delete") {
      Editor.CreateGameObjectAtPos(coordinates);
    } else {
      Editor.DisposeGameObjectAtPos(coordinates);
    }
  }

  // if not in full screen, mouse position has to be offseted to reflect useful canvas coordinates.
  public static GetRelativeMousePos(evt: MouseEvent): {x : number, y : number} {
    let canvas : HTMLCanvasElement = Game.Instance.getCanvas();
    let coordinates : {x : number, y : number} = {
      x : evt.clientX - canvas.getBoundingClientRect().left,
      y : evt.clientY - canvas.getBoundingClientRect().top
    };
    return coordinates;
  }

  // do all checks before instantiating a GameObject
  public static CreateGameObjectAtPos(coordinates : {x : number, y : number}): void {
    var pickResult : BABYLON.PickingInfo = Game.Instance.getScene().pick(coordinates.x, coordinates.y);
    // if clic hits an object.
    if (pickResult.hit) {
      let mesh : BABYLON.AbstractMesh = pickResult.pickedMesh;
      // if clic hits a mesh.
      if (mesh) {
        // if Mesh is a GameObject.
        if (mesh.name.indexOf("GameObject_") === 0) {
          let gameObject : GameObject = GameObject.FindByMesh(mesh);
          // if GameObject has been found.
          if (gameObject) {
            let newPos : BABYLON.Vector3 = Editor.GetCoordinates(pickResult.pickedPoint);
            new GameObject(newPos, Editor._rot, Editor._ref, Editor._color);
          }
        }
      }
    }
  };

  // do all checks and dispose picked GameObject
  public static DisposeGameObjectAtPos(coordinates : {x : number, y : number}): void {
    var pickResult : BABYLON.PickingInfo = Game.Instance.getScene().pick(coordinates.x, coordinates.y);
    // if clic hits an object.
    if (pickResult.hit) {
      let mesh : BABYLON.AbstractMesh = pickResult.pickedMesh;
      // if clic hits a mesh.
      if (mesh) {
        // if Mesh is a GameObject.
        if (mesh.name.indexOf("GameObject_") === 0) {
          let gameObject : GameObject = GameObject.FindByMesh(mesh);
          gameObject.Dispose();
        }
      }
    }
  };

  // given a clic position.
  // returns the most likely desired position for creating a new GameObject.
  // note : as no mesh normal is available easily, might send slightly unexpected result when hit is close to element edges.
  private static GetCoordinates(hitPos: BABYLON.Vector3): BABYLON.Vector3 {
    hitPos = hitPos.divide(Data.XYZSize());
    let epsilon : BABYLON.Vector3 = BABYLON.Vector3.Normalize(hitPos.subtract(Game.Instance.getCamera().position));
    epsilon = epsilon.multiplyByFloats(0.1, 0.1, 0.1);
    let pos : BABYLON.Vector3 = hitPos;
    pos = hitPos.subtract(epsilon);
    pos.x = Math.round(pos.x);
    pos.y = Math.round(pos.y);
    pos.z = Math.round(pos.z);

    return pos;
  }
}

// add interface listeners to take input from DOM.
window.addEventListener("click", Editor.OnClick);
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("red").addEventListener("click", () => {
    Editor.setColor("red");
  });
  document.getElementById("green").addEventListener("click", () => {
    Editor.setColor("green");
  });
  document.getElementById("blue").addEventListener("click", () => {
    Editor.setColor("blue");
  });
  document.getElementById("yellow").addEventListener("click", () => {
    Editor.setColor("yellow");
  });
  document.getElementById("rotate").addEventListener("click", () => {
    Editor.rotate();
  });
  document.getElementById("delete").addEventListener("click", () => {
    Editor.setRef("delete");
  });
  document.getElementById("cube").addEventListener("click", () => {
    Editor.setRef("cube");
  });
  document.getElementById("s-bar").addEventListener("click", () => {
    Editor.setRef("s-bar");
  });
  document.getElementById("m-bar").addEventListener("click", () => {
    Editor.setRef("m-bar");
  });
  document.getElementById("l-bar").addEventListener("click", () => {
    Editor.setRef("l-bar");
  });
  document.getElementById("s-brick").addEventListener("click", () => {
    Editor.setRef("s-brick");
  });
  document.getElementById("m-brick").addEventListener("click", () => {
    Editor.setRef("m-brick");
  });
  document.getElementById("l-brick").addEventListener("click", () => {
    Editor.setRef("l-brick");
  });
});
