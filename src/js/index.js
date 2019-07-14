function init() {
  let colsCount = document.getElementById('canvas-column').value;
  let rowsCount = document.getElementById('canvas-row').value;

  drawMaze(colsCount, rowsCount)
}

function onRerender() {
  stop = true;
  removeSpeedInput();
  removePlayButton();
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
  removePlayButton();
  generateMaze(false);

  if(!document.getElementById('speed')) {
    addSpeedInput();
  }
}

function onFastGenerate() {
  removeSpeedInput();
  removePlayButton();
  generateMaze(true);
}

function addGenerateButtons() {
  let generateButton = document.createElement("button");
  let fastGenerateButton = document.createElement("button");

  const parentForGenerate = document.getElementsByClassName('generate-div')[0];
  const parentForFastGenerate = document.getElementsByClassName('fast-generate-div')[0];

  generateButton.innerText = 'Generate';
  generateButton.id = 'generate-button';
  generateButton.addEventListener("click", onGenerate)
  parentForGenerate.appendChild(generateButton);

  fastGenerateButton.innerText = 'Fast Generate';
  fastGenerateButton.id = 'fast-generate-button';
  fastGenerateButton.addEventListener("click", onFastGenerate)
  parentForFastGenerate.appendChild(fastGenerateButton);
}

function addSpeedInput() {
  const speedInput = document.createElement('input');
  const label = document.createElement('label');

  label.innerText = 'Speed';
  label.id = 'speed-input-label';

  speedInput.type = 'number';
  speedInput.id = 'speed';
  speedInput.value = '1';
  speedInput.min = '1';
  speedInput.max = '20';
  speedInput.addEventListener('change', (event) => {
    let value = +event.currentTarget.value;

    if(value < 1) {
      value = 1;
    } else if(value > 20) {
      value = 10;
    }

    generation_speed = 5000 / (10 * value);
  });

  const parent = document.getElementsByClassName('generate-div')[0];

  parent.appendChild(label);
  parent.appendChild(speedInput);
}

function removeSpeedInput() {
  if(document.getElementById('speed')) {
    const speedInput = document.getElementById('speed');
    speedInput.parentNode.removeChild(speedInput);

    const speedInputLabel = document.getElementById('speed-input-label');
    speedInputLabel.parentNode.removeChild(speedInputLabel);
  }
}

function addPlayButton() {
  if(!document.getElementById('play') && done) {
    const button = document.createElement('button');

    button.innerText = 'Solve It';
    button.id = 'play';
    document.getElementsByClassName('play-div')[0].appendChild( button);
  }
}

function removePlayButton() {
  if(document.getElementById('play')) {
    const playButton = document.getElementById('play');

    playButton.parentNode.removeChild(playButton);
  }
}
