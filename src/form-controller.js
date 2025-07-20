// src/form-controller.js

/**
 * Initializes and manages the salary calculator form UI.
 * This controller is reusable for any calculator instance.
 * @param {import('./salary-calculator.js').default} calculator - An instance of the SalaryCalculator.
 */
export async function initializeFormController(calculator) {
  console.log("Form Controller initialization started")
  
  // 1. Load the calculator's data first
  console.log("Loading calculator data...")
  const dataLoaded = await calculator.init()
  if (!dataLoaded) {
    console.error("Failed to load calculator data")
    alert("ไม่สามารถโหลดข้อมูลบัญชีเงินเดือนได้ โปรดลองอีกครั้ง")
    return
  }
  console.log("Calculator data loaded successfully")

  // 2. Get DOM elements
  const form = document.getElementById("salary-form")
  if (!form) {
    console.error("Form element not found")
    return
  }
  console.log("Form element found:", form)

  const effectiveDateSelect = document.getElementById("effectiveDate")
  const workGroupSelect = document.getElementById("workGroup")
  const degreeSelect = document.getElementById("degree")
  const currentSalaryInput = document.getElementById("currentSalary")
  const salaryLabel = document.getElementById("current-salary-label")
  const calculateBtn = document.getElementById("calculate-btn")

  // Debug: Check if all elements exist
  const elements = {
    effectiveDateSelect,
    workGroupSelect,
    degreeSelect,
    currentSalaryInput,
    salaryLabel,
    calculateBtn
  }
  
  console.log("DOM Elements found:", elements)
  
  // Check for missing elements
  const missingElements = Object.entries(elements)
    .filter(([name, element]) => !element)
    .map(([name]) => name)
  
  if (missingElements.length > 0) {
    console.error("Missing DOM elements:", missingElements)
    alert("ไม่พบ element ที่จำเป็น: " + missingElements.join(", "))
    return
  }

  // Result elements
  const resultDisplay = document.getElementById("result-display")
  const noAdjustmentDisplay = document.getElementById("no-adjustment-reason")
  const resultIncreaseEl = document.getElementById("result-increase")
  const resultNewSalaryEl = document.getElementById("result-new-salary")
  const resultTempAllowanceEl = document.getElementById("result-temp-allowance")
  const resultTotalSalaryEl = document.getElementById("result-total-salary")
  const reasonTextEl = document.getElementById("reason-text")
  const resultRemarkEl = document.getElementById("result-remark")

  // Detailed result elements
  const detailCurrentSalaryEl = document.getElementById("detail-current-salary")
  const detailSalaryLastEl = document.getElementById("detail-salary-last")
  const detailSalaryNewEl = document.getElementById("detail-salary-new")
  const detailIncreaseRoundedEl = document.getElementById("detail-increase-rounded")
  const detailSalaryAdjustEl = document.getElementById("detail-salary-adjust")
  const detailTempAllowanceEl = document.getElementById("detail-temp-allowance")

  /** Helper function to populate a select dropdown */
  function populateSelect(selectElement, options, placeholder, values = null) {
    // Clear existing options
    selectElement.innerHTML = ""
    
    // Create default option
    const defaultOption = document.createElement("option")
    defaultOption.value = ""
    defaultOption.disabled = true
    defaultOption.selected = true
    defaultOption.textContent = "-- กรุณาเลือก" + placeholder + " --"
    selectElement.appendChild(defaultOption)
    
    // Add other options
    options.forEach((option, index) => {
      const optionEl = document.createElement("option")
      optionEl.textContent = option
      optionEl.title = option
      optionEl.value = values ? values[index] : option
      selectElement.appendChild(optionEl)
    })
  }

  /** Updates UI elements based on form changes */
  function updateUI() {
    // Update salary label text
    const dateText = effectiveDateSelect.value.includes("2024") ? "2566" : "2567"
    salaryLabel.textContent = "ค่าตอบแทนปัจจุบัน ณ วันที่ 1 ตุลาคม " + dateText

    // Update degrees dropdown
    const selectedGroup = workGroupSelect.value
    const selectedDate = effectiveDateSelect.value
    const degrees = calculator.getDegreesByWorkGroup(selectedGroup, selectedDate)

    populateSelect(
      degreeSelect,
      degrees.map((d) => d.degreeFull),
      "วุฒิการศึกษา",
      degrees.map((d) => d.id)
    )

    degreeSelect.disabled = !selectedGroup
  }

  /** Handles the calculation logic */
  function handleCalculation(event) {
    if (event) {
      event.preventDefault()
    }
    
    console.log("handleCalculation called")
    
    if (!effectiveDateSelect || !degreeSelect || !currentSalaryInput) {
      console.error("Form elements not found")
      alert("เกิดข้อผิดพลาดในระบบ กรุณาโหลดหน้าใหม่")
      return
    }
    
    const formData = {
      effectiveDate: effectiveDateSelect.value,
      degreeId: parseInt(degreeSelect.value),
      currentSalary: parseFloat(currentSalaryInput.value) || 0,
    }

    console.log("Form data:", formData)

    if (!formData.effectiveDate) {
      console.log("Validation failed: No effective date")
      alert("กรุณาเลือกวันที่มีผลบังคับใช้")
      return
    }
    
    if (!formData.degreeId || isNaN(formData.degreeId)) {
      console.log("Validation failed: No degree selected")
      alert("กรุณาเลือกวุฒิการศึกษา")
      return
    }
    
    if (!formData.currentSalary || formData.currentSalary <= 0) {
      console.log("Validation failed: Invalid current salary")
      alert("กรุณากรอกค่าตอบแทนปัจจุบันที่ถูกต้อง")
      return
    }

    console.log("Calling calculator.calculate")
    
    try {
      const result = calculator.calculate(formData)
      console.log("Calculation result:", result)
      displayResult(result)
    } catch (error) {
      console.error("Calculation error:", error)
      alert("เกิดข้อผิดพลาดในการคำนวณ กรุณาลองอีกครั้ง")
    }
  }

  /** Displays the calculation result on the card */
  function displayResult(result) {
    console.log("displayResult called with:", result)
    
    const resultRemarkEl = document.getElementById("result-remark")

    if (result.success) {
      console.log("Displaying successful result")
      resultDisplay.classList.remove("hidden")
      noAdjustmentDisplay.classList.add("hidden")

      const optionsNoDecimal = { maximumFractionDigits: 0 }

      // Final results
      if (resultIncreaseEl) {
        resultIncreaseEl.textContent = result.increase.toLocaleString("th-TH", optionsNoDecimal) + " บาท"
      }
      
      if (resultNewSalaryEl) {
        resultNewSalaryEl.textContent = result.newSalary.toLocaleString("th-TH", optionsNoDecimal) + " บาท"
      }
      
      if (resultTempAllowanceEl) {
        resultTempAllowanceEl.textContent = result.salaryTempAllowance.toLocaleString("th-TH", optionsNoDecimal) + " บาท"
      }
      
      if (resultTotalSalaryEl) {
        resultTotalSalaryEl.textContent = result.salaryAdjustTotal.toLocaleString("th-TH", optionsNoDecimal) + " บาท"
      }

      // Detailed breakdown
      if (detailCurrentSalaryEl) {
        detailCurrentSalaryEl.textContent = result.currentSalary.toLocaleString("th-TH", optionsNoDecimal) + " บาท"
      }
      
      if (detailSalaryLastEl) {
        detailSalaryLastEl.textContent = result.salaryLast.toLocaleString("th-TH", optionsNoDecimal) + " บาท"
      }
      
      if (detailSalaryNewEl) {
        detailSalaryNewEl.textContent = result.salaryNew.toLocaleString("th-TH", optionsNoDecimal) + " บาท"
      }
      
      if (detailIncreaseRoundedEl) {
        detailIncreaseRoundedEl.textContent = result.salaryIncreaseRounded.toLocaleString("th-TH", optionsNoDecimal) + " บาท"
      }
      
      if (detailSalaryAdjustEl) {
        detailSalaryAdjustEl.textContent = result.salaryAdjust.toLocaleString("th-TH", optionsNoDecimal) + " บาท"
      }
      
      if (detailTempAllowanceEl) {
        detailTempAllowanceEl.textContent = result.salaryTempAllowance.toLocaleString("th-TH", optionsNoDecimal) + " บาท"
      }

      if (resultRemarkEl) {
        resultRemarkEl.textContent = result.remark
      }
    } else {
      console.log("Displaying error result")
      resultDisplay.classList.add("hidden")
      noAdjustmentDisplay.classList.remove("hidden")
      reasonTextEl.textContent = result.reason
      resultRemarkEl.textContent = "กรุณากรอกข้อมูลเพื่อเริ่มการคำนวณ"
    }
  }

  /** Resets the form and result card to initial state */
  function resetForm() {
    form.reset()
    
    // Reset degree select using simple method
    degreeSelect.innerHTML = ""
    const option = document.createElement("option")
    option.value = ""
    option.disabled = true
    option.selected = true
    option.textContent = "-- กรุณาเลือกวุฒิการศึกษา --"
    degreeSelect.appendChild(option)
    degreeSelect.disabled = true

    resultDisplay.classList.remove("hidden")
    noAdjustmentDisplay.classList.add("hidden")

    // Reset final results
    resultIncreaseEl.textContent = "-"
    resultNewSalaryEl.textContent = "-"
    resultTempAllowanceEl.textContent = "-"
    resultTotalSalaryEl.textContent = "-"

    // Reset detailed breakdown
    detailCurrentSalaryEl.textContent = "-"
    detailSalaryLastEl.textContent = "-"
    detailSalaryNewEl.textContent = "-"
    detailIncreaseRoundedEl.textContent = "-"
    detailSalaryAdjustEl.textContent = "-"
    detailTempAllowanceEl.textContent = "-"

    // Reset remark
    document.getElementById("result-remark").textContent = "กรุณากรอกข้อมูลเพื่อเริ่มการคำนวณ"
  }

  // 3. Setup Event Listeners
  effectiveDateSelect.addEventListener("change", updateUI)
  workGroupSelect.addEventListener("change", updateUI)
  calculateBtn.addEventListener("click", handleCalculation)
  
  // Add form submission handler for Enter key
  form.addEventListener("submit", handleCalculation)
  
  // Add Enter key handler for input field
  currentSalaryInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      handleCalculation(event)
    }
  })
  
  form.addEventListener("reset", resetForm)

  // 4. Populate initial dropdown (Work Groups) and run initial UI update
  const workGroups = calculator.getWorkGroups()
  populateSelect(workGroupSelect, workGroups, "กลุ่มงาน")
  updateUI()
}
