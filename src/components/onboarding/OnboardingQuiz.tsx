import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the capital of Ghana?',
    options: ['Kumasi', 'Accra', 'Tamale', 'Cape Coast'],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'Solve: 2 + 2 × 2',
    options: ['6', '8', '4', '10'],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: 'What is photosynthesis?',
    options: [
      'Process of cell division',
      'Process plants use to make food from sunlight',
      'Process of digestion',
      'Process of respiration',
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: 'Who wrote "Things Fall Apart"?',
    options: ['Wole Soyinka', 'Chinua Achebe', 'Ngugi wa Thiongo', 'Ama Ata Aidoo'],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: 'What is the speed of light?',
    options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '200,000 km/s'],
    correctAnswer: 0,
  },
];

interface OnboardingQuizProps {
  onComplete: (score: number, level: string) => void;
}

export default function OnboardingQuiz({ onComplete }: OnboardingQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Calculate score
      const score = newAnswers.reduce((acc, answer, index) => {
        return answer === quizQuestions[index].correctAnswer ? acc + 1 : acc;
      }, 0);

      const percentage = (score / quizQuestions.length) * 100;
      let level = 'Beginner';
      if (percentage >= 80) level = 'Advanced';
      else if (percentage >= 60) level = 'Intermediate';

      onComplete(score, level);
    }
  };

  const question = quizQuestions[currentQuestion];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </div>
          <h3 className="text-lg font-semibold">{question.question}</h3>
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
          >
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-sm"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </Card>
      <Button
        onClick={handleNext}
        disabled={selectedAnswer === null}
        className="w-full"
      >
        {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Complete Quiz'}
      </Button>
    </div>
  );
}