'use client';
import { useEffect } from 'react';

export default function PricingPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <stripe-pricing-table
        pricing-table-id="prctbl_1RQF1yGbPDlgmUqoCbDfjHVu"
        publishable-key="pk_live_51RQDtlGbPDlgmUqo1K9viTqQXApepgV2sscnKQRl4gzqzXp73geeTrTvzjrseCGUKsMhgYxclNVYNFUhxvKHONZQ00CjWWzWPX"
      ></stripe-pricing-table>
    </div>
  );
}