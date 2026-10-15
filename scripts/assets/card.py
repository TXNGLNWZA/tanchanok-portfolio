from PIL import Image
from laptop import laptop, screen, IMG

lap = laptop(screen("Home.png", 800))
ph = Image.open(IMG + "tripped-choose.webp").convert("RGBA")
ph = ph.resize((round(ph.width * 560 / ph.height), 560), Image.LANCZOS)
x, y = lap.width - 190, lap.height + 30 - ph.height
out = Image.new("RGBA", (x + ph.width, lap.height + 30), (0, 0, 0, 0))
out.alpha_composite(lap, (0, 0))
out.alpha_composite(ph, (x, y))
out = out.resize((1100, round(out.height * 1100 / out.width)), Image.LANCZOS)
out.save(IMG + "tripped-card.webp", "WEBP", quality=74, method=6)
print(out.size)
