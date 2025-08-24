import "./style.css"
import "./inline-components.js"
import SalaryCalculator from "./salary-calculator.js"
import CivilServantCalculator from "./civil-servant-calculator.js"
import { initializeFormController } from "./form-controller.js"
import { initializeCivilServantController } from "./civil-servant-controller.js"

/**
 * Get current page filename
 */
function getCurrentPageName() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';
  return filename;
}

/**
 * Initialize appropriate calculator based on current page
 */
async function initializePageCalculator() {
  const currentPage = getCurrentPageName();
  
  try {
    // Check which page we're on and initialize the appropriate calculator
    if (currentPage === 'civil-servant.html') {
      // Initialize Civil Servant Calculator
      console.log('🏛️ Initializing Civil Servant Calculator...');
      const civilServantCalculator = new CivilServantCalculator("/data/salaryCivilServant.json");
      await initializeCivilServantController(civilServantCalculator);
      console.log('✅ Civil Servant Calculator initialized successfully!');
      
    } else if (currentPage === 'gov-emp.html' || currentPage === 'index.html') {
      // Initialize Government Employee Calculator (default)
      console.log('👔 Initializing Government Employee Calculator...');
      const govEmpCalculator = new SalaryCalculator("/data/salaryGovEmp.json");
      await initializeFormController(govEmpCalculator);
      console.log('✅ Government Employee Calculator initialized successfully!');
      
    } else {
      // Unknown page - try to detect based on DOM elements
      console.log('❓ Unknown page, detecting calculator type from DOM elements...');
      
      // Check for civil servant form elements
      const civilServantForm = document.getElementById("salaryCalcForm");
      const institutionRadios = document.querySelector('input[name="eduInstitute"]');
      
      if (civilServantForm && institutionRadios) {
        console.log('🏛️ Detected Civil Servant form elements, initializing Civil Servant Calculator...');
        const civilServantCalculator = new CivilServantCalculator("/data/salaryCivilServant.json");
        await initializeCivilServantController(civilServantCalculator);
        console.log('✅ Civil Servant Calculator initialized successfully!');
      } else {
        // Default to government employee calculator
        console.log('👔 Defaulting to Government Employee Calculator...');
        const govEmpCalculator = new SalaryCalculator("/data/salaryGovEmp.json");
        await initializeFormController(govEmpCalculator);
        console.log('✅ Government Employee Calculator initialized successfully!');
      }
    }
    
  } catch (error) {
    console.error('❌ Failed to initialize calculator:', error);
    alert('เกิดข้อผิดพลาดในการโหลดระบบคำนวณ กรุณาโหลดหน้าใหม่');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log(`📄 Loading page: ${getCurrentPageName()}`);
  initializePageCalculator();
});
