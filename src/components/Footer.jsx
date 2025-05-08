
    import React from 'react';

    const Footer = () => {
      const currentYear = new Date().getFullYear();
      return (
        <footer className="bg-muted text-muted-foreground py-8 mt-auto">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm">&copy; {currentYear} SequoIA. Todos os direitos reservados.</p>
            <p className="text-xs mt-1">Promovendo inclusão digital com carinho e segurança.</p>
          </div>
        </footer>
      );
    };

    export default Footer;
  