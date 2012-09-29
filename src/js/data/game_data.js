var s = {
	fps: 30,
	width: 160,
	height: 120,
	scale: 4,
	first_level: 1
};

var _gfx_palette = {
	".": "rgba(0,0,0,0)",
	0: "#0ac",
	1: "#d80",
	2: "#fa0",
	3: "#fff",
	4: "#ff0",
	5: "#aaa",
	6: "#630",
	7: "#08c",
	8: "#e00",
	9: "#06a",
	"a": "#888",
	"b": "#b60",
	"c": "#630",
	"d": "#fd0",
	"e": "#e90"
};

var _gfx_elements = {
	".": ".", // empty pixel
	"p0": ".bb. b3c3 b333 .3.. .33. .33. .33. 3.33", // normal standing
	"p0x":".bb. b333 b333 .3.. .33. .33. .33. 3.33", //   + blinking
	"p1": ".bb. b3c3 b333 .3.. .333 .33. .33. 3.33", // walk 1
	"p2": ".bb. b3c3 b333 .3.. .33. .33. .33. 333.", // walk 2
	"p3": ".bb. b3c3 b333 .3.. .33. 333. .33. .3.3", // walk 3
	"p4": ".bb. b3c3 b333 .3.. .33. .33. .33. 3.33", // walk 4
	"p5": ".b.b b3b. 333. .3.. .33. 33.. .3.. 3.3.", // fall 1
	"p6": "b.b. b33b 333. .3.. 33.. .33. .3.. 3.3.", // fall 2
	"p7": "b3c3 b333 b33. .3.. .33. 333. .333 33..", // jumping
	0: "11111111 222222e1 222222e1 eeeeeee1 11111111 22e12222 22e12222 eee1eeee", // brick
	1: "35a35a3a 25225225 222222e1 eeeeeee1 11111111 22e12222 22e12222 eee1eeee", // brick + blade
	2: "44444444 44414414 44444444 .4444444 .4144444 .4411111 ..444444 ....4444", // sun
	3: "66666666 61111116 61611616 61111116 61611616 61166116 61111116 66666666", // box
	4: "....3... ...3a... ..35a... .355a... .355a... 35555a.. 355555a. 3555555a", // blade
	5: "8.8.8.8.", // border
	6: ".33.3. 3.88.3 ..338. 38.883", // corpse
	7: "d3d3d3d3 3d3d3d3d 222222e1 eeeeeee1 11111111 22e12222 22e12222 eee1eeee", // brick + jumper
	8: "11111111 11611161 16161616 11111111 11666661 11166611 11116111 11111111", // box funny
	9: "11111111 222222.1 2222..e1 ee.eeee1 1111.111 22212..2 ..e12222 .ee1eeee", // brick + falling
	10: "38.. 388. 3888 388. 38.. 3... 3... 3..." // flag
};

var _gfx_backgrounds = {
};

var g_levels = {
	1: {
		gfx_palette: _gfx_palette,
		gfx_elements: _gfx_elements,
		gfx_backgrounds: _gfx_backgrounds,
		
		game_objects: [
			// pos_x, pos_y, game_object, count_x, count_y, extra properties
			
			// first object must be the player
			[   0,    0, OPlayer, 1, 1, { start_pos_x: 32, start_pos_y: 104 } ],
			
			[   0,  136, OWall, 6, 1 ],
			[  16,  104, OWall ],
			[  16,  112, OWall, 6, 1 ],
			[  80,  112, OWall, 3, 1 ],
			[ 112,   88, OWall, 3, 1 ],
			[ 144,  144, OWall, 8, 1 ],
			[ 144,  136, OBlade ],
			
			[ 224,  144, OWall, 5, 1 ],
			[ 264,  136, OWall, 1, 2 ],
			
			[ 264,  128, OWall, 4, 1 ],
			[ 288,  120, OLevelFlag, 1, 1, { next_level: 2 } ],
			
			[ -64,  152, OBorder, 100, 1 ]
		]
	},
	
	2: {
		gfx_palette: _gfx_palette,
		gfx_elements: _gfx_elements,
		gfx_backgrounds: _gfx_backgrounds,
		
		game_objects: [
			// pos_x, pos_y, game_object, count_x, count_y, extra properties
			
			// first object must be the player
			[   0,    0,  OPlayer, 1, 1, { start_pos_x: 16, start_pos_y: 96 } ],
			
			[  -8,  112, OWall, 7, 1 ],
			[  64,   96, OWall, 2, 1 ],
			[  24,   88, OWall, 2, 1 ],
			[   0,   80, OWall, 4, 1 ],
			[   0,   56, OWall, 1, 3 ],
			[  -8,   56, OWall ],
			
			[  16,   48, OWall, 2, 1 ],
			[  16,   56, OBlade, 1, 1, { rotation: 2 } ],
			[  32,   48, OBladeWall, 2, 1 ],
			[  48,   48, OWall, 4, 1 ],
			
			[  80,   48, OWall, 1, 11 ],
			[  88,  128, OJumpWall ],
			[  96,   48, OWall, 1, 11 ],
			[  104,  48, OWall ],
			
			[  56,   16, OWall, 4, 1 ],
			[  64,  8, OLevelFlag, 1, 1, { next_level: 3 } ],
			
			[ -64,  152, OBorder, 100, 1 ]
		]
	},
	
	3: {
		gfx_palette: _gfx_palette,
		gfx_elements: _gfx_elements,
		gfx_backgrounds: _gfx_backgrounds,
		
		game_objects: [
			// pos_x, pos_y, game_object, count_x, count_y, extra properties
			
			// first object must be the player
			[   0,    0,  OPlayer, 1, 1, { start_pos_x: 8, start_pos_y: 120 } ],
			
			[ -28,   96, OLevelFlag, 1, 1, { next_level: 1 } ],
			
			[ -32,  104, OWall, 3, 1 ],
			[  -8,   88, OWall, 1, 6 ],
			[   0,  128, OWall, 4, 1 ],
			[  48,  104, OWall, 4, 1 ],
			[  32,  128, OBladeWall, 7, 1 ],
			[  88,  128, OJumpWall ],
			[  96,  128, OBladeWall ],
			[ 104,  128, OWall, 2, 1 ],
			
			[  -8,  56, OWall,  5, 1 ],
			[  24,  64, OWall, 7, 1 ],
			[  64,  56, OBlade, 2, 1 ],
			[  32,  72, OBlade, 6, 1, { rotation: 2 } ],
			[  80,  32, OWall, 1, 5 ],
			[  88,  32, OBladeWall, 2, 1 ],
			[ 104,  32, OWall ],
			[ 104,  40, OWall, 2, 1 ],
			
			[  96,  64, OWall, 4, 1 ],
			
			[   0,  32, OBladeBox ],
			
			[ -64,  152, OBorder, 100, 1 ]
		]
	}
}
