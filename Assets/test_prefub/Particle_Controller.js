#pragma strict

private var player : GameObject;

function Update()
{
	player = GameObject.Find( "Player" );
	transform.position = player.transform.position;
	transform.rotation = player.transform.rotation;
	transform.Rotate( Vector3( 1, 0, 0 ), 180 );
	
	if( !particleSystem.isPlaying ){
		Destroy( gameObject );
	}
}


@script AddComponentMenu( "Particle/ParticleController" )