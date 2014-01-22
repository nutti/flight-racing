#pragma strict

// unit - seconds
private var records : int[] = [
	//-------------------
	// FACTORY
	//-------------------
	// LV 1
	100, 80, 70, 60,
	// LV 2
	
	
	// Dummy
	9999999
];


function GetTargetRecord( stage : int, lv : int, rank : int ) : int
{
	return records[ ( stage * 5 + lv ) * 4 + rank ];
}
