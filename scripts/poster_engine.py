import os
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def cutout_watch(im_path):
    """Cut out watch on white background using floodfill and crop to tight bbox."""
    im = Image.open(im_path).convert('RGBA')
    if im_path.lower().endswith('.png'):
        bbox = im.getbbox()
        if bbox:
            im = im.crop(bbox)
        return im

    w, h = im.size
    gray = im.convert('L')
    binary = gray.point(lambda p: 255 if p > 240 else 0)
    for corner in [(0, 0), (w-1, 0), (0, h-1), (w-1, h-1)]:
        ImageDraw.floodfill(binary, corner, 128, thresh=20)
    alpha = binary.point(lambda p: 0 if p == 128 else 255)
    im.putalpha(alpha)
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    return im

def draw_pill(draw, x, y, w, h, text, font, bg_color, text_color=(255, 255, 255)):
    """Draw a rounded badge pill with centered text."""
    r = h // 2
    draw.rounded_rectangle([x, y, x + w, y + h], radius=r, fill=bg_color)
    tb = font.getbbox(text)
    tw = tb[2] - tb[0]
    th = tb[3] - tb[1]
    tx = x + (w - tw) // 2
    ty = y + (h - th) // 2 - 1
    draw.text((tx, ty), text, fill=text_color, font=font)

def inpaint_price_brush(canvas_cv2):
    """Inpaint old price numbers using OpenCV Telea algorithm on the authentic green brush."""
    crop = canvas_cv2[415:495, 20:325]
    hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)
    green_mask = cv2.inRange(hsv, np.array([35, 70, 40]), np.array([85, 255, 255]))
    text_mask = cv2.bitwise_not(green_mask)
    text_mask[:, :10] = 0
    text_mask[:, 290:] = 0
    text_mask[:4, :] = 0
    text_mask[72:, :] = 0
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
    dilated = cv2.dilate(text_mask, kernel, iterations=1)
    inpainted = cv2.inpaint(crop, dilated, 7, cv2.INPAINT_TELEA)
    canvas_cv2[415:495, 20:325] = inpainted
    return canvas_cv2

