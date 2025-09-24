export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string[];
  structuredData?: object;
}

export const defaultSEO: SEOProps = {
  title: "ApiFamiglia - Laboratori Educativi sulle Api nelle Scuole",
  description: "Scopri il mondo delle api con i nostri laboratori educativi interattivi. Programmi per tutte le età scolastiche: scienza, sostenibilità e impollinazione direttamente in classe.",
  keywords: ["laboratori api scuole", "educazione ambientale", "impollinazione didattica", "sostenibilità scuola", "STEM api", "educazione natura"],
  ogImage: "https://lovable.dev/opengraph-image-p98pqg.png"
};

export const pageSEO = {
  home: {
    title: "ApiFamiglia - Laboratori Educativi sulle Api nelle Scuole",
    description: "Portiamo le api a scuola con laboratori esperienziali su scienza, sostenibilità e impollinazione. 500+ scuole, 50k+ studenti coinvolti in tutta Italia.",
    keywords: ["laboratori api", "educazione ambientale scuole", "didattica api", "STEM natura", "sostenibilità bambini"]
  },
  laboratori: {
    title: "Laboratori Educativi sulle Api - Programmi per ogni Età | ApiFamiglia", 
    description: "Scopri i nostri laboratori sulle api per scuola dell'infanzia, primaria e secondaria. Programmi STEM coinvolgenti su impollinazione, ecosistemi e sostenibilità.",
    keywords: ["laboratori api scuole", "programmi didattici api", "STEM impollinazione", "educazione sostenibilità", "laboratori natura scuola"]
  },
  glossario: {
    title: "Glossario Api e Impollinazione - Termini Scientifici | ApiFamiglia",
    description: "Glossario completo sui termini scientifici delle api, impollinazione e apicoltura. Dizionario educativo per studenti e insegnanti.",
    keywords: ["glossario api", "termini impollinazione", "vocabolario apicoltura", "dizionario api scientifico", "terminologia apistica"]
  },
  prenota: {
    title: "Prenota un Laboratorio sulle Api per la tua Scuola | ApiFamiglia",
    description: "Richiedi un laboratorio educativo sulle api per la tua classe. Esperti educatori in tutta Italia. Programmi personalizzati per ogni età.",
    keywords: ["prenota laboratorio api", "richiesta attività didattiche", "educatori api scuole", "booking laboratori natura"]
  },
  educatori: {
    title: "I Nostri Educatori Esperti di Api e Natura | ApiFamiglia",
    description: "Conosci il nostro team di educatori specializzati in apicoltura e natura. Esperti qualificati per laboratori educativi nelle scuole.",
    keywords: ["educatori api", "esperti apicoltura scuole", "team educazione ambientale", "formatori natura"]
  },
  materiali: {
    title: "Materiali Didattici per Docenti - Risorse sulle Api | ApiFamiglia",
    description: "Scarica schede didattiche, attività e risorse gratuite sulle api per insegnanti. Materiali educativi per tutti i gradi scolastici.",
    keywords: ["materiali didattici api", "schede attività api", "risorse insegnanti natura", "download didattica api"]
  }
};

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "ApiFamiglia",
  "url": "https://api-famiglia.lovable.app",
  "logo": "https://api-famiglia.lovable.app/logo.png",
  "description": "Organizzazione educativa specializzata in laboratori didattici sulle api e l'impollinazione per scuole di ogni grado",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IT"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "url": "https://api-famiglia.lovable.app/contatti"
  },
  "sameAs": [
    "https://www.facebook.com/apifamiglia",
    "https://www.instagram.com/apifamiglia"
  ],
  "foundingDate": "2018",
  "educationalCredentialAwarded": "Certificato di partecipazione laboratorio educativo",
  "hasOfferingCatalog": {
    "@type": "OfferingCatalog",
    "name": "Laboratori Educativi sulle Api",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "Piccoli Impollinatori",
        "description": "Laboratorio per scuola dell'infanzia sul mondo delle api",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "ApiFamiglia"
        }
      }
    ]
  }
};

export const generateCourseStructuredData = (workshop: any) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": workshop.title,
  "description": workshop.description,
  "provider": {
    "@type": "EducationalOrganization",
    "name": "ApiFamiglia",
    "url": "https://api-famiglia.lovable.app"
  },
  "educationalLevel": workshop.audience,
  "timeRequired": `PT${workshop.duration}M`,
  "maximumAttendeeCapacity": workshop.maxStudents,
  "offers": {
    "@type": "Offer",
    "price": workshop.priceFrom,
    "priceCurrency": "EUR",
    "category": "Laboratorio Educativo"
  },
  "courseCode": workshop.slug,
  "inLanguage": "it-IT",
  "teaches": workshop.objectives,
  "syllabusSections": workshop.activities?.map((activity: string) => ({
    "@type": "Syllabus",
    "name": activity
  })),
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student",
    "audienceType": workshop.ageRange
  }
});

export const updatePageMeta = (seo: SEOProps) => {
  // Update title
  if (seo.title) {
    document.title = seo.title;
  }
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && seo.description) {
    metaDescription.setAttribute('content', seo.description);
  }
  
  // Update canonical
  if (seo.canonical) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seo.canonical);
  }
  
  // Update keywords
  if (seo.keywords) {
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.setAttribute('name', 'keywords');
      document.head.appendChild(keywords);
    }
    keywords.setAttribute('content', seo.keywords.join(', '));
  }
  
  // Update structured data
  if (seo.structuredData) {
    // Remove existing structured data
    const existingStructuredData = document.querySelector('script[type="application/ld+json"]');
    if (existingStructuredData) {
      existingStructuredData.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(seo.structuredData);
    document.head.appendChild(script);
  }
};