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
  }
}

// --- Variables ---

// var Brush = {
//   name,
//   type
// }

var IsMouseDown = false;
var CurrentBrush = {
  name: "None",
  type: BRUSH_TYPES["None"]
};

// --- Functions ---

$(function () {
  console.log("Ready!");

  AddBrushes();
  SetBrush({
    name: "None",
    type: BRUSH_TYPES["None"]
  });

  $("#grid").width(W_CELLS * CELL_SIZE);
  $("#grid").height(H_CELLS * CELL_SIZE);

  SpawnCells();

  $(".cell").css("width", CELL_SIZE + "px");
  $(".cell").css("height", CELL_SIZE + "px");
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
      var cell = $("<div>", {
        "class": "cell",
        "onMouseDown": `OnCellClicked(this, ${x}, ${y})`,
        "onMouseEnter": `OnCellClickWhileDragging(this, ${x}, ${y})`,
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
  // GetBrushElement(CurrentBrush.name).removeClass("selected");
  CurrentBrush = brush;
  // GetBrushElement(brushName).addClass("selected");
}

function GetBrushElement(name) {
  return $("#" + name.toLowerCase() + "_brush");
}

// --- Events ---

function OnBrushClicked(obj) {
  let brushName = $(obj).text();
  SetBrush({
    name: brushName,
    type: BRUSH_TYPES[brushName]
  });
}

function OnCellClickWhileDragging(obj, x, y) {
  if (IsMouseDown === true) {
    OnCellClicked(obj, x, y)
  }
}

function OnCellClicked(obj, x, y) {
  // console.log(CurrentBrush);
  $(obj).css("background-color", CurrentBrush.type.color);
}

$(window).mousedown(function () {
  IsMouseDown = true;
});

$(window).mouseup(function () {
  IsMouseDown = false;
});