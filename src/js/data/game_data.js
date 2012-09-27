var g_game_settings = {
	fps: 30
};

var g_gfx_palette = {
	0: "#0ac",
	1: "#d80",
	2: "#fa0",
	3: "#fff",
	4: "#ff0",
	5: "#aaa",
	6: "#630",
	7: "#09c",
	8: "#e00",
	9: "#06a",
	"a": "#888",
	"b": "#b60",
	"c": "#630",
	"d": "#fd0",
	"e": "#e90"
};

var g_gfx_elements = {
	".": ".", // empty pixel
	"p0": ".bb. b3c3 b333 .3.. .33. .33. .33. 3.33", // normal standing
	"p0x":".bb. b333 b333 .3.. .33. .33. .33. 3.33", //   + blinking
	"p1": ".bb. b3c3 b333 .3.. .333 .33. .33. 3.33", // walk 1
	"p2": ".bb. b3c3 b333 .3.. .33. .33. .33. 333.", // walk 2
	"p3": ".bb. b3c3 b333 .3.. .33. 333. .33. .3.3", // walk 3
	"p4": ".bb. b3c3 b333 .3.. .33. .33. .33. 3.33", // walk 4
	"p5": ".b.b b3b. 333. .3.. .33. 33.. .3.. 3.3.", // fall 1
	"p6": "b.b. b33b 333. .3.. 33.. .33. .3.. 3.3.", // fall 2
	0: "11111111 222222e1 222222e1 eeeeeee1 11111111 22e12222 22e12222 eee1eeee", // brick
	1: "35a35a3a 25225225 222222e1 eeeeeee1 11111111 22e12222 22e12222 eee1eeee", // brick + blade
	2: "44444444 44414414 44444444 .4444444 .4144444 .4411111 ..444444 ....4444", // sun
	3: "66666666 61111116 61611616 61111116 61611616 61166116 61111116 66666666", // box
	4: "....3... ...3a... ..35a... .355a... .355a... 35555a.. 355555a. 3555555a", // blade
	5: "8.8.8.8.", // border
	6: ".33.3. 3.88.3 ..338. 38.883", // corpse
	7: "d3d3d3d3 3d3d3d3d 222222e1 eeeeeee1 11111111 22e12222 22e12222 eee1eeee", // brick + jumper
	8: "11111111 11611161 16161616 11111111 11666661 11166611 11116111 11111111", // box funny
	9: "11111111 222222.1 2222..e1 ee.eeee1 1111.111 22212..2 ..e12222 .ee1eeee" // brick + falling
};

var g_gfx_backgrounds = {
};

var g_game_objects = [
	// pos_x, pos_y, game_object, count_x, count_y
	
	// first object must be the player
	[ 16,  96,  gGameObjectPlayer ],
	
	[   0,  104, gGameObjectWall ],
	[   0,  112, gGameObjectWall, 6, 1 ],
	[  64,  112, gGameObjectWall, 3, 1 ],
	[  96,   88, gGameObjectWall, 3, 1 ],
	[  32,  104, gGameObjectWall ],
//	[ 104,   64, gGameObjectBladeBox ],
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
	[ 288,   88, gGameObjectWallFalling, 5, 1 ],
	[ 120,   88, gGameObjectJumpWall ],
	[ -64,  256, gGameObjectBorder, 100, 1 ]
];
