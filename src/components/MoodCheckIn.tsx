import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Zap, Smile, Meh, Frown, Check } from "lucide-react";

interface MoodCheckInProps {
  onClose: () => void;
}

const moodEmojis = [
  { emoji: "😢", label: "Very Sad", value: 1, icon: Frown },
  { emoji: "😔", label: "Sad", value: 2, icon: Frown },
  { emoji: "😐", label: "Neutral", value: 3, icon: Meh },
  { emoji: "🙂", label: "Good", value: 4, icon: Smile },
  { emoji: "😊", label: "Happy", value: 5, icon: Smile },
  { emoji: "😄", label: "Very Happy", value: 6, icon: Smile },
  { emoji: "🤩", label: "Amazing", value: 7, icon: Smile },
];

const MoodCheckIn = ({ onClose }: MoodCheckInProps) => {
  const [selectedMood, setSelectedMood] = useState<number>(4);
  const [energyLevel, setEnergyLevel] = useState<number[]>([7]);
  const [stressLevel, setStressLevel] = useState<number[]>([3]);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      // Show success toast would go here
    }, 1500);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Daily Mood Check-In</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Mood Selection */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              How are you feeling today?
            </Label>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
              {moodEmojis.map((mood) => (
                <Card 
                  key={mood.value}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-soft ${
                    selectedMood === mood.value 
                      ? 'ring-2 ring-primary bg-primary/5 shadow-glow' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedMood(mood.value)}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl mb-1">{mood.emoji}</div>
                    <div className="text-xs text-muted-foreground">{mood.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Energy Level */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Energy Level: {energyLevel[0]}/10
            </Label>
            <div className="px-3">
              <Slider
                value={energyLevel}
                onValueChange={setEnergyLevel}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Low Energy</span>
                <span>High Energy</span>
              </div>
            </div>
          </div>

          {/* Stress Level */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <Heart className="w-5 h-5 text-destructive" />
              Stress Level: {stressLevel[0]}/10
            </Label>
            <div className="px-3">
              <Slider
                value={stressLevel}
                onValueChange={setStressLevel}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Very Calm</span>
                <span>Very Stressed</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold">
              Anything specific you'd like to share? (Optional)
            </Label>
            <Textarea
              placeholder="How was your day? Any challenges or wins you'd like to note..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-gradient-primary shadow-soft"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Complete Check-In
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodCheckIn;