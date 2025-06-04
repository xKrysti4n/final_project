
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, Send, Sparkles, User, Bot } from 'lucide-react';
import { Card } from '@/components/ui/card';

const AISearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Cześć! Jestem Twoim asystentem AI do wyszukiwania pracy. Opisz mi jaka praca Cię interesuje, a ja znajdę najlepsze oferty!'
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, 
      { type: 'user', content: message },
      { type: 'bot', content: 'Szukam ofert pracy dla Ciebie... Znalazłem 5 ofert które mogą Cię zainteresować jako Frontend Developer z doświadczeniem w React!' }
    ]);
    setMessage('');
  };

  const suggestions = [
    'Szukam pracy jako Frontend Developer w Warszawie',
    'Chcę pracować zdalnie jako Full Stack Engineer',
    'Interesuje mnie praca w startupu jako Product Manager',
    'Szukam pierwszej pracy jako Junior Developer'
  ];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
            size="sm"
          >
            <Brain className="w-6 h-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              Wyszukiwarka AI
            </DialogTitle>
          </DialogHeader>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.type === 'user' 
                    ? 'bg-blue-600' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600'
                }`}>
                  {msg.type === 'user' ? 
                    <User className="w-4 h-4 text-white" /> : 
                    <Bot className="w-4 h-4 text-white" />
                  }
                </div>
                <Card className={`p-3 max-w-[80%] ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border-purple-200'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                </Card>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 font-medium">Przykładowe zapytania:</p>
              <div className="grid grid-cols-1 gap-2">
                {suggestions.map((suggestion, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="text-left justify-start h-auto p-3 text-sm"
                    onClick={() => setMessage(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input with Send Button */}
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Opisz jaką pracę szukasz..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button 
              onClick={handleSend}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4"
            >
              <Send className="w-4 h-4 mr-2" />
              Wyślij
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AISearchModal;
