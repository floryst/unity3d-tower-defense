#pragma strict

var gridStyle : GUIStyle;

private var menuButtons : String[];
private var sel : int;

function Start () {
	menuButtons = ["Start Game", "Exit"];
	sel = 0;
}

function Update () {

	if (Input.GetKeyDown("x")) {
		// mover
		sel = (sel + 1) % menuButtons.Length;
	}
	if (Input.GetKeyDown("z")) {
		// chooser
		switch (sel) {
			case 0:
				// Start game
				Application.LoadLevel("ZombiesMainGame");
				break;
			case 1:
				Application.Quit();
				break;
		}
	}
}

function OnGUI() {
	GUI.SelectionGrid(Rect(Screen.width/2-50, Screen.height/2-40, 100, 80), sel, menuButtons, 1, gridStyle);
}