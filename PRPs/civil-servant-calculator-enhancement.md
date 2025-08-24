name: "Civil Servant Salary Calculator Enhancement PRP v1.0 - Transform Static Page to Interactive Calculator"
description: |

## Purpose
Transform the static civil-servant.html information page into a fully functional salary calculator using enhanced salary data from examples/new-salary-2025/, creating a comprehensive calculation system that matches the UI patterns from gov-emp.html while implementing civil servant-specific features.

## Core Principles
1. **Context is King**: Include ALL necessary documentation, examples, and Thai language requirements from existing analysis
2. **Validation Loops**: Provide executable tests/builds that can verify all calculator functionality
3. **Information Dense**: Use existing patterns from gov-emp.html and examples/new-salary-2025/
4. **Progressive Success**: Start simple, validate, then enhance with advanced features
5. **Global rules**: Follow all rules in CLAUDE.md and INITIAL.md for Thai government system compliance

---

## Goal
Transform civil-servant.html from a static information page into a fully functional salary calculator that provides accurate calculations for Thai civil servants with 814+ salary qualification levels, institution type filtering, and comprehensive result display matching government standards.

## Why
- **Government Employee Value**: Provide civil servants with accurate salary adjustment calculations using official government data
- **System Consistency**: Create unified experience across gov-emp.html and civil-servant.html with consistent UI patterns
- **Data Utilization**: Leverage comprehensive 814-record salary dataset from examples/new-salary-2025/ for precise calculations
- **Accessibility**: Enable civil servants to calculate salary adjustments independently with proper validation

## What
Create an interactive salary calculator with:
- Radio button institution type selection (ในประเทศ/ต่างประเทศ)
- Dynamic qualification dropdown based on institution type
- Comprehensive result display with 6 specific sections as defined in analysis report
- Data privacy compliance with Thai personal data protection notice
- Professional government UI maintaining existing design consistency

### Success Criteria
- [ ] Form inputs exactly match specifications: วันที่มีผลบังคับใช้, ประเภทสถานศึกษา (radio), วุฒิการศึกษา, อัตราเงินเดือน
- [ ] Result sections display: ผลการคำนวณ, จำนวนเงินที่ได้ปรับ, อัตราเงินเดือนที่ได้รับ, รายละเอียดการคำนวณ, วิธีการคำนวณ, หลักเกณฑ์และเงื่อนไข
- [ ] 814+ salary records loaded and filtered correctly by institution type
- [ ] Cross-browser compatibility including mobile devices with proper Thai text rendering
- [ ] Mathematical accuracy matching government specifications with no approximations

## All Needed Context

### Documentation & References
```yaml
# MUST READ - Include these in your context window
- file: CLAUDE.md
  why: Project setup, architecture, and development commands for Thai government system
  
- file: INITIAL.md
  why: Complete context for Thai government system requirements and technical architecture
  
- file: research/civil-servant-analysis-report.md
  why: Complete analysis with exact form specifications and result section requirements
  
- file: src/salary-calculator.js
  why: Core calculation patterns, data handling, Thai formatting - proven working patterns
  
- file: src/form-controller.js
  why: UI interaction patterns, form validation, error handling - existing government implementation
  
- file: examples/new-salary-2025/salaryData.json
  why: 814 salary records with institution type filtering and enhanced data structure
  
- file: examples/new-salary-2025/script.js
  why: SalaryDataManager class, filtering logic, calculation patterns for civil servant data
  
- file: examples/new-salary-2025/index.html
  why: Bootstrap UI patterns, form validation, responsive design for government applications
  
- file: gov-emp.html
  why: Proven UI patterns, result display structure, Thai government styling standards

- doc: https://vitejs.dev/guide/
  section: Multi-page app configuration, asset handling
  critical: Integration with existing Vite setup and public data serving

- doc: https://tailwindcss.com/docs/
  section: Thai text support, responsive design, form styling
  critical: Font loading, Thai character rendering, government color schemes
```

### Current Codebase Structure
```bash
salary-adjustment/
├── public/
│   ├── data/salaryGovEmp.json          # Current government employee data (smaller dataset)
│   └── images/                         # Thai government assets
├── examples/new-salary-2025/
│   ├── salaryData.json                 # Enhanced 814-record civil servant dataset
│   ├── script.js                       # SalaryDataManager class with filtering
│   └── index.html                      # Bootstrap UI patterns
├── src/
│   ├── components/                     # HTML component templates
│   ├── salary-calculator.js            # Core calculation engine (gov-emp pattern)
│   ├── form-controller.js              # UI interaction management (gov-emp pattern)
│   ├── inline-components.js            # Component loading system
│   ├── main.js                         # Application entry point
│   └── style.css                       # Custom Thai-aware styling
├── gov-emp.html                        # Reference implementation (working calculator)
├── civil-servant.html                  # Target file to transform
├── index.html                          # Landing page
└── vite.config.js                     # Multi-page configuration
```

