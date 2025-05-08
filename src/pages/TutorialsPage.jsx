import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Smartphone, MessageCircle, Banknote, Mic, Users2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import ReactPlayer from 'react-player/youtube';

const tutorials = [
  {
    id: 'smartphones',
    title: 'Usando Smartphones',
    icon: <Smartphone size={24} className="mr-3 text-primary" />,
    description: 'Aprenda o básico sobre seu celular: ligar, desligar, fazer chamadas, ajustar volume e mais.',
    steps: [
      'Como ligar e desligar o celular.',
      'Entendendo os botões principais (volume, energia).',
      'Como fazer e receber chamadas.',
      'Configurando o brilho da tela e tamanho da fonte.',
      'Conectando ao Wi-Fi.',
    ],
    videoId: 'dQw4w9WgXcQ',
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp para Iniciantes',
    icon: <MessageCircle size={24} className="mr-3 text-green-500" />,
    description: 'Descubra como enviar mensagens, fotos, vídeos e fazer chamadas de voz e vídeo.',
    steps: [
      'Instalando e configurando o WhatsApp.',
      'Adicionando contatos.',
      'Enviando mensagens de texto e áudio.',
      'Compartilhando fotos e vídeos.',
      'Fazendo chamadas de voz e vídeo.',
      'Entendendo os status e grupos.',
    ],
    videoId: 'dQw4w9WgXcQ',
  },
  {
    id: 'bancos_digitais',
    title: 'Bancos Digitais com Segurança',
    icon: <Banknote size={24} className="mr-3 text-blue-600" />,
    description: 'Saiba como usar aplicativos de banco, fazer pagamentos e transferências de forma segura.',
    steps: [
      'O que são bancos digitais e como funcionam.',
      'Instalando o aplicativo do seu banco.',
      'Como verificar seu saldo e extrato.',
      'Fazendo pagamentos de contas (boletos).',
      'Realizando transferências (Pix, TED).',
      'Dicas de segurança para proteger sua conta.',
    ],
    videoId: 'dQw4w9WgXcQ',
  },
  {
    id: 'assistentes_voz',
    title: 'Assistentes de Voz (Google, Siri)',
    icon: <Mic size={24} className="mr-3 text-purple-500" />,
    description: 'Use comandos de voz para facilitar tarefas no seu dia a dia.',
    steps: [
      'O que são assistentes de voz.',
      'Como ativar e usar o Google Assistente ou Siri.',
      'Fazendo perguntas e obtendo informações.',
      'Definindo alarmes e lembretes.',
      'Controlando dispositivos inteligentes (se aplicável).',
    ],
    videoId: 'dQw4w9WgXcQ',
  },
  {
    id: 'redes_sociais',
    title: 'Redes Sociais (Facebook, Instagram)',
    icon: <Users2 size={24} className="mr-3 text-red-500" />,
    description: 'Conecte-se com amigos e familiares, compartilhe momentos e mantenha-se informado.',
    steps: [
      'Criando um perfil no Facebook/Instagram.',
      'Adicionando amigos e seguindo perfis.',
      'Publicando fotos e mensagens.',
      'Interagindo com publicações (curtir, comentar).',
      'Configurações de privacidade e segurança.',
    ],
    videoId: 'dQw4w9WgXcQ ',
  },
];

const TutorialsPage = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <BookOpen size={64} className="text-primary mx-auto mb-6" />
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Tutoriais Interativos
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Aprenda no seu ritmo! Guias simples e vídeos explicativos para você dominar as tecnologias do dia a dia com confiança.
        </p>
      </motion.div>

      <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto space-y-6">
        {tutorials.map((tutorial, index) => (
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary bg-card">
              <AccordionItem value={tutorial.id} className="border-b-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:bg-primary/5 transition-colors">
                  <div className="flex items-center">
                    {tutorial.icon}
                    <span className="text-xl font-semibold text-foreground">{tutorial.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2 bg-background">
                  <p className="text-muted-foreground mb-4 text-base">{tutorial.description}</p>
                  <h4 className="font-semibold text-lg mb-2 text-primary">Passos Principais:</h4>
                  <ul className="list-disc list-inside space-y-1 mb-6 text-foreground/90 text-base">
                    {tutorial.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                  {tutorial.videoId && (
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-primary">Vídeo Explicativo:</h4>
                      <div className="rounded-lg overflow-hidden border">
                        <ReactPlayer
                          url={`https://www.youtube-nocookie.com/embed/${tutorial.videoId}`}
                          controls
                          width="100%"
                          height="400px"
                          config={{
                            youtube: {
                              playerVars: {
                                origin: 'https://localhost:3000',
                                enablejsapi: 1,
                                widgetid: 1,
                                rel: 0,
                                modestbranding: 1,
                                autoplay: 1,
                              },
                            },
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Vídeo incorporado do YouTube - Reprodução segura habilitada
                      </p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Card>
          </motion.div>
        ))}
      </Accordion>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: tutorials.length * 0.1 + 0.5 }}
        className="mt-12 text-center"
      >
        <img
          alt="Grupo de idosos sorrindo enquanto usam smartphones e tablets juntos em um ambiente iluminado e confortável"
          src="https://images.unsplash.com/photo-1661250150188-242c8ab80bfc"
          className="rounded-lg shadow-xl mx-auto w-full max-w-4xl"
        />
      </motion.div>
    </div>
  );
};

export default TutorialsPage;