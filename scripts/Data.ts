/// <reference path="../lib/babylon.2.4.d.ts"/>
class Data {
  public static readonly XSize : number = 0.7;
  public static readonly YSize : number = 0.9;
  public static readonly ZSize : number = 0.7;

  public static XYZSize():BABYLON.Vector3 {
    return new BABYLON.Vector3(Data.XSize, Data.YSize, Data.ZSize);
  }
}
