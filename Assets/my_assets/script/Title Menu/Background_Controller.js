#pragma strict

var centerX : float = 0.5f;
var centerY : float = 0.5f;
var width : float = 1.0f;
var height : float = 1.0f;
var dwidth : float = 0.003f;
var dheight : float = 0.003f;

function Start()
{
	renderer.materials[ 0 ].SetFloat( "_CenterX", centerX );
	renderer.materials[ 0 ].SetFloat( "_CenterY", centerY );
}

function Update()
{
	width += dwidth;
	height += dheight;
	
	if( width > 1.3f ){
		width = -1.3f;
	}
	else if( width < - 1.3f ){
		width = 1.3f;
	}
	if( height > 1.3f ){
		height = -1.3f;
	}
	else if( height < - 1.3f ){
		height = 1.3f;
	}

	renderer.materials[ 0 ].SetFloat( "_Width", width );
	renderer.materials[ 0 ].SetFloat( "_Height", height );
}

@script AddComponentMenu( "RashFlight/TitleMenu/BackgroundController" )