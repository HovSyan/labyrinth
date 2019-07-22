function preparationForPlaying() {
  removeUnnecessaryButtons();
  addStopButton();
}

function doPlay() {
  playerCurrentPointX = floor(Math.random() * grid[0].length);
  playerCurrentPointY = 0;

  gameEndPointX = floor(Math.random() * grid[0].length);
  gameEndPointY = grid.length - 1;

  grid[playerCurrentPointY][playerCurrentPointX].setIsPlayerCurrentCell(true);
  grid[gameEndPointY][gameEndPointX].setIsEndCell(true);

  loop();

  isInGameMode = true;

  document.onkeydown = function(e) {
    if((e.key === 'w' || e.key === 'ArrowUp') && isPossibleMovement(DIRECTIONS.top)) {
      move(DIRECTIONS.top);
    } else if((e.key === 'd' || e.key === 'ArrowRight') && isPossibleMovement(DIRECTIONS.right)) {
      move(DIRECTIONS.right);
    } else if((e.key === 's' || e.key === 'ArrowDown') && isPossibleMovement(DIRECTIONS.bottom)) {
      move(DIRECTIONS.bottom);
    } else if((e.key === 'a' || e.key === 'ArrowLeft') && isPossibleMovement(DIRECTIONS.left)) {
      move(DIRECTIONS.left);
    }

    if(playerCurrentPointY === gameEndPointY && playerCurrentPointX === gameEndPointX) {
      setTimeout(() => onWin());
      return;
    }
  };

  setTouchEvents();
}

function removeUnnecessaryButtons() {
  document.getElementsByClassName('pannel-bar')[0].style.display = 'none';
}

function addStopButton() {
  const button = document.createElement('button');

  button.innerText = 'Exit';
  button.id = 'stop';

  document.getElementsByClassName('on-play')[0].appendChild(button);
  button.addEventListener('click', stopPlaying)
}

function stopPlaying() {
  if(document.getElementById('stop')) {
    const button = document.getElementById('stop');

    button.parentNode.removeChild(button);
  }

  isInGameMode = false;
  document.getElementsByClassName('pannel-bar')[0].style.display = 'block';
  document.onkeydown = function empty() {};
  resetTouchEvents();
  onRerender();
}

function isPossibleMovement(direction) {
  let j = playerCurrentPointX;
  let i = playerCurrentPointY;

  switch (direction) {
    case DIRECTIONS.top: {
      return i > 0 && !grid[i][j].borders.top;
    }
    case DIRECTIONS.right: {
      return j < grid[i].length - 1 && !grid[i][j].borders.right;
    }
    case DIRECTIONS.bottom: {
      return i < grid.length - 1 && !grid[i][j].borders.bottom;
    }
    case DIRECTIONS.left: {
      return j > 0 && !grid[i][j].borders.left;
    }
  }
}

function move(direction) {
  grid[playerCurrentPointY][playerCurrentPointX].setIsPlayerCurrentCell(false);

  switch (direction) {
    case DIRECTIONS.top: {
      playerCurrentPointY--;
      break;
    }
    case DIRECTIONS.right: {
      playerCurrentPointX++;
      break;
    }
    case  DIRECTIONS.bottom: {
      playerCurrentPointY++;
      break;
    }
    case DIRECTIONS.left: {
      playerCurrentPointX--;
      break;
    }
  }

  grid[playerCurrentPointY][playerCurrentPointX].setIsPlayerCurrentCell(true);
  loop();
}

function onWin() {
  alert('You Win', stopPlaying());
}
