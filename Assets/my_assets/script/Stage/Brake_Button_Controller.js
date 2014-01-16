#pragma strict

var player : GameObject;

function OnMouseDown()
{
	if( !player ){
		return;
	}
	
	player.GetComponent( Player_Controller ).Brake();
}

function OnMouseUp()
{
	if( !player ){
		return;
	}
	
	player.GetComponent( Player_Controller ).NoInput();
}