### Desired Codebase Changes
```bash
# Files to be added/modified for civil servant calculator
├── public/data/
│   └── civilServantData.json          # Copy of examples/new-salary-2025/salaryData.json
├── src/
│   ├── civil-servant-calculator.js    # New calculator extending SalaryCalculator pattern
│   ├── civil-servant-controller.js    # New form controller for civil servant specific UI
│   └── components/
│       ├── civilServantForm.html      # Form template with radio buttons and specific fields
│       ├── civilServantResults.html   # 6-section result display template
│       └── civilServantToast.html     # Success/error messages for civil servant
├── civil-servant.html                 # Transform from static to interactive calculator
└── vite.config.js                     # Already configured for civil-servant.html
```

### Known Gotchas of Thai Government System & Library Quirks
```javascript
// CRITICAL: Thai language and government requirements
// Civil servant data uses different structure than government employee data
// examples/new-salary-2025/salaryData.json has fields: salaryMin, salaryMax, salaryEarn, salaryNewLimit
// vs existing salaryGovEmp.json with different field structure

// Institution type filtering is CRITICAL - affects qualification options significantly
// ในประเทศ (domestic): 577 qualification records
// ต่างประเทศ (foreign): 237 qualification records

// Radio button interaction must enable/disable qualification dropdown dynamically
// Qualification dropdown must be populated based on both effectiveDate AND institutionType

// Data privacy notice is MANDATORY per Thai personal data protection law
// Result sections must match EXACT specification: 6 specific sections with proper Thai headers

// Calculation logic differs from government employee calculator
// Civil servant calculations use salaryMin, salaryMax ranges vs fixed rate structure

// Component loading happens after DOM ready - timing matters for form initialization
// Vite serves public files from root in dev but /assets in build - path handling critical
```

## Implementation Blueprint

### Data Models and Structure

Create/modify data handling for civil servant requirements ensuring accuracy and consistency.
```javascript
// Civil servant data structure (from examples/new-salary-2025/salaryData.json)
{
  "id": 1,
  "docNo": 2.1,
  "order": 1.0,
  "dateEffective": "1/5/2024",
  "yearEffective": 2024,
  "degreeFull": "วุฒิบัตรหรือหนังสืออนุมัติแสดงความรู้ความชำนาญ...",
  "degree": "วุฒิบัตร/หนังสืออนุมัติฯ ประกอบวิชาชีพเวชกรรม...",
  "degreeShort": "ว.ว. 4 ปี",
  "eduInstitute": "ในประเทศ", // or "ต่างประเทศ"
  "salaryMin": 21610,
  "salaryMax": 24000,
  "salaryEarn": 2170,
  "salaryNewLimit": 25980
}
```

### List of tasks to be completed to fulfill the PRP in order

```yaml
Task 1:
COPY examples/new-salary-2025/salaryData.json to public/data/civilServantData.json:
  - PRESERVE exact data structure with all 814 records
  - MAINTAIN institution type filtering capability
  - KEEP Thai language fields intact

Task 2:
CREATE src/civil-servant-calculator.js:
  - MIRROR pattern from: src/salary-calculator.js
  - MODIFY for civil servant data structure (salaryMin, salaryMax, salaryEarn)
  - IMPLEMENT institution type filtering from examples/new-salary-2025/script.js
  - PRESERVE Thai formatting and error handling patterns

Task 3:
CREATE src/civil-servant-controller.js:
  - MIRROR pattern from: src/form-controller.js
  - MODIFY for civil servant form structure with radio buttons
  - IMPLEMENT dynamic qualification loading based on institution type
  - ADD 6-section result display as specified in analysis report

Task 4:
UPDATE civil-servant.html:
  - REMOVE static information cards section
  - ADD calculator form section with exact specifications from analysis
  - PRESERVE hero section with updated call-to-action
  - MAINTAIN existing responsive design and government styling

Task 5:
CREATE src/components/ files:
  - civilServantForm.html: Radio button form with privacy notice
  - civilServantResults.html: 6-section result display
  - civilServantToast.html: Success/error messages

Task 6:
UPDATE src/main.js:
  - ADD conditional loading for civil-servant.html page
  - IMPLEMENT page detection and appropriate controller initialization
  - PRESERVE existing gov-emp.html functionality

Task 7:
TEST and VALIDATE:
  - Browser compatibility with Thai text rendering
  - Institution type radio button functionality
  - Dynamic qualification dropdown population
  - Government data calculation accuracy
  - Mobile responsiveness and accessibility
```

