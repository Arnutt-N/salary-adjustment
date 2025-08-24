name: "Civil Servant UI Enhancement - Match Gov-Emp Design Pattern"
description: |

## Purpose
Enhance civil-servant.html UI to match the professional design pattern of gov-emp.html while preserving the civil servant calculation logic from examples/new-salary-2025. Create a consistent user experience across the Thai Government Salary System.

## Core Principles
1. **Design Consistency**: Mirror gov-emp.html UI design exactly for professional government appearance
2. **Logic Preservation**: Keep civil servant calculation functionality from examples/new-salary-2025
3. **Thai Government Standards**: Maintain formal Thai language and government styling
4. **Responsive Design**: Ensure mobile compatibility for government employees
5. **Institution Type Integration**: Seamlessly integrate radio button functionality into the design pattern

---

## Goal
Transform civil-servant.html from basic Bootstrap form to professional government UI matching gov-emp.html design patterns while maintaining civil servant-specific calculation logic and institution type filtering.

## Why
- **Professional Appearance**: Government employees expect consistent, professional interfaces
- **User Experience**: Unified design reduces training and confusion across different calculators
- **Brand Consistency**: Maintains government system visual identity standards
- **Mobile Accessibility**: Government staff need reliable mobile access to salary calculations
- **Institutional Requirements**: Civil servant calculations require institution type filtering not present in gov-emp

## What
Transform civil-servant.html UI to match gov-emp.html design while preserving civil servant calculation logic:

### Success Criteria
- [ ] UI design matches gov-emp.html exactly (hero section, form cards, result cards)
- [ ] Institution type radio buttons integrated seamlessly into form design
- [ ] Civil servant calculation logic preserved with 823 salary records
- [ ] 6-section result display maintains professional appearance
- [ ] Responsive design works on all government devices
- [ ] Thai language consistency with formal government terminology
- [ ] Cross-browser compatibility maintained
- [ ] No Select2 dependencies - native elements only

## All Needed Context

### Documentation & References
```yaml
# MUST READ - Core design patterns
- file: gov-emp.html
  why: Complete UI design pattern, hero section, form layout, result cards
  
- file: src/civil-servant-calculator.js
  why: Core calculation logic for civil servants with institution filtering
  
- file: src/civil-servant-controller.js
  why: Form interaction patterns and result display logic
  
- file: public/data/salaryCivilServant.json
  why: Civil servant data structure (823 records, institution types)
  
- file: examples/new-salary-2025/script.js
  why: Calculation logic patterns and form validation from examples
  
- file: src/style.css
  why: Custom styling and Thai font support
  
- file: INITIAL.md
  why: Project architecture and Thai government requirements
```

### Current Codebase Structure
```bash
salary-adjustment/
├── public/
│   └── data/salaryCivilServant.json  # 823 civil servant salary records
├── src/
│   ├── components/                   # Header/footer templates
│   ├── civil-servant-calculator.js  # Institution filtering logic
│   ├── civil-servant-controller.js  # UI interaction management  
│   ├── main.js                       # Page detection and initialization
│   └── style.css                    # Custom Thai-aware styling
├── civil-servant.html               # TARGET: Current basic form
├── gov-emp.html                     # REFERENCE: Professional UI design
└── examples/new-salary-2025/        # LOGIC REFERENCE: Calculation patterns
```

### Desired Codebase Changes
```bash
├── civil-servant.html              # TRANSFORM: Apply gov-emp UI design
├── src/
│   ├── civil-servant-controller.js # UPDATE: Enhance for new UI elements
│   └── components/
│       └── civil-servant-result.html # CREATE: Result display template
```

### Known Gotchas of Thai Government System & UI Patterns
```javascript
// CRITICAL: gov-emp.html UI patterns that must be preserved
// - Hero section with gradient background and centered content
// - Two-column layout: form card (left) + result card (right)
// - Sticky result card behavior on desktop
// - Lucide icons for all form fields and sections
// - Professional color scheme: indigo/blue/gray palette
// - Border-radius and shadow consistency for cards
// - Form validation styling and error states
// - Thai typography and font loading

// CIVIL SERVANT SPECIFIC REQUIREMENTS
// - Institution type radio buttons must integrate into form design
// - 6-section result display (not 3-section like gov-emp)
// - Dynamic qualification loading based on institution selection
// - 823 salary records with domestic/foreign filtering
// - Professional government terminology in Thai

// TECHNICAL GOTCHAS
// - No jQuery/Select2 dependencies - use native elements
// - Tailwind CSS classes must match gov-emp.html exactly
// - Component loading timing with Vite module system
// - Responsive breakpoints for mobile government users
```

