(function () {
    'use strict';

    // Disable all keyboard shortcuts immediately
    document.addEventListener('keydown', function (e) {
        // F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }

        // Ctrl+Shift+I (DevTools)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }

        // Ctrl+Shift+C (Inspect Element)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.keyCode === 67)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }

        // Ctrl+Shift+K (Console Firefox)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'K' || e.keyCode === 75)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }

        // Ctrl+Shift+J (Console Chrome)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.keyCode === 74)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }

        // Ctrl+U (View Source)
        if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }

        // Ctrl+S (Save Page)
        if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }

        // Ctrl+A (Select All)
        if ((e.ctrlKey || e.metaKey) && (e.key === 'a' || e.key === 'A' || e.keyCode === 65)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }

        // Mac shortcuts
        if (e.metaKey && e.altKey && (e.key === 'i' || e.key === 'I' || e.keyCode === 73)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }

        if (e.metaKey && e.altKey && (e.key === 'c' || e.key === 'C' || e.keyCode === 67)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }
    }, true); // Use capture phase

    // Multiple event listeners for right click - more aggressive
    const preventContextMenu = function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
    };

    // Add multiple listeners for context menu
    document.addEventListener('contextmenu', preventContextMenu, true);
    document.addEventListener('contextmenu', preventContextMenu, false);

    // Prevent on window level too
    window.addEventListener('contextmenu', preventContextMenu, true);
    window.addEventListener('contextmenu', preventContextMenu, false);

    // Prevent text selection more aggressively
    const preventSelection = function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
    };

    document.addEventListener('selectstart', preventSelection, true);
    document.addEventListener('selectstart', preventSelection, false);
    document.addEventListener('mousedown', preventSelection, true);
    document.addEventListener('dragstart', preventSelection, true);

    // Add CSS with higher priority
    const style = document.createElement('style');
    style.innerHTML = `
        * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
            -webkit-user-drag: none !important;
            -khtml-user-select: none !important;
        }
        
        *::selection {
            background: transparent !important;
        }
        
        *::-moz-selection {
            background: transparent !important;
        }
        
        img, video, audio {
            -webkit-user-drag: none !important;
            -moz-user-drag: none !important;
            user-drag: none !important;
            pointer-events: none !important;
        }
    `;
    document.head.insertBefore(style, document.head.firstChild);

    // DevTools detection with multiple methods
    let devtools = {
        open: false,
        detected: false
    };

    // Method 1: Window size detection (improved)
    function checkWindowSize() {
        const threshold = 160;
        const heightDiff = window.outerHeight - window.innerHeight;
        const widthDiff = window.outerWidth - window.innerWidth;

        return heightDiff > threshold || widthDiff > threshold;
    }

    // Method 2: Performance timing
    function checkPerformance() {
        const start = performance.now();
        // This will cause a pause if debugger is open
        eval('debugger');
        const end = performance.now();
        return (end - start) > 100;
    }

    // Method 3: Console detection
    function checkConsole() {
        let opened = false;
        const element = document.createElement('div');
        element.__defineGetter__('id', function () {
            opened = true;
        });
        console.log(element);
        console.clear();
        return opened;
    }

    // Method 4: toString detection
    function checkToString() {
        let opened = false;
        setInterval(function () {
            const before = Date.now();
            (function () { }).constructor("debugger")();
            const after = Date.now();
            if (after - before > 100) {
                opened = true;
            }
        }, 100);
        return opened;
    }

    // Main detection function
    function detectDevTools() {
        const detected = checkWindowSize() || checkConsole();

        if (detected && !devtools.detected) {
            devtools.detected = true;
            devtools.open = true;
            handleDevToolsDetected();
        } else if (!detected && devtools.open) {
            // Don't automatically restore - once detected, stay blocked
            // devtools.open = false;
        }
    }

    // Handle detection
    function handleDevToolsDetected() {
        // Clear all content and show warning
        document.documentElement.innerHTML = `
            <html>
            <head>
                <title>Access Denied</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        background: linear-gradient(45deg, #000, #333);
                        color: #ff0000;
                        font-family: 'Courier New', monospace;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        text-align: center;
                        overflow: hidden;
                    }
                    .warning {
                        border: 2px solid #ff0000;
                        padding: 50px;
                        border-radius: 10px;
                        background: rgba(0,0,0,0.8);
                        box-shadow: 0 0 50px #ff0000;
                        animation: blink 1s infinite;
                    }
                    @keyframes blink {
                        0% { opacity: 1; }
                        50% { opacity: 0.5; }
                        100% { opacity: 1; }
                    }
                    h1 {
                        font-size: 3em;
                        margin: 0;
                        text-shadow: 2px 2px 4px #000;
                    }
                    p {
                        font-size: 1.2em;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <div class="warning">
                    <h1>🚫 ACCESS DENIED</h1>
                    <p>Developer Tools Detected!</p>
                    <p>This page has been disabled for security reasons.</p>
                    <p>Please close all developer tools and refresh the page.</p>
                </div>
                <script>
                    // Prevent any bypass attempts
                    setInterval(() => {
                        if (console.clear) console.clear();
                        if (typeof devtools !== 'undefined') {
                            window.location.reload();
                        }
                    }, 100);
                    
                    // Block common shortcuts even on this page
                    document.addEventListener('keydown', function(e) {
                        if (e.key === 'F12' || e.keyCode === 123 ||
                            (e.ctrlKey && e.shiftKey) ||
                            (e.metaKey && e.altKey) ||
                            (e.ctrlKey && e.keyCode === 85) ||
                            e.key === 'F5' || e.keyCode === 116) {
                            e.preventDefault();
                            return false;
                        }
                    });
                    
                    // Disable right click on warning page too
                    document.addEventListener('contextmenu', e => e.preventDefault());
                </script>
            </body>
            </html>
        `;

        // Additional protection
        setTimeout(() => {
            if (window.location.href.includes('vercel.app')) {
                window.location.href = 'about:blank';
            }
        }, 5000);
    }

    // Start detection immediately and repeatedly
    setInterval(detectDevTools, 200);

    // Also check on window focus
    window.addEventListener('focus', detectDevTools);
    window.addEventListener('blur', detectDevTools);

    // Anti-debugger - more aggressive
    let debugCounter = 0;
    setInterval(() => {
        debugCounter++;
        if (debugCounter % 3 === 0) {
            (function () {
                try {
                    debugger;
                } catch (e) { }
            })();
        }
    }, 50);

    // Additional protection against common bypass methods

    // Redefine console to detect usage
    const originalConsole = window.console;
    window.console = new Proxy(originalConsole, {
        get: function (target, prop) {
            if (prop === 'clear' || prop === 'log' || prop === 'warn' || prop === 'error') {
                detectDevTools();
            }
            return target[prop];
        }
    });

    // Monitor for suspicious activity
    let keyPressCount = 0;
    document.addEventListener('keydown', function () {
        keyPressCount++;
        if (keyPressCount > 10) {
            detectDevTools();
        }
    });

    // Reset counter periodically
    setInterval(() => {
        keyPressCount = 0;
    }, 2000);

    // Show initial warning in console
    setTimeout(() => {
        console.clear();
        console.log('%c🚫 STOP!', 'color: red; font-size: 50px; font-weight: bold; text-shadow: 2px 2px 4px black;');
        console.log('%cThis is a browser feature intended for developers only.', 'color: red; font-size: 18px; font-weight: bold;');
        console.log('%cUnauthorized access or tampering is prohibited and monitored.', 'color: orange; font-size: 16px;');
    }, 100);

})();