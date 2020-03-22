var Door = {};

Door.Setup = function () {
    let HORIZONTAL_DOOR_SIZE = {
        width: CELL_SIZE * 4,
        height: CELL_SIZE
    };
    let VERTICAL_DOOR_SIZE = {
        width: CELL_SIZE,
        height: CELL_SIZE * 3
    };

    Door.Spawn(0,
        (CELL_SIZE * HALF_WIDTH) - (HORIZONTAL_DOOR_SIZE.width / 2),
        -HORIZONTAL_DOOR_SIZE.height,
        HORIZONTAL_DOOR_SIZE);
    Door.Spawn(1,
        (CELL_SIZE * HOR_CELLS),
        (CELL_SIZE * HALF_HEIGHT) - (VERTICAL_DOOR_SIZE.height / 2),
        VERTICAL_DOOR_SIZE);
    Door.Spawn(2,
        (CELL_SIZE * HALF_WIDTH) - (HORIZONTAL_DOOR_SIZE.width / 2),
        (CELL_SIZE * VER_CELLS),
        HORIZONTAL_DOOR_SIZE);
    Door.Spawn(3,
        -CELL_SIZE,
        (HALF_HEIGHT * CELL_SIZE) - (VERTICAL_DOOR_SIZE.height / 2),
        VERTICAL_DOOR_SIZE);
};

Door.Spawn = function (id, x, y, size) {
    var cell = $("<div>", {
        "id": `door${id}`,
        "class": "cell door",
        "onMouseDown": `OnDoorClicked(this, ${id})`,
        css: {
            left: x,
            top: y,
            width: size.width,
            height: size.height
        }
    });
    $("#grid").append(cell);
};