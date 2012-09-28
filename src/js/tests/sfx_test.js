// s = "";
// for (var i=0; i<1; i+=0.1)
// {
// 	s += gSfxOsc.fn_triangle(1, i) + " ";
// }
// alert(s)

function v(obj)
{
	return parseFloat(document.getElementById(obj).value);
}

var instrument_base = null;
var sample1 = new gSfxSample();
sample1.RenderFromOsc(gSfxOscSaw1);

var sample2 = new gSfxSample();
sample2.RenderFromOsc(gSfxOscSaw1);

var sample3 = new gSfxSample();
sample3.RenderFromOsc(gSfxOscSaw1);

function SfxTestUpdateInstrument()
{
	var fns = [ null, gSfxOscSquare, gSfxOscTriangle, gSfxOscSaw1, gSfxOscSaw2 ];
	var fns2 = [ "null", "gSfxOscSquare", "gSfxOscTriangle", "gSfxOscSaw1", "gSfxOscSaw2" ];
	
	document.getElementById("instrument_code").value = "new gSfxInstrument(" + 
		fns2[v('osc1_fn')] + ", " +
		v('adsr_a') + ", " + // attack time (sec)
		v('adsr_d') + ", " + // decay time (sec)
		v('adsr_r') + ", " + // release time (sec)
		v('volume_attack') + ", " + // attack volume (0..1)
		v('volume') + ", " + // (sustained) volume (0..1)
		v('fx_chip_level') + ", " +   // FX chip: level
		v('fx_chip_x') + ", " + // FX chip: x
		
		fns2[v('osc2_fn')] + ", " +
		v('osc2_freq') + ", " + // osc2 freq modulation (optional)
		v('osc2_volume') + ", " + // osc2 volume (optional)
		
		fns2[v('osc3_fn')] + ", " +
		v('osc3_freq') + ", " + // osc3 freq modulation (optional)
		v('osc3_volume') + ", " +  // osc3 volume (optional)
		
		v('fx_noise_volume') + ");";  // osc3 volume (optional)
	
	instrument_base = new gSfxInstrument(
		sample1,
//		fns[v('osc1_fn')],
		v('adsr_a'), // attack time (sec)
		v('adsr_d'), // decay time (sec)
		v('adsr_r'), // release time (sec)
		v('volume_attack'), // attack volume (0..1)
		v('volume'), // (sustained) volume (0..1)
		v('fx_chip_level'),   // FX chip: level
		v('fx_chip_x'), // FX chip: x
		
		sample2,
//		fns[v('osc2_fn')],
		v('osc2_freq'), // osc2 freq modulation (optional)
		v('osc2_volume'), // osc2 volume (optional)
		
		sample3,
//		fns[v('osc3_fn')],
		v('osc3_freq'), // osc3 freq modulation (optional)
		v('osc3_volume'),  // osc3 volume (optional)
		
		v('fx_noise_volume')  // osc3 volume (optional)
	);
}

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
/*
	var instrument1 = new gSfxInstrument(
		gSfxOscSquare,
		0.5, // attack time (sec)
		1.0, // decay time (sec)
		0.5, // release time (sec)
		0.3, // attack volume (0..1)
		0.1, // (sustained) volume (0..1)
		gSfxOscSaw1,
		0.8, // osc2 freq modulation (optional)
		0.05, // osc2 volume (optional)
		gSfxOscSaw1,
		0.6, // osc3 freq modulation (optional)
		0.05  // osc3 volume (optional)
	);
*/
	var track = new gSfxTrack(80, 4, 24); // beats per minute, lines per beat, total beats
	
	track.RenderChannel(
		instrument_base,
		[
/*
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
*/
			DS5, AS4, G4, DS5, AS4, G4, DS5, AS4,
			CS5, AS4, F4, CS5, AS4, F4, CS5, AS4,
			CS5, AS4, F4, CS5, AS4, F4, CS5, AS4,
			C5, GS4, F4, C5, GS4, F4, C5, GS4
		],
		Q4
	);
	
/*
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
*/
	track.Crop();
	track.RenderFinal();
	track.Play();
}

function SfxTestDemo2()
{
	var instrument1 = new gSfxInstrument(
		gSfxOscSquare,
		0.5, // attack time (sec)
		1.0, // decay time (sec)
		0.5, // release time (sec)
		0.3, // attack volume (0..1)
		0.1, // (sustained) volume (0..1)
		gSfxOscSaw1,
		0.8, // osc2 freq modulation (optional)
		0.05, // osc2 volume (optional)
		gSfxOscSaw1,
		0.6, // osc3 freq modulation (optional)
		0.05  // osc3 volume (optional)
	);
	
	var track = new gSfxTrack(120, 4, 20); // beats per minute, lines per beat, total beats
	
	track.RenderChannel(
		instrument_base,
		[
/*
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
*/
/*
			C3, C3, S0,
			C3, C3, S0,
			C3+Q2, CS3+Q2, D3+Q2,

			C3, C3, S0,
			C3, C3, S0,
			C3+Q2, CS3+Q2, D3+Q2,

			C3, C3, S0,
			C3, C3, S0,
			C3+Q2, CS3+Q2, D3+Q2,

			E3, E3, S0,
			E3, E3, S0,
			F3+Q2, FS3+Q2, G3+Q2,

			E3, E3, S0,
			E3, E3, S0,
			F3+Q2, FS3+Q2, G3+Q2,

			E3, E3, S0,
			E3, E3, S0,
			G3+Q2, FS3+Q2, F3+Q2,
*/
			D4, E4, G4 + Q2,
			E4 + Q2,
			
			D4, E4, F4 + Q2,
			E4 + Q2,
			
			D4, E4, G4 + Q2,
			E4 + Q2,
			
			D4, G4, D4 + Q2,
			D4 + Q2,
			
			D4, E4, G4 + Q2,
			E4 + Q2,
			
			D4, E4, F4 + Q2,
			E4 + Q2,
			
			D4, E4, G4 + Q2,
			E4 + Q2,
			
			D4, G4, D4 + Q2,
			D4 + Q2,
		],
		Q4
	);
	
/*
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
*/
	track.Crop();
	track.RenderFinal();
	track.Play();
}
