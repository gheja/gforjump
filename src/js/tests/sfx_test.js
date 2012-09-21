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

function SfxTestNote(freq, length)
{
	var track = new gSfxTrack(1); // seconds
	
	track.RenderChannel(
		instrument_base,
		[
			[freq, length, 0.25]
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
	
	var track = new gSfxTrack(10); // seconds
	
	track.RenderChannel(
		instrument0,
		[
			[C4, 0, 0.25],
			[E4, 0, 0.25],
			[G4, 0, 0.25],
			[E4, 0, 0.25],
			[C4, 0, 0.25],
			[E4, 0, 0.25],
			[G4, 0, 0.25],
			[E4, 0, 0.4],
			[A3, 0, 0.25],
			[C4, 0, 0.25],
			[E4, 0, 0.25],
			[C4, 0, 0.25],
			[A3, 0, 0.25],
			[C4, 0, 0.25],
			[E4, 0, 0.25],
			[C4, 0, 0.4],
			[G3, 0, 0.25],
			[B3, 0, 0.25],
			[D4, 0, 0.25],
			[B3, 0, 0.25],
			[G3, 0, 0.25],
			[B3, 0, 0.25],
			[D4, 0, 0.25],
			[B3, 0, 0.4],
			[G3, 0, 0.4],
			[G3, 0, 0.25],
			[G3, 0, 0.4],
			[G3, 0, 0.25],
			[G3, 0, 0.25],
			[G3, 0, 0.25]
		]
	);
	
	track.RenderChannel(
		instrument1,
		[
			[D2, 0, 2],
			[E2, 0, 2],
			[F2, 0, 2],
			[G2, 0, 2],
		]
	);
	
	track.Crop();
	track.RenderFinal();
	track.Play();
}
