import { motion } from "framer-motion";
import { StatCard } from "./StatCard";
import { RatingChart } from "./RatingChart";
import { TopicsChart } from "./TopicsChart";
import { FunStats } from "./FunStats";
import { Button } from "./ui/button";
import { ArrowLeft, Trophy, Target, Calendar, Award } from "lucide-react";

interface UserStats {
  username: string;
  problemsSolved: number;
  contestsParticipated: number;
  currentRating: number;
  maxRating: number;
  ratingHistory: Array<{
    contestName: string;
    oldRating: number;
    newRating: number;
    rank: number;
    date: string;
  }>;
  topics: Array<{ name: string; count: number }>;
  funStats: {
    lateNightSolves: number;
    fastestSolve: string;
    longestStreak: number;
    favoriteDay: string;
    totalWA: number;
    comebacks: number;
  };
}

interface StatsDisplayProps {
  stats: UserStats;
  onBack: () => void;
}

export const StatsDisplay = ({ stats, onBack }: StatsDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4"
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="gradient-text">{stats.username}</span>'s 2025
            </h1>
            <p className="text-muted-foreground">Your Codeforces year in review</p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
        >
          <Award className="w-5 h-5 text-primary" />
          <span className="text-primary font-semibold">Codeforces Wrapped 2025</span>
        </motion.div>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<img src="/logo.svg" className="w-8 h-8" alt="CF WRAPPED" />}
          title="Problems Conquered"
          value={stats.problemsSolved}
          subtitle="AC submissions this year"
          delay={1}
          gradient="primary"
        />
        <StatCard
          icon={<Trophy className="w-8 h-8" />}
          title="Contests Battled"
          value={stats.contestsParticipated}
          subtitle="competitive challenges"
          delay={2}
          gradient="accent"
        />
        <StatCard
          icon={<Target className="w-8 h-8" />}
          title="Accuracy Rate"
          value={`${Math.round((stats.problemsSolved / (stats.problemsSolved + stats.funStats.totalWA)) * 100)}%`}
          subtitle="first-try success"
          delay={3}
          gradient="success"
        />
        <StatCard
          icon={<Calendar className="w-8 h-8" />}
          title="Active Days"
          value={Math.round(stats.problemsSolved / 2.5)}
          subtitle="days with submissions"
          delay={4}
          gradient="warm"
        />
      </div>

      {/* Rating and Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RatingChart
          ratingHistory={stats.ratingHistory}
          currentRating={stats.currentRating}
          maxRating={stats.maxRating}
        />
        <TopicsChart topics={stats.topics} />
      </div>

      {/* Fun Stats */}
      <FunStats stats={stats.funStats} />

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-12 text-center"
      >
        <p className="text-muted-foreground mb-4">
          Keep grinding, keep improving. See you in 2026! 🚀
        </p>
        <Button variant="outline" onClick={onBack}>
          Check Another Handle
        </Button>
      </motion.div>
    </motion.div>
  );
};
