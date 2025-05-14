# Database Fix Instructions

This document provides step-by-step instructions to fix the database structure issues in the SkillQuest application.

## Issue: Missing `current_day` Column in `user_progress` Table

The most common issue is that the `current_day` column is missing from the `user_progress` table. This column is required for the application to function properly.

### How to Fix

1. **Go to the Supabase Dashboard**
   - Open your Supabase project dashboard at [https://app.supabase.com/project/qawwfkjsxcneenctndtm](https://app.supabase.com/project/qawwfkjsxcneenctndtm)
   - Navigate to the SQL Editor section

2. **Create a New Query**
   - Click on "New Query"
   - Paste the following SQL code:

```sql
-- This SQL script fixes all database structure issues
-- Run this in the Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== USER PROGRESS TABLE ====================
-- First, check if the user_progress table exists
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'user_progress'
  ) THEN
    -- Table exists, check if current_day column exists
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'user_progress' 
      AND column_name = 'current_day'
    ) THEN
      -- Add current_day column
      ALTER TABLE public.user_progress ADD COLUMN current_day INTEGER DEFAULT 1;
      RAISE NOTICE 'Added current_day column to user_progress table';
    ELSE
      RAISE NOTICE 'current_day column already exists in user_progress table';
    END IF;
  ELSE
    -- Create user_progress table with all required columns
    CREATE TABLE public.user_progress (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL,
      sprint_id UUID NOT NULL,
      challenge_id UUID,
      start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      completed_date TIMESTAMP WITH TIME ZONE,
      current_day INTEGER DEFAULT 1,
      completed BOOLEAN DEFAULT false,
      notes TEXT,
      UNIQUE(user_id, sprint_id)
    );
    
    RAISE NOTICE 'Created user_progress table with all required columns';
  END IF;
END $$;

-- ==================== STREAKS TABLE ====================
-- Check if the streaks table exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'streaks'
  ) THEN
    -- Create streaks table
    CREATE TABLE public.streaks (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL,
      current_streak INTEGER DEFAULT 0,
      longest_streak INTEGER DEFAULT 0,
      last_activity_date TIMESTAMP WITH TIME ZONE,
      UNIQUE(user_id)
    );
    
    RAISE NOTICE 'Created streaks table';
  ELSE
    RAISE NOTICE 'streaks table already exists';
  END IF;
END $$;

-- ==================== DONE ====================
SELECT 'Database structure fixed successfully' as result;
```

3. **Run the Query**
   - Click the "Run" button to execute the SQL code
   - You should see a message saying "Database structure fixed successfully"

4. **Verify the Fix**
   - Go back to the application
   - Navigate to the Supabase Test page (`/supabase-test`)
   - Click "Check Database" to verify that the issues have been fixed

## Alternative Method: Using the Supabase Test Page

The application includes a Supabase Test page that can help you diagnose and fix database issues:

1. Navigate to `/supabase-test` in the application
2. If there are database structure issues, you'll see a "Database Structure Fix Required" card
3. Follow the instructions in the card to fix the issues

## Troubleshooting

If you're still experiencing issues after following these instructions, try the following:

1. **Check the Console for Errors**
   - Open the browser's developer console (F12 or right-click > Inspect > Console)
   - Look for any error messages related to Supabase or database operations

2. **Verify Supabase Connection**
   - On the Supabase Test page, click "Test Connection" to verify that the application can connect to Supabase
   - If the connection fails, check your Supabase URL and API key

3. **Check Table Structure**
   - In the Supabase dashboard, go to the Table Editor
   - Verify that the `user_progress` table has a `current_day` column
   - Verify that the `streaks` table exists

4. **Run the Complete Fix Script**
   - If you're still having issues, try running the complete fix script from `supabase/migrations/fix_database_structure.sql`

## Need More Help?

If you're still experiencing issues, please contact the development team for assistance.
