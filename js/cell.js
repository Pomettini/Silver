var Cell = {};

Cell.Setup = function () {
    for (var x = 0; x < HOR_CELLS; x++) {
        for (var y = 0; y < VER_CELLS; y++) {
            let id = (y * HOR_CELLS) + x;
            var cell = $("<div>", {
                "id": `cell${id}`,
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
};