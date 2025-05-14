/**
 * This file contains SQL statements to create the necessary tables in Supabase.
 * These statements should be run in the Supabase SQL Editor.
 */

/**
 * Create the contact_messages table
 */
export const createContactMessagesTable = `
-- Create contact_messages table
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

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert contact messages"
  ON public.contact_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow admins to select all contact messages
CREATE POLICY "Allow admins to select all contact messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ? 'admin');
`;

/**
 * Create the problem_reports table
 */
export const createProblemReportsTable = `
-- Create problem_reports table
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

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert problem reports"
  ON public.problem_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow admins to select all problem reports
CREATE POLICY "Allow admins to select all problem reports"
  ON public.problem_reports
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ? 'admin');
`;

/**
 * Create the user_progress table if it doesn't exist
 */
export const createUserProgressTable = `
-- Create user_progress table
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sprint_id UUID NOT NULL REFERENCES public.sprints(id) ON DELETE CASCADE,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_date TIMESTAMP WITH TIME ZONE,
  current_day INTEGER DEFAULT 1,
  completed BOOLEAN DEFAULT false,
  UNIQUE(user_id, sprint_id)
);

-- Set up RLS (Row Level Security)
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to select their own progress
CREATE POLICY "Allow users to select their own progress"
  ON public.user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own progress
CREATE POLICY "Allow users to insert their own progress"
  ON public.user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own progress
CREATE POLICY "Allow users to update their own progress"
  ON public.user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
`;

/**
 * Create the streaks table if it doesn't exist
 */
export const createStreaksTable = `
-- Create streaks table
CREATE TABLE IF NOT EXISTS public.streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id)
);

-- Set up RLS (Row Level Security)
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to select their own streaks
CREATE POLICY "Allow users to select their own streaks"
  ON public.streaks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own streaks
CREATE POLICY "Allow users to insert their own streaks"
  ON public.streaks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own streaks
CREATE POLICY "Allow users to update their own streaks"
  ON public.streaks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
`;

/**
 * Create the sprints table if it doesn't exist
 */
export const createSprintsTable = `
-- Create sprints table
CREATE TABLE IF NOT EXISTS public.sprints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  duration INTEGER DEFAULT 30,
  difficulty TEXT,
  category TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up RLS (Row Level Security)
ALTER TABLE public.sprints ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to select sprints
CREATE POLICY "Allow anyone to select sprints"
  ON public.sprints
  FOR SELECT
  TO anon, authenticated
  USING (true);
`;

/**
 * Create the challenges table if it doesn't exist
 */
export const createChallengesTable = `
-- Create challenges table
CREATE TABLE IF NOT EXISTS public.challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sprint_id UUID NOT NULL REFERENCES public.sprints(id) ON DELETE CASCADE,
  day INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(sprint_id, day)
);

-- Set up RLS (Row Level Security)
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to select challenges
CREATE POLICY "Allow anyone to select challenges"
  ON public.challenges
  FOR SELECT
  TO anon, authenticated
  USING (true);
`;

/**
 * Instructions for setting up the database
 */
export const setupInstructions = `
To set up the database tables:

1. Go to the Supabase dashboard for your project
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste each of the SQL statements from this file
5. Run the query to create the tables

Note: You may need to run each statement separately if there are any dependencies between tables.
`;

export default {
  createContactMessagesTable,
  createProblemReportsTable,
  createUserProgressTable,
  createStreaksTable,
  createSprintsTable,
  createChallengesTable,
  setupInstructions
};
