#pragma strict

// The speed of the damager.
var speed : float = 10.0;
// The target if tracking.
private var target : GameObject;

function Update () {

	// If the target has been destroyed, just keep going.
	if (target != null) {
		transform.LookAt(target.transform.position);
	}
	else {
		// Just destroy the not tracking bullet for now.
		Destroy(gameObject);
	}
	
	// Move towards the target.
	transform.Translate(speed * Vector3.forward * Time.deltaTime);
}

function setTarget(tg : GameObject) {
	target = tg;
}

function OnTriggerEnter(collider : Collider) {
	if (collider.tag == "Enemy") {
		Destroy(gameObject);
	}
}