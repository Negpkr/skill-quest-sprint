
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { fixDatabaseStructure } from './fixDatabaseStructure';
import { checkSupabaseTables } from './checkSupabaseTables';
import { fixStreakIssues } from './fixStreakIssues';

interface FixResult {
  success: boolean;
  message: string;
  details?: any;
}

export const fixAllIssues = async (userId: string): Promise<FixResult> => {
  if (!userId) {
    return { success: false, message: 'No user ID provided' };
  }
  
  try {
    console.log('Starting comprehensive database fixes...');
    
    // Step 1: Check if all required tables exist
    const tablesCheck = await checkSupabaseTables();
    if (!tablesCheck.success) {
      console.log('Tables check failed:', tablesCheck.message);
      return {
        success: false,
        message: 'Database tables check failed',
        details: tablesCheck
      };
    }
    
    // Step 2: Fix database structure
    const structureResult = await fixDatabaseStructure();
    if (!structureResult.success) {
      console.log('Database structure fix failed:', structureResult.message);
      return {
        success: false,
        message: 'Database structure fix failed',
        details: structureResult
      };
    }
    
    // Step 3: Fix user streak issues
    const streakResult = await fixStreakIssues(userId);
    if (!streakResult.success) {
      console.log('Streak fix failed:', streakResult.message);
      return {
        success: false,
        message: 'Streak fix failed',
        details: streakResult
      };
    }
    
    // Step 4: Test if a simple query works without errors
    try {
      const { error } = await supabase
        .from('user_progress')
        .select('id')
        .eq('user_id', userId)
        .limit(1);
        
      if (error) {
        // Handle error without using count property
        console.error('Test query failed:', error.message);
        return {
          success: false,
          message: 'Test query failed',
          details: { error: error.message }
        };
      }
    } catch (testError: any) {
      // Handle error without using count property
      console.error('Test query exception:', testError.message);
      return {
        success: false,
        message: 'Test query exception',
        details: { error: testError.message }
      };
    }
    
    console.log('All database fixes completed successfully');
    
    toast({
      title: 'Success',
      description: 'All database issues fixed successfully',
    });
    
    return {
      success: true,
      message: 'All database issues fixed successfully',
      details: {
        tables: tablesCheck,
        structure: structureResult,
        streak: streakResult
      }
    };
  } catch (error: any) {
    console.error('Error in fixAllIssues:', error);
    
    // Handle error without using count property
    toast({
      title: 'Error',
      description: 'Failed to fix database issues. Please try again.',
      variant: 'destructive',
    });
    
    return {
      success: false,
      message: 'Failed to fix database issues',
      details: { error: error.message }
    };
  }
};
