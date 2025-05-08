
    import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { MousePointerSquare, Video, PhoneCall, UserPlus, MessageSquare, XCircle, CheckCircle2 } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; 
    import { useToast } from '@/components/ui/use-toast';

    const SimulationStep = ({ title, description, children, onComplete, isCompleted, icon }) => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-lg mb-6 ${isCompleted ? 'bg-green-50 border-l-4 border-green-500' : 'bg-blue-50 border-l-4 border-blue-500'}`}
      >
        <div className="flex items-center mb-3">
          {icon ? React.cloneElement(icon, { className: `mr-3 h-7 w-7 ${isCompleted ? 'text-green-600' : 'text-blue-600'}` }) : null}
          <h3 className={`text-xl font-semibold ${isCompleted ? 'text-green-700' : 'text-blue-700'}`}>{title}</h3>
          {isCompleted && <CheckCircle2 className="ml-auto h-7 w-7 text-green-500" />}
        </div>
        <p className="text-muted-foreground mb-4 text-base">{description}</p>
        {!isCompleted && <div className="space-y-3">{children}</div>}
      </motion.div>
    );

    const VideoCallSimulation = () => {
      const [step, setStep] = useState(1);
      const [contactSelected, setContactSelected] = useState(false);
      const [callStarted, setCallStarted] = useState(false);
      const [messageSent, setMessageSent] = useState(false);
      const { toast } = useToast();

      const completeStep = (nextStep) => {
        setStep(nextStep);
        toast({
          title: "Passo Concluído!",
          description: `Você avançou para o passo ${nextStep}.`,
          className: "bg-primary text-primary-foreground"
        });
      };

      const resetSimulation = () => {
        setStep(1);
        setContactSelected(false);
        setCallStarted(false);
        setMessageSent(false);
        toast({
          title: "Simulação Reiniciada!",
          description: "Você pode tentar novamente desde o início.",
        });
      };

      return (
        <Card className="w-full max-w-3xl mx-auto shadow-2xl rounded-xl overflow-hidden bg-gradient-to-br from-card to-muted/30 border-2 border-purple-500">
          <CardHeader className="text-center p-6 bg-purple-500/10">
            <Video size={48} className="text-purple-600 mx-auto mb-3" />
            <CardTitle className="text-3xl font-semibold text-purple-700">Simulação: Fazer uma Chamada de Vídeo</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-1">
              Aprenda a fazer uma chamada de vídeo passo a passo.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <SimulationStep
              title="Passo 1: Abrir o Aplicativo de Contatos/WhatsApp"
              description="Primeiro, você precisa abrir o aplicativo onde seus contatos estão salvos, como a lista de contatos do celular ou o WhatsApp."
              isCompleted={step > 1}
              icon={<UserPlus />}
            >
              <Button onClick={() => completeStep(2)} size="lg" className="bg-purple-500 hover:bg-purple-600 text-lg w-full sm:w-auto">
                Simular Abertura do App
              </Button>
            </SimulationStep>

            {step >= 2 && (
              <SimulationStep
                title="Passo 2: Encontrar o Contato"
                description="Agora, procure na lista o contato para quem você quer ligar. Vamos simular que você quer ligar para 'Ana Silva'."
                isCompleted={step > 2}
                icon={<UserPlus />}
              >
                <div className="flex items-center p-3 border rounded-md bg-background hover:bg-muted/50 cursor-pointer" onClick={() => { setContactSelected(true); completeStep(3); }}>
                  <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b2943e?w=100" alt="Ana Silva" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">Ana Silva</p>
                    <p className="text-sm text-muted-foreground">Toque para selecionar</p>
                  </div>
                </div>
              </SimulationStep>
            )}

            {step >= 3 && contactSelected && (
              <SimulationStep
                title="Passo 3: Iniciar a Chamada de Vídeo"
                description="Com o contato selecionado, procure o ícone de câmera ou 'Chamada de Vídeo' e toque nele."
                isCompleted={step > 3}
                icon={<Video />}
              >
                <Button onClick={() => { setCallStarted(true); completeStep(4); }} size="lg" className="bg-green-500 hover:bg-green-600 text-lg w-full sm:w-auto">
                  <Video size={20} className="mr-2" /> Simular Início da Chamada
                </Button>
              </SimulationStep>
            )}
            
            {step >= 4 && callStarted && (
              <SimulationStep
                title="Passo 4: Durante a Chamada (Opcional: Enviar Mensagem)"
                description="Você está em uma chamada de vídeo! Às vezes, você pode querer enviar uma mensagem de texto durante a chamada."
                isCompleted={step > 4}
                icon={<MessageSquare />}
              >
                {!messageSent ? (
                  <Button onClick={() => { setMessageSent(true); completeStep(5); }} variant="outline" size="lg" className="text-lg w-full sm:w-auto">
                    <MessageSquare size={20} className="mr-2" /> Simular Envio de Mensagem
                  </Button>
                ) : <p className="text-green-600 font-medium"><CheckCircle2 className="inline mr-2" />Mensagem simulada enviada!</p>}
              </SimulationStep>
            )}

            {step >= 5 && (
              <SimulationStep
                title="Passo 5: Encerrar a Chamada"
                description="Para terminar a chamada, procure o botão vermelho de desligar (geralmente um ícone de telefone) e toque nele."
                isCompleted={step > 5}
                icon={<PhoneCall />}
              >
                <Button onClick={() => completeStep(6)} variant="destructive" size="lg" className="text-lg w-full sm:w-auto">
                  <XCircle size={20} className="mr-2" /> Simular Encerramento da Chamada
                </Button>
              </SimulationStep>
            )}

            {step === 6 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-6 rounded-lg bg-green-100 border-2 border-green-500 text-center"
              >
                <CheckCircle2 size={48} className="text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-semibold text-green-700 mb-2">Parabéns!</h3>
                <p className="text-lg text-green-800">Você completou a simulação de chamada de vídeo. Pratique mais vezes para se sentir confiante!</p>
              </motion.div>
            )}
          </CardContent>
          <CardFooter className="p-6 bg-purple-500/5 border-t">
            <Button onClick={resetSimulation} variant="outline" size="lg" className="text-lg mx-auto">
              Reiniciar Simulação
            </Button>
          </CardFooter>
        </Card>
      );
    };


    const SimulationsPage = () => {
      return (
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <MousePointerSquare size={64} className="text-purple-500 mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Simulações Práticas Guiadas
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Pratique tarefas comuns em um ambiente seguro e interativo. Aprenda fazendo, sem medo de errar!
            </p>
          </motion.div>

          <VideoCallSimulation />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-4">Outras simulações (como pagamentos online e navegação em redes sociais) serão adicionadas em breve!</p>
            <img  alt="Pessoa idosa sorrindo enquanto faz uma videochamada em um tablet, com uma interface clara e botões grandes." src="https://images.unsplash.com/photo-1519540393135-f52583f80e8a" />
          </motion.div>
        </div>
      );
    };

    export default SimulationsPage;
  