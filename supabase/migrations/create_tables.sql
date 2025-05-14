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

-- Create policy to allow anyone to insert (for anonymous users)
CREATE POLICY "Allow anyone to insert contact messages"
  ON public.contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow admins to select all contact messages
CREATE POLICY "Allow admins to select all contact messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ? 'admin');

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

-- Create policy to allow anyone to insert (for anonymous users)
CREATE POLICY "Allow anyone to insert problem reports"
  ON public.problem_reports
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow admins to select all problem reports
CREATE POLICY "Allow admins to select all problem reports"
  ON public.problem_reports
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ? 'admin');

-- Create sprints table if it doesn't exist
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

-- Create policy to allow anyone to select sprints
CREATE POLICY "Allow anyone to select sprints"
  ON public.sprints
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create challenges table if it doesn't exist
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

-- Create policy to allow anyone to select challenges
CREATE POLICY "Allow anyone to select challenges"
  ON public.challenges
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create user_progress table if it doesn't exist
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

-- Create streaks table if it doesn't exist
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

-- Create sample data for sprints
INSERT INTO public.sprints (title, slug, description, duration, difficulty, category, cover_image)
VALUES
  ('Design Starter', 'design-starter', 'Learn the basics of design in 30 days', 30, 'beginner', 'design', 'https://images.unsplash.com/photo-1561070791-2526d30994b5'),
  ('Frontend Fundamentals', 'frontend-fundamentals', 'Master HTML, CSS and JavaScript', 30, 'beginner', 'development', 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613'),
  ('Backend Basics', 'backend-basics', 'Learn server-side programming', 30, 'intermediate', 'development', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c')
ON CONFLICT (slug) DO NOTHING;

-- Create sample data for challenges
INSERT INTO public.challenges (sprint_id, day, title, description, content)
SELECT 
  id, 
  1, 
  'Introduction to Design Principles', 
  'Learn the fundamental principles of design',
  '# Introduction to Design Principles\n\nIn this challenge, you will learn about the basic principles of design including balance, contrast, and hierarchy.'
FROM public.sprints WHERE slug = 'design-starter'
ON CONFLICT (sprint_id, day) DO NOTHING;

INSERT INTO public.challenges (sprint_id, day, title, description, content)
SELECT 
  id, 
  2, 
  'Color Theory Basics', 
  'Understand how colors work together',
  '# Color Theory Basics\n\nIn this challenge, you will learn about color wheels, color harmony, and how to create effective color palettes.'
FROM public.sprints WHERE slug = 'design-starter'
ON CONFLICT (sprint_id, day) DO NOTHING;

INSERT INTO public.challenges (sprint_id, day, title, description, content)
SELECT 
  id, 
  3, 
  'Typography Fundamentals', 
  'Learn how to use typography effectively',
  '# Typography Fundamentals\n\nIn this challenge, you will learn about font families, font pairing, and how to create readable text layouts.'
FROM public.sprints WHERE slug = 'design-starter'
ON CONFLICT (sprint_id, day) DO NOTHING;
