#pragma strict


var trail : Transform;

function Start()
{
	var newObj : Transform;
	newObj = Instantiate( trail, transform.position, Quaternion.Euler( 0.0, 0.0, 0.0 ) );
}

@script AddComponentMenu( "Player/PlayerTrail" )