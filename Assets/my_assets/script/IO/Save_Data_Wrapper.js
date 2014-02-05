#pragma strict

function LoadInt( key : String ) : int
{
	return PlayerPrefs.GetInt( key, -1 );
}

function LoadFloat( key : String ) : float
{
	return PlayerPrefs.GetFloat( key, -1.0f );
}

function SaveInt( key : String, val : int )
{
	PlayerPrefs.SetInt( key, val );
}

function SaveFloat( key : String, val : float )
{
	PlayerPrefs.SetFloat( key, val );
}

function DeleteAll()
{
	PlayerPrefs.DeleteAll();
}

@script AddComponentMenu( "RashFlight/System/SaveDataWrapper" )
