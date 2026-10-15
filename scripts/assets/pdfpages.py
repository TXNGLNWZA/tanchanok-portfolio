"""Render TRIPPED Lampang itinerary PDFs into crisp portfolio images:
fanned page stacks (cover + highlights + timeline) and single pages."""
import pypdfium2 as pdfium
from PIL import Image, ImageFilter

SRC = "C:/Users/TS.Specialist/Downloads/frontend/frontend/public/"
IMG = "C:/Users/TS.Specialist/OneDrive/Desktop/tanchanok-portfolio/tanchanok-portfolio/public/assets/images/"


def pages(name, width):
    doc = pdfium.PdfDocument(SRC + name)
    out = []
    for pg in doc:
        w, _ = pg.get_size()
        out.append(pg.render(scale=width / w).to_pil().convert("RGBA"))
    return out


def shadow(im, blur=18, alpha=70, grow=0):
    a = im.getchannel("A").point(lambda v: alpha if v else 0)
    pad = blur * 3
    s = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), (0, 0, 0, 0))
    m = Image.new("L", s.size, 0)
    m.paste(a, (pad, pad))
    m = m.filter(ImageFilter.GaussianBlur(blur))
    s.putalpha(m)
    return s, pad


def fan(pg, back_left, back_right, out_name, pw=640, angle=11, spread=0.36):
    cover, left, right = pg[0], pg[back_left], pg[back_right]
    ph = cover.height
    W = round(pw * 2.6)
    H = round(ph * 1.5)
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cx, cy = W // 2, H // 2 + 10

    def place(page, rot, dx, dy):
        r = page.rotate(rot, resample=Image.BICUBIC, expand=True)
        s, pad = shadow(r)
        x, y = cx + dx - r.width // 2, cy + dy - r.height // 2
        canvas.alpha_composite(s, (x - pad + 6, y - pad + 14))
        canvas.alpha_composite(r, (x, y))

    place(left, angle, -round(pw * spread), 18)
    place(right, -angle, round(pw * spread), 18)
    place(cover, 0, 0, 0)
    canvas = canvas.crop(canvas.getbbox())
    canvas.save(IMG + out_name + ".webp", "WEBP", quality=80, method=6)
    print(out_name, canvas.size)


culture = pages("Tripped_Lampang-Culture-Nature-Peace.pdf", 640)
nature = pages("Tripped_Lampang-Nature-Adventure-Culture.pdf", 640)
fan(culture, 1, 3, "tripped-pdf-culture")
fan(nature, 1, 3, "tripped-pdf-nature")

# every page of the culture edition, for the zoomable page row
if False:
  for i, im in enumerate(pages("Tripped_Lampang-Culture-Nature-Peace.pdf", 900), 1):
      im.convert("RGB").save(IMG + f"tripped-guide-p{i}.webp", "WEBP", quality=78, method=6)
      print(f"tripped-guide-p{i}", im.size)
