import React from 'react';
import Layout from '../components/Layout';
import SupabaseTest from '../components/SupabaseTest';

const SupabaseTestPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Supabase Connection Test</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Use this page to test the connection to Supabase and diagnose any issues.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <SupabaseTest />
        
        <div className="mt-12 bg-white p-8 rounded-lg border">
          <h2 className="text-2xl font-bold mb-6">Supabase Setup Instructions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">1. Check Your Environment Variables</h3>
              <p className="text-muted-foreground mb-2">
                Make sure your Supabase URL and API key are correctly set in your environment variables.
              </p>
              <div className="bg-secondary p-4 rounded-md">
                <pre className="text-xs">
                  {`VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key`}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">2. Create Required Tables</h3>
              <p className="text-muted-foreground mb-2">
                Make sure the following tables exist in your Supabase database:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>sprints</li>
                <li>challenges</li>
                <li>user_progress</li>
                <li>streaks</li>
                <li>contact_messages</li>
                <li>problem_reports</li>
              </ul>
              <p className="text-muted-foreground mt-2">
                You can find the SQL to create these tables in <code>src/utils/supabaseSetup.ts</code>.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">3. Check Row Level Security (RLS) Policies</h3>
              <p className="text-muted-foreground mb-2">
                Make sure you have the correct RLS policies set up for each table.
              </p>
              <p className="text-muted-foreground">
                The SQL in <code>src/utils/supabaseSetup.ts</code> includes the necessary RLS policies.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">4. Test Authentication</h3>
              <p className="text-muted-foreground">
                Make sure you're logged in to test features that require authentication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupabaseTestPage;
