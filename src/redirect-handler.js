// src/redirect-handler.js
// ระบบจัดการ redirect สำหรับหน้าต่างๆ

/**
 * Auto redirect จากหน้าปัจจุบันไป gov-emp.html
 * @param {number} delay - ระยะเวลาหน่วงก่อน redirect (milliseconds)
 * @param {boolean} showProgress - แสดง progress bar หรือไม่
 */
export function autoRedirectToGovEmp(delay = 2000, showProgress = true) {
  console.log('🔄 Auto redirect to gov-emp.html initiated')
  
  // ถ้าอยู่ในหน้า gov-emp.html แล้ว ไม่ต้อง redirect
  if (window.location.pathname.includes('gov-emp.html')) {
    console.log('✅ Already on gov-emp.html, no redirect needed')
    return
  }

  let countdown = Math.ceil(delay / 1000) // แปลงเป็นวินาที
  
  // อัปเดตข้อความ countdown
  function updateCountdown() {
    const noticeElements = document.querySelectorAll('[data-redirect-notice]')
    noticeElements.forEach(element => {
      if (countdown > 0) {
        element.textContent = `กำลังเปลี่ยนเส้นทางไปยังระบบคำนวณค่าตอบแทนในอีก ${countdown} วินาที...`
      } else {
        element.textContent = 'กำลังเปลี่ยนเส้นทาง...'
      }
    })
  }

  // เริ่ม countdown
  const countdownInterval = setInterval(() => {
    countdown--
    updateCountdown()
    
    if (countdown <= 0) {
      clearInterval(countdownInterval)
    }
  }, 1000)

  // อัปเดตข้อความเริ่มต้น
  updateCountdown()

  // ตั้งเวลา redirect
  const redirectTimer = setTimeout(() => {
    console.log('🚀 Redirecting to gov-emp.html')
    window.location.href = 'gov-emp.html'
  }, delay)

  // คืนค่า function สำหรับยกเลิก redirect
  return {
    cancel: () => {
      clearTimeout(redirectTimer)
      clearInterval(countdownInterval)
      console.log('❌ Redirect cancelled')
      
      // อัปเดตข้อความ
      const noticeElements = document.querySelectorAll('[data-redirect-notice]')
      noticeElements.forEach(element => {
        element.textContent = 'การเปลี่ยนเส้นทางถูกยกเลิก'
      })
    }
  }
}

/**
 * เพิ่มปุ่มยกเลิก redirect
 * @param {Object} redirectController - Object ที่ได้จาก autoRedirectToGovEmp()
 */
export function addCancelButton(redirectController) {
  const containers = document.querySelectorAll('[data-redirect-container]')
  
  containers.forEach(container => {
    // ตรวจสอบว่ามีปุ่มอยู่แล้วหรือไม่
    if (container.querySelector('[data-cancel-redirect]')) {
      return
    }

    const cancelButton = document.createElement('button')
    cancelButton.className = 'mt-3 px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors'
    cancelButton.textContent = 'ยกเลิกการเปลี่ยนเส้นทาง'
    cancelButton.setAttribute('data-cancel-redirect', 'true')
    
    cancelButton.addEventListener('click', () => {
      if (redirectController && redirectController.cancel) {
        redirectController.cancel()
        cancelButton.textContent = 'ยกเลิกแล้ว'
        cancelButton.disabled = true
        cancelButton.className = 'mt-3 px-4 py-2 text-sm bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed'
      }
    })

    container.appendChild(cancelButton)
  })
}

/**
 * ฟังก์ชันสำหรับ manual redirect
 */
export function manualRedirectToGovEmp() {
  console.log('🎯 Manual redirect to gov-emp.html')
  window.location.href = 'gov-emp.html'
}

// ส่งออกเป็น default สำหรับใช้งานง่าย
export default {
  autoRedirectToGovEmp,
  addCancelButton,
  manualRedirectToGovEmp
}
