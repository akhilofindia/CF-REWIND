import { motion } from "framer-motion";
import { Clock, Moon, Zap, Coffee, Heart, Flame } from "lucide-react";

interface FunStatsProps {
  stats: {
    lateNightSolves: number;
    fastestSolve: string;
    longestStreak: number;
    favoriteDay: string;
    totalWA: number;
    comebacks: number;
  };
}

export const FunStats = ({ stats }: FunStatsProps) => {
  const funFacts = [
    {
      icon: <Moon className="w-6 h-6" />,
      label: "Late Night Solves",
      value: stats.lateNightSolves,
      suffix: "problems after midnight 🌙",
      color: "text-purple-400",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      label: "Fastest Solve",
      value: stats.fastestSolve,
      suffix: "speedrun mode ⚡",
      color: "text-yellow-400",
    },
    {
      icon: <Flame className="w-6 h-6" />,
      label: "Longest Streak",
      value: `${stats.longestStreak} days`,
      suffix: "of consecutive solving 🔥",
      color: "text-orange-400",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Favorite Day",
      value: stats.favoriteDay,
      suffix: "you solve the most on 📅",
      color: "text-cyan-400",
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      label: "Wrong Answers",
      value: stats.totalWA,
      suffix: "WAs... but who's counting? 😅",
      color: "text-red-400",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      label: "Epic Comebacks",
      value: stats.comebacks,
      suffix: "times you recovered from -rating 💪",
      color: "text-pink-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="glass-card rounded-2xl p-6 md:p-8 bg-gradient-to-br from-accent/10 to-secondary/5 border-accent/20"
    >
      <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
        😅 Fun Stats Only CF Addicts Understand
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {funFacts.map((fact, index) => (
          <motion.div
            key={fact.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="p-4 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/30 transition-all"
          >
            <div className={`${fact.color} mb-2`}>{fact.icon}</div>
            <p className="text-sm text-muted-foreground">{fact.label}</p>
            <p className="text-2xl font-bold text-foreground">{fact.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{fact.suffix}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
