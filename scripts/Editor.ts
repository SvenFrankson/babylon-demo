/// <reference path="../lib/babylon.2.4.d.ts"/>
// deals with adding/removing elements according to user's inputs.
class Editor {

  private static readonly frameDelay = 3;
  private static frameCountSinceLastInstantiation = 0;
  private static pendingGameObject: Array<GameObjectData> = new Array<GameObjectData>();

  private static _ref: string = "cube";
  public static setRef(ref: string): void {
    Editor._ref = ref;
    Editor._preview.Dispose();
    Editor.setPreview();
  }

  private static _color: string = "Red";
  public static setColor(col: string): void {
    Editor._color = col;
    Editor._preview.Dispose();
    Editor.setPreview();
  }

  private static _rot: number = 0;
  public static rotate(): void {
    Editor._rot += 1;
    Editor._rot = Editor._rot % 4;
    Editor._preview.Dispose();
    Editor.setPreview();
    Editor._cursor.Dispose();
  }

  // instance of GameObject showing the current properties values (shown in the EditorPreview canvas)
  public static _preview: GameObject;
  public static setPreview(): void {
    Editor._preview = new GameObject(new BABYLON.Vector3(0, 0, 0), Editor._rot, Editor._ref, Editor._color, true, true);
  }

  // instance of GameObject showing the current properties values (shown in the main canvas)
  private static _cursorPos: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 0);
  public static _cursor: GameObject;
  public static setCursor(): void {
    if (Editor._cursor) {
      Editor._cursor.Dispose();
    }
    Editor._cursor = new GameObject(Editor._cursorPos, Editor._rot, Editor._ref, Editor._color, true, false, true);
  }
  public static disposeCursor(): void {
    if (Editor._cursor) {
      Editor._cursor.Dispose();
    }
  }

  public static OnKeyDown(evt: KeyboardEvent): void {
    if (evt.code === "KeyR") {
      Editor.rotate();
    }
  }

  public static OnClick(evt: MouseEvent): void {
    Editor.disposeCursor();
    if (evt.button === 0) {
      let coordinates: {x: number, y: number} = Editor.GetRelativeMousePos(evt);
      if (Editor._ref !== "delete") {
        Editor.CreateGameObjectAtPos(coordinates);
      } else {
        Editor.DisposeGameObjectAtPos(coordinates);
      }
    }
  }

  // if not in full screen, mouse position has to be offseted to reflect useful canvas coordinates.
  public static GetRelativeMousePos(evt: MouseEvent): {x: number, y: number} {
    let canvas: HTMLCanvasElement = Game.Instance.getCanvas();
    let coordinates: {x: number, y: number} = {
      x: evt.clientX - canvas.getBoundingClientRect().left,
      y: evt.clientY - canvas.getBoundingClientRect().top
    };
    return coordinates;
  }

  // do all checks before instantiating a GameObject
  public static CreateGameObjectAtPos(coordinates: {x: number, y: number}): void {
    let pickResult: BABYLON.PickingInfo = Game.Instance.getScene().pick(coordinates.x, coordinates.y);
    // if clic hits an object.
    if (pickResult.hit) {
      let mesh: BABYLON.AbstractMesh = pickResult.pickedMesh;
      // if clic hits a mesh.
      if (mesh) {
        // if Mesh is a GameObject.
        if (mesh.name.indexOf("GameObject_") === 0) {
          let gameObject: GameObject = GameObject.FindByMesh(mesh);
          // if GameObject has been found.
          if (gameObject) {
            console.log("Create GameObject");
            new GameObject(Editor._cursorPos, Editor._rot, Editor._ref, Editor._color);
          }
        }
      }
    }
  };

  // do all checks and dispose picked GameObject
  public static DisposeGameObjectAtPos(coordinates: {x: number, y: number}): void {
    let pickResult: BABYLON.PickingInfo = Game.Instance.getScene().pick(coordinates.x, coordinates.y);
    // if clic hits an object.
    if (pickResult.hit) {
      let mesh: BABYLON.AbstractMesh = pickResult.pickedMesh;
      // if clic hits a mesh.
      if (mesh) {
        // if Mesh is a GameObject.
        let gameObject: GameObject = GameObject.FindByMesh(mesh);
        gameObject.Dispose();
      }
    }
  };

  public static OnMouseOver(evt: MouseEvent): void {
    let coordinates: {x: number, y: number} = Editor.GetRelativeMousePos(evt);
    if (Editor._ref !== "delete") {
      Editor.CreateCursorAtPos(coordinates);
    }
  }

  // do all checks before instantiating a GameObject
  public static CreateCursorAtPos(coordinates: {x: number, y: number}): void {
    let pickResult: BABYLON.PickingInfo = Game.Instance.getScene()
    .pick(coordinates.x,
          coordinates.y,
          function(mesh: BABYLON.AbstractMesh): boolean {
            return mesh.id !== "Cursor";
    });
    // if clic hits an object.
    if (pickResult.hit) {
      let mesh: BABYLON.AbstractMesh = pickResult.pickedMesh;
      // if clic hits a mesh.
      if (mesh) {
        // if Mesh is a GameObject.
        if (mesh.name.indexOf("GameObject_") === 0) {
          let gameObject: GameObject = GameObject.FindByMesh(mesh);
          // if GameObject has been found.
          if (gameObject) {
            // if GameObject is not cursor or preview
            if (gameObject.GetId() !== -1) {
              Editor._cursorPos = Editor.GetCoordinates(pickResult.pickedPoint);
              Editor.setCursor();
            }
          }
        }
      }
    } else {
      Editor.disposeCursor();
    }
  };

  // given a clic position.
  // returns the most likely desired position for creating a new GameObject.
  // note: as no mesh normal is available easily, might send slightly unexpected result when hit is close to element edges.
  private static GetCoordinates(hitPos: BABYLON.Vector3): BABYLON.Vector3 {
    hitPos = hitPos.divide(Data.XYZSize());
    let epsilon: BABYLON.Vector3 = BABYLON.Vector3.Normalize(hitPos.subtract(Game.Instance.getCamera().position));
    epsilon = epsilon.multiplyByFloats(0.1, 0.1, 0.1);
    let pos: BABYLON.Vector3 = hitPos;
    pos = hitPos.subtract(epsilon);
    pos.x = Math.round(pos.x);
    pos.y = Math.round(pos.y);
    pos.z = Math.round(pos.z);

    return pos;
  }

  public static LoadInput(): void {
    let jsonDescription: string = (document.getElementById("load-input-content") as HTMLTextAreaElement).value;
    Editor.LoadJSONDescription(jsonDescription);
  }

  public static LoadJSONDescription(jsonDescription: string): void {
    let datas: Array<GameObjectData> = JSON.parse(jsonDescription);
    for (let i: number = 0; i < datas.length; i++) {
      Editor.pendingGameObject.push(datas[i]);
    }
  }

  public static InstantiatePending(): void {
    if (Editor.frameCountSinceLastInstantiation < Editor.frameDelay) {
      Editor.frameCountSinceLastInstantiation++;
      return;
    }
    if (Editor.pendingGameObject.length > 0) {
      let gameObjectData: GameObjectData = Editor.pendingGameObject.splice(0, 1)[0];
      GameObject.GameObjectFromData(gameObjectData);
    }
    Editor.frameCountSinceLastInstantiation = 0;
  }
}

