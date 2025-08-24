// src/civil-servant-calculator.js

/**
 * Civil Servant Salary Calculator - Enhanced for Institution Type Filtering
 * Based on examples/new-salary-2025/ implementation with 814+ salary records
 * Supports ในประเทศ (577 records) and ต่างประเทศ (237 records) filtering
 */
class CivilServantCalculator {
  /**
   * @param {string} dataUrl - The URL to the civil servant salary data JSON file.
   */
  constructor(dataUrl = "/data/salaryCivilServant.json") {
    this.dataUrl = dataUrl
    this.salaryData = [] // Will store the 814+ salary records
    this.cache = new Map() // Cache for filtered results
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
      console.log(`✅ Loaded ${this.salaryData.length} civil servant salary records`)
      return true
    } catch (error) {
      console.error("❌ Failed to load civil servant salary data:", error)
      this.salaryData = []
      return false
    }
  }

  /**
   * Gets filtered salary data based on effective date and institution type
   * @param {string} dateEffective - Effective date (e.g., "1/5/2024")
   * @param {string} eduInstitute - Institution type ("ในประเทศ" or "ต่างประเทศ")
   * @returns {object[]} Filtered salary records
   */
  getFilteredData(dateEffective, eduInstitute) {
    const cacheKey = `${dateEffective}_${eduInstitute}`
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const filtered = this.salaryData.filter(record => 
      record.dateEffective === dateEffective &&
      record.eduInstitute === eduInstitute
    )

    this.cache.set(cacheKey, filtered)
    return filtered
  }

  /**
   * Gets unique qualifications by institution type for dropdown population
   * @param {string} dateEffective - Effective date
   * @param {string} eduInstitute - Institution type
   * @returns {object[]} Array of unique qualification objects
   */
  getQualificationsByInstitution(dateEffective, eduInstitute) {
    const filtered = this.getFilteredData(dateEffective, eduInstitute)
    
    // Create unique qualifications using degreeFull as the key
    const uniqueMap = new Map()
    filtered.forEach(item => {
      if (!uniqueMap.has(item.degreeFull)) {
        uniqueMap.set(item.degreeFull, {
          value: item.degreeFull,
          text: item.degree,
          short: item.degreeShort,
          docNo: item.docNo,
          order: item.order,
          id: item.id
        })
      }
    })
    
    // Convert map to array and sort by document structure
    const unique = Array.from(uniqueMap.values())
    return unique.sort((a, b) => {
      // First sort by docNo (document number)
      if (a.docNo !== b.docNo) {
        return a.docNo - b.docNo
      }
      // Then sort by order within the same document
      if (a.order !== b.order) {
        return a.order - b.order
      }
      // Finally sort by ID as tiebreaker
      return a.id - b.id
    })
  }

  /**
   * Main calculation logic for civil servant salary adjustments
   * Based on examples/new-salary-2025/script.js reference implementation
   * @param {object} formData - Form data with effectiveDate, eduInstitute, qualification, currentSalary
   * @returns {object} Calculation result object
   */
  calculate(formData) {
    if (!this.salaryData.length) {
      return { success: false, reason: "ยังไม่ได้โหลดข้อมูลบัญชีเงินเดือนข้าราชการ" }
    }

    const { effectiveDate, eduInstitute, qualification, currentSalary } = formData
    
    // Find matching salary record - FIXED: Must match qualification AND salary range
    const match = this.salaryData.find(item =>
      item.dateEffective === effectiveDate &&
      item.eduInstitute === eduInstitute &&
      item.degreeFull === qualification &&
      currentSalary >= item.salaryMin &&
      currentSalary <= item.salaryMax
    )
    
    if (!match) {
      return {
        success: false,
        reason: "ไม่พบข้อมูลที่ตรงกับเงินเดือนปัจจุบันและคุณวุฒิที่เลือก"
      }
    }

    // Simple calculation logic from reference implementation
    let salaryEarn = match.salaryEarn
    let newSalary = currentSalary + salaryEarn
    let adjustment = salaryEarn
    
    // Apply salary limit constraint
    if (newSalary > match.salaryNewLimit) {
      newSalary = match.salaryNewLimit
      adjustment = match.salaryNewLimit - currentSalary
      salaryEarn = adjustment
    }
    
    // Calculate percentage increase
    const percentageIncrease = currentSalary > 0 ? ((adjustment / currentSalary) * 100) : 0
    
    return {
      success: true,
      currentSalary: currentSalary,
      adjustment: adjustment,
      newSalary: newSalary,
      percentageIncrease: percentageIncrease,
      
      // Salary range information
      salaryMin: match.salaryMin,
      salaryMax: match.salaryMax,
      salaryEarn: salaryEarn,
      salaryNewLimit: match.salaryNewLimit,
      
      // Additional details for result display
      effectiveDate: effectiveDate,
      eduInstitute: eduInstitute,
      qualification: qualification,
      qualificationShort: match.degreeShort,
      
      // Calculation methodology info
      calculationMethod: this.getCalculationMethod(currentSalary, match, adjustment),
      remark: this.getCalculationRemark(currentSalary, match, adjustment)
    }
  }

  // Removed complex calculation methods - using simple reference logic

  /**
   * Get calculation method explanation - Simplified based on reference implementation
   * @param {number} currentSalary - Current salary
   * @param {object} salaryData - Salary data
   * @param {number} adjustment - Calculated adjustment
   * @returns {string[]} Array of calculation steps
   */
  getCalculationMethod(currentSalary, salaryData, adjustment) {
    const steps = []
    
    steps.push(`เงินเดือนปัจจุบัน: ${currentSalary.toLocaleString('th-TH')} บาท`)
    steps.push(`เงินที่ได้ปรับ: ${adjustment.toLocaleString('th-TH')} บาท`)
    steps.push(`เงินเดือนใหม่: ${(currentSalary + adjustment).toLocaleString('th-TH')} บาท`)
    
    if (currentSalary + salaryData.salaryEarn > salaryData.salaryNewLimit) {
      steps.push(`หมายเหตุ: จำกัดไม่เกิน ${salaryData.salaryNewLimit.toLocaleString('th-TH')} บาท`)
    }
    
    return steps
  }

  /**
   * Get calculation remark
   * @param {number} currentSalary - Current salary
   * @param {object} salaryData - Salary data
   * @param {number} adjustment - Adjustment amount
   * @returns {string} Calculation remark
   */
  getCalculationRemark(currentSalary, salaryData, adjustment) {
    if (currentSalary < salaryData.salaryMin) {
      return "เงินเดือนปัจจุบันต่ำกว่าอัตราขั้นต่ำ จึงได้รับการปรับขึ้นสู่อัตราขั้นต่ำ"
    } else if (currentSalary >= salaryData.salaryMax) {
      return "เงินเดือนปัจจุบันอยู่ที่อัตราขั้นสูง จึงได้รับเงินเพิ่มในอัตราคงที่"
    } else if (adjustment > 0) {
      return "ได้รับการปรับเงินเดือนตามหลักเกณฑ์การคำนวณของข้าราชการ"
    } else {
      return "ไม่ได้รับการปรับเงินเดือน เนื่องจากเงินเดือนปัจจุบันอยู่ในเกณฑ์ที่เหมาะสมแล้ว"
    }
  }

  /**
   * Get institution type statistics
   * @returns {object} Statistics about institution types
   */
  getInstitutionStats() {
    const domestic = this.salaryData.filter(r => r.eduInstitute === "ในประเทศ")
    const foreign = this.salaryData.filter(r => r.eduInstitute === "ต่างประเทศ")
    
    return {
      total: this.salaryData.length,
      domestic: domestic.length,
      foreign: foreign.length
    }
  }
}

// Export the class to make it available for other files to import
export default CivilServantCalculator