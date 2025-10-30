import React from 'react';
import Link from 'next/link';
import ConnectBankButton from '../../components/investors/ConnectBankButton';
import WorkshopExtensions from '../../components/extensions/WorkshopExtensions';

export default function SponsorsPage() {
  // In a real app, fetch sponsors and investor info via server-side props or SWR
  const sponsors = [
    { id: 's1', name: 'Acme Ventures', level: 'Gold' },
    { id: 's2', name: 'Beta Capital', level: 'Silver' },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Sponsors & Investors</h1>

      <section style={{ marginBottom: 32 }}>
        <h2>Become a Sponsor</h2>
        <p>
          Support the project — choose a sponsorship level or connect your bank to make secure transfers.
          We integrate Plaid and Stripe for secure bank linking and payments. We never store bank credentials.
        </p>

        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/sponsors/login">
            <button>Investor / Sponsor Login</button>
          </Link>

          {/* Plaid Link button to connect bank (client-side) */}
          <ConnectBankButton />
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>Current Sponsors</h2>
        <ul>
          {sponsors.map((s) => (
            <li key={s.id}>
              <strong>{s.name}</strong> — {s.level}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Integrations & Extensions</h2>
        <WorkshopExtensions />
      </section>
    </div>
  );
}
