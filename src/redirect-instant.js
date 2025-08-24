/**
 * Instant Redirect Script (No Flash)
 * Redirects immediately without waiting for DOM
 */

(function() {
    'use strict';
    
    /**
     * Get current page filename
     */
    function getCurrentPageName() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename;
    }
    
    /**
     * Check if current page should be redirected
     */
    function shouldRedirect() {
        const currentPage = getCurrentPageName();
        
        // Handle root path (/) as index.html
        if (window.location.pathname === '/' || currentPage === '') {
            return true;
        }
        
        // Pages that should be redirected
        const redirectPages = ['index.html', 'civil-servant.html'];
        return redirectPages.includes(currentPage);
    }
    
    /**
     * Perform instant redirect
     */
    function performInstantRedirect() {
        // Use replace() to avoid adding to browser history
        window.location.replace('gov-emp.html');
    }
    
    // Execute immediately - no waiting for DOM
    if (shouldRedirect()) {
        performInstantRedirect();
    }
    
})();
