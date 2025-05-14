# Supabase Setup Instructions

This document provides instructions on how to set up the Supabase database for the SkillQuest application.

## Prerequisites

1. A Supabase account
2. A Supabase project

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign in or create an account
2. Create a new project
3. Note down your project URL and anon key

### 2. Set Environment Variables

Create a `.env` file in the root of your project with the following variables:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Replace `your-supabase-url` and `your-supabase-anon-key` with your actual Supabase project URL and anon key.

### 3. Create Database Tables

There are two ways to create the necessary tables:

#### Option 1: Using the SQL Editor in Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the SQL from `supabase/migrations/create_tables.sql`
4. Paste it into the SQL Editor and run it

#### Option 2: Using Supabase CLI

If you have the Supabase CLI installed, you can run:

```bash
supabase db push
```

This will apply the migrations in the `supabase/migrations` directory.

### 4. Verify Setup

1. Go to the SkillQuest application
2. Navigate to `/supabase-test`
3. Click "Test Connection" to verify that the connection to Supabase is working
4. Verify that all required tables exist

## Required Tables

The following tables are required for the application to function properly:

1. `sprints` - Stores information about skill sprints
2. `challenges` - Stores daily challenges for each sprint
3. `user_progress` - Tracks user progress through sprints
4. `streaks` - Tracks user streaks
5. `contact_messages` - Stores contact form submissions
6. `problem_reports` - Stores problem reports

## Troubleshooting

### Connection Issues

- Verify that your environment variables are set correctly
- Check that your Supabase project is active
- Ensure that your IP is not blocked by Supabase

### Missing Tables

- Run the SQL in `supabase/migrations/create_tables.sql` again
- Check for any errors in the SQL Editor

### RLS Policy Issues

- Verify that the Row Level Security (RLS) policies are set up correctly
- Ensure that you're authenticated when trying to access protected resources

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase CLI](https://supabase.com/docs/reference/cli/introduction)
