# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Thai government salary adjustment information system built with Vite, Tailwind CSS, and vanilla JavaScript. The system calculates salary adjustments for government employees (พนักงานราชการ) and provides information about civil servant (ข้าราชการ) salary adjustments based on cabinet resolutions.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
npm run deploy
```

## Project Architecture

### Multi-Page Application Structure
The application uses Vite's multi-page setup defined in `vite.config.js`:
- `index.html` - Main landing page with navigation
- `gov-emp.html` - Government employee salary calculator
- `civil-servant.html` - Civil servant information page
- `coming-soon.html` - Placeholder page

### Core System Components

**SalaryCalculator Class** (`src/salary-calculator.js`)
- Handles fetching and querying salary data from JSON files
- Provides methods for filtering by work groups, degrees, and effective dates
- Core calculation logic for salary adjustments

**Form Controller** (`src/form-controller.js`)
- Manages UI interactions for the salary calculator form
- Handles dynamic dropdown population and form validation
- Coordinates between UI and SalaryCalculator class

**Component System** (`src/components/`)
- HTML component files that are dynamically loaded
- Includes headers, footers, and various toast notifications
- Components are loaded via `inline-components.js`

### Data Structure
Salary data is stored in `/public/data/salaryGovEmp.json` with fields:
- `workGroup` - Job category (กลุ่มงานต่างๆ)
- `degreeFull` - Education level
- `dateEffective` - Implementation date
- `salaryLast/salaryNew` - Old/new salary amounts
- `salaryMin/salaryMax` - Salary range
- `salaryRate` - Adjustment rate

### Styling System
- **Tailwind CSS** for utility-first styling
- **Prompt font** from Google Fonts for Thai text support
- **Lucide icons** for UI elements
- Custom CSS in `src/style.css` for additional styling

## Key Development Patterns

### Module Loading
- ES6 modules with Vite bundling
- Dynamic component loading in `inline-components.js`
- Async data loading in calculator initialization

### Thai Language Support
- All UI text is in Thai language
- Uses appropriate Thai fonts and formatting
- Date formats follow Thai conventions

### Error Handling
- Console logging for debugging throughout the application
- User-friendly Thai error messages
- Graceful fallbacks for data loading failures

## Data Management
- JSON-based data structure for salary information
- Client-side filtering and calculation
- No backend database - all data is static JSON files

## Build Configuration
- Vite for build tooling and development server
- Multi-page application setup in `vite.config.js`
- Tailwind CSS with PostCSS processing
- Production builds output to `dist/` directory