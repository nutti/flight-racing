#pragma strict

private var rotAngleY = 0.0;
private var speed = 15.0;
private var angle : Quaternion;

angle = Quaternion.Euler( 0.0, 0.0, 0.0 );

enum InputState
{
	UP			= 0,
	DOWN		= 1,
	RIGHT		= 2,
	LEFT		= 3,
	SHOT		= 4,
	INPUT_TOTAL
}

private var inputStats : boolean [];
inputStats = new boolean [ InputState.INPUT_TOTAL ] ;

function GetRotAngleY()
{
	return angle.y;
}

function GetRotAngleX()
{
	return angle.x;
}

// Update input status.
function UpdateInputStats()
{
	var horizontalInput = Input.GetAxis( "Player Vertical Move" );
	var verticalInput = Input.GetAxis( "Player Horizontal Move" );
	var shotInput = Input.GetAxis( "Shot" );
	
	for( var i = 0; i < InputState.INPUT_TOTAL; ++i ){
		inputStats[ i ] = false;
	}

	if( horizontalInput > 0 ){
		inputStats[ InputState.UP ] = true;
	}
	else if( horizontalInput < 0 ){
		inputStats[ InputState.DOWN ] = true;
	}
	if( verticalInput > 0 ){
		inputStats[ InputState.RIGHT ] = true;
	}
	else if( verticalInput < 0 ){
		inputStats[ InputState.LEFT ] = true;
	}
	
	if( shotInput > 0 ){
		inputStats[ InputState.SHOT ] = true;
	}
}

function Update()
{
	// Update input status.
	UpdateInputStats();

	if( inputStats[ InputState.RIGHT ] ){
		angle.y -= Mathf.Deg2Rad * 0.5;
	}
	else if( inputStats[ InputState.LEFT ] ){
		angle.y += Mathf.Deg2Rad * 0.5;
	}
	
	if( inputStats[ InputState.UP ] ){
		angle.x += Mathf.Deg2Rad * 0.5;
	}
	else if( inputStats[ InputState.DOWN ] ){
		angle.x -= Mathf.Deg2Rad * 0.5;
	}
	
	if( inputStats[ InputState.SHOT ] ){
		//var cube : GameObject;
		//cube = GameObject.Find( "Player Shot" );
		//enemyShots = GameObject.Instantiate( cube, transform.position, Quaternion.Euler( 0.0, 0.0, 0.0 ) );
	}

	transform.position.x -= speed * Mathf.Sin( angle.y ) * Mathf.Cos( angle.x );
	transform.position.y += speed * Mathf.Sin( angle.x );
	transform.position.z += speed * Mathf.Cos( angle.y ) * Mathf.Cos( angle.x );
}

@script AddComponentMenu( "PlayerController" )