name: "Civil Servant Salary Calculator UI Enhancement PRP - Section คำนวณการปรับเงินเดือน"
description: |

## Purpose
Fix specific UI/UX issues in the civil-servant.html salary calculation section to improve user experience and functionality matching the examples/new-salary-2025 implementation patterns.

## Core Principles
1. **Visual Consistency**: Radio buttons should display as circular selections, not rectangular
2. **Dynamic Behavior**: Labels should change based on user selections (dateEffective)
3. **Enhanced Functionality**: Education qualification dropdown should use Select2 with proper AJAX/jQuery integration
4. **Preserve Logic**: Maintain all existing calculation logic from examples/new-salary-2025
5. **Professional UI**: Ensure government-standard interface quality

---

## Goal
Enhance the civil-servant.html calculation section (คำนวณการปรับเงินเดือน) with improved radio button styling, dynamic labels, and Select2 dropdown functionality while preserving all existing calculation logic.

## Why
- **User Experience**: Radio buttons should visually indicate selection with circular design, not rectangular
- **Dynamic Interface**: Salary labels should update based on selected effective date for clarity
- **Enhanced Functionality**: Education qualification dropdown needs Select2 integration for better usability
- **Consistency**: Match UI patterns from proven examples/new-salary-2025 implementation
- **Professional Standards**: Government interface should maintain high visual and functional quality

## What
Fix three specific issues in the civil-servant.html calculation section:

1. **Radio Button Styling**: Change from rectangular selection to proper circular radio button appearance
2. **Dynamic Salary Label**: Make อัตราเงินเดือนปัจจุบัน label change based on dateEffective selection
3. **Select2 Integration**: Implement Select2 for วุฒิการศึกษาที่บรรจุ dropdown with proper AJAX/jQuery logic

### Success Criteria
- [ ] Radio buttons display circular selection indicators instead of rectangular
- [ ] Salary label dynamically updates: "อัตราเงินเดือน ณ 1 เมษายน 2567" for 1/5/2567, "อัตราเงินเดือน ณ 1 เมษายน 2568" for 1/5/2568
- [ ] Education qualification dropdown uses Select2 with search functionality
- [ ] All existing calculation logic from examples/new-salary-2025 preserved
- [ ] Cross-browser compatibility maintained
- [ ] Mobile responsiveness preserved

## All Needed Context

### Documentation & References
```yaml
# MUST READ - Include these in your context window
- file: D:\hrProject\salary-adjustment\examples\new-salary-2025\CLAUDE.md
  why: Complete context for calculation logic, patterns, and implementation
  
- file: D:\hrProject\salary-adjustment\examples\new-salary-2025\INITIAL.md
  why: Project documentation and implementation status
  
- file: D:\hrProject\salary-adjustment\examples\new-salary-2025\script.js
  why: Reference implementation for Select2, AJAX, jQuery patterns, and dynamic labels
  
- file: D:\hrProject\salary-adjustment\examples\new-salary-2025\index.html
  why: HTML structure patterns for radio buttons and Select2 implementation
  
- file: D:\hrProject\salary-adjustment\examples\new-salary-2025\style.css
  why: CSS patterns for radio button styling and Select2 customization
  
- file: D:\hrProject\salary-adjustment\civil-servant.html
  why: Current implementation that needs fixes
  
- file: D:\hrProject\salary-adjustment\src\civil-servant-controller.js
  why: Controller that needs Select2 integration and dynamic label logic
  
- file: D:\hrProject\salary-adjustment\src\civil-servant-calculator.js
  why: Calculator logic that must be preserved
```

### Current Codebase Structure
```bash
salary-adjustment/
├── examples/new-salary-2025/     # Reference implementation
│   ├── script.js                 # Select2, jQuery, AJAX patterns
│   ├── index.html                # Reference radio button and dropdown HTML
│   └── style.css                 # Reference styling
├── src/
│   ├── civil-servant-calculator.js  # Core calculation engine (preserve)
│   └── civil-servant-controller.js  # UI controller (enhance)
├── civil-servant.html            # Target file for fixes
└── data/salaryCivilServant.json  # Data source
```

