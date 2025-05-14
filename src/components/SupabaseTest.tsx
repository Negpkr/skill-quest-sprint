import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  testSupabaseConnection,
  testFetchSprints,
  testFetchChallenges,
  testFetchUserProgress
} from '@/utils/supabaseUtils';
import { checkAllTablesExist } from '@/utils/checkSupabaseTables';
import { supabase } from '@/integrations/supabase/client';

const SupabaseTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'untested' | 'success' | 'error'>('untested');
  const [sprintData, setSprintData] = useState<any>(null);
  const [challengeData, setChallengeData] = useState<any>(null);
  const [progressData, setProgressData] = useState<any>(null);
  const [tableStatus, setTableStatus] = useState<{[tableName: string]: boolean} | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get current user
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };

    getCurrentUser();
  }, []);

  const testConnection = async () => {
    setIsLoading(true);
    try {
      const result = await testSupabaseConnection();
      setConnectionStatus(result ? 'success' : 'error');

      if (result) {
        // If connection is successful, check tables
        const tables = await checkAllTablesExist();
        setTableStatus(tables);

        const missingTables = Object.entries(tables)
          .filter(([_, exists]) => !exists)
          .map(([name]) => name);

        if (missingTables.length > 0) {
          toast({
            title: 'Missing Tables',
            description: `The following tables are missing: ${missingTables.join(', ')}`,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Connection Successful',
            description: 'Successfully connected to Supabase and all required tables exist.',
          });
        }
      } else {
        toast({
          title: 'Connection Failed',
          description: 'Failed to connect to Supabase. Check console for details.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error testing connection:', error);
      setConnectionStatus('error');

      toast({
        title: 'Connection Error',
        description: 'An error occurred while testing the connection.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSprints = async () => {
    setIsLoading(true);
    try {
      const result = await testFetchSprints();

      if (result.success) {
        setSprintData(result.data);
        toast({
          title: 'Sprints Fetched',
          description: `Successfully fetched ${result.data.length} sprints.`,
        });
      } else {
        toast({
          title: 'Error Fetching Sprints',
          description: 'Failed to fetch sprints. Check console for details.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching sprints:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while fetching sprints.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChallenges = async () => {
    if (!sprintData || sprintData.length === 0) {
      toast({
        title: 'No Sprint Selected',
        description: 'Please fetch sprints first.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Use the first sprint ID
      const sprintId = sprintData[0].id;
      const result = await testFetchChallenges(sprintId);

      if (result.success) {
        setChallengeData(result.data);
        toast({
          title: 'Challenges Fetched',
          description: `Successfully fetched ${result.data.length} challenges for sprint ${sprintData[0].title}.`,
        });
      } else {
        toast({
          title: 'Error Fetching Challenges',
          description: 'Failed to fetch challenges. Check console for details.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching challenges:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while fetching challenges.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    if (!user) {
      toast({
        title: 'Not Logged In',
        description: 'You must be logged in to fetch user progress.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await testFetchUserProgress(user.id);

      if (result.success) {
        setProgressData(result.data);
        toast({
          title: 'User Progress Fetched',
          description: `Successfully fetched user progress data.`,
        });
      } else {
        toast({
          title: 'Error Fetching User Progress',
          description: 'Failed to fetch user progress. Check console for details.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while fetching user progress.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Supabase Connection Test</CardTitle>
        <CardDescription>
          Test the connection to your Supabase database and fetch data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Connection Status:</span>
          {connectionStatus === 'untested' && (
            <Badge variant="outline">Not Tested</Badge>
          )}
          {connectionStatus === 'success' && (
            <Badge variant="success" className="bg-green-500 text-white">Connected</Badge>
          )}
          {connectionStatus === 'error' && (
            <Badge variant="destructive">Connection Failed</Badge>
          )}
        </div>

        {tableStatus && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Table Status</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(tableStatus).map(([tableName, exists]) => (
                <div key={tableName} className="flex items-center justify-between p-2 border rounded">
                  <span>{tableName}</span>
                  {exists ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {sprintData && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Sprint Data</h3>
            <div className="bg-secondary p-4 rounded-md overflow-auto max-h-40">
              <pre className="text-xs">{JSON.stringify(sprintData, null, 2)}</pre>
            </div>
          </div>
        )}

        {challengeData && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Challenge Data</h3>
            <div className="bg-secondary p-4 rounded-md overflow-auto max-h-40">
              <pre className="text-xs">{JSON.stringify(challengeData, null, 2)}</pre>
            </div>
          </div>
        )}

        {progressData && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">User Progress Data</h3>
            <div className="bg-secondary p-4 rounded-md overflow-auto max-h-40">
              <pre className="text-xs">{JSON.stringify(progressData, null, 2)}</pre>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button
          onClick={testConnection}
          disabled={isLoading}
          className="bg-skillpurple-400 hover:bg-skillpurple-500"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            'Test Connection'
          )}
        </Button>

        <Button
          onClick={fetchSprints}
          disabled={isLoading || connectionStatus !== 'success'}
          variant="outline"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Fetching...
            </>
          ) : (
            'Fetch Sprints'
          )}
        </Button>

        <Button
          onClick={fetchChallenges}
          disabled={isLoading || !sprintData}
          variant="outline"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Fetching...
            </>
          ) : (
            'Fetch Challenges'
          )}
        </Button>

        <Button
          onClick={fetchUserProgress}
          disabled={isLoading || !user}
          variant="outline"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Fetching...
            </>
          ) : (
            'Fetch User Progress'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupabaseTest;
