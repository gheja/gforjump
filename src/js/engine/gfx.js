var gGfx = {
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
		
		obj.cv.width = 320 * gGfx.scale;
		obj.cv.height = 120 * gGfx.scale;
		obj.ctx = obj.cv.getContext('2d');
		
		obj.ctx.fillStyle = gGfx.palette[0];
		obj.ctx.fillRect(0, 0, 320, 120);
		
		obj.ctx.fillStyle = gGfx.palette[7];
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
		
		obj.ctx.drawImage(obj.cv, 0, 0, 320, 120, 0, 0, 320 * gGfx.scale, 120 * gGfx.scale);
		
		gGfx.backgrounds[0] = obj;
	},
	
	PreRender: function()
	{
		for (var i in gGfx.elements)
		{
			var lines = gGfx.elements[i].split(' ');
			var width = lines[0].length;
			var height = lines.length;
			
			var obj = {};
			obj.cv = document.createElement('canvas');
			
			obj.cv.width = width * gGfx.scale;
			obj.cv.height = height * gGfx.scale;
			obj.ctx = obj.cv.getContext('2d');
			
			var line;
			var y;
			
			lines.forEach(function(line, y) {
				for (var x = 0; x < width; x++)
				{
					obj.ctx.fillStyle = line[x] != "." ? gGfx.palette[line[x]] : "rgba(0, 0, 0, 0)";
					obj.ctx.fillRect(x * gGfx.scale, y * gGfx.scale, gGfx.scale, gGfx.scale);
				}
			});
			
			gGfx.rendered[i] = obj;
		};
	},
	
	Init: function(object)
	{
		gGfx.PreRenderBackgrounds();
		gGfx.PreRender();
		gGfx.context = document.getElementById(object).getContext("2d");
		// window.setTimeout(g.Frame, 1000 / 30);
	},
	
	ClearScreen: function(color)
	{
		gGfx.context.fillStyle = gGfx.palette[color];
		gGfx.context.fillRect(0, 0, gGfx.width * gGfx.scale, gGfx.height * gGfx.scale);
	},
	
	Draw: function(id, x, y, r)
	{
		gGfx.context.save();
		if (r == undefined || r == 0)
		{
			gGfx.context.translate(x * gGfx.scale, y * gGfx.scale)
		}
		else
		{
			if (r == 1)
			{
				gGfx.context.translate((x + 8) * gGfx.scale, y * gGfx.scale)
			}
			else if (r == 2)
			{
				gGfx.context.translate((x + 8) * gGfx.scale, (y + 8) * gGfx.scale)
			}
			else
			{
				r = 3;
				gGfx.context.translate(x * gGfx.scale, (y + 8) * gGfx.scale)
			}
			gGfx.context.rotate(r * 0.0174532925 * 90);
		}
		gGfx.context.drawImage(gGfx.rendered[id].cv, 0, 0);
		gGfx.context.restore();
	},
	
	DrawBackground: function(id, x, y)
	{
		gGfx.context.save();
		gGfx.context.translate(x * gGfx.scale, y * gGfx.scale)
		gGfx.context.drawImage(gGfx.backgrounds[id].cv, 0, 0);
		gGfx.context.restore();
	},
	
	RenderFrame: function()
	{
		this.frame_number++;
		gGfx.ClearScreen(0);
		gGfx.DrawBackground(0, 0, 0);
		gGfx.Draw(0, 0, 112);
		gGfx.Draw(0, 8, 112);
		gGfx.Draw(0, 16, 112);
		gGfx.Draw(0, 32, 112);
		gGfx.Draw(0, 40, 112);
		gGfx.Draw(1, 8, 104);
		gGfx.Draw(2, 152, 0);
		gGfx.Draw(3, 40, 88, 0);
		gGfx.Draw(4, 40, 80, 0);
		gGfx.Draw(4, 48, 88, 1);
		gGfx.Draw(4, 40, 96, 2);
		gGfx.Draw(4, 32, 88, 3);
	}
};
