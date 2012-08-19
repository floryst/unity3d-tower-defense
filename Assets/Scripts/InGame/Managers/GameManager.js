#pragma strict

import System.Collections.Generic;

static class GameManager {

	// the in-game score.
	var gameScore : int = 0;
	// the amount of money we have.
	var gameMoney : int = 90;
	// the number of zombies killed.
	var zombiesKilled : int = 0;
	// the current wave
	var currentWave : int = 0;
	
	// The current state
	private var curState : String;
	
	// The spaces between > > are required. Unity will complain otherwise.
	var observer : Dictionary.<String, List.<Function> > = new Dictionary.<String, List.<Function> >();
	
	function RegisterObserver(trigger : String, action : Function) {
		if (!observer.ContainsKey(trigger)) {
			observer[trigger] = new List.<Function>();
		}
		
		observer[trigger].Add(action);
	}
	
	function Trigger(trigger : String) {
		
		// Set the current state.
		curState = trigger;
	
		if (!observer.ContainsKey(trigger)) {
			Debug.LogError("Trigger `" + trigger + "` does not exist!");
			return;
		}
		
		for (var f : Function in observer[trigger]) {
			f();
		}
	}
	
	function GetCurrentState() {
		return curState;
	}
	
	function Reset() {
		gameScore = 0;
		gameMoney = 90;
		zombiesKilled = 0;
		currentWave = 0;
		curState = null;
		observer = new Dictionary.<String, List.<Function> >();
	}
}