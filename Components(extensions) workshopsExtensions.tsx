import React from 'react';

export default function WorkshopExtensions() {
  const extensions = [
    { id: 'ext-git', name: 'GitHub Marketplace Listing', href: 'https://github.com/marketplace' },
    { id: 'ext-ai', name: 'AI Integration Tools', href: '/workshop/extensions/ai-tooling' },
  ];

  return (
    <div>
      <p>Add-ons and extensions let you export, automate, or monetize builder workflows. You can publish extensions to GitHub Marketplace for discoverability.</p>
      <ul>
        {extensions.map(e => (
          <li key={e.id}><a href={e.href} target="_blank" rel="noopener noreferrer">{e.name}</a></li>
        ))}
      </ul>
    </div>
  );
}
