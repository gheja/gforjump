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
	"c": "#630"
};

var g_gfx_elements = {
	0: "11111111 22212222 22212222 22212222 11111111 22222212 22222212 22222212", // brick
	1: ".bb. b3c3 b333 .3.. .33. .33. .33. 3.33", // normal standing
	2: "44444444 44414414 44444444 .4444444 .4144444 .4411111 ..444444 ....4444", // sun
	3: "66666666 61111116 61611616 61111116 61611616 61166116 61111116 66666666", // box
	4: "....3... ...3a... ..35a... .355a... .355a... 35555a.. 355555a. 3555555a", // blade
	5: "8.8.8.8.", // border
	6: ".33.3. 3.88.3 ..338. 38.883", // corpse
	7: ".", // empty pixel
	8: "11111111 11611161 16161616 11111111 11666661 11166611 11116111 11111111", // box funny
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
	[ 128,  144, gGameObjectWall, 22, 1 ],
	[ 128,  136, gGameObjectBlade ],
	[ 288,  136, gGameObjectBlade ],
	[ 296,  136, gGameObjectBlade ],
	[ 246,  128, gGameObjectWall, 5, 2 ],
	[ 192,  112, gGameObjectWall, 4, 1 ],
	[ 192,   40, gGameObjectBladeBox ],
	[ 160,   88, gGameObjectWall, 3, 1 ],
	[ 168,   64, gGameObjectWall, 5, 1 ],
	[ 168,   72, gGameObjectBlade, 1, 1, { rotation: 2 } ],
	[ -64,  256, gGameObjectBorder, 100, 1 ]
];
