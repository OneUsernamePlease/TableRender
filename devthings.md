
***this file is just how i organize and document progress and todos***

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

## PLANNED FEETS:

parse a bitmap-blob
 //use typed arrays to manipulate binary data
 //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays  
        

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

## ACCOMPLISHED FEETS:

display bitmaps (.bmp) --> ok (half ok, as it uses a canvas to get the pixel data)
plain encode --> OK
plain decode --> OK
save file   --> OK
drawing data --> OK
draw w/ pen --> OK



## PLANNED REFACTOR:

de-spaghettify EVERYTHING

generalize TableData.fromJson(), to first decode depending on the format

### secondary

GAME OF LIFE

JEST, even though thats not really a foot

## ideas and thoughts
### 1
drawing: we draw on a new, independent tableData and render it on top of the current data. mouseup -> combine both datas and clear the "inputdata"
this is important for drawing lines, whenever the slope changes, we need to redraw the entire line, and this way we clear the inputdata and draw a new line from the
 startpoint to the currently hover cell.

### 2
i dont like the way drawing works. a tool currently modifies the rendered data and the tableData.


## cheatsheet



