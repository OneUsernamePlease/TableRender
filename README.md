# TableRender - todos and plans and such

# ACCOMPLISHED FEETS:
plain encode --> OK
plain decode --> OK
save file   --> OK
drawing data --> OK

# PLANNED FEETS:
add an additional 2d array to tableData, to keep track of whether a pixel changed its value (and should be redrawn by the renderer)
draw a border around data (in order to see size, should outer pixels match the background)

rendering a line in 2d

"draw" tool

GAME OF LIFE

# PLANNED REFACTORS
use actual get and set, not the functions I used

modules???

generalize TableData.fromJson(), to first decode depending on the format. possibly need to 

Pixel.color as number

############
## documentation
############
(yeah, right)


pixel: contains only information about color

tableData:
contains a pixel[][], which is to be drawn by the renderer
can encode to, and load from json
has a hardcoded max size of 2000*2000


tableRender:
main purpose is to draw tableData.pixel[][], use draw(tableData) to do that. 
draws to a table that is a property of tableRender (this).
contains methods pertaining to drawing, such as resizing the table.


