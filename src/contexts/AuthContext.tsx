import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_emoji: string;
  courses_completed: number;
  total_coins: number;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Pick<Profile, 'display_name' | 'avatar_emoji'>>) => Promise<void>;
  addCoinsServer: (delta: number) => Promise<void>;
  incrementCoursesCompleted: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string, fallbackDisplayName?: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (data) {
      setProfile(data as Profile);
      return;
    }

    const { data: createdProfile } = await supabase
      .from('profiles')
      .insert({
        user_id: userId,
        display_name: fallbackDisplayName || 'Space Explorer',
        avatar_emoji: '🚀',
      })
      .select()
      .maybeSingle();

    if (createdProfile) setProfile(createdProfile as Profile);
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const fallbackName =
          typeof session.user.user_metadata?.display_name === 'string'
            ? session.user.user_metadata.display_name
            : 'Space Explorer';

        setTimeout(() => {
          void fetchProfile(session.user.id, fallbackName);
        }, 0);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const fallbackName =
          typeof session.user.user_metadata?.display_name === 'string'
            ? session.user.user_metadata.display_name
            : 'Space Explorer';

        void fetchProfile(session.user.id, fallbackName);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const cleanedDisplayName = displayName.trim() || 'Space Explorer';

    const { error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: { display_name: cleanedDisplayName },
        emailRedirectTo: window.location.origin,
      },
    });

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const { error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Pick<Profile, 'display_name' | 'avatar_emoji'>>) => {
    if (!user) return;
    await supabase.from('profiles').update(updates).eq('user_id', user.id);
    if (profile) setProfile({ ...profile, ...updates });
  };

  const addCoinsServer = async (delta: number) => {
    if (!user) return;
    const safe = Math.max(1, Math.min(500, Math.floor(delta)));
    const { data, error } = await supabase.rpc('add_coins', { delta: safe });
    if (!error && profile && typeof data === 'number') {
      setProfile({ ...profile, total_coins: data });
    }
  };

  const incrementCoursesCompleted = async () => {
    if (!user) return;
    const { data, error } = await supabase.rpc('increment_courses_completed');
    if (!error && profile && typeof data === 'number') {
      setProfile({ ...profile, courses_completed: data });
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signUp, signIn, signOut, updateProfile, addCoinsServer, incrementCoursesCompleted }}>
      {children}
    </AuthContext.Provider>
  );
};
