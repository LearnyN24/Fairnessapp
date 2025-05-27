import { useState } from "react";
import { Mail, Check, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

interface SignUpProps {
  onSignIn?: () => void;
}

interface PasswordRequirement {
  text: string;
  validator: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    text: "At least 8 characters long",
    validator: (password) => password.length >= 8,
  },
  {
    text: "Contains at least one uppercase letter",
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    text: "Contains at least one lowercase letter",
    validator: (password) => /[a-z]/.test(password),
  },
  {
    text: "Contains at least one number",
    validator: (password) => /[0-9]/.test(password),
  },
  {
    text: "Contains at least one special character",
    validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

const SignUp = ({ onSignIn }: SignUpProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validatePassword = (password: string): boolean => {
    return passwordRequirements.every((requirement) => requirement.validator(password));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    if (!validatePassword(password)) {
      toast({
        title: "Password Requirements",
        description: "Please ensure your password meets all requirements",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      await signUp(email, password, name);
      toast({
        title: "Registration Successful!",
        description: "Your account has been created. Please sign in to continue."
      });
      // Clear the form
      setName("");
      setEmail("");
      setPassword("");
      // Redirect to sign in page
      navigate("/signin");
    } catch (error) {
      toast({
        title: "Sign Up Failed",
        description: "There was a problem creating your account.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      toast({
        title: "Success!",
        description: "You've successfully signed in with Google."
      });
    } catch (error) {
      toast({
        title: "Google Sign In Failed",
        description: "There was a problem signing in with Google.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>Enter your details to create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <div className="mt-2 space-y-2">
              <p className="text-sm font-medium">Password Requirements:</p>
              <ul className="space-y-1">
                {passwordRequirements.map((requirement, index) => {
                  const isMet = requirement.validator(password);
                  return (
                    <li key={index} className="flex items-center text-sm">
                      {isMet ? (
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <X className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      <span className={isMet ? "text-green-500" : "text-red-500"}>
                        {requirement.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleGoogleSignIn} 
          disabled={isLoading}
        >
          <Mail className="mr-2 h-4 w-4" /> Google
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
