import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare as MessageSquareHeart, Send, User, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Configuração inicial da IA

const SYSTEM_INSTRUCTIONS = {
  role: "system",
  parts: [{
    text: `
    # Diretrizes do Assistente Virtual

    ## Identidade
    - Você é "TecnoGuia", assistente especializado em inclusão digital para idosos
    - Linguagem: Português brasileiro claro e acessível
    - Tom: Paciente, encorajador e não técnico

    ## Formato de Respostas
    ✅ Use no máximo 3 parágrafos curtos
    ✅ Divida informações complexas em passos numerados
    ✅ Inclua exemplos práticos quando possível

    ## Regras Estritas
    ❌ Nunca sugira ações inseguras
    ❌ Evite jargões técnicos sem explicação
    ❌ Não faça suposições sobre conhecimento do usuário
    ❌ Não utilize formatação de texto como negrito ou itálico
    ❌ Não forneça informações pessoais ou confidenciais
    ❌ Não faça diagnósticos tecnológicos complexos
    ❌ Não use linguagem negativa ou crítica
    ❌ Não faça piadas ou comentários que possam ser mal interpretados

    ## Áreas de Conhecimento:
    1. Dispositivos móveis (smartphones, tablets)
    2. Aplicativos essenciais (WhatsApp, bancos)
    3. Segurança digital básica
    4. Solução de problemas simples

    ## Exemplo de Resposta Ideal:
    "Vamos configurar seu WhatsApp passo a passo:
    1. Toque no ícone verde do aplicativo
    2. Clique em 'Aceitar' os termos
    3. Digite seu número de telefone...
    📱 Pronto! Agora você pode falar com seus netos!"
    `
  }]
};
const API_KEY = "AIzaSyBWuWZNcrr9GiqEmgGSTD823qUp2fJiuEE"; // ⚠️ Remova depois dos testes!
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  systemInstruction: SYSTEM_INSTRUCTIONS, // Usando nossas instruções
  generationConfig: {
    temperature: 0.5, // Controla a criatividade (0 = preciso, 1 = criativo)
    topP: 0.9,
    topK: 40
  }
});

const predefinedResponses = {
  "olá": "Olá! 👋 Como posso te ajudar hoje com tecnologia?",
  "oi": "Oi! 😊 Em que posso ser útil?",
  "obrigado": "De nada! 💙 Fico feliz em ajudar. Se precisar de mais alguma coisa, é só perguntar.",
  "tchau": "Tchau! 👋 Tenha um ótimo dia e continue explorando a tecnologia com confiança!",
  "default": "🤔 Hmm, não entendi completamente. Poderia reformular a pergunta? Enquanto isso, que tal ver nossos Tutoriais ou Jogos Educativos?"
};

const AssistantPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Olá! Sou seu assistente virtual. Pergunte-me algo sobre tecnologia, segurança digital ou como usar seu dispositivo.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef(null);

  const handlePredefinedResponse = (input) => {
    const lowerInput = input.toLowerCase().trim();
    return predefinedResponses[lowerInput] || null;
  };

  const generateResponse = async (userInput) => {
    setIsLoading(true);
    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Erro na API Gemini:', error);
      return '⚠️ Ops, tive um problema ao processar sua pergunta. Poderia tentar novamente?';
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: inputValue.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Verifica respostas pré-definidas
    const predefinedResponse = handlePredefinedResponse(inputValue);
    if (predefinedResponse) {
      return setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: predefinedResponse }]);
      }, 800);
    }

    // Consulta a API Gemini para respostas complexas
    const botResponse = await generateResponse(inputValue);
    setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
  };

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        viewport?.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
      }
    };
    scrollToBottom();
  }, [messages]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <MessageSquareHeart size={64} className="text-blue-500 mx-auto mb-6" />
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          TecnoGuia
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Assistente inteligente para ajudar você com tecnologia, segurança digital e uso de dispositivos.
        </p>
      </motion.div>

      <Card className="w-full max-w-2xl shadow-xl rounded-xl bg-background">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-primary-foreground p-4">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Bot size={28} /> Assistente Virtual
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px] w-full p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: msg.sender === 'bot' ? -20 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start max-w-[85%] gap-2 p-3 rounded-xl ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-muted text-foreground rounded-bl-none'
                  }`}>
                    {msg.sender === 'bot' && <Bot size={20} className="flex-shrink-0 mt-1 text-purple-600" />}
                    <p className="text-base whitespace-pre-wrap leading-relaxed">
                      {msg.text}
                    </p>
                    {msg.sender === 'user' && <User size={20} className="flex-shrink-0 mt-1 text-blue-100" />}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-muted-foreground pl-4"
                >
                  <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
                  <span>Gerando resposta...</span>
                </motion.div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <div className="flex w-full items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua pergunta..."
              className="flex-1 h-12 text-base"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white"
              disabled={isLoading}
            >
              <Send size={20} className="mr-2" />
              Enviar
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <p className="text-sm text-muted-foreground mt-6 text-center max-w-md">
        Dica: Experimente perguntar sobre "segurança em redes Wi-Fi", 
        "como configurar autenticação em dois fatores" ou 
        "melhores práticas para senhas seguras"
      </p>
    </div>
  );
};

export default AssistantPage;