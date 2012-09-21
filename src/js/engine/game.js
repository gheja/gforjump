var gGameObject = function(pos_x, pos_y, width, height, gfx_element_id)
{
	this.pos_x = pos_x;
	this.pos_y = pos_y;
	this.width = width;
	this.height = height;
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
	//  the ... side of "this" hit "object"
	switch (direction)
	{
		case 0: // top
			if (this.speed_y < 0)
			{
				this.pos_y = object.pos_y + object.height + 1;
				this.speed_y = object.speed_y;
			}
		break;
		
		case 1: // right
			if (this.speed_x > 0)
			{
				this.pos_x = object.pos_x - this.width;
				this.speed_x = object.speed_x;
			}
		break;
		
		case 2: // bottom
			if (this.speed_y > 0)
			{
				this.pos_y = object.pos_y - this.height;
				this.speed_y = object.speed_y;
			}
		break;
		
		case 3: // left
			if (this.speed_x < 0)
			{
				this.pos_x = object.pos_x - object.width + 1;
				this.speed_x = object.speed_x;
			}
		break;
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
		
		// check if the ... side of "this" hits "obj"
		
		// top
		if (this.pos_y > obj.pos_y + obj.height && this.pos_y + this.speed_y < obj.pos_y + obj.height &&
			this.pos_x <= obj.pos_x + obj.width && this.pos_x + this.width >= obj.pos_x)
		{
			this.onCollide(obj, 0);
			obj.onCollide(this, 2);
			collision = true;
		}
		
		// bottom
		if (this.pos_y + this.height <= obj.pos_y && this.pos_y + this.height + this.speed_y > obj.pos_y &&
			this.pos_x <= obj.pos_x + obj.width && this.pos_x + this.width >= obj.pos_x)
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
	
	AddGameObject: function(pos_x, pos_y, gfx_element_id, add_parameters, obj_parameters)
	{
		var count_x = 1;
		var count_y = 1;
		
		if (add_parameters)
		{
			count_x = add_parameters[0];
			count_y = add_parameters[1];
		}
		
		for (var x=0; x<count_x; x++)
		{
			for (var y=0; y<count_y; y++)
			{
				var element_parameters = gGfx.GetElementParameters(gfx_element_id);
				
				var obj = new gGameObject(pos_x, pos_y, element_parameters.width, element_parameters.height, gfx_element_id);
				
				obj.pos_x = pos_x + element_parameters.width * x;
				obj.pos_y = pos_y + element_parameters.height * y;
				
				if (obj_parameters)
				{
					for (var key in obj_parameters)
					{
						obj[key] = obj_parameters[key];
					}
				}
				
				this.game_objects.push(obj);
			}
		}
	},
	
	Init: function(canvas)
	{
		gGfx.Init(canvas);
		gGfx.SetPalette(g_gfx_palette);
		gGfx.SetElements(g_gfx_elements);
		gGfx.PreRender();
		
		for (var i in g_game_objects)
		{
			this.AddGameObject(g_game_objects[i][0], g_game_objects[i][1], g_game_objects[i][2], g_game_objects[i][3], g_game_objects[i][4]);
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
