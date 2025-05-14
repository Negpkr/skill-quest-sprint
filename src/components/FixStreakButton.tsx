import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { fixUserStreak } from '@/utils/fixStreakIssues';

interface FixStreakButtonProps {
  userId: string;
  onSuccess?: () => void;
}

const FixStreakButton: React.FC<FixStreakButtonProps> = ({ userId, onSuccess }) => {
  const [isFixing, setIsFixing] = useState(false);

  const handleFixStreak = async () => {
    if (!userId) {
      toast({
        title: "Error",
        description: "User ID is required to fix streak",
        variant: "destructive",
      });
      return;
    }

    setIsFixing(true);
    try {
      const result = await fixUserStreak(userId);

      if (result.success) {
        toast({
          title: "Success",
          description: "Your streak has been fixed successfully!",
        });

        if (onSuccess) {
          onSuccess();
        } else {
          // Reload the page to show the updated streak
          window.location.reload();
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to fix streak. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fixing streak:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsFixing(false);
    }
  };

  return (
    <Button
      onClick={handleFixStreak}
      disabled={isFixing}
      variant="outline"
      size="sm"
      className="ml-2"
    >
      {isFixing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Fixing...
        </>
      ) : (
        "Fix Streak"
      )}
    </Button>
  );
};

export default FixStreakButton;
