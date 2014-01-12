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

function Start()
{
	selectedStage = Stage.FACTORY;
	selectedLevel = Level.LV_1;
	selectedPlayer = Player.SPEEDY;
	stageRecord = gameObject.GetComponent( Game_Data_Holder ).LoadRecord( selectedPlayer, selectedStage, selectedLevel );
}

function OnGUI()
{
	if( GUI.Button( Rect( 0, 0, 100, 100 ), "Start" ) ){
		StartStage();
	}
	
	GUI.TextArea( Rect( 200, 200, 100, 100 ), "[" + selectedPlayer + "] " + selectedStage + "-" + selectedLevel + " : " + stageRecord );
}

function StartStage()
{
	var stageList : String[] = [ "factory", "cave", "space", "cyber", "volcano" ];

	Application.LoadLevel( "stage_" + stageList[ selectedStage ] + "_lv" + ( selectedLevel + 1 ) );
}

function Update()
{
	
}