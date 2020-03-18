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

var IsMouseDown = false;
var CurrentBrushType = BRUSH_TYPES["None"];

// --- Functions ---

$(function () {
  console.log("Ready!");

  AddBrushes();

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
      "class": "brush",
      "onClick": "OnBrushClicked(this)",
      css: {
        color: BRUSH_TYPES[key].textcolor,
        backgroundColor: BRUSH_TYPES[key].color
      }
    });
    $("#brushes").append(brush);
  }
}

function OnBrushClicked(obj) {
  // var brushType = BrushTypes[$(brush).text()];
  // console.log(brushType);
  SetBrush(obj);
}

$(window).mousedown(function () {
  IsMouseDown = true;
});

$(window).mouseup(function () {
  IsMouseDown = false;
});


function SpawnCells() {
  for (x = 0; x < W_CELLS; x++) {
    for (y = 0; y < H_CELLS; y++) {
      var cell = $("<div>", {
        "class": "cell",
        "onMouseEnter": `OnCellClicked(this, ${x}, ${y})`,
        css: {
          left: (CELL_SIZE * x) + "px",
          top: (CELL_SIZE * y) + "px"
        }
      });
      $("#grid").append(cell);
    }
  }
}

function OnCellClicked(obj, x, y) {
  // console.log(cell);
  // console.log(x + " " + y);
  if (IsMouseDown === true) {
    $(obj).css("background-color", "red");
  }
}

function SetBrush(brushType) {
  console.log(brushType);
}