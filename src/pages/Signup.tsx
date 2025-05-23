
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkUser();
  }, [navigate]);

  const handleEmailSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    
    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          },
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sign up successful",
          description: "Please check your email to confirm your account.",
          duration: 5000,
        });
        navigate("/login");
      }
    } catch (err) {
      toast({
        title: "An unexpected error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        toast({
          title: "Google sign up failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "An unexpected error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
      console.error("Google signup error:", err);
    }
  };

  const handleGithubSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        toast({
          title: "GitHub sign up failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "An unexpected error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
      console.error("GitHub signup error:", err);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-skillpurple-400 rounded-2xl flex items-center justify-center shadow-lg">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                  stroke="white" 
                  strokeWidth="2"
                />
                <path 
                  d="M12 8V12L14 14" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-bold">Sign up for SkillSprint</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Start your 30-day skill and side hustle journey
            </p>
          </div>
          
          <div className="mt-8">
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center space-x-2 py-5"
                onClick={handleGoogleSignup}
                disabled={loading}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Sign up with Google</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center space-x-2 py-5"
                onClick={handleGithubSignup}
                disabled={loading}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" fill="#000"/>
                </svg>
                <span>Sign up with GitHub</span>
              </Button>
            </div>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>
              
              <form className="mt-6 space-y-6" onSubmit={handleEmailSignup}>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password" 
                    required 
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Password must be at least 6 characters
                  </p>
                </div>

                <div>
                  <Button 
                    type="submit" 
                    className="w-full bg-skillpurple-400 hover:bg-skillpurple-500"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Sign up"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="text-sm text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-skillpurple-500 hover:text-skillpurple-600">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
