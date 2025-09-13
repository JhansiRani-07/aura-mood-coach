import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bot, User, Send, Sparkles, Heart, Lightbulb } from "lucide-react";

interface AIChatProps {
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: 'motivation' | 'wellness' | 'strategy';
}

const mockInitialMessages: Message[] = [
  {
    id: '1',
    type: 'ai',
    content: "Hi Alex! I'm your AI wellness coach. I'm here to support you on your mental health journey. How are you feeling right now?",
    timestamp: new Date(),
    category: 'wellness'
  }
];

const mockResponses = [
  {
    keywords: ['tired', 'exhausted', 'energy'],
    response: "I hear that you're feeling tired. It's completely normal to have low energy days. Here are some gentle strategies that might help: Take a 5-minute walk outside, try some deep breathing exercises, or listen to your favorite uplifting music. Remember, rest is productive too! 💙",
    category: 'strategy' as const
  },
  {
    keywords: ['stressed', 'overwhelmed', 'anxious'],
    response: "Feeling stressed can be really challenging. You're being so strong by reaching out. Try the 4-7-8 breathing technique: inhale for 4, hold for 7, exhale for 8. This can activate your body's relaxation response. You've got this! 🌟",
    category: 'wellness' as const
  },
  {
    keywords: ['happy', 'good', 'great', 'amazing'],
    response: "That's wonderful to hear! Your positive energy is contagious. When we're feeling good, it's a great time to practice gratitude. What's one thing you're grateful for today? Keep shining! ✨",
    category: 'motivation' as const
  },
  {
    keywords: ['sad', 'down', 'depressed'],
    response: "I'm sorry you're feeling this way. Your feelings are valid, and it's okay to not be okay sometimes. Small steps can make a big difference - maybe try doing one thing that usually brings you joy, even if it's tiny. You matter, and this feeling will pass. 🤗",
    category: 'wellness' as const
  },
  {
    keywords: ['help', 'support', 'advice'],
    response: "I'm here to help! Some daily wellness practices that many students find helpful: morning gratitude journaling, 10-minute mindfulness breaks, regular sleep schedule, and connecting with friends. What area would you like to focus on first?",
    category: 'strategy' as const
  }
];

const defaultResponse = {
  response: "Thank you for sharing that with me. Remember that every feeling you have is valid. I'm here to support you through both the ups and downs. Is there anything specific you'd like to talk about or work on today?",
  category: 'wellness' as const
};

const AIChat = ({ onClose }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>(mockInitialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const getAIResponse = (userMessage: string): { response: string; category: 'motivation' | 'wellness' | 'strategy' } => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const mockResponse of mockResponses) {
      if (mockResponse.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return mockResponse;
      }
    }
    
    return defaultResponse;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.response,
        timestamp: new Date(),
        category: aiResponse.category,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'motivation':
        return <Sparkles className="w-4 h-4 text-accent" />;
      case 'wellness':
        return <Heart className="w-4 h-4 text-success" />;
      case 'strategy':
        return <Lightbulb className="w-4 h-4 text-primary" />;
      default:
        return <Bot className="w-4 h-4 text-primary" />;
    }
  };

  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case 'motivation':
        return 'Motivation';
      case 'wellness':
        return 'Wellness';
      case 'strategy':
        return 'Strategy';
      default:
        return 'Support';
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            AI Wellness Coach
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col space-y-4">
          {/* Messages Area */}
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <Card className={`max-w-[80%] ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card shadow-card border-0'
                  }`}>
                    <CardContent className="p-3">
                      {message.type === 'ai' && message.category && (
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {getCategoryIcon(message.category)}
                          <span className="ml-1">{getCategoryLabel(message.category)}</span>
                        </Badge>
                      )}
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </CardContent>
                  </Card>

                  {message.type === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-motivation flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <Card className="bg-card shadow-card border-0">
                    <CardContent className="p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              placeholder="Share how you're feeling or ask for wellness advice..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isTyping}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-primary shadow-soft"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            {['I feel stressed', 'I need motivation', 'Help with anxiety', 'Feeling great today'].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => setInputValue(suggestion)}
                disabled={isTyping}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIChat;