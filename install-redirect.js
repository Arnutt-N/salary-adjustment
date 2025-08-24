#!/usr/bin/env node

/**
 * Auto-installer for Redirect Script
 * This script automatically adds redirect script to HTML files
 */

const fs = require('fs');
const path = require('path');

// Configuration
const REDIRECT_SCRIPT_TAG = '<script src="/src/redirect.js"></script>';
const TARGET_FILES = ['index.html', 'civil-servant.html'];

/**
 * Add redirect script to HTML file
 */
function addRedirectScript(filePath) {
    try {
        console.log(`📝 Processing: ${filePath}`);
        
        // Read file content
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if script is already added
        if (content.includes('/src/redirect.js')) {
            console.log(`✅ Script already exists in ${filePath}`);
            return false;
        }
        
        // Find insertion point (before </head> or </body>)
        let insertionPoint = content.lastIndexOf('</head>');
        if (insertionPoint === -1) {
            insertionPoint = content.lastIndexOf('</body>');
        }
        
        if (insertionPoint === -1) {
            console.log(`❌ Cannot find insertion point in ${filePath}`);
            return false;
        }
        
        // Insert the script tag
        const beforeInsertion = content.substring(0, insertionPoint);
        const afterInsertion = content.substring(insertionPoint);
        const newContent = beforeInsertion + 
                          '  <!-- Redirect Script -->\n' +
                          '  ' + REDIRECT_SCRIPT_TAG + '\n  ' +
                          afterInsertion;
        
        // Write back to file
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✅ Successfully added redirect script to ${filePath}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        return false;
    }
}

/**
 * Main installation function
 */
function installRedirectScript() {
    console.log('🚀 Installing Redirect Script...\n');
    
    let successCount = 0;
    
    TARGET_FILES.forEach(filename => {
        const filePath = path.join(process.cwd(), filename);
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  File not found: ${filename}`);
            return;
        }
        
        // Add script to file
        if (addRedirectScript(filePath)) {
            successCount++;
        }
    });
    
    console.log(`\n📊 Installation Summary:`);
    console.log(`   Successfully modified: ${successCount} file(s)`);
    console.log(`   Target files: ${TARGET_FILES.length}`);
    
    if (successCount > 0) {
        console.log('\n✅ Redirect script installation completed!');
        console.log('🔄 Now index.html and civil-servant.html will redirect to gov-emp.html');
    } else {
        console.log('\n⚠️  No files were modified. Please check manually.');
    }
}

// Run the installer
if (require.main === module) {
    installRedirectScript();
}

module.exports = { addRedirectScript, installRedirectScript };
