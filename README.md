# Tanchanok Juntongkaew — Portfolio

เว็บ portfolio สร้างด้วย React + Vite

## เริ่มใช้งาน

1. เปิดโฟลเดอร์นี้ใน VS Code
2. ติดตั้งและรันเซิร์ฟเวอร์จำลองในเครื่อง (ต้องมี Node.js 20.19 ขึ้นไป):
   ```
   npm install
   npm run dev
   ```
   แล้วเปิดลิงก์ที่ขึ้นมาในเบราว์เซอร์
3. เปิด Claude Code แล้วสั่งงานได้เลย Claude Code จะอ่าน `CLAUDE.md` อัตโนมัติ
   ในไฟล์นั้นมีโครงสร้างโค้ด, design system และสิ่งที่ยังต้องยืนยันข้อมูล

## โครงสร้าง

```
index.html              จุดเริ่มของ Vite (ฟอนต์, meta)
src/App.jsx             router, header, รายการ case study
src/data.js             รายการรูป, ข้อมูลโปรเจกต์, อีเมล
src/styles.css          สไตล์ทั้งหมด, สีและฟอนต์อยู่ด้านบนสุด
src/pages/Home.jsx      หน้าแรก
src/pages/cases/        case study แยกไฟล์ละโปรเจกต์
src/components/         รูป, lightbox, ตา, ส่วนประกอบของ case study
public/assets/images/   รูปทั้งหมด (.webp)
CLAUDE.md               คู่มือโปรเจกต์สำหรับ Claude Code
```

## Deploy

รัน `npm run build` แล้วอัปโหลดโฟลเดอร์ `dist/` ขึ้น GitHub Pages, Netlify หรือ Vercel
(ถ้าเชื่อมกับ Netlify/Vercel ให้ตั้ง build command เป็น `npm run build` และ output เป็น `dist`)
