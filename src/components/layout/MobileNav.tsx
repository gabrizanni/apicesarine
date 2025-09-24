import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Flower2 } from 'lucide-react';
import { Button } from '@/components/ui/custom-button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  navigation: Array<{ name: string; href: string }>;
}

const MobileNav = ({ navigation }: MobileNavProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden focus-ring"
          aria-label="Apri menu di navigazione"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-sm">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-honey rounded-xl">
              <Flower2 className="h-5 w-5 text-slate" />
            </div>
            <span className="text-lg font-semibold text-foreground">Api Cesarine</span>
          </SheetTitle>
        </SheetHeader>
        
        <nav className="mt-8 space-y-2" role="navigation" aria-label="Menu mobile">
          {navigation.map((item) => (
            <SheetClose asChild key={item.name}>
              <Link
                to={item.href}
                className={cn(
                  "block px-4 py-3 rounded-xl text-base font-medium transition-smooth focus-ring",
                  isActive(item.href)
                    ? "bg-accent text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.name}
              </Link>
            </SheetClose>
          ))}
          
          <div className="pt-6 border-t border-border">
            <SheetClose asChild>
              <Button asChild variant="cta" className="w-full focus-ring">
                <Link to="/prenota" aria-label="Richiedi un laboratorio didattico">
                  Richiedi un laboratorio
                </Link>
              </Button>
            </SheetClose>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;