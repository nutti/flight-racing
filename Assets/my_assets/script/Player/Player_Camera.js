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
	
	var posX = player.transform.position.x + rotRadius * Mathf.Sin( playerDirAngle.y ) * Mathf.Cos( playerDirAngle.x );
	var posY = player.transform.position.y - rotRadius * Mathf.Sin( playerDirAngle.x );
	var posZ = player.transform.position.z - rotRadius * Mathf.Cos( playerDirAngle.y ) * Mathf.Cos( playerDirAngle.x );
	
	transform.position.x = posX;
	transform.position.z = posZ;
	transform.position.y = posY;
	transform.LookAt( player.transform );
}

@script AddComponentMenu( "Player/PlayerCamera" )