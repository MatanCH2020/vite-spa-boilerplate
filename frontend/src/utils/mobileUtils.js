// Mobile utility functions for enhanced compatibility

/**
 * Detects if the device is a mobile device
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Detects if the device is iOS
 */
export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

/**
 * Detects if the device is Android
 */
export const isAndroid = () => {
  return /Android/.test(navigator.userAgent);
};

/**
 * Handles viewport height issues on mobile browsers
 */
export const setViewportHeight = () => {
  // Fix for mobile browsers where 100vh doesn't account for address bar
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

/**
 * Prevents double-tap zoom on iOS
 */
export const preventDoubleTabZoom = () => {
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
};

/**
 * Handles focus events to prevent zoom on iOS
 */
export const preventInputZoom = () => {
  if (isIOS()) {
    // Temporarily disable zoom when focusing inputs
    const addMaximumScaleToMetaViewport = () => {
      const el = document.querySelector('meta[name=viewport]');
      if (el !== null) {
        let content = el.getAttribute('content');
        let re = /maximum-scale=[0-9.]+/g;
        
        if (re.test(content)) {
          content = content.replace(re, 'maximum-scale=1.0');
        } else {
          content = [content, 'maximum-scale=1.0'].join(', ');
        }
        
        el.setAttribute('content', content);
      }
    };

    const restoreScaleToMetaViewport = () => {
      const el = document.querySelector('meta[name=viewport]');
      if (el !== null) {
        let content = el.getAttribute('content');
        let re = /maximum-scale=[0-9.]+/g;
        
        if (re.test(content)) {
          content = content.replace(re, 'maximum-scale=5.0');
        }
        
        el.setAttribute('content', content);
      }
    };

    document.addEventListener('focusin', addMaximumScaleToMetaViewport);
    document.addEventListener('focusout', restoreScaleToMetaViewport);
  }
};

/**
 * Adds touch-friendly click events
 */
export const addTouchSupport = () => {
  // Add touch support for better responsiveness
  document.addEventListener('touchstart', () => {}, { passive: true });
};

/**
 * Handles safe area insets for notched devices
 */
export const handleSafeArea = () => {
  // Check if device supports safe area insets
  if (CSS.supports('padding-top: env(safe-area-inset-top)')) {
    document.documentElement.classList.add('has-safe-area');
  }
};

/**
 * Optimizes images for mobile
 */
export const optimizeImagesForMobile = () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Add loading lazy for better performance
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Add decoding async for better performance
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
  });
};

/**
 * Initializes all mobile optimizations
 */
export const initMobileOptimizations = () => {
  // Set viewport height
  setViewportHeight();
  
  // Prevent double-tap zoom on iOS
  if (isIOS()) {
    preventDoubleTabZoom();
    preventInputZoom();
  }
  
  // Add touch support
  addTouchSupport();
  
  // Handle safe area
  handleSafeArea();
  
  // Optimize images
  optimizeImagesForMobile();
  
  // Re-calculate viewport height on resize/orientation change
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', () => {
    setTimeout(setViewportHeight, 100);
  });
  
  // Add loaded class to body to prevent FOUC
  document.body.classList.add('loaded');
};

/**
 * Shows install prompt for PWA
 */
export const showInstallPrompt = () => {
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show install button or banner
    const installButton = document.querySelector('.install-button');
    if (installButton) {
      installButton.style.display = 'block';
      installButton.addEventListener('click', () => {
        // Hide the app provided install promotion
        installButton.style.display = 'none';
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
      });
    }
  });
};