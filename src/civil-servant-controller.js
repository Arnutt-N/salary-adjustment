// src/civil-servant-controller.js

/**
 * Initializes and manages the civil servant salary calculator form UI.
 * This controller handles radio button interactions and dynamic qualification loading.
 * @param {import('./civil-servant-calculator.js').default} calculator - An instance of the CivilServantCalculator.
 */
export async function initializeCivilServantController(calculator) {
  // 1. Load the calculator's data first
  const dataLoaded = await calculator.init()
  if (!dataLoaded) {
    alert("ไม่สามารถโหลดข้อมูลบัญชีเงินเดือนข้าราชการได้ โปรดลองอีกครั้ง")
    return
  }

  // 2. Get DOM elements
  const form = document.getElementById("salary-form")
  if (!form) {
    console.error("ไม่พบ form element #salary-form")
    return
  }

  const dateEffectiveSelect = document.getElementById("dateEffectiveSelect")
  const eduDomesticRadio = document.getElementById("eduDomestic")
  const eduForeignRadio = document.getElementById("eduForeign")
  const degreeSelect = document.getElementById("degreeSelect")
  const currentSalaryInput = document.getElementById("currentSalary")
  const currentSalaryLabel = document.getElementById("current-salary-label")
  const submitBtn = document.getElementById("calculate-btn")
  const clearBtn = document.getElementById("reset-btn")

  // Debug: Check if all elements exist
  const elements = {
    dateEffectiveSelect,
    eduDomesticRadio,
    eduForeignRadio,
    degreeSelect,
    currentSalaryInput,
    currentSalaryLabel,
    submitBtn,
    clearBtn
  }
  
  // Check for missing elements
  const missingElements = Object.entries(elements)
    .filter(([name, element]) => !element)
    .map(([name]) => name)
  
  if (missingElements.length > 0) {
    console.error("ไม่พบ element ที่จำเป็น:", missingElements.join(", "))
    return
  }

  // Result elements - Professional UI
  const resultDisplay = document.getElementById("result-display")
  const noAdjustmentDisplay = document.getElementById("no-adjustment-reason")

  /** Helper function to get selected institution type */
  function getSelectedInstitution() {
    if (eduDomesticRadio.checked) {
      return "ในประเทศ"
    } else if (eduForeignRadio.checked) {
      return "ต่างประเทศ"
    }
    return "ในประเทศ" // default
  }

  /** Helper function to populate degree dropdown */
  function populateDegreeSelect(qualifications) {
    // Clear existing options
    degreeSelect.innerHTML = ""
    
    // Create default option
    const defaultOption = document.createElement("option")
    defaultOption.value = ""
    defaultOption.disabled = true
    defaultOption.selected = true
    defaultOption.textContent = "เลือกวุฒิที่บรรจุ หรือวุฒิในตำแหน่งปัจจุบัน"
    degreeSelect.appendChild(defaultOption)
    
    // Add qualification options
    qualifications.forEach((qual) => {
      const optionEl = document.createElement("option")
      optionEl.value = qual.value
      optionEl.textContent = qual.text
      optionEl.title = qual.value // Full qualification name as tooltip
      degreeSelect.appendChild(optionEl)
    })
    
    degreeSelect.disabled = qualifications.length === 0
  }

  /** Updates salary label based on selected effective date */
  function updateSalaryLabel() {
    const dateEffective = dateEffectiveSelect.value
    const salaryLabelMap = {
      '1/5/2024': {
        label: 'อัตราเงินเดือน ณ 1 เมษายน 2567',
        placeholder: 'ระบุอัตราเงินเดือน ณ 1 เม.ย. 2567'
      },
      '1/5/2025': {
        label: 'อัตราเงินเดือน ณ 1 เมษายน 2568',
        placeholder: 'ระบุอัตราเงินเดือน ณ 1 เม.ย. 2568'
      }
    }

    if (dateEffective && salaryLabelMap[dateEffective]) {
      const config = salaryLabelMap[dateEffective]
      currentSalaryLabel.textContent = config.label
      currentSalaryInput.placeholder = config.placeholder
    } else {
      // Default label when no date is selected
      currentSalaryLabel.textContent = 'อัตราเงินเดือนปัจจุบัน'
      currentSalaryInput.placeholder = 'ระบุอัตราเงินเดือนปัจจุบัน'
    }
  }


  /** Updates degree dropdown based on selected date and institution */
  function updateDegreeDropdown() {
    const selectedDate = dateEffectiveSelect.value
    const selectedInstitution = getSelectedInstitution()
    
    if (!selectedDate) {
      degreeSelect.innerHTML = '<option value="" disabled selected>เลือกวันที่มีผลบังคับใช้ก่อน</option>'
      degreeSelect.disabled = true
      return
    }
    
    const qualifications = calculator.getQualificationsByInstitution(selectedDate, selectedInstitution)
    populateDegreeSelect(qualifications)
    
    // Update salary label when date changes
    updateSalaryLabel()
    
    // Show qualification count for debugging
    console.log(`พบคุณวุฒิ ${qualifications.length} รายการ สำหรับ ${selectedInstitution} วันที่ ${selectedDate}`)
  }

  /** Handles the calculation logic */
  function handleCalculation(event) {
    if (event) {
      event.preventDefault()
    }
    
    const formData = {
      effectiveDate: dateEffectiveSelect.value,
      eduInstitute: getSelectedInstitution(),
      qualification: degreeSelect.value,
      currentSalary: parseFloat(currentSalaryInput.value) || 0
    }

    // Validation
    if (!formData.effectiveDate) {
      alert("กรุณาเลือกวันที่มีผลบังคับใช้")
      return
    }
    
    if (!formData.qualification) {
      alert("กรุณาเลือกวุฒิการศึกษา")
      return
    }
    
    if (!formData.currentSalary || formData.currentSalary <= 0) {
      alert("กรุณากรอกอัตราเงินเดือนปัจจุบันที่ถูกต้อง")
      return
    }

    try {
      const result = calculator.calculate(formData)
      displayResult(result)
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการคำนวณ:", error)
      alert("เกิดข้อผิดพลาดในการคำนวณ กรุณาลองอีกครั้ง")
    }
  }

  /** Displays the calculation result with professional UI */
  function displayResult(result) {
    if (!result.success) {
      // Show error state
      resultDisplay.classList.add("hidden")
      noAdjustmentDisplay.classList.remove("hidden")
      
      const reasonText = document.getElementById("reason-text")
      if (reasonText) {
        reasonText.textContent = result.reason
      }
      return
    }

    // Show success state
    resultDisplay.classList.remove("hidden")
    noAdjustmentDisplay.classList.add("hidden")

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('th-TH', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount) + " บาท"
    }

    const formatPercentage = (percent) => {
      return new Intl.NumberFormat('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(percent) + "%"
    }

    // Calculate cost of living allowance
    const costOfLiving = Math.min(2000, Math.max(0, 14600 - result.newSalary))
    const totalSalaryWithCostOfLiving = result.newSalary + costOfLiving
    
    // Update main result values
    const resultAdjustment = document.getElementById("result-adjustment")
    const resultNewSalary = document.getElementById("result-new-salary")
    const resultPercentage = document.getElementById("result-percentage")
    const resultCurrentSalary = document.getElementById("result-current-salary")
    const resultCostLiving = document.getElementById("result-cost-living")
    const resultTotalSalary = document.getElementById("result-total-salary")

    if (resultAdjustment) resultAdjustment.textContent = formatCurrency(result.adjustment)
    if (resultNewSalary) resultNewSalary.textContent = formatCurrency(result.newSalary)
    if (resultPercentage) resultPercentage.textContent = formatPercentage(result.percentageIncrease)
    if (resultCurrentSalary) resultCurrentSalary.textContent = formatCurrency(result.currentSalary)
    if (resultCostLiving) resultCostLiving.textContent = formatCurrency(costOfLiving)
    if (resultTotalSalary) resultTotalSalary.textContent = formatCurrency(totalSalaryWithCostOfLiving)

    // Update calculation details section (removed salary range section as per PRP)

    // Update calculation details section - 2 column grid layout
    const detailCurrentSalary = document.getElementById("detail-current-salary")
    const detailSalaryRange = document.getElementById("detail-salary-range")
    const detailSalaryEarn = document.getElementById("detail-salary-earn")
    const detailSalaryLimit = document.getElementById("detail-salary-limit")
    const detailCostLiving = document.getElementById("detail-cost-living")
    const detailAdjustmentNet = document.getElementById("detail-adjustment-net")
    const detailNewSalary = document.getElementById("detail-new-salary")

    if (detailCurrentSalary) detailCurrentSalary.textContent = formatCurrency(result.currentSalary)
    if (detailSalaryRange) detailSalaryRange.textContent = `${result.salaryMin.toLocaleString('th-TH')} - ${result.salaryMax.toLocaleString('th-TH')} บาท`
    if (detailSalaryEarn) detailSalaryEarn.textContent = formatCurrency(result.salaryEarn)
    if (detailSalaryLimit) detailSalaryLimit.textContent = formatCurrency(result.salaryNewLimit)
    if (detailCostLiving) detailCostLiving.textContent = `${formatCurrency(costOfLiving)}`
    if (detailAdjustmentNet) detailAdjustmentNet.textContent = formatCurrency(result.adjustment)
    if (detailNewSalary) detailNewSalary.textContent = formatCurrency(result.newSalary)

    // Calculation method section now displays static formulas only
    // Dynamic calculation results removed as per user request

    // Update rules and conditions section with conditional logic
    const resultRemark = document.getElementById("result-remark")
    if (resultRemark) {
      const conditionText = result.adjustment > 0 
        ? "เป็นตามหลักเกณฑ์ เงื่อนไข และวิธีการปรับเงินเดือนเพิ่มขึ้นตามคุณวุฒิ"
        : "อัตราเงินเดือนปัจจุบัน และวุฒิในตำแหน่งปัจจุบัน ไม่ได้อยู่ในช่วงเงินเดือนที่ได้รับการปรับเงินเดือนเพิ่มขึ้นตามคุณวุฒิ"
      
      resultRemark.textContent = conditionText
    }
  }

  /** Resets the form and result display */
  function resetForm() {
    form.reset()
    
    // Reset dateEffective to default empty selection
    dateEffectiveSelect.value = ""
    
    // Reset radio buttons to default
    eduDomesticRadio.checked = true
    eduForeignRadio.checked = false
    
    // Reset degree dropdown
    degreeSelect.innerHTML = '<option value="" disabled selected>-- กรุณาเลือกวุฒิการศึกษา --</option>'
    degreeSelect.disabled = true
    
    // Reset salary input field
    currentSalaryInput.value = ""
    
    // Reset salary label to default
    updateSalaryLabel()
    
    // Reset result display to initial state
    resultDisplay.classList.remove("hidden")
    noAdjustmentDisplay.classList.add("hidden")
    
    // Reset all result values to "-"
    const resultElements = [
      "result-adjustment", "result-new-salary", "result-percentage", "result-current-salary",
      "result-cost-living", "result-total-salary",
      "detail-current-salary", "detail-salary-range", "detail-salary-earn", 
      "detail-salary-limit", "detail-cost-living", "detail-adjustment-net", "detail-new-salary"
    ]
    
    resultElements.forEach(elementId => {
      const element = document.getElementById(elementId)
      if (element) {
        element.textContent = "-"
      }
    })
    
    // Reset calculation method steps to default formulas
    const calculationMethodSteps = document.getElementById("calculation-method-steps")
    if (calculationMethodSteps) {
      calculationMethodSteps.innerHTML = `
        <div class="space-y-1">
          <div class="text-xs font-medium">• อัตราเงินเดือนที่ได้รับ = อัตราเงินเดือนปัจจุบัน + เงินที่ได้ปรับสุทธิ</div>
          <div class="text-xs">• หากอัตราเงินเดือนที่ได้รับ ไม่ถึง 14,600 บาท ให้ได้รับเงินเพิ่มการครองชีพ ไม่เกิน 2,000 บาท (รวมกับเงินเดือนแล้ว ไม่เกิน 14,600 บาท)</div>
        </div>
      `
    }
    
    // Reset remark
    const resultRemark = document.getElementById("result-remark")
    if (resultRemark) {
      resultRemark.textContent = "กรุณากรอกข้อมูลเพื่อเริ่มการคำนวณ"
    }
    
    console.log("รีเซ็ตฟอร์มเรียบร้อยแล้ว")
  }

  // 3. Setup Event Listeners
  
  // Date selection change
  dateEffectiveSelect.addEventListener("change", updateDegreeDropdown)
  
  // Institution type radio buttons
  eduDomesticRadio.addEventListener("change", updateDegreeDropdown)
  eduForeignRadio.addEventListener("change", updateDegreeDropdown)
  
  // Form submission
  form.addEventListener("submit", handleCalculation)
  
  // Reset button
  if (clearBtn) {
    clearBtn.addEventListener("click", function(event) {
      event.preventDefault()
      resetForm()
    })
  }
  
  // Form reset handler
  form.addEventListener("reset", function(event) {
    event.preventDefault()
    resetForm()
  })
  
  // Enter key handler for salary input
  currentSalaryInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      handleCalculation(event)
    }
  })

  // 4. Initialize UI state
  updateDegreeDropdown()
  
  console.log("🚀 Civil Servant Calculator Controller initialized successfully!")
}