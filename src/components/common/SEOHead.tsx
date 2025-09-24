import { useEffect } from 'react';
import { SEOProps, updatePageMeta } from '@/utils/seo';

interface SEOHeadProps extends SEOProps {
  children?: React.ReactNode;
}

const SEOHead = ({ children, ...seo }: SEOHeadProps) => {
  useEffect(() => {
    updatePageMeta(seo);
  }, [seo]);

  return (
    <>
      {children}
      {seo.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seo.structuredData)
          }}
        />
      )}
    </>
  );
};

export default SEOHead;