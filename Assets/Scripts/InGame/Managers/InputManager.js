#pragma strict

private var focusedControl : String;

function Start() {
	// Default focus is on the HUDManager for now. Later it will be the main menu.
	SetFocusedControl("TowerSelectManager");
}

function Update () {
	if (Input.GetKeyDown("z")) {
		Send("z");
	}
	if (Input.GetKeyDown("x")) {
		Send("x");
	}
}

function SetFocusedControl(cntrl : String) {
	focusedControl = cntrl;
}

function Send(key : String) {
	switch (focusedControl) {
		case "HUDManager":
			//GetComponent(HUDManager).InputReceiver(key);
			break;
		case "MenuManager":
			break;
		case "TowerSelectManager":
			//GetComponent(TowerSelectManager).InputReceiver(key);
			break;
	}
}

function GetFocusedControl() {
	return focusedControl;
}