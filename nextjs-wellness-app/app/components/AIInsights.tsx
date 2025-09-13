'use client';

import { useState, useEffect } from 'react';
import { Brain, Lightbulb, RefreshCw } from 'lucide-react';

// Mock insights - replace with real OpenAI API calls
const mockInsights = [
  {
    title: "Mindfulness Moment",
    tip: "Try the 4-7-8 breathing technique: Inhale for 4 counts, hold for 7, exhale for 8. This can help reduce stress and improve focus during study sessions.",
    type: "relaxation"
  },
  {
    title: "Energy Boost",
    tip: "Take a 10-minute walk between study sessions. Physical movement increases blood flow to the brain and can improve concentration for up to 2 hours.",
    type: "productivity"
  },
  {
    title: "Sleep Hygiene",
    tip: "Create a wind-down routine 1 hour before bed. Dim the lights, avoid screens, and try reading or gentle stretching to signal your brain it's time to rest.",
    type: "wellness"
  },
  {
    title: "Social Connection",
    tip: "Reach out to a friend or family member today. Social connections are proven to boost mood and reduce feelings of stress and anxiety.",
    type: "social"
  },
  {
    title: "Gratitude Practice",
    tip: "Write down 3 things you're grateful for today. Gratitude practices can shift focus from what's lacking to what's abundant in your life.",
    type: "mindfulness"
  }
];

export default function AIInsights() {
  const [currentInsight, setCurrentInsight] = useState(mockInsights[0]);
  const [loading, setLoading] = useState(false);

  const generateNewInsight = async () => {
    setLoading(true);
    
    // TODO: Replace with real OpenAI API call
    // Example API call structure:
    // const response = await fetch('/api/generate-insight', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ userId: user.uid, recentMoods: [...] })
    // });
    // const data = await response.json();
    
    // Simulate API delay
    setTimeout(() => {
      const randomInsight = mockInsights[Math.floor(Math.random() * mockInsights.length)];
      setCurrentInsight(randomInsight);
      setLoading(false);
    }, 1000);
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'relaxation': return 'text-blue-600 bg-blue-50';
      case 'productivity': return 'text-green-600 bg-green-50';
      case 'wellness': return 'text-purple-600 bg-purple-50';
      case 'social': return 'text-pink-600 bg-pink-50';
      case 'mindfulness': return 'text-indigo-600 bg-indigo-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="card animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Brain className="h-6 w-6 text-primary-500 mr-3" />
          <h2 className="text-xl font-bold text-gray-900">AI Wellness Insight</h2>
        </div>
        <button
          onClick={generateNewInsight}
          disabled={loading}
          className="p-2 text-gray-500 hover:text-primary-500 transition-colors duration-200 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-4">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getInsightColor(currentInsight.type)}`}>
          <Lightbulb className="h-3 w-3 mr-1" />
          {currentInsight.title}
        </div>
        
        <p className="text-gray-700 leading-relaxed">
          {currentInsight.tip}
        </p>
        
        <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500">
          💡 This insight was generated using AI analysis of wellness patterns. 
          {/* TODO: Replace with real OpenAI API call that analyzes user's mood history */}
        </div>
      </div>
    </div>
  );
}