#
# Python script to generate code for a 2D zeroed array in Unity 3D's
# Javascript language where each cell represents a 32x32 square 
# and the dimensions of the entire array correspond to a 
# 768x480 rectangle.
#
# This is useful for writing a machine-accessible representation
# of a map.

CELLWIDTH = 32
CELLHEIGHT = 32
MAPWIDTH = 640
MAPHEIGHT = 512

# open our file for writing, overwriting any other array.
fh = open("zeroarray-out.txt", "w");

# Begin writing our array.
fh.write("var mapArr = [ ");

# Get our row.
rowOut = "[ "
for i in range(MAPWIDTH / CELLWIDTH - 1):
	rowOut += "00, "
rowOut += "00 ]"

# To the file!
for i in range(MAPHEIGHT / CELLHEIGHT - 1):
	fh.write(rowOut + ",\n")
fh.write(rowOut + " ];")
