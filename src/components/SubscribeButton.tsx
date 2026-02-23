'use client';

import { useState } from 'react';

export default function SubscribeButton() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = (await response.json()) as { url?: string };
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned from Stripe');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert("We couldn't reach the payment server. Please try again."); // <-- New user feedback!
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