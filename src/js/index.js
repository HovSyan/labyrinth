function init() {
  let colsCount = document.getElementById('canvas-column').value;
  let rowsCount = document.getElementById('canvas-row').value;

  drawMaze(colsCount, rowsCount)
}

function onRerender() {
  document.getElementById('start-button').innerText = 'Rerender';

  let colsCount = document.getElementById('canvas-column').value;
  let rowsCount = document.getElementById('canvas-row').value;

  drawMaze(colsCount, rowsCount)
}