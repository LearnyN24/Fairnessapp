
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  provider?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading the user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Simulate API call
      const newUser: User = {
        id: `user_${Math.random().toString(36).substring(2, 9)}`,
        name,
        email,
        provider: "email"
      };
      
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error("Sign up failed:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Simulate API call
      const user: User = {
        id: `user_${Math.random().toString(36).substring(2, 9)}`,
        name: email.split('@')[0],
        email,
        provider: "email"
      };
      
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Sign in failed:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Simulate Google sign-in
      const user: User = {
        id: `google_${Math.random().toString(36).substring(2, 9)}`,
        name: "Google User",
        email: "user@gmail.com",
        photoURL: "https://lh3.googleusercontent.com/a/default-user",
        provider: "google"
      };
      
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Google sign in failed:", error);
      throw error;
    }
  };

  const signOut = async () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
