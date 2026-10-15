"""Elderly care mockups from the Figma exports: admin screens in a laptop, caregiver screens in iPhones.
Each image gets a 1x file and an @2x file (for srcset and the lightbox)."""
import json
from PIL import Image
import laptop as L
from laptop import laptop, IMG
from elderly import iphone

# 16:9 laptop screen so the full admin screens fit without cropping the sidebar
L.SH = round(L.SW * 9 / 16)
L.LH = L.SH + L.BT + L.BB
L.H = L.LH + L.BH
SW, SH = L.SW, L.SH

SRC = "C:/Users/TS.Specialist/OneDrive/Desktop/ภาพประกอบ/Management system for an elderly care center/"
TMP = "C:/Users/TSACE4~1.SPE/AppData/Local/Temp/claude/c--Users-TS-Specialist-OneDrive-Desktop-tanchanok-portfolio-tanchanok-portfolio/3ab737af-da55-413f-b838-5a03ab143aa7/scratchpad/eld/"
out = {}


def desk(name, k):
    im = Image.open(SRC + name).convert("RGB")
    return laptop(im.resize((SW * k, SH * k), Image.LANCZOS), k)


def row(items, gap):
    h = max(i.height for i in items)
    o = Image.new("RGBA", (sum(i.width for i in items) + gap * (len(items) - 1), h), (0, 0, 0, 0))
    x = 0
    for i in items:
        o.alpha_composite(i, (x, h - i.height))
        x += i.width + gap
    return o


def save(builder, name, w1):
    for k, suffix, width in [(1, "", w1), (2, "@2x", w1 * 2)]:
        im = builder(k)
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        im.save(IMG + name + suffix + ".webp", "WEBP", quality=80, method=6)
        print(name + suffix, im.size)
        if k == 1:
            out[name] = im.size


if __name__ != "__main__":
    raise SystemExit  # imported for helpers only

# single-laptop screens
save(lambda k: desk("MacBook Pro 16_ - 187.png", k), "elderly-add-after", 1200)
save(lambda k: desk("MacBook Pro 16_ - 55.png", k), "elderly-withdraw-before", 1200)
save(lambda k: desk("MacBook Pro 16_ - 183.png", k), "elderly-admin", 1200)

# the same form layout reused: supplies, medication, resident
save(lambda k: row([desk(f"MacBook Pro 16_ - {n}.png", k) for n in (187, 190, 181)], 60 * k), "elderly-add-reuse", 1400)

# caregiver phones: home, medication round, medicine stock, request status
tall = Image.open(SRC + "13 Pro - 42.png")
tall.crop((0, 0, 390, 879)).save(TMP + "p42.png")
phones = [SRC + "13 Pro - 39.png", TMP + "p42.png", SRC + "13 Pro - 30.png", SRC + "13 Pro - 78.png"]
save(lambda k: row([iphone(p, 697 * k, k) for p in phones], 50 * k), "elderly-caregiver", 1400)
f = 879 / 667  # @2x: phone screens at the originals' real height, no upscaling
cg = row([iphone(p, round(697 * f), f) for p in phones], round(50 * f))
cg.save(IMG + "elderly-caregiver@2x.webp", "WEBP", quality=80, method=6)
print("elderly-caregiver@2x (real res)", cg.size)

json.dump(out, open(TMP + "sizes.json", "w"))
