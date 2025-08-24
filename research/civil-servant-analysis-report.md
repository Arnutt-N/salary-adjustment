# Civil Servant Salary Calculator Enhancement Analysis Report

## Executive Summary

This report analyzes the current `civil-servant.html` page and provides a comprehensive plan for transforming it from an information-only page into a fully functional salary calculation system similar to `gov-emp.html`, utilizing the enhanced salary data and calculation methods from `examples/new-salary-2025/`.

## Current State Analysis

### 1. Current Civil Servant Page Structure
- **Type**: Information-only static page
- **Content**: Basic information about civil servant salary adjustments
- **UI Framework**: Tailwind CSS with Lucide icons
- **Layout**: Hero section + Information cards (3 static cards)
- **Functionality**: No calculation capabilities, purely informational

### 2. Target Reference: Gov-Emp Page Features
- **Interactive Calculator**: Dynamic form with real-time calculations
- **Data Integration**: Connected to salary database via main.js
- **Form Controls**: Effective date, work group, degree, current salary inputs
- **Result Display**: Detailed calculation results with animations
- **Responsive Design**: Mobile-optimized layout
- **Error Handling**: Comprehensive validation and user feedback

### 3. New Salary Data Capabilities (examples/new-salary-2025/)
- **814 salary records** with dual-date support (2024/2025)
- **Institution type filtering**: ในประเทศ (577 records) / ต่างประเทศ (237 records)
- **Enhanced data structure**: More detailed degree classifications
- **Advanced calculation logic**: Salary ranges, earning calculations, new limits
- **Comprehensive validation**: 50+ test cases implemented

## Enhancement Strategy

### Phase 1: UI Structure Transformation

#### 1.1 Hero Section Updates
```html
<!-- Current: Static information -->
<h1>การปรับเงินเดือนข้าราชการ</h1>
<p>ข้อมูลสำคัญเกี่ยวกับการปรับเงินเดือนข้าราชการพลเรือน</p>

<!-- Enhanced: Interactive introduction -->
<h1>ระบบคำนวณเงินเดือนข้าราชการ 2025</h1>
<p>คำนวณการปรับเงินเดือนข้าราชการตามมติคณะรัฐมนตรี พร้อมข้อมูลอัพเดต 2567-2568</p>
<button>เริ่มคำนวณเงินเดือน</button>
```

#### 1.2 Replace Information Cards with Calculator Interface
- **Remove**: 3 static information cards
- **Add**: Calculator form section (similar to gov-emp.html structure)
- **Maintain**: Government styling and professional appearance

### Phase 2: Calculator Integration

#### 2.1 Form Structure Implementation
Following `gov-emp.html` pattern with civil servant-specific modifications and exact form specifications:

