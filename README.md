# TableRender - todos and plans and such

plain encode --> OK
plain decode --> OK
save file   --> OK

drawing data --> OK

draw a border around data (in order to see size, should outer pixels match the background)

rendering a line in 2d

"draw" tool


############
## documentation
############
yeah, right


pixel: contains only information about color

tableData:
contains a pixel[][], which is to be drawn by the renderer
can encode to, and load from json
atm, 


tableRender:
main purpose is to draw tableData.pixel[][], use draw(tableData) to do that. 
draws to a table that is a property of tableRender (this).
contains methods pertaining to drawing, such as resizing the table.


