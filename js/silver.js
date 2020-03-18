const W_CELLS = 19;
const H_CELLS = 11;
const CELL_SIZE = 50;

$(function () {
  console.log("Ready!");

  $("#grid").width(W_CELLS * CELL_SIZE);
  $("#grid").height(H_CELLS * CELL_SIZE);

  SpawnCells();

  $(".cell").css("width", CELL_SIZE + "px");
  $(".cell").css("height", CELL_SIZE + "px");
});

function SpawnCells() {
  for (x = 0; x < W_CELLS; x++) {
    for (y = 0; y < H_CELLS; y++) {
      var cell = $("<div>", {
        "class": "cell",
        "style": "left: " + (CELL_SIZE * x) + "px; top: " + (CELL_SIZE * y) + "px",
        "onClick": "OnCellClicked()"
      });
      $("#grid").append(cell);
    }
  }
}

function OnCellClicked(x, y) {
  console.log(x + " " + y);
}