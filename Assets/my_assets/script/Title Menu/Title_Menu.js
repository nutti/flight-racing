#pragma strict

function OnGUI()
{
	if( GUI.Button( Rect( 150, 280, 100, 30 ), "Start" ) ){
		Application.LoadLevel( "flight_racing" );
		}
}