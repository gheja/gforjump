var gGameObjectPlayer = function()
{
	this.gfx_element_id = 1;
	this.can_move = 1;
	this.gravity_enabled = 1;
	this.speed_y = -8;
	return this;
}
gGameObjectPlayer.prototype =  new gGameObject();
gGameObjectPlayer.prototype.onCollide = function(object, direction)
{
	if (object instanceof gGameObjectPlayerCorpse)
	{
		return;
	}
	this.onCollideDefault(object, direction);
}
gGameObjectPlayer.prototype.Restart = function()
{
	this.pos_x = 16;
	this.pos_y = 96;
	this.dead = 0;
	this.gfx_element_id = 1;
}
gGameObjectPlayer.prototype.Kill = function()
{
	if (this.dead)
	{
		return;
	}
	
	this.dead = 1;
	this.speed_x = 0;
	this.gfx_element_id = 7;
	
	var x = gGame.AddGameObject(this.pos_x, this.pos_y, gGameObjectPlayerCorpse);
	x.speed_y = this.speed_y;
}



var gGameObjectPlayerCorpse = function()
{
	this.can_move = 1;
	this.gravity_enabled = 1;
	this.gfx_element_id = 6;
	return this;
}
gGameObjectPlayerCorpse.prototype = new gGameObject();
gGameObjectPlayerCorpse.prototype.onCollide = function(object, direction)
{
	return;
}



var gGameObjectWall = function()
{
	this.gfx_element_id = 0;
	return this;
}
gGameObjectWall.prototype = new gGameObject();



var gGameObjectBladeBox = function()
{
	this.gfx_element_id = 3;
	this.ticks_left = 0;
	this.blades = [];
	return this;
}
gGameObjectBladeBox.prototype = new gGameObject();
gGameObjectBladeBox.prototype.onCollide = function(object, direction)
{
	if (!object.dead)
	{
		if (this.ticks_left == 0)
		{
			this.blades[0] = gGame.AddGameObject(this.pos_x,   this.pos_y-8, gGameObjectBlade);
			this.blades[1] = gGame.AddGameObject(this.pos_x+8, this.pos_y,   gGameObjectBlade);
			this.blades[1].rotation = 1;
			this.blades[2] = gGame.AddGameObject(this.pos_x,   this.pos_y+8, gGameObjectBlade);
			this.blades[2].rotation = 2;
			this.blades[3] = gGame.AddGameObject(this.pos_x-8, this.pos_y,   gGameObjectBlade);
			this.blades[3].rotation = 3;
		}
		this.gfx_element_id = 8;
		this.ticks_left = 10;
		object.Kill();
	}
	
	this.onCollideDefault(object, direction);
}
gGameObjectBladeBox.prototype.Tick = function(objects)
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


var gGameObjectBorder = function()
{
	this.gfx_element_id = 5;
	return this;
}
gGameObjectBorder.prototype = new gGameObject();
gGameObjectBorder.prototype.onCollide = function(object, direction)
{
	object.Kill();
	this.onCollideDefault(object, direction);
}


var gGameObjectBlade = function()
{
	this.gfx_element_id = 4;
	return this;
}
gGameObjectBlade.prototype = new gGameObject();
gGameObjectBlade.prototype.onCollide = function(object, direction)
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
