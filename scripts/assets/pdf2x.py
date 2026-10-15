"""@2x versions for the lightbox: PDF fans, guide pages, expo booth photo."""
from PIL import Image
import pdfpages as P  # module-level fan() calls are harmless re-renders of the 1x files

IMG = P.IMG


def fan2x(pg, name, k=2, angle=11, spread=0.36):
    pw = 640 * k
    cover, left, right = pg[0], pg[1], pg[3]
    ph = cover.height
    W, H = round(pw * 2.6), round(ph * 1.5)
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cx, cy = W // 2, H // 2 + 10 * k

    def place(page, rot, dx, dy):
        r = page.rotate(rot, resample=Image.BICUBIC, expand=True)
        s, pad = P.shadow(r, blur=18 * k)
        x, y = cx + dx - r.width // 2, cy + dy - r.height // 2
        canvas.alpha_composite(s, (x - pad + 6 * k, y - pad + 14 * k))
        canvas.alpha_composite(r, (x, y))

    place(left, angle, -round(pw * spread), 18 * k)
    place(right, -angle, round(pw * spread), 18 * k)
    place(cover, 0, 0, 0)
    canvas = canvas.crop(canvas.getbbox())
    w1, h1 = Image.open(IMG + name + ".webp").size
    canvas = canvas.resize((w1 * 2, h1 * 2), Image.LANCZOS)
    canvas.save(IMG + name + "@2x.webp", "WEBP", quality=78, method=6)
    print(name + "@2x", canvas.size)


fan2x(P.pages("Tripped_Lampang-Culture-Nature-Peace.pdf", 1280), "tripped-pdf-culture")
fan2x(P.pages("Tripped_Lampang-Nature-Adventure-Culture.pdf", 1280), "tripped-pdf-nature")

for i, im in enumerate(P.pages("Tripped_Lampang-Culture-Nature-Peace.pdf", 1800), 1):
    im.convert("RGB").save(IMG + f"tripped-guide-p{i}@2x.webp", "WEBP", quality=76, method=6)
    print(f"tripped-guide-p{i}@2x", im.size)

src = "C:/Users/TSACE4~1.SPE/AppData/Local/Temp/claude/c--Users-TS-Specialist-OneDrive-Desktop-tanchanok-portfolio-tanchanok-portfolio/3ab737af-da55-413f-b838-5a03ab143aa7/images/4.png"
b = Image.open(src).convert("RGB").resize((1350, 1800), Image.LANCZOS)
b.save(IMG + "tripped-expo-booth@2x.webp", "WEBP", quality=74, method=6)
print("tripped-expo-booth@2x", b.size)