### Known Issues to Fix
```javascript
// ISSUE 1: Radio button styling - currently rectangular, should be circular
// Current problem: Tailwind classes create rectangular appearance
// Solution: Use proper radio button styling with circular indicators

// ISSUE 2: Static salary label - should be dynamic
// Current: "อัตราเงินเดือนปัจจุบัน" (static)
// Expected: Dynamic based on dateEffective selection
// - "อัตราเงินเดือน ณ 1 เมษายน 2567" when dateEffective = "1/5/2567"  
// - "อัตราเงินเดือน ณ 1 เมษายน 2568" when dateEffective = "1/5/2568"

// ISSUE 3: Education dropdown lacks Select2 integration
// Current: Native HTML select (limited functionality)
// Expected: Select2 with search, AJAX loading, jQuery integration
// Pattern: Follow examples/new-salary-2025/script.js implementation
```

### Required Dependencies
```html
<!-- Add to civil-servant.html head section -->
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
```

## Implementation Blueprint

### Data Models and Structure
Preserve existing data handling from civil-servant-calculator.js and integrate with Select2 patterns from examples/new-salary-2025.

### List of tasks to be completed to fulfill the PRP in order

```yaml
Task 1: Fix Radio Button Styling
MODIFY civil-servant.html:
  - FIND: Radio button sections for institution type selection
  - REPLACE: Rectangular styling with proper circular radio button design
  - PRESERVE: All existing functionality and form behavior
  - ADD: CSS classes for proper circular radio button appearance

Task 2: Add Dynamic Salary Label Logic  
MODIFY src/civil-servant-controller.js:
  - FIND: updateDegreeDropdown function or equivalent
  - ADD: updateSalaryLabel function with dateEffective logic
  - PATTERN: Mirror examples/new-salary-2025/script.js updateSalaryLabel implementation
  - PRESERVE: All existing controller functionality

Task 3: Add Select2 Dependencies
MODIFY civil-servant.html:
  - FIND: <head> section
  - ADD: jQuery and Select2 CDN links
  - POSITION: Before existing script tags
  - PRESERVE: All existing script loading order

Task 4: Implement Select2 for Education Dropdown
MODIFY src/civil-servant-controller.js:
  - FIND: populateDegreeSelect function
  - ADD: Select2 initialization logic
  - PATTERN: Follow examples/new-salary-2025/script.js initializeSelect2 implementation
  - PRESERVE: All qualification filtering and population logic

Task 5: Test and Validate
TEST: Radio button appearance and functionality
TEST: Dynamic label updates with dateEffective changes  
TEST: Select2 dropdown search and selection
TEST: All existing calculation logic preserved
TEST: Cross-browser compatibility
TEST: Mobile responsiveness
```

### Per Task Pseudocode

```javascript
// Task 1: Radio Button Styling Fix
// Update HTML structure to use proper radio button styling
<div class="flex items-center space-x-4">
  <label class="flex items-center space-x-2 cursor-pointer">
    <input type="radio" name="eduInstitute" id="eduDomestic" value="ในประเทศ" 
           class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" checked>
    <span class="text-gray-700">ในประเทศ</span>
  </label>
  <label class="flex items-center space-x-2 cursor-pointer">
    <input type="radio" name="eduInstitute" id="eduForeign" value="ต่างประเทศ"
           class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
    <span class="text-gray-700">ต่างประเทศ</span>
  </label>
</div>

// Task 2: Dynamic Salary Label Logic
function updateSalaryLabel() {
    const dateEffective = dateEffectiveSelect.value;
    const salaryLabelMap = {
        '1/5/2567': {
            label: 'อัตราเงินเดือน ณ 1 เมษายน 2567',
            placeholder: 'ระบุอัตราเงินเดือน ณ 1 เม.ย. 2567'
        },
        '1/5/2568': {
            label: 'อัตราเงินเดือน ณ 1 เมษายน 2568', 
            placeholder: 'ระบุอัตราเงินเดือน ณ 1 เม.ย. 2568'
        }
    };

    if (dateEffective && salaryLabelMap[dateEffective]) {
        const config = salaryLabelMap[dateEffective];
        salaryLabel.textContent = config.label;
        currentSalaryInput.placeholder = config.placeholder;
    }
}

// Task 4: Select2 Implementation
function initializeSelect2() {
    if (typeof $ !== 'undefined' && typeof $.fn.select2 !== 'undefined') {
        try {
            // Destroy existing Select2 if present
            if ($(degreeSelect).hasClass('select2-hidden-accessible')) {
                $(degreeSelect).select2('destroy');
            }
            
            // Initialize Select2 with Thai-aware configuration
            $(degreeSelect).select2({
                placeholder: "เลือกวุฒิที่บรรจุ หรือวุฒิในตำแหน่งปัจจุบัน",
                allowClear: true,
                width: '100%',
                language: {
                    noResults: function() { return "ไม่พบข้อมูลที่ต้องการ"; },
                    searching: function() { return "กำลังค้นหา..."; }
                }
            });
        } catch (error) {
            console.warn('Select2 initialization failed, using native dropdown');
        }
    }
}
```

