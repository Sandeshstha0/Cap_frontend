// components/Layout.tsx
import React from 'react';

import Footer from './Footer';
import Navbar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col  ">
      <Navbar />
      <main className="flex-grow  ">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
