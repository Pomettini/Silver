// --- Constants ---

const HOR_CELLS = 20;
const VER_CELLS = 11;
const CELL_SIZE = 50;

const HALF_WIDTH = HOR_CELLS / 2;
const HALF_HEIGHT = VER_CELLS / 2;

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
  Brush.Set({
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

  Cell.SetColorBasedOnMapData();
  Door.SetImagesBasedOnMapData();
});

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

$(window).mousedown(function () {
  IsMouseDown = true;
});

$(window).mouseup(function () {
  IsMouseDown = false;
});

$(document).keypress(function (e) {
  // Basically checks if it's a number key
  let key = e.which - 49;
  if (key >= 0 && key <= 9) {
    Brush.SetById(key);
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

// --- Extension Methods

// Add leading zero if number is one character
Number.prototype.Lead = function () {
  return this.toString().padStart(2, "0");
};

String.prototype.AddComma = function () {
  return this + ",";
};