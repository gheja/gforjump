var gGameObject = function(pos_x, pos_y, gfx_element_id)
{
	this.pos_x = pos_x;
	this.pos_y = pos_y;
	this.width = 0;
	this.height = 0;
	this.gfx_element_id = gfx_element_id;
	
	this.can_move = 0; // can it move?
	this.gravity_enabled = 0;
	this.can_collide = 1;
	this.speed_x = 0;
	this.speed_y = 0;
	
	return this;
};

gGameObject.prototype.onCollideDefault = function(object, direction)
{
	if (direction == 2)
	{
//		alert("e!");
		this.pos_y = object.pos_y - this.height;
		this.speed_y = obj.speed_y;
	}
}

gGameObject.prototype.onCollide = function(object, direction)
{
	this.onCollideDefault(object, direction);
}

gGameObject.prototype.UpdateDynamicValues = function(objects)
{
	if (this.gravity_enabled)
	{
		this.speed_y += 1;
	}
	
	var collision = false;
	
	for (var i in objects)
	{
		obj = objects[i];
		if (!obj.can_collide)
		{
			return;
		}
		
		// below
		if (this.pos_y + this.height <= obj.pos_y && this.pos_y + this.height + this.speed_y > obj.pos_y)
		{
			this.onCollide(obj, 2);
			obj.onCollide(this, 0);
			collision = true;
		}
	}
	
	if (!collision)
	{
		this.pos_x += this.speed_x;
		this.pos_y += this.speed_y;
	}
}

gGameObject.prototype.Tick = function(objects)
{
	if (this.can_move)
	{
		this.UpdateDynamicValues(objects);
	}
}

var gGame = {
	frame_number: 0,
	game_objects: [],
	
	AddGameObject: function(pos_x, pos_y, gfx_element_id, parameters)
	{
		var obj = new gGameObject(pos_x, pos_y, gfx_element_id);
		if (parameters)
		{
			for (var key in parameters)
			{
				obj[key] = parameters[key];
			}
		}
		this.game_objects.push(obj);
	},
	
	Init: function(canvas)
	{
		gGfx.Init(canvas);
		gGfx.SetPalette(g_gfx_palette);
		gGfx.SetElements(g_gfx_elements);
		gGfx.PreRender();
		
		for (var i in g_game_objects)
		{
			this.AddGameObject(g_game_objects[i][0], g_game_objects[i][1], g_game_objects[i][2], g_game_objects[i][3]);
		}
	},
	
	Tick: function()
	{
		var obj;
		this.frame_number++;
		// gGfx.RenderFrame();
		for (var i in this.game_objects)
		{
			this.game_objects[i].Tick(this.game_objects);
		}
		
		gGfx.ClearScreen(0);
		gGfx.DrawBackground(0, 0, 0);
		for (var i in this.game_objects)
		{
			obj = this.game_objects[i];
			
			gGfx.Draw(obj.gfx_element_id, Math.floor(obj.pos_x), Math.floor(obj.pos_y));
		}
	}
};
