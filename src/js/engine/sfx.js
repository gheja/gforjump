function clamp(b)
{
	return Math.min(Math.max(b, 0), 255);
}

function clamp2(b)
{
	return Math.min(Math.max(b, -32768), 32767);
}


var gSfxPattern = {
	sample_rate: 44100,
	base_freq: 1,
	samples: [],
	pos1: 0,
	pos2: 0,
	pos3: 0,
	
	RenderFromOsc: function(osc_fn)
	{
		gSfxPattern.base_freq = 1;
		for (var i=0; i<this.sample_rate; i++)
		{
			gSfxPattern.samples[i] = osc_fn(1, i/gSfxPattern.sample_rate);
		}
	},
	
	fn1: function(freq, t)
	{
		gSfxPattern.pos1 = (gSfxPattern.pos1 + Math.floor(freq / gSfxPattern.base_freq)) % gSfxPattern.sample_rate;
		
		return gSfxPattern.samples[gSfxPattern.pos1];
	},
	
	fn2: function(freq, t)
	{
		gSfxPattern.pos2 = (gSfxPattern.pos2 + Math.floor(freq / gSfxPattern.base_freq)) % gSfxPattern.sample_rate;
		
		return gSfxPattern.samples[gSfxPattern.pos2];
	},
	
	fn3: function(freq, t)
	{
		gSfxPattern.pos3 = (gSfxPattern.pos3 + Math.floor(freq / gSfxPattern.base_freq)) % gSfxPattern.sample_rate;
		
		return gSfxPattern.samples[gSfxPattern.pos3];
	}
};


var gSfxOsc =
{
	a: function(freq, t)
	{
		var s = 1 / freq;
		var u = t - Math.floor(t / s) * s;
		return u / s;
	},
	
	fn_square: function(freq, t)
	{
		var v = gSfxOsc.a(freq, t);
		
		return (v <= 0.5) ? 1 : -1;
	},
	
	fn_triangle: function(freq, t)
	{
		var v = gSfxOsc.a(freq, t);
		
		return ((v <= 0.5) ? v * 2 : (v - 0.5) * -2);
	},
	
	fn_saw1: function(freq, t)
	{
		var v = gSfxOsc.a(freq, t);
		
		return v * 2 - 1;
	},
	
	fn_saw2: function(freq, t)
	{
		var v = gSfxOsc.a(freq, t);
		
		return ((v <= 0.5) ? v * 4 - 1 : 0);
	}
};



