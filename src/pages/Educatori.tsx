import React from 'react';
import { MapPin, Award, BookOpen } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { EducatorProfiles } from '@/components/sections/EducatorProfiles';

const Educatori = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
              I nostri educatori
            </h1>
            <p className="text-xl text-slate/80 max-w-3xl mx-auto">
              Professionisti appassionati e qualificati che portano competenza, 
              sicurezza e amore per la natura in ogni laboratorio.
            </p>
          </div>
        </div>
      </section>

      {/* Educators Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EducatorProfiles />

          {/* Team Values */}
          <div className="mt-16 bg-gradient-hero rounded-3xl p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate mb-4">
                I nostri valori
              </h2>
              <p className="text-slate/80 max-w-2xl mx-auto">
                Ogni membro del team Api Cesarine condivide la passione per l'educazione 
                e l'impegno verso la sicurezza e la qualità.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-forest/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-forest" />
                </div>
                <h3 className="font-semibold text-slate mb-2">Competenza</h3>
                <p className="text-sm text-slate/70">Formazione continua e aggiornamento professionale costante</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-forest/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-forest" />
                </div>
                <h3 className="font-semibold text-slate mb-2">Passione</h3>
                <p className="text-sm text-slate/70">Amore genuino per la natura e l'educazione dei giovani</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-forest/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-forest" />
                </div>
                <h3 className="font-semibold text-slate mb-2">Territorio</h3>
                <p className="text-sm text-slate/70">Conoscenza profonda delle specificità locali</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Educatori;