// s = "";
// for (var i=0; i<1; i+=0.1)
// {
// 	s += gSfxOsc.fn_triangle(1, i) + " ";
// }
// alert(s)

var instrument_base = new gSfxInstrument(
	gSfxOsc.fn_saw1,
	0.1, // attack time (sec)
	0.1, // decay time (sec)
	0.3, // release time (sec)
	0.9, // attack volume (0..1)
	0.2, // (sustained) volume (0..1)
	gSfxOsc.fn_square,
	0.5, // osc2 freq modulation (optional)
	0.5, // osc2 volume (optional)
	gSfxOsc.fn_saw1,
	2.0, // osc3 freq modulation (optional)
	0.8  // osc3 volume (optional)
);

function SfxTestNote(note)
{
	var track = new gSfxTrack(90, 4, 2);
	
	track.RenderChannel(
		instrument_base,
		[
			note
		]
	);
	track.RenderFinal();
	track.Play();
}

function SfxTestDemo()
{
	var instrument0 = new gSfxInstrument(
		gSfxOsc.fn_saw1,
		0.1, // attack time (sec)
		0.1, // decay time (sec)
		0.3, // release time (sec)
		0.9, // attack volume (0..1)
		0.3, // (sustained) volume (0..1)
		gSfxOsc.fn_saw1,
		0.9, // osc2 freq modulation (optional)
		0.1, // osc2 volume (optional)
		gSfxOsc.fn_square,
		0.9, // osc3 freq modulation (optional)
		0.2  // osc3 volume (optional)
	);
	
	var instrument1 = new gSfxInstrument(
		gSfxOsc.fn_square,
		0.5, // attack time (sec)
		1.0, // decay time (sec)
		0.5, // release time (sec)
		0.3, // attack volume (0..1)
		0.1, // (sustained) volume (0..1)
		gSfxOsc.fn_saw1,
		0.8, // osc2 freq modulation (optional)
		0.05, // osc2 volume (optional)
		gSfxOsc.fn_saw1,
		0.6, // osc3 freq modulation (optional)
		0.05  // osc3 volume (optional)
	);
	
	var track = new gSfxTrack(90, 4, 24); // beats per minute, lines per beat, total beats
	
	track.RenderChannel(
		instrument0,
		[
			D5, B4, C5, A4,
			D5, B4, C5, A4,
			D5, B4, C5, E5,
			D5, B4, C5, A4,
			DS3, F3, DS3, G3,
			DS3, F3, DS3, D3,
			DS3, F3, DS3, G3,
			DS3, F3, DS3, D3,
			F3 + Q1,
			D3 + Q1,
			C3 + Q1,
			D5, B4, C5, A4,
			D5, B4, C5, A4,
			D5, B4, C5, E5,
			D5, B4, C5, A4,
			DS3, F3, DS3, G3,
			DS3, F3, DS3, D3,
			DS3, F3, DS3, G3,
			DS3, F3, DS3, D3,
			F3 + Q1,
			D3 + Q1,
			C3 + Q1,
/*
			DS5, AS4, G4, DS5, AS4, G4, DS5, AS4,
			CS5, AS4, F4, CS5, AS4, F4, CS5, AS4,
			CS5, AS4, F4, CS5, AS4, F4, CS5, AS4,
			C5, GS4, F4, C5, GS4, F4, C5, GS4
*/
		],
		Q4
	);
	

	track.RenderChannel(
		instrument1,
		[
			A3,
			B3,
			A3,
			D3,
			E3
		],
		Q1
	);
	
	track.Crop();
	track.RenderFinal();
	track.Play();
}
