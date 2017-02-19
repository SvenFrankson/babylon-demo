/// <reference path="../lib/babylon.2.4.d.ts"/>
class GameObjectData {
  public posX : number;
  public posY : number;
  public posZ : number;
  public rot : number;
  public ref : string;
  public col : string;

  public SetFromGameObject(g : GameObject): void {
    this.posX = g.GetPos().x;
    this.posY = g.GetPos().y;
    this.posZ = g.GetPos().z;
    this.rot = g.GetRot();
    this.ref = g.GetRef();
    this.col = g.GetCol();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("save").addEventListener("click", () => {
    document.getElementById("json-datas").innerHTML = GameObject.InstancesToJSON();
  });
});
