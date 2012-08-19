#pragma strict

var labelStyle : GUIStyle;
var buttonStyle : GUIStyle;
var groupStyle : GUIStyle;

// Name of the buttons
var defaultStateButtons : String[];
var waveStateButtons : String[];
// current button index
private var curButtonIndex : int;
// internal copy of the current set of buttons.
private var curButtons : String[];

function Awake() {

	// Reset the gamemanager here.
	GameManager.Reset();

	// Buttons start at the beginning.
	curButtonIndex = 0;
	// Buttons are default buttons.
	curButtons = defaultStateButtons;

	// Register our observers
	GameManager.RegisterObserver("DefaultState", DefaultState);
	GameManager.RegisterObserver("WaveState", WaveState);
	
}

function Start () {
	GameManager.Trigger("DefaultState");
}

function Update() {
	if (Input.GetKeyDown("z")) {
		// Chooser
		switch (GameManager.GetCurrentState()) {
			case "DefaultState":
				switch (curButtonIndex) {
					case 0:
						// Start wave
						GameManager.Trigger("WaveStartState");
						GameManager.Trigger("WaveState");
						break;
					case 1:
						// Place towers
						GameManager.Trigger("TowerMenuState");
						// Disable this script for now.
						this.enabled = false;
						break;
					case 2:
						// Upgrade towers
						Debug.Log("Upgrade towers");
						break;
					case 3:
						// Game menu
						GetComponent(GameMenuManager).SetReturnState("DefaultState");
						GameManager.Trigger("GameMenuState");
						this.enabled = false;
						break;
				}
				break;
			case "WaveState":
				// paused
				GetComponent(GameMenuManager).SetReturnState("WaveState");
				GameManager.Trigger("GameMenuState");
				this.enabled = false;
				break;
			
		}
	}
	else if (Input.GetKeyDown("x")) {
		// Mover
		curButtonIndex = (curButtonIndex + 1) % curButtons.Length;
	}
	
	
}

function OnGUI() {

	// A depth of 10 (i.e. a distance of 10 from the camera).
	GUI.depth = 10;

	// Bottom HUD
	GUI.BeginGroup(Rect(0,512, 512, 96), groupStyle);
	
	var curOffset = 0;
	for (name in curButtons) {
		GUI.SetNextControlName(name);
		GUI.Button(Rect(curOffset, 0, 128, 96), name, buttonStyle);
		curOffset += 128;
	}
	
	GUI.EndGroup();
	
	GUI.FocusControl(curButtons[curButtonIndex]);
}

function DefaultState() {
	// Set the button set to default.
	curButtons = defaultStateButtons;
	// Enable this.
	this.enabled = true;
}

function WaveState() {
	this.enabled = true;
	curButtons = waveStateButtons;
}