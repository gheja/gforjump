var gGfx = {
	context: null,
	width: 160,
	height: 120,
	scale: 4,
	palette: [],
	elements: [],
	element_parameters: [],
	backgrounds: [],
	rendered: [],
	
	Init: function(object, width, height, scale)
	{
		gGfx.width = width;
		gGfx.height = height;
		gGfx.scale = scale;
		gGfx.context = document.getElementById(object).getContext("2d");
	},
	
	SetPalette: function(palette)
	{
		this.palette = palette;
	},
	
	SetElements: function(elements)
	{
		this.elements = elements;
	},
	
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
	
	PreRenderElements: function()
	{
		gGfx.rendered = new Array();
		
		for (var i in gGfx.elements)
		{
			var lines = gGfx.elements[i].split(' ');
			var width = lines[0].length;
			var height = lines.length;
			
			gGfx.element_parameters[i] = { width: width, height: height };
			
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
					obj.ctx.fillStyle = gGfx.palette[line[x]];
					obj.ctx.fillRect(x * gGfx.scale, y * gGfx.scale, gGfx.scale, gGfx.scale);
				}
			});
			
			gGfx.rendered[i] = obj;
		};
	},
	
	PreRender: function()
	{
		gGfx.PreRenderBackgrounds();
		gGfx.PreRenderElements();
		// window.setTimeout(g.Frame, 1000 / 30);
	},
	
	ClearScreen: function(color)
	{
		gGfx.context.fillStyle = gGfx.palette[color];
		gGfx.context.fillRect(0, 0, gGfx.width * gGfx.scale, gGfx.height * gGfx.scale);
	},
	
	Draw: function(id, x, y, r, mirror_x)
	{
		var dx = 0;
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
		if (mirror_x)
		{
			dx = - gGfx.rendered[id].cv.width;
			gGfx.context.scale(-1, 1);
		}
		gGfx.context.drawImage(gGfx.rendered[id].cv, dx, 0);
		gGfx.context.restore();
	},
	
	DrawBackground: function(id, x, y)
	{
		gGfx.context.save();
		gGfx.context.translate(x * gGfx.scale, y * gGfx.scale)
		gGfx.context.drawImage(gGfx.backgrounds[id].cv, 0, 0);
		gGfx.context.restore();
	},
	
	GetElementParameters: function(id)
	{
		return this.element_parameters[id];
	},
	
	RenderString: function(s, x, y)
	{
		for (var i=0; i<s.length; i++)
		{
			gGfx.Draw("d" + s[i], i * 5 + x, y);
		}
	},
	
	RenderStatus: function(time, deaths, level)
	{
		gGfx.RenderString(time, 1, 1);
		gGfx.RenderString(deaths, gGfx.width - 60, 1);
		gGfx.RenderString(level, gGfx.width - 20, 1);
	},
	
	Fade: function(percent, color)
	{
		gGfx.context.save();
		gGfx.context.fillStyle = "rgba(" + color + ", " + (percent / 100) + ");"
		gGfx.context.fillRect(0, 0, gGfx.width * gGfx.scale, gGfx.height * gGfx.scale);
		gGfx.context.restore();
	}
};