## Implementation Blueprint

### Data Models and Structure

Civil servant UI must handle institution-filtered data while maintaining gov-emp visual patterns.
```javascript
// Institution filtering integration with professional UI
const institutionTypes = [
  { value: 'ในประเทศ', label: 'สถานศึกษาในประเทศ', count: 586 },
  { value: 'ต่างประเทศ', label: 'สถานศึกษาต่างประเทศ', count: 237 }
];

// Result display must show 6 sections in professional card format
const resultSections = [
  'ผลการคำนวณ',
  'จำนวนเงินที่ได้ปรับ', 
  'อัตราเงินเดือนที่ได้รับ',
  'รายละเอียดการคำนวณ',
  'วิธีการคำนวณ',
  'หลักเกณฑ์และเงื่อนไข'
];
```

### List of tasks to be completed to fulfill the PRP in order

```yaml
Task 1:
ANALYZE gov-emp.html design structure:
  - IDENTIFY hero section structure and styling
  - MAP form card layout and field styling
  - DOCUMENT result card design and sections
  - NOTE responsive behavior and breakpoints
  - EXTRACT color palette and icon usage

Task 2:
TRANSFORM civil-servant.html structure:
  - REPLACE current Bootstrap layout with gov-emp design
  - ADD hero section with civil servant branding
  - CREATE two-column layout (form + results)
  - INTEGRATE institution type radio buttons into professional form design
  - PRESERVE existing form IDs and functionality

Task 3:
ENHANCE civil-servant-controller.js:
  - UPDATE result display for professional card format
  - IMPLEMENT 6-section result layout with proper styling
  - ADD smooth animations and transitions
  - MAINTAIN institution filtering logic
  - ENSURE mobile responsiveness

Task 4:
CREATE result display template:
  - BUILD professional result cards matching gov-emp style
  - INTEGRATE 6-section civil servant result structure
  - ADD proper icons and visual hierarchy
  - ENSURE Thai typography consistency
  - IMPLEMENT responsive behavior

Task 5:
INTEGRATE calculation logic:
  - PRESERVE civil servant calculation accuracy
  - MAINTAIN institution type filtering
  - ENSURE 823 record data handling
  - VALIDATE calculation precision
  - TEST edge cases and error handling

Task 6:
STYLING and visual consistency:
  - MATCH color palette exactly to gov-emp
  - APPLY consistent border-radius and shadows
  - ENSURE icon consistency (Lucide icons)
  - VALIDATE Thai font rendering
  - TEST responsive breakpoints

Task 7:
FINAL validation and testing:
  - VERIFY UI matches gov-emp design exactly
  - TEST calculation accuracy across all scenarios
  - VALIDATE mobile responsiveness
  - CHECK cross-browser compatibility
  - ENSURE accessibility standards
```

### Per Task Pseudocode

```javascript
// Task 2: Transform civil-servant.html structure
function transformCivilServantUI() {
    // PATTERN: Copy hero section from gov-emp.html exactly
    const heroSection = `
        <section class="relative flex items-center justify-center overflow-hidden" style="min-height: 85vh;">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 -z-10"></div>
            // ... exact gov-emp hero structure with civil servant content
        </section>
    `;
    
    // PATTERN: Two-column professional layout
    const calculatorSection = `
        <section class="py-20 bg-slate-100" id="calculator">
            <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="grid items-stretch grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                    // Form card (left) with institution radio buttons
                    // Result card (right) with 6-section display
                </div>
            </div>
        </section>
    `;
    
    // CRITICAL: Institution radio buttons in professional form styling
    const institutionRadios = `
        <div class="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <fieldset>
                <legend class="px-2 text-base font-medium text-gray-700">ประเภทสถานศึกษา</legend>
                // Professional radio button styling matching form theme
            </fieldset>
        </div>
    `;
}

// Task 3: Enhanced result display
function enhancedResultDisplay(result) {
    // PATTERN: Professional card-based result display
    const resultHTML = `
        <div class="space-y-4">
            // Section 1: Main results with icons and proper typography
            // Section 2-6: Professional cards with consistent styling
            // All sections follow gov-emp design patterns
        </div>
    `;
    
    // CRITICAL: Maintain calculation accuracy while enhancing visuals
    return formatProfessionalResult(result);
}
```

