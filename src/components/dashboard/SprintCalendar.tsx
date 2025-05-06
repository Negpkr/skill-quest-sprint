
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CalendarDay {
  day: number;
  status: 'completed' | 'today' | 'upcoming';
}

interface SprintCalendarProps {
  days: CalendarDay[];
}

const SprintCalendar: React.FC<SprintCalendarProps> = ({ days }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sprint Calendar</CardTitle>
        <CardDescription>
          Your 30-day challenge roadmap
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {days.map(({ day, status }) => (
            <div
              key={day}
              className={`
                aspect-square flex items-center justify-center rounded-md text-sm relative
                ${status === 'completed' ? "bg-softgreen text-green-800" : 
                  status === 'today' ? "bg-skillpurple-400 text-white" : "bg-muted"}
              `}
            >
              <span>{day}</span>
              {(status === 'completed') && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500" />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-skillpurple-400 rounded-full"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-softgreen rounded-full"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-muted rounded-full"></div>
            <span>Upcoming</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SprintCalendar;
