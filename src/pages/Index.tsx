import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import USPSection from '@/components/sections/USPSection';
import HowItWorks from '@/components/sections/HowItWorks';
import WorkshopPreview from '@/components/sections/WorkshopPreview';
import SEOHead from '@/components/common/SEOHead';
import { pageSEO, organizationStructuredData } from '@/utils/seo';

const Index = () => {
  const seoData = {
    ...pageSEO.home,
    canonical: "https://api-famiglia.lovable.app",
    structuredData: organizationStructuredData
  };

  return (
    <Layout>
      <SEOHead {...seoData} />
      <Hero />
      <USPSection />
      <HowItWorks />
      <WorkshopPreview />
    </Layout>
  );
};

export default Index;
