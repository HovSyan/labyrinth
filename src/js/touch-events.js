// Code from https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android

function setTouchEvents() {
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);

  let xDown = null;
  let yDown = null;

  function getTouches(evt) {
    return evt.touches ||             // browser API
      evt.originalEvent.touches; // jQuery
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
      if ( xDiff > 0 && isPossibleMovement(DIRECTIONS.left)) {
        move(DIRECTIONS.left);
      } else if(isPossibleMovement(DIRECTIONS.right)) {
        move(DIRECTIONS.right);
      }
    } else {
      if ( yDiff > 0 && isPossibleMovement(DIRECTIONS.top)) {
        move(DIRECTIONS.top);
      } else if(isPossibleMovement(DIRECTIONS.bottom)) {
        move(DIRECTIONS.bottom);
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }
}

function resetTouchEvents() {
  document.ontouchstart = function empty() {}
  document.ontouchend = function empty() {}
}
