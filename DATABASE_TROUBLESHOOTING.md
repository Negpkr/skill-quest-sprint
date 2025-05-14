# Database Troubleshooting Guide

This guide provides instructions for troubleshooting and fixing database issues in the SkillQuest application.

## Common Issues

1. **Missing Tables**: One or more required tables don't exist in the Supabase database.
2. **Missing Columns**: Tables exist but are missing required columns (e.g., `current_day` in the `user_progress` table).
3. **Incorrect Data Types**: Columns exist but have the wrong data type.
4. **Missing Sample Data**: Tables exist but don't have any sample data.

## Quick Fix

The easiest way to fix all issues at once is to use the "Run All Fixes" button on the Supabase Test Page:

1. Go to `/supabase-test` in the application
2. Click the "Run All Fixes" button in the yellow box
3. Check the console for detailed results

## Manual Fixes

### 1. Missing Tables

If tables are missing, you need to run the SQL in `supabase/migrations/create_tables.sql`:

1. Go to the Supabase dashboard for your project
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the SQL from `supabase/migrations/create_tables.sql`
5. Run the query

### 2. Missing Columns

If tables exist but are missing columns, you can run the SQL in `supabase/migrations/fix_missing_columns.sql`:

1. Go to the Supabase dashboard for your project
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the SQL from `supabase/migrations/fix_missing_columns.sql`
5. Run the query

### 3. Using the Database Fixer Component

The application includes a DatabaseFixer component that can check and fix database structure issues:

1. Go to `/supabase-test` in the application
2. Click the "Check Database" button in the Database Structure Checker card
3. If issues are found, click the "Fix Issues" button

## Using the Browser Console

You can also fix issues using the browser console:

1. Open the browser console (F12 or right-click > Inspect > Console)
2. Run `fixAllIssues()` to fix all issues at once
3. Check the console for detailed results

Or run specific fixes:

- `fixDatabaseStructure()` - Fix database structure issues
- `testSupabaseConnection()` - Test the connection to Supabase
- `createSupabaseTables()` - Create missing tables

## Required Tables

The following tables are required for the application to function properly:

1. `sprints` - Stores information about skill sprints
2. `challenges` - Stores daily challenges for each sprint
3. `user_progress` - Tracks user progress through sprints
4. `streaks` - Tracks user streaks
5. `contact_messages` - Stores contact form submissions
6. `problem_reports` - Stores problem reports

## Table Structures

### sprints

```sql
CREATE TABLE IF NOT EXISTS public.sprints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  duration INTEGER DEFAULT 30,
  difficulty TEXT,
  category TEXT,
  cover_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### challenges

```sql
CREATE TABLE IF NOT EXISTS public.challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sprint_id UUID NOT NULL REFERENCES public.sprints(id) ON DELETE CASCADE,
  day INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  resources TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(sprint_id, day)
);
```

### user_progress

```sql
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sprint_id UUID NOT NULL REFERENCES public.sprints(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_date TIMESTAMP WITH TIME ZONE,
  current_day INTEGER DEFAULT 1,
  completed BOOLEAN DEFAULT false,
  notes TEXT,
  UNIQUE(user_id, sprint_id)
);
```

### streaks

```sql
CREATE TABLE IF NOT EXISTS public.streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id)
);
```

## Troubleshooting Specific Issues

### "column user_progress.current_day does not exist"

This error occurs when the `current_day` column is missing from the `user_progress` table. To fix it:

1. Go to the Supabase dashboard for your project
2. Navigate to the SQL Editor
3. Create a new query
4. Run the following SQL:

```sql
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS current_day INTEGER DEFAULT 1;
```

### "relation "public.streaks" does not exist"

This error occurs when the `streaks` table is missing. To fix it:

1. Go to the Supabase dashboard for your project
2. Navigate to the SQL Editor
3. Create a new query
4. Run the following SQL:

```sql
CREATE TABLE IF NOT EXISTS public.streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id)
);
```

## Need More Help?

If you're still experiencing issues, please contact the development team for assistance.
