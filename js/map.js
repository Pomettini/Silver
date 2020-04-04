var Map = {};

Map.WarningCounter = 0;

Map.Setup = function () {
    MapData.tiles = Array(HOR_CELLS * VER_CELLS).fill(0);
    MapData.doors = Array(4).fill(0);
};

Map.Import = function (file) {
    ReadTextFile(file);
};

Map.Export = function () {
    let data = JSON.stringify(MapData);

    let d = new Date();
    let date = `${d.getDay().Lead()}_${d.getMonth().Lead()}`;
    let time = `${d.getHours().Lead()}_${d.getMinutes().Lead()}_${d.getDay().Lead()}`;
    let suffix = `${date}__${time}`;

    DownloadFile(`mylevel__${suffix}.json`, data);
};

Map.Clear = function () {
    $("#undobutton").show();

    switch (Map.WarningCounter) {
        case 0:
            $("#clearbutton").text("ARE YOU SURE?");
            break;
        case 1:
            $("#clearbutton").text("ABSOLUTELY SURE?");
            break;
        case 2:
            Map.Setup();
            SaveDataToStorage();

            Cell.SetImagesBasedOnMapData();
            Door.SetImagesBasedOnMapData();

            Map.UndoClear();
            return;
    }

    Map.WarningCounter++;
};

Map.UndoClear = function () {
    Map.WarningCounter = 0;
    $("#clearbutton").text("Clear Map Again");
    $("#undobutton").hide();
};