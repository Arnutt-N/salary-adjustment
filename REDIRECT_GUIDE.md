# 🔄 Redirect Script Usage Guide

## 📋 วิธีการใช้งาน

### 1. เพิ่ม Script ในไฟล์ HTML

#### สำหรับ `index.html`:
เพิ่มโค้ดนี้ใน `<head>` section หรือก่อน `</body>`:

```html
<!-- Redirect Script -->
<script src="/src/redirect.js"></script>
```

#### สำหรับ `civil-servant.html`:
เพิ่มโค้ดเดียวกัน:

```html
<!-- Redirect Script -->
<script src="/src/redirect.js"></script>
```

### 2. การทำงาน

- ✅ **index.html** → redirect ไป **gov-emp.html**
- ✅ **civil-servant.html** → redirect ไป **gov-emp.html**  
- ✅ **gov-emp.html** → ไม่มี redirect (ทำงานปกติ)
- ✅ **coming-soon.html** → ไม่มี redirect (ทำงานปกติ)

### 3. ฟีเจอร์

- 🚀 **Instant Redirect**: redirect ทันทีเมื่อโหลดหน้า
- 🔧 **Configurable**: สามารถปรับแต่งได้
- 🐛 **Debug Mode**: แสดง console message
- 📱 **Browser Friendly**: ใช้ `replace()` ไม่เพิ่ม history
- ⚡ **Non-blocking**: ไม่กระทบโค้ดอื่น

### 4. การปรับแต่ง (Optional)

```javascript
// เปลี่ยนการตั้งค่า
window.SalaryRedirect.config({
    delay: 1000,           // หน่วงเวลา 1 วินาที
    showDebugMessage: false, // ปิด debug message
    targetPage: 'other.html' // เปลี่ยนหน้าปลายทาง
});

// Force redirect (ถ้าต้องการ)
window.SalaryRedirect.forceRedirect();
```

### 5. การทดสอบ

1. เปิด **index.html** → ควร redirect ไป **gov-emp.html**
2. เปิด **civil-servant.html** → ควร redirect ไป **gov-emp.html**  
3. เปิด **gov-emp.html** → ทำงานปกติ (ไม่ redirect)
4. ดู Console เพื่อดู debug message

## ⚠️ หมายเหตุ

- Script นี้ทำงานแยกจากโค้ดหลัก ไม่กระทบการทำงานของระบบเดิม
- ใช้ `window.location.replace()` เพื่อไม่ให้ผู้ใช้กดปุ่ม Back กลับมาหน้าเดิม
- รองรับทั้ง root path (`/`) และ filename path
