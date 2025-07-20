import "./style.css"
import "./inline-components.js"
import SalaryCalculator from "./salary-calculator.js"
import { initializeFormController } from "./form-controller.js"

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 DOM Content Loaded - Starting initialization") // Debug log
  
  // 1. สร้าง Calculator สำหรับ "พนักงานราชการ" โดยระบุไฟล์ JSON ที่ถูกต้อง
  // Vite จะจัดการ path ของไฟล์ JSON ใน public directory ให้เอง
  const govEmpCalculator = new SalaryCalculator("/data/salaryGovEmp.json")
  console.log("📊 Calculator created:", govEmpCalculator) // Debug log

  // 2. ส่ง Calculator ที่สร้างขึ้นไปให้ Form Controller จัดการ UI
  console.log("🎮 Initializing Form Controller") // Debug log
  initializeFormController(govEmpCalculator)
})
