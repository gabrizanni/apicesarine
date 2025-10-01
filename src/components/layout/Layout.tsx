import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 relative" id="main-content" role="main" tabIndex={-1}>
        {/* Hexagon background overlay for main content only */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="hexagon-main" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                <polygon points="7.5,1 13,4.5 13,10.5 7.5,14 2,10.5 2,4.5" fill="currentColor" className="text-slate/8" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#hexagon-main)" />
          </svg>
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;