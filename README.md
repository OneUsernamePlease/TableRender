# intro

The goal of this project is to display various stuff in a browser using only a html table.
The idea was born out of desparation, because I did not know how to draw simple objects in almost any language (like: display a circle).
So why not build something, where i can draw simple objects (and hopefully, at some point do more) myself, from things that i know of.
Those things are: - HTML table
That being said, it is completely pointless, other than being an opportunity to learn and a coding challenge.

what can it do?
- generate a simple table
  - of a specified size
- save and upload
  - save the table (to json)
    - atm only one "encoding format" exists, which just stores every single pixel, zero compression, barely an encoding
  - display an uploaded/input file (from json, the aforementioned format)
- draw-tools
  - color the entire table
  - draw (set the color), like the ms paint 'pen' - click and drag to draw


# documentation

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

tools:
contains the tools: draw
draw:
  - pen: click and drag to draw


# TableRender - todos and plans and such

## immediate TODOs

- when adding cells to table, add to them the eventlisteners required for drawing
- saveAs: show dialog before saving
- do a css tutorial (and then fix e.g.:)
  - sidebar maxwidth
  - sidebar transition
  - responsive

## ACCOMPLISHED FEETS:

plain encode --> OK
plain decode --> OK
save file   --> OK
drawing data --> OK
draw w/ pen --> OK

## PLANNED FEETS:

renderer should only change a pixel, if the pixel has to be redrawn (that should be a performance improvement) -> in draw() method

rendering a line in 2d (a function really)

"draw" tool aka "mr. paint" (see ## ideas and thoughts)
 - line, rectangle, circle (ellipse)

GAME OF LIFE

interfaces (and enums) for imageTypes

JEST, even though thats not really a foot

moving picture

compress data before downloading and also expand before displaying

display some common imgformat
- bmp, gif?

## PLANNED REFACTOR:

de-spaghettify EVERYTHING

eventlisteners for drawing should be managed by tools, not by main. listeners are only needed when drawtools are active and listeners waste resources when the are always active.
add the listeners when drawtools are selected, or initalized (should the tools be turned into a class) and remove them accordingly
the challenge is to add them to cells that have been added due to resizing

generalize TableData.fromJson(), to first decode depending on the format

enforceInputNumber() in a keydown event

## ideas and thoughts
### 1
drawing: we draw on a new, independend tableData and render it on top of the current data. mouseup -> combine both datas and clear the "inputdata"
this is important for drawing lines, whenever the slope changes, we need to redraw the entire line, and this way we clear the inputdata and draw a new line from the
 startpoint to the currently hover cell.

### 2
i dont like the way drawing works. a tool currently modifies the rendered data and the tableData.


## cheatsheet
### "while mousedown inside table" 
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




