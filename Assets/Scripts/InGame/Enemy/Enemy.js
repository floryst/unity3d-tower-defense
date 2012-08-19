#pragma strict

// enemy health
var health : int = 5;
// amount of money the enemy drops
var moneyDrop : int = 10;
// enemy score value
var scoreValue : int = 100;

function OnTriggerEnter(collider : Collider) {
	if (collider.tag == "Damager") {
		dealDamage(1);
	}
}

function dealDamage(dmgValue : int) {
	health -= dmgValue;
	
	// Check to see if enemy is dead.
	if (health <= 0) {
		// Die!
		Destroy(gameObject);
	}
}