def build_poster(config):
    print(f"Building poster: {config['name']}...")
    master_path = r'e:/sopify/images/all-watches/watch 2/poster_watch2_yolako.jpg'
    poster_cv2 = cv2.imread(master_path)
    
    # Inpaint price brush if price is different from 2499
    if config['price'] != 2499:
        poster_cv2 = inpaint_price_brush(poster_cv2)

    # Convert to PIL RGBA
    poster_rgb = cv2.cvtColor(poster_cv2, cv2.COLOR_BGR2RGB)
    canvas = Image.fromarray(poster_rgb).convert('RGBA')
    w, h = canvas.size

    # 1. Clean Left Title Area (x=10..270, y=10..385)
    for y in range(10, 385):
        prog = (y - 10) / 375.0
        r = int(5 * (1 - prog) + 12 * prog)
        g = int(22 * (1 - prog) + 18 * prog)
        b = int(14 * (1 - prog) + 14 * prog)
        for x in range(10, 270):
            canvas.putpixel((x, y), (r, g, b, 255))
    blur_title = canvas.crop((5, 5, 275, 390)).filter(ImageFilter.GaussianBlur(6))
    canvas.paste(blur_title, (5, 5))

    # 2. Clean Hero Watch Area (x=210..525, y=25..465)
    for y in range(25, 465):
        prog = (y - 25) / 440.0
        r = int(6 * (1 - prog) + 12 * prog)
        g = int(24 * (1 - prog) + 18 * prog)
        b = int(16 * (1 - prog) + 14 * prog)
        for x in range(210, 525):
            canvas.putpixel((x, y), (r, g, b, 255))
    blur_hero = canvas.crop((205, 20, 530, 470)).filter(ImageFilter.GaussianBlur(10))
    canvas.paste(blur_hero, (205, 20))

    # 3. Clean Right Feature Text Area (x=570..682, y=135..465)
    for y in range(135, 465):
        prog = (y - 135) / 330.0
        r = int(6 * (1 - prog) + 10 * prog)
        g = int(20 * (1 - prog) + 14 * prog)
        b = int(14 * (1 - prog) + 10 * prog)
        for x in range(570, 682):
            canvas.putpixel((x, y), (r, g, b, 255))
    blur_feat = canvas.crop((565, 130, 682, 470)).filter(ImageFilter.GaussianBlur(3))
    canvas.paste(blur_feat, (565, 130))

    # 4. Clean Swatches Area (Preserving price brush tail at x=275..325)
    for y in range(465, 645):
        start_x = 330 if y < 500 else 275
        prog = (y - 465) / 180.0
        r = int(14 * (1 - prog) + 6 * prog)
        g = int(22 * (1 - prog) + 10 * prog)
        b = int(18 * (1 - prog) + 8 * prog)
        for x in range(start_x, 682):
            canvas.putpixel((x, y), (r, g, b, 255))
    blur_sw = canvas.crop((270, 460, 682, 645)).filter(ImageFilter.GaussianBlur(3))
    canvas.paste(blur_sw, (270, 460))

    # 5. Clean 4 Zoom Cards Area (x=0..682, y=648..832)
    for y in range(648, 832):
        for x in range(0, 682):
            canvas.putpixel((x, y), (5, 10, 8, 255))

    draw_canvas = ImageDraw.Draw(canvas)

    # A. Draw Title & Branding
    font_brand = ImageFont.truetype('impact.ttf', 28)
    font_tag = ImageFont.truetype('arialbd.ttf', 10)
    font_main1 = ImageFont.truetype('impact.ttf', 28)
    font_main2 = ImageFont.truetype('impact.ttf', 28)
    font_sub = ImageFont.truetype('arialbd.ttf', 10)
    font_bullets = ImageFont.truetype('arialbd.ttf', 11)
    font_script = ImageFont.truetype('segoesc.ttf', 18)

    draw_canvas.text((25, 20), config['brand'], fill=(255, 255, 255), font=font_brand)
    draw_canvas.text((25, 54), config['tagline'], fill=(0, 230, 118), font=font_tag)

    t1 = config['title_line1']
    t2 = config['title_line2']
    draw_canvas.text((25, 82), t1, fill=(255, 255, 255), font=font_main1)
    draw_canvas.text((25, 118), t2, fill=(0, 230, 118), font=font_main2)

    draw_canvas.text((25, 168), config['subtitle'], fill=(200, 220, 215), font=font_sub)
    draw_canvas.text((25, 188), config.get('subtitle2', 'SOLID BUILD | PREMIUM CRAFTSMANSHIP'), fill=(200, 220, 215), font=font_sub)

    draw_canvas.text((25, 226), "CLASSY LOOK  |  MODERN STYLE", fill=(240, 245, 240), font=font_bullets)
    draw_canvas.text((25, 248), "EVERYDAY LUXURY WEAR", fill=(180, 205, 195), font=font_bullets)

    draw_canvas.text((25, 300), "More Than Just", fill=(255, 255, 255), font=font_script)
    draw_canvas.text((45, 330), "a Watch", fill=(255, 255, 255), font=font_script)

    # B. Draw Feature Texts
    features = config['features']
    font_feat_title = ImageFont.truetype('impact.ttf', 13)
    font_feat_sub = ImageFont.truetype('arial.ttf', 10)
    feat_ys = [148, 228, 312, 392]
    for i in range(4):
        fy = feat_ys[i]
        ftitle, fsub = features[i]
        draw_canvas.text((572, fy), ftitle, fill=(255, 255, 255), font=font_feat_title)
        draw_canvas.text((572, fy + 16), fsub, fill=(180, 205, 195), font=font_feat_sub)

    # C. Draw Price in Green Brush Badge if price != 2499
    if config['price'] != 2499:
        price_str = f"Rs. {config['price']:,}"
        font_price = ImageFont.truetype('impact.ttf', 54)
        draw_canvas.text((50, 431), price_str, fill=(0, 55, 20), font=font_price)
        draw_canvas.text((47, 428), price_str, fill=(255, 255, 255), font=font_price)

    # D. Place REAL Hero Watch
    hero_raw = cutout_watch(config['hero_image'])
    target_h = config.get('hero_h', 440)
    target_w = int(hero_raw.width * (target_h / hero_raw.height))
    hero_scaled = hero_raw.resize((target_w, target_h), Image.Resampling.LANCZOS)

    shadow = Image.new('RGBA', (target_w + 60, target_h + 60), (0, 0, 0, 0))
    for x in range(hero_scaled.width):
        for y in range(hero_scaled.height):
            a = hero_scaled.getpixel((x, y))[3]
            if a > 0:
                shadow.putpixel((x + 30, y + 35), (0, 0, 0, int(a * 0.7)))
    shadow = shadow.filter(ImageFilter.GaussianBlur(14))

    hero_center_x = config.get('hero_x', 385)
    hero_center_y = config.get('hero_y', 238)
    hero_x = hero_center_x - target_w // 2
    hero_y = hero_center_y - target_h // 2
    canvas.paste(shadow, (hero_x - 30, hero_y - 30), shadow)
    canvas.paste(hero_scaled, (hero_x, hero_y), hero_scaled)

    # E. Place Middle Swatches
    swatches = config['swatches']
    num_sw = len(swatches)
    sw_h = config.get('sw_h', 120)
    total_area_w = 675 - 280
    sw_spacing = total_area_w // num_sw
    font_sw = ImageFont.truetype('arialbd.ttf', 11)

    for i, sw_info in enumerate(swatches):
        sw_path, sw_label, sw_col = sw_info
        sw_img = cutout_watch(sw_path)
        sw_w = int(sw_img.width * (sw_h / sw_img.height))
        sw_scaled = sw_img.resize((sw_w, sw_h), Image.Resampling.LANCZOS)
        cx = 280 + int((i + 0.5) * sw_spacing)
        cy = 545 - sw_h // 2

        mini_sh = Image.new('RGBA', (sw_w + 10, sw_h + 10), (0, 0, 0, 0))
        for sx in range(sw_w):
            for sy in range(sw_h):
                if sw_scaled.getpixel((sx, sy))[3] > 0:
                    mini_sh.putpixel((sx + 5, sy + 7), (0, 0, 0, 110))
        mini_sh = mini_sh.filter(ImageFilter.GaussianBlur(3))
        canvas.paste(mini_sh, (cx - sw_w // 2 - 5, cy - 5), mini_sh)
        canvas.paste(sw_scaled, (cx - sw_w // 2, cy), sw_scaled)

        pill_w = max(44, int(font_sw.getbbox(sw_label)[2] - font_sw.getbbox(sw_label)[0]) + 12)
        draw_pill(draw_canvas, cx - pill_w // 2, cy + sw_h + 4, pill_w, 18, sw_label, font_sw, sw_col)

    # F. Draw 4 Real Zoom Cards
    cards = config['zoom_cards']
    font_card_title = ImageFont.truetype('impact.ttf', 14)
    font_card_sub = ImageFont.truetype('arial.ttf', 10)

    card_coords = [
        (4, 650, 170, 785),
        (174, 650, 340, 785),
        (344, 650, 510, 785),
        (514, 650, 678, 785)
    ]

    for i in range(4):
        cx1, cy1, cx2, cy2 = card_coords[i]
        card_w = cx2 - cx1
        card_h = cy2 - cy1
        c_src, c_box, c_title, c_sub = cards[i]

        src_im = Image.open(c_src).convert('RGB')
        macro_crop = src_im.crop(c_box).resize((card_w, card_h), Image.Resampling.LANCZOS)
        canvas.paste(macro_crop, (cx1, cy1))

        draw_canvas.rectangle([cx1, cy1, cx2, cy2], outline=(0, 230, 118), width=2)
        draw_canvas.rectangle([cx1, cy2 + 2, cx2, cy2 + 42], fill=(5, 10, 8))
        draw_canvas.line([(cx1, cy2 + 2), (cx2, cy2 + 2)], fill=(0, 200, 100), width=1)

        tw = font_card_title.getbbox(c_title)[2] - font_card_title.getbbox(c_title)[0]
        tx = cx1 + (card_w - tw) // 2
        draw_canvas.text((tx, cy2 + 6), c_title, fill=(255, 255, 255), font=font_card_title)

        sw = font_card_sub.getbbox(c_sub)[2] - font_card_sub.getbbox(c_sub)[0]
        sx = cx1 + (card_w - sw) // 2
        draw_canvas.text((sx, cy2 + 23), c_sub, fill=(180, 205, 195), font=font_card_sub)

    # Save outputs
    os.makedirs(os.path.dirname(config['out_public']), exist_ok=True)
    os.makedirs(os.path.dirname(config['out_watch']), exist_ok=True)

    rgb_final = canvas.convert('RGB')
    rgb_final.save(config['out_public'], quality=95)
    rgb_final.save(config['out_watch'], quality=95)

    art_path = os.path.join(r'C:/Users/USER/.gemini/antigravity-ide/brain/2030ea7d-0db4-420b-ac47-4418e413ab02', os.path.basename(config['out_public']))
    rgb_final.save(art_path, quality=95)
    print(f"Successfully generated {config['name']} -> {config['out_public']}")
    return art_path

print("Perfected poster_engine with OpenCV Telea inpainting ready")
