function v(obj)
{
	return parseFloat(document.getElementById(obj).value);
}

var sample1 = new gSfxSample();
sample1.RenderFromOsc(gSfxOscSaw1);

var sample2 = new gSfxSample();
sample2.RenderFromOsc(gSfxOscNoise);

var sample3 = new gSfxSample();
sample3.RenderFromOsc(gSfxOscSquare);


function sfx_render_and_play()
{
	instrument1 = new gSfxInstrument(sample1, 0, 0.2, 0.2, 0.7, 0.2, 1, 8);
	instrument2 = new gSfxInstrument(sample2, 0, 0, 0.05, 0.5, 0.5);
	instrument3 = new gSfxInstrument(sample3, 0.1, 0.6, 0.3, 0.7, 0.2, 1, 4);
	
	var track = new gSfxTrack(110, 4, 36); // beats per minute, lines per beat, total beats
	
	track.RenderChannel(
		instrument1,
		[
			D4, E4, G4 + Q2,
			E4 + Q2, S0 + Q2,
			
			D4, E4, F4 + Q2,
			E4 + Q2, S0 + Q2,
			
			D4, E4, G4 + Q2,
			E4 + Q2, S0 + Q2,
			
			D4, G4, D4 + Q2,
			D4 + Q2, S0 + Q2,
			
			D4, E4, G4 + Q2,
			E4 + Q2, S0 + Q2,
			
			D4, E4, F4 + Q2,
			E4 + Q2, S0 + Q2,
			
			D4, E4, G4 + Q2,
			E4 + Q2, S0 + Q2,
			
			D4, G4, D4 + Q2,
			D4 + Q2, S0 + Q2,
		],
		Q4,
		2
	);
	
	track.RenderChannel(
		instrument2,
		[
			S0, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			S0, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			S0, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			S0, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			C4, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			C4, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			C4, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			C4, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			C4, S0, S0 + Q2,
			C4, S0, S0 + Q2,
			
			C4, S0, S0 + Q2,
			C4, S0, S0 + Q2,
			
			C4, S0, S0 + Q2,
			C4, S0, S0 + Q2,
			
			C4, S0, S0 + Q2,
			C4, S0, S0 + Q2,
			
			C4, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			C4, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			C4, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			C4, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
		],
		Q4,
		1
	);
	
	track.RenderChannel(
		instrument3,
		[
			S0, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			S0, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			S0, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			S0, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			S0, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			S0, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			S0, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			S0, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			C3, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			C3, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			E3, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			E3, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			C3, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			C3, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			E3, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
			
			E3, S0, S0 + Q2,
			S0 + Q2, S0 + Q2,
		],
		Q4,
		1
	);
	
	track.Crop();
	track.RenderFinal();
	track.Play();
}
