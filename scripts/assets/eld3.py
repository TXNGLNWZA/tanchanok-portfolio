"""'Before' images for Elderly care: the full screen in a small laptop, plus a zoomed-in panel of
the part that was the problem (the add-item modal, the notification pop-up), joined by
connector lines. Built at 1x and 2x from the 1920px Figma exports."""
from PIL import Image, ImageDraw, ImageFilter

src = open("eld2.py", encoding="utf-8").read().split('if __name__ != "__main__":')[0]
ns = {}
exec(src, ns)
SRC, IMG, desk = ns["SRC"], ns["IMG"], ns["desk"]
L = ns["L"]

FRAME = (183, 3, 44, 255)  # crimson annotation, as in the original portfolio


def shadow(size, radius, blur, alpha=70):
    w, h = size
    pad = blur * 3
    m = Image.new("L", (w + 2 * pad, h + 2 * pad), 0)
    ImageDraw.Draw(m).rounded_rectangle((pad, pad, pad + w, pad + h), radius=radius, fill=alpha)
    m = m.filter(ImageFilter.GaussianBlur(blur))
    s = Image.new("RGBA", m.size, (0, 0, 0, 0))
    s.putalpha(m)
    return s, pad


def rounded(im, r):
    m = Image.new("L", im.size, 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, im.width - 1, im.height - 1), radius=r, fill=255)
    out = im.convert("RGBA")
    out.putalpha(m)
    return out


def callout(screen_file, box, zoom_img, name, k):
    """box: region of the 1920x1080 screen that is zoomed (x0, y0, x1, y1)."""
    lk = 0.58 * k  # laptop scale relative to the 1x (1200px) geometry
    lap = desk(screen_file, k)  # rendered at k, then shrunk: never upscaled
    lap = lap.resize((round(L.W * lk), round(L.H * lk)), Image.LANCZOS)
    # screen origin inside the laptop image, and the 1920 -> screen scale
    sx0 = ((L.W - L.LW) // 2 + L.BS) * lk
    sy0 = L.BT * lk
    sc = L.SW * lk / 1920

    zw = round(zoom_img.width * (560 * k) / zoom_img.width)
    zh = round(zoom_img.height * zw / zoom_img.width)
    z = zoom_img.convert("RGB").resize((zw, zh), Image.LANCZOS)

    pad = 30 * k
    W = pad + zw + 60 * k + lap.width + pad
    H = max(pad + zh + pad, pad + lap.height + pad)
    c = Image.new("RGBA", (W, H), (0, 0, 0, 0))

    lx, ly = W - pad - lap.width, pad
    zx, zy = pad, H - pad - zh
    # highlight box on the laptop screen
    hx0, hy0 = lx + sx0 + box[0] * sc, ly + sy0 + box[1] * sc
    hx1, hy1 = lx + sx0 + box[2] * sc, ly + sy0 + box[3] * sc

    c.alpha_composite(lap, (lx, ly))
    d = ImageDraw.Draw(c)
    lw = max(2, round(2 * k))
    # connector lines from the highlight to the zoom panel
    for (ax, ay), (bx, by) in [((hx0, hy0), (zx + zw, zy)), ((hx0, hy1), (zx + zw, zy + zh))]:
        d.line([(ax, ay), (bx, by)], fill=(183, 3, 44, 150), width=lw)
    d.rectangle((hx0, hy0, hx1, hy1), outline=FRAME, width=lw)

    s, sp = shadow((zw, zh), 14 * k, 16 * k)
    c.alpha_composite(s, (zx - sp, zy - sp + 8 * k))
    zr = rounded(z, 14 * k)
    c.alpha_composite(zr, (zx, zy))
    ImageDraw.Draw(c).rounded_rectangle((zx, zy, zx + zw - 1, zy + zh - 1), radius=14 * k, outline=FRAME, width=3 * k)
    return c


def build(screen_file, box, zoom_img, name):
    for k, suffix in [(1, ""), (2, "@2x")]:
        im = callout(screen_file, box, zoom_img, name, k)
        im.save(IMG + name + suffix + ".webp", "WEBP", quality=82, method=6)
        print(name + suffix, im.size)


# add-item modal: crop it from the full screen at full resolution
full59 = Image.open(SRC + "MacBook Pro 16_ - 59.png").convert("RGB")
modal = (716, 298, 1315, 811)
build("MacBook Pro 16_ - 59.png", modal, full59.crop(modal), "elderly-add-before")

# notification pop-up: the separate export, positioned over the list screen
notif = Image.open(SRC + "การแจ้งเตือน.png")
nbox = (1317, 58, 1824, 593)
build("MacBook Pro 16_ - 55.png", nbox, notif, "elderly-withdraw-before")
