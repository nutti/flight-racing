#pragma strict

enum State
{
	NORMAL,
	LEAVE_TITLE,
	ENTER_TITLE,
};

private var counter : int = 0;
private var state : State = State.NORMAL;

var initialMultiply : float = 1.25f;

function Start()
{
	initialMultiply = 1.25f;
	counter = 0;
	state = State.NORMAL;

	SetBright( initialMultiply );
}

function SetBright( mul : float )
{
	renderer.material.SetFloat( "_MultiplyTitle", mul );
	renderer.material.SetFloat( "_MultiplyStart", mul );
	renderer.material.SetFloat( "_MultiplyConfig", mul );
	renderer.material.SetFloat( "_MultiplyCopyRight", mul );
}

function Update()
{
	var mul : float;

	switch( state ){
		case State.LEAVE_TITLE:		
			mul = initialMultiply * ( 60 - counter ) / 60.0f;
			SetBright( mul );
			++counter;
			break;
		case State.ENTER_TITLE:
			mul = initialMultiply * ( counter ) / 60.0f;
			SetBright( mul );
			++counter;
			if( counter >= 60 ){
				counter = 0;
				state = State.NORMAL;
			}
			break;
		default:
			counter = 0;
			break;
	}
}

function OnLeaveTitle()
{
	state = State.LEAVE_TITLE;
}

function OnEnterTitle()
{
	state = State.ENTER_TITLE;
}