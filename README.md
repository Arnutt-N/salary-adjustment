# ระบบสารสนเทศการปรับเงินเดือนข้าราชการและค่าตอบแทนพนักงานราชการ

## 📋 รายละเอียดโปรเจค

เว็บแอปพลิเคชันสำหรับแสดงข้อมูลและคำนวณการปรับเงินเดือนข้าราชการและค่าตอบแทนพนักงานราชการตามมติคณะรัฐมนตรี

## 🚀 ฟีเจอร์หลัก

- 📈 ระบบคำนวณการปรับเงินเดือนข้าราชการ
- 📊 ระบบคำนวณค่าตอบแทนพนักงานราชการ
- 📋 ข้อมูลกฎหมายและหนังสือเวียนที่เกี่ยวข้องพร้อมลิงก์ภายนอก
- 💡 ระบบแสดงผลการคำนวณแบบครบถ้วนพร้อมรายละเอียด
- 📱 Responsive Design รองรับทุกอุปกรณ์
- 🎨 UI/UX ที่ใช้งานง่ายพร้อม hover effects และ animations

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend**: HTML5, CSS3, JavaScript
- **Build Tool**: Vite
- **CSS Framework**: Tailwind CSS
- **Icons**: Lucide Icons
- **Font**: Prompt (Google Fonts)

## 📦 การติดตั้งและรัน

### Prerequisites
- Node.js (version 16 หรือสูงกว่า)
- npm หรือ pnpm

### ขั้นตอนการติดตั้ง

```bash
# Clone repository
git clone <repository-url>
cd salary-adjustment

# ติดตั้ง dependencies
npm install

# รันในโหมด development
npm run dev

# Build สำหรับ production
npm run build

# Preview build
npm run preview
```

## 📂 โครงสร้างโปรเจค

```
├── public/
│   ├── data/           # ข้อมูล JSON
│   ├── documents/      # เอกสาร
│   └── images/         # รูปภาพและโลโก้
├── src/
│   ├── components/     # HTML Components
│   ├── *.js           # JavaScript modules
│   └── style.css      # Styles หลัก
├── *.html             # หน้าเว็บต่างๆ
└── vite.config.js     # Vite configuration
```

## 🌐 หน้าเว็บ

- **หน้าหลัก** (`index.html`) - Overview และ Navigation
- **ข้าราชการ** (`civil-servant.html`) - ระบบคำนวณเงินเดือนข้าราชการพร้อมข้อมูลกฎหมายและหนังสือเวียน
- **พนักงานราชการ** (`gov-emp.html`) - ระบบคำนวณค่าตอบแทนพนักงานราชการ
- **Coming Soon** (`coming-soon.html`) - หน้าชั่วคราว

### ฟีเจอร์เพิ่มเติมหน้าข้าราชการ
- ระบบคำนวณเงินเดือนตามคุณวุฒิ (ในประเทศ/ต่างประเทศ)
- แสดงผลการคำนวณครบถ้วน (เงินเดือนใหม่, เงินเพิ่มการครองชีพ, รายละเอียดการคำนวณ)
- ข้อมูลกฎหมายและหนังสือเวียนที่เกี่ยวข้องพร้อมลิงก์ไปยังเว็บไซต์ ก.พ.
- UI/UX ที่ปรับปรุงใหม่พร้อม hover effects และ smooth animations

## 🚀 การ Deploy

### Vercel (แนะนำ)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# อัปโหลดโฟลเดอร์ dist/
```

## 📄 License

© 2025 กองบริหารทรัพยากรบุคคล สำนักงานปลัดกระทรวงยุติธรรม
