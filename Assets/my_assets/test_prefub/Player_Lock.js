#pragma strict

var playerCamera : GameObject;
var testPlayer : GameObject;
private var pos : Vector3;

function Start()
{
	playerCamera = GameObject.Find( "Player Camera" );
	testPlayer = GameObject.Find( "Test Player" );
}

function Update()
{
	pos = playerCamera.camera.WorldToScreenPoint( testPlayer.transform.position );
	
}

function OnGUI()
{
	if( pos.z > 0 ){
		GUI.Label( Rect( pos.x, Screen.height - pos.y, 100, 30 ), "Test kun" );
	}
}

@script AddComponentMenu( "Player/PlayerLock" )