var gSfxInstrument = function(osc1_function, attack, decay, release, volume_attack, volume, fx_chip_level, fx_chip_x, osc2_function, osc2_mod, osc2_volume, osc3_function, osc3_mod, osc3_volume, fx_noise_volume)
{
	this.osc1_function = osc1_function;
	this.attack = attack;
	this.decay = decay;
	this.release = release;
	this.volume = volume;
	this.volume_attack = volume_attack;
	this.osc2_function = osc2_function;
	this.osc2_mod = osc2_mod;
	this.osc2_volume = osc2_volume;
	this.osc3_function = osc3_function;
	this.osc3_mod = osc3_mod;
	this.osc3_volume = osc3_volume;
	this.fx_noise_volume = fx_noise_volume;
	this.fx_chip_level = fx_chip_level;
	this.fx_chip_x = fx_chip_x;
	this.fx_chip_mods = [ 1.0, 0.5, 1.0, 0.6, 1.0, 0.7, 1.0, 0.8, 1.0, 0.7, 1.0, 0.6 ];
	this.sample_rate = 44100; // samples per second
	
	/* calculates wave data (float, -1..1) */
	this.DoIt = function(base_freq, length)
	{
		var volume2 = 0;
		var freq = base_freq;
		
		var samples = new Array();
		
		/* ADSR Envelope - see http://en.wikipedia.org/wiki/Synthesizer#ADSR_envelope */
		var attack_s  = this.sample_rate * this.attack;
		var decay_s   = this.sample_rate * this.decay;
		var sustain_s = Math.max(this.sample_rate * (length - this.attack - this.decay), 0);
		var release_s = this.sample_rate * this.release;
		
		var ad_s = attack_s + decay_s;
		var ads_s = attack_s + decay_s + sustain_s;
		var adsr_s = attack_s + decay_s + sustain_s + release_s;
		
		var length_s = attack_s + decay_s + sustain_s + release_s;
		
		/* FX chiptunize parameters */
		var fx_chip_sample_step = Math.floor(this.sample_rate / this.fx_chip_x);
		
		for (var i=0; i<length_s; i++)
		{
			/* volume calculation based on ADSR Envelope */
			if (i < attack_s)
			{
				// j == i
				volume2 = (i / attack_s) * this.volume_attack;
			}
			else if (i < ad_s)
			{
				j = i - attack_s;
				volume2 = this.volume_attack + (j / decay_s) * (this.volume - this.volume_attack);
			}
			else if (i < ads_s)
			{
				// j = i - ad_s;
				volume2 = this.volume;
			}
			else if (i < adsr_s)
			{
				j = i - ads_s;
				volume2 = (1 - j / release_s) * this.volume;
			}
			
			/* FX chip */
			if (this.fx_chip_level != 0)
			{
				if (i % fx_chip_sample_step == 0)
				{
					freq = base_freq * this.fx_chip_mods[(Math.floor(i / fx_chip_sample_step) % 12)];
				}
			}
			
			/* OSC1 render */
			samples[i] = this.osc1_function(freq, i / this.sample_rate);
			
			/* OSC2 render */
			if (this.osc2_mod)
			{
				samples[i] += this.osc2_function(freq * this.osc2_mod, i / this.sample_rate) * this.osc2_volume;
			}
			
			/* OSC3 render */
			if (this.osc3_mod)
			{
				samples[i] += this.osc3_function(freq * this.osc3_mod, i / this.sample_rate) * this.osc3_volume;
			}
			
			/* FX noise */
			if (this.fx_noise_volume)
			{
				samples[i] += (Math.random() - 0.5) * 2 * this.fx_noise_volume;
			}
			
			/* apply calculated volume and lower it further to avoid clipping when mixing */
			samples[i] *= volume2 * 0.5; 
		}
		
		return samples;
	}
	
};



var gSfxTrack = function(bpm, lpb, beats)
{
	this.instrument = null;
	this.track = new Array();
	this.length = 0;
	this.audio_obj = null;
	this.sample_rate = 44100;
	this.samples = new Array();
	this.sample_count = 0;
	
	
	this.RenderChannel = function(instrument, track, default_length)
	{
		var i, j, b, note, length, freq;
		var current_s = 0;
		
		/* render and mix notes... */
		for (i in track)
		{
			// every item is encoded as the following:
			//   (semitone index) + (length fraction) * 256
			//
			// semitone index is: 1 (C0)... 48 (A4)... 111 (B9)
			
			freq = 440 * Math.pow(2, ((track[i] % 256) - 48) / 12);
			b = Math.floor(track[i] / 256);
			if (b == 0)
			{
				b = default_length ? default_length / 256 : this.lpb;
			}
			length = (1 / b) * (60 / this.bpm);
			
			note = instrument.DoIt(freq, length);
			for (j=0; j<note.length; j++)
			{
				this.samples[current_s + j] += note[j];
			}
			note = null;
			current_s += Math.floor(length * this.sample_rate);
		}
		
		this.sample_count = Math.max(this.sample_count, current_s);
	};
	
	this.RenderFinal = function()
	{
		var b = new Array();
		for (i=0; i<this.samples.length; i++)
		{
			// b[i] = clamp(((this.samples[i] + 1) / 2) * 256);
			b[i] = clamp2(this.samples[i] * 32768);
		}
		this.samples = null;
		
		c = new RIFFWAVE(b);
		b = null;
		
		this.audio_obj = new Audio(c.dataURI);
		c = null;
	};
	
	this.Crop = function()
	{
		// TODO
		// this.samples = this.samples.splice(0, this.samlpe_count);
		// this.length = this.samlpe_count / this.sample_rate;
	};
	
	this.Play = function()
	{
		// this.audio_obj.loop = true;
		this.audio_obj.play();
	};
	
	
	/* "constructor" */
	
	this.bpm = bpm; // beats per minute
	this.lpb = lpb; // lines per beat
	this.beats = beats;
	
	for (var i=0; i<this.beats * (60 / this.bpm) * this.sample_rate; i++)
	{
		this.samples[i] = 0;
	}
};
