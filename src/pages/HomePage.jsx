
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '../../components/ui/button'
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
    import { BookOpen, MessageSquare as MessageSquareHeart, Puzzle, MousePointerSquare, Users, ShieldCheck, Smartphone, Smile } from 'lucide-react';

    const features = [
      {
        title: 'Tutoriais Interativos',
        description: 'Aprenda passo a passo a usar o celular, WhatsApp, bancos e mais.',
        icon: <BookOpen size={48} className="text-primary mb-4" />,
        link: '/tutoriais',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-500'
      },
      {
        title: 'Assistente Virtual',
        description: 'Tire suas dúvidas sobre tecnologia com nosso assistente amigável.',
        icon: <MessageSquareHeart size={48} className="text-green-500 mb-4" />,
        link: '/assistente',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-500'
      },
      {
        title: 'Jogos Educativos',
        description: 'Divirta-se aprendendo sobre segurança digital e como evitar golpes.',
        icon: <Puzzle size={48} className="text-yellow-500 mb-4" />,
        link: '/jogos',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-500'
      },
      {
        title: 'Simulações Práticas',
        description: 'Pratique pagamentos e chamadas de vídeo em um ambiente seguro.',
        icon: <MousePointerSquare size={48} className="text-purple-500 mb-4" />,
        link: '/simulacoes',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-500'
      },
      {
        title: 'Conexão Familiar',
        description: 'Entre em contato rápido com seus familiares para pedir ajuda.',
        icon: <Users size={48} className="text-red-500 mb-4" />,
        link: '/familia',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-500'
      },
    ];

    const HomePage = () => {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted/50 py-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <div className="inline-block p-4 bg-primary/10 rounded-full mb-6">
              <Smartphone size={64} className="text-primary" />
            </div>
            <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Bem-vindo ao SequoIA!
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sua jornada para usar a tecnologia com <strong className="text-primary">segurança</strong>, <strong className="text-secondary">autonomia</strong> e <strong className="text-yellow-500">confiança</strong> começa aqui.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0px 20px 30px -10px rgba(0,0,0,0.1)" }}
                className="h-full"
              >
                <Card className={`h-full flex flex-col overflow-hidden ${feature.bgColor} border-2 ${feature.borderColor} hover:border-primary transition-all duration-300`}>
                  <CardHeader className="items-center text-center">
                    {feature.icon}
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center flex-grow">
                    <CardDescription className="text-base text-foreground/80">{feature.description}</CardDescription>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <Link to={feature.link} className="w-full">
                      <Button variant="default" size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg py-3">
                        Começar Agora <Smile size={20} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-16 text-center p-8 bg-secondary/10 rounded-xl shadow-lg max-w-3xl w-full border border-secondary"
          >
            <ShieldCheck size={48} className="text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3 text-secondary">Sua Segurança em Primeiro Lugar</h2>
            <p className="text-lg text-muted-foreground">
              Nosso aplicativo foi desenhado pensando na sua proteção. Aprenda a navegar na internet, identificar golpes e proteger suas informações pessoais com dicas e ferramentas fáceis de usar.
            </p>
            <Button variant="secondary" size="lg" className="mt-6 text-lg py-3">
              Saiba Mais Sobre Segurança
            </Button>
          </motion.div>
        </div>
      );
    };

    export default HomePage;
  
