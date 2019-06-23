const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 600;

let grid = [];

function setup() {
  let canvas = createCanvas(CANVAS_HEIGHT ,CANVAS_WIDTH);
  canvas.parent('maze-container');
}


function draw() {
  background(51);

  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      let x = j * cell.w;
      let y = i * cell.h;
      stroke(255);
      noFill();
      drawCellWalls(cell, x, y);
    });
  });

  noLoop();
}

function drawMaze(colCount, rowCount) {
  n = +colCount;
  m = +rowCount;

  let cellHeight = floor(CANVAS_HEIGHT / m);
  let cellWidth = floor(CANVAS_WIDTH / n);

  grid.length = 0;

  let cells;
  for(let i = 0; i < m; i++) {
    cells = [];
    for(let j = 0; j < n; j++) {
      cells.push(new Cell(cellWidth, cellHeight));
    }
    grid[i] = cells;
  }
  loop();
}

function drawCellWalls(cell, x, y) {
  let cellBorders = cell.borders;

  if(cellBorders.top) {
    line(x, y, x + cell.w, y);
  }

  if(cellBorders.right) {
    line(x + cell.w, y, x + cell.w, y + cell.h);
  }

  if(cellBorders.bottom) {
    line(x + cell.w, y + cell.h, x, y + cell.h);
  }

  if(cellBorders.left) {
    line(x, y + cell.h, x, y);
  }
}