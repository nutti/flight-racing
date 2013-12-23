#pragma strict

private var speed : float;

var interval : float;
var acceleration : float;
var defaultSpeed : float;

enum EnemyState
{
	NORMAL		= 0,
	CRASHED		= 1,
	SLIPED		= 2,
	ENEMY_STATE_TOTAL,
}

private var curState : EnemyState;
private var crashedTime : int;

var nextDir : Vector3;
var curDir : Vector3;
var angularSpeed : float = 1.5;


defaultSpeed = 0.45;
acceleration = 0.003;
interval = 0.2;
crashedTime = 0;

curState = EnemyState.NORMAL;

speed = 0.0f;

var first = 1;
var fangle = 0.0;

function Start()
{
	curDir = transform.forward;
}

function Update()
{
	switch( curState ){
		case EnemyState.NORMAL:
			// Calculate next direction.
			nextDir = GetComponent( Path_Finding ).GetNextDir();
			
			if( speed < defaultSpeed - interval ){
				speed += acceleration;
			}
			if( speed > defaultSpeed + interval ){
				speed -= acceleration;
			}
			var outer : Vector3;
			var inner : float;
			var angle : float;
			
			outer = Vector3.Cross( nextDir, curDir );
			inner = Mathf.Acos( Vector3.Dot( nextDir, curDir ) / ( nextDir.magnitude * curDir.magnitude ) );
			
			if( inner >= angularSpeed ){
				angle = angularSpeed;
			}
			else if( inner <= -angularSpeed ){
				angle = -angularSpeed;
			}
			else{
				angle = inner;
			}
			
			//angle = inner * Mathf.Rad2Deg;
			
			/*if( first ){
				fangle = angle;
				first = 0;
				transform.Rotate( -outer, fangle, Space.World );
			}*/
	
			transform.Rotate( -outer, angle, Space.World );
			
			
			
			GameObject.Find( "outer_vec" ).transform.position = transform.position + outer.normalized * 15.0;
			
			//transform.position += nextDir * speed;
			break;
		case EnemyState.CRASHED:
			speed = 0.0f;
			--crashedTime;
			if( crashedTime <= 0 ){
				curState = EnemyState.NORMAL;
			}
			break;
		case EnemyState.SLIPED:
			speed -= 0.03f;
			if( speed < 0.0f ){
				curState = EnemyState.NORMAL;
				speed = 0.0f;
			}
			break;
		default:
			break;
	}
	
	transform.Translate( 0, 0, speed );
	curDir = transform.forward;
	
	
	//transform.position += nextDir * speed;
}


// Process collision
function OnTriggerEnter( col : Collider )
{
	print( "test" );
	// Collide with item.
	if( col.gameObject.tag == "Attack" ){
		//Slow();
		col.gameObject.SendMessage( "CollidedByRacer" );
		return;
	}
	
	if( col.gameObject.name == "Path Node (Plane)" ){
		GetComponent( Path_Finding ).SetNextTarget();
	}
}

// Sliped (Slow down).
function Slow()
{
	curState = EnemyState.SLIPED;
}

// Crashed (Stop movement).
function Crash()
{
	crashedTime = 60;
	curState = EnemyState.CRASHED;
}

@script AddComponentMenu( "Enemy/EnemyController" )