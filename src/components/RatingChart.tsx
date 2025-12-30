import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface RatingChange {
  contestName: string;
  oldRating: number;
  newRating: number;
  rank: number;
  date: string;
}

interface RatingChartProps {
  ratingHistory: RatingChange[];
  currentRating: number;
  maxRating: number;
  baselineRating: number;
}

const getRatingColor = (rating: number) => {
  if (rating >= 2400) return "text-red-500";
  if (rating >= 2100) return "text-orange-500";
  if (rating >= 1900) return "text-violet-500";
  if (rating >= 1600) return "text-blue-500";
  if (rating >= 1400) return "text-cyan-500";
  if (rating >= 1200) return "text-emerald-500";
  return "text-gray-400";
};

const getRatingTitle = (rating: number) => {
  if (rating >= 3000) return "Legendary Grandmaster";
  if (rating >= 2600) return "International Grandmaster";
  if (rating >= 2400) return "Grandmaster";
  if (rating >= 2300) return "International Master";
  if (rating >= 2100) return "Master";
  if (rating >= 1900) return "Candidate Master";
  if (rating >= 1600) return "Expert";
  if (rating >= 1400) return "Specialist";
  if (rating >= 1200) return "Pupil";
  return "Newbie";
};

export const RatingChart = ({ ratingHistory, currentRating, maxRating, baselineRating }: RatingChartProps) => {
  // Net change = Max rating in 2025 - baseline rating before 2025
  const netChange = maxRating - baselineRating;
  const isPositive = netChange >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="glass-card rounded-2xl p-6 md:p-8 bg-gradient-to-br from-primary/10 to-secondary/5 border-primary/20"
    >
      <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
        📈 Rating Journey
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-1">Current Rating</p>
          <p className={`text-4xl font-bold ${getRatingColor(currentRating)}`}>
            {currentRating}
          </p>
          <p className={`text-sm ${getRatingColor(currentRating)}`}>
            {getRatingTitle(currentRating)}
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-1">Max Rating</p>
          <p className={`text-4xl font-bold ${getRatingColor(maxRating)}`}>
            {maxRating}
          </p>
          <p className={`text-sm ${getRatingColor(maxRating)}`}>
            {getRatingTitle(maxRating)}
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-1">Net Change (2025)</p>
          <div className="flex items-center justify-center gap-2">
            {isPositive ? (
              <TrendingUp className="w-6 h-6 text-emerald-500" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-500" />
            )}
            <p className={`text-4xl font-bold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
              {isPositive ? '+' : ''}{netChange}
            </p>
          </div>
        </div>
      </div>

      {/* Mini rating bars */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm mb-3">Recent Contests</p>
        {ratingHistory.slice(-5).reverse().map((contest, index) => {
          const change = contest.newRating - contest.oldRating;
          const isUp = change >= 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {contest.contestName}
                </p>
                <p className="text-xs text-muted-foreground">Rank #{contest.rank}</p>
              </div>
              <div className={`flex items-center gap-1 ${isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-semibold">{isUp ? '+' : ''}{change}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};