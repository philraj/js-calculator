var $ = document.querySelector.bind(document);
var $all = document.querySelectorAll.bind(document);
var displayingResult = false;

// set up event handlers
window.onload = function () {
  var buttons = $all('button');

  for (var i = 0; i < buttons.length; i++) {
    // equals button needs special behavior, so skip it
    if (buttons[i].value === '=') continue;

    buttons[i].addEventListener('click', handleClick);
  }

  $('#equals').addEventListener('click', handleEquals);

  window.addEventListener('keyup', handleKey);
}



function handleClick (e) {
  updateDisplay(e.target.value);
}



function updateDisplay (char) {
  if (displayingResult) {
    // if a result is on the display, replace the text
    $('.display').textContent = char;
    displayingResult = false;
  }
  else {
    // otherwise, append to the text
    $('.display').textContent += char;
  }
}



function handleEquals () {
  // reset display when pressing equals a second time
  if (displayingResult) {
    $('.display').textContent = '';
    return;
  }

  var expression = $('.display').textContent;

  try {
    $('.display').textContent = startParsing(expression);
    displayingResult = true;
  }
  catch (e) {
    $('.display').textContent = e.toString();
    displayingResult = true;
  }
}



function handleKey (e) {
  if (e.shiftKey) {
    switch (e.keyCode) {
      case 56: // "*"
        updateDisplay('*');
        break;
      case 57: // "("
        updateDisplay('(');
        break;
      case 48: // ")"
        updateDisplay(')');
        break;
      case 187: // "+"
        updateDisplay('+');
        break;
    }
  }
  else {
    if (e.keyCode >= 48 && e.keyCode <= 57) {
      var num = String.fromCharCode(e.keyCode);
      updateDisplay(num);
    }
    else {
      switch (e.keyCode) {
        case 13: // "enter"
          handleEquals();
          break;
        case 187: // "+"
          updateDisplay('+');
          break;
        case 189: // "-"
          updateDisplay('-');
          break;
        case 191: // "/"
          updateDisplay('/');
          break;
      }
    }
  }
}
