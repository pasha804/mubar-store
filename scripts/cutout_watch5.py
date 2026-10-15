import cv2
import numpy as np
from PIL import Image

src_path = r'e:/sopify/images/all-watches/watch 5/WhatsApp Image 2026-10-15 at 9.07.19 AM.jpeg'
img = cv2.imread(src_path)
h, w = img.shape[:2]

# Bounding box of watch:
# x: 260 to 820
# y: 230 to 1220
rect = (260, 230, 820 - 260, 1220 - 230)

mask = np.zeros((h, w), np.uint8)
bgdModel = np.zeros((1, 65), np.float64)
fgdModel = np.zeros((1, 65), np.float64)

cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)

# Dial and watch core are definitely foreground
# Circle at center (540, 560), radius 220
cv2.circle(mask, (540, 560), 220, cv2.GC_FGD, -1)

# Hand/skin pixels outside watch: top-left, bottom-left, top-right, bottom-right
# Mark definite background
mask[:200, :] = cv2.GC_BGD
mask[1250:, :] = cv2.GC_BGD
mask[:, :240] = cv2.GC_BGD
mask[:, 840:] = cv2.GC_BGD

cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 3, cv2.GC_INIT_WITH_MASK)

mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
out = img * mask2[:, :, np.newaxis]

# Add alpha
b, g, r = cv2.split(out)
alpha = (mask2 * 255).astype('uint8')
rgba = cv2.merge([r, g, b, alpha])

pil_img = Image.fromarray(rgba)
bbox = pil_img.getbbox()
if bbox:
    pil_img = pil_img.crop(bbox)

out_cutout = r'e:/sopify/scripts/watch5_real_cutout.png'
pil_img.save(out_cutout)
print('Saved watch5_real_cutout.png, size:', pil_img.size)
