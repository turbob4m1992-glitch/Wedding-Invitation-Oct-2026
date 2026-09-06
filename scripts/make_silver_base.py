import math
from PIL import Image, ImageDraw, ImageFilter

img = Image.open('/Users/turbo/.gemini/antigravity/brain/b5b83d09-fd89-49ca-9246-ac12fc1b8e9c/wedding_seal_separated_1788713566461.jpg').convert('RGB')
w, h = img.size

# 1. Tile clean wax patch to cover center scribble
pure_wax = img.crop((380, 640, 640, 730))
pw_w, pw_h = pure_wax.size

wax_full = Image.new('RGB', (w, h))
for ty in range(h // pw_h + 2):
    for tx in range(w // pw_w + 2):
        tile = pure_wax
        if tx % 2 == 1:
            tile = tile.transpose(Image.FLIP_LEFT_RIGHT)
        if ty % 2 == 1:
            tile = tile.transpose(Image.FLIP_TOP_BOTTOM)
        wax_full.paste(tile, (tx * pw_w, ty * pw_h))

wax_full = wax_full.filter(ImageFilter.GaussianBlur(2))

mask = Image.new('L', (w, h), 0)
d = ImageDraw.Draw(mask)
d.rounded_rectangle([305, 375, 730, 645], radius=60, fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(16))

clean_img = img.copy()
clean_img.paste(wax_full, (0, 0), mask)

# 2. Cut out circular wax seal with transparent background
cx, cy, r = 506, 498, 376
circle_mask = Image.new('L', (w, h), 0)
d_c = ImageDraw.Draw(circle_mask)
d_c.ellipse([cx - r, cy - r, cx + r, cy + r], fill=255)
circle_mask = circle_mask.filter(ImageFilter.GaussianBlur(1.8))

rgba = clean_img.convert('RGBA')
rgba.putalpha(circle_mask)

# 3. Recolor gold elements (tiara, diamond setting, circular filigree border) to brilliant silver / white gold
silver_img = rgba.copy()
for y in range(h):
    for x in range(w):
        r_c, g_c, b_c, a_c = rgba.getpixel((x, y))
        if a_c == 0:
            continue
        is_diamond = (r_c > 210 and g_c > 210 and b_c > 215)
        is_gold = (r_c > 115 and g_c > 80 and (g_c - b_c) > 15 and (r_c - g_c) < 70)
        if is_gold and not is_diamond:
            lum = 0.299 * r_c + 0.587 * g_c + 0.114 * b_c
            lum_adj = lum
            if lum > 180:
                lum_adj = min(255, lum * 1.08)
            elif lum < 100:
                lum_adj = lum * 0.92
            sr = int(min(255, lum_adj * 0.98))
            sg = int(min(255, lum_adj * 1.00))
            sb = int(min(255, lum_adj * 1.04))
            silver_img.putpixel((x, y), (sr, sg, sb, a_c))

silver_img.save('scripts/seal_silver_base.png')
print("Saved scripts/seal_silver_base.png")
