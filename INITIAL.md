# Thai Government Salary Adjustment System - INITIAL Context

## FEATURE:

- Multi-page web application for Thai government employee salary calculations
- Government employee (พนักงานราชการ) salary calculator with dynamic filtering
- Civil servant (ข้าราชการ) salary calculation system with comprehensive results display
- Legal information system with interactive cards linking to official OCSC documents
- Responsive design with Thai language support and enhanced UI/UX
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
- [x] Accurate salary calculations matching government specifications
- [x] Proper Thai language rendering across all browsers
- [x] Responsive design working on all device sizes
- [x] Multi-page navigation functioning correctly
- [x] Data filtering and search working reliably
- [x] Interactive legal information cards with external links
- [x] Civil servant salary calculator with education type selection
- [x] Comprehensive calculation results display

### Technical Requirements  
- [x] Clean build process with no errors
- [x] Optimized bundle size under 500KB initial load
- [x] Fast page load times (<3 seconds on 3G)
- [x] Cross-browser compatibility maintained
- [x] Proper error handling with user-friendly messages
- [x] Enhanced UI with hover effects and smooth animations
- [x] Proper external link handling with security considerations

### Quality Standards
- [x] Code follows existing project patterns
- [x] Thai language content is culturally appropriate
- [x] Government data presentation meets official standards
- [x] User experience is intuitive for government employees
- [x] Documentation is comprehensive and accurate
- [x] Consistent design patterns across all pages
- [x] Proper typography and spacing standards established

## RECENT COMPLETED TASKS (2025)

### Civil Servant Page Enhancement Project
**Scope**: Complete overhaul of civil-servant.html with interactive legal information system

#### ✅ Legal Information Cards Implementation
- Added interactive cards section "กฎหมายและหนังสือเวียนที่เกี่ยวข้อง"
- Integrated external links to official OCSC (Office of the Civil Service Commission) documents
- Implemented proper hover effects and visual feedback for user interaction
- Added external link icons with consistent styling patterns

#### ✅ Individual Document Links
- **ว 9/2567**: Direct link to salary rates for CSC-approved qualifications
- **แนวทางการปรับเงินเดือน**: Links to implementation guidelines  
- **หนังสือเวียนเดิม**: Individual clickable links for legacy regulations:
  - ว 20/2555, ว 3/2555, ว 19/2555 with proper underline separation

#### ✅ UI/UX Improvements
- Enhanced hover effects with scale transformations and color transitions
- Implemented smooth animations with consistent timing (duration-200)
- Standardized typography with proper font weights and line heights
- Resolved underline overlap issues for inline links
- Achieved visual consistency across all information cards

#### ✅ Code Quality & Standards
- Maintained clean HTML structure with semantic elements
- Applied consistent Tailwind CSS class naming conventions
- Ensured proper accessibility with target="_blank" and visual indicators
- Optimized performance through efficient CSS selectors
- Established reusable patterns for future development

#### ✅ Documentation Updates
- Updated README.md with new feature descriptions
- Enhanced CLAUDE.md with development guidance for new features
- Documented established patterns and code quality standards
- Updated project status in INITIAL.md with completed tasks

### Technical Achievements
- **Zero Breaking Changes**: All enhancements maintained backward compatibility
- **Performance Optimized**: No impact on page load times or bundle size
- **Cross-Browser Tested**: Consistent behavior across modern browsers
- **Mobile Responsive**: Proper scaling and interaction on all device sizes
- **Government Standards Compliant**: Meets official Thai government web standards