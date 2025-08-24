name: "Thai Government Salary System PRP Template v1 - Frontend Feature Implementation"
description: |

## Purpose
Template optimized for AI agents to implement features in the Thai Government Salary Adjustment System with sufficient context and validation capabilities to achieve working code through iterative refinement.

## Core Principles
1. **Context is King**: Include ALL necessary documentation, examples, and Thai language requirements
2. **Validation Loops**: Provide executable tests/builds the AI can run and fix
3. **Information Dense**: Use keywords and patterns from the existing codebase
4. **Progressive Success**: Start simple, validate, then enhance
5. **Global rules**: Be sure to follow all rules in CLAUDE.md and INITIAL.md

---

## Goal
[What needs to be built - be specific about the end state and user experience]

## Why
- [Business value and impact on government employees/citizens]
- [Integration with existing salary calculation system]
- [Problems this solves for Thai government users]

## What
[User-visible behavior and technical requirements in Thai context]

### Success Criteria
- [ ] [Specific measurable outcomes with Thai language support]
- [ ] [Government data accuracy requirements]
- [ ] [Cross-browser compatibility including mobile]

## All Needed Context

### Documentation & References (list all context needed to implement the feature)
```yaml
# MUST READ - Include these in your context window
- file: CLAUDE.md
  why: Project setup, architecture, and development commands
  
- file: INITIAL.md
  why: Complete context for Thai government system requirements
  
- file: src/salary-calculator.js
  why: [Core calculation patterns, data handling, Thai formatting]
  
- file: src/form-controller.js
  why: [UI interaction patterns, form validation, error handling]
  
- file: public/data/salaryGovEmp.json
  why: [Data structure, Thai language fields, calculation logic]
  
- doc: https://vitejs.dev/guide/
  section: [Specific Vite features you'll need]
  critical: [Multi-page app configuration, asset handling]

- doc: https://tailwindcss.com/docs/
  section: [Thai text support, responsive design]
  critical: [Font loading, Thai character rendering]
```

### Current Codebase Structure
```bash
salary-adjustment/
├── public/
│   ├── data/salaryGovEmp.json    # Government salary data
│   └── images/                   # Thai government assets
├── src/
│   ├── components/              # HTML component templates
│   ├── salary-calculator.js    # Core calculation engine
│   ├── form-controller.js       # UI interaction management
│   ├── inline-components.js     # Component loading system
│   ├── main.js                  # Application entry point
│   └── style.css               # Custom Thai-aware styling
├── gov-emp.html                # Government employee page
├── civil-servant.html          # Civil servant info page
├── index.html                  # Landing page
└── vite.config.js             # Multi-page configuration
```

### Desired Codebase Changes (files to be added/modified)
```bash
[Specify new files and their responsibilities]
├── src/
│   ├── [new-feature].js       # [Description of new functionality]
│   └── components/
│       └── [new-component].html # [Thai language UI component]
├── [new-page].html            # [New page if needed]
└── public/data/
    └── [new-data].json        # [Additional government data if needed]
```

### Known Gotchas of Thai Government System & Library Quirks
```javascript
// CRITICAL: Thai language and government requirements
// Example: All dates must be in DD/MM/YYYY format for Thai government
// Example: Salary amounts must be precise to 2 decimal places
// Example: Work group names must match exact Thai terminology
// Example: Font loading for Thai characters requires proper fallbacks
// Example: Government data validation is strict - no approximations
// Example: Component loading happens after DOM ready - timing matters
// Example: Vite serves public files from root in dev but /assets in build
```

## Implementation Blueprint

### Data Models and Structure

Create/modify data handling for Thai government requirements ensuring accuracy and consistency.
```javascript
// Examples:
// - Government salary data validation
// - Thai date format handling  
// - Work group classification
// - Education level mapping
// - Currency formatting for Thai Baht
```

### List of tasks to be completed to fulfill the PRP in order

```yaml
Task 1:
MODIFY src/existing-module.js:
  - FIND pattern: "existing function or class"
  - INJECT after line containing "specific marker"
  - PRESERVE existing Thai language support

CREATE src/new-feature.js:
  - MIRROR pattern from: src/salary-calculator.js
  - MODIFY for new functionality
  - KEEP error handling and Thai formatting identical

UPDATE [page].html:
  - ADD new UI elements with Thai labels
  - PRESERVE existing responsive design
  - MAINTAIN government styling consistency

...

Task N:
TEST and VALIDATE:
  - Browser compatibility
  - Thai text rendering
  - Government data accuracy
  - Mobile responsiveness
```

