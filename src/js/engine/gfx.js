var gfx = {
	context: null,
	width: 160,
	height: 120,
	scale: 4,
	
	palette: {
		0: "#0ac",
		1: "#d80",
		2: "#fa0",
		3: "#fff",
		4: "#ff0",
		5: "#aaa",
		6: "#888",
		7: "#09c",
	},
	
	elements: {
		0: "11111111 22212222 22212222 22212222 11111111 22222212 22222212 22222212",
		1: "...33... ..3333.. ..3333.. ...33... ..33333. .3.33.3. ...33... .33..33.",
		2: "44444444 44414414 44444444 .4444444 .4144444 .4411111 ..444444 ....4444",
		3: "66666666 61111116 61611616 61111116 61611616 61166116 61111116 66666666",
		4: "....3... ...36... ..356... .3556... .3556... 355556.. 3555556. 35555556",
	},
	
	backgrounds: [],
	
	rendered: [],
	
	PreRenderBackgrounds: function()
	{
		var obj = {};
		obj.cv = document.createElement('canvas');
		
		obj.cv.width = 320 * gfx.scale;
		obj.cv.height = 120 * gfx.scale;
		obj.ctx = obj.cv.getContext('2d');
		
		obj.ctx.fillStyle = gfx.palette[0];
		obj.ctx.fillRect(0, 0, 320, 120);
		
		obj.ctx.fillStyle = gfx.palette[7];
		obj.ctx.beginPath();
		obj.ctx.moveTo(  0, 120);
		obj.ctx.lineTo(  0,  60);
		obj.ctx.lineTo( 30,  70);
		obj.ctx.lineTo( 60,  40);
		obj.ctx.lineTo( 90,  80);
		obj.ctx.lineTo(120,  90);
		obj.ctx.lineTo(150,  60);
		obj.ctx.lineTo(180,  40);
		obj.ctx.lineTo(210,  70);
		obj.ctx.lineTo(240,  80);
		obj.ctx.lineTo(270,  90);
		obj.ctx.lineTo(300,  40);
		obj.ctx.lineTo(320,  60);
		obj.ctx.lineTo(320, 120);
		obj.ctx.closePath();
		obj.ctx.fill();
		
		obj.ctx.drawImage(obj.cv, 0, 0, 320, 120, 0, 0, 320 * gfx.scale, 120 * gfx.scale);
		
		gfx.backgrounds[0] = obj;
	},
	
	PreRender: function()
	{
		for (var i in gfx.elements)
		{
			var lines = gfx.elements[i].split(' ');
			var width = lines[0].length;
			var height = lines.length;
			
			var obj = {};
			obj.cv = document.createElement('canvas');
			
			obj.cv.width = width * gfx.scale;
			obj.cv.height = height * gfx.scale;
			obj.ctx = obj.cv.getContext('2d');
			
			var line;
			var y;
			
			lines.forEach(function(line, y) {
				for (var x = 0; x < width; x++)
				{
					obj.ctx.fillStyle = line[x] != "." ? gfx.palette[line[x]] : "rgba(0, 0, 0, 0)";
					obj.ctx.fillRect(x * gfx.scale, y * gfx.scale, gfx.scale, gfx.scale);
				}
			});
			
			gfx.rendered[i] = obj;
		};
	},
	
	Init: function(object)
	{
		gfx.PreRenderBackgrounds();
		gfx.PreRender();
		gfx.context = document.getElementById(object).getContext("2d");
		// window.setTimeout(g.Frame, 1000 / 30);
	},
	
	ClearScreen: function(color)
	{
		gfx.context.fillStyle = gfx.palette[color];
		gfx.context.fillRect(0, 0, gfx.width * gfx.scale, gfx.height * gfx.scale);
	},
	
	Draw: function(id, x, y, r)
	{
		gfx.context.save();
		if (r == undefined || r == 0)
		{
			gfx.context.translate(x * gfx.scale, y * gfx.scale)
		}
		else
		{
			if (r == 1)
			{
				gfx.context.translate((x + 8) * gfx.scale, y * gfx.scale)
			}
			else if (r == 2)
			{
				gfx.context.translate((x + 8) * gfx.scale, (y + 8) * gfx.scale)
			}
			else
			{
				r = 3;
				gfx.context.translate(x * gfx.scale, (y + 8) * gfx.scale)
			}
			gfx.context.rotate(r * 0.0174532925 * 90);
		}
		gfx.context.drawImage(gfx.rendered[id].cv, 0, 0);
		gfx.context.restore();
	},
	
	DrawBackground: function(id, x, y)
	{
		gfx.context.save();
		gfx.context.translate(x * gfx.scale, y * gfx.scale)
		gfx.context.drawImage(gfx.backgrounds[id].cv, 0, 0);
		gfx.context.restore();
	}
};


var g = {
	frame_number: 0,
	
	Init: function(object)
	{
		gfx.Init(object);
	},
	
	RenderFrame: function()
	{
		this.frame_number++;
		gfx.ClearScreen(0);
		gfx.DrawBackground(0, 0, 0);
		gfx.Draw(0, 0, 112);
		gfx.Draw(0, 8, 112);
		gfx.Draw(0, 16, 112);
		gfx.Draw(0, 32, 112);
		gfx.Draw(0, 40, 112);
		gfx.Draw(1, 8, 104);
		gfx.Draw(2, 152, 0);
		gfx.Draw(3, 40, 88, 0);
		gfx.Draw(4, 40, 80, 0);
		gfx.Draw(4, 48, 88, 1);
		gfx.Draw(4, 40, 96, 2);
		gfx.Draw(4, 32, 88, 3);
	}
};
