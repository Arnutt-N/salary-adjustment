# Create PRP - Thai Government Salary System

## Feature file: $ARGUMENTS

Generate a complete PRP for Thai government salary system feature implementation with thorough research and frontend-specific context. Ensure comprehensive context is passed to enable self-validation and iterative refinement. Read the feature file first to understand what needs to be created, examining Thai language requirements, government data accuracy needs, and frontend implementation patterns.

The AI agent only gets the context you provide in the PRP plus training data. Assume the AI agent has codebase access and same knowledge cutoff as you, so research findings must be included or referenced. The Agent has WebSearch capabilities for documentation and examples.

## Research Process

1. **Thai Government System Analysis**
   - Review CLAUDE.md and INITIAL.md for system architecture and requirements
   - Analyze existing salary calculation patterns in src/salary-calculator.js
   - Study form interaction patterns in src/form-controller.js
   - Examine Thai language support implementations
   - Check component loading system in src/inline-components.js
   - Review government data structure in public/data/salaryGovEmp.json

2. **Frontend Architecture Research**
   - Search for similar Vite multi-page application patterns
   - Identify JavaScript/HTML/CSS implementation approaches
   - Study Tailwind CSS patterns for Thai text support
   - Analyze responsive design patterns for government applications
   - Check browser compatibility requirements for Thai characters

3. **External Research**
   - Thai government web standards and accessibility guidelines
   - Vite.js documentation (include specific URLs for multi-page apps)
   - Tailwind CSS documentation (Thai font and text rendering)
   - JavaScript best practices for government applications
   - Implementation examples from similar government systems
   - Browser compatibility data for Thai language support

4. **Government-Specific Considerations**
   - Thai language formality and terminology requirements
   - Government data accuracy and precision standards
   - Accessibility requirements for government employees
   - Performance requirements for government infrastructure
   - Security considerations for government data

## PRP Generation

Using PRPs/templates/prp_base.md as template:

### Critical Context for Thai Government System
- **Documentation**: 
  - CLAUDE.md (project architecture and commands)
  - INITIAL.md (comprehensive Thai government context)
  - Vite.js multi-page configuration URLs
  - Tailwind CSS Thai language support documentation
  - Government web accessibility guidelines

- **Code Patterns**:
  - src/salary-calculator.js (calculation logic, Thai date formatting)
  - src/form-controller.js (UI interaction, form validation, Thai error messages)
  - src/inline-components.js (component loading system)
  - gov-emp.html (complete page structure with Thai content)
  - vite.config.js (multi-page application setup)

- **Data Structure**:
  - public/data/salaryGovEmp.json (government salary data format)
  - Thai work group classifications and terminology
  - Education level mappings in Thai language
  - Date format standards (DD/MM/YYYY for Thai government)

- **Thai Language Requirements**:
  - Prompt font from Google Fonts for Thai text
  - Unicode handling for Thai characters
  - Cultural considerations for government formality
  - Error message patterns in appropriate Thai language

### Implementation Blueprint for Frontend Features
- Start with pseudocode showing Thai-aware approach
- Reference existing calculation and form patterns
- Include Thai language validation strategy
- Plan responsive design for government users
- Consider mobile access patterns for government employees
- Address browser compatibility across government infrastructure

### Validation Gates (Must be Executable for Frontend)
```bash
# Build Validation
npm run build
# Expected: Clean build with no errors, Thai text renders properly

# Development Server Check
npm run dev
# Expected: Clean startup, no console errors, proper Thai font loading

# Cross-Browser Manual Testing
# Chrome/Edge: Thai text rendering and calculations
# Firefox: Font compatibility and responsive design
# Safari: Mobile experience validation
# Expected: Consistent Thai text display and accurate calculations

# Government Data Accuracy Verification
# Test sample salary calculations against government specifications
# Verify Thai date parsing and formatting
# Check currency formatting for Thai Baht
# Expected: Exact mathematical accuracy, no approximations
```

### Thai Government Specific Testing
```javascript
// Data Integrity Tests
const testGovernmentData = {
  workGroup: "%8H!2'4
2
5@	20",
  degree: "#42@- +#7-@5"@H2", 
  currentSalary: 27300,
  expectedResult: 30030
};

// Verify calculations match government specifications exactly
// Test Thai date format parsing (DD/MM/YYYY)
// Validate Thai currency formatting with proper separators
// Check work group classifications against official terminology
```

*** CRITICAL BEFORE WRITING THE PRP ***

*** ULTRATHINK about Thai government requirements, frontend architecture patterns, data accuracy needs, and user experience for government employees. Consider:
- How will this feature integrate with existing Thai salary calculation system?
- What are the specific government data accuracy requirements?
- How should Thai language be handled throughout the implementation?
- What are the responsive design needs for government users?
- How will this work across different browsers used by government employees?
- What validation and error handling patterns should be followed?
THEN START WRITING THE PRP ***

## Output
Save as: `PRPs/{feature-name}.md`

## Quality Checklist for Thai Government System
- [ ] All necessary Thai language context included
- [ ] Government data accuracy requirements documented
- [ ] Frontend validation gates are executable
- [ ] References existing Thai government patterns
- [ ] Clear implementation path for multi-page Vite app
- [ ] Thai language error handling documented
- [ ] Browser compatibility considerations addressed
- [ ] Mobile responsiveness for government users planned
- [ ] Security considerations for government data included
- [ ] Performance requirements for government infrastructure noted

## Frontend-Specific Quality Gates
- [ ] Build process validation included
- [ ] Thai font loading verification planned
- [ ] Cross-browser testing strategy defined
- [ ] Government data calculation accuracy tests specified
- [ ] Responsive design validation for Thai content
- [ ] Component integration with existing system planned
- [ ] URL structure and navigation consistency maintained

Score the PRP on a scale of 1-10 (confidence level for one-pass implementation success using Claude Code)

## Success Criteria for Thai Government PRPs
A high-quality PRP for this system should:
- Provide complete context for Thai language implementation
- Include executable validation steps for frontend features
- Reference existing government calculation patterns
- Address browser compatibility for Thai text rendering
- Ensure mathematical accuracy for government salary data
- Maintain cultural appropriateness for Thai government users
- Plan for accessibility across government infrastructure
- Consider performance on older government hardware

Remember: The goal is one-pass implementation success through comprehensive Thai government system context and frontend-specific guidance.