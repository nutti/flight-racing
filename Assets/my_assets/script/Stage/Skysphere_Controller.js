#pragma strict

var masterObject : Transform;

function Update()
{
	transform.position = masterObject.position;
}

@script AddComponentMenu( "FlightRacing/Stage/SkySphereController" )