"""Rebuild elderly-hero: laptop (desktop login) + iPhone (mobile login), transparent bg."""
from PIL import Image, ImageDraw
from laptop import laptop, SW, SH, IMG

SRC = "C:/Users/TSACE4~1.SPE/AppData/Local/Temp/claude/c--Users-TS-Specialist-OneDrive-Desktop-tanchanok-portfolio-tanchanok-portfolio/3ab737af-da55-413f-b838-5a03ab143aa7/images/"
S = 3  # supersample


def desktop_screen(k):
    im = Image.open(SRC + "7.png").convert("RGB")
    w = round(im.height * SW / SH)  # crop 16:9 to the laptop's 16:10
    x = (im.width - w) // 2
    return im.crop((x, 0, x + w, im.height)).resize((round(SW * k), round(SH * k)), Image.LANCZOS)


def iphone(screen_path, height, k=1):
    scr = Image.open(screen_path).convert("RGB")
    rim, bez = round(4 * k), round(11 * k)
    sh = height - 2 * (rim + bez)
    sw = round(scr.width * sh / scr.height)
    scr = scr.resize((sw, sh), Image.LANCZOS)
    ox = round(4 * k)  # room for side buttons on both edges
    bw = sw + 2 * (rim + bez)
    W, H = bw + 2 * ox, height

    f = Image.new("RGBA", (W * S, H * S), (0, 0, 0, 0))
    d = ImageDraw.Draw(f)
    s = lambda *v: [round(x * S) for x in v]
    # side buttons
    for x0, y0, y1 in [(0, 150, 190), (0, 205, 260), (0, 272, 327), (ox / k + bw / k - 2, 215, 300)]:
        d.rounded_rectangle(s(x0 * k, y0 * k, (x0 + 6) * k, y1 * k), radius=round(2 * S * k), fill=(120, 124, 130, 255))
    # rim + bezel
    d.rounded_rectangle(s(ox, 0, ox + bw, H), radius=round(54 * S * k), fill=(150, 154, 160, 255))
    d.rounded_rectangle(s(ox + rim, rim, ox + bw - rim, H - rim), radius=round(50 * S * k), fill=(10, 10, 11, 255))
    frame = f.resize((W, H), Image.LANCZOS)

    # screen with rounded corners
    mask = Image.new("L", (sw * S, sh * S), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, sw * S, sh * S), radius=round(40 * S * k), fill=255)
    mask = mask.resize((sw, sh), Image.LANCZOS)
    frame.paste(scr, (ox + rim + bez, rim + bez), mask)

    # dynamic island
    isl = Image.new("RGBA", (W * S, H * S), (0, 0, 0, 0))
    iw, ih, top = 96 * k, 28 * k, rim + bez + 11 * k
    cx = ox + bw / 2
    ImageDraw.Draw(isl).rounded_rectangle(s(cx - iw / 2, top, cx + iw / 2, top + ih), radius=round(14 * S * k), fill=(0, 0, 0, 255))
    frame.alpha_composite(isl.resize((W, H), Image.LANCZOS))
    return frame


def build(k):
    lap = laptop(desktop_screen(k), k)
    ph = iphone(SRC + "8.png", lap.height, k)
    gap = round(70 * k)
    out = Image.new("RGBA", (lap.width + gap + ph.width, lap.height), (0, 0, 0, 0))
    out.alpha_composite(lap, (0, 0))
    out.alpha_composite(ph, (lap.width + gap, 0))
    return out


if __name__ == "__main__":
    for k, width, name in [(1, 1400, "elderly-hero"), (2, 2800, "elderly-hero@2x")]:
        out = build(k)
        out = out.resize((width, round(out.height * width / out.width)), Image.LANCZOS)
        out.save(IMG + name + ".webp", "WEBP", quality=78, method=6)
        print(name, out.size)
