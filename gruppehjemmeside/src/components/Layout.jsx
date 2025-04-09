import React from 'react';
import NavSection from './NavSection';

export default function Layout({ children }) {
  return (
    <div>
      <NavSection />
      <main>{children}</main>
    </div>
  );
}
