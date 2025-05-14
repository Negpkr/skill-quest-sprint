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
    
    -- Set up RLS (Row Level Security)
    ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
    
    -- Create policies
    CREATE POLICY "Allow users to select their own progress"
      ON public.user_progress
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
    
    CREATE POLICY "Allow users to insert their own progress"
      ON public.user_progress
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
    
    CREATE POLICY "Allow users to update their own progress"
      ON public.user_progress
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
    
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
    
    -- Set up RLS (Row Level Security)
    ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;
    
    -- Create policies
    CREATE POLICY "Allow users to select their own streaks"
      ON public.streaks
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
    
    CREATE POLICY "Allow users to insert their own streaks"
      ON public.streaks
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
    
    CREATE POLICY "Allow users to update their own streaks"
      ON public.streaks
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
    
    RAISE NOTICE 'Created streaks table';
  ELSE
    RAISE NOTICE 'streaks table already exists';
  END IF;
END $$;

-- ==================== SPRINTS TABLE ====================
-- Check if the sprints table has the slug column
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'sprints'
  ) THEN
    -- Table exists, check if slug column exists
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'sprints' 
      AND column_name = 'slug'
    ) THEN
      -- Add slug column
      ALTER TABLE public.sprints ADD COLUMN slug TEXT;
      
      -- Update existing records to have a slug based on their ID
      UPDATE public.sprints
      SET slug = 'sprint-' || id::text
      WHERE slug IS NULL;
      
      -- Add unique constraint
      ALTER TABLE public.sprints ADD CONSTRAINT sprints_slug_key UNIQUE (slug);
      
      RAISE NOTICE 'Added slug column to sprints table';
    ELSE
      RAISE NOTICE 'slug column already exists in sprints table';
    END IF;
  END IF;
END $$;

-- ==================== VERIFY FOREIGN KEYS ====================
-- Check if the foreign keys are set up correctly
DO $$
BEGIN
  -- Check if the sprint_id foreign key exists in challenges table
  IF NOT EXISTS (
    SELECT FROM information_schema.table_constraints
    WHERE constraint_schema = 'public'
    AND table_name = 'challenges'
    AND constraint_name = 'challenges_sprint_id_fkey'
  ) THEN
    -- Add foreign key constraint
    ALTER TABLE public.challenges
    ADD CONSTRAINT challenges_sprint_id_fkey
    FOREIGN KEY (sprint_id)
    REFERENCES public.sprints(id)
    ON DELETE CASCADE;
    
    RAISE NOTICE 'Added sprint_id foreign key to challenges table';
  END IF;
  
  -- Check if the sprint_id foreign key exists in user_progress table
  IF NOT EXISTS (
    SELECT FROM information_schema.table_constraints
    WHERE constraint_schema = 'public'
    AND table_name = 'user_progress'
    AND constraint_name = 'user_progress_sprint_id_fkey'
  ) THEN
    -- Add foreign key constraint
    ALTER TABLE public.user_progress
    ADD CONSTRAINT user_progress_sprint_id_fkey
    FOREIGN KEY (sprint_id)
    REFERENCES public.sprints(id)
    ON DELETE CASCADE;
    
    RAISE NOTICE 'Added sprint_id foreign key to user_progress table';
  END IF;
  
  -- Check if the challenge_id foreign key exists in user_progress table
  IF NOT EXISTS (
    SELECT FROM information_schema.table_constraints
    WHERE constraint_schema = 'public'
    AND table_name = 'user_progress'
    AND constraint_name = 'user_progress_challenge_id_fkey'
  ) THEN
    -- Add foreign key constraint
    ALTER TABLE public.user_progress
    ADD CONSTRAINT user_progress_challenge_id_fkey
    FOREIGN KEY (challenge_id)
    REFERENCES public.challenges(id)
    ON DELETE CASCADE;
    
    RAISE NOTICE 'Added challenge_id foreign key to user_progress table';
  END IF;
END $$;

-- ==================== DONE ====================
SELECT 'Database structure fixed successfully' as result;
