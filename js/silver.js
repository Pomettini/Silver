// --- Constants ---

const W_CELLS = 19;
const H_CELLS = 11;
const CELL_SIZE = 50;

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
  },
  _key: function (n) {
    let myKey = {
      name: Object.keys(BRUSH_TYPES)[n],
      type: this[Object.keys(this)[n]]
    };
    return myKey;
  }
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
var MapData = [];

// --- Functions ---

$(function () {
  console.log("Ready!");

  AddBrushes();
  SetBrush({
    name: "None",
    type: BRUSH_TYPES.None
  });

  $("#grid").width(W_CELLS * CELL_SIZE);
  $("#grid").height(H_CELLS * CELL_SIZE);

  SpawnCells();

  $(".cell").css("width", CELL_SIZE + "px");
  $(".cell").css("height", CELL_SIZE + "px");

  MapData = Array(W_CELLS * H_CELLS).fill(0);
});

function AddBrushes() {
  for (var key in BRUSH_TYPES) {
    if (key === "_key")
      continue;

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
  if (BRUSH_TYPES._key(id).name != null && BRUSH_TYPES._key(id).name !== "_key") {
    SetBrush(BRUSH_TYPES._key(id));
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
  let csv = MapData.join(",");
  let today = new Date();
  let suffix = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
  DownloadFile(`mylevel_${suffix}.csv`, csv);
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
  MapData[id] = CurrentBrush.type.id;
  $(obj).css("background-color", CurrentBrush.type.color);
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