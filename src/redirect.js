/**
 * Redirect Script for Salary Adjustment System
 * Version: 1.0.0
 * Purpose: Redirect specific pages to gov-emp.html
 */

(function() {
    'use strict';
    
    /**
     * Configuration for redirects
     */
    const REDIRECT_CONFIG = {
        // Target page to redirect to
        targetPage: 'gov-emp.html',
        
        // Delay before redirect (milliseconds)
        delay: 0,
        
        // Show console message for debugging
        showDebugMessage: false,
        
        // Pages that should be redirected (based on current page filename)
        redirectPages: ['index.html', 'civil-servant.html']
    };

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
        
        return REDIRECT_CONFIG.redirectPages.includes(currentPage);
    }

    /**
     * Perform the redirect
     */
    function performRedirect() {
        const currentPage = getCurrentPageName();
        
        if (REDIRECT_CONFIG.showDebugMessage) {
            console.log(`🔄 Redirecting from ${currentPage} to ${REDIRECT_CONFIG.targetPage}`);
        }

        // Use setTimeout for delay if specified
        setTimeout(() => {
            // Use replace() to avoid adding to browser history
            window.location.replace(REDIRECT_CONFIG.targetPage);
        }, REDIRECT_CONFIG.delay);
    }

    /**
     * Initialize redirect functionality
     */
    function initRedirect() {
        // Only run on DOM content loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                if (shouldRedirect()) {
                    performRedirect();
                }
            });
        } else {
            // DOM is already loaded
            if (shouldRedirect()) {
                performRedirect();
            }
        }
    }

    /**
     * Public API for manual control (optional)
     */
    window.SalaryRedirect = {
        /**
         * Force redirect to gov-emp.html
         */
        forceRedirect: function() {
            performRedirect();
        },
        
        /**
         * Check if current page should redirect
         */
        shouldRedirect: shouldRedirect,
        
        /**
         * Get current page name
         */
        getCurrentPage: getCurrentPageName,
        
        /**
         * Update configuration
         */
        config: function(newConfig) {
            Object.assign(REDIRECT_CONFIG, newConfig);
        }
    };

    // Initialize the redirect system
    initRedirect();

})();