### Per Task Pseudocode

```javascript
// Task 2: Civil Servant Calculator Implementation
class CivilServantCalculator extends SalaryCalculator {
    constructor(dataUrl = "/data/civilServantData.json") {
        super(dataUrl);
    }
    
    // PATTERN: Filter by institution type (from examples/new-salary-2025/script.js)
    getFilteredData(dateEffective, eduInstitute) {
        return this.salaryData.filter(record => 
            record.dateEffective === dateEffective &&
            record.eduInstitute === eduInstitute
        );
    }
    
    // PATTERN: Get qualifications by institution (CRITICAL for radio button logic)
    getQualificationsByInstitution(dateEffective, eduInstitute) {
        const filtered = this.getFilteredData(dateEffective, eduInstitute);
        
        // GOTCHA: Create unique qualifications using degreeFull as key
        const uniqueMap = new Map();
        filtered.forEach(item => {
            if (!uniqueMap.has(item.degreeFull)) {
                uniqueMap.set(item.degreeFull, {
                    value: item.degreeFull,
                    text: item.degree,
                    short: item.degreeShort,
                    id: item.id
                });
            }
        });
        
        return Array.from(uniqueMap.values());
    }
    
    // CRITICAL: Civil servant calculation logic differs from government employee
    calculate(formData) {
        const { effectiveDate, eduInstitute, qualification, currentSalary } = formData;
        
        // Find matching record
        const records = this.getFilteredData(effectiveDate, eduInstitute);
        const match = records.find(r => r.degreeFull === qualification);
        
        if (!match) {
            throw new Error('ไม่พบข้อมูลคุณวุฒิที่ตรงกัน');
        }
        
        // PATTERN: Calculate based on salary ranges (not fixed rates)
        const adjustment = this.calculateAdjustment(currentSalary, match);
        const newSalary = currentSalary + adjustment;
        
        return {
            currentSalary,
            adjustment,
            newSalary,
            salaryMin: match.salaryMin,
            salaryMax: match.salaryMax,
            salaryEarn: match.salaryEarn,
            newLimit: match.salaryNewLimit
        };
    }
}

// Task 3: Civil Servant Controller with Radio Button Logic
export async function initializeCivilServantController(calculator) {
    // PATTERN: Same initialization pattern as form-controller.js
    const dataLoaded = await calculator.init();
    if (!dataLoaded) {
        alert("ไม่สามารถโหลดข้อมูลบัญชีเงินเดือนได้ โปรดลองอีกครั้ง");
        return;
    }
    
    // CRITICAL: Radio button handling for institution type
    const institutionRadios = document.querySelectorAll('input[name="institutionType"]');
    const qualificationSelect = document.getElementById("qualification");
    
    institutionRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                // Enable qualification dropdown
                qualificationSelect.disabled = false;
                
                // Populate qualifications based on institution type
                const effectiveDate = document.getElementById("effectiveDate").value;
                const qualifications = calculator.getQualificationsByInstitution(
                    effectiveDate, 
                    this.value
                );
                
                // PATTERN: Use same populateSelect pattern from form-controller.js
                populateSelect(qualificationSelect, qualifications, "วุฒิการศึกษา");
            }
        });
    });
}
```

### Integration Points
```yaml
HTML_PAGES:
  - modify: civil-servant.html
  - pattern: "Replace information section with calculator form and 6-section result display"
  - preserve: "Hero section, navigation, footer loading, government styling"
  
COMPONENTS:
  - add to: src/components/
  - pattern: "Follow existing component structure with Thai language templates"
  - files: "civilServantForm.html, civilServantResults.html, civilServantToast.html"
  
STYLING:
  - maintain: src/style.css
  - pattern: "Reuse existing Thai-aware responsive classes and government color scheme"
  - addition: "Radio button styling consistent with Tailwind patterns"
  
DATA:
  - add: public/data/civilServantData.json
  - critical: "Exact copy of examples/new-salary-2025/salaryData.json with all 814 records"
  
MAIN_JS:
  - modify: src/main.js
  - pattern: "Add page detection and conditional controller loading"
  - preserve: "Existing gov-emp.html functionality completely intact"
```

