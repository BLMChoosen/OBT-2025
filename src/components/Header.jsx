
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Smartphone, Users, ShieldCheck } from 'lucide-react';

    const Header = () => {
      return (
        <header className="bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
            <Link to="/" className="flex items-center space-x-3 mb-4 sm:mb-0">
              <Smartphone size={40} className="transform group-hover:scale-110 transition-transform" />
              <h1 className="text-3xl font-bold tracking-tight">SequoIA</h1>
            </Link>
            <nav className="flex flex-wrap justify-center sm:justify-end space-x-2 sm:space-x-4">
              <Link to="/" className="hover:bg-primary-foreground/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">Início</Link>
              <Link to="/tutoriais" className="hover:bg-primary-foreground/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">Tutoriais</Link>
              <Link to="/assistente" className="hover:bg-primary-foreground/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">Assistente</Link>
              <Link to="/jogos" className="hover:bg-primary-foreground/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">Jogos</Link>
              <Link to="/simulacoes" className="hover:bg-primary-foreground/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">Simulações</Link>
              <Link to="/familia" className="hover:bg-primary-foreground/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">Família</Link>
            </nav>
          </div>
        </header>
      );
    };

    export default Header;
  