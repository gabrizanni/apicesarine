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
              <pattern id="hexagon-main" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                <polygon points="2.5,0.3 4.3,1.5 4.3,3.5 2.5,4.7 0.7,3.5 0.7,1.5" fill="currentColor" className="text-honey/[0.08]" />
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