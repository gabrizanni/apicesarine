import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Flower2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/custom-button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface MobileNavItem {
  name: string;
  href?: string;
  items?: Array<{ name: string; href: string; description?: string }>;
}

interface MobileNavProps {
  navigation: MobileNavItem[];
}

const MobileNav = ({ navigation }: MobileNavProps) => {
  const location = useLocation();
  const [openItems, setOpenItems] = useState<string[]>([]);
  
  const isActive = (path: string) => location.pathname === path;
  
  // Auto-open Risorse if current page is a child
  React.useEffect(() => {
    const risorseItem = navigation.find(item => item.name === 'Risorse');
    if (risorseItem && 'items' in risorseItem && risorseItem.items) {
      const isRisorseChild = risorseItem.items.some(subItem => isActive(subItem.href));
      if (isRisorseChild && !openItems.includes('Risorse')) {
        setOpenItems(prev => [...prev, 'Risorse']);
      }
    }
  }, [location.pathname]);
  
  const toggleItem = (name: string) => {
    setOpenItems(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Apri menu di navigazione"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-md overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-honey rounded-xl">
              <Flower2 className="h-5 w-5 text-slate" />
            </div>
            <span className="text-lg font-semibold text-foreground">Api Cesarine</span>
          </SheetTitle>
        </SheetHeader>
        
        {/* CTA al top su mobile */}
        <div className="mt-6 pb-4 border-b border-border">
          <SheetClose asChild>
            <Button asChild variant="cta" className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Link to="/prenota" aria-label="Prenota un laboratorio didattico">
                Prenota un laboratorio
              </Link>
            </Button>
          </SheetClose>
        </div>
        
        <nav className="mt-6 space-y-1" role="navigation" aria-label="Menu mobile">
          {navigation.map((item) => (
            'items' in item && item.items ? (
              <Collapsible
                key={item.name}
                open={openItems.includes(item.name)}
                onOpenChange={() => toggleItem(item.name)}
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {item.name}
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    openItems.includes(item.name) && "rotate-180"
                  )} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-1 space-y-1">
                  {item.items.map((subItem) => (
                    <SheetClose asChild key={subItem.name}>
                      <Link
                        to={subItem.href}
                        className={cn(
                          "block pl-8 pr-4 py-2 rounded-lg text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          isActive(subItem.href)
                            ? "bg-accent text-primary font-medium"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        )}
                        aria-current={isActive(subItem.href) ? "page" : undefined}
                        tabIndex={openItems.includes(item.name) ? 0 : -1}
                      >
                        {subItem.name}
                      </Link>
                    </SheetClose>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SheetClose asChild key={item.name}>
                <Link
                  to={item.href!}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-base font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive(item.href!)
                      ? "bg-accent text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                  aria-current={isActive(item.href!) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </SheetClose>
            )
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;