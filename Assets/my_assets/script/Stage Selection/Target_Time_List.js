#pragma strict

// unit - 10 mili seconds ( ex: 7030 -> 1 min 10 sec 300 milisec )
private var records : int[] = [
	//-------------------
	// FACTORY
	//-------------------
	// LV 1
	10000, 8000, 7000, 6000,
	// LV 2
	
	
	// Dummy
	9999999
];


function GetTargetRecord( stage : int, lv : int, rank : int ) : int
{
	return records[ ( stage * 5 + lv ) * 4 + rank ];
}
