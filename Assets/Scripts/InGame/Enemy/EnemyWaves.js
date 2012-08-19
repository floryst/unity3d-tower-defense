#pragma strict

/*
 * Enemy definitions
 */

var BasicEnemy : GameObject;

/*
 * Enemy Waves
 */

// Cheap work-around. I can't seem to set the type of Waves to GameObject[][], so
// this will have to do for now. This will be overwritten in Start();
var Waves = [[BasicEnemy]];

function Start() {
	Waves = [
	
		// Wave 1.
		[BasicEnemy, BasicEnemy, BasicEnemy],
		[BasicEnemy, BasicEnemy, BasicEnemy, BasicEnemy, BasicEnemy],
		[BasicEnemy, BasicEnemy, BasicEnemy, BasicEnemy, BasicEnemy, BasicEnemy, BasicEnemy]

	];
}