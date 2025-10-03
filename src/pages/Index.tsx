import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      <div className="text-center space-y-8 p-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            Prepify AI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Your Personal Study Companion 🎓
          </p>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            AI-powered tutoring, exam preparation, and homework help tailored for SHS and university students.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => navigate('/auth')}>
            Get Started
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/auth')}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
