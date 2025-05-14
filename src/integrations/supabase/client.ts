// Supabase client configuration
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Get environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://qawwfkjsxcneenctndtm.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhd3dma2pzeGNuZWVuY3RuZHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MzAzMzIsImV4cCI6MjA2MjEwNjMzMn0.QOFfmkaZVtWBDlVbhPbYKb4Dio94XAyOd-D8JpS2KXg";

// Log the Supabase configuration for debugging
console.log("Supabase URL:", SUPABASE_URL);
console.log("Supabase Key exists:", !!SUPABASE_ANON_KEY);

// Additional options for the Supabase client
const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js/2.0.0',
    },
  },
};

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, options);

// Test the connection immediately
(async () => {
  try {
    console.log("Testing Supabase connection...");
    const { data, error } = await supabase.from('sprints').select('*').limit(1);

    if (error) {
      console.error("Supabase connection test failed:", error);
    } else {
      console.log("Supabase connection test successful:", data);
    }
  } catch (err) {
    console.error("Exception during Supabase connection test:", err);
  }
})();