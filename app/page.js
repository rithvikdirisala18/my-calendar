import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, CheckCircle, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
      <h1 className="text-5xl font-bold text-brightOrange">Plan Your Day 🚀</h1>
      <p className="text-mutedPink text-lg">Stay organized with your tasks and meetings.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="w-64 shadow-lg hover:shadow-xl transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brightOrange">
              <Calendar className="w-5 h-5" /> Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-mutedPink">View and manage your events seamlessly.</p>
          </CardContent>
        </Card>

        <Card className="w-64 shadow-lg hover:shadow-xl transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brightOrange">
              <CheckCircle className="w-5 h-5" /> Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-mutedPink">Track and complete your daily tasks efficiently.</p>
          </CardContent>
        </Card>

        <Card className="w-64 shadow-lg hover:shadow-xl transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brightOrange">
              <Clock className="w-5 h-5" /> Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-mutedPink">Get notified about your important meetings.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
