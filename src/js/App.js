function viewDidLoad() {
  // サジェスト機能
  MechaList.MECHAS
    .map((mecha) => mecha.name)
    .sort()
    .map((name) => {
      const option = document.createElement("option");
      option.text = name;
      document.getElementById("mechaList").appendChild(option);
    });
  PilotList.PILOTS
    .map((pilot) => pilot.name)
    .sort()
    .map((name) => {
      const option = document.createElement("option");
      option.text = name;
      document.getElementById("pilotList").appendChild(option);
    });

  // イベント
  new MechaInputEvent(
    document.getElementById("mecha"),
    document.getElementById("attribute"),
    document.getElementById("result"),
    MechaList.MECHAS
  );
}
window.onload = viewDidLoad;
