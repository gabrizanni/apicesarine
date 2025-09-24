import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flower2 } from 'lucide-react';
import { Button } from '@/components/ui/custom-button';
import MobileNav from './MobileNav';
import { cn } from '@/lib/utils';

const Header = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Laboratori', href: '/laboratori' },
    { name: 'Educatori', href: '/educatori' },
    { name: 'Materiali', href: '/materiali-docenti' },
    { name: 'Chi Siamo', href: '/chi-siamo' },
    { name: 'Storie', href: '/storie' },
    { name: 'Galleria', href: '/galleria' },
    { name: 'Contatti', href: '/contatti' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Glossario', href: '/glossario' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Skip to main content link */}
      <a href="#main-content" className="skip-link">
        Salta al contenuto principale
      </a>
      
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft" role="banner">
        <div className="container-responsive">
          <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group focus-ring rounded-lg">
            <div className="p-1.5 sm:p-2 bg-gradient-honey rounded-xl group-hover:scale-105 transition-smooth">
              <Flower2 className="h-5 w-5 sm:h-6 sm:w-6 text-slate" />
            </div>
            <span className="text-lg sm:text-xl font-semibold text-foreground">Api Cesarine</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Menu principale">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-smooth hover:text-primary focus-ring rounded-sm px-2 py-1",
                  isActive(item.href) 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground"
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="cta" size="lg" className="focus-ring">
              <Link to="/prenota" aria-label="Richiedi un laboratorio didattico">Richiedi un laboratorio</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <MobileNav navigation={navigation} />
          </div>
        </div>
    </header>
    </>
  );
};

export default Header;