#pragma strict

private var player : GameObject;

function Update()
{
	player = GameObject.Find( "Player" );
	transform.position = player.transform.position;
}

@script AddComponentMenu( "Taril/TrailController" )