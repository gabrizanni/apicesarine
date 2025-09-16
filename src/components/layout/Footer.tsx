import React from 'react';
import { Link } from 'react-router-dom';
import { Flower2, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/custom-button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-slate text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e descrizione */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-honey rounded-xl">
                <Flower2 className="h-6 w-6 text-slate" />
              </div>
              <span className="text-xl font-semibold">Api Cesarine</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Portiamo la meraviglia delle api direttamente nelle scuole italiane con laboratori educativi sicuri e coinvolgenti.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Rimani aggiornato</h4>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                <Input 
                  type="email" 
                  placeholder="La tua email"
                  className="bg-slate/50 border-gray-600 text-white placeholder:text-gray-400"
                />
                <Button variant="hero" size="lg">
                  Iscriviti
                </Button>
              </div>
            </div>
          </div>

          {/* Links utili */}
          <div>
            <h4 className="font-medium mb-4">Esplora</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/laboratori" className="text-gray-300 hover:text-honey transition-smooth">
                  I nostri laboratori
                </Link>
              </li>
              <li>
                <Link to="/educatori" className="text-gray-300 hover:text-honey transition-smooth">
                  I nostri educatori
                </Link>
              </li>
              <li>
                <Link to="/materiali-docenti" className="text-gray-300 hover:text-honey transition-smooth">
                  Materiali per docenti
                </Link>
              </li>
              <li>
                <Link to="/impatto" className="text-gray-300 hover:text-honey transition-smooth">
                  Il nostro impatto
                </Link>
              </li>
              <li>
                <Link to="/partner" className="text-gray-300 hover:text-honey transition-smooth">
                  Partner
                </Link>
              </li>
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="font-medium mb-4">Contatti</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@apicesarine.it</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+39 051 234 5678</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Bologna, Italia</span>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Seguici</h4>
              <div className="flex space-x-3">
                <a href="#" className="p-2 bg-slate/50 rounded-lg hover:bg-honey/20 transition-smooth">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="p-2 bg-slate/50 rounded-lg hover:bg-honey/20 transition-smooth">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="p-2 bg-slate/50 rounded-lg hover:bg-honey/20 transition-smooth">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Api Cesarine. Tutti i diritti riservati.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-honey text-sm transition-smooth">
                Privacy Policy
              </Link>
              <Link to="/cookie" className="text-gray-400 hover:text-honey text-sm transition-smooth">
                Cookie Policy
              </Link>
              <Link to="/termini" className="text-gray-400 hover:text-honey text-sm transition-smooth">
                Termini di Servizio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;