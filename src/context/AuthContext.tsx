import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  provider?: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
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
      const parsedUser = JSON.parse(storedUser);
      // Don't include password in the user state
      const { password, ...userWithoutPassword } = parsedUser;
      setUser(userWithoutPassword);
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]") as StoredUser[];
      if (existingUsers.some(u => u.email === email)) {
        throw new Error("User with this email already exists");
      }

      // Create new user
      const newUser: StoredUser = {
        id: `user_${Math.random().toString(36).substring(2, 9)}`,
        name,
        email,
        password, // Store password for validation
        provider: "email"
      };
      
      // Save to users list
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Don't include password in the user state
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
    } catch (error) {
      console.error("Sign up failed:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Get users from storage
      const users = JSON.parse(localStorage.getItem("users") || "[]") as StoredUser[];
      
      // Find user and validate password
      const user = users.find(u => u.email === email);
      if (!user || user.password !== password) {
        throw new Error("Invalid email or password");
      }

      // Don't include password in the user state
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
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

  const updateUserProfile = async (data: Partial<User>) => {
    if (!user) {
      throw new Error("No user is signed in");
    }

    try {
      // Get users from storage
      const users = JSON.parse(localStorage.getItem("users") || "[]") as StoredUser[];
      
      // Update user in users list
      const userIndex = users.findIndex(u => u.email === user.email);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...data };
        localStorage.setItem("users", JSON.stringify(users));
      }

      // Update current user state
      const updatedUser = { ...user, ...data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Profile update failed:", error);
      throw error;
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    if (!user) {
      throw new Error("No user is signed in");
    }

    try {
      // Get users from storage
      const users = JSON.parse(localStorage.getItem("users") || "[]") as StoredUser[];
      
      // Find user and verify current password
      const userIndex = users.findIndex(u => u.email === user.email);
      if (userIndex === -1 || users[userIndex].password !== currentPassword) {
        throw new Error("Current password is incorrect");
      }

      // Update password
      users[userIndex].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));
    } catch (error) {
      console.error("Password update failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signUp, 
      signIn, 
      signInWithGoogle, 
      signOut,
      updateUserProfile,
      updatePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}
