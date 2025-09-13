import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Heart, TrendingUp, Brain, MessageSquare, Calendar, Sparkles } from "lucide-react";
import MoodCheckIn from "@/components/MoodCheckIn";
import AIChat from "@/components/AIChat";

const mockMoodData = [
  { date: 'Mon', mood: 7, energy: 6 },
  { date: 'Tue', mood: 5, energy: 4 },
  { date: 'Wed', mood: 8, energy: 8 },
  { date: 'Thu', mood: 6, energy: 7 },
  { date: 'Fri', mood: 9, energy: 9 },
  { date: 'Sat', mood: 8, energy: 7 },
  { date: 'Sun', mood: 7, energy: 6 },
];

const mockInsights = [
  {
    title: "Great Progress This Week!",
    description: "Your mood has been consistently positive. Keep up the good work with your mindfulness practice.",
    type: "success"
  },
  {
    title: "Energy Boost Suggestion",
    description: "Your energy levels dip mid-week. Consider a 10-minute walk during lunch breaks.",
    type: "suggestion"
  }
];

const Dashboard = () => {
  const [showMoodCheckIn, setShowMoodCheckIn] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex!</h1>
              <p className="text-muted-foreground mt-1">Let's check in with your wellness journey</p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => setShowMoodCheckIn(true)}
                className="bg-gradient-primary shadow-soft"
                size="lg"
              >
                <Heart className="w-4 h-4 mr-2" />
                Check In
              </Button>
              <Button 
                onClick={() => setShowAIChat(true)}
                variant="secondary"
                size="lg"
                className="shadow-soft"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Coach
              </Button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="shadow-card border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                    <p className="text-2xl font-bold text-primary">7 days</p>
                  </div>
                  <Calendar className="w-8 h-8 text-primary opacity-80" />
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Mood</p>
                    <p className="text-2xl font-bold text-success">7.1/10</p>
                  </div>
                  <Heart className="w-8 h-8 text-success opacity-80" />
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="text-2xl font-bold text-accent">+12%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-accent opacity-80" />
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Wellness Score</p>
                    <p className="text-2xl font-bold text-primary">85/100</p>
                  </div>
                  <Sparkles className="w-8 h-8 text-primary opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mood Trends */}
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Weekly Mood Trends
                  </CardTitle>
                  <CardDescription>Your mood and energy levels over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockMoodData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="mood" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        name="Mood"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="energy" 
                        stroke="hsl(var(--success))" 
                        strokeWidth={3}
                        name="Energy"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Today's Wellness Goal */}
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    Today's Wellness Goal
                  </CardTitle>
                  <CardDescription>Focus on self-care and mindfulness</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-wellness p-4 rounded-lg">
                    <h3 className="font-semibold text-secondary-foreground mb-2">Practice Deep Breathing</h3>
                    <p className="text-sm text-secondary-foreground/80 mb-3">
                      Take 5 minutes to practice deep breathing exercises. This can help reduce stress and improve focus.
                    </p>
                    <Progress value={60} className="h-2" />
                    <p className="text-xs text-secondary-foreground/70 mt-2">3 of 5 minutes completed</p>
                  </div>
                  <Button className="w-full bg-gradient-motivation shadow-soft">
                    Continue Practice
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockInsights.map((insight, index) => (
                <Card key={index} className="shadow-card border-0">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-primary" />
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <Badge variant={insight.type === 'success' ? 'default' : 'secondary'}>
                        {insight.type === 'success' ? 'Achievement' : 'Suggestion'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{insight.description}</p>
                    <Button variant="outline" className="mt-4" size="sm">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
                <CardDescription>Your wellness journey over the past month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={mockMoodData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Bar dataKey="mood" fill="hsl(var(--primary))" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      {showMoodCheckIn && (
        <MoodCheckIn onClose={() => setShowMoodCheckIn(false)} />
      )}
      
      {showAIChat && (
        <AIChat onClose={() => setShowAIChat(false)} />
      )}
    </div>
  );
};

export default Dashboard;