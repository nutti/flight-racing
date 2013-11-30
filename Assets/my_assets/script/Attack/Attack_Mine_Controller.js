#pragma strict

var shakingSpeed : float;		// Shaking speed.
var shakingMagnitude : float;	// Shaking magnitude.
private var counter : int;		// Internal counter.
var nonCollisonCounter : int;

shakingSpeed = 0.06f;
shakingMagnitude = 0.04f;
counter = 0;
nonCollisonCounter = 10;

function Start()
{
	var player : GameObject;
	
	player = GameObject.Find( "Player" );

	if( !player ){
		return;
	}
	
	transform.position = player.transform.position;
}

function Update()
{
	transform.position.y += shakingMagnitude * Mathf.Sin( counter * shakingSpeed );
	
	++counter;
	if( nonCollisonCounter > 0 ){
		--nonCollisonCounter;
	}
}

function CollidedByPlayer()
{
	if( nonCollisonCounter > 0 ){
		return;
	}
	GameObject.Find( "Player" ).SendMessage( "Crash" );
	Destroy( gameObject );
}

function CollidedByRacer()
{
	if( nonCollisonCounter > 0 ){
		return;
	}
	GameObject.Find( "Enemy" ).SendMessage( "Crash" );
	Destroy( gameObject );
}

@script AddComponentMenu( "Attack/AttackMineController" )