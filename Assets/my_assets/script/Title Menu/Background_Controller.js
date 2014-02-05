#pragma strict

var centerX : float = 0.5f;
var centerY : float = 0.5f;
var width : float = 1.2f;
var height : float = 1.2f;
var dwidth : float = 0.003f;
var dheight : float = 0.003f;

var effectMultiply : float = 1.75f;
var backgroundColor : Color = Color( 0.8f, 0.8f, 0.8f, 1.0f );

private var counter : int = 0;
private var state : State = State.NORMAL;

function Start()
{
	renderer.materials[ 0 ].SetFloat( "_CenterX", centerX );
	renderer.materials[ 0 ].SetFloat( "_CenterY", centerY );
	renderer.materials[ 0 ].SetColor( "_Color", backgroundColor );
	renderer.materials[ 0 ].SetFloat( "_Multiply", effectMultiply );
	counter = 0;
	state = State.NORMAL;
	width = 1.2f;
	height = 1.2f;
	SetBright( 0.7f );
}

function SetBright( mul : float )
{
	renderer.materials[ 0 ].SetColor( "_Color", Color(	backgroundColor.r * mul,
														backgroundColor.g * mul,
														backgroundColor.b * mul,
														backgroundColor.a * mul ) );
	renderer.materials[ 0 ].SetFloat( "_Multiply", effectMultiply * mul );
}

function Update()
{

	// effect
	
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
	
	// background
	
	var mul : float;

	switch( state ){
		case State.LEAVE_TITLE:		
			mul = ( ( 60 - counter ) / 120.0f ) * 0.3f + 0.7f;
			SetBright( mul );
			renderer.materials[ 0 ].SetFloat( "_Multiply", effectMultiply * ( ( 60 - counter ) / 60.0f ) );
			++counter;
			if( counter >= 60 ){
				counter = 0;
				state = State.NORMAL;
			}
			break;
		case State.ENTER_TITLE:
			mul = ( ( counter ) / 30.0f ) * 0.3f + 0.7f;
			SetBright( mul );
			++counter;
			if( counter >= 30 ){
				counter = 0;
				state = State.NORMAL;
			}
			break;
		default:
			counter = 0;
			break;
	}
}

function OnLeaveTitle()
{
	state = State.LEAVE_TITLE;
}

function OnEnterTitle()
{
	state = State.ENTER_TITLE;
}


@script AddComponentMenu( "RashFlight/TitleMenu/BackgroundController" )