#pragma strict

private var lightPlane : GameObject;

var counter : int;
counter = 0;

function Start()
{
	lightPlane = GameObject.Find( "Light Plane" );

	transform.position = lightPlane.transform.position;
	transform.localScale = lightPlane.transform.localScale;
}

function Update()
{
	renderer.material.color.r = 1.0f;
	renderer.material.color.g = 1.0f - 0.5f * Mathf.Abs(Mathf.Sin(counter * 0.05));
	renderer.material.color.b = 1.0f - 0.5f * Mathf.Abs(Mathf.Sin(counter * 0.05));
	counter++;
}

@script AddComponentMenu( "LightPlane/LightPlane" )