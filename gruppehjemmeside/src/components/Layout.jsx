import React from 'react';
import NavSection from './NavSection';

export default function Layout({ children }) {
  return (
    <div>
      <NavSection />
      <main style={{ maxWidth: '1300px', margin: '0 auto' }}>{children}</main>
    </div>
  );
}
