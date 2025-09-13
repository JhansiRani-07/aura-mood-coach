import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Brain, TrendingUp, Shield, Users, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Hero Section */}
      <section className="relative px-4 py-20 lg:py-32">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-6 bg-gradient-primary text-white shadow-glow" variant="secondary">
            <Sparkles className="w-4 h-4 mr-2" />
            Supporting Student Mental Health
          </Badge>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-6xl bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Student Wellness Monitor
          </h1>
          
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground lg:text-xl">
            Empower your mental health journey with daily check-ins, AI-powered insights, 
            and personalized wellness coaching designed specifically for students.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary shadow-soft text-lg px-8 py-6"
              onClick={() => navigate('/dashboard')}
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 shadow-soft"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need for Mental Wellness</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our comprehensive platform provides tools and insights to help you understand, 
              track, and improve your mental well-being.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-card border-0 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Daily Mood Tracking</CardTitle>
                <CardDescription>
                  Log your emotions with simple emojis, sliders, and notes to build awareness of your mental state.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card border-0 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-wellness rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <CardTitle>Visual Progress</CardTitle>
                <CardDescription>
                  See your wellness journey through beautiful charts and graphs that reveal patterns over time.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card border-0 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-motivation rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle>AI Insights</CardTitle>
                <CardDescription>
                  Get personalized recommendations and wellness tips powered by advanced sentiment analysis.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card border-0 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Motivational Coaching</CardTitle>
                <CardDescription>
                  Chat with our AI wellness coach for encouragement, strategies, and positive affirmations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card border-0 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-wellness rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-success" />
                </div>
                <CardTitle>Privacy First</CardTitle>
                <CardDescription>
                  Your mental health data is encrypted and private. You control what you share and when.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card border-0 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-motivation rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Smart Reminders</CardTitle>
                <CardDescription>
                  Gentle notifications to check in with yourself and practice mindfulness throughout the day.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="shadow-glow border-0 bg-gradient-primary p-8 lg:p-12">
            <CardContent className="text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Wellness Journey?</h2>
              <p className="text-lg mb-8 opacity-90">
                Join thousands of students who are taking control of their mental health 
                with our supportive, AI-powered platform.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-6"
                onClick={() => navigate('/dashboard')}
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
