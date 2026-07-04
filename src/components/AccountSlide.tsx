import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Rocket, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const ACCOUNT_ICONS = [
  '🚀', '🌟', '🪐', '🌙', '☄️', '🛸', '👽', '🌌', '🔭', '⭐',
  '🌍', '🌎', '🌏', '☀️', '🌕', '🌑', '💫', '✨', '🛰️', '🌠',
  '🎆', '🎇', '🔮', '💎', '🎯',
];

const MAINTENANCE_PERIOD_DAYS = 90;

interface AccountData {
  id?: string;
  name: string;
  icon: string;
  email?: string;
  password?: string;
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
  const [icon, setIcon] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('spaceAccount');
    if (saved) {
      try {
        setExisting(JSON.parse(saved) as AccountData);
      } catch {}
    }
  }, []);

  const handleCreate = () => {
    if (!name.trim()) {
      toast({ title: 'Enter your Space ID', variant: 'destructive' });
      return;
    }
    if (!icon) {
      toast({ title: 'Pick an icon', variant: 'destructive' });
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({ title: 'Enter a valid email', variant: 'destructive' });
      return;
    }
    if (password.length < 6) {
      toast({ title: 'Password must be at least 6 characters', variant: 'destructive' });
      return;
    }

    const now = new Date();
    const account: AccountData = {
      id: newId(),
      name: name.trim(),
      icon,
      email: email.trim().toLowerCase(),
      password,
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="explorer@space.com"
              className="bg-slate-800/60 border-purple-500/30 text-white placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="text-sm text-purple-300 mb-1 flex items-center gap-2"><Lock className="w-4 h-4" /> Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              minLength={6}
              className="bg-slate-800/60 border-purple-500/30 text-white placeholder:text-white/40"
            />
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
