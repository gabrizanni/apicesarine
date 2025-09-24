import React from 'react';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

const SkipLink = ({ href, children }: SkipLinkProps) => {
  return (
    <a 
      href={href} 
      className="skip-link"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            (target as HTMLElement).focus();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }}
    >
      {children}
    </a>
  );
};

export default SkipLink;