```html
<form id="civil-servant-form" class="space-y-6">
    <!-- วันที่มีผลบังคับใช้ -->
    <div>
        <label for="effectiveDate" class="flex items-center gap-2 mb-2 text-base font-medium text-gray-700">
            <i data-lucide="calendar-days" class="w-5 h-5 text-gray-400"></i>
            วันที่มีผลบังคับใช้
        </label>
        <select id="effectiveDate" name="effectiveDate" 
                class="w-full p-3 transition border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="" disabled selected>-- กรุณาเลือกวันที่มีผล --</option>
            <option value="1/5/2024">1 พฤษภาคม 2567</option>
            <option value="1/5/2025">1 พฤษภาคม 2568</option>
        </select>
    </div>
    
    <!-- ประเภทสถานศึกษา (Radio Buttons) -->
    <div>
        <label class="flex items-center gap-2 mb-3 text-base font-medium text-gray-700">
            <i data-lucide="graduation-cap" class="w-5 h-5 text-gray-400"></i>
            ประเภทสถานศึกษา
        </label>
        <div class="space-y-3">
            <div class="flex items-center">
                <input id="institution-domestic" name="institutionType" type="radio" value="ในประเทศ" 
                       class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 focus:ring-2">
                <label for="institution-domestic" class="ml-3 text-sm font-medium text-gray-700">
                    สถานศึกษาในประเทศ (577 ระดับคุณวุฒิ)
                </label>
            </div>
            <div class="flex items-center">
                <input id="institution-foreign" name="institutionType" type="radio" value="ต่างประเทศ"
                       class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 focus:ring-2">
                <label for="institution-foreign" class="ml-3 text-sm font-medium text-gray-700">
                    สถานศึกษาต่างประเทศ (237 ระดับคุณวุฒิ)
                </label>
            </div>
        </div>
    </div>
    
    <!-- วุฒิการศึกษา -->
    <div>
        <label for="qualification" class="flex items-center gap-2 mb-2 text-base font-medium text-gray-700">
            <i data-lucide="award" class="w-5 h-5 text-gray-400"></i>
            วุฒิการศึกษา
        </label>
        <select id="qualification" name="qualification" disabled
                class="w-full p-3 transition border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-200 disabled:cursor-not-allowed">
            <option value="" disabled selected>-- กรุณาเลือกประเภทสถานศึกษาก่อน --</option>
            <!-- Dynamically populated from new salary data based on institution type -->
        </select>
    </div>
    
    <!-- อัตราเงินเดือน -->
    <div>
        <label for="currentSalary" class="flex items-center gap-2 mb-2 text-base font-medium text-gray-700">
            <i data-lucide="banknote" class="w-5 h-5 text-gray-400"></i>
            อัตราเงินเดือน (บาท)
        </label>
        <input id="currentSalary" name="currentSalary" type="number" min="0" step="0.01"
               class="w-full p-3 transition border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
               placeholder="กรุณากรอกอัตราเงินเดือนปัจจุบัน">
    </div>
    
    <!-- หมายเหตุความเป็นส่วนตัว -->
    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div class="flex items-start gap-3">
            <i data-lucide="info" class="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0"></i>
            <span class="text-sm text-yellow-800 leading-relaxed">
                <strong>*** หมายเหตุ :</strong> อัตราเงินเดือนของข้าราชการถือเป็นข้อมูลส่วนบุคคลตามกฎหมายว่าด้วยการคุ้มครองข้อมูลส่วนบุคคล ***
            </span>
        </div>
    </div>
    
    <!-- Form Buttons -->
    <div class="flex flex-col sm:flex-row gap-3 pt-4">
        <button type="submit" id="calculate-btn"
                class="flex-1 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
            <span class="flex items-center justify-center gap-2">
                <i data-lucide="calculator" class="w-5 h-5"></i>
                ตกลง
            </span>
        </button>
        <button type="button" id="reset-btn"
                class="flex-1 px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
            <span class="flex items-center justify-center gap-2">
                <i data-lucide="x-circle" class="w-5 h-5"></i>
                ยกเลิก
            </span>
        </button>
    </div>
</form>
```

#### 2.2 Data Integration Architecture

**New SalaryDataManager Class** (from examples/new-salary-2025/script.js):
```javascript
// Enhanced for civil servant data
class CivilServantDataManager extends SalaryDataManager {
    constructor() {
        super();
        this.civilServantData = null;
    }
    
    async loadCivilServantData() {
        // Load from examples/new-salary-2025/salaryData.json
        const response = await fetch('/examples/new-salary-2025/salaryData.json');
        this.civilServantData = await response.json();
        console.log(`✅ Loaded ${this.civilServantData.length} civil servant records`);
    }
    
    getCivilServantQualifications(dateEffective, eduInstitute) {
        return this.getUniqueQualifications(dateEffective, eduInstitute);
    }
}
```

### Phase 3: Calculation Engine Enhancement

#### 3.1 Civil Servant-Specific Calculations
Based on the new salary data structure:

```javascript
class CivilServantCalculator {
    constructor(dataManager) {
        this.dataManager = dataManager;
    }
    
    async calculateSalaryAdjustment(params) {
        const {
            effectiveDate,
            eduInstitute, 
            qualification,
            currentSalary
        } = params;
        
        // Find matching salary record
        const records = this.dataManager.getFilteredData(effectiveDate, eduInstitute);
        const match = records.find(r => r.degreeFull === qualification);
        
        if (!match) {
            throw new Error('ไม่พบข้อมูลคุณวุฒิที่ตรงกัน');
        }
        
        // Enhanced calculation logic
        const result = {
            currentSalary: currentSalary,
            salaryMin: match.salaryMin,
            salaryMax: match.salaryMax,
            salaryEarn: match.salaryEarn,
            newLimit: match.salaryNewLimit,
            
            // Calculate adjustments
            adjustment: this.calculateAdjustment(currentSalary, match),
            newSalary: this.calculateNewSalary(currentSalary, match),
            
            // Additional calculations
            dailyRate: this.calculateDailyRate(currentSalary),
            hourlyRate: this.calculateHourlyRate(currentSalary),
            
            // Institution type specific benefits
            institutionBenefits: this.calculateInstitutionBenefits(eduInstitute, match)
        };
        
        return result;
    }
    
    calculateAdjustment(current, salaryData) {
        // Implementation based on examples/new-salary-2025 logic
        if (current < salaryData.salaryMin) {
            return salaryData.salaryMin - current;
        }
        
        if (current >= salaryData.salaryMax) {
            return salaryData.salaryEarn;
        }
        
        // Pro-rated adjustment
        const range = salaryData.salaryMax - salaryData.salaryMin;
        const position = (current - salaryData.salaryMin) / range;
        return Math.round(salaryData.salaryEarn * (1 - position * 0.3));
    }
}
```

