using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using Pathfinding;

[RequireComponent (typeof(Seeker))]
public class RootMaker : MonoBehaviour {
	
	[SerializeField]
	private GameObject prefub;
	
	[SerializeField]
	private Transform target;
	
	private Seeker seeker;
	
	List<GameObject> nodeList = new List<GameObject>();
	
	void Awake () 
	{
		this.seeker = GetComponent<Seeker>();
	}

	void Update()
	{
		if( this.seeker.IsDone())
		{
			Repath();
		}
	}
	
	void Repath()
	{
		for( int i=0; i< transform.childCount; i++)
		{
			Destroy( transform.GetChild(i).gameObject );
		}
		
		this.seeker.StartPath( this.transform.position, this.target.position, OnPathComplete );
	}

	public void OnPathComplete (Path p) 
	{
		foreach( Vector3 pos in p.vectorPath )
		{
			GameObject tmpNodeInstance = GameObject.Instantiate( this.prefub, pos, Quaternion.identity ) as GameObject;
			tmpNodeInstance.transform.parent = transform;
			//this.nodeList.Add(tmpNodeInstance);
		}
	}
}