### Integration Points
```yaml
HTML_PAGES:
  - modify: civil-servant.html
  - sections: ["head (add dependencies)", "radio buttons (fix styling)", "salary label (add id)"]
  
CONTROLLERS:
  - modify: src/civil-servant-controller.js
  - functions: ["updateSalaryLabel (new)", "initializeSelect2 (new)", "populateDegreeSelect (enhance)"]
  
STYLING:
  - modify: existing Tailwind classes in civil-servant.html
  - pattern: "Replace rectangular radio styling with circular design"
  
DATA:
  - preserve: src/civil-servant-calculator.js (no changes)
  - preserve: data/salaryCivilServant.json (no changes)
```

## Validation Loop

### Level 1: Build & Syntax
```bash
# Verify no syntax errors introduced
# Open civil-servant.html in browser
# Check browser console for JavaScript errors
# Expected: Clean loading with no console errors
```

### Level 2: Manual Testing - UI Fixes
```bash
# Test radio button appearance
1. Load civil-servant.html
2. Verify radio buttons display as circles, not rectangles
3. Test selection behavior works properly

# Test dynamic salary label
1. Change dateEffective selection
2. Verify label updates to correct Thai text:
   - 1/5/2567 → "อัตราเงินเดือน ณ 1 เมษายน 2567"
   - 1/5/2568 → "อัตราเงินเดือน ณ 1 เมษายน 2568"

# Test Select2 integration
1. Click education qualification dropdown
2. Verify Select2 interface appears
3. Test search functionality
4. Verify selection works properly

# Expected outcomes:
- Radio buttons are visually circular
- Labels update dynamically with date selection
- Select2 provides enhanced dropdown experience
- All existing functionality preserved
```

### Level 3: Cross-Browser Validation
```bash
# Test across browsers
Chrome/Edge: [Verify all fixes work properly]
Firefox: [Check radio button styling and Select2]  
Safari: [Validate mobile experience]
Mobile browsers: [Test touch interactions with radio buttons and Select2]

# Expected: Consistent experience across all platforms
```

### Level 4: Calculation Logic Verification
```javascript
// Verify calculation logic remains intact
const testCase = {
  effectiveDate: "1/5/2568",
  eduInstitute: "ในประเทศ",
  qualification: "ปริญญาโท หรือเทียบเท่า",
  currentSalary: 25000
}

// Verify calculation produces same results as before fixes
// All calculation logic from civil-servant-calculator.js must be preserved
```

## Final Validation Checklist
- [ ] Radio buttons display circular selection instead of rectangular
- [ ] Salary label updates dynamically with dateEffective selection
- [ ] Select2 dropdown works with search functionality
- [ ] All existing calculation logic preserved
- [ ] jQuery and Select2 load without conflicts
- [ ] Cross-browser compatibility maintained
- [ ] Mobile responsiveness preserved
- [ ] No JavaScript console errors
- [ ] Performance remains acceptable

---

## Anti-Patterns to Avoid
- ❌ Don't break existing calculation logic from civil-servant-calculator.js
- ❌ Don't modify data structure or API calls
- ❌ Don't change existing form validation logic
- ❌ Don't break responsive design with radio button changes
- ❌ Don't introduce jQuery conflicts with existing code
- ❌ Don't hardcode label text that should be dynamic
- ❌ Don't skip Select2 error handling for unsupported browsers
- ❌ Don't modify existing controller methods without understanding dependencies

