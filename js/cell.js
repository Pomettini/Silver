var Cell = {};

Cell.Setup = function () {
    for (var x = 0; x < HOR_CELLS; x++) {
        for (var y = 0; y < VER_CELLS; y++) {
            let id = (y * HOR_CELLS) + x;
            var cell = $("<div>", {
                "id": `cell${id}`,
                "class": "cell",
                "onMouseDown": `Cell.OnClicked(this, ${id})`,
                "onMouseEnter": `Cell.OnClickedWhileDragging(this, ${id})`,
                css: {
                    left: CELL_SIZE * x + "vh",
                    top: CELL_SIZE * y + "vh"
                }
            });
            $("#grid").append(cell);
        }
    }
};

Cell.OnClicked = function (obj, id) {
    MapData.tiles[id] = CurrentBrush.type.id;
    Cell.ChangeBgImage(obj, CurrentBrush.type.image);
    SaveDataToStorage();
};

Cell.OnClickedWhileDragging = function (obj, id) {
    if (IsMouseDown === true) {
        Cell.OnClicked(obj, id);
    }
};

Cell.SetImagesBasedOnMapData = function () {
    for (var i = 0; i < HOR_CELLS * VER_CELLS; i++) {
        let cell = $(`#cell${i}`);

        if (cell == null) {
            continue;
        }

        let image = Brush.GetById(MapData.tiles[i]).type.image;
        Cell.ChangeBgImage(cell, image);
    }
};

Cell.ChangeBgImage = function (obj, image) {
    $(obj).css("background-image", `url(img/${image})`);
};