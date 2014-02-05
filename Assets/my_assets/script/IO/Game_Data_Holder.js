#pragma strict

function LoadProgress( player : int, stage : int, level : int ) : float
{
	var key : String;
	key = "Progress.Player" + player + ".Stage" + stage + ".Level" + level;
	
	return gameObject.GetComponent( Save_Data_Wrapper ).LoadInt( key );
}

function LoadRecord( player : int, stage : int, level : int ) : int
{
	var key : String;
	key = "Record.Player" + player + ".Stage" + stage + ".Level" + level;
	
	return gameObject.GetComponent( Save_Data_Wrapper ).LoadInt( key );
}

function SaveProgress( player : int, stage : int, level : int, progress : int )
{
	var key : String;
	key = "Progress.Player" + player + ".Stage" + stage + ".Level" + level;
	
	gameObject.GetComponent( Save_Data_Wrapper ).SaveInt( key, progress );
}

function SaveRecord( player : int, stage : int, level : int, time : int )
{
	var key : String;
	key = "Record.Player" + player + ".Stage" + stage + ".Level" + level;

	gameObject.GetComponent( Save_Data_Wrapper ).SaveInt( key, time );
}

function SaveAchivement( pts : int )
{
	var key : String;
	key = "Achivement";
	
	gameObject.GetComponent( Save_Data_Wrapper ).SaveInt( key, pts );
}

function LoadAchivement() : int
{
	var key : String;
	key = "Achivement";
	
	return gameObject.GetComponent( Save_Data_Wrapper ).LoadInt( key );
}

@script AddComponentMenu( "RashFlight/System/GameDataHolder" )
