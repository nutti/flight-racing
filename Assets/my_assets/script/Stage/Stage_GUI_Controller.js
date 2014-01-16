#pragma strict

var guiSkin : GUISkin;
var lapTimePrefub : Transform;

var timeTotalGUI : GUIText;
var lapTimeGUI : Transform[];
var lapGUI : GUIText;
var speedMeterGUI : GUIText;

var lap : int = 1;
var lapTotal : int = 3;

private var lapTime : float[];
private var timeTotal : float = 0.0f;

private var lastGoalThroughTime : float = 0.0f;

function Start()
{
	var i : int;
	lapTime = new float[ lapTotal ];
	for( i = 0; i < lapTime.Length; ++i ){
		lapTime[ i ] = 0.0f;
	}
	lapTimeGUI = new Transform[ lapTotal ];
	for( i = 0; i < lapTimeGUI.Length; ++i ){
		if( i == 0 ){
			lapTimeGUI[ i ] = Instantiate( lapTimePrefub );
			lapTimeGUI[ i ].GetComponent( GUI_Font_Size_Adjuster ).cam = GameObject.Find( "Player/Player Camera" );
		}
		else{
			lapTimeGUI[ i ] = null;
		}
	}
	Reset();
}

function OnGUI()
{
	var i : int;

	//------------------------------------
	// Interactive GUI
	//------------------------------------
	
	// accel.
	
	// back.

	//------------------------------------
	// Non-interactive GUI
	//------------------------------------

	// total time.
	if( timeTotalGUI ){
		var base : int;
		var min : String;
		var sec : String;
		var mili : String;
		
		base = Mathf.FloorToInt( timeTotal * 100 );
		mili = ( base % 100 ).ToString().PadLeft( 2, System.Convert.ToChar( "0"[0] ) );
		sec = ( ( base / 100 ) % 60 ).ToString().PadLeft( 2, System.Convert.ToChar( "0"[0] ) );
		min = ( ( base / 100 ) / 60 ).ToString().PadLeft( 2, System.Convert.ToChar( "0"[0] ) );
		
		timeTotalGUI.text = min + ":" + sec + "." + mili;
	}
	
	// lap time.
	var guiText : GUIText = null;
	if( lapTimeGUI[ lap - 1 ] ){
		guiText = lapTimeGUI[ lap - 1 ].GetComponent( GUIText );
	}
	if( guiText ){
		base = Mathf.FloorToInt( lapTime[ lap - 1 ] * 100 );
		mili = ( base % 100 ).ToString().PadLeft( 2, System.Convert.ToChar( "0"[0] ) );
		sec = ( ( base / 100 ) % 60 ).ToString().PadLeft( 2, System.Convert.ToChar( "0"[0] ) );
		min = ( ( base / 100 ) / 60 ).ToString().PadLeft( 2, System.Convert.ToChar( "0"[0] ) );
		
		guiText.text = min + ":" + sec + "." + mili;
	}
	
	// lap.
	if( lapGUI ){
		lapGUI.text = lap + "/" + lapTotal;
	}
	
	// speed.
	var player : GameObject;
	player = GameObject.Find( "Player/Player" );
	if( player && speedMeterGUI ){
		speedMeterGUI.text = Mathf.FloorToInt( ( player.GetComponent( Player_Controller ).speed * 90.0f * 3600.0f / 1000.0f ) ) + " km/h";
	}
}

function Reset()
{
	lastGoalThroughTime = Time.time;
}

function Update()
{
	var i : int;

	// update lap time.
	lapTime[ lap - 1 ] = Time.time - lastGoalThroughTime;

	// calculate time total.
	timeTotal = 0.0f;
	for( i = 0; i < lapTime.Length; ++i ){
		timeTotal += lapTime[ i ];
	}
}

@script AddComponentMenu( "RashFlight/Stage/StageGUIController" )