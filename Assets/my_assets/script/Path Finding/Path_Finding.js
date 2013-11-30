#pragma strict

var speed : float;
var allowance : float;
private var nextTarget : int;	// next target.
private var targetTotal : int;	// total number of target.

var nextDir : Vector3;		// Next direction.

speed = 0.1f;
nextTarget = 0;
allowance = 1.0f;

function FindNextPos() : Vector3
{
	var pathNodes : GameObject;		// path node groups.
	
	pathNodes = GameObject.Find( "Path Finding/Enemy Path Node Group" );

	targetTotal = pathNodes.gameObject.transform.childCount;
	if( targetTotal <= nextTarget ){
		nextTarget = 0;
	}
	
	var targetNode = pathNodes.transform.GetChild( nextTarget );		// target node.

	return targetNode.transform.position;
}

function GetNextDir() : Vector3
{
	var nextPos : Vector3;	// target position.
	var dir : Vector3;		// direction to target.
	var sp : Vector3;
	var distance : float;	// distance to target.
	
	nextPos = FindNextPos();
	distance = Vector3.Distance( nextPos, transform.position );
	
	if( distance > allowance ){
		dir = nextPos - transform.position;
		sp = Vector3.Normalize( dir );
		
		nextDir = sp;
		
		
		//transform.position.x += sp.x * speed;
		//transform.position.y += sp.y * speed;
		//transform.position.z += sp.z * speed;
	}
	else{
		++nextTarget;
		nextDir = Vector3( 0.0f, 0.0f, 0.0f );
	}
	
	return nextDir;
}

@script AddComponentMenu( "PathFinding/PathFinding" )