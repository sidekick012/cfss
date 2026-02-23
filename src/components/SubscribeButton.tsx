'use client';

import { useState } from 'react';

export default function SubscribeButton() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      // Calls the Stripe API route we just created
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      
      // Redirect the user to their customized Stripe Checkout URL
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="w-full bg-[#007AFF] hover:bg-[#0056b3] text-white h-[44px] rounded-[15px] flex items-center justify-center font-medium text-[15px] transition-colors tracking-wide disabled:opacity-50"
    >
      {loading ? 'Preparing Checkout...' : 'Subscribe for $30/Year'}
    </button>
  );
}