import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome back! 👋</h1>
            <p className="text-muted-foreground">Ready to continue your learning journey?</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Tutor</CardTitle>
              <CardDescription>Get instant help with your questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exam Prep</CardTitle>
              <CardDescription>Practice with past papers and quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Browse Exams</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Homework Help</CardTitle>
              <CardDescription>Upload problems and get solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Upload Homework</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Groups</CardTitle>
              <CardDescription>Collaborate with peers</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Join Groups</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress Reports</CardTitle>
              <CardDescription>Track your learning progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Reports</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Path</CardTitle>
              <CardDescription>Follow your personalized curriculum</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Continue Learning</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}