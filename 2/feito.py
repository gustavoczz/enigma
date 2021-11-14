from PIL import Image

# [2^0, 2^0, 2^0, 2^0, 2^0, 2^0, 2^0, 2^0, 2^0, 2^0, 2^0, ...]

# xxx apha xxx

awnser_length = 320

mes = []

input_image = Image.open("final2.png") 
width, height = input_image.size 

for j in range(height): 
    for i in range(width): 
        r, g, b = input_image.getpixel((i, j)) 
        
        rb = "{0:b}".format(r).zfill(8)
        gb = "{0:b}".format(g).zfill(8)
        bb = "{0:b}".format(b).zfill(8)

        mes.append(rb[-1:])
        mes.append(gb[-1:])
        mes.append(bb[-1:])

print(mes[:320])
a = "".join(mes[:320])
res = ' '.join(a[i:i + 8] for i in range(0, len(mes), 8))