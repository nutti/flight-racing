#pragma strict

var counter : int;
counter = 0;


function Update()
{
	renderer.material.color.r = 1.0f - 0.5f * Mathf.Abs(Mathf.Sin(counter * 0.05));
	renderer.material.color.g = 1.0f - 0.5f * Mathf.Abs(Mathf.Sin(counter * 0.05));
	renderer.material.color.b = 1.0f;
	counter++;
}

@script AddComponentMenu( "ColorChanging/ColorChanging2" )