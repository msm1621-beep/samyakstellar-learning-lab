import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Rocket, Mail, User as UserIcon, ArrowRight, ShieldCheck, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { lovable } from '@/integrations/lovable/index';

const ACCOUNT_ICONS = [
  '🚀', '🌟', '🪐', '🌙', '☄️', '🛸', '👽', '🌌', '🔭', '⭐',
  '🌍', '🌎', '🌏', '☀️', '🌕', '🌑', '💫', '✨', '🛰️', '🌠',
  '🎆', '🎇', '🔮', '💎', '🎯',
];

const MAINTENANCE_PERIOD_DAYS = 90;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface AccountData {
  id?: string;
  name: string;
  icon: string;
  email?: string;
  isGuest: boolean;
  createdAt: string;
  lastMaintenanceAt: string;
  maintenanceExpiresAt: string;
}

const newId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

interface Props {
  onComplete: () => void;
}

const AccountSlide = ({ onComplete }: Props) => {
  const [existing, setExisting] = useState<AccountData | null>(null);
  const [name, setName] = useState('');
  const [customId, setCustomId] = useState('');
  const [idError, setIdError] = useState<string | null>(null);
  const [icon, setIcon] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let unsub: (() => void) | undefined;

    const cleanOAuthParams = () => {
      try {
        const url = new URL(window.location.href);
        const dirty = ['code', 'access_token', 'refresh_token', 'error_description', 'provider_token'].some(
          (k) => url.searchParams.has(k) || url.hash.includes(k)
        );
        if (dirty) {
          window.history.replaceState({}, '', url.origin + url.pathname);
        }
      } catch {}
    };

    const provisionFromSession = (session: any) => {
      if (cancelled || !session?.user) return;
      const now = new Date();
      const meta: any = session.user.user_metadata || {};
      const googleName = meta.display_name || meta.full_name || meta.name || 'Space Explorer';
      const googleEmail = session.user.email?.toLowerCase();

      let account: AccountData;
      const saved = localStorage.getItem('spaceAccount');
      if (saved) {
        // Merge Google identity into an existing local account instead of overwriting progress
        try {
          const prev = JSON.parse(saved) as AccountData;
          account = {
            ...prev,
            name: prev.isGuest || !prev.name ? googleName : prev.name,
            email: googleEmail || prev.email,
            isGuest: false,
            lastMaintenanceAt: prev.lastMaintenanceAt || now.toISOString(),
            maintenanceExpiresAt:
              prev.maintenanceExpiresAt ||
              new Date(now.getTime() + MAINTENANCE_PERIOD_DAYS * 86400000).toISOString(),
          };
        } catch {
          return;
        }
      } else {
        account = {
          id: newId(),
          name: googleName,
          icon: '🚀',
          email: googleEmail,
          isGuest: false,
          createdAt: now.toISOString(),
          lastMaintenanceAt: now.toISOString(),
          maintenanceExpiresAt: new Date(now.getTime() + MAINTENANCE_PERIOD_DAYS * 86400000).toISOString(),
        };
      }

      localStorage.setItem('spaceAccount', JSON.stringify(account));
      cleanOAuthParams();
      toast({ title: `Welcome, ${account.name}! 🚀`, description: 'Signed in and synced to your account.' });
      onComplete();
    };

    const saved = localStorage.getItem('spaceAccount');
    if (saved) {
      try {
        setExisting(JSON.parse(saved) as AccountData);
      } catch {}
    }

    // Handle the OAuth return: the session can land slightly after mount, so listen as well as poll.
    (async () => {
      try {
        const { supabase } = await import('@/integrations/supabase/client');

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
          if (session?.user && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED')) {
            provisionFromSession(session);
          }
        });
        unsub = () => subscription.unsubscribe();

        const { data } = await supabase.auth.getSession();
        if (data?.session?.user) provisionFromSession(data.session);
      } catch {}
    })();

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, [onComplete]);

  const validateEmail = (value: string): string | null => {
    const v = value.trim();
    if (!v) return 'Please enter your email address';
    if (!EMAIL_RE.test(v)) return 'That email address looks invalid — try again or continue with Google';
    return null;
  };

  const ID_RE = /^[a-zA-Z0-9_-]{3,32}$/;
  const validateId = (value: string): string | null => {
    const v = value.trim();
    if (!v) return null; // optional
    if (!ID_RE.test(v)) return 'ID must be 3–32 characters and only contain letters, numbers, underscores, or dashes';
    return null;
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError(validateEmail(value));
  };

  const handleIdChange = (value: string) => {
    setCustomId(value);
    if (idError) setIdError(validateId(value));
  };

  const handleCreate = () => {
    if (!name.trim()) {
      toast({ title: 'Enter your Space ID', variant: 'destructive' });
      return;
    }
    if (!icon) {
      toast({ title: 'Pick an icon', variant: 'destructive' });
      return;
    }
    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }
    const idErr = validateId(customId);
    if (idErr) {
      setIdError(idErr);
      return;
    }

    const now = new Date();
    const account: AccountData = {
      id: customId.trim() || newId(),
      name: name.trim(),
      icon,
      email: email.trim().toLowerCase(),
      isGuest: false,
      createdAt: now.toISOString(),
      lastMaintenanceAt: now.toISOString(),
      maintenanceExpiresAt: new Date(now.getTime() + MAINTENANCE_PERIOD_DAYS * 86400000).toISOString(),
    };

    localStorage.setItem('spaceAccount', JSON.stringify(account));
    toast({ title: `Welcome, ${account.name}! 🎉`, description: 'Your explorer account is ready.' });
    onComplete();
  };

  const handleGuest = () => {
    const guest: AccountData = {
      id: newId(),
      name: 'Guest Explorer',
      icon: '👤',
      isGuest: true,
      createdAt: new Date().toISOString(),
      lastMaintenanceAt: '',
      maintenanceExpiresAt: '',
    };
    localStorage.setItem('spaceAccount', JSON.stringify(guest));
    onComplete();
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth('google', {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast({ title: 'Google sign-in failed', description: (result.error as Error).message, variant: 'destructive' });
        setGoogleLoading(false);
        return;
      }
      if (result.redirected) return; // browser navigates away
      // Session set — persist a lightweight local account so returning users see welcome-back
      const now = new Date();
      const idErr = validateId(customId);
      if (idErr) {
        setIdError(idErr);
        setGoogleLoading(false);
        return;
      }
      const account: AccountData = {
        id: customId.trim() || newId(),
        name: name.trim() || 'Space Explorer',
        icon: icon || '🚀',
        email: email.trim().toLowerCase() || undefined,
        isGuest: false,
        createdAt: now.toISOString(),
        lastMaintenanceAt: now.toISOString(),
        maintenanceExpiresAt: new Date(now.getTime() + MAINTENANCE_PERIOD_DAYS * 86400000).toISOString(),
      };
      localStorage.setItem('spaceAccount', JSON.stringify(account));
      toast({ title: 'Signed in with Google 🚀' });
      onComplete();
    } catch (e) {
      toast({ title: 'Google sign-in failed', description: String(e), variant: 'destructive' });
      setGoogleLoading(false);
    }
  };

  // WELCOME BACK slide for returning users
  if (existing) {
    return (
      <div className="fixed inset-0 z-[95] flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-6 max-w-md"
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {existing.icon}
          </motion.div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-amber-300 mb-4">
            <Sparkles className="w-3 h-3" /> Welcome back
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300 text-transparent bg-clip-text mb-3">
            Hello, {existing.name}!
          </h1>
          <p className="text-white/70 mb-8">
            Your cosmic journey continues. Ready to keep exploring the universe?
          </p>
          <Button
            size="lg"
            onClick={onComplete}
            className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-amber-500 text-white shadow-[0_0_40px_hsl(var(--primary)/0.6)] hover:scale-105 transition-transform px-8 py-6 text-lg font-semibold"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Enter Stellar Learning Lab
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    );
  }

  const showGoogleFallback = !!emailError;

  // CREATE ACCOUNT slide for new users
  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950/60 to-slate-950 overflow-y-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-slate-900/80 border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-purple-500/20 backdrop-blur"
      >
        <div className="text-center mb-6">
          <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-2" />
          <h1 className="text-3xl font-display font-bold text-white mb-1">Create Your Explorer Account</h1>
          <p className="text-purple-300 text-sm">
            Unlock your journey through Stellar Learning Lab
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-purple-300 mb-1 flex items-center gap-2"><UserIcon className="w-4 h-4" /> Space ID</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your explorer name"
              maxLength={20}
              className="bg-slate-800/60 border-purple-500/30 text-white placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="text-sm text-purple-300 mb-1 flex items-center gap-2"><Mail className="w-4 h-4" /> Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={() => email && setEmailError(validateEmail(email))}
              placeholder="explorer@space.com"
              aria-invalid={!!emailError}
              className={`bg-slate-800/60 text-white placeholder:text-white/40 ${emailError ? 'border-red-500 focus-visible:ring-red-500' : 'border-purple-500/30'}`}
            />
            {emailError && (
              <p className="text-xs text-red-400 mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-purple-300 mb-1 flex items-center gap-2"><Fingerprint className="w-4 h-4" /> Account ID <span className="text-white/40 font-normal">(optional)</span></label>
            <Input
              value={customId}
              onChange={(e) => handleIdChange(e.target.value)}
              onBlur={() => customId && setIdError(validateId(customId))}
              placeholder="Create your own ID"
              maxLength={32}
              aria-invalid={!!idError}
              className={`bg-slate-800/60 text-white placeholder:text-white/40 ${idError ? 'border-red-500 focus-visible:ring-red-500' : 'border-purple-500/30'}`}
            />
            {idError ? (
              <p className="text-xs text-red-400 mt-1">{idError}</p>
            ) : (
              <p className="text-xs text-purple-300/70 mt-1">3–32 letters, numbers, dashes, or underscores. Leave blank for a random ID.</p>
            )}
          </div>

          <div>
            <label className="text-sm text-purple-300 mb-2 block">Choose Your Icon</label>
            <div className="grid grid-cols-5 gap-2 p-3 bg-slate-800/40 rounded-xl border border-purple-500/20 max-h-44 overflow-y-auto">
              {ACCOUNT_ICONS.map((emoji) => (
                <motion.button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-2xl p-2 rounded-lg transition-all ${
                    icon === emoji ? 'bg-purple-500/60 ring-2 ring-purple-400 scale-110' : 'hover:bg-purple-500/20'
                  }`}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <Button
              onClick={handleCreate}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6 text-base font-semibold"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Launch My Account
            </Button>

            <div className="flex items-center gap-3 my-3">
              <div className="h-px flex-1 bg-purple-500/20" />
              <span className="text-xs text-purple-300">or continue with</span>
              <div className="h-px flex-1 bg-purple-500/20" />
            </div>
            <Button
              onClick={handleGoogle}
              disabled={googleLoading}
              variant="outline"
              className="w-full bg-white text-slate-900 hover:bg-white/90 border-white/20 py-6 text-base font-semibold"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {googleLoading ? 'Connecting…' : 'Continue with Cosmic Classroom'}
            </Button>
            <p className="text-[11px] text-purple-300/80 text-center mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              By continuing you agree to Google's{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Privacy Policy
              </a>
            </p>

            <Button
              onClick={handleGuest}
              variant="ghost"
              className="w-full text-purple-300 hover:text-white hover:bg-purple-500/20"
            >
              Continue as Guest
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccountSlide;
