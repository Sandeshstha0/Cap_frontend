// components/Layout.tsx
import React from 'react';

import Footer from './Footer';
import Navbar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Navbar />
      <main className="flex-grow mt-18 ">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
