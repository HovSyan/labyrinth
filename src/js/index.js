function init() {
  let colsCount = document.getElementById('canvas-column').value;
  let rowsCount = document.getElementById('canvas-row').value;

  drawMaze(colsCount, rowsCount)
}

function onRerender() {
  document.getElementById('start-button').innerText = 'Rerender';

  if(!document.getElementById('generate-button') &&
     !document.getElementById('fast-generate-button')) {
    addGenerateButtons();
  }

  let colsCount = document.getElementById('canvas-column').value;
  let rowsCount = document.getElementById('canvas-row').value;

  drawMaze(colsCount, rowsCount)
}

function onGenerate() {
  generateMaze(false);
}

function onFastGenerate() {
  generateMaze(true);
}

function addGenerateButtons() {
  let generateButton = document.createElement("button");
  let fastGenerateButton = document.createElement("button");

  const parent = document.getElementById('button-bar');

  generateButton.innerText = 'Generate';
  generateButton.id = 'generate-button';
  generateButton.addEventListener("click", onGenerate)
  parent.appendChild(generateButton);

  fastGenerateButton.innerText = 'Fast Generate';
  fastGenerateButton.id = 'fast-generate-buttton';
  fastGenerateButton.addEventListener("click", onFastGenerate)
  parent.appendChild(fastGenerateButton);
}