### Per Task Pseudocode (add as needed to each task)
```javascript
// Task 1 Example
// Pseudocode with CRITICAL Thai government details
function newFeature(inputData) {
    // PATTERN: Always validate Thai government data first
    const validated = validateGovernmentData(inputData) // see salary-calculator.js
    
    // GOTCHA: Thai dates need special parsing DD/MM/YYYY
    const parsedDate = parseThaiDate(validated.dateEffective)
    
    // PATTERN: Use existing calculation patterns
    const calculation = calculateSalaryAdjustment(validated, parsedDate)
    
    // CRITICAL: Government accuracy requirements - no rounding
    const preciseResult = formatThaiCurrency(calculation, 2)
    
    // PATTERN: Consistent error messaging in Thai
    return formatResponse(preciseResult) // see form-controller.js
}
```

### Integration Points
```yaml
HTML_PAGES:
  - modify: [specific-page].html
  - pattern: "Add new section after existing Thai content blocks"
  
COMPONENTS:
  - add to: src/components/
  - pattern: "Follow existing Thai component structure"
  
STYLING:
  - update: src/style.css
  - pattern: "Add Thai-aware responsive classes"
  
DATA:
  - modify: public/data/salaryGovEmp.json
  - critical: "Maintain exact government data structure"
```

## Validation Loop

### Level 1: Build & Syntax
```bash
# Run these FIRST - fix any errors before proceeding
npm run build                    # Check if build succeeds
# Expected: Successful build with no errors in dist/

# Check for any console errors in development
npm run dev
# Expected: Clean startup, no console errors, Thai text renders correctly
```

### Level 2: Manual Testing - Government Requirements
```bash
# Test in development server
npm run dev

# Navigate to affected pages
# Test cases:
1. Thai text displays correctly across all browsers
2. Government data calculations are mathematically accurate
3. Form validation works with Thai input
4. Responsive design works on mobile devices
5. All interactive elements respond appropriately

# Expected outcomes:
- All Thai characters render properly
- Salary calculations match government specifications exactly
- Error messages display in appropriate Thai language
- UI remains consistent with government styling standards
```

### Level 3: Cross-Browser Validation
```bash
# Test across browsers
Chrome/Edge: [Verify Thai text and calculations]
Firefox: [Check font rendering and responsiveness]  
Safari: [Validate mobile experience]
Mobile browsers: [Test touch interactions]

# Expected: Consistent experience across all platforms
# Critical: Thai government employees must have reliable access
```

### Level 4: Data Accuracy Verification
```javascript
// Validate government data integrity
// Check sample calculations:
const testCase = {
  workGroup: "กลุ่มงานวิชาชีพเฉพาะ",
  degree: "ปริญญาเอก หรือเทียบเท่า",
  currentSalary: 27300,
  expectedNew: 30030
}

// Verify calculation produces exact government-specified results
// No approximations or rounding errors acceptable
```

## Final Validation Checklist
- [ ] Build succeeds: `npm run build`
- [ ] Development runs clean: `npm run dev`
- [ ] Thai text renders correctly in all browsers
- [ ] Government calculations are mathematically precise
- [ ] Mobile responsiveness maintained
- [ ] All interactive elements work properly
- [ ] Error handling provides appropriate Thai messages
- [ ] Performance remains acceptable for government users
- [ ] Documentation updated if needed

---

## Anti-Patterns to Avoid (Thai Government Context)
- ❌ Don't approximate government salary calculations - must be exact
- ❌ Don't ignore Thai character encoding - causes display issues
- ❌ Don't break existing multi-page navigation consistency
- ❌ Don't use informal Thai language - maintain government formality  
- ❌ Don't hardcode text that should be in data files
- ❌ Don't skip mobile testing - many users access on phones
- ❌ Don't modify existing calculation logic without understanding implications
- ❌ Don't ignore console errors - they indicate problems users will encounter
- ❌ Don't skip cross-browser testing - government users have varying setups
- ❌ Don't compromise data accuracy for performance - accuracy is paramount

## Thai Government Specific Considerations
- All monetary amounts must be precise to the baht
- Date formats must follow Thai government standards (DD/MM/YYYY)
- Work group terminology must match official government classifications
- Error messages must be polite and formal in Thai language
- UI must maintain professional government appearance
- Performance must be acceptable for older government computers
- Accessibility considerations for government employees with disabilities