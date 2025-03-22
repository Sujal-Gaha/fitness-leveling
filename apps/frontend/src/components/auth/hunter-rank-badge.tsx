import { cn } from '@libs/components';
import { motion } from 'framer-motion';

interface HunterRankBadgeProps {
  rank: string;
  className?: string;
}

export const HunterRankBadge = ({ rank, className }: HunterRankBadgeProps) => {
  // Get color based on rank
  const getRankColor = () => {
    switch (rank) {
      case 'S':
        return 'from-yellow-400 to-yellow-600 border-yellow-500';
      case 'A':
        return 'from-purple-400 to-purple-600 border-purple-500';
      case 'B':
        return 'from-blue-400 to-blue-600 border-blue-500';
      case 'C':
        return 'from-green-400 to-green-600 border-green-500';
      case 'D':
        return 'from-orange-400 to-orange-600 border-orange-500';
      case 'E':
        return 'from-red-400 to-red-600 border-red-500';
      default:
        return 'from-gray-400 to-gray-600 border-gray-500';
    }
  };

  return (
    <motion.div
      className={cn(
        'relative flex h-16 w-16 items-center justify-center rounded-full border-2 bg-gradient-to-br',
        getRankColor(),
        className
      )}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 15,
        delay: 0.3,
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full opacity-30 blur-sm bg-gradient-to-br"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${getRankColor()
            .split(' ')[0]
            .replace('from-', '')}, ${getRankColor().split(' ')[1].replace('to-', '')})`,
        }}
      />
      <span className="relative z-10 text-2xl font-bold text-white">{rank}</span>
    </motion.div>
  );
};
