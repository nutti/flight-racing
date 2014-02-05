#pragma strict

var cam : Camera;
var hitObject : GameObject = null;
var moveToNextScene : boolean = false;

var ui : GameObject;
var background : GameObject;

var counter : int = 0;

function Start()
{
	cam = Camera.main;
	counter = 0;
}

function Update()
{
	if( counter ==0 ){
		DoInitialEffect();
	}
	
	++counter;

	if( !cam || moveToNextScene || counter < 120 ){
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
				MoveToStageSelection();
			}
			hitObject = null;
		}
	}
}

function DoInitialEffect()
{
	if( ui ){
		ui.GetComponent( UI_Controller ).SendMessage( "OnEnterTitle" );
	}
	if( background ){
		background.GetComponent( Background_Controller ).SendMessage( "OnEnterTitle" );
	}
	yield WaitForSeconds( 2 );
}

function MoveToStageSelection()
{
	if( ui ){
		ui.GetComponent( UI_Controller ).SendMessage( "OnLeaveTitle" );
	}
	if( background ){
		background.GetComponent( Background_Controller ).SendMessage( "OnLeaveTitle" );
	}
	yield WaitForSeconds( 2 );
	Application.LoadLevel( "stage_selection" );
}