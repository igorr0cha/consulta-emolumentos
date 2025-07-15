
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Calculator, ExternalLink, BarChart3, Info } from 'lucide-react';

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
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink 
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/') 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Consulta
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 data-[state=open]:bg-white/20 data-[state=open]:text-white">
                  Links Úteis
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/links-estados"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                          <ExternalLink className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Links dos Estados
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Acesse os portais oficiais de escritura e registro de cada estado brasileiro
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/sobre">
                  <NavigationMenuLink 
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/sobre') 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Sobre
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};
