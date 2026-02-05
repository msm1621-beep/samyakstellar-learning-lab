 import React, { useState, useEffect } from 'react';
 import { motion, AnimatePresence } from 'framer-motion';
 import { User, Sparkles, X, Check, Coins } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { useCoins } from '@/contexts/CoinsContext';
 import { toast } from '@/hooks/use-toast';
 
 const ACCOUNT_ICONS = [
   '🚀', '🌟', '🪐', '🌙', '☄️', '🛸', '👽', '🌌', '🔭', '⭐',
   '🌍', '🌎', '🌏', '☀️', '🌕', '🌑', '💫', '✨', '🛰️', '🌠',
   '🎆', '🎇', '🔮', '💎', '🎯'
 ];
 
 const ACCOUNT_COST = 100;
 
 interface AccountData {
   name: string;
   icon: string;
   isGuest: boolean;
   createdAt: string;
 }
 
 const AccountBar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [accountName, setAccountName] = useState('');
   const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
   const [account, setAccount] = useState<AccountData | null>(null);
   const { coins, addCoins } = useCoins();
 
   useEffect(() => {
     const savedAccount = localStorage.getItem('spaceAccount');
     if (savedAccount) {
       setAccount(JSON.parse(savedAccount));
     }
   }, []);
 
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
 
     const newAccount: AccountData = {
       name: accountName.trim() || 'Space Explorer',
       icon: selectedIcon,
       isGuest: false,
       createdAt: new Date().toISOString(),
     };
 
     // Deduct coins
     addCoins(-ACCOUNT_COST, 'Account Creation');
     
     localStorage.setItem('spaceAccount', JSON.stringify(newAccount));
     setAccount(newAccount);
     setIsOpen(false);
     setAccountName('');
     setSelectedIcon(null);
 
     toast({
       title: "Account Created! 🎉",
       description: `Welcome, ${newAccount.name}!`,
     });
   };
 
   const handleContinueAsGuest = () => {
     const guestAccount: AccountData = {
       name: 'Guest Explorer',
       icon: '👤',
       isGuest: true,
       createdAt: new Date().toISOString(),
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
     toast({
       title: "Logged Out",
       description: "See you next time, Space Explorer!",
     });
   };
 
   return (
     <>
       {/* Account Button - Fixed Position */}
       <motion.div
         className="fixed top-4 right-32 z-50"
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.3 }}
       >
         <Button
           onClick={() => setIsOpen(!isOpen)}
           className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg shadow-purple-500/30"
         >
           {account ? (
             <>
               <span className="text-lg">{account.icon}</span>
               <span className="hidden sm:inline max-w-[100px] truncate">{account.name}</span>
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
             {/* Backdrop */}
             <motion.div
               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
               onClick={() => setIsOpen(false)}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
             />
 
             {/* Modal Content */}
             <motion.div
               className="relative bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 border border-purple-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl shadow-purple-500/20"
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
                 /* Logged In View */
                 <div className="text-center">
                   <motion.div
                     className="text-6xl mb-4"
                     animate={{ rotate: [0, 10, -10, 0] }}
                     transition={{ duration: 2, repeat: Infinity }}
                   >
                     {account.icon}
                   </motion.div>
                   <h2 className="text-2xl font-bold text-white mb-2">{account.name}</h2>
                   <p className="text-purple-300 text-sm mb-6">
                     {account.isGuest ? 'Guest Account' : 'Space Explorer Account'}
                   </p>
                   
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
                 /* Create Account View */
                 <div>
                   <div className="text-center mb-6">
                     <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-2" />
                     <h2 className="text-2xl font-bold text-white">Create Account</h2>
                     <p className="text-purple-300 text-sm mt-1">
                       Cost: <span className="text-amber-400 font-bold">{ACCOUNT_COST}</span> coins
                       <span className="text-white/60 ml-2">(You have: {coins})</span>
                     </p>
                   </div>
 
                   {/* Name Input */}
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
 
                   {/* Icon Selection */}
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
 
                   {/* Action Buttons */}
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