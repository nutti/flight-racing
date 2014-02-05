#pragma strict

enum PlayerID
{
	SPEEDY	= 0,
	RSV_1	= 1,
	RSV_2	= 2,
	HIDDEN	= 3,
	TOTAL,
};

enum StageID
{
	FACTORY		= 0,
	CAVE		= 1,
	SPACE		= 2,
	CYBER		= 3,
	VOLCANO		= 4,
	TOTAL,
};

enum LevelID
{
	LV_1		= 0,
	LV_2		= 1,
	LV_3		= 2,
	LV_4		= 3,
	LV_5		= 4,
	TOTAL,
};

var selectedStage : int = StageID.FACTORY;
var selectedLevel : int = LevelID.LV_1;
var selectedPlayer : int = PlayerID.SPEEDY;
var stageRecord : int;
var stageProgress : int;		// 0-3
var stageProgressTime : int[];

var ui : GameObject;
var background : GameObject;
var bestTimeGUI : GameObject;
var achivementGUI : GameObject;
var starsGUI : GameObject;

private var counter : int = 0;

function Start()
{
	selectedStage = StageID.FACTORY;
	selectedLevel = LevelID.LV_1;
	selectedPlayer = PlayerID.SPEEDY;
	
	ReloadStageData();
	
	counter = 0;
}

function ReloadStageData()
{
	stageRecord = GetComponent( Game_Data_Holder ).LoadRecord( selectedPlayer, selectedStage, selectedLevel );
	stageProgress = GetComponent( Game_Data_Holder ).LoadProgress( selectedPlayer, selectedStage, selectedLevel );

	var i : int;
	stageProgressTime = new int[ 4 ];
	for( i = 0; i < stageProgressTime.Length; ++i ){
		stageProgressTime[ i ] = GetComponent( Target_Time_List ).GetTargetRecord( selectedStage, selectedLevel, i ) * 10;
	}
}

function OnGUI()
{
	if( GUI.Button( Rect( 0, 0, 100, 100 ), "Start" ) ){
		StartStage();
	}
	
	
	GUI.TextArea( Rect( 200, 200, 100, 100 ), "[" + selectedPlayer + "] " + selectedStage + "-" + selectedLevel + " : " + stageRecord );
	
	if( stageProgress != -1 ){
		GUI.TextArea( Rect( 200, 250, 100, 100 ), "" + stageProgress );
		if( stageProgress < stageProgressTime.Length - 1 ){
			GUI.Label( Rect( 400, 200, 100, 100 ), "" + stageProgressTime[ stageProgress + 1 ] );
		}
	}
	
	if( GUI.Button( Rect( 400, 0, 100, 50 ), "Delete Save Data" ) ){
		GetComponent( Save_Data_Wrapper ).DeleteAll();
		ReloadStageData();
	}
}

function StartStage()
{
	var stageList : String[] = [ "factory", "cave", "space", "cyber", "volcano" ];

	GetComponent( Global_Variable_Holder ).SetInt( "PLAYER_ID", selectedPlayer );
	GetComponent( Global_Variable_Holder ).SetInt( "STAGE_ID", selectedStage );
	GetComponent( Global_Variable_Holder ).SetInt( "STAGE_LV", selectedLevel );
	GetComponent( Global_Variable_Holder ).SetInt( "STAGE_RECORD", stageRecord );
	GetComponent( Global_Variable_Holder ).SetInt( "STAGE_PROGRESS", stageProgress );
	var i : int;
	for( i = 0; i < stageProgressTime.Length; ++i ){
		GetComponent( Global_Variable_Holder ).SetInt( "STAGE_PROGRESS_TIME_" + i, stageProgressTime[ i ] );
	}	

	//Application.LoadLevel( "stage_" + stageList[ selectedStage ] + "_lv" + ( selectedLevel + 1 ) );
	Application.LoadLevel( "stage_cave_lv1" );
}

function Update()
{
	if( counter == 0 ){
		DoInitialEffect();
	}
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

function CalcAchivement() : int
{
	var player : int;
	var stage : int;
	var lv : int;
	var progress : int;
	var achivement : int = 0;
	
	for( player = 0; player < PlayerID.TOTAL; ++player ){
		for( stage = 0; stage < StageID.TOTAL; ++stage ){
			for( lv = 0; lv < LevelID.TOTAL; ++lv ){
				progress = GetComponent( Game_Data_Holder ).LoadProgress( player, stage, lv );
				achivement += progress + 1;
			}
		}
	}
	
	return achivement;
}

function DoInitialEffect()
{
	if( ui ){
		ui.GetComponent( UI_Controller ).SendMessage( "OnEnterStageSelection" );
	}
	if( background ){
		background.GetComponent( Background_Controller ).SendMessage( "OnEnterStageSelection" );
	}
	if( bestTimeGUI ){
		bestTimeGUI.GetComponent( GUIText ).text = GetDateString( stageRecord );
	}
	if( achivementGUI ){
		var achivement : int;
		achivement = CalcAchivement();
		achivementGUI.GetComponent( GUIText ).text = String.Format( "{0}.{1:D2}", achivement / 4, ( achivement % 4 ) * 25 ) + " %";
	}
	yield WaitForSeconds( 1 );
}