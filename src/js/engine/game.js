var gGame = {
	frame_number: 0,
	
	Init: function(canvas)
	{
		gGfx.Init(canvas);
	},
	
	Tick: function()
	{
		gGfx.RenderFrame();
	}
};
