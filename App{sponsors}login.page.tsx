import React from 'react';
import InvestorLogin from '../../../components/investors/InvestorLogin';

export default function InvestorLoginPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Investor / Sponsor Login</h1>
      <p>Use your investor account to manage sponsorships, payouts, and payment methods.</p>
      <InvestorLogin />
      <p style={{ marginTop: 12 }}>
        No account? Contact <a href="mailto:investors@example.com">investors@example.com</a> to request access.
      </p>
    </div>
  );
}
