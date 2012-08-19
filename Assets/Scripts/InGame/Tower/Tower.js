#pragma strict

// Radius of enemy detection.
var sightRadius : float = 4.0;
// The tower's weapon.
var weapon : GameObject;
// The "cooldown" time for attacking
var AttackCooldown : float = 1.0;
// target.
private var curTarget : GameObject;
// The description of this tower (used for the TowerSelection).
var description : String;
// The cost of the tower.
var cost : int;

function Update () {
	
	lockOnNearestEnemy();
	if (curTarget != null && !IsInvoking()) {
		InvokeRepeating("Attack", 0.0, AttackCooldown);
	}
	else if (curTarget == null && IsInvoking()){
		// This is if Attack is still being invoked with no target.
		CancelInvoke();
	}
}

function lockOnNearestEnemy() {
	for (var collider : Collider in Physics.OverlapSphere(transform.position, sightRadius)) {
		if (collider.tag == "Enemy") {
			curTarget = collider.gameObject;
			return true;
		}
	}
	return false;
}

function Attack() {
	
	if (curTarget == null) {
		// No enemy in sight.
		return;
	}

	// Fire!!!
	var weapon = Instantiate(weapon, transform.position, transform.rotation);
	// Pass the target to the bullet/whatever in case it's a tracking damager.
	weapon.SendMessage("setTarget", curTarget);
}