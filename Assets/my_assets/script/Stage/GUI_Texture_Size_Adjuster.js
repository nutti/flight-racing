#pragma strict

var cam : GameObject = null;

var x : float = 1.0f;
var y : float = 1.0f;
var height : float = 32.0f;
var width : float = 32.0f;

function Update ()
{
	if( !cam ){
		return;
	}
	
	var ratio : float;
	
	ratio = cam.GetComponent( Aspect_Ratio_Controller ).ratio;
	
	var guiTex : GUITexture;
	
	guiTex = GetComponent( GUITexture );
	if( guiTex ){
		var rect : Rect;
		var h : float;
		var w : float;
		rect = cam.GetComponent( Aspect_Ratio_Controller ).rect;
		h = height * rect.height * Screen.height;
		w = width * rect.width * Screen.width;
		guiTex.pixelInset.x = ( x * rect.width ) * Screen.width;
		guiTex.pixelInset.y = ( y * rect.height ) * Screen.height;
		if( h > w ){
			guiTex.pixelInset.width = w;
			guiTex.pixelInset.height = w;
		}
		else{
			guiTex.pixelInset.width = h;
			guiTex.pixelInset.height = h;
		}
	}
}

@script AddComponentMenu( "RashFlight/System/GUITextureSizeAdjuster" )