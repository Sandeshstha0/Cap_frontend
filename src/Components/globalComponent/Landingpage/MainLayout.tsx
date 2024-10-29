// components/Layout.tsx
import React from 'react';

import Footer from './Footer';
import Navbar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="flex-grow  ">
        {children}
      </main>
      <Footer />
      </>
    
  );
};

export default Layout;
