# Image and font scripts

One-off Python scripts that produced the images in `public/assets/images/` and the Khwan Thong
outlines in `src/pages/cases/khwanThong.js`. The site does not run them; they are kept so the
assets can be rebuilt or extended. Paths inside point at the original source files on the old
computer (Downloads, `OneDrive/Desktop/ภาพประกอบ`), so update them before running.

Needs Python 3 with Pillow; `pdfpages.py` / `pdf2x.py` need pypdfium2; `outline.py` needs
fonttools and uharfbuzz.

| Script | Makes |
|---|---|
| `laptop.py` | Laptop frame helper used by the others |
| `elderly.py` | `elderly-hero`: login screen on a laptop and an iPhone; also the `iphone()` frame helper |
| `eld2.py` | Elderly care admin screens in a 16:9 laptop, caregiver screens in iPhones |
| `eld3.py` | Elderly care "Before" callouts (zoomed pop-up beside the full screen) |
| `tripped_devices.py` | TRIPPED laptop + phone mockups |
| `pdfpages.py`, `pdf2x.py` | TRIPPED guide pages and PDF stacks rendered from the itinerary PDFs |
| `outline.py` | `khwanThong.js`: outlines of the Khwan Thong words used by the live Elderly care components. Needs the licensed font files, which must never be committed. |
