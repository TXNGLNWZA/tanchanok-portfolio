"""Turn the few Khwan Thong strings used by the Elderly care components into SVG path data.
No font file is shipped: only the outlines of these exact words, shaped with HarfBuzz."""
import json
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

DIR = "C:/Users/TS.Specialist/Downloads/Khwan-Thong-Fontset-ver-1.00318Z-001/Khwan Thong Fontset ver 1.00/TTF Files/"
OUT = "c:/Users/TS.Specialist/OneDrive/Desktop/tanchanok-portfolio/tanchanok-portfolio/src/pages/cases/khwanThong.js"

STRINGS = {
    "Bold": ["เข้าสู่ระบบ", "รออนุมัติ", "อนุมัติ", "ไม่อนุมัติ", "ให้ยา", "ชื่อผู้ใช้", "23", "24", "25", "26"],
    "Regular": ["caregiver01", "รับประทานแล้ว", "รับประทานล่าช้า", "ไม่ได้รับประทาน", "เสาร์", "อาทิตย์", "จันทร์", "อังคาร", "นางสมพร ใจดี", "2 เม็ด"],
}

out = {}
for weight, words in STRINGS.items():
    path = DIR + f"KhwanThong-{weight}.ttf"
    blob = hb.Blob.from_file_path(path)
    face = hb.Face(blob)
    font = hb.Font(face)
    tt = TTFont(path)
    gs = tt.getGlyphSet()
    order = tt.getGlyphOrder()
    upm = tt["head"].unitsPerEm
    asc = tt["hhea"].ascent
    desc = -tt["hhea"].descent
    for w in words:
        buf = hb.Buffer()
        buf.add_str(w)
        buf.guess_segment_properties()
        hb.shape(font, buf, {"kern": True, "liga": True})
        pen = SVGPathPen(gs)
        x = 0
        for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
            name = order[info.codepoint]
            # flip y (font units point up, SVG points down) and move to the pen position
            tp = TransformPen(pen, (1, 0, 0, -1, x + pos.x_offset, asc - pos.y_offset))
            gs[name].draw(tp)
            x += pos.x_advance
        key = f"{weight}:{w}"
        # x where each character cluster ends, so the text can be revealed one letter at a time
        stops = []
        cx = 0
        for k, (info, pos) in enumerate(zip(buf.glyph_infos, buf.glyph_positions)):
            cx += pos.x_advance
            nxt = buf.glyph_infos[k + 1].cluster if k + 1 < len(buf.glyph_infos) else None
            if nxt != info.cluster:
                stops.append(cx)
        out[key] = {"d": pen.getCommands(), "w": x, "h": asc + desc, "upm": upm, "stops": stops}

js = (
    "/* Khwan Thong is licensed exclusively to Srinakharinwirot University, so the font file is not\n"
    "   shipped. These are only the outlines of the words the Elderly care components use, shaped\n"
    "   with HarfBuzz from the licensed font (scratchpad script outline.py). Key: \"Weight:text\". */\n"
    "export const KT = " + json.dumps(out, ensure_ascii=False) + ";\n"
)
open(OUT, "w", encoding="utf-8").write(js)
print(len(out), "strings,", round(len(js) / 1024, 1), "KB")
