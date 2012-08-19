#pragma strict

var labelStyle : GUIStyle;

function OnGUI() {

	GUI.depth = 10;
	
	// Right HUD
	GUI.Label(Rect(522, 30, 202, 30), "Score: " + GameManager.gameScore, labelStyle);
	GUI.Label(Rect(522, 60, 202, 30), "Money: $" + GameManager.gameMoney, labelStyle);
	GUI.Label(Rect(522, 90, 202, 30), "Zombies killed: " + GameManager.zombiesKilled, labelStyle);
	GUI.Label(Rect(522,120, 202, 30), "Waves completed: " + GameManager.currentWave);
	
}