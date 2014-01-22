#pragma strict

enum Player
{
	SPEEDY	= 0,
	TOTAL,
};

enum Stage
{
	FACTORY		= 0,
	CAVE		= 1,
	SPACE		= 2,
	CYBER		= 3,
	VOLCANO		= 4,
	TOTAL,
};

enum Level
{
	LV_1		= 0,
	LV_2		= 1,
	LV_3		= 2,
	LV_4		= 3,
	LV_5		= 4,
	TOTAL,
};

var selectedStage : int = Stage.FACTORY;
var selectedLevel : int = Level.LV_1;
var selectedPlayer : int = Player.SPEEDY;
var stageRecord : float;
var stageProgress : int;		// 0-3
var stageNextProgressTime : int;

function Start()
{
	selectedStage = Stage.FACTORY;
	selectedLevel = Level.LV_1;
	selectedPlayer = Player.SPEEDY;
	stageRecord = GetComponent( Game_Data_Holder ).LoadRecord( selectedPlayer, selectedStage, selectedLevel );
	
	stageProgress = GetComponent( Game_Data_Holder ).LoadProgress( selectedPlayer, selectedStage, selectedLevel );
	if( stageProgress < 3 ){
		stageNextProgressTime = GetComponent( Target_Time_List ).GetTargetRecord( selectedStage, selectedLevel, stageProgress + 1 );
	}
	else{
		stageNextProgressTime = -1;
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
		GUI.Label( Rect( 400, 200, 100, 100 ), "" + stageNextProgressTime );
	}
}

function StartStage()
{
	var stageList : String[] = [ "factory", "cave", "space", "cyber", "volcano" ];

	GetComponent( Global_Variable_Holder ).SetInt( "PLAYER_ID", selectedPlayer );
	GetComponent( Global_Variable_Holder ).SetInt( "STAGE_ID", selectedStage );
	GetComponent( Global_Variable_Holder ).SetInt( "STAGE_LV", selectedLevel );
	GetComponent( Global_Variable_Holder ).SetFloat( "STAGE_RECORD", stageRecord );
	GetComponent( Global_Variable_Holder ).SetInt( "STAGE_PROGRESS", stageProgress );
	GetComponent( Global_Variable_Holder ).SetInt( "STAGE_NEXT_PROGRESS_TIME", stageNextProgressTime );
	

	Application.LoadLevel( "stage_" + stageList[ selectedStage ] + "_lv" + ( selectedLevel + 1 ) );
}

function Update()
{
	
}