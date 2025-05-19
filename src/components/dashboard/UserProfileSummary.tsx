import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { UserCircle, Settings, Award, Zap } from "lucide-react";

interface UserProfileSummaryProps {
  user: User | null;
  totalSprints: number;
  completedSprints: number;
  streakDays: number;
}

const UserProfileSummary: React.FC<UserProfileSummaryProps> = ({
  user,
  totalSprints,
  completedSprints,
  streakDays,
}) => {
  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user) return "U";
    const name = user.user_metadata?.full_name || user.email || "";
    if (!name) return "U";
    
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Get user's display name
  const getDisplayName = () => {
    if (!user) return "User";
    return user.user_metadata?.full_name || user.email?.split('@')[0] || "User";
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="border-2 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <UserCircle className="h-5 w-5 text-purple-500 mr-2" />
          Your Profile
        </CardTitle>
        <CardDescription>Welcome back to your dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-purple-100">
            <AvatarImage src={user?.user_metadata?.avatar_url} alt="Profile" />
            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-indigo-500 text-white text-xl">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{getDisplayName()}</h3>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Member since {user?.created_at ? formatDate(user.created_at) : "N/A"}
            </p>
          </div>
          
          <Button asChild variant="outline" size="sm">
            <Link to="/profile" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-purple-600">{totalSprints}</div>
            <div className="text-xs text-purple-700 mt-1">Total Sprints</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{completedSprints}</div>
            <div className="text-xs text-green-700 mt-1 flex items-center justify-center">
              <Award className="h-3 w-3 mr-1" />
              Completed
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-orange-600">{streakDays}</div>
            <div className="text-xs text-orange-700 mt-1 flex items-center justify-center">
              <Zap className="h-3 w-3 mr-1" />
              Day Streak
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileSummary;
