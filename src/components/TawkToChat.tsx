
'use client';

import { useEffect } from 'react';

export default function TawkToChat() {
  useEffect(() => {
    // Replace YOUR_TAWK_TO_ID with your actual Tawk.to property ID
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/YOUR_TAWK_TO_ID/1234567890';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="tawk.to"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}
