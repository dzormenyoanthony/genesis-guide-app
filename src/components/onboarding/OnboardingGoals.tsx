import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

const studyTimes = [
  { id: 'morning', label: 'Morning (6AM - 12PM)' },
  { id: 'afternoon', label: 'Afternoon (12PM - 6PM)' },
  { id: 'evening', label: 'Evening (6PM - 10PM)' },
  { id: 'night', label: 'Night (10PM - 2AM)' },
];

interface OnboardingGoalsProps {
  knowledgeLevel: string;
  onComplete: (goals: any) => void;
}

export default function OnboardingGoals({ knowledgeLevel, onComplete }: OnboardingGoalsProps) {
  const [dailyGoal, setDailyGoal] = useState(30);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const handleTimeToggle = (timeId: string) => {
    setSelectedTimes((prev) =>
      prev.includes(timeId)
        ? prev.filter((id) => id !== timeId)
        : [...prev, timeId]
    );
  };

  const handleComplete = () => {
    onComplete({
      dailyGoal,
      preferredTimes: selectedTimes,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Your Knowledge Level</h3>
            <p className="text-sm text-muted-foreground">
              Based on your quiz results, we've assessed your level as:{' '}
              <span className="font-semibold text-primary">{knowledgeLevel}</span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Daily Study Goal (minutes)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  value={[dailyGoal]}
                  onValueChange={([value]) => setDailyGoal(value)}
                  min={15}
                  max={120}
                  step={15}
                  className="flex-1"
                />
                <span className="font-semibold text-lg w-16 text-right">{dailyGoal} min</span>
              </div>
              <p className="text-xs text-muted-foreground">
                We'll help you maintain a consistent study schedule
              </p>
            </div>

            <div className="space-y-3">
              <Label>Preferred Study Times</Label>
              <div className="space-y-2">
                {studyTimes.map((time) => (
                  <div key={time.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={time.id}
                      checked={selectedTimes.includes(time.id)}
                      onCheckedChange={() => handleTimeToggle(time.id)}
                    />
                    <Label
                      htmlFor={time.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {time.label}
                    </Label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Select when you're most productive (you can change this later)
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Button
        onClick={handleComplete}
        disabled={selectedTimes.length === 0}
        className="w-full"
      >
        Start Learning
      </Button>
    </div>
  );
}