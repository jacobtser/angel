"""Generate Auntie Angel's PWA icons and social preview.

Run with: py -3 scripts/generate-icons.py
The source mark is drawn at 1024px, then downsampled so every size stays crisp.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
ICONS = ROOT / "public" / "icons"
ICONS.mkdir(parents=True, exist_ok=True)

FOREST = (24, 36, 31)
FOREST_LIGHT = (31, 107, 86)
CREAM = (251, 247, 240)
GOLD = (185, 122, 36)
GOLD_LIGHT = (232, 178, 94)
MUTED = (93, 109, 100)

SERIF_BOLD = "C:/Windows/Fonts/georgiab.ttf"
SANS = "C:/Windows/Fonts/segoeui.ttf"
SANS_BOLD = "C:/Windows/Fonts/segoeuib.ttf"


def gradient(size, top, bottom):
    image = Image.new("RGB", (size, size), top)
    draw = ImageDraw.Draw(image)
    for y in range(size):
        t = y / max(1, size - 1)
        colour = tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        draw.line([(0, y), (size, y)], fill=colour)
    return image


def fit_font(path, text, target_width, start=900):
    size = start
    while size > 20:
        font = ImageFont.truetype(path, size)
        box = font.getbbox(text)
        if box[2] - box[0] <= target_width:
            return font
        size -= 4
    return ImageFont.truetype(path, 20)


def icon(mark_ratio=0.62):
    size = 1024
    image = gradient(size, (18, 29, 24), (26, 71, 57))
    overlay = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # A quiet halo behind the monogram.
    draw.ellipse((128, 128, 896, 896), outline=(251, 247, 240, 26), width=3)
    draw.ellipse((176, 176, 848, 848), outline=(251, 247, 240, 16), width=2)

    mark_width = int(size * mark_ratio)
    font = fit_font(SERIF_BOLD, "A", mark_width)
    box = font.getbbox("A")
    text_w = box[2] - box[0]
    text_h = box[3] - box[1]
    x = (size - text_w) / 2 - box[0]
    y = (size - text_h) / 2 - box[1] - 26
    draw.text((x, y), "A", font=font, fill=CREAM)

    # A small sun, sitting where a full stop might.
    sun_x = int(size * 0.685)
    sun_y = int(size * 0.29)
    sun_r = int(size * 0.045)
    draw.ellipse(
        (sun_x - sun_r, sun_y - sun_r, sun_x + sun_r, sun_y + sun_r),
        fill=GOLD_LIGHT,
    )
    draw.ellipse(
        (sun_x - sun_r * 1.7, sun_y - sun_r * 1.7, sun_x + sun_r * 1.7, sun_y + sun_r * 1.7),
        outline=(232, 178, 94, 55),
        width=2,
    )

    # A hand-drawn underline, slightly off-axis like a pen stroke.
    draw.arc((300, 720, 724, 880), start=18, end=162, fill=GOLD_LIGHT, width=14)

    image = Image.alpha_composite(image.convert("RGBA"), overlay)
    return image.convert("RGB")


def make_og():
    width, height = 1200, 630
    image = Image.new("RGB", (width, height), CREAM)
    draw = ImageDraw.Draw(image)

    # Warm paper wash with a green corner.
    for radius, colour in ((900, (248, 236, 213)), (620, (251, 247, 240))):
        draw.ellipse(
            (-radius // 2, -radius // 2, radius // 2, radius // 2),
            fill=colour,
        )
    for radius, colour in ((820, (226, 240, 233)), (560, (251, 247, 240))):
        draw.ellipse(
            (width - radius // 2, height - radius // 2, width + radius // 2, height + radius // 2),
            fill=colour,
        )

    # Mark tile.
    mark = icon(0.66).resize((148, 148), Image.LANCZOS)
    mask = Image.new("L", (148, 148), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, 148, 148), radius=38, fill=255)
    image.paste(mark, (76, 84), mask)

    # Eyebrow, with manual tracking.
    eyebrow_font = ImageFont.truetype(SANS_BOLD, 21)
    x = 264
    for letter in "AUNTIE ANGEL":
        draw.text((x, 94), letter, font=eyebrow_font, fill=FOREST_LIGHT)
        x += eyebrow_font.getlength(letter) + 4

    title_font = ImageFont.truetype(SERIF_BOLD, 65)
    draw.text((260, 138), "A calmer way to", font=title_font, fill=FOREST)
    draw.text((260, 212), "prepare for WASSCE.", font=title_font, fill=FOREST)

    body_font = ImageFont.truetype(SANS, 29)
    draw.text((262, 316), "English Language · Core Mathematics", font=body_font, fill=MUTED)
    draw.text((262, 356), "Management in Living", font=body_font, fill=MUTED)

    draw.rounded_rectangle((262, 430, 610, 480), radius=25, fill=(226, 240, 233))
    chip_font = ImageFont.truetype(SANS_BOLD, 20)
    draw.text((286, 443), "Offline-first  ·  Built for one learner", font=chip_font, fill=FOREST_LIGHT)

    draw.line((262, 528, 1124, 528), fill=(210, 202, 190), width=1)
    footer_font = ImageFont.truetype(SANS, 22)
    draw.text((262, 548), "Lessons, past questions, literature and a tutor who asks before she tells.", font=footer_font, fill=MUTED)

    # Decorative gold rule, echoing the icon.
    draw.arc((860, 360, 1120, 560), start=200, end=330, fill=GOLD_LIGHT, width=9)

    image.save(ROOT / "public" / "og.png", optimize=True)


def main():
    regular = icon(0.64)
    regular.resize((512, 512), Image.LANCZOS).save(ICONS / "icon-512.png", optimize=True)
    regular.resize((192, 192), Image.LANCZOS).save(ICONS / "icon-192.png", optimize=True)
    regular.resize((180, 180), Image.LANCZOS).save(ICONS / "apple-touch-icon.png", optimize=True)
    regular.resize((32, 32), Image.LANCZOS).save(ICONS / "favicon-32.png", optimize=True)
    regular.resize((48, 48), Image.LANCZOS).save(ROOT / "public" / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    maskable = icon(0.48)
    maskable.resize((512, 512), Image.LANCZOS).save(ICONS / "maskable-512.png", optimize=True)

    make_og()
    print("Wrote PWA icons and og.png")


if __name__ == "__main__":
    main()
