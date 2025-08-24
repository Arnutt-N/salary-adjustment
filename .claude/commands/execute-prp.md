# Execute Thai Government System PRP

Implement a feature in the Thai Government Salary Adjustment System using the specified PRP file.

## PRP File: $ARGUMENTS

## Execution Process

1. **Load PRP and System Context**
   - Read the specified PRP file completely
   - Review CLAUDE.md for project architecture and commands
   - Study INITIAL.md for comprehensive Thai government requirements
   - Understand all context including Thai language needs and government accuracy standards
   - Follow all PRP instructions and extend research if needed for Thai government compliance
   - Ensure complete context for implementing Thai-aware frontend features
   - Conduct additional web searches for Thai government standards if required
   - Explore existing codebase patterns in salary-calculator.js and form-controller.js

2. **ULTRATHINK - Thai Government System Planning**
   - Analyze how this feature integrates with existing Thai salary calculation system
   - Consider Thai language implementation requirements (fonts, text rendering, cultural appropriateness)
   - Plan government data accuracy and validation requirements (no approximations allowed)
   - Think through responsive design needs for government users across devices
   - Consider browser compatibility for Thai characters across government infrastructure
   - Plan accessibility requirements for government employees
   - Create comprehensive implementation plan addressing all Thai government requirements
   - Break down complex tasks into smaller, manageable steps using TodoWrite tool
   - Identify existing patterns from salary-calculator.js, form-controller.js, and component system
   - Plan integration with multi-page Vite application architecture
   - Consider performance requirements for government infrastructure

3. **Execute Implementation Plan**
   - Use TodoWrite to track progress through implementation steps
   - Implement all code following existing Thai government system patterns
   - Ensure proper Thai language support (Prompt font, Unicode handling)
   - Maintain government data accuracy standards throughout implementation
   - Follow existing component loading and form interaction patterns
   - Preserve responsive design consistency across the application
   - Implement proper error handling with appropriate Thai language messages
   - Maintain integration with existing multi-page structure (vite.config.js)

4. **Frontend-Specific Validation**
   - **Build Validation**:
     ```bash
     npm run build
     # Expected: Clean build with no errors, proper Thai text in dist/
     ```
   
   - **Development Server Check**:
     ```bash
     npm run dev
     # Expected: Clean startup, no console errors, Thai fonts load correctly
     ```
   
   - **Thai Language Verification**:
     - Verify Thai text renders properly across browsers
     - Check Thai font loading and character display
     - Test Thai date formats (DD/MM/YYYY) display correctly
     - Validate Thai currency formatting with proper separators
   
   - **Government Data Accuracy**:
     - Test sample salary calculations against government specifications
     - Verify mathematical precision (no rounding errors)
     - Check work group classifications match official terminology
     - Validate education level mappings in Thai language
   
   - **Cross-Browser Compatibility**:
     - Chrome/Edge: Thai text rendering and responsive design
     - Firefox: Font compatibility and calculation accuracy
     - Safari: Mobile experience and touch interactions
     - Mobile browsers: Thai text readability and form usability
   
   - **Responsive Design Validation**:
     - Test on mobile devices (320px-480px)
     - Verify tablet compatibility (768px-1024px)
     - Check desktop experience (1200px+)
     - Ensure Thai text remains readable at all sizes

5. **Government System Quality Assurance**
   - **Data Integrity Check**:
     ```javascript
     // Verify government calculation accuracy
     const testCase = {
       workGroup: "%8H!2'4
2
5@	20",
       degree: "#42@- +#7-@5"@H2",
       currentSalary: 27300,
       expectedNew: 30030
     };
     // Must produce exact government-specified results
     ```
   
   - **Thai Language Compliance**:
     - All text uses appropriate government formality level
     - Error messages are culturally appropriate
     - Work group terms match official classifications
     - Date and currency formats follow Thai standards
   
   - **Performance Validation**:
     - Page load times acceptable for government infrastructure
     - Component loading doesn't block Thai text rendering
     - Form interactions responsive on older government hardware
     - Data filtering performance remains smooth with large datasets

6. **Final Completion Checklist**
   - [ ] All PRP checklist items completed
   - [ ] Build process succeeds without errors
   - [ ] Thai text renders correctly across all target browsers
   - [ ] Government salary calculations are mathematically exact
   - [ ] Responsive design works on mobile devices
   - [ ] Error handling provides appropriate Thai language feedback
   - [ ] Integration with existing system maintained
   - [ ] Performance acceptable for government users
   - [ ] Accessibility standards met for government employees
   - [ ] All validation gates pass successfully

7. **Thai Government System Final Validation**
   - Run complete build: `npm run build`
   - Test production preview: `npm run preview`
   - Verify all pages load correctly with Thai content
   - Test core user flows for government employees
   - Confirm data accuracy meets government standards
   - Validate cross-browser compatibility
   - Check mobile responsiveness with Thai text
   - Report completion status with specific Thai government compliance notes

8. **PRP Reference and Verification**
   - Re-read the original PRP to ensure all requirements implemented
   - Verify all "Success Criteria" items have been achieved
   - Confirm all "Anti-Patterns to Avoid" have been respected
   - Check that all Thai government specific considerations addressed
   - Validate that implementation follows existing codebase patterns
   - Ensure integration points properly implemented

## Error Recovery Patterns for Thai Government System

**Build Failures**:
- Check Vite configuration for multi-page setup
- Verify Thai font imports and asset paths
- Review component loading system integration
- Fix any ES6 module or import issues

**Thai Text Display Issues**:
- Verify Prompt font loading from Google Fonts
- Check Unicode encoding in HTML meta tags
- Validate CSS font-family fallbacks for Thai characters
- Test across different browser font rendering engines

**Government Data Calculation Errors**:
- Review salary-calculator.js patterns for mathematical precision
- Check Thai date parsing and formatting functions
- Verify work group classification logic matches government specifications
- Ensure currency formatting maintains exact precision

**Responsive Design Problems**:
- Test Thai text readability at different viewport sizes
- Check mobile form usability with Thai input
- Verify navigation consistency across device sizes
- Validate touch interactions for government mobile users

**Performance Issues**:
- Profile component loading performance
- Check Thai font loading impact on page speed
- Optimize data filtering for large government datasets
- Ensure smooth interactions on older government hardware

Note: Always prioritize government data accuracy and Thai language cultural appropriateness over convenience. If validation fails, use error patterns in PRP and existing codebase to fix and retry. Never compromise on mathematical precision or Thai language formality standards.