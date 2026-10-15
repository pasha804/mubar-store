import cv2
import numpy as np
from PIL import Image

# 1. Clean up gold cutout
im_gold = Image.open(r'e:/sopify/scripts/watch5_studio_cutout.png').convert('RGBA')
arr = np.array(im_gold)
for y in range(arr.shape[0]):
    for x in range(arr.shape[1]):
        r, g, b, a = arr[y, x]
        # Remove warm brownish background sliver on top-left
        if x < 180 and y < 270 and r > 130 and b < 100:
            arr[y, x, 3] = 0
        # Right background top
        if x > 720 and y < 270 and r < 50 and g < 50 and b < 50:
            # check if strap or background
            pass
cleaned_gold = Image.fromarray(arr)
cleaned_gold.save(r'e:/sopify/public/images/all-watches/watch 5/cutout_gold.png')

# 2. Cutout Silver version
src_silver = r'e:/sopify/public/images/all-watches/watch 5/02_silver_front_studio.jpg'
img = cv2.imread(src_silver)
h, w = img.shape[:2]
rect = (75, 160, 955 - 75, 765 - 160)
mask = np.zeros((h, w), np.uint8)
bgdModel = np.zeros((1, 65), np.float64)
fgdModel = np.zeros((1, 65), np.float64)
cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)
cv2.circle(mask, (490, 480), 270, cv2.GC_FGD, -1)
cv2.rectangle(mask, (80, 330), (220, 600), cv2.GC_FGD, -1)
cv2.rectangle(mask, (710, 360), (950, 610), cv2.GC_FGD, -1)
mask[:150, :] = cv2.GC_BGD
mask[780:, :] = cv2.GC_BGD
mask[:, :70] = cv2.GC_BGD
mask[:, 960:] = cv2.GC_BGD
cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 4, cv2.GC_INIT_WITH_MASK)
mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
out = img * mask2[:, :, np.newaxis]
b, g, r = cv2.split(out)
alpha = (mask2 * 255).astype('uint8')
rgba = cv2.merge([r, g, b, alpha])
pil_silver = Image.fromarray(rgba)
bbox = pil_silver.getbbox()
if bbox:
    pil_silver = pil_silver.crop(bbox)

# Clean warm background slivers
arr_s = np.array(pil_silver)
for y in range(arr_s.shape[0]):
    for x in range(arr_s.shape[1]):
        r, g, b, a = arr_s[y, x]
        if x < 180 and y < 270 and r > 130 and b < 100:
            arr_s[y, x, 3] = 0
cleaned_silver = Image.fromarray(arr_s)
cleaned_silver.save(r'e:/sopify/public/images/all-watches/watch 5/cutout_silver.png')

print('Saved cutout_gold.png and cutout_silver.png successfully!')
