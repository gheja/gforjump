var gGame = {
	frame_number: 0,
	
	Init: function(canvas)
	{
		gGfx.Init(canvas);
		gGfx.SetPalette(g_gfx_palette);
		gGfx.SetElements(g_gfx_elements);
		gGfx.PreRender();
	},
	
	Tick: function()
	{
		gGfx.RenderFrame();
	}
};
