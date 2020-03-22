var Brush = {};

Brush.Setup = function () {
    for (var key in BRUSH_TYPES) {
        var brush = $("<li>", {
            "text": key,
            "id": key.toLowerCase() + "_brush",
            "class": "brush",
            "onMouseDown": "OnBrushClicked(this)",
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