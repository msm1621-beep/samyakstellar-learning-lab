import { useEffect, useState } from 'react';
import { Coins } from 'lucide-react';

interface CoinRewardAnimationProps {
  amount: number;
  reason: string;
  onComplete?: () => void;
}

const CoinRewardAnimation = ({ amount, reason, onComplete }: CoinRewardAnimationProps) => {
  const [show, setShow] = useState(true);
  const [coins, setCoins] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate floating coins
    const newCoins = Array.from({ length: Math.min(amount / 10, 10) }, (_, i) => ({
      id: i,
      x: Math.random() * 200 - 100,
      delay: i * 0.1,
    }));
    setCoins(newCoins);

    const timer = setTimeout(() => {
      setShow(false);
      onComplete?.();
    }, 2500);

    return () => clearTimeout(timer);
  }, [amount, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
      {/* Floating coins animation */}
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute animate-float-up"
          style={{
            left: `calc(50% + ${coin.x}px)`,
            animationDelay: `${coin.delay}s`,
          }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
            <Coins className="w-5 h-5 text-yellow-100" />
          </div>
        </div>
      ))}

      {/* Center popup */}
      <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 p-1 rounded-2xl animate-scale-in shadow-2xl shadow-yellow-500/50">
        <div className="bg-space-dark/90 backdrop-blur-md px-8 py-6 rounded-xl text-center">
          <div className="text-5xl mb-2">🪙</div>
          <div className="text-4xl font-fredoka font-bold text-yellow-400 mb-1">
            +{amount}
          </div>
          <div className="text-white/80 text-sm">{reason}</div>
        </div>
      </div>
    </div>
  );
};

export default CoinRewardAnimation;