### Phase 4: UI Enhancement Features

#### 4.1 Result Display Enhancement
Following `gov-emp.html` pattern with civil servant-specific UI sections as specified:

```html
<!-- Results Section - Hidden by default, shown after calculation -->
<div id="calculation-results" class="hidden mt-8 space-y-6">
    
    <!-- ผลการคำนวณ (Main Results Header) -->
    <div class="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
        <div class="flex items-center gap-3 mb-4">
            <i data-lucide="check-circle" class="w-8 h-8 text-emerald-600"></i>
            <h3 class="text-2xl font-bold text-gray-800">ผลการคำนวณ</h3>
        </div>
        <p class="text-gray-600">การคำนวณเงินเดือนข้าราชการตามมติคณะรัฐมนตรี</p>
    </div>

    <!-- จำนวนเงินที่ได้ปรับ (Adjustment Amount) -->
    <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
        <div class="flex items-center gap-3 mb-4">
            <i data-lucide="trending-up" class="w-6 h-6 text-blue-600"></i>
            <h4 class="text-xl font-semibold text-gray-800">จำนวนเงินที่ได้ปรับ</h4>
        </div>
        <div class="text-center space-y-2">
            <div class="text-4xl font-bold text-blue-600" id="adjustment-amount">+ ฿ XX,XXX</div>
            <div class="text-lg text-gray-600">
                (<span id="adjustment-percentage" class="font-semibold text-green-600">XX.X%</span> เพิ่มขึ้น)
            </div>
        </div>
    </div>

    <!-- อัตราเงินเดือนที่ได้รับ (New Salary Rate) -->
    <div class="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
        <div class="flex items-center gap-3 mb-4">
            <i data-lucide="banknote" class="w-6 h-6 text-purple-600"></i>
            <h4 class="text-xl font-semibold text-gray-800">อัตราเงินเดือนที่ได้รับ</h4>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="text-center p-4 bg-white rounded-lg border">
                <div class="text-sm text-gray-600 mb-1">เงินเดือนเดิม</div>
                <div class="text-2xl font-bold text-gray-700" id="current-salary-display">฿ XX,XXX</div>
            </div>
            <div class="text-center p-4 bg-white rounded-lg border border-purple-300">
                <div class="text-sm text-purple-600 mb-1">เงินเดือนใหม่</div>
                <div class="text-2xl font-bold text-purple-600" id="new-salary-display">฿ XX,XXX</div>
            </div>
        </div>
    </div>

    <!-- รายละเอียดการคำนวณ (Calculation Details) -->
    <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div class="flex items-center gap-3 mb-4">
            <i data-lucide="list" class="w-6 h-6 text-indigo-600"></i>
            <h4 class="text-xl font-semibold text-gray-800">รายละเอียดการคำนวณ</h4>
        </div>
        <div class="space-y-3">
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">วันที่มีผลบังคับใช้:</span>
                <strong id="effective-date-result" class="text-gray-800">XX พฤษภาคม XXXX</strong>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">ประเภทสถานศึกษา:</span>
                <strong id="institution-type-result" class="text-gray-800">สถานศึกษาในประเทศ</strong>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">วุฒิการศึกษา:</span>
                <strong id="qualification-result" class="text-gray-800">XXXXXXXX</strong>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">ช่วงเงินเดือนขั้นต่ำ:</span>
                <strong id="salary-min-result" class="text-blue-600">฿ XX,XXX</strong>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-gray-600">ช่วงเงินเดือนขั้นสูง:</span>
                <strong id="salary-max-result" class="text-blue-600">฿ XX,XXX</strong>
            </div>
            <div class="flex justify-between items-center py-2">
                <span class="text-gray-600">จำนวนเงินที่ได้รับ:</span>
                <strong id="salary-earn-result" class="text-green-600">฿ XX,XXX</strong>
            </div>
        </div>
    </div>

    <!-- วิธีการคำนวณ (Calculation Method) -->
    <div class="bg-orange-50 p-6 rounded-xl border border-orange-200">
        <div class="flex items-center gap-3 mb-4">
            <i data-lucide="calculator" class="w-6 h-6 text-orange-600"></i>
            <h4 class="text-xl font-semibold text-gray-800">วิธีการคำนวณ</h4>
        </div>
        <div id="calculation-method" class="space-y-3 text-sm text-gray-700">
            <!-- Dynamically populated based on calculation logic -->
            <div class="p-3 bg-white rounded-lg border-l-4 border-orange-400">
                <strong>ขั้นตอนที่ 1:</strong> ตรวจสอบอัตราเงินเดือนปัจจุบันอยู่ในช่วงใด
            </div>
            <div class="p-3 bg-white rounded-lg border-l-4 border-orange-400">
                <strong>ขั้นตอนที่ 2:</strong> คำนวณจำนวนเงินที่ได้รับตามหลักเกณฑ์
            </div>
            <div class="p-3 bg-white rounded-lg border-l-4 border-orange-400">
                <strong>ขั้นตอนที่ 3:</strong> บวกเข้ากับเงินเดือนปัจจุบันเพื่อได้เงินเดือนใหม่
            </div>
        </div>
    </div>

    <!-- หลักเกณฑ์และเงื่อนไข (Criteria and Conditions) -->
    <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <div class="flex items-center gap-3 mb-4">
            <i data-lucide="book-open" class="w-6 h-6 text-gray-600"></i>
            <h4 class="text-xl font-semibold text-gray-800">หลักเกณฑ์และเงื่อนไข</h4>
        </div>
        <div class="space-y-3 text-sm text-gray-700">
            <div class="flex items-start gap-2">
                <i data-lucide="check" class="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"></i>
                <span>การปรับเงินเดือนมีผลตั้งแต่วันที่ที่เลือกในระบบ</span>
            </div>
            <div class="flex items-start gap-2">
                <i data-lucide="check" class="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"></i>
                <span>จำนวนเงินที่ได้รับขึ้นอยู่กับคุณวุฒิและประเภทสถานศึกษา</span>
            </div>
            <div class="flex items-start gap-2">
                <i data-lucide="check" class="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"></i>
                <span>เงินเดือนใหม่จะไม่เกินอัตราสูงสุดของระดับคุณวุฒินั้นๆ</span>
            </div>
            <div class="flex items-start gap-2">
                <i data-lucide="info" class="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"></i>
                <span>การคำนวณนี้เป็นการประมาณการ กรุณาตรวจสอบกับหน่วยงานที่เกี่ยวข้อง</span>
            </div>
        </div>
        
        <!-- Legal Reference -->
        <div class="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div class="text-xs text-blue-800">
                <strong>อ้างอิง:</strong> มติคณะรัฐมนตรีเรื่องการปรับปรุงอัตราเงินเดือนข้าราชการพลเรือน 
                ข้าราชการครูและบุคลากรทางการศึกษา ข้าราชการตำรวจ และข้าราชการพลเรือนในกระทรวงกลาโหม
            </div>
        </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-3 pt-4">
        <button type="button" id="recalculate-btn"
                class="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            <span class="flex items-center justify-center gap-2">
                <i data-lucide="refresh-cw" class="w-5 h-5"></i>
                คำนวณใหม่
            </span>
        </button>
        <button type="button" id="print-result-btn"
                class="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
            <span class="flex items-center justify-center gap-2">
                <i data-lucide="printer" class="w-5 h-5"></i>
                พิมพ์ผลลัพธ์
            </span>
        </button>
    </div>
</div>
```

