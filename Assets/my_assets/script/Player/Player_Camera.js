#pragma strict

// Targeted player.
var player : GameObject;

private var playerCtrl : Player_Controller;
playerCtrl = player.GetComponent( Player_Controller );

function Update()
{
	if( !player ){
		return;
	}
	
	var rotRadius = 10.0;
	
	var playerDirAngle : Vector3;
	playerDirAngle = playerCtrl.GetDirAngle();
	
	transform.position = player.transform.position - player.transform.forward * rotRadius;
	transform.LookAt( player.transform );
	transform.Translate( 0, 2.0, 0 );
}

@script AddComponentMenu( "Player/PlayerCamera" )