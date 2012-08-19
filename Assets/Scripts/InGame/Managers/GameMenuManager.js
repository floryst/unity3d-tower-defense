#pragma strict

var gridStyle : GUIStyle;

private var menuButtons : String[];
private var curSel : int;

private var returnState : String;

function Start () {
	menuButtons = ["Resume", "Exit"];
	curSel = 0;
	GameManager.RegisterObserver("GameMenuState", OpenMenu);
	this.enabled = false;
}

function Update () {

	if (Input.GetKeyDown("x")) {
		// mover
		curSel = (curSel + 1) % menuButtons.Length;
	}
	if (Input.GetKeyDown("z")) {
		// chooser
		switch (curSel) {
			case 0:
				// resume
				Time.timeScale = 1;
				GameManager.Trigger(returnState);
				this.enabled = false;
				break;
			case 1:
				// exit, go to main menu
				Application.LoadLevel("MainMenu");
				break;
		}
	}
}

function OnGUI() {
	
	GUI.depth = 4;
	
	GUI.SelectionGrid(Rect(Screen.width/2-50, Screen.height/2-40, 100, 80), curSel, menuButtons, 1, gridStyle);
}

function OpenMenu() {
	this.enabled = true;
	Time.timeScale = 0;
}

function SetReturnState(state : String) {
	returnState = state;
}