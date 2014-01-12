#pragma strict

var cam : Camera;
var hitObject : GameObject = null;
var moveToNextScene : boolean = false;

function Start()
{
	cam = Camera.main;
}

function Update()
{
	if( !cam || moveToNextScene ){
		return;
	}
		
	if( Input.GetMouseButtonDown( 0 ) ){
		var clickedPos : Vector3;
		var ray : Ray;
		var hit : RaycastHit;

		clickedPos = Input.mousePosition;
		ray = cam.ScreenPointToRay( clickedPos );
		
		if( Physics.Raycast( ray, hit ) ){
			hitObject = hit.collider.gameObject;
		}
	}
	if( Input.GetMouseButtonUp( 0 ) ){
		if( hitObject ){
			if( hitObject.name == "Start Button" ){
				moveToNextScene = true;
				Application.LoadLevel( "stage_selection" );
			}
			hitObject = null;
		}
	}
	
	
}