## Validation Loop

### Level 1: Build & Syntax
```bash
# Run these FIRST - fix any errors before proceeding
npm run build                    # Check if build succeeds
# Expected: Successful build with no errors in dist/
# Expected: civilServantData.json accessible in build output

# Check for any console errors in development
npm run dev
# Expected: Clean startup, no console errors
# Expected: Thai fonts load correctly
# Expected: Both gov-emp.html and civil-servant.html functional
```

### Level 2: Manual Testing - Civil Servant Requirements
```bash
# Test in development server
npm run dev

# Navigate to civil-servant.html
# Test cases (EXACT specification from analysis report):
1. Form Input Testing:
   - วันที่มีผลบังคับใช้ dropdown works (2024/2025 options)
   - ประเภทสถานศึกษา radio buttons work (ในประเทศ/ต่างประเทศ)
   - วุฒิการศึกษา dropdown populates based on radio selection
   - อัตราเงินเดือน input accepts numeric values
   - Privacy notice displays correctly in Thai

2. Calculation Testing:
   - Submit form with valid data produces results
   - Invalid data shows appropriate Thai error messages
   - Calculations match government specifications

3. Result Display Testing (6 sections as specified):
   - ผลการคำนวณ: Main results header displays
   - จำนวนเงินที่ได้ปรับ: Adjustment amount with percentage
   - อัตราเงินเดือนที่ได้รับ: Old vs new salary comparison
   - รายละเอียดการคำนวณ: Detailed breakdown of inputs/parameters
   - วิธีการคำนวณ: Step-by-step calculation methodology
   - หลักเกณฑ์และเงื่อนไข: Criteria, conditions, and legal references

# Expected outcomes:
- All Thai characters render properly across browsers
- Radio button selection enables qualification dropdown
- Qualification options change based on institution type (577 vs 237 records)
- Salary calculations are mathematically precise
- Result sections display exactly as specified
- Mobile experience works with Thai text
```

### Level 3: Cross-Browser Validation
```bash
# Test across browsers with focus on Thai text rendering
Chrome/Edge: [Verify radio buttons, Thai text, calculations]
Firefox: [Check font rendering, form interactions, responsiveness]  
Safari: [Validate mobile experience, touch interactions]
Mobile browsers: [Test Thai text readability, form usability]

# Expected: Consistent experience across all platforms
# Critical: Thai government employees must have reliable access
# Focus: Radio button functionality and qualification dropdown behavior
```

### Level 4: Data Accuracy Verification
```javascript
// Validate civil servant data integrity and calculations
const testCases = [
    {
        effectiveDate: "1/5/2024",
        eduInstitute: "ในประเทศ",
        qualification: "วุฒิบัตรหรือหนังสืออนุมัติแสดงความรู้ความชำนาญ...",
        currentSalary: 22000,
        expectedMin: 21610,
        expectedMax: 24000
    },
    {
        effectiveDate: "1/5/2025", 
        eduInstitute: "ต่างประเทศ",
        // Test foreign institution calculations
    }
];

// CRITICAL: Verify calculation produces exact results per government specification
// Test institution type filtering: ในประเทศ should show 577 qualifications
// Test institution type filtering: ต่างประเทศ should show 237 qualifications
// No approximations or rounding errors acceptable in government calculations
```

### Level 5: Integration Testing
```bash
# Verify integration with existing system
1. Gov-emp.html still works perfectly (no regression)
2. Index.html navigation links work to both calculators
3. Shared components (header, footer) load correctly
4. Vite build includes all necessary files
5. Public data serves correctly (both salaryGovEmp.json and civilServantData.json)

# Performance testing
1. Civil servant data loads efficiently (814 records)
2. Qualification filtering performs well on mobile devices
3. Form interactions respond smoothly
4. Result display animations work properly
```

## Final Validation Checklist
- [ ] Build succeeds: `npm run build`
- [ ] Development runs clean: `npm run dev`
- [ ] Civil servant form has exact inputs: วันที่มีผลบังคับใช้, ประเภทสถานศึกษา (radio), วุฒิการศึกษา, อัตราเงินเดือน
- [ ] Result sections display all 6 specified areas with proper Thai headers
- [ ] Radio buttons enable/disable qualification dropdown correctly
- [ ] Institution type filtering shows correct record counts (577 vs 237)
- [ ] Thai text renders correctly in all browsers including mobile
- [ ] Government salary calculations are mathematically precise
- [ ] Data privacy notice displays according to Thai law requirements
- [ ] Mobile responsiveness maintained with Thai text readable
- [ ] Gov-emp.html functionality preserved (no regression)
- [ ] Cross-browser compatibility verified
- [ ] Performance acceptable for government users
- [ ] Error handling provides appropriate Thai messages

---

## Anti-Patterns to Avoid (Civil Servant Context)
- ❌ Don't break existing gov-emp.html functionality - must remain fully operational
- ❌ Don't approximate civil servant salary calculations - must be exact per government specs
- ❌ Don't ignore institution type filtering - critical for correct qualification options
- ❌ Don't skip radio button interaction logic - qualification dropdown must be disabled until selection
- ❌ Don't modify existing data files - add new civilServantData.json separately
- ❌ Don't copy code without understanding - civil servant logic differs from government employee
- ❌ Don't skip Thai personal data protection notice - mandatory by law
- ❌ Don't ignore mobile testing with Thai text - government employees use various devices
- ❌ Don't hardcode qualification lists - must be dynamically filtered from 814 records
- ❌ Don't compromise calculation accuracy for performance - government accuracy paramount

## Thai Government Civil Servant Specific Considerations
- Institution type (ในประเทศ/ต่างประเทศ) significantly affects available qualifications and calculations
- Radio button selection is mandatory before qualification dropdown becomes available
- All 814 salary records must be accessible but filtered appropriately by institution type
- Calculation methodology differs from government employee calculator - use salary ranges not fixed rates
- Result display must include all 6 specified sections per analysis report requirements
- Data privacy notice must be prominently displayed and reference Thai personal data protection law
- Thai language formality must be maintained throughout - this is for government employees
- Performance must be acceptable for older government hardware while handling 814 records
- Cross-browser compatibility critical as government employees have varying system setups

## Confidence Score: 9/10
High confidence for one-pass implementation success due to:
- Complete analysis report with exact specifications
- Proven patterns from working gov-emp.html implementation  
- Existing examples/new-salary-2025/ data and logic patterns
- Comprehensive validation framework covering all critical aspects
- Clear separation of concerns maintaining existing functionality
- Detailed task breakdown with specific implementation guidance

---

## 🚨 PRP STATUS UPDATE - 2025

### Current Implementation Status: **ALTERNATIVE APPROACH COMPLETED**

Instead of implementing the full calculator transformation outlined in this PRP, the development team completed a **different but valuable enhancement** to the civil-servant.html page:

#### ✅ **COMPLETED: Legal Information System Enhancement**
- **Scope**: Enhanced the "กฎหมายและหนังสือเวียนที่เกี่ยวข้อง" section 
- **Achievement**: Added interactive cards with external links to official OCSC documents
- **Value**: Provides direct access to government regulations and guidelines
- **Implementation**: Professional UI with hover effects and proper external link handling

#### 📋 **ORIGINAL PRP GOALS: DEFERRED**
The comprehensive salary calculator transformation described in this PRP remains **unimplemented**:
- ❌ Interactive salary calculator with radio buttons (not completed)
- ❌ 814-record dataset integration (not completed) 
- ❌ Institution type filtering (ในประเทศ/ต่างประเทศ) (not completed)
- ❌ 6-section result display (not completed)
- ❌ Dynamic qualification dropdown (not completed)

#### 🎯 **CURRENT PAGE STATUS**
The civil-servant.html page now serves as an **information portal** rather than a calculator:
- **Legal Information Cards**: Direct links to ว 9/2567, guidelines, and legacy regulations
- **Static Information**: Basic salary adjustment information and policy details  
- **Professional UI**: Government-standard interface with enhanced user experience
- **External Integration**: Proper links to OCSC official documents

#### 📝 **RECOMMENDATION FOR FUTURE DEVELOPMENT**
If the full calculator functionality outlined in this PRP is still desired:
1. **Preserve Current Legal Information System**: The implemented legal cards provide valuable functionality
2. **Add Calculator Section**: Implement the calculator as an additional section rather than replacement
3. **Follow This PRP**: The detailed implementation blueprint in this PRP remains valid and comprehensive
4. **Test Integration**: Ensure new calculator functionality works alongside existing legal information system

#### 🔄 **PRP STATUS: READY FOR FUTURE IMPLEMENTATION**
- **Blueprint**: Complete implementation plan remains valid
- **Context**: All referenced files and patterns still available
- **Validation**: Testing framework ready for use
- **Priority**: Medium (valuable enhancement but current page provides good user value)

**Last Updated**: January 2025  
**Implementation Team**: Claude Code Development  
**Status**: Alternative enhancement completed, original goals available for future development