import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn, UserPlus, Rocket, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const resetFields = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setConfirmPassword('');
    setLoading(false);
  };

  const handleClose = () => {
    resetFields();
    onClose();
  };

  const toggleMode = () => {
    setMode((current) => (current === 'login' ? 'signup' : 'login'));
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    if (mode === 'login') {
      const { error } = await signIn(normalizedEmail, password);

      if (error) {
        const isInvalidCredentials = /invalid login credentials/i.test(error.message || '');

        toast({
          title: '❌ Login failed',
          description: isInvalidCredentials
            ? 'No matching account was found yet. Create an account first, verify your email, then sign in with the same password.'
            : error.message,
          variant: 'destructive',
        });
      } else {
        toast({ title: '🚀 Welcome back, explorer!' });
        handleClose();
      }
    } else {
      if (password !== confirmPassword) {
        toast({
          title: '❌ Passwords do not match',
          description: 'Please make sure both password fields are identical.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      const { error } = await signUp(normalizedEmail, password, displayName || 'Space Explorer');

      if (error) {
        toast({ title: '❌ Signup failed', description: error.message, variant: 'destructive' });
      } else {
        toast({
          title: '📧 Check your email!',
          description: 'Your account was created. Verify your email first, then sign in with the same password.',
        });
        setMode('login');
        setPassword('');
        setConfirmPassword('');
      }
    }

    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass-card rounded-2xl p-6 w-full max-w-md relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <Rocket className="w-10 h-10 text-primary mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-foreground">
                {mode === 'login' ? 'Welcome Back' : 'Create Your Explorer Account'}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {mode === 'login'
                  ? 'Use the same email and password you created during sign up.'
                  : 'Create your login to unlock saved progress and appear on the leaderboard.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Display Name</label>
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Space Explorer"
                    className="bg-muted/30 border-border"
                  />
                </div>
              )}

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="explorer@space.com"
                  className="bg-muted/30 border-border"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  {mode === 'signup' ? 'Create Your Password' : 'Password'}
                </label>
                <Input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'Create a strong password' : 'Enter your password'}
                  className="bg-muted/30 border-border"
                />
                {mode === 'signup' && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Choose a password you will use again to sign in later.
                  </p>
                )}
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Confirm Password</label>
                  <Input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="bg-muted/30 border-border"
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : mode === 'login' ? (
                  <LogIn className="w-4 h-4 mr-2" />
                ) : (
                  <UserPlus className="w-4 h-4 mr-2" />
                )}
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </Button>

              {mode === 'login' && (
                <p className="text-xs text-center text-muted-foreground">
                  New here? Create your account first, verify your email, then sign in.
                </p>
              )}
            </form>

            <div className="mt-4 text-center">
              <button type="button" onClick={toggleMode} className="text-sm text-primary hover:underline">
                {mode === 'login' ? "Don't have an account? Create one" : 'Already have an account? Sign in'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
