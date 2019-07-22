// Code from https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android

let isReadyToListenToTouch = true;

function setTouchEvents() {
  document.addEventListener('touchstart', handleTouchStart, false);

  function getTouches(evt) {
    return evt.touches ||             // browser API
      evt.originalEvent.touches; // jQuery
  }

  function handleTouchStart(evt) {
    if(isReadyToListenToTouch) {
      isReadyToListenToTouch = false;
      const firstTouch = getTouches(evt)[0];
      let xDown = firstTouch.clientX;
      let yDown = firstTouch.clientY;

      let direction = determineDirectionByTouch(xDown, yDown);

      if (isPossibleMovement(direction)) {
        move(direction);
      }

      if (playerCurrentPointY === gameEndPointY && playerCurrentPointX === gameEndPointX) {
        setTimeout(() => onWin());
        return;
      }
      isReadyToListenToTouch = true;
    }
  }

  function determineDirectionByTouch(touchX, touchY) {
    let clientHeight = document.getElementsByTagName('html')[0].clientHeight;
    let clientWidth = document.getElementsByTagName('html')[0].clientWidth;

    let distanceFromTop = touchY;
    let distanceFromRight = clientWidth - touchX;
    let distanceFromBottom = clientHeight - touchY;
    let distanceFromLeft = touchX;

    let minValue = Math.min(...[distanceFromTop, distanceFromBottom,
                                    distanceFromLeft, distanceFromRight]);

    switch (minValue) {
      case distanceFromTop: {
        return DIRECTIONS.top
      }
      case distanceFromLeft: {
        return DIRECTIONS.left
      }
      case distanceFromRight: {
        return DIRECTIONS.right
      }
      case distanceFromBottom: {
        return DIRECTIONS.bottom
      }
    }
  }
}

function resetTouchEvents() {
  document.ontouchstart = function empty() {}
}
