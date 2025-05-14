
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface CalendarDay {
  day: number;
  status: 'completed' | 'today' | 'upcoming';
}

interface SprintCalendarProps {
  days: CalendarDay[];
}

const SprintCalendar: React.FC<SprintCalendarProps> = ({ days }) => {
  return (
    <Card className="border-2 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 text-blue-500 mr-2" />
          Sprint Calendar
        </CardTitle>
        <CardDescription>
          Your 30-day challenge roadmap
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
          <div className="grid grid-cols-7 gap-1">
            {days.map(({ day, status }) => (
              <div
                key={day}
                className={`
                  aspect-square flex items-center justify-center rounded-md text-sm relative
                  ${status === 'completed' 
                    ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-sm" 
                    : status === 'today' 
                    ? "bg-gradient-to-br from-purple-500 to-indigo-500 text-white animate-pulse-slow shadow-md" 
                    : "bg-white/80 border border-gray-200 text-gray-500"}
                `}
              >
                <span>{day}</span>
                {(status === 'completed') && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-white/70" />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
              <span>Today</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-white border border-gray-200 rounded-full"></div>
              <span>Upcoming</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SprintCalendar;
