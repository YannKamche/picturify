import MobileNav from '@/components/shared/MobileNav';
import Sidebar from '@/components/shared/Sidebar';
import React from 'react'

// Layouts always export some children within them and allows you to put shared UI
const Layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <main className="root">
      {/* Sidebar */}
      <Sidebar />
      {/* Mobile */}
      <MobileNav />

      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
}

export default Layout
