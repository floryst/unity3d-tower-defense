#pragma strict

// Our waypoint list.
var waypoints : Transform[];
// Defines how many seconds to wait between spawns.
private var spawnTimer : float = 3.0;
// our current wave enemy offset.
private var enemyOffset : int;
// Our wave managing script
private var enemyWaves : EnemyWaves;

function Start() {
	// cache the enemywave object
	enemyWaves = GetComponent(EnemyWaves);
	
	// Register our observer
	GameManager.RegisterObserver("WaveStartState", StartWave);
}

function Spawn() {
	
	if (enemyOffset == enemyWaves.Waves[GameManager.currentWave].Length) {
		// We have finished spawning monsters.
		CancelInvoke();
		// Increment the current wave regardless whether or not we actually win the wave.
		GameManager.currentWave++;
		// Start the WaveMonitor so that we catch when all enemies are cleared.
		GetComponent(WaveMonitor).enabled = true;
		return;
	}
	
	var enemyReference : GameObject = Instantiate(enemyWaves.Waves[GameManager.currentWave][enemyOffset], transform.position, Quaternion.identity);
	// Calls the SetWaypoints on the enemyReference, which then assigns waypoints
	// to the enemy.
	enemyReference.SendMessage("setWaypoints", waypoints);
	
	// Increment the enemyOffset
	enemyOffset++;
}

function StartWave() {
	// Set the timescale to 1.
	Time.timeScale = 1;
	// offset = 0
	enemyOffset = 0;
	// 1.0 sec delay for the effect.
	InvokeRepeating("Spawn", 1.0, spawnTimer);
}