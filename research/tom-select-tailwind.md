# Tom Select for Tailwind CSS + Vanilla JS + Vite

**Tom Select** เป็นไลบรารี dropdown/select ที่ทันสมัย รองรับ searchable, multi-select, และ tag input พร้อมฟีเจอร์ที่หลากหลาย สำหรับโปรเจ็กต์ที่ใช้ HTML, Tailwind CSS, Vanilla JavaScript และ Vite

## ✨ ฟีเจอร์เด่น

- **Searchable Dropdown** - ค้นหาตัวเลือกได้อย่างรวดเร็ว
- **Multi-select** - เลือกหลายตัวเลือกได้
- **Tag Input** - สร้างตัวเลือกใหม่ได้แบบ real-time  
- **Keyboard Navigation** - ใช้คีย์บอร์ดควบคุมได้
- **Remote Data Loading** - โหลดข้อมูลจาก API
- **Plugin System** - ขยายฟีเจอร์ได้ตามต้องการ
- **Touch Support** - รองรับอุปกรณ์สัมผัส
- **Accessible** - เป็นมิตรกับผู้พิการ
- **Lightweight** - เพียง ~16kb (gzipped)

## 🚀 การติดตั้ง

### ผ่าน npm (แนะนำสำหรับ Vite)

```bash
npm install tom-select
```

### ผ่าน CDN

```html
<link href="https://cdn.jsdelivr.net/npm/tom-select@2.4.3/dist/css/tom-select.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/tom-select@2.4.3/dist/js/tom-select.complete.min.js"></script>
```

## 🔧 การใช้งานพื้นฐาน

### HTML

```html
<label for="select-country" class="block mb-2 text-sm font-medium text-gray-900">
  เลือกประเทศ
</label>
<select id="select-country" placeholder="เลือกประเทศ..." multiple>
  <option value="">เลือกประเทศ...</option>
  <option value="TH">ประเทศไทย</option>
  <option value="US">United States</option>
  <option value="CA">Canada</option>
  <option value="JP">Japan</option>
  <option value="UK">United Kingdom</option>
</select>
```

### JavaScript (ES6 Modules - Vite)

```javascript
// main.js
import TomSelect from 'tom-select'

// สร้าง Tom Select instance
new TomSelect('#select-country', {
  create: true,           // อนุญาตให้สร้างตัวเลือกใหม่
  sortField: {
    field: 'text',
    direction: 'asc'
  },
  maxItems: 3,           // จำกัดจำนวนตัวเลือกได้สูงสุด
  persist: false,        // ไม่เก็บ option ที่สร้างใหม่
  plugins: ['remove_button', 'clear_button']
})
```

### Vite Configuration (vite.config.js)

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  // การตั้งค่าพื้นฐานสำหรับ Tom Select
  optimizeDeps: {
    include: ['tom-select']
  }
})
```

## 🎨 Tailwind CSS Theme

### การใช้ธีม Tailwind UI (แนะนำ)

สร้างไฟล์ CSS สำหรับ Tom Select theme:

```css
/* styles/tom-select-tailwind.css */
@import 'tom-select/dist/css/tom-select.css';

.ts-control {
  @apply mt-2 w-full rounded-md border border-gray-300 py-1 px-3 shadow-sm 
         focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 
         h-9 text-sm;
}

.ts-control input {
  @apply !pr-5 text-sm !m-0;
}

.ts-wrapper.plugin-remove_button .item {
  @apply rounded-md;
}

.ts-wrapper.multi .ts-control > div {
  @apply p-0 m-0 pl-1;
}

.ts-wrapper.plugin-remove_button .item .remove {
  @apply border-none text-lg leading-none py-1 rounded-r-lg;
}

.ts-dropdown {
  @apply rounded-md border border-solid border-t border-gray-300 shadow-xl;
}

.ts-dropdown [data-selectable].option, .ts-dropdown .no-results {
  @apply py-2;
}

.ts-dropdown [data-selectable].option:first-child {
  @apply rounded-t-md;
}

.ts-dropdown [data-selectable].option:last-child {
  @apply rounded-b-md;
}

.ts-dropdown .create:hover, 
.ts-dropdown .option:hover, 
.ts-dropdown .active {
  @apply bg-indigo-100 text-indigo-900;
}

/* สำหรับ single select - เพิ่ม dropdown arrow */
.ts-wrapper:not(.form-control):not(.form-select).single .ts-control {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}
```

### Dark Mode Support

```css
/* Dark mode styles */
.dark .ts-control {
  @apply bg-gray-700 border-gray-600 text-white;
}

.dark .ts-dropdown {
  @apply bg-gray-700 border-gray-600;
}

.dark .ts-dropdown-content {
  @apply bg-gray-700 text-white;
}

.dark .ts-dropdown .option:hover,
.dark .ts-dropdown .active {
  @apply bg-blue-600 text-white;
}
```

## 🔌 Plugin ที่มีประโยชน์

### เลือก Plugin ตามความต้องการ

```javascript
import TomSelect from 'tom-select/base'
import TomSelect_remove_button from 'tom-select/plugins/remove_button.js'
import TomSelect_clear_button from 'tom-select/plugins/clear_button.js'
import TomSelect_dropdown_input from 'tom-select/plugins/dropdown_input.js'

// ลงทะเบียน plugins
TomSelect.define('remove_button', TomSelect_remove_button)
TomSelect.define('clear_button', TomSelect_clear_button)  
TomSelect.define('dropdown_input', TomSelect_dropdown_input)

