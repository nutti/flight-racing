#pragma strict

import System.Collections.Generic;

var speed : float;
var allowance : float;
private var nextTarget : int;	// next target.
private var targetTotal : int;	// total number of target.

private var nodeList : List.<Transform>;	// path finding node list.

var nextDir : Vector3;		// Next direction.

speed = 0.1f;
nextTarget = 0;
allowance = 1.0f;

function Start()
{
	Initialize();
}



function Initialize()
{
	var pathNodeParent : GameObject;
	
	pathNodeParent = GameObject.Find( "Path Finding/Path Node Group" );
	
	var nodeTotal : int;
	nodeTotal = pathNodeParent.gameObject.transform.childCount;
	
	nodeList = new List.<Transform>();
	for( var i : int = 0; i < nodeTotal; ++i ){
		nodeList.Add( pathNodeParent.gameObject.transform.GetChild( i ) );
	}
	
	nodeList.Sort( function  ( a : Transform, b : Transform ){
		return a.GetComponent( Path_Finding_Node ).id - b.GetComponent( Path_Finding_Node ).id;
	} );
	
	print( nodeList.Count );
	
	//var id : int;
	
	//id = nodeList.GetComponent( "Path_Finding_Node" ).id;
}


function FindNextPos() : Vector3
{
	var pathNodes : GameObject;		// path node groups.
	
	pathNodes = GameObject.Find( "Path Finding/Path Node Group" );

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