#### 4.2 Advanced Features from examples/new-salary-2025

**Comparison Mode**:
```javascript
// Compare between 2024 and 2025 rates
function enableComparisonMode() {
    const comparison = {
        salary2024: calculateForDate('1/5/2024'),
        salary2025: calculateForDate('1/5/2025'),
        difference: salary2025 - salary2024,
        percentageIncrease: ((salary2025 - salary2024) / salary2024) * 100
    };
    
    displayComparison(comparison);
}
```

**Institution Type Benefits**:
```javascript
function calculateInstitutionBenefits(eduInstitute, salaryData) {
    const benefits = {
        domestic: {
            housing: salaryData.salaryEarn * 0.15,
            transportation: salaryData.salaryEarn * 0.10,
            medical: salaryData.salaryEarn * 0.05
        },
        foreign: {
            housing: salaryData.salaryEarn * 0.25,
            transportation: salaryData.salaryEarn * 0.15,
            medical: salaryData.salaryEarn * 0.10,
            international: salaryData.salaryEarn * 0.20
        }
    };
    
    return eduInstitute === 'ในประเทศ' ? benefits.domestic : benefits.foreign;
}
```

### Phase 5: Integration with Existing System

#### 5.1 Vite Configuration Updates
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        govEmp: resolve(__dirname, "gov-emp.html"),
        civilServant: resolve(__dirname, 'civil-servant.html'), // Enhanced
        comingSoon: resolve(__dirname, "coming-soon.html"),
      },
    },
  },
});
```

#### 5.2 Data File Integration
```bash
# Copy and integrate new salary data
cp examples/new-salary-2025/salaryData.json public/data/civilServantData.json

