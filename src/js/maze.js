const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 600;

let stop = false;
let done = false;

let generation_speed = 500;

let isInFastGenerateMode = false;

let playerCurrentPointX;
let playerCurrentPointY;

let gameEndPointX;
let gameEndPointY;

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

  let cellHeight = CANVAS_HEIGHT / m;
  let cellWidth = CANVAS_WIDTH / n;

  grid.length = 0;

  let cells;
  for(let i = 0; i < m; i++) {
    cells = [];
    for(let j = 0; j < n; j++) {
      cells.push(new Cell(cellWidth, cellHeight, j, i));
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

  if(!isInFastGenerateMode && cell.isFixed) {
    fill('black');
    stroke('black');
    rect(x + 1, y + 1, cell.w - 1, cell.h - 1);
  } else if(!isInFastGenerateMode && cell.isVisited) {
    fill('#682e07');
    stroke('#682e07');
    rect(x, y, cell.w, cell.h);
  }

  if(cell.isEndCell) {
    fill('#c7ab7b');
    stroke('#c7ab7b');
    ellipse(x + cell.w / 2, y + cell.h / 2, cell.w, cell.h);
  }

  if(cell.isPlayerCurrentCell) {
    fill('#7b98c7');
    stroke('#7b98c7');
    ellipse(x + cell.w / 2, y + cell.h / 2, cell.w, cell.h);
  }
}

async function generateMaze(isFastGenerateMode) {
  done = false;
  stop = false;
  isInFastGenerateMode = isFastGenerateMode;

  let rowCount = grid.length;
  let colCount = grid[0].length;

  let i = floor(Math.random() * rowCount);
  let j = floor(Math.random() * colCount);

  let visitedCellsStack = [];

  visitedCellsStack.push(grid[i][j]);

  while(visitedCellsStack.length > 0) {
    if(stop) {
      stop = false;
      return;
    }

    if(!isInFastGenerateMode) {
      await new Promise((resolve, reject) => {
        loop();
        setTimeout(() => { resolve() }, generation_speed);
      })
    }

    const currentCell = visitedCellsStack[visitedCellsStack.length - 1];

    currentCell.isVisited = true;

    if(areAllNeighbourCellsVisited(currentCell)) {
      currentCell.isFixed = true;
      visitedCellsStack.pop();
      continue;
    }

    let direction = getDirectionToNotVisitedCell(currentCell);

    switch (direction) {
      case DIRECTIONS.top: {
        currentCell.borders.top = false;
        grid[currentCell.y - 1][currentCell.x].borders.bottom = false;
        visitedCellsStack.push(grid[currentCell.y - 1][currentCell.x]);
        break;
      }
      case DIRECTIONS.right: {
        currentCell.borders.right= false;
        grid[currentCell.y][currentCell.x + 1].borders.left = false;
        visitedCellsStack.push(grid[currentCell.y][currentCell.x + 1]);
        break;
      }
      case DIRECTIONS.bottom: {
        currentCell.borders.bottom = false;
        grid[currentCell.y + 1][currentCell.x].borders.top = false;
        visitedCellsStack.push(grid[currentCell.y + 1][currentCell.x]);
        break;
      }
      case DIRECTIONS.left: {
        currentCell.borders.left = false;
        grid[currentCell.y][currentCell.x - 1].borders.right = false;
        visitedCellsStack.push(grid[currentCell.y][currentCell.x - 1]);
        break;
      }
    }
  }

  loop();
  isInFastGenerateMode = true;
  loop();
  done = true;
  addPlayButton();
}

function areAllNeighbourCellsVisited(cell) {
  let x = cell.x;
  let y = cell.y;

  if(x > 0 && !grid[y][x - 1].isVisited) {
    return false;
  }

  if(x < grid[0].length - 1 && !grid[y][x + 1].isVisited) {
    return false;
  }

  if(y > 0 && !grid[y - 1][x].isVisited) {
    return false;
  }

  return !(y < grid.length - 1 && !grid[y + 1][x].isVisited);


}

function getDirectionToNotVisitedCell(cell) {
  let direction;
  let isDirectionValid = false;
  let x = cell.x;
  let y = cell.y;

  while(!isDirectionValid) {
    direction = floor(Math.random() * DIRECTIONS.length);

    switch (direction) {
      case DIRECTIONS.top: {
        if(y !== 0 && !grid[y - 1][x].isVisited) {
          isDirectionValid = true;
        }
        break;
      }
      case DIRECTIONS.right: {
        if(x !== grid[0].length - 1 && !grid[y][x + 1].isVisited) {
          isDirectionValid = true;
        }
        break;
      }
      case DIRECTIONS.bottom: {
        if(y !== grid.length - 1 && !grid[y + 1][x].isVisited) {
          isDirectionValid = true;
        }
        break;
      }
      case DIRECTIONS.left: {
        if(x !== 0 && !grid[y][x - 1].isVisited) {
          isDirectionValid = true;
        }
        break;
      }
    }
  }

  return direction;
}
