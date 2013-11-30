#pragma strict

var count: int = 0;
var t: float = 0;
var prev_t : float = 0;
var info: String = "";

function Awake()
{
	Application.targetFrameRate = 60;
}

function Update()
{
	t += Time.deltaTime;
	
	++count;
	
	/*if( t >= 1.0 ){
		info = t + " : " + count + " count";
		t = 0.0;
		count = 0;
	}*/
	
	if( count % 60 == 0 ){
		//print( "FPS=" + t );
		prev_t = t;
	}
}