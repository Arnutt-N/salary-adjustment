// src/salary-calculator.js

/**
 * A class to handle fetching, querying, and calculating government employee salaries.
 */
class SalaryCalculator {
  /**
   * @param {string} dataUrl - The URL to the salary data JSON file.
   */
  constructor(dataUrl = "/data/salaryGovEmp.json") {
    this.dataUrl = dataUrl
    this.salaryData = [] // This will store the data from JSON
  }

  /**
   * Fetches and loads the salary data. Must be called before any other methods.
   * @returns {Promise<boolean>} - True if data was loaded successfully, otherwise false.
   */
  async init() {
    try {
      const response = await fetch(this.dataUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      this.salaryData = await response.json()
      console.log("Salary data loaded successfully.")
      return true
    } catch (error) {
      console.error("Failed to load salary data:", error)
      this.salaryData = []
      return false
    }
  }

  /**
   * Gets a unique and custom-sorted list of work groups.
   * @returns {string[]} An array of work group names.
   */
  getWorkGroups() {
    if (!this.salaryData.length) return []

    // Define the custom sort order as requested
    const customOrder = [
      "กลุ่มงานบริการ",
      "กลุ่มงานเทคนิคทั่วไป",
      "กลุ่มงานเทคนิคพิเศษ",
      "กลุ่มงานบริหารทั่วไป",
      "กลุ่มงานวิชาชีพเฉพาะ",
    ]

    // Get unique work groups from the data
    const workGroups = [
      ...new Set(this.salaryData.map((item) => item.workGroup)),
    ]

    // Sort the groups based on the custom order
    workGroups.sort((a, b) => {
      const indexA = customOrder.indexOf(a)
      const indexB = customOrder.indexOf(b)
      // If an item is not in the custom order, push it to the end
      if (indexA === -1) return 1
      if (indexB === -1) return -1
      return indexA - indexB
    })

    return workGroups
  }

  /**
   * Gets a list of degrees for a given work group and effective date.
   * @param {string} workGroup - The selected work group.
   * @param {string} effectiveDate - The selected effective date (e.g., "1/5/2024").
   * @returns {object[]} An array of degree objects, each with a unique ID and the full degree text.
   */
  getDegreesByWorkGroup(workGroup, effectiveDate) {
    if (!this.salaryData.length || !workGroup || !effectiveDate) return []

    return this.salaryData
      .filter(
        (item) =>
          item.workGroup === workGroup && item.dateEffective === effectiveDate
      )
      .map((item) => ({
        id: item.id, // The unique ID for this specific rule
        degreeFull: item.degreeFull,
      }))
  }

  /**
   * Main calculation logic based on the provided formula.
   * @param {object} formData - An object with data from the form.
   * @returns {object} An object with the calculation result.
   */
  calculate(formData) {
    console.log("Calculating with latest corrected logic:", formData)

    if (!this.salaryData.length) {
      return { success: false, reason: "ยังไม่ได้โหลดข้อมูลบัญชีเงินเดือน" }
    }

    // Find the matching rule from JSON data
    const rule = this.salaryData.find((item) => item.id === formData.degreeId)
    if (!rule) {
      return {
        success: false,
        reason: "ไม่พบหลักเกณฑ์ที่ตรงกับวุฒิการศึกษาที่เลือก",
      }
    }

    const { salaryNew, salaryLast, salaryMax, salaryRate } = rule
    const { currentSalary } = formData

    // 1. Calculate the initial compensation and round it up to the nearest 10.
    const salary_increase_raw = salaryRate * (currentSalary - salaryLast)
    const salary_increase_rounded = Math.ceil(salary_increase_raw / 10) * 10

    // 2. Calculate the provisional new salary based on the formula.
    const salary_adjust_provisional = salaryNew + salary_increase_rounded

    // 3. Determine the final salary by applying caps and floors.
    let salary_adjust_capped
    let remark = "ปรับค่าตอบแทนตามหลักเกณฑ์ปกติ"

    if (salary_adjust_provisional <= currentSalary) {
      salary_adjust_capped = currentSalary
      remark =
        "กรณีที่คำนวณแล้ว อัตราค่าตอบแทนใหม่ได้น้อยกว่าหรือเท่ากับค่าตอบแทนปัจจุบัน จะไม่ได้รับเงินชดเชย และจะได้รับค่าตอบแทนตามที่ได้รับอยู่ในปัจจุบัน"
    } else if (salary_adjust_provisional > salaryMax) {
      salary_adjust_capped = salaryMax
      remark =
        "เงินชดเชยที่ได้รับเมื่อรวมกับค่าตอบแทนแล้ว จะต้องไม่เกินกว่าอัตราค่าตอบแทนขั้นสูงของบัญชีกลุ่มงาน"
    } else {
      salary_adjust_capped = salary_adjust_provisional
    }

    // 4. Calculate the final increase amount from the capped salary.
    let salary_increase_final = salary_adjust_capped - currentSalary
    if (salary_increase_final < 0) {
      salary_increase_final = 0
    }

    // 5. IMPORTANT: The actual increase amount must be a multiple of 10.
    // We use Math.floor to ensure the new salary never exceeds the capped salary.
    salary_increase_final = Math.floor(salary_increase_final / 10) * 10

    // 6. The final salary is the current salary plus the final, rounded increase.
    const salary_adjust_final = currentSalary + salary_increase_final

    // 7. Return the comprehensive result object.
    return {
      success: true,
      newSalary: salary_adjust_final, // ค่าตอบแทนใหม่ (สุดท้าย)
      increase: salary_increase_final, // เงินชดเชยที่จะได้รับ (สุดท้าย)
      remark: remark,
      // Intermediate values for detailed display
      currentSalary: currentSalary,
      salaryLast: salaryLast,
      salaryNew: salaryNew,
      salaryIncreaseRounded: salary_increase_rounded, // "เงินชดเชย (คำนวณ)"
      salaryAdjust: salary_adjust_provisional, // "ค่าตอบแทนใหม่ (คำนวณ)"
    }
  }
}

// Export the class to make it available for other files to import
export default SalaryCalculator
