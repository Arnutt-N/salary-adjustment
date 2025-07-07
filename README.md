# ระบบสารสนเทศการปรับเงินเดือนข้าราชการและค่าตอบแทนพนักงานราชการ

## 📋 รายละเอียดโปรเจค

เว็บแอปพลิเคชันสำหรับแสดงข้อมูลและคำนวณการปรับเงินเดือนข้าราชการและค่าตอบแทนพนักงานราชการตามมติคณะรัฐมนตรี

## 🚀 ฟีเจอร์หลัก

- 📊 ระบบคำนวณค่าตอบแทนพนักงานราชการ
- 📈 แสดงข้อมูลการปรับเงินเดือนข้าราชการ
- 📱 Responsive Design รองรับทุกอุปกรณ์
- 🎨 UI/UX ที่ใช้งานง่าย

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
- **ข้าราชการ** (`civil-servant.html`) - ข้อมูลข้าราชการ
- **พนักงานราชการ** (`gov-emp.html`) - ระบบคำนวณค่าตอบแทน
- **Coming Soon** (`coming-soon.html`) - หน้าชั่วคราว

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
