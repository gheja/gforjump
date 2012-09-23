var gGameObject = function(gfx_element_id)
{
	this.pos_x = 0;
	this.pos_y = 0;
	this.width = 0;
	this.height = 0;
	this.gfx_element_id = gfx_element_id;
	
	this.dead = 0;
	
	this.can_move = 0; // can it move?
	this.gravity_enabled = 0;
	this.can_collide = 1;
	this.speed_x = 0;
	this.speed_y = 0;
	this.collision_top = 0;
	this.collision_right = 0;
	this.collision_bottom = 0;
	this.collision_left = 0;
	this.collision = 0;
	
	return this;
};

gGameObject.prototype.Resize = function()
{
	var e = gGfx.GetElementParameters(this.gfx_element_id);
	this.width = e.width;
	this.height = e.height;
}

gGameObject.prototype.onCollideDefault = function(object, direction)
{
	//  the ... side of "object" hit "this"
	switch (direction)
	{
		case 0: // top
			object.pos_y = this.pos_y + this.height;
			object.speed_y = Math.max(this.speed_y, object.speed_y);
		break;
		
		case 1: // right
			object.pos_x = this.pos_x - object.width;
			object.speed_x = this.speed_x;
		break;
		
		case 2: // bottom
			object.pos_y = this.pos_y - object.height;
			object.speed_y = Math.min(this.speed_y, object.speed_y);
		break;
		
		case 3: // left
			object.pos_x = this.pos_x + this.width;
			object.speed_x = this.speed_x;
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
	
	this.collision_top = 0;
	this.collision_right = 0;
	this.collision_bottom = 0;
	this.collision_left = 0;
	this.collision = 0;
	
	for (var i in objects)
	{
		obj = objects[i];
		if (!obj.can_collide)
		{
			return;
		}
		
		// check if the ... side of "this" hits "obj"
		// top
		if (this.pos_y >= obj.pos_y + obj.height && this.pos_y + this.speed_y < obj.pos_y + obj.height &&
			this.pos_x < obj.pos_x + obj.width && this.pos_x + this.width > obj.pos_x)
		{
			obj.onCollide(this, 0);
			this.collision_top = 1;
		}
		
		// bottom
		if (this.pos_y + this.height <= obj.pos_y && this.pos_y + this.height + this.speed_y > obj.pos_y &&
			this.pos_x < obj.pos_x + obj.width && this.pos_x + this.width > obj.pos_x)
		{
			obj.onCollide(this, 2);
			this.collision_bottom = 1;
		}
		
		// left
		if (this.pos_x >= obj.pos_x + obj.width && this.pos_x + this.speed_x < obj.pos_x + obj.width &&
			((this.pos_y < obj.pos_y + obj.height && this.pos_y + this.height > obj.pos_y) ||
			(this.pos_y < obj.pos_y && this.pos_y + this.height > obj.pos_y + obj.height)))
		{
			obj.onCollide(this, 3);
			this.collision_left = 1;
		}
		
		// right
		if (this.pos_x + this.width <= obj.pos_x && this.pos_x + this.width + this.speed_x > obj.pos_x &&
			((this.pos_y < obj.pos_y + obj.height && this.pos_y + this.height > obj.pos_y) ||
			(this.pos_y < obj.pos_y && this.pos_y + this.height > obj.pos_y + obj.height)))
		{
			obj.onCollide(this, 1);
			this.collision_right = 1;
		}
	}
	
	this.collision = this.collision_top || this.collision_right || this.collision_bottom || this.collision_left;
	
	this.pos_x += this.speed_x;
	this.pos_y += this.speed_y;
}

gGameObject.prototype.Tick = function(objects)
{
	if (this.can_move)
	{
		this.UpdateDynamicValues(objects);
	}
}


var G_GAME_INPUT_JUMP = 0;
var G_GAME_INPUT_DUCK = 1;
var G_GAME_INPUT_LEFT = 2;
var G_GAME_INPUT_RIGHT = 3;
var G_GAME_INPUT_FIRE = 4;
var G_GAME_INPUT_RUN = 5;


// "static class"
var gGameInput = {
	statuses: [],
	original_onkeydown: null,
	original_onkeyup: null,
	
	Attach: function()
	{
		gGameInput.original_onkeydown = window.onkeydown;
		gGameInput.original_onkeyup = window.onkeyup;
		window.onkeydown = function(event) { return gGameInput.KeyHandler(event, 1); }
		window.onkeyup = function(event) { return gGameInput.KeyHandler(event, 0); }
	},
	
	Detach: function()
	{
		window.onkeydown = gGameInput.original_onkeydown;
		window.onkeyup = gGameInput.original_onkeyup;
	},
	
	KeyHandler: function(event, value)
	{
		var handled_keys = {
			38: G_GAME_INPUT_JUMP,
			87: G_GAME_INPUT_JUMP,
			40: G_GAME_INPUT_DUCK,
			83: G_GAME_INPUT_DUCK,
			37: G_GAME_INPUT_LEFT,
			65: G_GAME_INPUT_LEFT,
			39: G_GAME_INPUT_RIGHT,
			68: G_GAME_INPUT_RIGHT,
			32: G_GAME_INPUT_JUMP,
			16: G_GAME_INPUT_RUN
		};
		
		if (handled_keys[event.keyCode] !== undefined)
		{
			this.statuses[handled_keys[event.keyCode]] = value;
			return false;
		}
		
		return true;
	},
	
	GetStatus: function(status)
	{
		return gGameInput.statuses[status];
	}
}

var gGame = {
	frame_number: 0,
	game_objects: [],
	game_input: null,
	screen_x: 0,
	screen_y: 0,
	
	AddGameObject: function(pos_x, pos_y, base_object, count_x, count_y)
	{
		count_x = count_x ? count_x : 1;
		count_y = count_y ? count_y : 1;
		
		for (var x=0; x<count_x; x++)
		{
			for (var y=0; y<count_y; y++)
			{
				var obj = new base_object();
				obj.Resize();
				
				obj.pos_x = pos_x + obj.width * x;
				obj.pos_y = pos_y + obj.height * y;
				
				this.game_objects.push(obj);
			}
		}
		
		return obj;
	},
	
	Restart: function()
	{
		this.screen_x = 0;
		this.screen_y = 0;
		this.game_objects[0].Restart();
	},
	
	Init: function(canvas)
	{
		gGfx.Init(canvas);
		gGfx.SetPalette(g_gfx_palette);
		gGfx.SetElements(g_gfx_elements);
		gGfx.PreRender();
		
		gGameInput.Attach();
		
		for (var i in g_game_objects)
		{
			this.AddGameObject(g_game_objects[i][0], g_game_objects[i][1], g_game_objects[i][2], g_game_objects[i][3], g_game_objects[i][4]);
		}
		
		this.Restart();
	},
	
	Tick: function()
	{
		var obj, speed;
		this.frame_number++;
		
		if (this.game_objects[0].dead)
		{
			if (gGameInput.GetStatus(G_GAME_INPUT_JUMP))
			{
				this.Restart();
			}
		}
		else
		{
			speed = gGameInput.GetStatus(G_GAME_INPUT_RUN) ? 2 : 1;
			
			if (gGameInput.GetStatus(G_GAME_INPUT_LEFT))
			{
				this.game_objects[0].speed_x = -speed;
			} else if (gGameInput.GetStatus(G_GAME_INPUT_RIGHT))
			{
				this.game_objects[0].speed_x = speed;
			} else
			{
				this.game_objects[0].speed_x = 0;
			}
			
			if (gGameInput.GetStatus(G_GAME_INPUT_JUMP) && this.game_objects[0].collision_bottom)
			{
				this.game_objects[0].speed_y = -8;
			}
		}
		
		// gGfx.RenderFrame();
		for (var i in this.game_objects)
		{
			this.game_objects[i].Tick(this.game_objects);
		}
		
		if (this.game_objects[0].pos_x < this.screen_x + 20)
		{
			this.screen_x = this.game_objects[0].pos_x - 20;
		} else if (this.game_objects[0].pos_x > this.screen_x + 140)
		{
			this.screen_x = this.game_objects[0].pos_x - 140;
		}
		
		if (this.game_objects[0].pos_y < this.screen_y + 20)
		{
			this.screen_y = this.game_objects[0].pos_y - 20;
		} else if (this.game_objects[0].pos_y > this.screen_y + 100)
		{
			this.screen_y = this.game_objects[0].pos_y - 100;
		}
		
		gGfx.ClearScreen(0);
		gGfx.DrawBackground(0, Math.floor(this.screen_x * -0.5), Math.floor(this.screen_y * -0.5));
		for (var i in this.game_objects)
		{
			obj = this.game_objects[i];
			
			gGfx.Draw(obj.gfx_element_id, Math.floor(obj.pos_x - this.screen_x), Math.floor(obj.pos_y - this.screen_y));
		}
	}
};
