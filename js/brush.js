var Brush = {};

const BRUSH_TYPES = {
    "None": {
        id: 0,
        image: ""
    },
    "Nones": {
        id: 1,
        image: "tiles/tile_full_grass.png"
    },
    "Void": {
        id: 2,
        image: "tiles/tile_full_grass2.png"
    },
    "Ground": {
        id: 3,
        image: "tiles/tile_full_mix.png"
    },
    "Chest": {
        id: 4,
        image: "tiles/tile_full_plane_mix.png"
    },
    "Chests": {
        id: 5,
        image: "tiles/tile_full_plane.png"
    },
    "Chestss": {
        id: 6,
        image: "tiles/tile_full_stone.png"
    }
};

var CurrentBrush = {
    name: "None",
    type: BRUSH_TYPES.None
};

Brush.Setup = function () {
    for (var key in BRUSH_TYPES) {
        var brush = $("<li>", {
            "text": key,
            "id": key.toLowerCase() + "_brush",
            "class": "brush",
            "onMouseDown": "Brush.OnClicked(this)",
            css: {
                backgroundImage: `url("img/${BRUSH_TYPES[key].image}")`
            }
        });
        $("#brushes").append(brush);
    }
};

Brush.GetById = function (id) {
    return {
        name: Object.keys(BRUSH_TYPES)[id],
        type: BRUSH_TYPES[Object.keys(BRUSH_TYPES)[id]]
    };
};

Brush.GetByName = function (name) {
    return $("#" + name.toLowerCase() + "_brush");
};

Brush.OnClicked = function (obj) {
    let brushName = $(obj).text();
    Brush.Set({
        name: brushName,
        type: BRUSH_TYPES[brushName]
    });
};

Brush.Set = function (brush) {
    Brush.GetByName(CurrentBrush.name).removeClass("selected");
    CurrentBrush = brush;
    Brush.GetByName(CurrentBrush.name).addClass("selected");
};

Brush.SetById = function (id) {
    if (Brush.GetById(id).name != null) {
        Brush.Set(Brush.GetById(id));
    }
};