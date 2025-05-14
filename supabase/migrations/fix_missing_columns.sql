-- Fix missing columns in user_progress table
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS current_day INTEGER DEFAULT 1;

-- Ensure all required tables exist
CREATE TABLE IF NOT EXISTS public.user_progress (
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

-- Create policy to allow users to select their own progress
CREATE POLICY IF NOT EXISTS "Allow users to select their own progress"
  ON public.user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own progress
CREATE POLICY IF NOT EXISTS "Allow users to insert their own progress"
  ON public.user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own progress
CREATE POLICY IF NOT EXISTS "Allow users to update their own progress"
  ON public.user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create streaks table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id)
);

-- Set up RLS (Row Level Security)
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to select their own streaks
CREATE POLICY IF NOT EXISTS "Allow users to select their own streaks"
  ON public.streaks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own streaks
CREATE POLICY IF NOT EXISTS "Allow users to insert their own streaks"
  ON public.streaks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own streaks
CREATE POLICY IF NOT EXISTS "Allow users to update their own streaks"
  ON public.streaks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
