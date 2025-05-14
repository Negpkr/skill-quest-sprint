-- This SQL script fixes all issues with the database structure and permissions

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== SPRINTS ====================
-- Create sprints table with all required fields
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

-- Set up RLS (Row Level Security)
ALTER TABLE public.sprints ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow anyone to select sprints" ON public.sprints;
DROP POLICY IF EXISTS "Allow authenticated users to insert sprints" ON public.sprints;
DROP POLICY IF EXISTS "Allow authenticated users to update sprints" ON public.sprints;

-- Create policies
CREATE POLICY "Allow anyone to select sprints"
  ON public.sprints
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert sprints"
  ON public.sprints
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update sprints"
  ON public.sprints
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ==================== CHALLENGES ====================
-- Create challenges table with all required fields
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

-- Set up RLS (Row Level Security)
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow anyone to select challenges" ON public.challenges;
DROP POLICY IF EXISTS "Allow authenticated users to insert challenges" ON public.challenges;
DROP POLICY IF EXISTS "Allow authenticated users to update challenges" ON public.challenges;

-- Create policies
CREATE POLICY "Allow anyone to select challenges"
  ON public.challenges
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert challenges"
  ON public.challenges
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update challenges"
  ON public.challenges
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ==================== USER_PROGRESS ====================
-- Create user_progress table with all required fields
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

-- Drop existing policies
DROP POLICY IF EXISTS "Allow users to select their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Allow users to insert their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Allow users to update their own progress" ON public.user_progress;

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

-- ==================== STREAKS ====================
-- Create streaks table with all required fields
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

-- Drop existing policies
DROP POLICY IF EXISTS "Allow users to select their own streaks" ON public.streaks;
DROP POLICY IF EXISTS "Allow users to insert their own streaks" ON public.streaks;
DROP POLICY IF EXISTS "Allow users to update their own streaks" ON public.streaks;

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

-- ==================== CONTACT_MESSAGES ====================
-- Create contact_messages table with all required fields
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'new'
);

-- Set up RLS (Row Level Security)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow anyone to insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow admins to select all contact messages" ON public.contact_messages;

-- Create policies
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

CREATE POLICY "Allow admins to select all contact messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ? 'admin');

-- ==================== PROBLEM_REPORTS ====================
-- Create problem_reports table with all required fields
CREATE TABLE IF NOT EXISTS public.problem_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  issue_type TEXT NOT NULL,
  description TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'new'
);

-- Set up RLS (Row Level Security)
ALTER TABLE public.problem_reports ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to insert problem reports" ON public.problem_reports;
DROP POLICY IF EXISTS "Allow anyone to insert problem reports" ON public.problem_reports;
DROP POLICY IF EXISTS "Allow admins to select all problem reports" ON public.problem_reports;

-- Create policies
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

CREATE POLICY "Allow admins to select all problem reports"
  ON public.problem_reports
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ? 'admin');

-- ==================== SAMPLE DATA ====================
-- Insert sample data for sprints if they don't exist
INSERT INTO public.sprints (id, title, slug, description, duration, difficulty, category, cover_image)
VALUES
  ('7f649785-a610-40d7-b144-29c36fc14628', 'Design Starter', 'design-starter', 'Learn the basics of design in 30 days', 30, 'beginner', 'design', 'https://images.unsplash.com/photo-1561070791-2526d30994b5'),
  ('08c8f5db-c37e-417d-a6a4-d10c0bb78e52', 'Frontend Fundamentals', 'frontend-fundamentals', 'Master HTML, CSS and JavaScript', 30, 'beginner', 'development', 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613'),
  ('7ead586e-49a1-4ba0-bbeb-97f6cc482170', 'Backend Basics', 'backend-basics', 'Learn server-side programming', 30, 'intermediate', 'development', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c')
ON CONFLICT (id) DO NOTHING;
