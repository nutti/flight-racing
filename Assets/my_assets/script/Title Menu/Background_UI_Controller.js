#pragma strict

var multiplyTitle : float = 1.0f;
var multiplyStart : float = 1.15f;
var multiplyConfig : float = 1.15f;
var multiplyCopyRight : float = 0.0f;

private var counter : int = 0;

function Start()
{
}

function Update()
{
	//multiplyConfig = 0.5f + 0.5f * Mathf.Sin( counter * 0.01f );
	//multiplyStart = 0.5f + 0.5f * Mathf.Sin( counter * 0.05f );

	renderer.materials[ 0 ].SetFloat( "_MultiplyTitle", multiplyTitle );
	renderer.materials[ 0 ].SetFloat( "_MultiplyStart", multiplyStart );
	renderer.materials[ 0 ].SetFloat( "_MultiplyConfig", multiplyConfig );
	renderer.materials[ 0 ].SetFloat( "_MultiplyCopyRight", multiplyCopyRight );
	
	++counter;
}

@script AddComponentMenu( "RashFlight/TitleMenu/BackgroundUIController" )