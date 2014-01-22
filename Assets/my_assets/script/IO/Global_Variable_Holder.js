#pragma strict

function SetInt( name : String, val : int )
{
	var key : String;
	key = "GlobalVariable." + name;
	
	GetComponent( Save_Data_Wrapper ).SaveInt( key, val );
}

function SetFloat( name : String, val : float )
{
	var key : String;
	key = "GlobalVariable." + name;
	
	GetComponent( Save_Data_Wrapper ).SaveFloat( key, val );
}

function GetInt( name : String ) : int
{
	var key : String;
	key = "GlobalVariable." + name;
	
	return GetComponent( Save_Data_Wrapper ).LoadInt( key );
}

function GetFloat( name : String ) : float
{
	var key : String;
	key = "GlobalVariable." + name;
	
	return GetComponent( Save_Data_Wrapper ).LoadFloat( key );
}

@script AddComponentMenu( "RashRush/Script/IO/GlobalVariableHolder" )
