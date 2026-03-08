import { useState, useEffect, useRef } from 'react';
import { Crown, Lock, Check, Sparkles, Clock, Gift, Percent, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { subscriptions, Subscription } from '@/data/subscriptions';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useCoins } from '@/contexts/CoinsContext';
import { useAchievements } from '@/contexts/AchievementsContext';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
 
const SubscriptionSection = () => {
  const { t } = useLanguage();
  const { currentSubscription, purchaseSubscription, daysRemaining, isExpired, claimDailyBonus, canClaimDailyBonus, coinBonus, dailyBonus, badge, activeSubscription } = useSubscription();
  const { coins } = useCoins();
  const { addAchievement, hasAchievement } = useAchievements();
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const previousSubRef = useRef<string | null>(null);

  // Track subscription changes and add achievements
  useEffect(() => {
    if (currentSubscription && !isExpired && previousSubRef.current !== currentSubscription.id) {
      if (!hasAchievement(currentSubscription.name, 'subscription')) {
        addAchievement({
          type: 'subscription',
          name: currentSubscription.name,
          icon: currentSubscription.icon,
          description: `${currentSubscription.isVIP ? 'VIP ' : ''}Tier ${currentSubscription.tier} subscription with ${currentSubscription.coinBonus}% bonus coins`
        });
      }
      previousSubRef.current = currentSubscription.id;
    }
  }, [currentSubscription, isExpired, addAchievement, hasAchievement]);
 
   const handlePurchase = () => {
     if (selectedSub) {
       const success = purchaseSubscription(selectedSub.id);
       if (success) {
         setShowConfirm(false);
         setSelectedSub(null);
       }
     }
   };
 
   const openConfirmDialog = (sub: Subscription) => {
     setSelectedSub(sub);
     setShowConfirm(true);
   };
 
   return (
     <section id="subscriptions" className="py-20 relative">
       <div className="container mx-auto px-4">
         <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              🎫 Subscriptions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
             {t('subscription.desc')}
           </p>
           
           {/* Current subscription status */}
           {currentSubscription && !isExpired && (
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${currentSubscription.color} text-white font-semibold shadow-lg`}>
                <span className="text-2xl">{badge}</span>
                <span>{currentSubscription.name}</span>
                {currentSubscription.isVIP && <Crown className="w-5 h-5" />}
                <span className="flex items-center gap-1 text-sm opacity-90">
                  <Clock className="w-4 h-4" />
                  {daysRemaining} {t('subscription.daysLeft')}
                </span>
              </div>
              
              {/* Perks display and daily bonus */}
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-400">
                  <Percent className="w-4 h-4" />
                  <span className="font-semibold">+{coinBonus}% Bonus Coins</span>
                </div>
                <Button 
                  onClick={() => claimDailyBonus()}
                  disabled={!canClaimDailyBonus}
                  className={`flex items-center gap-2 ${canClaimDailyBonus ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' : 'bg-muted'}`}
                >
                  <Gift className="w-4 h-4" />
                  {canClaimDailyBonus ? `${t('subscription.claimBonus')} ${dailyBonus}!` : `${t('subscription.dailyBonus')} ✓`}
                </Button>
              </div>
             </div>
           )}
         </div>
 
         {/* Subscriptions Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
           {subscriptions.map((sub) => {
             const isOwned = currentSubscription?.id === sub.id && !isExpired;
             const canAfford = coins >= sub.price;
             
             return (
               <Card 
                 key={sub.id} 
                 className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                   isOwned 
                     ? 'ring-2 ring-green-500 bg-green-500/10' 
                     : sub.isVIP 
                       ? 'ring-1 ring-yellow-500/50 bg-gradient-to-b from-yellow-500/5 to-transparent' 
                       : 'glass-card'
                 }`}
               >
                 {/* VIP Badge */}
                 {sub.isVIP && (
                   <div className="absolute top-0 right-0">
                     <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                       <Crown className="w-3 h-3" />
                       VIP
                     </div>
                   </div>
                 )}
 
                 <CardHeader className="pb-2">
                   <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${sub.color} flex items-center justify-center text-3xl mx-auto mb-2 shadow-lg`}>
                    {sub.badge}
                   </div>
                   <CardTitle className="text-center text-lg">{sub.name}</CardTitle>
                   <CardDescription className="text-center">
                     <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-bold ${
                       canAfford ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                     }`}>
                       🪙 {sub.price} coins
                     </span>
                   </CardDescription>
                 </CardHeader>
 
                 <CardContent className="pt-2">
                   <div className="text-xs text-center text-muted-foreground mb-3">
                    Tier {sub.tier} • +{sub.coinBonus}% bonus • {sub.dailyBonus}/day
                   </div>
                   
                   <ul className="space-y-1 mb-4">
                     {sub.features.map((feature, idx) => (
                       <li key={idx} className="flex items-start gap-2 text-xs">
                         <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                         <span className="text-muted-foreground">{feature}</span>
                       </li>
                     ))}
                   </ul>
 
                   {isOwned ? (
                     <Button 
                       className="w-full" 
                       variant="outline"
                       disabled
                     >
                       <Check className="w-4 h-4 mr-2" />
                       Active
                     </Button>
                   ) : (
                     <Button 
                       className={`w-full ${sub.isVIP ? 'bg-gradient-to-r ' + sub.color + ' hover:opacity-90' : ''}`}
                       variant={sub.isVIP ? "default" : "outline"}
                       onClick={() => openConfirmDialog(sub)}
                       disabled={!canAfford}
                     >
                       {canAfford ? (
                         <>
                           <Sparkles className="w-4 h-4 mr-2" />
                           {t('subscription.purchase')}
                         </>
                       ) : (
                         <>
                           <Lock className="w-4 h-4 mr-2" />
                           Need {sub.price - coins} more
                         </>
                       )}
                     </Button>
                   )}
                 </CardContent>
               </Card>
             );
           })}
         </div>
       </div>
 
       {/* Confirmation Dialog */}
       <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
         <DialogContent className="bg-card border-border">
           <DialogHeader>
             <DialogTitle className="flex items-center gap-2">
               <span className="text-2xl">{selectedSub?.icon}</span>
               Purchase {selectedSub?.name}?
             </DialogTitle>
             <DialogDescription>
               This will deduct <strong className="text-yellow-400">{selectedSub?.price} coins</strong> from your balance.
               <br />
               Your subscription will be active for <strong>30 days</strong>.
             </DialogDescription>
           </DialogHeader>
           
           <div className="flex gap-3 mt-4">
             <Button variant="outline" className="flex-1" onClick={() => setShowConfirm(false)}>
               Cancel
             </Button>
             <Button 
               className={`flex-1 ${selectedSub?.isVIP ? 'bg-gradient-to-r ' + selectedSub?.color : ''}`}
               onClick={handlePurchase}
             >
               <Check className="w-4 h-4 mr-2" />
               Confirm Purchase
             </Button>
           </div>
         </DialogContent>
       </Dialog>
     </section>
   );
 };
 
 export default SubscriptionSection;