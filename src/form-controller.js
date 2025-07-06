// src/form-controller.js

/**
 * Initializes and manages the salary calculator form UI.
 * This controller is reusable for any calculator instance.
 * @param {import('./salary-calculator.js').default} calculator - An instance of the SalaryCalculator.
 */
export async function initializeFormController(calculator) {
  // 1. Load the calculator's data first
  const dataLoaded = await calculator.init()
  if (!dataLoaded) {
    alert("ไม่สามารถโหลดข้อมูลบัญชีเงินเดือนได้ โปรดลองอีกครั้ง")
    return
  }

  // 2. Get DOM elements
  const form = document.getElementById("salary-form")
  if (!form) return // Exit if the form doesn't exist on the page

  const effectiveDateSelect = document.getElementById("effectiveDate")
  const workGroupSelect = document.getElementById("workGroup")
  const degreeSelect = document.getElementById("degree")
  const currentSalaryInput = document.getElementById("currentSalary")
  const salaryLabel = document.getElementById("current-salary-label")
  const calculateBtn = document.getElementById("calculate-btn")

  // Result elements
  const resultDisplay = document.getElementById("result-display")
  const noAdjustmentDisplay = document.getElementById("no-adjustment-reason")
  const resultIncreaseEl = document.getElementById("result-increase")
  const resultNewSalaryEl = document.getElementById("result-new-salary")
  const reasonTextEl = document.getElementById("reason-text")
  const calculationMethodBox = document.getElementById("calculation-method")

  // Detailed result elements
  const detailCurrentSalaryEl = document.getElementById("detail-current-salary")
  const detailSalaryLastEl = document.getElementById("detail-salary-last")
  const detailSalaryNewEl = document.getElementById("detail-salary-new")
  const detailIncreaseRoundedEl = document.getElementById(
    "detail-increase-rounded"
  )
  const detailSalaryAdjustEl = document.getElementById("detail-salary-adjust")

  /** Helper function to populate a select dropdown */
  function populateSelect(selectElement, options, placeholder, values = null) {
    selectElement.innerHTML = `<option value="" disabled selected>-- กรุณาเลือก${placeholder} --</option>`
    options.forEach((option, index) => {
      const optionEl = document.createElement("option")
      optionEl.textContent = option // Text shown in dropdown
      optionEl.title = option // Full text shown on hover
      optionEl.value = values ? values[index] : option
      selectElement.appendChild(optionEl)
    })
  }

  /** Updates UI elements based on form changes */
  function updateUI() {
    // Update salary label text
    const dateText = effectiveDateSelect.value.includes("2024")
      ? "2566"
      : "2567"
    salaryLabel.textContent = `ค่าตอบแทนปัจจุบัน ณ วันที่ 1 ตุลาคม ${dateText}`

    // Update degrees dropdown
    const selectedGroup = workGroupSelect.value
    const selectedDate = effectiveDateSelect.value
    const degrees = calculator.getDegreesByWorkGroup(
      selectedGroup,
      selectedDate
    )

    populateSelect(
      degreeSelect,
      degrees.map((d) => d.degreeFull),
      "วุฒิการศึกษา",
      degrees.map((d) => d.id)
    )
    degreeSelect.disabled = !selectedGroup
  }

  /** Handles the calculation logic */
  function handleCalculation() {
    const formData = {
      effectiveDate: effectiveDateSelect.value,
      degreeId: parseInt(degreeSelect.value),
      currentSalary: parseFloat(currentSalaryInput.value) || 0,
    }

    if (!formData.degreeId || !formData.currentSalary) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน")
      return
    }

    const result = calculator.calculate(formData)
    displayResult(result)
  }

  /** Displays the calculation result on the card */
  function displayResult(result) {
    const resultRemarkEl = document.getElementById("result-remark")

    if (result.success) {
      resultDisplay.classList.remove("hidden")
      noAdjustmentDisplay.classList.add("hidden")
      calculationMethodBox.classList.remove("hidden")

      // Formatting options for displaying numbers as whole numbers (integers)
      const optionsNoDecimal = { maximumFractionDigits: 0 }

      // Final results
      resultIncreaseEl.textContent = `+${result.increase.toLocaleString(
        "th-TH",
        optionsNoDecimal
      )} บาท`
      resultNewSalaryEl.textContent = `${result.newSalary.toLocaleString(
        "th-TH",
        optionsNoDecimal
      )} บาท`

      // Detailed breakdown
      detailCurrentSalaryEl.textContent = `${result.currentSalary.toLocaleString(
        "th-TH",
        optionsNoDecimal
      )} บาท`
      detailSalaryLastEl.textContent = `${result.salaryLast.toLocaleString(
        "th-TH",
        optionsNoDecimal
      )} บาท`
      detailSalaryNewEl.textContent = `${result.salaryNew.toLocaleString(
        "th-TH",
        optionsNoDecimal
      )} บาท`
      detailIncreaseRoundedEl.textContent = `${result.salaryIncreaseRounded.toLocaleString(
        "th-TH",
        optionsNoDecimal
      )} บาท`
      detailSalaryAdjustEl.textContent = `${result.salaryAdjust.toLocaleString(
        "th-TH",
        optionsNoDecimal
      )} บาท`

      resultRemarkEl.textContent = result.remark
    } else {
      resultDisplay.classList.add("hidden")
      noAdjustmentDisplay.classList.remove("hidden")
      calculationMethodBox.classList.add("hidden") // Hide method box on failure
      reasonTextEl.textContent = result.reason
      resultRemarkEl.textContent = "กรุณากรอกข้อมูลเพื่อเริ่มการคำนวณ" // Reset remark on failure
    }
  }

  /** Resets the form and result card to initial state */
  function resetForm() {
    form.reset()
    degreeSelect.innerHTML =
      '<option value="" disabled selected>-- กรุณาเลือกวุฒิการศึกษา --</option>'
    degreeSelect.disabled = true

    resultDisplay.classList.remove("hidden")
    noAdjustmentDisplay.classList.add("hidden")
    calculationMethodBox.classList.remove("hidden")

    // Reset final results
    resultIncreaseEl.textContent = "-"
    resultNewSalaryEl.textContent = "-"

    // Reset detailed breakdown
    detailCurrentSalaryEl.textContent = "-"
    detailSalaryLastEl.textContent = "-"
    detailSalaryNewEl.textContent = "-"
    detailIncreaseRoundedEl.textContent = "-"
    detailSalaryAdjustEl.textContent = "-"

    // Reset remark
    document.getElementById("result-remark").textContent =
      "กรุณากรอกข้อมูลเพื่อเริ่มการคำนวณ"
  }

  // 3. Setup Event Listeners
  effectiveDateSelect.addEventListener("change", updateUI)
  workGroupSelect.addEventListener("change", updateUI)
  calculateBtn.addEventListener("click", handleCalculation)
  form.addEventListener("reset", resetForm)

  // 4. Populate initial dropdown (Work Groups) and run initial UI update
  const workGroups = calculator.getWorkGroups()
  populateSelect(workGroupSelect, workGroups, "กลุ่มงาน")
  updateUI()
}
