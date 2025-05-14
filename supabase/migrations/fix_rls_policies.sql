-- Drop existing policies for contact_messages
DROP POLICY IF EXISTS "Allow authenticated users to insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow anyone to insert contact messages" ON public.contact_messages;

-- Create new policies with proper permissions
CREATE POLICY "Allow authenticated users to insert contact messages"
  ON public.contact_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow anyone to insert contact messages"
  ON public.contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Drop existing policies for problem_reports
DROP POLICY IF EXISTS "Allow authenticated users to insert problem reports" ON public.problem_reports;
DROP POLICY IF EXISTS "Allow anyone to insert problem reports" ON public.problem_reports;

-- Create new policies with proper permissions
CREATE POLICY "Allow authenticated users to insert problem reports"
  ON public.problem_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow anyone to insert problem reports"
  ON public.problem_reports
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Add policy to allow inserting into sprints
CREATE POLICY "Allow authenticated users to insert sprints"
  ON public.sprints
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Add policy to allow updating sprints
CREATE POLICY "Allow authenticated users to update sprints"
  ON public.sprints
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add policy to allow inserting into challenges
CREATE POLICY "Allow authenticated users to insert challenges"
  ON public.challenges
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Add policy to allow updating challenges
CREATE POLICY "Allow authenticated users to update challenges"
  ON public.challenges
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create user_progress table if it doesn't exist
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

-- Drop existing policies for user_progress
DROP POLICY IF EXISTS "Allow users to select their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Allow users to insert their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Allow users to update their own progress" ON public.user_progress;

-- Create new policies with proper permissions
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
