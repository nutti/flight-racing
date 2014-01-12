#pragma strict

function LoadProgress( player : int, stage : int ) : float
{
	var key : String;
	key = "Progress.Player" + player + ".Stage" + stage;
	
	return gameObject.GetComponent( Save_Data_Wrapper ).LoadInt( key );
}

function LoadRecord( player : int, stage : int, level : int ) : float
{
	var key : String;
	key = "Record.Player" + player + ".Stage" + stage + ".Level" + level;
	
	return gameObject.GetComponent( Save_Data_Wrapper ).LoadFloat( key );
}

function SaveProgress( player : int, stage : int, progress : int )
{
	var key : String;
	key = "Progress.Player" + player + ".Stage" + stage;
	
	gameObject.GetComponent( Save_Data_Wrapper ).SaveInt( key, progress );
}

function SaveRecord( player : int, stage : int, level : int, time : float )
{
	var key : String;
	key = "Record.Player" + player + ".Stage" + stage + ".Level" + level;

	gameObject.GetComponent( Save_Data_Wrapper ).SaveFloat( key, time );
}

@script AddComponentMenu( "RashFlight/System/GameDataHolder" )
