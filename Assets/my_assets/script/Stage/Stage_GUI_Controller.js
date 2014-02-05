#pragma strict

var stageID : int;
var stageLV : int;
var playerID : int;

var guiSkin : GUISkin;
var lapTimePrefub : Transform;

var timeTotalGUI : GUIText;
var lapTimeGUI : Transform[];
var lapGUI : GUIText;
var speedMeterGUI : GUIText;

var curLap : int = 1;
var curCheckPoint : int = 0;
var lap : int = 1;
var lapTotal : int = 3;

var player : GameObject;
var playerCamera : Camera;

private var lapTime : int[];
private var timeTotal : int = 0;

private var lastGoalThroughTime : int;

function Start()
{
	var i : int;
	lapTime = new int[ lapTotal ];
	for( i = 0; i < lapTime.Length; ++i ){
		lapTime[ i ] = 0;
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
	playerID = gameObject.GetComponent( Global_Variable_Holder ).GetInt( "PLAYER_ID" );
	stageID = gameObject.GetComponent( Global_Variable_Holder ).GetInt( "STAGE_ID" );
	stageLV = gameObject.GetComponent( Global_Variable_Holder ).GetInt( "STAGE_LV" );
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
		
		//base = timeTotal / 10;
		//mili = ( base % 100 ).ToString().PadLeft( 2, System.Convert.ToChar( "0"[0] ) );
		//sec = ( ( base / 100 ) % 60 ).ToString().PadLeft( 2, System.Convert.ToChar( "0"[0] ) );
		//min = ( ( base / 100 ) / 60 ).ToString().PadLeft( 2, System.Convert.ToChar( "0"[0] ) );
		
		timeTotalGUI.text = GetDateString( timeTotal );;
	}
	
	// lap time.
	for( i = 0; i < lap; ++i ){
		var guiText : GUIText = null;
		if( lapTimeGUI[ lap - 1 ] ){
			guiText = lapTimeGUI[ lap - 1 ].GetComponent( GUIText );
		}
		if( guiText ){
			//base = timeTotal / 10;
			//mili = ( base % 100 ).ToString().PadLeft( 2, System.Convert.ToChar( "0"[0] ) );
			//sec = ( ( base / 100 ) % 60 ).ToString().PadLeft( 2, System.Convert.ToChar( "0"[0] ) );
			//min = ( ( base / 100 ) / 60 ).ToString().PadLeft( 2, System.Convert.ToChar( "0"[0] ) );
			
			guiText.text = GetDateString( lapTime[ i ] );;
		}
	}
	
	// lap.
	if( lapGUI ){
		lapGUI.text = lap + "/" + lapTotal;
	}
	
	// speed.
	if( player && speedMeterGUI ){
		speedMeterGUI.text = Mathf.FloorToInt( ( player.GetComponent( Player_Controller ).speed * 90.0f * 3600.0f / 1000.0f ) ) + " km/h";
	}
}

function Reset()
{
	lastGoalThroughTime = GetMilisecond( System.DateTime.Now );
}

function Update()
{
	var i : int;

	// update lap time.
	lapTime[ lap - 1 ] = GetMilisecond( System.DateTime.Now ) - lastGoalThroughTime;

	// calculate time total.
	timeTotal = 0;
	for( i = 0; i < lapTime.Length; ++i ){
		timeTotal += lapTime[ i ];
	}
	
	if( !player || !playerCamera ){
		return;
	}
	
	// input from GUI.
	if( Input.GetMouseButtonDown( 0 ) ){
		var clickedPos : Vector3;
		var ray : Ray;
		var hit : RaycastHit;
		var hitObject : GameObject;

		clickedPos = Input.mousePosition;
		ray = playerCamera.ScreenPointToRay( clickedPos );
		
		if( Physics.Raycast( ray, hit ) ){
			hitObject = hit.collider.gameObject;
			if( hitObject.name == "Accel Button" ){
				player.GetComponent( Player_Controller ).Accelerate();
			}
			else if( hitObject.name == "Brake Button" ){
				player.GetComponent( Player_Controller ).Brake();
			}
		}
	}
	if( Input.GetMouseButtonUp( 0 ) ){
		player.GetComponent( Player_Controller ).NoInput();
	}
}

function FinalizeStage()
{
	var stageProgressTime : int[] = new int[ 4 ];
	var stageProgress : int;
	var stageRecord : int;

	var i : int;
	for( i = 0; i < stageProgressTime.Length; ++i ){
		stageProgressTime[ i ] = GetComponent( Global_Variable_Holder ).GetInt( "STAGE_PROGRESS_TIME_" + i );
	}
	stageProgress = GetComponent( Global_Variable_Holder ).GetInt( "STAGE_PROGRESS" );
	stageRecord = GetComponent( Global_Variable_Holder ).GetInt( "STAGE_RECORD" );
	
	if( stageRecord < 0 || timeTotal < stageRecord ){
		GetComponent( Game_Data_Holder ).SaveRecord( playerID, stageID, stageLV, timeTotal );
	}
	for( i = stageProgress + 1; i < stageProgressTime.Length; ++i ){
		if( timeTotal < stageProgressTime[ i ] ){
			GetComponent( Game_Data_Holder ).SaveProgress( playerID, stageID, stageLV, i );
		}
	}

	Application.LoadLevel( "stage_selection" );
}

function OnCheckPoint( checkPoint : int )
{
	var nextCheckPoint : int;
	
	nextCheckPoint = ( curCheckPoint + 1 ) % 3;
	
	// forward
	if( checkPoint == nextCheckPoint ){
		++curCheckPoint;
		if( curCheckPoint >= 3 ){
			++curLap;
			if( curLap > lap ){
				StartNextLap();
			}
			curCheckPoint = 0;
		}
	}
	// back
	else{
		--curCheckPoint;
		if( curCheckPoint < 0 ){
			--curLap;
			curCheckPoint = 2;
		}
	}
}

function GetMilisecond( date : System.DateTime ) : int
{
	return ( ( ( date.Minute * 60 ) + date.Second ) * 1000 ) + date.Millisecond;
}

function GetDateString( milisec : int ) : String
{
	var base : int;
	var min : int;
	var sec : int;
	var mili : int;

	base = milisec / 10;
	mili = ( base % 100 );
	sec = ( ( base / 100 ) % 60 );
	min = ( ( base / 100 ) / 60 );

	return String.Format( "{0:D2}.{1:D2}.{2:D2}", min, sec, mili );
}

function StartNextLap()
{
	if( lap >= lapTotal ){
		FinalizeStage();
		return;
	}

	lapTimeGUI[ lap ] = Instantiate( lapTimePrefub );
	lapTimeGUI[ lap ].GetComponent( GUI_Font_Size_Adjuster ).cam = GameObject.Find( "Player/Player Camera" );
	lapTimeGUI[ lap ].transform.position.y -= lap * 0.05f;
	lastGoalThroughTime = GetMilisecond( System.DateTime.Now );
	
	++lap;
}

@script AddComponentMenu( "RashFlight/Stage/StageGUIController" )