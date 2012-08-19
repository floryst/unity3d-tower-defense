#pragma strict

// Waypoint variables
private var waypointCurrentIndex : int;
private var waypointList : Transform[];

// Our current direction.
private var direction : Vector3;

// Our traveling speed
private var travelSpeed : float = 2.0;

function Start() {	
	// Get our initial direction.
	// Normalization is required as we only want a directional vector.
	direction = (waypointList[waypointCurrentIndex].position - transform.position)
				.normalized;
}

function Update () { 

	// Test for overshoot. 
	var travelVector = travelSpeed * direction * Time.deltaTime;
	if (isNextStepOvershoot(travelVector)) {
		// Just move to the waypoint.
		transform.position = waypointList[waypointCurrentIndex].position;
		
		// Goto our next waypoint.
		waypointCurrentIndex++;
		if (waypointCurrentIndex >= waypointList.Length) {
			Destroy(gameObject);
			return;
		}
		direction = (waypointList[waypointCurrentIndex].position - transform.position)
					.normalized;
	}
	else {
		// Advance, minion! >:-D
		transform.Translate(travelVector);
	}
}

function isNextStepOvershoot(movVector : Vector3) {
	var distToNextPos = movVector.sqrMagnitude;
	var distToWaypoint = (waypointList[waypointCurrentIndex].position - transform.position)
							.sqrMagnitude;
	if (distToNextPos - distToWaypoint > 0) {
		// We overshot!
		return true;
	}
	
	return false;
}

function setWaypoints(wps : Transform[]) {
	waypointList = wps;
}