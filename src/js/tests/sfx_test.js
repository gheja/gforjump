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
	0.8, // attack volume (0..1)
	0.2, // (sustained) volume (0..1)
	0.985, // osc2 freq modulation (optional)
	0.15, // osc2 volume (optional)
	1.015, // osc3 freq modulation (optional)
	0.2  // osc3 volume (optional)
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
		0.8, // attack volume (0..1)
		0.2, // (sustained) volume (0..1)
		0.985, // osc2 freq modulation (optional)
		0.15, // osc2 volume (optional)
		1.015, // osc3 freq modulation (optional)
		0.2  // osc3 volume (optional)
	);
	
	var instrument1 = new gSfxInstrument(
		gSfxOsc.fn_square,
		0.5, // attack time (sec)
		1.0, // decay time (sec)
		2.0, // release time (sec)
		0.5, // attack volume (0..1)
		0.2, // (sustained) volume (0..1)
		0.8, // osc2 freq modulation (optional)
		0.2, // osc2 volume (optional)
		0.6, // osc3 freq modulation (optional)
		0.2  // osc3 volume (optional)
	);
	
	var track = new gSfxTrack(80, 4, 10); // beats per minute, lines per beat, total beats
	
	track.RenderChannel(
		instrument0,
		[
			DS5, AS4, G4, DS5, AS4, G4, DS5, AS4,
			CS5, AS4, F4, CS5, AS4, F4, CS5, AS4,
			CS5, AS4, F4, CS5, AS4, F4, CS5, AS4,
			C5, GS4, F4, C5, GS4, F4, C5, GS4
		],
		Q4
	);
	
	track.Crop();
	track.RenderFinal();
	track.Play();
}
