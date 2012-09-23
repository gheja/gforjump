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



var gGameObjectWall = function()
{
	this.gfx_element_id = 0;
	return this;
}
gGameObjectWall.prototype = new gGameObject();



var gGameObjectBox = function()
{
	this.gfx_element_id = 3;
	return this;
}
gGameObjectBox.prototype = new gGameObject();



var gGameObjectBorder = function()
{
	this.gfx_element_id = 5;
	return this;
}
gGameObjectBorder.prototype = new gGameObject();
gGameObjectBorder.prototype.onCollide = function(object, direction)
{
	if (object instanceof gGameObjectPlayer)
	{
		object.Kill();
	}
}


var gGameObjectBlade = function()
{
	this.gfx_element_id = 4;
	return this;
}
gGameObjectBlade.prototype = new gGameObject();
gGameObjectBlade.prototype.onCollide = function(object, direction)
{
	if (object instanceof gGameObjectPlayer)
	{
		object.Kill();
	}
}
