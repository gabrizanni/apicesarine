export interface RedirectRule {
  from: string;
  to: string;
  status: number;
}

export const redirectRules: RedirectRule[] = [
  // Old workshop slugs to new ones
  { from: '/laboratori/api-bambini', to: '/laboratori#piccoli-impollinatori', status: 301 },
  { from: '/laboratori/api-elementari', to: '/laboratori#api-e-scienza', status: 301 },
  { from: '/laboratori/api-scienza', to: '/laboratori#api-e-scienza', status: 301 },
  { from: '/laboratori/api-medie', to: '/laboratori#ecosistemi-sostenibilita', status: 301 },
  
  // Old page structure
  { from: '/about', to: '/chi-siamo', status: 301 },
  { from: '/contact', to: '/contatti', status: 301 },
  { from: '/workshops', to: '/laboratori', status: 301 },
  { from: '/book', to: '/prenota', status: 301 },
  { from: '/teachers', to: '/materiali-docenti', status: 301 },
  { from: '/educators', to: '/educatori', status: 301 },
  { from: '/gallery', to: '/galleria', status: 301 },
  { from: '/stories', to: '/storie', status: 301 },
  
  // SEO redirects
  { from: '/laboratori-api', to: '/laboratori', status: 301 },
  { from: '/corsi-api', to: '/laboratori', status: 301 },
  { from: '/attivita-didattiche-api', to: '/laboratori', status: 301 },
];

export const handleRedirect = (currentPath: string): string | null => {
  const rule = redirectRules.find(rule => 
    currentPath === rule.from || 
    currentPath.startsWith(rule.from + '/')
  );
  
  if (rule) {
    // Handle query parameters and fragments
    const url = new URL(window.location.href);
    const search = url.search;
    const hash = url.hash;
    
    return rule.to + search + hash;
  }
  
  return null;
};

export const RedirectHandler = () => {
  const currentPath = window.location.pathname;
  const redirectTo = handleRedirect(currentPath);
  
  if (redirectTo) {
    window.history.replaceState(null, '', redirectTo);
  }
  
  return null;
};