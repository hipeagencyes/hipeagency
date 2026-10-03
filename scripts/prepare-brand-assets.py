"""Derive web-sized assets from the supplied logos without redrawing the brand."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / 'assets/brand'
ICONS = ROOT / 'assets/icons'
BRAND.mkdir(parents=True, exist_ok=True)
ICONS.mkdir(parents=True, exist_ok=True)

def trimmed(image):
    # Ignore almost invisible edge pixels when finding the transparent margin.
    alpha = image.getchannel('A')
    bbox = alpha.point(lambda value: 255 if value > 16 else 0).getbbox()
    return image.crop(bbox) if bbox else image

names = {
    'HIPE_BLACK': 'hipe-black', 'HIPE_BLACK_MONO': 'hipe-black-mono',
    'HIPE_WHITE': 'hipe-white', 'HIPE_WHITE_MONO': 'hipe-white-mono',
    'ICON_IG_BLACK': 'symbol-black', 'ICON_IG_RED': 'symbol-red',
    'ICON_IG_WHITE': 'symbol-white',
}
for original, name in names.items():
    image = trimmed(Image.open(BRAND / 'originals' / (original + '.png')).convert('RGBA'))
    image.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
    image.save(BRAND / (name + '.png'), optimize=True)
    image.save(BRAND / (name + '.webp'), lossless=True, method=6)

symbol = trimmed(Image.open(BRAND / 'originals/ICON_IG_RED.png').convert('RGBA'))
def icon(size, opaque=False):
    canvas = Image.new('RGBA', (size, size), '#f7f6f2' if opaque else (0, 0, 0, 0))
    image = symbol.copy()
    inset = round(size * (0.11 if opaque else 0.035))
    image.thumbnail((size - inset * 2, size - inset * 2), Image.Resampling.LANCZOS)
    canvas.alpha_composite(image, ((size-image.width)//2, (size-image.height)//2))
    return canvas

for size in (16, 32, 48):
    icon(size).save(ICONS / f'favicon-{size}.png', optimize=True)
icon(256).save(ROOT / 'favicon.ico', sizes=[(16,16), (32,32), (48,48), (64,64), (128,128), (256,256)])
for size, name in ((180, 'apple-touch-icon'), (192, 'icon-192'), (512, 'icon-512')):
    icon(size, opaque=True).save(ICONS / (name + '.png'), optimize=True)
print('Brand variants and favicon sizes generated.')
