
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login, signUp, getSession } from "@/utils/auth";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        
        if (session) {
          // User is authenticated, redirect to dashboard
          const redirectPath = location.state?.from?.pathname || "/dashboard";
          navigate(redirectPath, { replace: true });
        }
      }
    );

    // THEN check for existing session
    getSession().then((session) => {
      setSession(session);
      if (session) {
        const redirectPath = location.state?.from?.pathname || "/dashboard";
        navigate(redirectPath, { replace: true });
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      if (isSignUp) {
        const { data, error } = await signUp(form.email, form.password);
        if (error) {
          if (error.message.includes("already registered")) {
            setError("This email is already registered. Try signing in instead.");
          } else {
            setError(error.message);
          }
        } else if (data.user && !data.session) {
          setError("Please check your email to confirm your account before signing in.");
        }
      } else {
        const { data, error } = await login(form.email, form.password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            setError("Invalid email or password. Please try again.");
          } else {
            setError(error.message);
          }
        }
        // Success is handled by the auth state listener
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error('Auth error:', err);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-maroon-700 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-sm w-full">
        <div className="mb-8 text-center">
          <Logo className="mx-auto mb-6" />
          <h1 className="text-2xl font-bold">
            {isSignUp ? "Create Account" : "Welcome back"}
          </h1>
          <p className="text-muted-foreground">
            {isSignUp ? "Sign up for your account" : "Sign in to your account"}
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{isSignUp ? "Sign Up" : "Sign In"}</CardTitle>
            <CardDescription>
              {isSignUp 
                ? "Create your university account to get started" 
                : "Enter your university credentials to continue"
              }
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  placeholder="student@university.edu" 
                  type="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {!isSignUp && (
                    <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={form.password} 
                  onChange={handleChange}
                  placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                  required
                />
              </div>
              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded border">
                  {error}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full bg-maroon-700 hover:bg-maroon-800" type="submit">
                {isSignUp ? "Create Account" : "Sign In"}
              </Button>
              <p className="mt-4 text-center text-sm">
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError("");
                  }}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {isSignUp ? "Sign in" : "Sign up"}
                </button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
