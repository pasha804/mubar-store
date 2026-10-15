import cv2
import numpy as np
from PIL import Image

src_path = r'e:/sopify/public/images/all-watches/watch 5/01_gold_front_studio.jpg'
img = cv2.imread(src_path)
h, w = img.shape[:2]

# Bounding box of entire watch with strap:
# x: 75 to 955
# y: 160 to 765
rect = (75, 160, 955 - 75, 765 - 160)

mask = np.zeros((h, w), np.uint8)
bgdModel = np.zeros((1, 65), np.float64)
fgdModel = np.zeros((1, 65), np.float64)

cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)

# Dial and watch core are definitely foreground
# Circle at center (490, 480), radius 270
cv2.circle(mask, (490, 480), 270, cv2.GC_FGD, -1)

# Left rubber strap: x=80..220, y=330..600
cv2.rectangle(mask, (80, 330), (220, 600), cv2.GC_FGD, -1)
# Right rubber strap: x=710..950, y=360..610
cv2.rectangle(mask, (710, 360), (950, 610), cv2.GC_FGD, -1)

# Definite background (slate at bottom, top empty space)
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

pil_img = Image.fromarray(rgba)
bbox = pil_img.getbbox()
if bbox:
    pil_img = pil_img.crop(bbox)

out_cutout = r'e:/sopify/scripts/watch5_studio_cutout.png'
pil_img.save(out_cutout)
print('Saved watch5_studio_cutout.png with strap, size:', pil_img.size)
