#pragma strict

var towerSelectorStyle : GUIStyle;

// our list of available towers
var towerList : GameObject[];
// our list of tower textures
var towerTextures : Texture[];

// Our current grid selection
private var selTower : int = 0;
// A list of towers (by index #) that cannot be bought.
private var cannotBuyTowers : int[];

function Start () {
	// Register our observer.
	GameManager.RegisterObserver("TowerMenuState", EnableTowerMenu);
	
	// init the cannotBuyTowers list.
	cannotBuyTowers = new int[towerList.Length];
	for (var i = 0; i < towerList.Length; i++) {
		cannotBuyTowers[i] = 0;
	}
	
	// Disable the tower select manager at the beginning.
	this.enabled = false;
}

function Update() {
	if (Input.GetKeyDown("x")) {
		// mover
		selTower = (selTower + 1) % (towerList.Length + 1);
	}
	else if (Input.GetKeyDown("z")) {
		if (selTower == towerList.Length) {
			// Cancel button
			GameManager.Trigger("DefaultState");
		}
		else {
			GameManager.Trigger("PlaceTowerState");
			GetComponent(PlaceTowerManager).SetTower(towerList[selTower]);
		}
		
		this.enabled = false;
	}
	if (selTower != towerList.Length && cannotBuyTowers[selTower] == 1) {
		selTower = (selTower + 1) % (towerList.Length + 1);
	}

}

function OnGUI() {
	
	// Must be greater than HUDManager's GUI.depth b/c we show on top.
	GUI.depth = 5;
	// apply our GUI skin
	//GUI.skin = selectorMenuSkin;
	
	GUI.BeginGroup(Rect(10, 10, Screen.width - 20, Screen.height - 20));

	// Loop through to get our GUIContents.
	var guiContents : GUIContent[] = new GUIContent[towerList.Length];
	for (var i : int = 0; i < towerList.Length; i++) {
		var twr : Tower = towerList[i].GetComponent(Tower);
		var txt : String = twr.description + "\nCost: $" + twr.cost;
		if (twr.cost > GameManager.gameMoney) {
			txt += "\nNot enough money; You cannot buy this!";
			cannotBuyTowers[i] = 1;
		}
		else {
			// set it to zero b/c if it wasn't available before,
			// then make it available now.
			cannotBuyTowers[i] = 0;	
		}
		guiContents[i] = GUIContent(txt, towerTextures[i]);
	}

	// Apparently the correct style when something is focused is On Normal...
	// yet the HUDManager has everything on Focused. HUH???
	GUI.SetNextControlName("towerMenuSelector");
	GUI.SelectionGrid(Rect(10, 10, Screen.width - 20, Screen.height - 60), selTower, guiContents, 2, towerSelectorStyle);

	// The cancel button for tower selection.
	GUI.SetNextControlName("towerMenuCancel");
	GUI.Button(Rect(10, Screen.height - 60, Screen.width - 20, 40), "Cancel tower selection", towerSelectorStyle);
	
	GUI.EndGroup();
	
	if (selTower == towerList.Length) {
		GUI.FocusControl("towerMenuCancel");
	}
	else {
		GUI.FocusControl("towerMenuSelector");
	}
}

function EnableTowerMenu() {
	this.enabled = true;
	selTower = 0;
}