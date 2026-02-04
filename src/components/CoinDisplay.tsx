import { useCoins } from '@/contexts/CoinsContext';
import { Coins } from 'lucide-react';

const CoinDisplay = () => {
  const { coins, recentReward } = useCoins();

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Main coin display */}
      <div className="bg-gradient-to-r from-yellow-500/90 to-amber-600/90 backdrop-blur-md px-4 py-2 rounded-full border-2 border-yellow-400/50 shadow-lg shadow-yellow-500/20 flex items-center gap-2">
        <Coins className="w-5 h-5 text-yellow-200" />
        <span className="font-fredoka font-bold text-white text-lg">{coins}</span>
      </div>
      
      {/* Reward popup */}
      {recentReward && (
        <div className="absolute top-full right-0 mt-2 animate-bounce-in">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl shadow-lg border border-green-400/50 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🪙</span>
              <div>
                <div className="font-bold">+{recentReward.amount} coins!</div>
                <div className="text-xs opacity-90">{recentReward.reason}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinDisplay;
