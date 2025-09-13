'use client';

import { useAuth } from '../components/AuthProvider';
import Header from '../components/Header';
import DailyCheckIn from '../components/DailyCheckIn';
import MoodChart from '../components/MoodChart';
import AIInsights from '../components/AIInsights';
import MotivationalCoach from '../components/MotivationalCoach';

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return null; // AuthProvider will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <DailyCheckIn />
            <AIInsights />
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            <MoodChart />
            <MotivationalCoach />
          </div>
        </div>
      </main>
    </div>
  );
}