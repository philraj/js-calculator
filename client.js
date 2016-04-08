var $ = document.querySelector.bind(document);
var $all = document.querySelectorAll.bind(document);
var displayingResult = false;


window.onload = function () {
  var buttons = $all('button');

  for (var i = 0; i < buttons.length; i++) {
    // equals button needs special behavior
    if (buttons[i].value === '=') continue;

    buttons[i].addEventListener('click', updateDisplay);
  }

  $('#equals').addEventListener('click', handleEquals);
}



function updateDisplay (e) {
  if (displayingResult) {
    // if a result is on the display, replace the text
    $('.display').textContent = e.target.value;
    displayingResult = false;
  }
  else {
    // otherwise, append to the text
    $('.display').textContent += e.target.value;
  }
}



function handleEquals (e) {
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
