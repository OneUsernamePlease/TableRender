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