// ใช้งาน
new TomSelect('#my-select', {
  plugins: ['remove_button', 'clear_button', 'dropdown_input']
})
```

### Plugin ยอดนิยม

- **remove_button** - ปุ่มลบตัวเลือกแต่ละรายการ
- **clear_button** - ปุ่มเคลียร์ทั้งหมด
- **dropdown_input** - ช่องค้นหาใน dropdown
- **checkbox_options** - checkbox สำหรับ multi-select
- **drag_drop** - ลากจัดเรียงตัวเลือก

## 📋 ตัวอย่างการใช้งานขั้นสูง

### Async Data Loading

```javascript
new TomSelect('#select-user', {
  valueField: 'id',
  labelField: 'name',  
  searchField: 'name',
  load: function(query, callback) {
    if (!query.length) return callback()
    
    fetch(`/api/users?search=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(json => callback(json.users))
      .catch(() => callback())
  }
})
```

### Custom Option Rendering

```javascript
new TomSelect('#select-product', {
  render: {
    option: function(data, escape) {
      return `<div class="flex items-center p-2">
        <img src="${escape(data.image)}" class="w-8 h-8 rounded mr-3" />
        <div>
          <div class="font-medium">${escape(data.name)}</div>
          <div class="text-sm text-gray-500">฿${escape(data.price)}</div>
        </div>
      </div>`
    }
  }
})
```

### Event Handling

```javascript
const select = new TomSelect('#my-select')

// เมื่อมีการเพิ่มตัวเลือก
select.on('item_add', function(value, item) {
  console.log('เพิ่ม:', value)
})

// เมื่อมีการลบตัวเลือก  
select.on('item_remove', function(value, item) {
  console.log('ลบ:', value)
})

// เมื่อ dropdown เปิด/ปิด
select.on('dropdown_open', function() {
  console.log('เปิด dropdown')
})
```

## 📱 Responsive Design

Tom Select ทำงานได้ดีกับ Tailwind CSS responsive utilities:

```html
<select class="w-full sm:w-64 lg:w-96" id="responsive-select">
  <!-- options -->
</select>
```

## 🎯 ตัวอย่างโปรเจ็กต์ครบ

### โครงสร้างไฟล์

```
project/
├── index.html
├── src/
│   ├── main.js
│   └── styles/
│       └── tom-select-theme.css
├── package.json
└── vite.config.js
```

### index.html

```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tom Select + Tailwind Demo</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="/src/styles/tom-select-theme.css">
</head>
<body class="bg-gray-50 p-8">
    <div class="max-w-md mx-auto">
        <h1 class="text-2xl font-bold mb-6">Tom Select Demo</h1>
        
        <!-- Single Select -->
        <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
                เลือกประเทศ
            </label>
            <select id="country-select" placeholder="เลือกประเทศ...">
                <option value="">เลือกประเทศ...</option>
                <option value="TH">ประเทศไทย</option>
                <option value="US">สหรัฐอเมริกา</option>
                <option value="JP">ญี่ปุ่น</option>
            </select>
        </div>

        <!-- Multi Select -->  
        <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
                เลือกทักษะ (หลายรายการ)
            </label>
            <select id="skills-select" multiple placeholder="เลือกทักษะ...">
                <option value="js">JavaScript</option>
                <option value="py">Python</option>
                <option value="php">PHP</option>
                <option value="go">Go</option>
            </select>
        </div>
    </div>

    <script type="module" src="/src/main.js"></script>
</body>
</html>
```

### src/main.js

```javascript
import TomSelect from 'tom-select'

// Single select
new TomSelect('#country-select', {
  create: false,
  plugins: ['clear_button']
})

// Multi select with tags
new TomSelect('#skills-select', {
  create: true,
  createOnBlur: true,
  plugins: ['remove_button', 'clear_button']
})
```

### package.json

```json
{
  "name": "tom-select-tailwind-demo",
  "version": "1.0.0", 
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^4.0.0"
  },
  "dependencies": {
    "tom-select": "^2.4.3"
  }
}
```

## 📚 แหล่งข้อมูลเพิ่มเติม

### เว็บไซต์หลัก
- **Tom Select Official:** https://tom-select.js.org
- **Documentation:** https://tom-select.js.org/docs/
- **API Reference:** https://tom-select.js.org/docs/api/
- **Plugin Documentation:** https://tom-select.js.org/docs/plugins/

### Examples & Tutorials  
- **Basic Examples:** https://tom-select.js.org/examples/
- **GitHub Repository:** https://github.com/orchidjs/tom-select
- **Tailwind Theme Gist:** https://gist.github.com/cmer/4b750d921510bca27f003a20f0efb524

### Community Resources
- **GitHub Discussions:** https://github.com/orchidjs/tom-select/discussions
- **Tailwind Integration Examples:** https://github.com/orchidjs/tom-select/discussions/160
- **Stack Overflow:** ค้นหา "tom-select tailwind"

### Related Tools
- **Vite Documentation:** https://vitejs.dev/
- **Tailwind CSS:** https://tailwindcss.com/
- **Tailwind UI Components:** https://tailwindui.com/

## 🛠️ Tips & Troubleshooting

### ปัญหาที่พบบ่อย

1. **Tom Select ไม่แสดงผล**
   - ตรวจสอบว่า import CSS แล้ว
   - ตรวจสอบ element ID/class ถูกต้อง

2. **Tailwind styles ไม่ทำงาน**  
   - ใช้ `!important` หรือ `!` prefix
   - ตรวจสอบ CSS specificity

3. **Plugin ไม่ทำงาน**
   - ตรวจสอบการ import และ define plugin
   - ใช้ complete version หรือ import แยก

### Performance Tips

- ใช้ `tom-select.base.js` + plugins ที่ต้องการเท่านั้น
- ใช้ `loadThrottle` สำหรับ async loading
- จำกัด `maxOptions` สำหรับข้อมูลจำนวนมาก

---

*อัปเดตล่าสุด: สิงหาคม 2025*
*เขียนโดย: AI Research Agent*