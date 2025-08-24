# Thai Government Salary Adjustment System - INITIAL Context

## FEATURE:

- Multi-page web application for Thai government employee salary calculations
- Government employee (พนักงานราชการ) salary calculator with dynamic filtering
- Civil servant (ข้าราชการ) information system
- Responsive design with Thai language support
- Static data-driven calculations using JSON files

## EXAMPLES:

In the existing codebase, key patterns to follow:
- `src/salary-calculator.js` - Core calculation logic and data management patterns
- `src/form-controller.js` - UI interaction and form validation patterns  
- `src/inline-components.js` - Dynamic component loading system
- `vite.config.js` - Multi-page application configuration
- `gov-emp.html` - Complete page structure with Thai language support

Don't copy these patterns directly but understand the architecture for consistent implementation.

## DOCUMENTATION:

- Vite Build Tool: https://vitejs.dev/
- Tailwind CSS: https://tailwindcss.com/
- Lucide Icons: https://lucide.dev/
- Thai Government Salary Data Structure: `/public/data/salaryGovEmp.json`

## PROJECT OVERVIEW

### Current Codebase Structure
```
salary-adjustment/
├── public/
│   ├── data/               # Government salary JSON data
│   └── images/             # Assets and logos
├── src/
│   ├── components/         # HTML component templates
│   ├── salary-calculator.js   # Core calculation engine
│   ├── form-controller.js     # UI interaction management
│   ├── inline-components.js   # Component loading system
│   ├── main.js               # Application entry point
│   └── style.css            # Custom styling
├── *.html                  # Multi-page application pages
├── vite.config.js          # Build configuration
├── tailwind.config.js      # CSS framework config
└── package.json           # Dependencies and scripts
```

### Core Architecture Patterns

**SalaryCalculator Class**: 
- Async JSON data loading with error handling
- Data filtering by work groups, degrees, effective dates
- Thai date format handling and calculations
- Immutable data operations

**Form Controller Pattern**:
- Dynamic dropdown population based on data
- Real-time form validation with Thai error messages  
- Event-driven UI updates
- Console logging for debugging

**Component System**:
- HTML template files in `/src/components/`
- Dynamic loading via `inline-components.js`
- Reusable UI elements (headers, footers, toasts)

## DEVELOPMENT SETUP

### Prerequisites
- Node.js version 16+
- npm or pnpm package manager
- Modern browser with ES6 module support

### Essential Commands
```bash
# Install dependencies
npm install

# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Deploy to Vercel
npm run deploy
```

### Key Configuration Files
- `vite.config.js`: Multi-page entry points configuration
- `tailwind.config.js`: CSS scanning paths for Thai content
- `package.json`: Build scripts and dependency management

## DATA STRUCTURE & CALCULATIONS

### Government Employee Salary Data Format
```json
{
  "id": 1,
  "workGroup": "กลุ่มงานวิชาชีพเฉพาะ",
  "degreeFull": "ปริญญาเอก หรือเทียบเท่า", 
  "dateEffective": "1/5/2024",
  "salaryLast": 27300,
  "salaryNew": 30030,
  "salaryMin": 10850,
  "salaryMax": 44550,
  "salaryRate": 0.84
}
```

### Critical Data Patterns
- Thai work group categories with specific ordering
- Education levels in Thai language
- Date formats in DD/MM/YYYY Thai convention
- Salary calculations with rate-based adjustments
- Min/max salary ranges for validation

## THAI LANGUAGE REQUIREMENTS

### Font & Typography
- Primary font: "Prompt" from Google Fonts
- Proper Thai character rendering and spacing
- Responsive text sizing for mobile devices

### Content Localization
- All UI text in Thai language
- Government terminology and formal language
- Proper Thai number formatting (comma separators)
- Thai date format presentation

### User Experience Considerations
- Right-to-left reading patterns consideration
- Thai keyboard input support
- Cultural appropriate error messaging
- Government standard UI conventions

## VALIDATION & TESTING FRAMEWORK

### Browser Compatibility
```bash
# Test across major browsers
- Chrome/Edge (Chromium-based)  
- Firefox
- Safari (if possible)
- Mobile browsers (iOS Safari, Android Chrome)
```

### Data Integrity Checks
```javascript
// Salary calculation accuracy
- Verify rate-based calculations
- Check min/max salary range validations  
- Confirm proper date filtering
- Validate Thai number formatting
```

### UI/UX Validation
```bash
# Responsive design testing
- Mobile viewport (320px-480px)
- Tablet viewport (768px-1024px) 
- Desktop viewport (1200px+)
- Thai text rendering at all sizes
```

### Performance Validation
```bash
# Build output analysis
npm run build
# Check bundle size in dist/ folder
# Verify asset optimization
# Test loading performance with large datasets
```

## CRITICAL IMPLEMENTATION CONSIDERATIONS

### Government Data Accuracy
- All salary calculations must be precise
- Data integrity paramount for government use
- Error handling must be comprehensive
- User feedback in appropriate Thai formal language

### Thai Language Support
- Proper Unicode handling for Thai characters
- Font loading optimization for Thai text
- Input validation for Thai language forms
- Cultural appropriate date/number formatting

### Multi-Page Architecture
- Consistent navigation between pages
- Shared component reuse across pages
- Proper asset loading for each page
- SEO considerations for Thai content

### Performance Optimization  
- Efficient JSON data loading and filtering
- Minimal JavaScript bundle size
- Optimized CSS delivery with Tailwind
- Fast initial page load for government users

## ANTI-PATTERNS TO AVOID

- ❌ Don't hardcode Thai text - use consistent data structures
- ❌ Don't ignore Thai character encoding issues
- ❌ Don't break multi-page navigation consistency  
- ❌ Don't compromise calculation accuracy for performance
- ❌ Don't ignore government accessibility standards
- ❌ Don't use inappropriate informal Thai language
- ❌ Don't break existing component loading patterns
- ❌ Don't introduce backend dependencies unnecessarily

## SUCCESS CRITERIA

### Functional Requirements
- [ ] Accurate salary calculations matching government specifications
- [ ] Proper Thai language rendering across all browsers
- [ ] Responsive design working on all device sizes
- [ ] Multi-page navigation functioning correctly
- [ ] Data filtering and search working reliably

### Technical Requirements  
- [ ] Clean build process with no errors
- [ ] Optimized bundle size under 500KB initial load
- [ ] Fast page load times (<3 seconds on 3G)
- [ ] Cross-browser compatibility maintained
- [ ] Proper error handling with user-friendly messages

### Quality Standards
- [ ] Code follows existing project patterns
- [ ] Thai language content is culturally appropriate
- [ ] Government data presentation meets official standards
- [ ] User experience is intuitive for government employees
- [ ] Documentation is comprehensive and accurate