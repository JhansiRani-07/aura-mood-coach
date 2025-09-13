'use client';

import { useAuth } from './AuthProvider';
import { logout } from '../../lib/auth';
import { LogOut, Heart } from 'lucide-react';

export default function Header() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (!user) return null;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-primary-500 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Student Wellness Monitor</h1>
              <p className="text-sm text-gray-500">Check in, cheer up, and keep going!</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700">
              Welcome, <span className="font-medium">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}