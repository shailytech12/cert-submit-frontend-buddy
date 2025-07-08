
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login, isAuthenticated } from "@/utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status and redirect if needed
    const checkAuth = () => {
      if (isAuthenticated()) {
        navigate("/dashboard", { replace: true });
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please enter your credentials.");
      return;
    }
    login();
    // After mock login, redirect to intended page or dashboard.
    const redirectPath = location.state?.from?.pathname || "/dashboard";
    navigate(redirectPath, { replace: true });
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
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your university credentials to continue
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Student ID</Label>
                <Input 
                  id="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  placeholder="student@university.edu" 
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={form.password} 
                  onChange={handleChange}
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full bg-maroon-700 hover:bg-maroon-800" type="submit">
                Sign In
              </Button>
              <p className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