// add interface listeners to take input from DOM.
window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("keydown", Editor.OnKeyDown);
  document.getElementById("renderCanvas").addEventListener("click", Editor.OnClick);
  document.getElementById("load-input-btn").addEventListener("click", Editor.LoadInput);
  document.getElementById("renderCanvas").addEventListener("mousemove", Editor.OnMouseOver);
  document.getElementById("renderCanvas").addEventListener("mouseout", () => {
    Editor.disposeCursor();
  });

  let colors: HTMLCollectionOf<Element> = document.getElementsByClassName("colorpicker");
  for (let i: number = 0; i < colors.length; i++) {
    let htmlColor: HTMLElement = colors[i] as HTMLElement;
    htmlColor.style.backgroundColor = htmlColor.id;
    htmlColor.addEventListener("click", () => {
      Editor.setColor(htmlColor.id);
    });
  }
  let shapes: HTMLCollectionOf<Element> = document.getElementsByClassName("shape-picker");
  for (let i: number = 0; i < shapes.length; i++) {
    let htmlShape: HTMLElement = shapes[i] as HTMLElement;
    htmlShape.addEventListener("click", () => {
      Editor.setRef(htmlShape.id);
    });
  }
  document.getElementById("castle").addEventListener("click", () => {
    Editor.LoadJSONDescription(Data.Castle);
  });
  document.getElementById("author").addEventListener("click", () => {
    Editor.LoadJSONDescription(Data.Author);
  });
  document.getElementById("rotate").addEventListener("click", () => {
    Editor.rotate();
  });
  document.getElementById("delete").addEventListener("click", () => {
    Editor.setRef("delete");
  });
});
