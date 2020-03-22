var Brush = {};

const BRUSH_TYPES = {
    "None": {
        id: 0,
        color: "white",
        textcolor: "black"
    },
    "Void": {
        id: 1,
        color: "darkslategray",
        textcolor: "white"
    },
    "Ground": {
        id: 2,
        color: "peru",
        textcolor: "black"
    },
    "Chest": {
        id: 3,
        color: "yellow",
        textcolor: "black"
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
                color: BRUSH_TYPES[key].textcolor,
                backgroundColor: BRUSH_TYPES[key].color
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