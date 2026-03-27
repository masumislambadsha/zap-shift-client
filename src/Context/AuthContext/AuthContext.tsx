import { createContext } from "react";
import { User } from "firebase/auth";

interface AuthInfo {
  user: User | null;
  loading: boolean;
  registerUser: (email: string, password: string) => Promise<any>;
  signInUser: (email: string, password: string) => Promise<any>;
  signInGoogle: () => Promise<any>;
  logOut: () => Promise<void>;
  updateUserProfile: (profile: {
    displayName?: string;
    photoURL?: string;
  }) => Promise<void>;
}

export const AuthContext = createContext<AuthInfo | null>(null);