# Update existing data structure to support both systems
# gov-emp.html continues using salaryGovEmp.json
# civil-servant.html uses civilServantData.json (814 records)
```

#### 5.3 Component System Integration
```javascript
// Create new civil servant specific components
src/components/
├── civilServantForm.html      // Calculator form
├── civilServantResults.html   // Results display
└── civilServantToast.html     // Success/error messages
```

## Technical Implementation Plan

### Step 1: Data Migration and Setup
1. **Copy salary data**: Transfer `salaryData.json` (814 records) to `public/data/`
2. **Create calculator class**: Implement `CivilServantCalculator` based on examples
3. **Update main.js**: Add conditional loading for civil servant page

### Step 2: UI Transformation
1. **Replace static cards** with dynamic calculator form
2. **Implement responsive design** following gov-emp.html patterns
3. **Add result display section** with animation and formatting

### Step 3: Calculation Logic Integration
1. **Port calculation methods** from examples/new-salary-2025/script.js
2. **Implement institution type filtering** (ในประเทศ/ต่างประเทศ)
3. **Add salary range validation** and error handling

### Step 4: Testing and Validation
1. **Port test suite** from examples/new-salary-2025/
2. **Create civil servant-specific tests**
3. **Validate calculation accuracy** against government specifications

### Step 5: Documentation and Deployment
1. **Update CLAUDE.md** with civil servant calculator information
2. **Create user guide** for new functionality
3. **Test cross-browser compatibility**

## Expected Benefits

### For Users (Government Employees)
- **Accurate salary calculations** with 814 detailed qualification levels
- **Institution type consideration** for domestic vs foreign qualifications
- **Dual-date support** (2024/2025) for historical and future planning
- **Professional government UI** maintaining existing design consistency

### For System
- **Code reusability** leveraging existing gov-emp.html patterns
- **Data consistency** using proven salary data structure
- **Maintainability** following established project architecture
- **Extensibility** ready for future salary adjustment years

## Risk Analysis and Mitigation

### Technical Risks
1. **Data compatibility**: Ensure new salary data integrates smoothly
   - *Mitigation*: Comprehensive testing with validation suite
2. **Performance impact**: 814 records vs current smaller dataset
   - *Mitigation*: Implement caching and efficient filtering
3. **Calculation accuracy**: Complex government salary rules
   - *Mitigation*: Port proven calculation logic from examples

### User Experience Risks
1. **Interface complexity**: More options than current simple page
   - *Mitigation*: Progressive disclosure and clear labeling
2. **Loading performance**: Larger data files
   - *Mitigation*: Async loading and user feedback

## Timeline and Resource Requirements

### Development Timeline (Estimated)
- **Week 1**: Data migration and calculator class implementation
- **Week 2**: UI transformation and form integration
- **Week 3**: Calculation logic and result display
- **Week 4**: Testing, validation, and documentation

### Required Resources
- **Frontend Developer**: HTML/CSS/JavaScript implementation
- **QA Tester**: Cross-browser and calculation validation
- **Government Liaison**: Specification verification and approval

## Conclusion

The enhancement of `civil-servant.html` from an informational page to a fully functional calculator represents a significant value addition to the Thai Government Salary Adjustment System. By leveraging the proven architecture from `gov-emp.html` and the comprehensive data from `examples/new-salary-2025/`, we can deliver a robust, accurate, and user-friendly calculation system that serves government employees' needs effectively.

The implementation plan prioritizes code reusability, data accuracy, and user experience while maintaining the professional government standards established in the existing system. The enhanced calculator will provide 814 detailed salary levels with institution type consideration, representing a substantial improvement over the current static information display.

---

**Report prepared for**: Thai Government Salary Adjustment System Enhancement  
**Date**: August 2025  
**Status**: Ready for implementation approval