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
              <pattern id="hexagon-main" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                <polygon points="1.6,0.2 2.8,1 2.8,2.3 1.6,3.1 0.5,2.3 0.5,1" fill="currentColor" className="text-honey/[0.15]" />
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