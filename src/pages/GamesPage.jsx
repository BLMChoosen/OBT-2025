import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Puzzle, ShieldCheck, ShieldAlert, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { useToast } from '../components/ui/use-toast';

const gameScenarios = [
  {
    id: 1,
    type: 'phishing_email',
    title: 'E-mail Suspeito',
    description: 'Você recebeu um e-mail do "Banco Seguro Online" pedindo para atualizar seus dados clicando em um link. O que você faz?',
    imageUrl: `${process.env.PUBLIC_URL}/assets/email-suspeito.jpg`,
    options: [
      { text: 'Clica no link e atualiza os dados.', isCorrect: false, feedback: 'Cuidado! Nunca clique em links suspeitos ou forneça dados em sites desconhecidos. Bancos não pedem isso por e-mail.' },
      { text: 'Ignora o e-mail e o apaga.', isCorrect: true, feedback: 'Correto! Se um e-mail parecer suspeito, o melhor é ignorar e apagar. Se tiver dúvidas, contate seu banco por canais oficiais.' },
      { text: 'Responde ao e-mail pedindo mais informações.', isCorrect: false, feedback: 'Não é uma boa ideia. Responder pode confirmar que seu e-mail é ativo para os golpistas.' },
    ],
  },
  {
    id: 2,
    type: 'fake_news',
    title: 'Notícia Duvidosa',
    description: 'Você viu uma notícia no WhatsApp dizendo que "chá de boldo cura todas as doenças". O que você faz?',
    imageUrl: `${process.env.PUBLIC_URL}/assets/noticia-duvidosa.jpg`,
    options: [
      { text: 'Compartilha imediatamente com todos os seus amigos e familiares.', isCorrect: false, feedback: 'Atenção! Antes de compartilhar, verifique se a notícia é verdadeira. Fake news podem ser perigosas.' },
      { text: 'Procura a mesma notícia em sites de notícias confiáveis antes de fazer qualquer coisa.', isCorrect: true, feedback: 'Excelente! Sempre cheque a informação em fontes seguras antes de acreditar ou compartilhar.' },
      { text: 'Acredita na notícia, afinal, foi um amigo que mandou.', isCorrect: false, feedback: 'Mesmo que venha de um amigo, é importante verificar. Amigos também podem se enganar e compartilhar fake news sem querer.' },
    ],
  },
  {
    id: 3,
    type: 'strong_password',
    title: 'Criando uma Senha',
    description: 'Qual destas senhas é a mais forte e segura para sua conta bancária?',
    imageUrl: `${process.env.PUBLIC_URL}/assets/criando-senha.jpg`,
    options: [
      { text: '123456', isCorrect: false, feedback: 'Muito fraca! Senhas sequenciais são fáceis de adivinhar.' },
      { text: 'minhasenha', isCorrect: false, feedback: 'Fraca! Evite palavras comuns ou informações pessoais óbvias.' },
      { text: 'M3u_C@ch0rr0_F0rt3!', isCorrect: true, feedback: 'Ótima escolha! Misturar letras maiúsculas, minúsculas, números e símbolos cria uma senha forte.' },
    ],
  },
];

const GamesPage = () => {
  const [currentGame, setCurrentGame] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const { toast } = useToast();

  const startNewGame = () => {
    const availableGames = gameScenarios.filter(g => g.id !== currentGame?.id);
    const randomIndex = Math.floor(Math.random() * availableGames.length);
    const newGame = availableGames.length > 0 ? availableGames[randomIndex] : gameScenarios[Math.floor(Math.random() * gameScenarios.length)];
    setCurrentGame(newGame);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleOptionSelect = (option) => {
    if (showFeedback) return;
    setSelectedOption(option);
    setShowFeedback(true);
    setGamesPlayed(gamesPlayed + 1);
    if (option.isCorrect) {
      setScore(score + 1);
      toast({
        title: "Resposta Correta!",
        description: option.feedback,
        variant: "default",
        className: "bg-green-500 text-white",
      });
    } else {
      toast({
        title: "Resposta Incorreta!",
        description: option.feedback,
        variant: "destructive",
      });
    }
  };

  if (!currentGame) {
    return <div className="container mx-auto px-6 py-12 text-center">Carregando jogo...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <Puzzle size={64} className="text-yellow-500 mx-auto mb-6" />
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
          Jogos Educativos de Segurança
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Aprenda a se proteger de golpes digitais e fake news de forma divertida e interativa!
        </p>
      </motion.div>

      <motion.div
        key={currentGame.id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl mx-auto shadow-2xl rounded-xl overflow-hidden bg-gradient-to-br from-card to-muted/30 border-2 border-yellow-500">
          <CardHeader className="text-center p-6 bg-yellow-500/10">
            <CardTitle className="text-3xl font-semibold text-yellow-700">{currentGame.title}</CardTitle>
            {currentGame.imageUrl && (
              <div className="mt-4 aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden border-2 border-yellow-300">
                <img src={currentGame.imageUrl} alt={currentGame.title} className="w-full h-full object-cover" />
              </div>
            )}
          </CardHeader>
          <CardContent className="p-6">
            <CardDescription className="text-lg text-foreground/90 mb-6 text-center">{currentGame.description}</CardDescription>
            <div className="space-y-4">
              {currentGame.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className={`w-full justify-start text-left h-auto py-3 text-base 
                    ${selectedOption === option ? (option.isCorrect ? 'bg-green-100 border-green-500 text-green-700 hover:bg-green-200' : 'bg-red-100 border-red-500 text-red-700 hover:bg-red-200') : 'hover:bg-muted/50 border-border'}
                    ${showFeedback && selectedOption !== option ? 'opacity-60 cursor-not-allowed' : ''}
                  `}
                  onClick={() => handleOptionSelect(option)}
                  disabled={showFeedback}
                >
                  {selectedOption === option && (option.isCorrect ? <ThumbsUp className="mr-3 h-5 w-5 text-green-600" /> : <ThumbsDown className="mr-3 h-5 w-5 text-red-600" />)}
                  {option.text}
                </Button>
              ))}
            </div>
            {showFeedback && selectedOption && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-md text-base ${selectedOption.isCorrect ? 'bg-green-50 border-green-300 text-green-800' : 'bg-red-50 border-red-300 text-red-800'}`}
              >
                {selectedOption.isCorrect ? <ShieldCheck className="inline mr-2 h-5 w-5" /> : <ShieldAlert className="inline mr-2 h-5 w-5" />}
                {selectedOption.feedback}
              </motion.div>
            )}
          </CardContent>
          <CardFooter className="p-6 flex flex-col sm:flex-row justify-between items-center bg-yellow-500/5 border-t">
            <p className="text-lg font-semibold text-yellow-700 mb-4 sm:mb-0">
              Pontuação: <span className="text-2xl">{score}</span> / {gamesPlayed}
            </p>
            <Button onClick={startNewGame} size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-lg">
              <RotateCcw size={20} className="mr-2" /> Próximo Desafio
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default GamesPage;
