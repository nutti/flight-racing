#pragma strict

var height : float = 960.0f;
var width : float = 640.0f;
var ratio : float;
var rect : Rect;
var enable : boolean = true;

function Update()
{
	var cam : Camera;
	var targetAspect : float;
	var curAspect : float;

	if( !enable ){
		return;
	}

	cam = gameObject.GetComponent( Camera );
	
	if( !cam ){
		return;
	}
	
	targetAspect = width / height;
	curAspect = Screen.width * 1.0f / Screen.height;
	ratio = curAspect / targetAspect;
	
	if( 1.0f > ratio ){
		cam.rect.x = 0.0f;
		cam.rect.width = 1.0f;
		cam.rect.y = ( 1.0f - ratio ) / 2.0f;
		cam.rect.height = ratio;
		cam.orthographicSize = Screen.width / 2.0f;
	}
	else{
		ratio = 1.0f / ratio;
		cam.rect.x = ( 1.0f - ratio ) / 2.0f;
		cam.rect.width = ratio;
		cam.rect.y = 0.0f;
		cam.rect.height = 1.0f;
		cam.orthographicSize = Screen.height / 2.0f;
	}
	
	rect = cam.rect;
}

@script AddComponentMenu( "RashFlight/AspectRatioController" )