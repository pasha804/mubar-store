import cv2
import numpy as np
from PIL import Image

im = Image.open(r'e:/sopify/scripts/watch5_real_cutout.png').convert('RGBA')
w, h = im.size
arr = np.array(im)
alpha = arr[:, :, 3]

# Remove fingers:
# 1. Left side fingers:
# Below y=200, if x < 135 -> alpha = 0
for y in range(h):
    for x in range(w):
        # Top background stray
        if y < 110:
            alpha[y, x] = 0
        # Left finger at top (y=110..220, x < 120)
        elif y < 220 and x < 110:
            alpha[y, x] = 0
        # Left thumb (y=230..650, x < 70)
        elif 220 <= y <= 650 and x < 75:
            alpha[y, x] = 0
        # Bottom left fingers (y > 650, x < 165)
        elif y > 650 and x < 165:
            alpha[y, x] = 0
        # Right finger (y > 540, x > 410)
        elif y > 540 and x > 410:
            alpha[y, x] = 0
        # Right side above crown (y < 350, x > 420)
        elif y < 350 and x > 425:
            alpha[y, x] = 0
        # Right side below crown (y > 450 and y <= 540, x > 425)
        elif 450 < y <= 540 and x > 425:
            alpha[y, x] = 0

arr[:, :, 3] = alpha
cleaned = Image.fromarray(arr)
bbox = cleaned.getbbox()
if bbox:
    cleaned = cleaned.crop(bbox)

cleaned.save(r'e:/sopify/scripts/watch5_clean_cutout.png')
print('Saved watch5_clean_cutout.png, size:', cleaned.size)
