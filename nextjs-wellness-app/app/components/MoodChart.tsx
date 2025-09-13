'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from './AuthProvider';
import { getMoodEntries, MoodEntry } from '../../lib/firestore';
import { TrendingUp } from 'lucide-react';

// Mock data for empty state
const mockData = [
  { date: 'Mon', mood: 7 },
  { date: 'Tue', mood: 5 },
  { date: 'Wed', mood: 8 },
  { date: 'Thu', mood: 6 },
  { date: 'Fri', mood: 9 },
  { date: 'Sat', mood: 7 },
  { date: 'Sun', mood: 8 },
];

export default function MoodChart() {
  const { user } = useAuth();
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(true);
  const [hasRealData, setHasRealData] = useState(false);

  useEffect(() => {
    fetchMoodData();
  }, [user]);

  const fetchMoodData = async () => {
    if (!user) return;

    setLoading(true);
    const result = await getMoodEntries(user.uid, 7);
    
    if (!result.error && result.entries.length > 0) {
      // Convert Firestore data to chart format
      const chartData = result.entries
        .reverse() // Show oldest first
        .map((entry: MoodEntry, index) => ({
          date: new Date(entry.createdAt.toDate()).toLocaleDateString('en', { weekday: 'short' }),
          mood: entry.mood,
        }));
      
      setData(chartData);
      setHasRealData(true);
    } else {
      // Use mock data if no real data exists
      setHasRealData(false);
    }
    
    setLoading(false);
  };

  return (
    <div className="card animate-slide-up">
      <div className="flex items-center mb-6">
        <TrendingUp className="h-6 w-6 text-primary-500 mr-3" />
        <div>
          <h2 className="text-xl font-bold text-gray-900">Mood Trends</h2>
          <p className="text-sm text-gray-600">
            {hasRealData ? 'Your mood over the past week' : 'Sample data - start checking in to see your trends!'}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                domain={[1, 10]}
                stroke="#6b7280"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {!hasRealData && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Complete your first mood check-in to start building your personal trend chart!
          </p>
        </div>
      )}
    </div>
  );
}