'use client';

import { useState } from 'react';
import { MessageSquare, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Mock AI responses - replace with real OpenAI API calls
const mockResponses = [
  "I hear you! Remember that every small step forward is progress. You're stronger than you think, and I believe in your ability to overcome challenges. What's one tiny thing you can do right now to feel a bit better?",
  "That's completely understandable! It's okay to have difficult days - they're part of being human. You've gotten through tough times before, and you have the strength to get through this too. I'm here to support you. 💙",
  "I'm proud of you for reaching out and sharing how you're feeling. That takes courage! Remember, your worth isn't determined by your productivity or achievements. You matter simply because you exist. How can we make today a little brighter?",
  "You're not alone in feeling this way. Many students experience similar challenges, and it's a sign of strength to acknowledge when things are difficult. Let's focus on one thing you're grateful for today - even something small counts!",
  "I can sense you're dealing with a lot right now. Remember to be gentle with yourself - you would show kindness to a friend in your situation, so please extend that same compassion to yourself. What would help you feel more supported right now?"
];

export default function MotivationalCoach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm your AI wellness coach. I'm here to offer support, encouragement, and practical strategies to help you feel your best. How are you doing today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    // TODO: Replace with real OpenAI API call
    // Example API call structure:
    // const response = await fetch('/api/chat', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ 
    //     message: inputText, 
    //     context: messages.slice(-5) // Send last 5 messages for context
    //   })
    // });
    // const data = await response.json();

    // Simulate AI response delay
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="card animate-slide-up">
      <div className="flex items-center mb-6">
        <MessageSquare className="h-6 w-6 text-primary-500 mr-3" />
        <h2 className="text-xl font-bold text-gray-900">Motivational Coach</h2>
      </div>

      {/* Chat Messages */}
      <div className="h-64 overflow-y-auto mb-4 space-y-3 p-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === 'ai' && (
                  <Bot className="h-4 w-4 mt-0.5 text-primary-500" />
                )}
                <p className="text-sm leading-relaxed">{message.text}</p>
                {message.sender === 'user' && (
                  <User className="h-4 w-4 mt-0.5 text-white" />
                )}
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4 text-primary-500" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex space-x-2">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Share what's on your mind..."
          className="input-field resize-none flex-1"
          rows={2}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !inputText.trim()}
          className="btn-primary px-4 self-end disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        💬 AI responses are currently simulated. 
        {/* TODO: Replace with real OpenAI API integration for personalized coaching */}
      </div>
    </div>
  );
}