## Thai Government Specific Considerations
- Radio button labels must remain in formal Thai language
- Dynamic salary labels must use official government date format
- Select2 interface should support Thai language search
- All monetary amounts and dates must maintain government accuracy standards
- UI changes must maintain professional government appearance standards

---

## 🚨 PRP STATUS UPDATE - 2025

### Current Implementation Status: **NOT APPLICABLE - NO CALCULATOR EXISTS**

This PRP addresses specific UI fixes for civil servant salary calculator functionality, but **no calculator exists** on civil-servant.html to apply these fixes to.

#### 🔍 **CURRENT REALITY CHECK**
- **Page Type**: civil-servant.html is currently a **static information page**, not a calculator
- **No Form**: There are no radio buttons, salary input fields, or education dropdowns to fix
- **No Calculator Section**: The "คำนวณการปรับเงินเดือน" section referenced in this PRP does not exist
- **Different Implementation**: The page focuses on **legal information cards** instead of calculation functionality

#### 📋 **ORIGINAL PRP GOALS: NOT APPLICABLE**
All specific UI fixes in this PRP are **not applicable** to the current page:
- ❌ Radio button styling fixes (no radio buttons exist)
- ❌ Dynamic salary label updates (no salary input field exists)
- ❌ Select2 integration for education dropdown (no education dropdown exists)
- ❌ jQuery/AJAX implementation (no dynamic form functionality)
- ❌ Form validation enhancements (no form to validate)

#### ✅ **WHAT WAS ACTUALLY IMPLEMENTED - DIFFERENT UI ENHANCEMENTS**
Instead of calculator UI fixes, the team implemented:
- **Legal Information Cards UI**: Professional card styling with hover effects
- **External Link Integration**: Proper link handling with visual indicators
- **Responsive Design**: Mobile-optimized layout for information cards
- **Typography Standards**: Consistent font rendering and spacing
- **Government Styling**: Professional appearance meeting official standards

#### 🔄 **DEPENDENCY RELATIONSHIP**
This PRP **requires** calculator functionality to exist first:
1. **Missing Prerequisite**: Calculator form and functionality (from `civil-servant-calculator-enhancement.md`)
2. **Logical Dependency**: Cannot fix UI elements that don't exist
3. **Implementation Order**: Calculator → UI Fixes → Enhancement

#### 📝 **CURRENT UI QUALITY ASSESSMENT**
While calculator UI fixes aren't applicable, the **current page UI quality is high**:

**Professional Standards Met:**
- ✅ **Visual Consistency**: Cards follow government design patterns
- ✅ **Interactive Elements**: Proper hover effects and transitions
- ✅ **Typography**: Consistent Thai font rendering
- ✅ **Responsive Design**: Mobile-optimized interactions
- ✅ **Government Appearance**: Professional styling standards
- ✅ **Cross-browser Support**: Consistent appearance across browsers

#### 🎯 **RECOMMENDATION FOR FUTURE DEVELOPMENT**
If calculator functionality is implemented in the future:
1. **First**: Implement `civil-servant-calculator-enhancement.md`
2. **Then**: Apply the UI fixes from this PRP
3. **Integration**: Ensure fixes work with existing legal information system
4. **Testing**: Follow the validation framework in this PRP

#### 🔄 **PRP STATUS**
- **Status**: **NOT APPLICABLE - NO CALCULATOR TO FIX**
- **Prerequisite**: Calculator implementation required before UI fixes
- **Blueprint Validity**: All specifications remain valid for future calculator implementation
- **Current Page Value**: High-quality UI achieved through alternative approach (legal information system)
- **Priority**: Not applicable until calculator exists

#### 💡 **ALTERNATIVE VALUE ACHIEVED**
While the specific goals of this PRP weren't applicable, **similar UI quality standards were achieved**:
- Professional government interface design
- Responsive and accessible interactions
- Consistent visual styling across elements
- Proper external link handling and visual feedback
- Mobile-optimized user experience

**Last Updated**: January 2025  
**Implementation Team**: Claude Code Development  
**Status**: Not applicable - no calculator functionality exists to apply UI fixes to