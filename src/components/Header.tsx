
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="shadow-lg border-b sticky top-0 z-50" style={{ backgroundColor: '#007581' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Title */}
          <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Consulta de Emolumentos</h1>
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
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
                <span className="hidden lg:inline">Tabelas de Emolumentos</span>
                <span className="lg:hidden">Tabelas</span>
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
                <span className="hidden lg:inline">Alíquotas de ITBI</span>
                <span className="lg:hidden">ITBI</span>
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20" style={{ backgroundColor: '#006069' }}>
            <nav className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" onClick={closeMobileMenu}>
                <Button 
                  variant="ghost"
                  className={`w-full text-left justify-start text-sm font-medium transition-colors ${
                    isActive('/') 
                      ? 'bg-white/20 text-white hover:bg-white/30' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Consulta
                </Button>
              </Link>

              <Link to="/links-estados" onClick={closeMobileMenu}>
                <Button 
                  variant="ghost"
                  className={`w-full text-left justify-start text-sm font-medium transition-colors ${
                    isActive('/links-estados') 
                      ? 'bg-white/20 text-white hover:bg-white/30' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Tabelas de Emolumentos
                </Button>
              </Link>

              <Link to="/aliquotas-itbi" onClick={closeMobileMenu}>
                <Button 
                  variant="ghost"
                  className={`w-full text-left justify-start text-sm font-medium transition-colors ${
                    isActive('/aliquotas-itbi') 
                      ? 'bg-white/20 text-white hover:bg-white/30' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Alíquotas de ITBI
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
