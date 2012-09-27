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
	this.rotation = 0;
	this.collision_top = 0;
	this.collision_right = 0;
	this.collision_bottom = 0;
	this.collision_left = 0;
	this.collision = 0;
	this.trash_flag = 0;
	this.gfx_mirror_x = 0;
	
	return this;
};

gGameObject.prototype.Resize = function()
{
	var e = gGfx.GetElementParameters(this.gfx_element_id);
	this.width = e.width;
	this.height = e.height;
}

gGameObject.prototype.Kill = function()
{
	this.dead = 1;
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
		if (this.pos_y >= obj.pos_y + obj.height && this.pos_y + this.speed_y <= obj.pos_y + obj.height &&
			this.pos_x < obj.pos_x + obj.width && this.pos_x + this.width > obj.pos_x)
		{
			obj.onCollide(this, 0);
			this.collision_top = 1;
		}
		
		// bottom
		if (this.pos_y + this.height <= obj.pos_y && this.pos_y + this.height + this.speed_y >= obj.pos_y &&
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

gGameObject.prototype.DefaultTick = function(objects)
{
	if (this.can_move)
	{
		this.UpdateDynamicValues(objects);
	}
}

gGameObject.prototype.Tick = function(objects)
{
	this.DefaultTick(objects);
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
	game_status: 0, // 0: playing, 1: just died, 2: fade out, 3: fade in
	fade_percent: 0,
	game_objects: [],
	game_input: null,
	screen_x: 0,
	screen_y: 0,
	shake_ticks: 0,
	
	deaths: 0,
	level: 1,
	time: 0,
	
	AddGameObject: function(pos_x, pos_y, base_object, count_x, count_y, parameters)
	{
		count_x = count_x ? count_x : 1;
		count_y = count_y ? count_y : 1;
		
		for (var x=0; x<count_x; x++)
		{
			for (var y=0; y<count_y; y++)
			{
				var obj = new base_object();
				obj.Resize();
				
				if (parameters)
				{
					for (var key in parameters)
					{
						obj[key] = parameters[key];
					}
				}
				
				obj.pos_x = pos_x + obj.width * x;
				obj.pos_y = pos_y + obj.height * y;
				
				this.game_objects.push(obj);
			}
		}
		
		return this.game_objects[this.game_objects.length - 1];
	},
	
	Restart: function()
	{
		this.screen_x = 0;
		this.screen_y = 0;
		this.game_objects[0].Restart();
		this.time = 0;
	},
	
	Init: function(canvas)
	{
		gGfx.Init(canvas);
		gGfx.SetPalette(g_gfx_palette);
		gGfx.SetElements(g_gfx_elements);
		gGfx.PreRender();
		
		gGameInput.Attach();
		
		var a = g_game_objects;
		for (var i in a)
		{
			this.AddGameObject(a[i][0], a[i][1], a[i][2], a[i][3], a[i][4], a[i][5]);
		}
		
		this.Restart();
	},
	
	Run: function()
	{
		setInterval(function() { gGame.Tick(); }, 1000 / g_game_settings.fps);
	},
	
	SetStatus: function(status)
	{
		this.game_status = status;
	},
	
	ZeroPad: function(a)
	{
		return (a < 10) ? "0" + a : a;
	},
	
	FormatTime: function(time)
	{
		return this.ZeroPad(Math.floor(time / 60)) + ":" +
			this.ZeroPad(Math.floor(time % 60)) + "." +
			this.ZeroPad(Math.floor(time * 100 % 100));
	},
	
	Tick: function()
	{
		var obj, speed;
		this.frame_number++;
		
		// playing
		if (this.game_status == 0)
		{
			this.time += g_game_settings.fps / 1000;
			
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
		// just died
		else if (this.game_status == 1)
		{
			this.deaths++;
			this.game_status = 2;
		}
		// fading out
		else if (this.game_status == 2)
		{
			this.fade_percent += 5;
			if (this.fade_percent > 100)
			{
				this.Restart();
				this.game_status = 3;
			}
		}
		// fading in
		else if (this.game_status == 3)
		{
			this.fade_percent -= 15;
			if (this.fade_percent < 0)
			{
				this.fade_percent = 0;
				this.game_status = 0;
			}
		}
		
		var trashed = 1;
		while (trashed)
		{
			trashed = 0;
			for (var i in this.game_objects)
			{
				if (!this.game_objects[i].trash_flag)
				{
					continue;
				}
				
				this.game_objects[i].trash_flag = 0;
				this.game_objects[i].gfx_element_id = ".";
				this.game_objects[i].pos_y = -1000;
				
//				delete this.game_objects[i];
//				trashed = 1;
//				break;
			}
		}
		
		
		// gGfx.RenderFrame();
		for (var i in this.game_objects)
		{
			this.game_objects[i].Tick(this.game_objects);
		}
		
		if (this.game_objects[0].pos_x < this.screen_x + 40)
		{
			this.screen_x = this.game_objects[0].pos_x - 40;
		} else if (this.game_objects[0].pos_x > this.screen_x + 120)
		{
			this.screen_x = this.game_objects[0].pos_x - 120;
		}
		
		if (this.game_objects[0].pos_y < this.screen_y + 20)
		{
			this.screen_y = this.game_objects[0].pos_y - 20;
		} else if (this.game_objects[0].pos_y > this.screen_y + 100)
		{
			this.screen_y = this.game_objects[0].pos_y - 100;
		}
		
		gGfx.ClearScreen(0);
		gGfx.DrawBackground(0, Math.floor(this.screen_x * -0.5 - 20), Math.floor(this.screen_y * -0.5 + 20));
		for (var i in this.game_objects)
		{
			obj = this.game_objects[i];
			if (!obj.trash_flag)
			{
				gGfx.Draw(obj.gfx_element_id, Math.floor(obj.pos_x - this.screen_x), Math.floor(obj.pos_y - this.screen_y), obj.rotation, obj.gfx_mirror_x);
			}
		}
		gGfx.Fade(this.fade_percent);
		gGfx.RenderStatus(this.FormatTime(this.time), this.ZeroPad(this.deaths), "L" + this.ZeroPad(this.level, 4));
	}
};
