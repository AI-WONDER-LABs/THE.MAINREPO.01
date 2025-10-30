'use client';
import React from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';

/*
  Secure flow:
  - Client requests a link_token from /api/payments/plaid/create_link_token
  - Use react-plaid-link to open Plaid Link
  - On success receive public_token -> send to server to exchange for access_token
  - Server calls Plaid / item/public_token/exchange and stores access token in secure vault (NOT in repo)
*/

export default function ConnectBankButton() {
  const [linkToken, setLinkToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    // fetch link token from server
    axios.get('/api/payments/plaid/create_link_token').then((r) => setLinkToken(r.data.link_token)).catch(() => {
      // handle error (server not configured)
      setLinkToken(null);
    });
  }, []);

  const onSuccess = React.useCallback(async (public_token: string, metadata: any) => {
    try {
      // send public_token to server to exchange for access_token (server only)
      await axios.post('/api/payments/plaid/exchange_public_token', { public_token, metadata });
      alert('Bank linked successfully (server should securely persist token)');
    } catch (err) {
      alert('Failed to link bank: ' + String(err));
    }
  }, []);

  const config = React.useMemo(() => ({
    token: linkToken || '',
    onSuccess,
    // optional: onExit, onEvent etc.
  }), [linkToken, onSuccess]);

  const { open, ready } = usePlaidLink(config);

  return (
    <button onClick={() => open()} disabled={!ready || !linkToken}>
      {linkToken ? 'Connect your bank (Plaid)' : 'Preparing connection...'}
    </button>
  );
}
