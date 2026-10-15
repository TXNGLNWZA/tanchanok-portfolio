"""Build TRIPPED desktop mockups: MacBook-style laptop frame (matching elderly-hero),
optionally paired with the existing phone mockup, transparent background, WebP q74."""
from PIL import Image, ImageDraw

SRC = "C:/Users/TS.Specialist/Downloads/TRIPPED/"
IMG = "C:/Users/TS.Specialist/OneDrive/Desktop/tanchanok-portfolio/tanchanok-portfolio/public/assets/images/"
SW, SH = 1000, 625            # screen
BS, BT, BB = 18, 18, 30       # bezel side/top/bottom
LW, LH = SW + 2 * BS, SH + BT + BB
BW, BH = 1200, 24             # base
W, H = BW, LH + BH
S = 3                         # supersample for smooth edges


def screen(name, crop_h):
    im = Image.open(SRC + name).convert("RGB")
    im = im.crop((0, 0, im.width, min(im.height, round(crop_h))))
    im = im.resize((SW, round(im.height * SW / im.width)), Image.LANCZOS)
    return im.crop((0, 0, SW, SH))


def laptop(scr, k=1):
    """Laptop frame around `scr` (sized SW*k x SH*k). k scales the whole mockup."""
    Wk, Hk = round(W * k), round(H * k)
    out = Image.new("RGBA", (Wk, Hk), (0, 0, 0, 0))
    lx = (W - LW) // 2
    out.paste(scr, (round((lx + BS) * k), round(BT * k)))

    f = Image.new("RGBA", (Wk * S, Hk * S), (0, 0, 0, 0))
    d = ImageDraw.Draw(f)
    s = lambda *v: [round(x * S * k) for x in v]
    r = lambda v: round(v * S * k)
    # lid: aluminium rim, black bezel, screen hole
    d.rounded_rectangle(s(lx, 0, lx + LW, LH + 2), radius=r(26), fill=(176, 180, 186, 255))
    d.rounded_rectangle(s(lx + 3, 3, lx + LW - 3, LH + 2), radius=r(23), fill=(12, 12, 13, 255))
    d.rounded_rectangle(s(lx + BS, BT, lx + BS + SW, BT + SH), radius=r(6), fill=(0, 0, 0, 0))
    # notch
    d.rounded_rectangle(s(W / 2 - 60, BT - 6, W / 2 + 60, BT + 14), radius=r(7), fill=(12, 12, 13, 255))
    # base with vertical gradient
    top = LH
    for y in range(r(BH)):
        t = y / r(BH)
        c = tuple(round(a + (b - a) * t) for a, b in zip((232, 234, 237), (150, 154, 160)))
        d.line([(0, r(top) + y), (Wk * S, r(top) + y)], fill=c + (255,))
    base_mask = Image.new("L", f.size, 0)
    ImageDraw.Draw(base_mask).rounded_rectangle(s(0, top - 12, W, top + BH), radius=r(12), fill=255)
    ImageDraw.Draw(base_mask).rectangle(s(0, 0, W, top), fill=255)
    f.putalpha(Image.composite(f.getchannel("A"), Image.new("L", f.size, 0), base_mask))
    d.rectangle(s(0, top, W, top + 2), fill=(200, 203, 208, 255))
    d.rounded_rectangle(s(W / 2 - 85, top, W / 2 + 85, top + 9), radius=r(5), fill=(178, 182, 188, 255))
    d.rectangle(s(W / 2 - 85, top, W / 2 + 85, top + 4), fill=(178, 182, 188, 255))

    out.alpha_composite(f.resize((Wk, Hk), Image.LANCZOS))
    return out


def with_phone(lap, phone_name, gap=70):
    ph = Image.open(IMG + phone_name + ".webp").convert("RGBA")
    ph = ph.resize((round(ph.width * H / ph.height), H), Image.LANCZOS)
    out = Image.new("RGBA", (lap.width + gap + ph.width, H), (0, 0, 0, 0))
    out.alpha_composite(lap, (0, 0))
    out.alpha_composite(ph, (lap.width + gap, 0))
    return out


def save(im, name, max_w=1400):
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    im.save(IMG + name + ".webp", "WEBP", quality=74, method=6)
    print(name, im.size)


if __name__ == "__main__":
    save(with_phone(laptop(screen("Home.png", 800)), "tripped-home"), "tripped-devices-home")
    save(with_phone(laptop(screen("Choose trip.png", 800)), "tripped-choose"), "tripped-devices-choose")
    save(laptop(screen("2nd_A.png", 512)), "tripped-desktop-preview")
