#pragma strict

var speed = 0.000;
var angularSpeedX = 1.5;
var angularSpeedY = 1.5;
var maxAngularSpeed = 1.5;
var acceleration = 0.001;
var mass = 1.0;
var resistance = 0.0001;
var maxSpeed = 0.45;
var dirAngle : Vector3;

var stageGUI : GameObject;

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
	ACCELERATE	= 5,
	BRAKE		= 6,
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

function UpdateInputStatusPC()
{
	var verticalInput = Input.GetAxisRaw( "Player Vertical Move" );
	var horizontalInput = Input.GetAxisRaw( "Player Horizontal Move" );
	var useItemInput = Input.GetAxisRaw( "Use Item" );
	var accelInput = Input.GetAxisRaw( "Acceleration" );
	
	angularSpeedX = 0.0f;
	angularSpeedY = 0.0f;
	
	for( var i = 0; i < InputState.INPUT_TOTAL - 2; ++i ){
		inputStats[ i ] = false;
	}

	if( verticalInput > 0 ){
		//inputStats[ InputState.UP ] = true;
		angularSpeedY = maxAngularSpeed;
	}
	else if( verticalInput < 0 ){
		//inputStats[ InputState.DOWN ] = true;
		angularSpeedY = -maxAngularSpeed;
	}
	
	if( horizontalInput > 0 ){
		//inputStats[ InputState.RIGHT ] = true;
		angularSpeedX = -maxAngularSpeed;
	}
	else if( horizontalInput < 0 ){
		//inputStats[ InputState.LEFT ] = true;
		angularSpeedX = maxAngularSpeed;
	}
	
	if( useItemInput > 0 ){
		inputStats[ InputState.USE_ITEM ] = true;
	}
	
	if( accelInput > 0 ){
		inputStats[ InputState.ACCELERATE ] = true;
	}
}

function UpdateInputStatusIOS()
{
	angularSpeedX = -Input.acceleration.y;
	angularSpeedY = Input.acceleration.x;
	
	if( angularSpeedX > maxAngularSpeed ){
		angularSpeedX = maxAngularSpeed;
	}
	if( angularSpeedX < -maxAngularSpeed ){
		angularSpeedX = -maxAngularSpeed;
	}
	if( angularSpeedY > maxAngularSpeed ){
		angularSpeedY = maxAngularSpeed;
	}
	if( angularSpeedY < -maxAngularSpeed ){
		angularSpeedY = -maxAngularSpeed;
	}
}

// Update input status.
function UpdateInputStats()
{
	if( SystemInfo.operatingSystem.Contains( "Windows" ) || SystemInfo.operatingSystem.Contains( "Mac" ) ){
		UpdateInputStatusPC();
	}
	else if( SystemInfo.operatingSystem.Contains( "iPhone" ) ){
		UpdateInputStatusIOS();
	}
}

function UpdateSpeed( accel : float )
{
	speed += accel;
	speed -= resistance * speed / mass;

	
	if( speed > maxSpeed ){
		speed = maxSpeed;
	}
	else if( speed < -maxSpeed ){
		speed = -maxSpeed;
	}
}


function Update()
{
	
	// Update input status.
	UpdateInputStats();

	// [TODO] bug
	transform.Rotate( Vector3( 1, 0, 0 ), angularSpeedX );
	transform.Rotate( Vector3( 0, 1, 0 ), angularSpeedY, Space.World );
	
	
	if( inputStats[ InputState.USE_ITEM ] ){
		UseItem();
	}
	
	var accel : float;
	
	if( inputStats[ InputState.ACCELERATE ] ){
		accel = acceleration;
	}
	else if( inputStats[ InputState.BRAKE ] ){
		accel = -acceleration;
	}
	else{
		accel = 0.0f;
	}
	
	UpdateSpeed( accel );
	
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
		speed = -speed * 0.5;
		if( speed > -0.5 ){
			speed = -0.5;
		}
	}
	// Colide with route terminal.
	if( col.gameObject.tag == "Check Point" ){
		if( stageGUI ){
			stageGUI.SendMessage( "OnCheckPoint", parseInt( col.gameObject.name ) );
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

function Accelerate()
{
	inputStats[ InputState.ACCELERATE ] = true;
}

function NoInput()
{
	inputStats[ InputState.ACCELERATE ] = false;
	inputStats[ InputState.BRAKE ] = false;
}

function Brake()
{
	inputStats[ InputState.BRAKE ] = true;
}

@script AddComponentMenu( "RashFlight/Player/PlayerController" )