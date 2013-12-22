#pragma strict

var speed = 0.000;
var angularSpeed = 1.5;
var acceleration = 0.001;
var maxSpeed = 0.45;
var dirAngle : Vector3;

var items : Transform[];
var itemID : int;		// Item ID which player has.
var itemNum : int;		// Number of items.

private var inputStats : boolean [];

enum InputState
{
	UP			= 0,
	DOWN		= 1,
	RIGHT		= 2,
	LEFT		= 3,
	USE_ITEM	= 4,
	INPUT_TOTAL
}

enum PlayerState
{
	NORMAL		= 0,
	CRASHED		= 1,
	SLIPED		= 2,
	SPEEDUP		= 3,
	PLAYER_STATE_TOTAL,
}

private var curState : EnemyState;
private var crashedTime : int;

private var barrierTime : int;

inputStats = new boolean [ InputState.INPUT_TOTAL ] ;
itemID = -1;
itemNum = 0;
dirAngle = Vector3( 0.0, 0.0, 0.0 );
crashedTime = 0;
curState = EnemyState.NORMAL;

barrierTime = 0;

function GetDirAngle()
{
	return dirAngle;
}

// Update input status.
function UpdateInputStats()
{
	var verticalInput = Input.GetAxis( "Player Vertical Move" );
	var horizontalInput = Input.GetAxis( "Player Horizontal Move" );
	var useItemInput = Input.GetAxis( "Use Item" );
	
	for( var i = 0; i < InputState.INPUT_TOTAL; ++i ){
		inputStats[ i ] = false;
	}

	if( verticalInput > 0 ){
		inputStats[ InputState.UP ] = true;
	}
	else if( verticalInput < 0 ){
		inputStats[ InputState.DOWN ] = true;
	}
	
	if( horizontalInput > 0 ){
		inputStats[ InputState.RIGHT ] = true;
	}
	else if( horizontalInput < 0 ){
		inputStats[ InputState.LEFT ] = true;
	}
	
	if( useItemInput > 0 ){
		inputStats[ InputState.USE_ITEM ] = true;
	}
}

function UpdateSpeed()
{
	speed += acceleration;
	if( speed > maxSpeed ){
		speed = maxSpeed;
	}
}


function Update()
{
	
	// Update input status.
	UpdateInputStats();

	if( inputStats[ InputState.RIGHT ] ){			// [TODO] bug
		dirAngle.x += Mathf.Deg2Rad * 0.5;
		transform.Rotate( Vector3( 1, 0, 0 ), - angularSpeed );
	}
	else if( inputStats[ InputState.LEFT ] ){		// [TODO] bug
		dirAngle.x -= Mathf.Deg2Rad * 0.5;
		transform.Rotate( Vector3( 1, 0, 0 ), angularSpeed );
	}
	
	if( inputStats[ InputState.UP ] ){				// [TODO] bug
		dirAngle.y -= Mathf.Deg2Rad * 0.5;
		transform.Rotate( Vector3( 0, 1, 0 ), angularSpeed, Space.World );
	}
	else if( inputStats[ InputState.DOWN ] ){		// [TODO] bug
		dirAngle.y += Mathf.Deg2Rad * 0.5;
		transform.Rotate( Vector3( 0, 1, 0 ), - angularSpeed, Space.World );
	}
	
	
	if( inputStats[ InputState.USE_ITEM ] ){
		UseItem();
	}
	
	UpdateSpeed();

	/*transform.position.x -= speed * Mathf.Sin( dirAngle.y ) * Mathf.Cos( dirAngle.x );
	transform.position.y += speed * Mathf.Sin( dirAngle.x );
	transform.position.z += speed * Mathf.Cos( dirAngle.y ) * Mathf.Cos( dirAngle.x );*/
	
	transform.Translate( 0, 0, speed );

	// barrier.
	if( barrierTime > 0 ){
		--barrierTime;
	}
}

// Use item
function UseItem()
{
	if( itemID < 0 || items.Length <= itemID ){
		return;
	}
	
	var newObj : Transform;
	
	// Optional configuration.
	switch( itemID ){
		case ItemID.MISSILE:
			newObj = Instantiate( items[ itemID ], transform.position, Quaternion.Euler( 0.0, 0.0, 0.0 ) );
			( newObj.GetComponent( Attack_Missile_Controller ) ).targetObject = GameObject.Find( "Enemy" );
			break;
		case ItemID.BARRIER:
			barrierTime += 60 * 20;		// 20 seconds.
			break;
		case ItemID.BOOSTER:
			speed *= 2;
			break;
		case ItemID.SHOCKWAVE:
			newObj = Instantiate( items[ itemID ], transform.position, Quaternion.Euler( 0.0, 0.0, 0.0 ) );
			( newObj.GetComponent( Attack_Shockwave_Controller ) ).srcObject = gameObject;
			break;
		default:
			newObj = Instantiate( items[ itemID ], transform.position, Quaternion.Euler( 0.0, 0.0, 0.0 ) );
			break;
	}
	
	--itemNum;
	if( itemNum <= 0 ){
		itemID = -1;
	}
}

// Process collision
function OnTriggerEnter( col : Collider )
{
	// Collide with item.
	if( col.gameObject.tag == "Item" ){
		col.gameObject.SendMessage( "CollidedByPlayer", gameObject );
	}
	// Collide with attack.
	if( col.gameObject.tag == "Attack" ){
		col.gameObject.SendMessage( "CollidedByPlayer" );
	}
	// Colide with wall.
	if( col.gameObject.tag == "Wall" ){
		speed = -speed * 0.1;
		if( speed > -0.03 ){
			speed = -0.03;
		}
	}
}

// Add Item.
function AddItem( arg : int[] )
{
	var id = arg[ 0 ];
	var num = arg[ 1 ];
	if( itemID == -1 ){
		itemID = id;
		itemNum = num;
	}
	else if( itemID == id ){
		itemNum += num;
	}
}

function OnGUI()
{
	GUI.Label( Rect( 10, 10, 100, 30 ), "Item ID : " + itemID );
	GUI.Label( Rect( 10, 30, 100, 50 ), "Item Num : " + itemNum );
	GUI.Label( Rect( 10, 50, 100, 40 ), "Barrier Time : " + barrierTime );
}

// Crashed (Stop movement).
function Crash()
{
	if( barrierTime > 0 ){
		barrierTime = 0;		// Disapper.
		return;
	}
	crashedTime = 60;
	curState = EnemyState.CRASHED;
}

@script AddComponentMenu( "Player/PlayerController" )