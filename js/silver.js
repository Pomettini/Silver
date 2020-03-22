// --- Constants ---

const HOR_CELLS = 20;
const VER_CELLS = 11;
const CELL_SIZE = 50;

const HALF_SIZE = CELL_SIZE / 2;
const HALF_WIDTH = HOR_CELLS / 2;
const HALF_HEIGHT = VER_CELLS / 2;

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

// --- Variables ---

// var Brush = {
//   name,
//   type
// }

var CurrentBrush = {
  name: "None",
  type: BRUSH_TYPES.None
};
var IsMouseDown = false;
var MapData = {
  tiles: [],
  // North, East, South, West
  doors: [DOOR_TYPES.NONE, DOOR_TYPES.NONE, DOOR_TYPES.NONE, DOOR_TYPES.NONE]
};

// --- Functions ---

$(function () {
  console.log("Ready!");

  MapData.tiles = Array(HOR_CELLS * VER_CELLS).fill(0);
  MapData.doors = Array(4).fill(0);

  LoadDataFromStorage();

  Brush.Setup();
  SetBrush({
    name: "None",
    type: BRUSH_TYPES.None
  });

  Cell.Setup();

  $(".cell").css("width", CELL_SIZE + "px");
  $(".cell").css("height", CELL_SIZE + "px");

  Door.Setup();

  $("#grid").width(HOR_CELLS * CELL_SIZE);
  $("#grid").height(VER_CELLS * CELL_SIZE);

  $(".door").css("background-image", `url(img/${DOOR_TYPES.NONE.image})`);

  SetCellColorBasedOnMapData();
  SetDoorImagesBasedOnMapData();
});

function SetCellColorBasedOnMapData() {
  for (var i = 0; i < HOR_CELLS * VER_CELLS; i++) {
    let cell = $(`#cell${i}`);

    if (cell == null)
      continue;

    let color = Brush.GetById(MapData.tiles[i]).type.color;
    ChangeCellColor(cell, color);
  }
}

function SetBrush(brush) {
  Brush.GetByName(CurrentBrush.name).removeClass("selected");
  CurrentBrush = brush;
  Brush.GetByName(CurrentBrush.name).addClass("selected");
}

function SetBrushById(id) {
  // TODO: Refactor this crap
  if (Brush.GetById(id).name != null) {
    SetBrush(Brush.GetById(id));
  }
}

function ReadTextFile(obj) {
  if (obj.files.length === 0) {
    console.log('No file selected.');
    return;
  }

  const reader = new FileReader();

  reader.onload = function fileReadCompleted() {
    // when the reader is done, the content is in reader.result.
    console.log(reader.result);
  };

  reader.readAsText(obj.files[0]);
}

function DownloadFile(filename, text) {
  // Thanks to https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function ToggleTutorial() {
  $("#tutorial").fadeToggle(200);
}

// --- Events ---

function OnBrushClicked(obj) {
  let brushName = $(obj).text();
  SetBrush({
    name: brushName,
    type: BRUSH_TYPES[brushName]
  });
}

function OnCellClickWhileDragging(obj, id) {
  if (IsMouseDown === true) {
    OnCellClicked(obj, id);
  }
}

function OnCellClicked(obj, id) {
  MapData.tiles[id] = CurrentBrush.type.id;
  ChangeCellColor(obj, CurrentBrush.type.color);
  SaveDataToStorage();
}

function ChangeCellColor(obj, color) {
  $(obj).css("background-color", color);
}

function OnDoorClicked(obj, id) {
  // TODO: Refactor this ambomination
  if (MapData.doors[id] < MapData.doors.length - 1) {
    MapData.doors[id]++;
  } else {
    MapData.doors[id] = 0;
  }

  ChangeDoorBgImage(obj, GetDoorImageById(id));
  SaveDataToStorage();
}

function ChangeDoorBgImage(obj, image) {
  $(obj).css("background-image", `url(img/${image})`);
}

function GetDoorImageById(id) {
  return DOOR_TYPES[Object.keys(DOOR_TYPES)[MapData.doors[id]]].image;
}

function SetDoorImagesBasedOnMapData() {
  for (var i = 0; i < 4; i++) {
    let cell = $(`#door${i}`);

    if (cell == null)
      continue;

    let image = GetDoorImageById(i);
    ChangeDoorBgImage(cell, image);
  }
}

$(window).mousedown(function () {
  IsMouseDown = true;
});

$(window).mouseup(function () {
  IsMouseDown = false;
});

$(document).keypress(function (e) {
  let key = e.which - 49;
  if (key >= 0 && key <= 9) {
    SetBrushById(key);
  }
});

function LoadDataFromStorage() {
  let mapdata_ls = localStorage.getItem("MapData");

  if (mapdata_ls == null)
    return;

  let parsed_mapdata = JSON.parse(mapdata_ls);

  if (parsed_mapdata == null)
    return;

  MapData = parsed_mapdata;
}

function SaveDataToStorage() {
  let mapdata_string = JSON.stringify(MapData);

  if (mapdata_string == null)
    return;

  localStorage.setItem("MapData", mapdata_string);
}

function ClearMap() {
  console.log("Not implemented yet");
}

// --- Extension Methods

// Add leading zero if number is one character
Number.prototype.Lead = function () {
  return this.toString().padStart(2, "0");
};

String.prototype.AddComma = function () {
  return this + ",";
};