#pragma strict

var counter : int;
counter = 0;


function Update()
{
	renderer.material.color.g = Mathf.Abs(Mathf.Sin(counter * 0.05));
	counter++;
}


@script AddComponentMenu( "ColorChanging/ColorChanging" )