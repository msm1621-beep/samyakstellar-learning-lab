import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Sparkles, X, Coins, AlertTriangle, RefreshCw, Calendar, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCoins } from '@/contexts/CoinsContext';
import { toast } from '@/hooks/use-toast';
import ProfileFrame from './ProfileFrame';

const ACCOUNT_ICONS = [
  '🚀', '🌟', '🪐', '🌙', '☄️', '🛸', '👽', '🌌', '🔭', '⭐',
  '🌍', '🌎', '🌏', '☀️', '🌕', '🌑', '💫', '✨', '🛰️', '🌠',
  '🎆', '🎇', '🔮', '💎', '🎯'
];

const ACCOUNT_COST = 100;
const MAINTENANCE_COST = 50;
const MAINTENANCE_PERIOD_DAYS = 90; // 3 months

interface AccountData {
  id?: string;
  name: string;
  icon: string;
  isGuest: boolean;
  createdAt: string;
  lastMaintenanceAt: string;
  maintenanceExpiresAt: string;
}

const newId = () =>
  (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const AccountBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [account, setAccount] = useState<AccountData | null>(null);
  const [showReminderBanner, setShowReminderBanner] = useState(false);
  const { coins, addCoins } = useCoins();

  useEffect(() => {
    const savedAccount = localStorage.getItem('spaceAccount');
    if (savedAccount) {
      const parsed = JSON.parse(savedAccount) as AccountData;
      if (!parsed.id) {
        parsed.id = newId();
        localStorage.setItem('spaceAccount', JSON.stringify(parsed));
      }
      setAccount(parsed);
      
      // Check if maintenance is expired or expiring soon
      if (!parsed.isGuest && parsed.maintenanceExpiresAt) {
        const expiresAt = new Date(parsed.maintenanceExpiresAt);
        const now = new Date();
        const daysUntilExpiry = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysUntilExpiry <= 7) {
          setShowReminderBanner(true);
          if (daysUntilExpiry <= 0) {
            toast({
              title: "⚠️ Account Maintenance Required!",
              description: "Your account needs renewal. Pay the maintenance fee to continue.",
              variant: "destructive"
            });
          } else if (daysUntilExpiry <= 7) {
            toast({
              title: "🔔 Maintenance Reminder",
              description: `Your account maintenance expires in ${daysUntilExpiry} days!`,
            });
          }
        }
      }
    }
  }, []);

  const isMaintenanceExpired = (): boolean => {
    if (!account || account.isGuest) return false;
    if (!account.maintenanceExpiresAt) return true;
    return new Date(account.maintenanceExpiresAt) <= new Date();
  };

  const getDaysUntilMaintenance = (): number => {
    if (!account || account.isGuest || !account.maintenanceExpiresAt) return 0;
    const expiresAt = new Date(account.maintenanceExpiresAt);
    return Math.max(0, Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  };

  const handlePayMaintenance = () => {
    if (coins < MAINTENANCE_COST) {
      toast({
        title: "Not Enough Coins",
        description: `You need ${MAINTENANCE_COST} coins for maintenance. You have ${coins}.`,
        variant: "destructive",
      });
      return;
    }

    addCoins(-MAINTENANCE_COST, 'Account Maintenance');

    const now = new Date();
    const newExpiresAt = new Date(now.getTime() + MAINTENANCE_PERIOD_DAYS * 24 * 60 * 60 * 1000);

    const updatedAccount: AccountData = {
      ...account!,
      lastMaintenanceAt: now.toISOString(),
      maintenanceExpiresAt: newExpiresAt.toISOString(),
    };

    localStorage.setItem('spaceAccount', JSON.stringify(updatedAccount));
    setAccount(updatedAccount);
    setShowReminderBanner(false);

    toast({
      title: "✅ Maintenance Paid!",
      description: `Your account is active for another ${MAINTENANCE_PERIOD_DAYS} days!`,
    });
  };

  const handleCreateAccount = () => {
    if (!selectedIcon) {
      toast({
        title: "Select an Icon",
        description: "Please choose an icon for your account!",
        variant: "destructive",
      });
      return;
    }

    if (coins < ACCOUNT_COST) {
      toast({
        title: "Not Enough Coins",
        description: `You need ${ACCOUNT_COST} coins to create an account. You have ${coins}.`,
        variant: "destructive",
      });
      return;
    }

    const now = new Date();
    const maintenanceExpiresAt = new Date(now.getTime() + MAINTENANCE_PERIOD_DAYS * 24 * 60 * 60 * 1000);

    const newAccount: AccountData = {
      id: newId(),
      name: accountName.trim() || 'Space Explorer',
      icon: selectedIcon,
      isGuest: false,
      createdAt: now.toISOString(),
      lastMaintenanceAt: now.toISOString(),
      maintenanceExpiresAt: maintenanceExpiresAt.toISOString(),
    };

    addCoins(-ACCOUNT_COST, 'Account Creation');
    
    localStorage.setItem('spaceAccount', JSON.stringify(newAccount));
    setAccount(newAccount);
    setIsOpen(false);
    setAccountName('');
    setSelectedIcon(null);

    toast({
      title: "Account Created! 🎉",
      description: `Welcome, ${newAccount.name}! Maintenance included for ${MAINTENANCE_PERIOD_DAYS} days.`,
    });
  };

  const handleContinueAsGuest = () => {
    const guestAccount: AccountData = {
      id: newId(),
      name: 'Guest Explorer',
      icon: '👤',
      isGuest: true,
      createdAt: new Date().toISOString(),
      lastMaintenanceAt: '',
      maintenanceExpiresAt: '',
    };

    localStorage.setItem('spaceAccount', JSON.stringify(guestAccount));
    setAccount(guestAccount);
    setIsOpen(false);

    toast({
      title: "Welcome, Guest!",
      description: "You can create an account anytime to save your progress.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('spaceAccount');
    setAccount(null);
    setShowReminderBanner(false);
    toast({
      title: "Logged Out",
      description: "See you next time, Space Explorer!",
    });
  };

  const expired = isMaintenanceExpired();
  const daysRemaining = getDaysUntilMaintenance();

  return (
    <>
      {/* Maintenance Reminder Banner */}
      <AnimatePresence>
        {showReminderBanner && account && !account.isGuest && (
          <motion.div
            className="fixed top-16 left-1/2 transform -translate-x-1/2 z-[55] max-w-md w-full mx-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <div className={`p-4 rounded-xl border shadow-lg ${
              expired 
                ? 'bg-red-900/90 border-red-500/50' 
                : 'bg-amber-900/90 border-amber-500/50'
            }`}>
              <div className="flex items-center gap-3">
                <AlertTriangle className={`w-6 h-6 ${expired ? 'text-red-400' : 'text-amber-400'}`} />
                <div className="flex-1">
                  <h4 className="font-semibold text-white">
                    {expired ? 'Maintenance Required!' : 'Maintenance Expiring Soon'}
                  </h4>
                  <p className="text-sm text-white/70">
                    {expired 
                      ? 'Pay maintenance to keep your account active.' 
                      : `${daysRemaining} days remaining. Renew now!`}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={handlePayMaintenance}
                  disabled={coins < MAINTENANCE_COST}
                  className="bg-white/20 hover:bg-white/30"
                >
                  {MAINTENANCE_COST} 🪙
                </Button>
                <button 
                  onClick={() => setShowReminderBanner(false)}
                  className="text-white/50 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Account Button */}
      <motion.div
        className="fixed top-4 right-32 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-full px-4 py-2 flex items-center gap-2 shadow-lg ${
            expired 
              ? 'bg-gradient-to-r from-red-600 to-orange-600 shadow-red-500/30' 
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-purple-500/30'
          } hover:opacity-90 text-white`}
        >
          {account ? (
            <>
              <ProfileFrame icon={account.icon} size={32} />
              <span className="hidden sm:inline max-w-[100px] truncate">{account.name}</span>
              {expired && <AlertTriangle className="w-4 h-4 text-yellow-300" />}
            </>
          ) : (
            <>
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Account</span>
            </>
          )}
        </Button>
      </motion.div>

      {/* Account Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="relative bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 border border-purple-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl shadow-purple-500/20 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {account ? (
                <div className="text-center">
                  <motion.div
                    className="mb-4 flex justify-center"
                    animate={{ rotate: [0, 6, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <ProfileFrame icon={account.icon} size={88} />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mb-2">{account.name}</h2>
                  <p className="text-purple-300 text-sm mb-4">
                    {account.isGuest ? 'Guest Account' : 'Space Explorer Account'}
                  </p>

                  {/* Account Status Card */}
                  {!account.isGuest && (
                    <div className={`mb-6 p-4 rounded-xl border ${
                      expired 
                        ? 'bg-red-900/30 border-red-500/30' 
                        : 'bg-green-900/30 border-green-500/30'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Shield className={`w-5 h-5 ${expired ? 'text-red-400' : 'text-green-400'}`} />
                          <span className="font-medium text-white">Account Status</span>
                        </div>
                        <span className={`text-sm font-bold ${expired ? 'text-red-400' : 'text-green-400'}`}>
                          {expired ? 'EXPIRED' : 'ACTIVE'}
                        </span>
                      </div>
                      
                      {!expired && (
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{daysRemaining} days until next maintenance</span>
                        </div>
                      )}

                      <Button
                        onClick={handlePayMaintenance}
                        disabled={coins < MAINTENANCE_COST}
                        className={`w-full mt-3 ${
                          expired 
                            ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                            : 'bg-gradient-to-r from-green-600 to-emerald-600'
                        } hover:opacity-90`}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        {expired ? 'Renew Now' : 'Renew Early'} ({MAINTENANCE_COST} 🪙)
                      </Button>
                      <p className="text-xs text-white/40 mt-2">
                        Maintenance fee: {MAINTENANCE_COST} coins every {MAINTENANCE_PERIOD_DAYS} days
                      </p>
                    </div>
                  )}
                  
                  {account.isGuest && (
                    <Button
                      onClick={() => {
                        setAccount(null);
                        localStorage.removeItem('spaceAccount');
                      }}
                      className="w-full mb-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Upgrade to Full Account ({ACCOUNT_COST} coins)
                    </Button>
                  )}
                  
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                  >
                    Log Out
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-6">
                    <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-2" />
                    <h2 className="text-2xl font-bold text-white">Create Account</h2>
                    <p className="text-purple-300 text-sm mt-1">
                      Cost: <span className="text-amber-400 font-bold">{ACCOUNT_COST}</span> coins
                      <span className="text-white/60 ml-2">(You have: {coins})</span>
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                      Includes {MAINTENANCE_PERIOD_DAYS} days of maintenance
                    </p>
                  </div>

                  <div className="mb-4">
                    <label className="block text-purple-300 text-sm mb-2">Your Space ID</label>
                    <Input
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      placeholder="Enter your name..."
                      className="bg-slate-800/50 border-purple-500/30 text-white placeholder:text-white/40 focus:border-purple-400"
                      maxLength={20}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-purple-300 text-sm mb-2">Choose Your Icon</label>
                    <div className="grid grid-cols-5 gap-2 p-3 bg-slate-800/30 rounded-xl border border-purple-500/20 max-h-40 overflow-y-auto">
                      {ACCOUNT_ICONS.map((icon, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setSelectedIcon(icon)}
                          className={`text-2xl p-2 rounded-lg transition-all ${
                            selectedIcon === icon
                              ? 'bg-purple-500/50 ring-2 ring-purple-400 scale-110'
                              : 'hover:bg-purple-500/20'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {icon}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleCreateAccount}
                      disabled={coins < ACCOUNT_COST}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Coins className="w-4 h-4 mr-2" />
                      Create Account ({ACCOUNT_COST} coins)
                    </Button>
                    
                    <Button
                      onClick={handleContinueAsGuest}
                      variant="ghost"
                      className="w-full text-purple-300 hover:text-white hover:bg-purple-500/20"
                    >
                      Continue as Guest (Free)
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccountBar;
