#pragma strict

var cam : GameObject = null;

var fontSize : float = 10;

function Update ()
{
	if( !cam ){
		return;
	}
	
	var ratio : float;
	
	ratio = cam.GetComponent( Aspect_Ratio_Controller ).ratio;
	
	GetComponent( GUIText ).fontSize = ratio * fontSize;
}

@script AddComponentMenu( "RashFlight/System/GUIFontSizeAdjuster" )