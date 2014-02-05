#pragma strict

var cam : GameObject = null;

var fontSize : float = 10;

function Update ()
{
	if( !cam ){
		return;
	}
	
	var ratio : float;
	
	ratio = Screen.height / cam.GetComponent( Aspect_Ratio_Controller ).height;

	GetComponent( GUIText ).fontSize = ratio * fontSize;
}

@script AddComponentMenu( "RashFlight/System/GUIFontSizeAdjuster" )