import React from 'react';
import { Users } from 'lucide-react';

const FamilyPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      <Users size={64} className="text-red-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4 text-center">Conexão com Familiares</h1>
      <p className="text-xl text-muted-foreground text-center max-w-2xl">
        Precisa de uma ajudinha extra? Entre em contato rapidamente com seus familiares para suporte. Esta funcionalidade estará disponível em breve.
      </p>
      <img
        alt="Ícones de contatos familiares em uma tela de celular, simbolizando conexão rápida"
        src={`${process.env.PUBLIC_URL}/assets/images/family-connection.jpg`}
      />
    </div>
  );
};

export default FamilyPage;