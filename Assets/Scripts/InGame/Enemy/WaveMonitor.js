#pragma strict

function Start () {
	// We initially do not want the wave monitor active.
	this.enabled = false;
}

function Update () {
	if (GameObject.FindGameObjectsWithTag("Enemy").Length == 0) {
		// Done! Disable for now.
		this.enabled = false;
		// Trigger the DefaultState.
		GameManager.Trigger("DefaultState");
	}
}