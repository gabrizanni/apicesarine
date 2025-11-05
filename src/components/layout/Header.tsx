import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flower2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/custom-button';
import MobileNav from './MobileNav';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const Header = () => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Laboratori',
      items: [
        { name: 'Tutti i laboratori', href: '/laboratori', description: 'Scopri i nostri percorsi didattici' },
        { name: 'Educatori', href: '/educatori', description: 'Il nostro team di esperti' },
      ]
    },
    { name: 'Per le scuole', href: '/chi-siamo' },
    {
      name: 'Risorse',
      items: [
        { name: 'Materiali docenti', href: '/materiali-docenti', description: 'Risorse educative gratuite' },
        { name: 'Storie', href: '/storie', description: 'Esperienze e testimonianze' },
        { name: 'FAQ', href: '/faq', description: 'Domande frequenti' },
        { name: 'Glossario', href: '/glossario', description: 'Termini e definizioni' },
      ]
    },
    {
      name: 'Chi siamo',
      items: [
        { name: 'La nostra storia', href: '/chi-siamo', description: 'Scopri il progetto' },
        { name: 'Galleria', href: '/galleria', description: 'Le nostre attività in foto' },
        { name: 'Contatti', href: '/contatti', description: 'Scrivici o chiamaci' },
      ]
    },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  const isInDropdown = (items: any[]) => items.some(item => isActive(item.href));
  return (
    <>
      {/* Skip to main content link */}
      <a href="#main-content" className="skip-link">
        Salta al contenuto principale
      </a>
      
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-soft" role="banner">
        <div className="container-responsive">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg">
              <div className="p-1.5 bg-gradient-honey rounded-xl group-hover:scale-105 transition-smooth">
                <Flower2 className="h-5 w-5 text-slate" />
              </div>
              <span className="text-lg font-semibold text-foreground">Api Cesarine</span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {'items' in item ? (
                      <>
                        <NavigationMenuTrigger 
                          className={cn(
                            "text-sm font-medium transition-smooth",
                            isInDropdown(item.items) && "text-primary bg-accent"
                          )}
                        >
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1">
                            {item.items.map((subItem) => (
                              <li key={subItem.name}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={subItem.href}
                                    className={cn(
                                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                      isActive(subItem.href) && "bg-accent text-primary font-medium"
                                    )}
                                    aria-current={isActive(subItem.href) ? "page" : undefined}
                                  >
                                    <div className="text-sm font-medium leading-none">{subItem.name}</div>
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                      {subItem.description}
                                    </p>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-sm font-medium transition-smooth",
                          isActive(item.href) 
                            ? "text-primary bg-accent" 
                            : "text-muted-foreground hover:bg-accent/50"
                        )}
                        aria-current={isActive(item.href) ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <Button asChild variant="cta" size="lg" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <Link to="/prenota">Prenota un laboratorio</Link>
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