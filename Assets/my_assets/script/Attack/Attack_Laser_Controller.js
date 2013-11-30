#pragma strict

private var dirAngle : Vector3;
private var counter : int;
private var speed : float;
private var nonCollisionCounter : int;

dirAngle = Vector3( 0.0, 0.0, 0.0f );
counter = 0;
speed = 2.0;
nonCollisionCounter = 10;

function Start()
{
	var player : GameObject;
	
	player = GameObject.Find( "Player" );

	if( !player ){
		return;
	}
	
	var playerCtrl : Player_Controller;
	playerCtrl = player.GetComponent( Player_Controller );
	dirAngle = playerCtrl.GetDirAngle();
}

function Update()
{
	var dir : Vector3;
	
	dir.x = -Mathf.Sin( dirAngle.y ) * Mathf.Cos( dirAngle.x );
	dir.y = Mathf.Sin( dirAngle.x );
	dir.z = Mathf.Cos( dirAngle.y ) * Mathf.Cos( dirAngle.x );

	rigidbody.MovePosition( rigidbody.position + dir * speed );
	
	++counter;
	
	if( counter > 100 ){
		Destroy( gameObject );
	}
	
	if( nonCollisionCounter > 0 ){
		--nonCollisionCounter;
	}
}

function CollidedByPlayer()
{
	if( nonCollisionCounter > 0 ){
		return;
	}
	GameObject.Find( "Player" ).SendMessage( "Crash" );
}

function CollidedByRacer()
{
	if( nonCollisionCounter > 0 ){
		return;
	}
	GameObject.Find( "Enemy" ).SendMessage( "Crash" );
}

// Process collision
function OnCollisionEnter( col : Collision )
{
	// Collide with item.
	if( col.gameObject.tag == "Terrain" ){
		Destroy( gameObject );
	}
}

@script AddComponentMenu( "Attack/AttackLaserController" )