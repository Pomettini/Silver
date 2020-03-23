var Door = {};

const DOOR_TYPES = {
    NONE: {
        id: 0,
        image: ""
    },
    WALL: {
        id: 1,
        image: "doors/Wall.png"
    },
    NORMAL_DOOR: {
        id: 2,
        image: "doors/NormalDoor.png"
    },
    LOCKED_DOOR: {
        id: 3,
        image: "doors/LockedDoor.png"
    },
};

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
        "onMouseDown": `Door.OnClicked(this, ${id})`,
        css: {
            left: x + "vh",
            top: y + "vh",
            width: size.width + "vh",
            height: size.height + "vh"
        }
    });
    $("#grid").append(cell);
};

Door.GetImageById = function (id) {
    return DOOR_TYPES[Object.keys(DOOR_TYPES)[MapData.doors[id]]].image;
};

Door.OnClicked = function (obj, id) {
    // TODO: Refactor this ambomination
    if (MapData.doors[id] < MapData.doors.length - 1) {
        MapData.doors[id]++;
    } else {
        MapData.doors[id] = 0;
    }

    Door.ChangeBgImage(obj, Door.GetImageById(id));
    SaveDataToStorage();
};

Door.ChangeBgImage = function (obj, image) {
    $(obj).css("background-image", `url(img/${image})`);
};

Door.SetImagesBasedOnMapData = function () {
    for (var i = 0; i < 4; i++) {
        let cell = $(`#door${i}`);

        if (cell == null)
            continue;

        let image = Door.GetImageById(i);
        Door.ChangeBgImage(cell, image);
    }
};