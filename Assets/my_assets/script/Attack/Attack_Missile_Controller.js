#pragma strict

var targetObject : GameObject;

private var counter : int;
private var speed : float;
private var nonCollisionCounter : int;
private var direction : Vector3;

counter = 0;
speed = 0.6;
nonCollisionCounter = 10;

function Start()
{
	var player : GameObject;
	
	player = GameObject.Find( "Player" );

	if( !player ){
		return;
	}
	
	targetObject = GameObject.Find( "Enemy" );
	
	var playerCtrl : Player_Controller;
	playerCtrl = player.GetComponent( Player_Controller );
	direction = playerCtrl.GetDirAngle();
	
	rigidbody.MovePosition( player.transform.position );
}

function Update()
{
	var sp : Vector3;
	
	// calculate direction.
	if( targetObject ){
		direction = targetObject.transform.position - transform.position;
	}
	sp = Vector3.Normalize( direction );
	
	rigidbody.MovePosition( rigidbody.position + sp * speed );
	
	++counter;
	
	if( counter > 200 ){
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
	Destroy( gameObject );
}

function CollidedByRacer()
{
	if( nonCollisionCounter > 0 ){
		return;
	}
	GameObject.Find( "Enemy" ).SendMessage( "Crash" );
	Destroy( gameObject );
}

// Process collision
function OnCollisionEnter( col : Collision )
{
	// Collide with item.
	if( col.gameObject.tag == "Terrain" ){
		Destroy( gameObject );
	}
}

@script AddComponentMenu( "Attack/AttackMissileController" )