#pragma strict

import System.Collections.Generic;

var speed : float;
var allowance : float;
var nextTarget : int;	// next target.
private var targetTotal : int;	// total number of target.

private var nodeList : List.<Transform>;	// path finding node list.
private var nodes : Transform[];

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
	
	nodes = nodeList.ToArray();
}


function FindNextPos() : Vector3
{
	if( nextTarget >= nodes.Length ){
		nextTarget = 0;
	}
	
	return nodes[ nextTarget ].transform.position;
}

function GetNextDir() : Vector3
{
	var nextPos : Vector3;	// target position.
	var dir : Vector3;		// direction to target.
	var sp : Vector3;
	var distance : float;	// distance to target.
	
	nextPos = FindNextPos();
	distance = Vector3.Distance( nextPos, transform.position );
	
	dir = nextPos - transform.position;
	nextDir = dir;

	return nextDir;
}

function SetNextTarget()
{
	++nextTarget;
}

@script AddComponentMenu( "PathFinding/PathFinding" )