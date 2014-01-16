#pragma strict

var player : GameObject;
var item : Transform;
var counter : int;
counter = 0;

private var player_position : Vector3;
private var player_direction : Vector3;
private var player_direction_normalized : Vector3;
	
function Update()
{
	counter++;

	//transform.position.z += GetComponent( TestPlayer_Speed ).GetSpeed();
	
	player = GameObject.Find( "Player" );
	player_position = player.transform.position;
	player_direction = player_position - transform.position;
	player_direction = Vector3.Normalize( player_direction );
	transform.position += player_direction * GetComponent( TestPlayer_Speed ).GetSpeed();
	
	if( counter % 300 == 0 ){
		var newObj : Transform;
		newObj = Instantiate( item, transform.position, Quaternion.Euler( 0.0, 0.0, 0.0 ) );
	}
}



@script AddComponentMenu( "TestPlayer/TestPlayer_Controller" )