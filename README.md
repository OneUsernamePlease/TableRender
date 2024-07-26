## intro

The goal of this project is, to display various stuff in a browser using only a html table.
The idea was born out of desparation, because I did not (still don't) know how to draw simple objects in almost any language (like: display a circle).
So why not build something, where i can draw simple objects (and hopefully, at some point do more), myself from things that i know of.
Those things are: - HTML table
That being said, it is completely pointless, other than being an opportunity to learn and a coding challenge.

what can it do?
- generate a simple table
  - of a specified size
- save and upload
  - save the table (to json)
  - atm only only "encoding format" exists, which does not actually encode but just store every single pixel
  - display an "uploaded" file (from json, the aforementioned format)
- draw-tools
  - color the entire table
  - draw (set the color) of a pixel by clicking on it

## documentation

pixel: contains only information about color

tableData:
contains a pixel[][], which is to be drawn by the renderer
can encode to, and load from json

tableRender:
main purpose is to draw tableData.pixel[][], use draw(tableData) to do that. 
draws to a table that is a property of tableRender (this).
contains methods pertaining to drawing, such as resizing the table.

main:
handles the html doc, all the variables, events, read inputs,...
it also "combines/connects" data and render, to work as i imagined (sometimes)

## TableRender - todos and plans and such

## ACCOMPLISHED FEETS:
plain encode --> OK
plain decode --> OK
save file   --> OK
drawing data --> OK

## PLANNED FEETS:
renderer should only change a pixel, if the pixel has to be redrawn (that should be a performance improvement)

rendering a line in 2d (a function really)

"draw" tool aka "mr. paint"

GAME OF LIFE

interfaces (and enums) for imageTypes

JEST, even though thats not really a foot

moving picture

## PLANNED REFACTOR:
generalize TableData.fromJson(), to first decode depending on the format

enforceInputNumber() in a keydown event

## cheatsheet
# "while mousedown inside table" 
{
var table = document.getElementById('game-table');
var tableEntry = table.getElementsByTagName('td');
var isToggling = false;

function enableToggle(e) {
  console.log('enableToggle')
  isToggling = true;

  if (e.target !== table) {
    toggle(e);
  }
}

function disableToggle() {
  console.log('disableToggle')
  isToggling = false;
}

function toggle(e) {
  if (isToggling === false) {
    return;
  }

  console.log('toggle:', e.target);

  e.target.classList.toggle('active');
}

function startGame() {
  table.onmousedown = enableToggle;

  for (var i = 0, il = tableEntry.length; i < il; i++) {
    tableEntry[i].onmouseenter = toggle; //changes color 
  }

  table.onmouseup = disableToggle;
}

startGame();
}
# 




