import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import OnboardingQuiz from '@/components/onboarding/OnboardingQuiz';
import OnboardingGoals from '@/components/onboarding/OnboardingGoals';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [quizScore, setQuizScore] = useState(0);
  const [knowledgeLevel, setKnowledgeLevel] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const totalSteps = 2;
  const progress = (step / totalSteps) * 100;

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleQuizComplete = async (score: number, level: string) => {
    setQuizScore(score);
    setKnowledgeLevel(level);
    
    // Update onboarding progress
    const { error } = await supabase
      .from('onboarding_progress')
      .update({
        quiz_completed: true,
        quiz_score: score,
        knowledge_level: level,
      })
      .eq('user_id', user?.id);

    if (error) {
      toast.error('Failed to save quiz results');
      return;
    }

    setStep(2);
  };

  const handleGoalsComplete = async (goals: any) => {
    // Update onboarding progress
    const { error } = await supabase
      .from('onboarding_progress')
      .update({
        goals_set: true,
        onboarding_completed: true,
      })
      .eq('user_id', user?.id);

    if (error) {
      toast.error('Failed to save goals');
      return;
    }

    // Update profile with study preferences
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        daily_goal: goals.dailyGoal,
        preferred_study_times: goals.preferredTimes,
      })
      .eq('id', user?.id);

    if (profileError) {
      toast.error('Failed to update profile');
      return;
    }

    toast.success('Onboarding complete! Welcome to Prepify AI 🎉');
    navigate('/dashboard');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-4">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">Welcome to Prepify AI! 🎓</CardTitle>
            <CardDescription>
              Let's personalize your learning experience
            </CardDescription>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && <OnboardingQuiz onComplete={handleQuizComplete} />}
          {step === 2 && (
            <OnboardingGoals
              knowledgeLevel={knowledgeLevel}
              onComplete={handleGoalsComplete}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}