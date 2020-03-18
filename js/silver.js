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
  SetBrush(BRUSH_TYPES["None"]);

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
      "class": ["brush", key.toLowerCase()],
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

// --- Events ---

function OnBrushClicked(obj) {
  var brushType = BRUSH_TYPES[$(obj).text()];
  // console.log(brushType);
  SetBrush(brushType);
}

function OnCellClickWhileDragging(obj, x, y) {
  if (IsMouseDown === true) {
    OnCellClicked(obj, x, y)
  }
}

function OnCellClicked(obj, x, y) {
  $(obj).css("background-color", CurrentBrushType.color);
}

function SetBrush(brushType) {
  console.log(brushType);
  CurrentBrushType = brushType;
}

$(window).mousedown(function () {
  IsMouseDown = true;
});

$(window).mouseup(function () {
  IsMouseDown = false;
});