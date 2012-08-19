#pragma strict

function OnDestroy() {
	GameManager.zombiesKilled++;
	GameManager.gameScore += GetComponent(Enemy).scoreValue;
	GameManager.gameMoney += GetComponent(Enemy).moneyDrop;
}