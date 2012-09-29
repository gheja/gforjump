var OPlayer = function()
{
	this.gfx_element_id = "p0";
	this.can_move = 1;
	this.gravity_enabled = 1;
	this.ticks = 0;
	return this;
}
OPlayer.prototype =  new O();
OPlayer.prototype.onCollide = function(object, direction)
{
	if (object instanceof OPlayerCorpse)
	{
		return;
	}
	this.onCollideDefault(object, direction);
}
OPlayer.prototype.Restart = function()
{
	this.pos_x = this.start_pos_x;
	this.pos_y = this.start_pos_y;
	this.speed_x = 0;
	this.speed_y = 0;
	this.dead = 0;
	this.can_move = 1;
	this.gfx_element_id = "p0";
}
OPlayer.prototype.Kill = function(no_corpse)
{
	if (this.dead)
	{
		return;
	}
	
	this.dead = 1;
	if (!no_corpse)
	{
		this.speed_x = 0;
		this.can_move = 0;
		this.gfx_element_id = ".";
		var x = gGame.AddGameObject(this.pos_x, this.pos_y, OPlayerCorpse);
		x.speed_y = this.speed_y;
	}
	
	gGame.SetStatus(1); // just died
}
OPlayer.prototype.Tick = function(objects)
{
	if (!this.dead)
	{
		/* animation stuffs */
		this.ticks++;
		
		var a = Math.floor(this.ticks / 4); // frameskip
		
		/* jumping (highest priority) */
		if (this.speed_y < 0)
		{
			this.gfx_element_id = "p7";
		}
		/* walking */
		else if (this.speed_x != 0)
		{
			this.gfx_mirror_x = (this.speed_x < 0) * 1; // parse as int
			this.gfx_element_id = "p" + (a % 4 + 1);
		}
		/* falling */
		else if (this.speed_y > 0)
		{
			this.gfx_element_id = "p" + ((a % 2) + 5);
		}
		/* standing */
		else
		{
			/* turn around */
			if (this.ticks % 220 == 0)
			{
				this.gfx_mirror_x = (this.gfx_mirror_x + 1) % 2;
			}
			
			/* blinking */
			this.gfx_element_id = "p0" + (a % 25 == 0 ? "x" : "");
		}
	}
	
	this.DefaultTick(objects);
}



var OPlayerCorpse = function()
{
	this.can_move = 1;
	this.gravity_enabled = 1;
	this.gfx_element_id = 6;
	return this;
}
OPlayerCorpse.prototype = new O();
OPlayerCorpse.prototype.onCollide = function(object, direction)
{
	return;
}



var OWall = function()
{
	this.gfx_element_id = 0;
	return this;
}
OWall.prototype = new O();



var OBladeBox = function()
{
	this.gfx_element_id = 3;
	this.ticks_left = 0;
	this.blades = [];
	return this;
}
OBladeBox.prototype = new O();
OBladeBox.prototype.onCollide = function(object, direction)
{
	if (!object.dead)
	{
		if (this.ticks_left == 0)
		{
			this.blades[0] = gGame.AddGameObject(this.pos_x,   this.pos_y-8, OBlade);
			this.blades[1] = gGame.AddGameObject(this.pos_x+8, this.pos_y,   OBlade);
			this.blades[1].rotation = 1;
			this.blades[2] = gGame.AddGameObject(this.pos_x,   this.pos_y+8, OBlade);
			this.blades[2].rotation = 2;
			this.blades[3] = gGame.AddGameObject(this.pos_x-8, this.pos_y,   OBlade);
			this.blades[3].rotation = 3;
		}
		this.gfx_element_id = 8;
		this.ticks_left = 10;
		object.Kill();
	}
	
	this.onCollideDefault(object, direction);
}
OBladeBox.prototype.Tick = function(objects)
{
	if (this.ticks_left > 0)
	{
		if (this.ticks_left == 1)
		{
			this.blades[0].trash_flag = 1;
			this.blades[1].trash_flag = 1;
			this.blades[2].trash_flag = 1;
			this.blades[3].trash_flag = 1;
			this.gfx_element_id = 3;
		}
		this.ticks_left--;
	}
	this.DefaultTick(objects);
}

var OBladeWall = function()
{
	this.gfx_element_id = 1;
	this.ticks_left = 0;
	this.blades = [];
	return this;
}
OBladeWall.prototype = new O();
OBladeWall.prototype.onCollide = function(object, direction)
{
	if (!object.dead)
	{
		if (
			(this.rotation == 0 && object.speed_y > 0) ||
			(this.rotation == 1 && object.speed_x < 0) ||
			(this.rotation == 2 && object.speed_y < 0) ||
			(this.rotation == 3 && object.speed_x > 0)
		)
		{
			if (this.ticks_left == 0)
			{
				this.blades[0] = gGame.AddGameObject(this.pos_x,   this.pos_y-8, OBlade);
			}
			this.ticks_left = 10;
			object.Kill();
		}
	}
	
	this.onCollideDefault(object, direction);
}
OBladeWall.prototype.Tick = function(objects)
{
	if (this.ticks_left > 0)
	{
		if (this.ticks_left == 1)
		{
			this.blades[0].trash_flag = 1;
		}
		this.ticks_left--;
	}
	this.DefaultTick(objects);
}

var OJumpWall = function()
{
	this.gfx_element_id = 7;
	this.ticks_left = 0;
	this.blades = [];
	return this;
}
OJumpWall.prototype = new O();
OJumpWall.prototype.onCollide = function(object, direction)
{
	if (!object.dead)
	{
		object.speed_y = -15;
	}
	
	this.onCollideDefault(object, direction);
}


var OBorder = function()
{
	this.gfx_element_id = 5;
	return this;
}
OBorder.prototype = new O();
OBorder.prototype.onCollide = function(object, direction)
{
	object.Kill(true);
//	this.onCollideDefault(object, direction);
}


var OBlade = function()
{
	this.gfx_element_id = 4;
	return this;
}
OBlade.prototype = new O();
OBlade.prototype.onCollide = function(object, direction)
{
	if (
		(this.rotation == 0 && object.speed_y > 0) ||
		(this.rotation == 1 && object.speed_x < 0) ||
		(this.rotation == 2 && object.speed_y < 0) ||
		(this.rotation == 3 && object.speed_x > 0)
	)
	{
		object.Kill();
	}
}


var OWallFalling = function()
{
	this.gfx_element_id = 9;
	return this;
}
OWallFalling.prototype = new O();
OWallFalling.prototype.onCollide = function(object, direction)
{
	this.can_move = 1;
	this.gravity_enabled = 1;
	this.onCollideDefault(object, direction);
}


var OLevelFlag = function()
{
	this.gfx_element_id = 10;
	return this;
}
OLevelFlag.prototype = new O();
OLevelFlag.prototype.onCollide = function(object, direction)
{
	if (object instanceof OPlayer)
	{
		object.can_move = 0;
		object.speed_x = 0;
		object.speed_y = 0;
		gGame.GotoLevel(this.next_level);
		
		// block the player
		this.onCollideDefault(object, direction);
	}
}
