"""Rebuild TRIPPED laptop + phone mockups with the sharper phone originals (1x and @2x)."""
from PIL import Image
from laptop import laptop, SRC, SW, SH, IMG


def screen(name, crop_h, k):
    im = Image.open(SRC + name).convert("RGB")
    im = im.crop((0, 0, im.width, min(im.height, round(crop_h))))
    w = SW * k
    im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    return im.crop((0, 0, w, SH * k))


def phone(name, height):
    ph = Image.open(IMG + name + "@2x.webp").convert("RGBA")
    return ph.resize((round(ph.width * height / ph.height), height), Image.LANCZOS)


def side_by_side(shot, ph_name, k):
    lap = laptop(screen(shot, 800, k), k)
    ph = phone(ph_name, lap.height)
    gap = 70 * k
    out = Image.new("RGBA", (lap.width + gap + ph.width, lap.height), (0, 0, 0, 0))
    out.alpha_composite(lap, (0, 0))
    out.alpha_composite(ph, (lap.width + gap, 0))
    return out


def save(im, name, width):
    im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(IMG + name + ".webp", "WEBP", quality=78, method=6)
    print(name, im.size)


for shot, ph, name in [("Home.png", "tripped-home", "tripped-devices-home"),
                       ("Choose trip.png", "tripped-choose", "tripped-devices-choose")]:
    save(side_by_side(shot, ph, 1), name, 1400)
    save(side_by_side(shot, ph, 2), name + "@2x", 2800)

# home-page card: laptop with the phone overlapping front-right
lap = laptop(screen("Home.png", 800, 2), 2)
ph = phone("tripped-choose", 1120)
x, y = lap.width - 380, lap.height + 60 - ph.height
card = Image.new("RGBA", (x + ph.width, lap.height + 60), (0, 0, 0, 0))
card.alpha_composite(lap, (0, 0))
card.alpha_composite(ph, (x, y))
save(card, "tripped-card", 1100)
