'use client';

import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { saveMoodEntry } from '../../lib/firestore';
import { Heart, CheckCircle } from 'lucide-react';

const moodEmojis = [
  { emoji: '😢', label: 'Very Sad', value: 1 },
  { emoji: '😔', label: 'Sad', value: 2 },
  { emoji: '😐', label: 'Okay', value: 3 },
  { emoji: '🙂', label: 'Good', value: 4 },
  { emoji: '😊', label: 'Happy', value: 5 },
  { emoji: '😄', label: 'Great', value: 6 },
  { emoji: '🤩', label: 'Amazing', value: 7 },
];

export default function DailyCheckIn() {
  const { user } = useAuth();
  const [selectedEmoji, setSelectedEmoji] = useState('😊');
  const [selectedValue, setSelectedValue] = useState(5);
  const [mood, setMood] = useState(5);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleEmojiSelect = (emoji: any) => {
    setSelectedEmoji(emoji.emoji);
    setSelectedValue(emoji.value);
    setMood(emoji.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const result = await saveMoodEntry(user.uid, mood, selectedEmoji, notes);
    
    if (!result.error) {
      setSuccess(true);
      setNotes('');
      setTimeout(() => setSuccess(false), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="card animate-slide-up">
      <div className="flex items-center mb-6">
        <Heart className="h-6 w-6 text-primary-500 mr-3" />
        <h2 className="text-xl font-bold text-gray-900">Daily Check-In</h2>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center">
          <CheckCircle className="h-4 w-4 mr-2" />
          Check-in saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Emoji Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How are you feeling today?
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {moodEmojis.map((emoji) => (
              <button
                key={emoji.value}
                type="button"
                onClick={() => handleEmojiSelect(emoji)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  selectedValue === emoji.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{emoji.emoji}</div>
                <div className="text-xs text-gray-600">{emoji.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Mood Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mood Level: {mood}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={mood}
            onChange={(e) => setMood(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-field resize-none"
            rows={3}
            placeholder="How was your day? Any specific thoughts or feelings you'd like to record..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Submit Check-In'}
        </button>
      </form>
    </div>
  );
}