#pragma strict

private var counter : int;
private var speed : float;
private var nonCollisionCounter : int;

var srcObject : GameObject;

counter = 0;
speed = 2.0;
nonCollisionCounter = 10;

function UpdatePosition()
{
	var player : GameObject;
	
	player = GameObject.Find( "Player" );

	if( !player ){
		return;
	}
	
	rigidbody.MovePosition( player.transform.position );
}

function Start()
{
	UpdatePosition();
}

function Update()
{
	var dir : Vector3;
	
	UpdatePosition();
	
	++counter;
	
	if( counter > 100 ){
		Destroy( gameObject );
	}
	
	if( nonCollisionCounter > 0 ){
		--nonCollisionCounter;
	}
}

function CollidedByPlayer( arg : GameObject )
{
	if( nonCollisionCounter > 0 ){
		return;
	}
	
	if( srcObject == arg ){
	//	return;
	}
	
	GameObject.Find( "Player" ).SendMessage( "Crash" );
	Destroy( gameObject );
}

function CollidedByRacer()
{
	if( nonCollisionCounter > 0 ){
		return;
	}
	GameObject.Find( "Enemy" ).SendMessage( "Crash" );
}


@script AddComponentMenu( "Attack/AttackShockwaveController" )