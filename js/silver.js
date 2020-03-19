// --- Constants ---

const W_CELLS = 19;
const H_CELLS = 11;
const CELL_SIZE = 50;

const half_size = CELL_SIZE / 2;
const half_width = W_CELLS / 2;
const half_height = H_CELLS / 2;

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

  AddBrushes();
  SetBrush({
    name: "None",
    type: BRUSH_TYPES.None
  });

  SpawnDoors();

  $("#grid").width(W_CELLS * CELL_SIZE);
  $("#grid").height(H_CELLS * CELL_SIZE);

  SpawnCells();

  $(".cell").css("width", CELL_SIZE + "px");
  $(".cell").css("height", CELL_SIZE + "px");

  MapData.tiles = Array(W_CELLS * H_CELLS).fill(0);
  MapData.doors = Array(4).fill(0);

  $(".door").css("background-image", `url(img/${DOOR_TYPES.NONE.image})`);
});

function AddBrushes() {
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
}

function SpawnCells() {
  for (x = 0; x < W_CELLS; x++) {
    for (y = 0; y < H_CELLS; y++) {
      let id = (y * W_CELLS) + x;
      var cell = $("<div>", {
        "class": "cell",
        "onMouseDown": `OnCellClicked(this, ${id})`,
        "onMouseEnter": `OnCellClickWhileDragging(this, ${id})`,
        css: {
          left: (CELL_SIZE * x) + "px",
          top: (CELL_SIZE * y) + "px"
        }
      });
      $("#grid").append(cell);
    }
  }
}

function SpawnDoors() {
  SpawnDoor(0, (CELL_SIZE * half_width) - half_size, -CELL_SIZE);
  SpawnDoor(1, (CELL_SIZE * W_CELLS), (CELL_SIZE * half_height) - half_size);
  SpawnDoor(2, (CELL_SIZE * half_width) - half_size, (CELL_SIZE * H_CELLS));
  SpawnDoor(3, -CELL_SIZE, (half_height * CELL_SIZE) - half_size);
}

function SpawnDoor(id, x, y) {
  var cell = $("<div>", {
    "class": "cell door",
    "onMouseDown": `OnDoorClicked(this, ${id})`,
    css: {
      left: x,
      top: y
    }
  });
  $("#grid").append(cell);
}

function SetBrush(brush) {
  GetBrushElement(CurrentBrush.name).removeClass("selected");
  CurrentBrush = brush;
  GetBrushElement(CurrentBrush.name).addClass("selected");
}

function GetBrushElement(name) {
  return $("#" + name.toLowerCase() + "_brush");
}

function SetBrushById(id) {
  // TODO: Refactor this crap
  if (GetBrushById(id).name != null) {
    SetBrush(GetBrushById(id));
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

function ImportMap(file) {
  ReadTextFile(file);
}

function ExportMap() {
  // Brief description of the map format:
  // 0-208 -> 
  // 209-213 -> Door types in NESW format
  var csv = "";
  csv += MapData.tiles.join(",").AddComma();
  csv += MapData.doors.join(",");

  let d = new Date();
  let date = `${d.getDay().Lead()}_${d.getMonth().Lead()}`;
  let time = `${d.getHours().Lead()}_${d.getMinutes().Lead()}_${d.getDay().Lead()}`;
  let suffix = `${date}__${time}`;
  DownloadFile(`mylevel__${suffix}.csv`, csv);
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
  $(obj).css("background-color", CurrentBrush.type.color);
}

function OnDoorClicked(obj, id) {
  // TODO: Refactor this ambomination
  if (MapData.doors[id] < MapData.doors.length - 1) {
    MapData.doors[id]++;
  } else {
    MapData.doors[id] = 0;
  }
  $(obj).css("background-image", `url(img/${GetDoorImageById(id)})`);
}

function GetDoorImageById(id) {
  return DOOR_TYPES[Object.keys(DOOR_TYPES)[MapData.doors[id]]].image;
}

function GetBrushById(id) {
  return {
    name: Object.keys(BRUSH_TYPES)[id],
    type: BRUSH_TYPES[Object.keys(BRUSH_TYPES)[id]]
  };
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

// --- Extension Methods

// Add leading zero if number is one character
Number.prototype.Lead = function () {
  return this.toString().padStart(2, "0");
};

String.prototype.AddComma = function () {
  return this + ",";
};