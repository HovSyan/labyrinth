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

  if(cell.isVisited) {
    fill('#682e07');
    rect(x, y, cell.w, cell.h);
  }
}

function generateMaze() {
  let rowCount = grid.length;
  let colCount = grid[0].length;

  let i = floor(Math.random() * rowCount);
  let j = floor(Math.random() * colCount);

  step(i, j);
}

function step(i, j) {
  grid[i][j].isVisited = true;

  let direction = floor(Math.random() * DIRECTIONS.length);
  switch(direction) {
    case 0: {
      if(i > 0 && !grid[i - 1][j].isVisited) {
        i--;
        break;
      }
    }
    case 1: {
      if(j < grid[0].length - 1 && !grid[i][j + 1].isVisited) {
        j++;
        break;
      }
    }
    case 2: {
      if(i < grid.length - 1 && !grid[i + 1][j].isVisited) {
        i++;
        break;
      }
    }
    case 3: {
      if(j > 0 && !grid[i][j - 1].isVisited) {
        j--;
        break;
      }
    }
  }

  loop();

  setTimeout(() => {step(i, j)}, 1000);
}