### Integration Points
```yaml
HTML_PAGES:
  - modify: civil-servant.html
  - pattern: "Replace entire body content with gov-emp design structure"
  
COMPONENTS:
  - update: src/civil-servant-controller.js
  - pattern: "Enhance result display for professional UI"
  
STYLING:
  - maintain: src/style.css
  - pattern: "Preserve custom Thai fonts and government styling"
  
DATA:
  - preserve: public/data/salaryCivilServant.json
  - critical: "Maintain 823 records with institution filtering"
```

## Validation Loop

### Level 1: Build & Syntax
```bash
# Verify build succeeds after UI transformation
npm run dev
# Expected: Clean startup, no console errors, UI loads properly

# Check for styling consistency
# Compare side-by-side with gov-emp.html
# Expected: Visual appearance matches exactly
```

### Level 2: Manual Testing - Government Requirements  
```bash
# Test responsive design
1. Desktop: Two-column layout with sticky result card
2. Tablet: Stacked layout with proper spacing
3. Mobile: Single column with optimized touch targets
4. Institution radio buttons: Professional appearance and functionality
5. Form validation: Consistent error styling with gov-emp
6. Result display: 6 sections with professional card styling

# Expected outcomes:
- Civil servant UI visually identical to gov-emp design
- Institution filtering works seamlessly
- All 823 salary records accessible
- Responsive behavior matches gov-emp patterns
```

### Level 3: Cross-Browser Validation
```bash
# Test across browsers with focus on government environments
Chrome/Edge: Professional appearance and full functionality
Firefox: Icon rendering and form interactions  
Safari: Mobile responsiveness and touch interfaces
IE11/Legacy: Basic functionality for older government systems

# Expected: Consistent professional appearance across all platforms
```

### Level 4: Calculation Accuracy Verification
```javascript
// Validate civil servant calculations with new UI
const testCase = {
  dateEffective: "1/5/2025",
  eduInstitute: "ในประเทศ",
  qualification: "ปริญญาตรี 4 ปี",
  currentSalary: 25000
};

// Verify calculation produces exact results in new UI
// Professional result display must maintain accuracy
```

## Final Validation Checklist
- [ ] UI design matches gov-emp.html exactly (hero, cards, layout)
- [ ] Institution radio buttons integrated professionally
- [ ] All 823 civil servant records accessible through new UI
- [ ] 6-section result display maintains professional appearance
- [ ] Responsive design works across all devices
- [ ] Cross-browser compatibility maintained
- [ ] Thai typography renders consistently
- [ ] Calculation accuracy preserved with enhanced visuals
- [ ] Loading performance acceptable for government users
- [ ] No JavaScript errors in console

---

## Anti-Patterns to Avoid (Thai Government Context)
- ❌ Don't deviate from gov-emp.html design patterns - maintain exact visual consistency
- ❌ Don't compromise calculation accuracy for visual enhancements
- ❌ Don't break institution type filtering functionality
- ❌ Don't ignore mobile responsiveness - many government staff use phones
- ❌ Don't add unnecessary animations that slow older government computers
- ❌ Don't use informal UI elements - maintain professional government appearance
- ❌ Don't hardcode Thai text - maintain data-driven content approach
- ❌ Don't skip cross-browser testing - government systems vary widely
- ❌ Don't modify existing calculation logic without thorough validation
- ❌ Don't introduce new dependencies - keep system lightweight and reliable

## Thai Government Specific Considerations
- UI must convey professional government authority and trustworthiness
- Visual hierarchy must guide users through complex salary calculations
- Error states must be clear and helpful in formal Thai language  
- Loading states must provide feedback for slower government networks
- Print functionality should work for official documentation
- Color contrast must meet accessibility standards for all users
- Touch targets must be sized appropriately for mobile government workers
- Institution type selection must be prominent and clear for accurate calculations