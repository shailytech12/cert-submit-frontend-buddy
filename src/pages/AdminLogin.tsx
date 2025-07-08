
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";
import { useNavigate, useLocation } from "react-router-dom";
import { adminLogin, isAdminAuthenticated } from "@/utils/adminAuth";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [form, setForm] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!form.username || !form.password) {
      toast({
        title: "Error",
        description: "Please enter your admin credentials.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const success = adminLogin(form.username, form.password);
    
    if (success) {
      toast({
        title: "Success",
        description: "Admin login successful!",
      });
      const redirectPath = location.state?.from?.pathname || "/admin/dashboard";
      navigate(redirectPath, { replace: true });
    } else {
      toast({
        title: "Error",
        description: "Invalid admin credentials.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  // If admin is already authenticated, redirect to admin dashboard
  if (isAdminAuthenticated()) {
    navigate("/admin/dashboard", { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-sm w-full">
        <div className="mb-8 text-center">
          <Logo className="mx-auto mb-6" />
          <h1 className="text-2xl font-bold">Admin Portal</h1>
          <p className="text-muted-foreground">Sign in to access admin panel</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter your admin credentials to continue
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  value={form.username} 
                  onChange={handleChange} 
                  placeholder="admin" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={form.password} 
                  onChange={handleChange}
                  placeholder="Enter admin password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-maroon-700 hover:bg-maroon-800" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
