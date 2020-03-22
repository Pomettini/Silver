var Map = {};

Map.Import = function (file) {
    ReadTextFile(file);
};

Map.Export = function () {
    // Brief description of the map format:
    // 0-219 -> 
    // 219-223 -> Door types in NESW format
    var csv = "";
    csv += MapData.tiles.join(",").AddComma();
    csv += MapData.doors.join(",");

    let d = new Date();
    let date = `${d.getDay().Lead()}_${d.getMonth().Lead()}`;
    let time = `${d.getHours().Lead()}_${d.getMinutes().Lead()}_${d.getDay().Lead()}`;
    let suffix = `${date}__${time}`;
    DownloadFile(`mylevel__${suffix}.csv`, csv);
};