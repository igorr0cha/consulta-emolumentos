
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="shadow-lg border-b sticky top-0 z-50" style={{ backgroundColor: '#00489a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="documentall-logo.png" 
              alt="Logo Documentall"
              className="w-10 h-10 object-contain rounded" 
            />
            <div>
              <h1 className="text-xl font-bold text-white">Documentall</h1>
              <p className="text-xs text-white/80">Consulta de Emolumentos</p>
            </div>
          </Link>

          {/* Navigation Menu */}
          <nav className="flex items-center space-x-6">
            <Link to="/">
              <Button 
                variant="ghost"
                className={`text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-white/20 text-white hover:bg-white/30' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Consulta
              </Button>
            </Link>

            <Link to="/links-estados">
              <Button 
                variant="ghost"
                className={`text-sm font-medium transition-colors ${
                  isActive('/links-estados') 
                    ? 'bg-white/20 text-white hover:bg-white/30' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Tabelas de Emolumentos
              </Button>
            </Link>

            <Link to="/aliquotas-itbi">
              <Button 
                variant="ghost"
                className={`text-sm font-medium transition-colors ${
                  isActive('/aliquotas-itbi') 
                    ? 'bg-white/20 text-white hover:bg-white/30' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Alíquotas de ITBI
              </Button>
            </Link>

            <Link to="/sobre">
              <Button 
                variant="ghost"
                className={`text-sm font-medium transition-colors ${
                  isActive('/sobre') 
                    ? 'bg-white/20 text-white hover:bg-white/30' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Sobre
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
