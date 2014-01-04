#pragma strict

var x : float = 0.0f;
var y : float = 0.0f;
var width : float = 1.0f;
var height : float = 1.0f;

var screen : Vector3;

var cam : GameObject;

var enable : boolean;

function Update()
{
	var texture : GUITexture;
	
	texture = GetComponent( GUITexture );
	
	if( !texture ){
		return;
	}

	if( !cam || !enable ){
		screen.Set( Screen.width, Screen.height, 1.0f );
		texture.pixelInset.x = x * Screen.width;
		texture.pixelInset.y = y * Screen.height;
		texture.pixelInset.width = width * Screen.width;
		texture.pixelInset.height = height * Screen.height;
	}
	else{
		var rect : Rect;
		var h : float;
		var w : float;
		rect = cam.GetComponent( Aspect_Ratio_Controller ).rect;
		h = cam.GetComponent( Aspect_Ratio_Controller ).height;
		w = cam.GetComponent( Aspect_Ratio_Controller ).width;
		texture.pixelInset.x = ( x * rect.width ) * Screen.width;
		texture.pixelInset.y = ( y * rect.height ) * Screen.height;
		texture.pixelInset.width = width * rect.width * Screen.width;
		texture.pixelInset.height = height * rect.height * Screen.height;
	}
}


@script AddComponentMenu( "RashFlight/System/CrossPlatformGUIController" )