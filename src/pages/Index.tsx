import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import USPSection from '@/components/sections/USPSection';
import HowItWorks from '@/components/sections/HowItWorks';
import WorkshopPreview from '@/components/sections/WorkshopPreview';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <USPSection />
      <HowItWorks />
      <WorkshopPreview />
    </Layout>
  );
};

export default Index;
