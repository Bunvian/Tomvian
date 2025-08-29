{
  "protection": {
    "name": "anti-copy-shield",
    "version": "1.0.0",
    "description": "Client-side protection against code copying"
  },

  "disable": {
    "rightClick": true,
    "textSelection": true,
    "dragAndDrop": true,
    "printScreen": true,
    "saveAs": true,
    "copy": true,
    "cut": true,
    "paste": true,
    "selectAll": true,
    "imageRightClick": true,
    "imageDrag": true,
    "linkDrag": true
  },

  "keyboardBlocking": {
    "enabled": true,
    "blockedKeys": [
      "F12", "F10", "F9", "F8", "F7", "F6", "F5", "F4", "F3", "F2", "F1",
      "Ctrl+S", "Ctrl+A", "Ctrl+C", "Ctrl+V", "Ctrl+X", "Ctrl+P", "Ctrl+U", 
      "Ctrl+Shift+I", "Ctrl+Shift+J", "Ctrl+Shift+C", "Ctrl+Shift+K",
      "Ctrl+Shift+E", "Ctrl+Shift+F", "Ctrl+Shift+R", "Ctrl+R", "Ctrl+F5",
      "Ctrl+Shift+Delete", "Ctrl+Shift+N", "Ctrl+T", "Ctrl+N", "Ctrl+W",
      "Alt+F4", "Alt+Tab", "Win+R", "Win+E", "Win+D", "Win+L",
      "Shift+F10", "Insert", "Delete", "Home", "End", "PageUp", "PageDown"
    ]
  },

  "devToolsProtection": {
    "enabled": true,
    "detectInterval": 500,
    "methods": ["debugger", "console", "inspector", "firebug", "devtools"],
    "redirectOnDetect": true,
    "redirectUrl": "https://www.google.com",
    "showAlert": true,
    "alertMessage": "Developer tools detected! Access denied.",
    "blockPage": true,
    "infiniteLoop": true
  },

  "mouseProtection": {
    "disableRightClick": true,
    "disableMiddleClick": true,
    "disableSelection": true,
    "disableDragStart": true,
    "disableContextMenu": true,
    "customContextMenu": false
  },

  "textProtection": {
    "disableSelection": true,
    "disableHighlight": true,
    "blurOnSelect": true,
    "clearSelection": true,
    "selectableElements": [],
    "userSelectNone": true,
    "webkitUserSelectNone": true,
    "mozUserSelectNone": true
  },

  "visualProtection": {
    "disableImageSave": true,
    "disableVideoPoster": true,
    "preventScreenshot": true,
    "hideSourceCode": true,
    "obfuscateClasses": true,
    "randomizeIds": true,
    "encryptText": false,
    "blurOnInactive": false
  },

  "networkProtection": {
    "blockProxies": true,
    "blockVPNs": true,
    "blockTor": true,
    "blockBots": true,
    "allowedUserAgents": [
      "Mozilla/5.0",
      "Chrome/",
      "Safari/",
      "Firefox/",
      "Edge/"
    ],
    "blockedUserAgents": [
      "curl",
      "wget",
      "python",
      "scrapy",
      "selenium",
      "phantomjs",
      "headless"
    ]
  },

  "domProtection": {
    "hideSourceInspector": true,
    "preventElementInspect": true,
    "blockElementSelection": true,
    "dynamicClassNames": true,
    "shuffleElements": true,
    "removeComments": true,
    "minifyHTML": true
  },

  "monitoring": {
    "trackCopyAttempts": true,
    "trackDevToolsUsage": true,
    "trackSuspiciousActivity": true,
    "trackKeyboardEvents": true,
    "trackMouseEvents": true,
    "maxViolations": 5,
    "violationTimeout": 300000,
    "logToConsole": false,
    "logToServer": false
  },

  "contentSecurity": {
    "headers": {
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff", 
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "no-referrer",
      "Cache-Control": "no-store, no-cache, must-revalidate"
    }
  },

  "antiBot": {
    "enabled": true,
    "captcha": true,
    "mouseMovementTracking": true,
    "clickPatternAnalysis": true,
    "timingAnalysis": true,
    "behaviorScore": 70
  },

  "performance": {
    "lazyLoadProtection": true,
    "minimumViewTime": 2000,
    "maxRequestsPerMinute": 60,
    "rateLimiting": true
  },

  "alerts": {
    "showWarnings": true,
    "warningMessages": {
      "rightClick": "Right-click disabled for security!",
      "devTools": "Developer tools access blocked!",
      "copyAttempt": "Content copying is not allowed!",
      "keyBlocked": "This action is restricted!",
      "sourceView": "Source code viewing is prohibited!"
    }
  },

  "whitelist": {
    "enabled": true,
    "domains": ["yourdomain.com", "www.yourdomain.com"],
    "ips": ["127.0.0.1"],
    "adminEmails": ["admin@yourdomain.com"]
  },

  "advanced": {
    "virtualKeyboard": false,
    "screenWatermark": false,
    "timeBasedAccess": false,
    "geolocationBlock": false,
    "printBlocking": true,
    "clipboardProtection": true,
    "memoryClearing": true,
    "antiScreenReader": false
  },

  "customRules": {
    "blockIframes": true,
    "blockEmbeds": true,
    "blockObjects": true,
    "preventZoom": true,
    "blockTextZoom": true,
    "preventPageSearch": true,
    "blockPageTranslation": true
  }
}