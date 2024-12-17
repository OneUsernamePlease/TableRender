# intro

The goal of this project is to display various stuff in a browser using only a html table.
The idea was born out of desperation, because I did not know how to draw simple objects in almost any language (like: display a circle).
So why not build something, where i can draw simple objects (and hopefully, at some point do more) myself, from things that i know of.
Those things are: - HTML table (deliberately not a canvas, that would be cheating)
That being said, it is completely pointless, other than being an opportunity to learn and a coding challenge.

what can it do?
- display files
  - supported filetypes are: bitmap
    and a json "file" "encoding", which is how the table is saved and stored and "encoded" when you save it
- generate a simple table to draw
  - of a specified size
- save your drawings
  - save the table (to json)
    - atm only one "encoding format" exists, which just stores every single pixel, zero compression, barely an encoding
- draw-tools
  - color the entire table
  - draw - like the ms paint 'pen' - click and drag to draw

( 
  in case you browse the commit history and have no sense of humor, or don't have the love for malapropisms that i do:
  Feet = Feat
  i think that's pretty funny
)

# documentation
main:
handles the html doc, all the variables, events, read inputs,...
it also "combines/connects" data and render, to work as i intended (sometimes)

pixel: contains only information about color

tableData:
contains a pixel[][], which is to be drawn by the renderer
contains methods for manipulating its pixels

tableRender:
main purpose is to draw tableData's pixel[][], use draw(tableData) to do that. 
contains methods pertaining to drawing (in addition to draw), such as resizing the table.
draws to a table, which is referenced by a property of itself (tableRender).

images:
a class that is supposed to contain all the image handling (parsing, saving to, etc..)

tools:
contains the tools: draw
draw:
  - pen: click and drag to draw

jsfunctions:
(just some functions) A class of static functions that are generally useful all over the place

# TableRender - todos and plans and such

## immediate TODOs
- jsfunctions.normalizecolor -> param needs to be able to account for more formats

- import properly

- drawing should happen on its own layer, which is drawn on top, at the end of a draw-action, the layers are merged
  - needed eg. for drawing lines

-saving
  - saveAs: show dialog before saving
  - saveAs: save as bitmap

- do a css tutorial (and then fix e.g.:)
  - sidebar maxWidth
  - sidebar transition
  - responsive

### next steps

## ACCOMPLISHED FEETS:

display bitmaps (.bmp) --> ok (half ok, as it uses a canvas to get the pixel data)
plain encode --> OK
plain decode --> OK
save file   --> OK
drawing data --> OK
draw w/ pen --> OK

## PLANNED FEETS:

using numbers to encode pixels can maybe improve performance by getting rid of many string ops

compress data before downloading and also expand before displaying

renderer should only change a pixel, if the pixel has to be redrawn (that should be a performance improvement) -> in draw() method

rendering a line in 2d (a function really)

"draw" tool aka "mr. paint" (see ## ideas and thoughts)
 - line, rectangle, circle (ellipse)

allow use of a touchscreen

interfaces (and enums) for imageTypes

moving picture

display some common imgformat
- bmp, gif?

### secondary

GAME OF LIFE

JEST, even though thats not really a foot


## PLANNED REFACTOR:

de-spaghettify EVERYTHING

generalize TableData.fromJson(), to first decode depending on the format

## ideas and thoughts
### 1
drawing: we draw on a new, independent tableData and render it on top of the current data. mouseup -> combine both datas and clear the "inputdata"
this is important for drawing lines, whenever the slope changes, we need to redraw the entire line, and this way we clear the inputdata and draw a new line from the
 startpoint to the currently hover cell.

### 2
i dont like the way drawing works. a tool currently modifies the rendered data and the tableData.


## cheatsheet



