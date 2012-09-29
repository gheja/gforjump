var g_game_settings = {
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
	10: "38.. 388. 3888 388. 38.. 3... 3... 3...", // flag
	"d0": "3333 3..3 3..3 3..3 3..3 3..3 3333",
	"d1": ".33. ..3. ..3. ..3. ..3. ..3. .333",
	"d2": "333. ...3 ...3 ..3. .3.. 3.... 3333",
	"d3": "3333 ...3 ...3 .333 ...3 ...3 3333",
	"d4": "3..3 3..3 3..3 3333 ...3 ...3 ...3",
	"d5": "3333 3... 3... 3333 ...3 ...3 3333",
	"d6": "3... 3... 3... 3333 3..3 3..3 3333",
	"d7": "3333 ...3 ...3 ..3. ..3. .3.. .3..",
	"d8": "3333 3..3 3..3 3333 3..3 3..3 3333",
	"d9": "3333 3..3 3..3 3333 ...3 ...3 ...3",
	"d:": ".... ..3. .... .... ..3. .... ...."
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
			[   0,    0,  gGameObjectPlayer, 1, 1, { start_pos_x: 32, start_pos_y: 104 } ],
			
			[   0,  136, gGameObjectWall, 6, 1 ],
			[  16,  104, gGameObjectWall ],
			[  16,  112, gGameObjectWall, 6, 1 ],
			[  80,  112, gGameObjectWall, 3, 1 ],
			[ 112,   88, gGameObjectWall, 3, 1 ],
			[ 144,  144, gGameObjectWall, 8, 1 ],
			[ 144,  136, gGameObjectBlade ],
			
			[ 224,  144, gGameObjectWall, 5, 1 ],
			[ 264,  136, gGameObjectWall, 1, 2 ],
			
			[ 264,  128, gGameObjectWall, 4, 1 ],
			[ 288,  120, gGameObjectLevelFlag, 1, 1, { next_level: 2 } ],
			
			[ -64,  152, gGameObjectBorder, 100, 1 ]
		]
	},
	
	2: {
		gfx_palette: _gfx_palette,
		gfx_elements: _gfx_elements,
		gfx_backgrounds: _gfx_backgrounds,
		
		game_objects: [
			// pos_x, pos_y, game_object, count_x, count_y, extra properties
			
			// first object must be the player
			[   0,    0,  gGameObjectPlayer, 1, 1, { start_pos_x: 16, start_pos_y: 96 } ],
			
			[  -8,  112, gGameObjectWall, 7, 1 ],
			[  64,   96, gGameObjectWall, 2, 1 ],
			[  24,   88, gGameObjectWall, 2, 1 ],
			[   0,   80, gGameObjectWall, 4, 1 ],
			[   0,   56, gGameObjectWall, 1, 3 ],
			[  -8,   56, gGameObjectWall ],
			
			[  16,   48, gGameObjectWall, 2, 1 ],
			[  16,   56, gGameObjectBlade, 1, 1, { rotation: 2 } ],
			[  32,   48, gGameObjectBladeWall, 2, 1 ],
			[  48,   48, gGameObjectWall, 4, 1 ],
			
			[  80,   48, gGameObjectWall, 1, 11 ],
			[  88,  128, gGameObjectJumpWall ],
			[  96,   48, gGameObjectWall, 1, 11 ],
			[  104,  48, gGameObjectWall ],
			
			[  56,   16, gGameObjectWall, 4, 1 ],
			[  64,  8, gGameObjectLevelFlag, 1, 1, { next_level: 3 } ],
			
			[ -64,  152, gGameObjectBorder, 100, 1 ]
		]
	},
	
	3: {
		gfx_palette: _gfx_palette,
		gfx_elements: _gfx_elements,
		gfx_backgrounds: _gfx_backgrounds,
		
		game_objects: [
			// pos_x, pos_y, game_object, count_x, count_y, extra properties
			
			// first object must be the player
			[   0,    0,  gGameObjectPlayer, 1, 1, { start_pos_x: 8, start_pos_y: 120 } ],
			
			[ -28,   96, gGameObjectLevelFlag, 1, 1, { next_level: 1 } ],
			
			[ -32,  104, gGameObjectWall, 3, 1 ],
			[  -8,   88, gGameObjectWall, 1, 6 ],
			[   0,  128, gGameObjectWall, 4, 1 ],
			[  48,  104, gGameObjectWall, 4, 1 ],
			[  32,  128, gGameObjectBladeWall, 7, 1 ],
			[  88,  128, gGameObjectJumpWall ],
			[  96,  128, gGameObjectBladeWall ],
			[ 104,  128, gGameObjectWall, 2, 1 ],
			
			[  -8,  56, gGameObjectWall,  5, 1 ],
			[  24,  64, gGameObjectWall, 7, 1 ],
			[  64,  56, gGameObjectBlade, 2, 1 ],
			[  32,  72, gGameObjectBlade, 6, 1, { rotation: 2 } ],
			[  80,  32, gGameObjectWall, 1, 5 ],
			[  88,  32, gGameObjectBladeWall, 2, 1 ],
			[ 104,  32, gGameObjectWall ],
			[ 104,  40, gGameObjectWall, 2, 1 ],
			
			[  96,  64, gGameObjectWall, 4, 1 ],
			
			[   0,  32, gGameObjectBladeBox ],
			
			[ -64,  152, gGameObjectBorder, 100, 1 ]
		]
	},
	
	4: {
		gfx_palette: _gfx_palette,
		gfx_elements: _gfx_elements,
		gfx_backgrounds: _gfx_backgrounds,
		
		game_objects: [
			// pos_x, pos_y, game_object, count_x, count_y, extra properties
			
			// first object must be the player
			[   0,    0,  gGameObjectPlayer, 1, 1, { start_pos_x: 8, start_pos_y: 120 } ],
			
			[   0,  128, gGameObjectWall, 4, 1 ],
			
			[ -28,   96, gGameObjectLevelFlag, 1, 1, { next_level: 4 } ],
			
			[ -64,  152, gGameObjectBorder, 100, 1 ]
		]
	},
	
	
	
	"test": {
		gfx_palette: _gfx_palette,
		gfx_elements: _gfx_elements,
		gfx_backgrounds: _gfx_backgrounds,
		
		game_objects: [
			// pos_x, pos_y, game_object, count_x, count_y, extra properties
			
			// first object must be the player
			[   0,    0,  gGameObjectPlayer, 1, 1, { start_pos_x: 16, start_pos_y: 96 } ],
			
			[   0,  104, gGameObjectWall ],
			[   0,  112, gGameObjectWall, 6, 1 ],
			[  64,  112, gGameObjectWall, 3, 1 ],
			[  96,   88, gGameObjectWall, 3, 1 ],
			[  32,  104, gGameObjectWall ],
			[ 128,  144, gGameObjectWall, 9, 1 ],
			[ 200,  144, gGameObjectBladeWall ],
			[ 208,  144, gGameObjectWall, 13, 1 ],
			[ 128,  136, gGameObjectBlade ],
			[ 248,  128, gGameObjectWall, 4, 2 ],
			[ 280,  136, gGameObjectBlade ],
			[ 288,  136, gGameObjectBlade ],
			[ 296,  136, gGameObjectBlade ],
			[ 304,  136, gGameObjectBlade ],
			[ 192,  112, gGameObjectWall, 4, 1 ],
			[ 192,   40, gGameObjectBladeBox ],
			[ 160,   88, gGameObjectWall, 3, 1 ],
			[ 168,   64, gGameObjectWall, 5, 1 ],
			[ 168,   72, gGameObjectBlade, 1, 1, { rotation: 2 } ],
			[ 208,   72, gGameObjectWall, 5, 1 ],
			[ 248,   80, gGameObjectWall, 5, 1 ],
			[ 288,   88, gGameObjectWall, 3, 1 ],
			[ 312,   88, gGameObjectJumpWall ],
			[ 288,   88, gGameObjectWall, 3, 1 ],
			[ 248,   32, gGameObjectWall ],
			[ 256,   32, gGameObjectBladeWall, 2, 1 ],
			[ 272,   32, gGameObjectWall ],
			[ 250,   24, gGameObjectLevelFlag, 1, 1, { next_level: 1 } ],
			[ -64,  152, gGameObjectBorder, 100, 1 ]
		]
	}
}
