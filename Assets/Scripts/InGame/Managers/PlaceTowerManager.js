#pragma strict

import System.Collections.Generic;

var greyTransPlane : GameObject;
var redBlockPlane : GameObject;
var gridStyle : GUIStyle;
var buttonStyle : GUIStyle;

private var texTwo : Texture[];
private var curSelection : int;
private var splitStyle : int;

private var x : float;
private var y : float;
private var w : float;
private var h : float;

private var destroyList : List.<GameObject>;

var towerToPlace : GameObject;

function Start () {
	
	texTwo = [new Texture(), new Texture()];
	destroyList = new List.<GameObject>();

	GameManager.RegisterObserver("PlaceTowerState", EnableTowerPlace);
	this.enabled = false;
}

function Update () {

	if (Input.GetKeyDown("x")) {
		// mover
		// the three is to include the cancel button.
		curSelection = (curSelection + 1) % 3;
	}
	if (Input.GetKeyDown("z")) {
		// chooser
		switch (curSelection) {
			case 0:
				// chose either the left or top.
				ChosePos(0);
				break;
			case 1:
				// chose either right or bottom.
				ChosePos(1);
				break;
			case 2:
				// cancelled.
				CleanUp();
				GameManager.Trigger("DefaultState");
				this.enabled = false;
				break;
		}
		// reset curSelection for sanity purposes.
		curSelection = 0;
	}
}

function OnGUI() {

	GUI.SetNextControlName("placeTowerGrid");
	GUI.SelectionGrid(Rect(x,y,w,h), curSelection, texTwo, splitStyle, gridStyle);

	GUI.SetNextControlName("placeTowerCancel");
	GUI.Button(Rect(0,512, 512, 96), "Cancel", buttonStyle);
	
	if (curSelection == 2) {
		// if on cancel button
		GUI.FocusControl("placeTowerCancel");
	}
	else {
		GUI.FocusControl("placeTowerGrid");
	}

}

function EnableTowerPlace() {
	this.enabled = true;
	// reset to beginning.
	curSelection = 0;
	splitStyle = 2;
	// Set the x,y,w,h params to default.
	x = 0;
	y = 0;
	w = 512;
	h = 512;
	
	// set up our red squares
	GenRedPlanes();
}

function GenRedPlanes() {
	for (var a = 0; a < 256; a++) {
		var rayHit : RaycastHit;
		var posVector = Vector3(a % 16 + 0.5, 10, 18.5 - a / 16);
		if (Physics.Raycast(posVector, Vector3(0, -1, 0), rayHit, 15)) {
			destroyList.Add(Instantiate(redBlockPlane, posVector, Quaternion.identity));
		}
	}
}

function SetTower(twr : GameObject) {
	towerToPlace = twr;
}

// Yes, I can condense the two functions below. But I'm a bit short on time right now, so 
// they will stay the way they are right now.

function ChosePos(pos : int) {

	// These numbers derive from the fact that when the selection is 32x32, the grid
	// size is 32x64.
	if (w == 32 && h == 64) {
		var posVector = Vector3(x/32+0.5, 6, 18-y/32+0.5);
		if (pos == 1)
			posVector += Vector3(0,0,-1);
		if (Physics.Raycast(posVector, Vector3(0, -1, 0), 15)) {
			// Just leave; can't place there.
			return;
		}
	
		// We got our position!
		// We are subtracting the Vector3 from posVector b/c the
		// tower layer is layer 2, not layer 6.
		Instantiate(towerToPlace, posVector - Vector3(0, 4, 0), Quaternion.identity);
		
		// Run cleanup.
		CleanUp();

		// Subtract the money!
		GameManager.gameMoney -= towerToPlace.GetComponent(Tower).cost;
		
		GameManager.Trigger("DefaultState");
		this.enabled = false;
		return;
	}
	
	// the position of our greyTransPlane.
	var gPos : Vector3;
	var gScale : Vector3;

	if (splitStyle == 2) {
		// vert style
		w /= 2;
		if (pos == 1) {
			// right
			gPos = Vector3((x+w/2)/32,6,19-(y+h/2)/32);
			gScale = Vector3(w/32,1,h/32);
			x += w;
		}
		else {
			gPos = Vector3(((x+w)+w/2)/32,6,19-(y+h/2)/32);
			gScale = Vector3(w/32,1,h/32);
		}
		splitStyle = 1;
	}
	else {
		// horiz style
		h /= 2;
		if (pos == 1) {
			// bottom
			gPos = Vector3((x+w/2)/32,6,19-(y+h/2)/32);
			gScale = Vector3(w/32,1,h/32);
			y += h;
		}
		else {
			gPos = Vector3(((x+w)-w/2)/32,6,19-((y+h)+h/2)/32);
			gScale = Vector3(w/32,1,h/32);
		}
		splitStyle = 2;
	}
	
	// Create our greyed-out area
	var g : GameObject = Instantiate(greyTransPlane, gPos, Quaternion.identity);
	g.transform.localScale = gScale;
	
	destroyList.Add(g);
}

function CleanUp() {
	// Destroy all the grey stuff.
	for (var go : GameObject in destroyList) {
		Destroy(go);
	}
}
