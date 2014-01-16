using UnityEngine;
using System.Collections;

public class ITween_Script : MonoBehaviour {
	void Start()
	{
		//iTween.MoveTo(gameObject,iTween.Hash( "path", iTweenPath.GetPath( "ITween Path 1" ),"time", 30 ) );
		iTweenEvent.GetEvent( gameObject, "ITween Event 1" ).Play();
	}
}
