"""Home-page card for Elderly care: laptop + overlapping phone, same layout as tripped-card."""
from PIL import Image
from laptop import laptop, IMG
from elderly import desktop_screen, iphone, SRC

lap = laptop(desktop_screen(1), 1)
ph = iphone(SRC + "8.png", 560)
x, y = lap.width - 190, lap.height + 30 - ph.height
out = Image.new("RGBA", (x + ph.width, lap.height + 30), (0, 0, 0, 0))
out.alpha_composite(lap, (0, 0))
out.alpha_composite(ph, (x, y))
out = out.resize((1100, round(out.height * 1100 / out.width)), Image.LANCZOS)
out.save(IMG + "elderly-card.webp", "WEBP", quality=78, method=6)
print(out.size)
