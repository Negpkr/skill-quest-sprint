import { supabase } from "@/integrations/supabase/client";

/**
 * Run SQL commands to create tables
 */
export const runSqlCommands = async () => {
  try {
    console.log("Running SQL commands to create tables...");
    
    // Create sprints table
    const createSprintsTable = `
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
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policy 
          WHERE polname = 'Allow anyone to select sprints' 
          AND polrelid = 'public.sprints'::regclass
        ) THEN
          CREATE POLICY "Allow anyone to select sprints"
            ON public.sprints
            FOR SELECT
            TO anon, authenticated
            USING (true);
        END IF;
      END
      $$;
    `;
    
    // Create challenges table
    const createChallengesTable = `
      CREATE TABLE IF NOT EXISTS public.challenges (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        sprint_id UUID NOT NULL,
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
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policy 
          WHERE polname = 'Allow anyone to select challenges' 
          AND polrelid = 'public.challenges'::regclass
        ) THEN
          CREATE POLICY "Allow anyone to select challenges"
            ON public.challenges
            FOR SELECT
            TO anon, authenticated
            USING (true);
        END IF;
      END
      $$;
    `;
    
    // Create user_progress table
    const createUserProgressTable = `
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
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policy 
          WHERE polname = 'Allow users to select their own progress' 
          AND polrelid = 'public.user_progress'::regclass
        ) THEN
          CREATE POLICY "Allow users to select their own progress"
            ON public.user_progress
            FOR SELECT
            TO authenticated
            USING (auth.uid() = user_id);
        END IF;
      END
      $$;
      
      -- Create policy to allow users to insert their own progress
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policy 
          WHERE polname = 'Allow users to insert their own progress' 
          AND polrelid = 'public.user_progress'::regclass
        ) THEN
          CREATE POLICY "Allow users to insert their own progress"
            ON public.user_progress
            FOR INSERT
            TO authenticated
            WITH CHECK (auth.uid() = user_id);
        END IF;
      END
      $$;
      
      -- Create policy to allow users to update their own progress
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policy 
          WHERE polname = 'Allow users to update their own progress' 
          AND polrelid = 'public.user_progress'::regclass
        ) THEN
          CREATE POLICY "Allow users to update their own progress"
            ON public.user_progress
            FOR UPDATE
            TO authenticated
            USING (auth.uid() = user_id)
            WITH CHECK (auth.uid() = user_id);
        END IF;
      END
      $$;
    `;
    
    // Create streaks table
    const createStreaksTable = `
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
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policy 
          WHERE polname = 'Allow users to select their own streaks' 
          AND polrelid = 'public.streaks'::regclass
        ) THEN
          CREATE POLICY "Allow users to select their own streaks"
            ON public.streaks
            FOR SELECT
            TO authenticated
            USING (auth.uid() = user_id);
        END IF;
      END
      $$;
      
      -- Create policy to allow users to insert their own streaks
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policy 
          WHERE polname = 'Allow users to insert their own streaks' 
          AND polrelid = 'public.streaks'::regclass
        ) THEN
          CREATE POLICY "Allow users to insert their own streaks"
            ON public.streaks
            FOR INSERT
            TO authenticated
            WITH CHECK (auth.uid() = user_id);
        END IF;
      END
      $$;
      
      -- Create policy to allow users to update their own streaks
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policy 
          WHERE polname = 'Allow users to update their own streaks' 
          AND polrelid = 'public.streaks'::regclass
        ) THEN
          CREATE POLICY "Allow users to update their own streaks"
            ON public.streaks
            FOR UPDATE
            TO authenticated
            USING (auth.uid() = user_id)
            WITH CHECK (auth.uid() = user_id);
        END IF;
      END
      $$;
    `;
    
    // Create contact_messages table
    const createContactMessagesTable = `
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
      
      -- Create policy to allow anyone to insert
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policy 
          WHERE polname = 'Allow anyone to insert contact messages' 
          AND polrelid = 'public.contact_messages'::regclass
        ) THEN
          CREATE POLICY "Allow anyone to insert contact messages"
            ON public.contact_messages
            FOR INSERT
            TO anon, authenticated
            WITH CHECK (true);
        END IF;
      END
      $$;
    `;
    
    // Create problem_reports table
    const createProblemReportsTable = `
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
      
      -- Create policy to allow anyone to insert
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_policy 
          WHERE polname = 'Allow anyone to insert problem reports' 
          AND polrelid = 'public.problem_reports'::regclass
        ) THEN
          CREATE POLICY "Allow anyone to insert problem reports"
            ON public.problem_reports
            FOR INSERT
            TO anon, authenticated
            WITH CHECK (true);
        END IF;
      END
      $$;
    `;
    
    // Execute SQL commands
    const tables = [
      { name: 'sprints', sql: createSprintsTable },
      { name: 'challenges', sql: createChallengesTable },
      { name: 'user_progress', sql: createUserProgressTable },
      { name: 'streaks', sql: createStreaksTable },
      { name: 'contact_messages', sql: createContactMessagesTable },
      { name: 'problem_reports', sql: createProblemReportsTable }
    ];
    
    const results = {};
    
    for (const table of tables) {
      try {
        console.log(`Creating table: ${table.name}`);
        const { error } = await supabase.rpc('exec_sql', { sql_query: table.sql });
        
        if (error) {
          console.error(`Error creating ${table.name} table:`, error);
          results[table.name] = { success: false, error };
        } else {
          console.log(`Successfully created ${table.name} table`);
          results[table.name] = { success: true };
        }
      } catch (err) {
        console.error(`Exception creating ${table.name} table:`, err);
        results[table.name] = { success: false, error: err };
      }
    }
    
    return { success: true, results };
  } catch (error) {
    console.error("Error running SQL commands:", error);
    return { success: false, error };
  }
};

// Export a function that can be called from the browser console
(window as any).runSqlSetup = runSqlCommands;

export default {
  runSqlCommands
};
