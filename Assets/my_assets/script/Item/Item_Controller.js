#pragma strict

var materials : Material[];
var itemPrehab : Transform;

var itemID : int;				// Item ID.
var itemNum : int;				// Number of items.
var shakingSpeed : float;		// Shaking speed.
var shakingMagnitude : float;	// Shaking magnitude.

private var counter : int;		// Internal counter.

enum ItemID
{
	SHOT			= 0,		// Shot.
	MINE			= 1,		// Mine.
	LASER			= 2,		// Laser.
	MISSILE			= 3,		// Missile.
	BARRIER			= 4,		// Barrier.
	BOOSTER			= 5,		// Booster.
	SHOCKWAVE		= 6,		// Shockwave.
	ITEM_ID_TOTAL
}

shakingSpeed = 0.06f;
shakingMagnitude = 0.03f;
counter = 0;

function Initialize()
{
	itemID = Random.Range( 0, ItemID.ITEM_ID_TOTAL );		// Item should be randomize.
	itemNum = 1;
	if( itemID >= 0 && materials.Length > itemID ){
		renderer.material = materials[ itemID ];
	}
}

function Start()
{
	Initialize();
}

function Update()
{
	transform.position.y += shakingMagnitude * Mathf.Sin( counter * shakingSpeed );
	
	++counter;
}

function CollidedByPlayer()
{
	var arg : int[] = [ itemID, itemNum ];
	GameObject.FindWithTag( "Player" ).SendMessage( "AddItem", arg );
	renderer.enabled = false;
	yield WaitForSeconds( 5 );
	Initialize();
	renderer.enabled = true;
}

@script AddComponentMenu( "Item/ItemController" )