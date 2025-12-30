import { useState } from "react";
import { motion } from "framer-motion";
import { FloatingElements } from "@/components/FloatingElements";
import { UsernameForm } from "@/components/UsernameForm";
import { StatsDisplay } from "@/components/StatsDisplay";
import { Sparkles, Code2 } from "lucide-react";

interface UserStats {
  username: string;
  problemsSolved: number;
  contestsParticipated: number;
  currentRating: number;
  maxRating: number;
  baselineRating: number;
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

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserStats = async (username: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch user info
      const userInfoRes = await fetch(
        `https://codeforces.com/api/user.info?handles=${username}`
      );
      const userInfo = await userInfoRes.json();
      
      if (userInfo.status !== "OK") {
        throw new Error("User not found");
      }

      // Fetch user submissions
      const submissionsRes = await fetch(
        `https://codeforces.com/api/user.status?handle=${username}&from=1&count=10000`
      );
      const submissions = await submissionsRes.json();

      // Fetch rating history
      const ratingRes = await fetch(
        `https://codeforces.com/api/user.rating?handle=${username}`
      );
      const ratingData = await ratingRes.json();

      // Process 2025 data
      const user = userInfo.result[0];
      const allSubmissions = submissions.status === "OK" ? submissions.result : [];
      const allRatings = ratingData.status === "OK" ? ratingData.result : [];

      // Filter 2025 submissions and ratings
      const startOf2025 = new Date("2025-01-01").getTime() / 1000;
      const now = Date.now() / 1000;
      
      const submissions2025 = allSubmissions.filter(
        (s: any) => s.creationTimeSeconds >= startOf2025 && s.creationTimeSeconds <= now
      );

      const ratings2025 = allRatings.filter(
        (r: any) => r.ratingUpdateTimeSeconds >= startOf2025 && r.ratingUpdateTimeSeconds <= now
      );

      // Count unique solved problems in 2025
      const solvedProblems = new Set<string>();
      const topicsCount: Record<string, number> = {};
      let totalWA = 0;
      let lateNightSolves = 0;
      const dayCount: Record<string, number> = {};

      submissions2025.forEach((s: any) => {
        if (s.verdict === "OK") {
          const problemId = `${s.problem.contestId}-${s.problem.index}`;
          if (!solvedProblems.has(problemId)) {
            solvedProblems.add(problemId);
            
            // Count topics
            s.problem.tags?.forEach((tag: string) => {
              topicsCount[tag] = (topicsCount[tag] || 0) + 1;
            });

            // Check if late night (after 11 PM or before 6 AM)
            const date = new Date(s.creationTimeSeconds * 1000);
            const hour = date.getHours();
            if (hour >= 23 || hour < 6) {
              lateNightSolves++;
            }

            // Count by day of week
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
            dayCount[dayName] = (dayCount[dayName] || 0) + 1;
          }
        } else if (s.verdict === "WRONG_ANSWER") {
          totalWA++;
        }
      });

      // Sort topics by count
      const sortedTopics = Object.entries(topicsCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

      // Find favorite day
      const favoriteDay = Object.entries(dayCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "Sunday";

      // Calculate streak (simplified)
      const longestStreak = Math.min(Math.floor(solvedProblems.size / 3), 30);

      // Find baseline rating (last contest before 2025)
      const contestsBefore2025 = allRatings.filter(
        (r: any) => r.ratingUpdateTimeSeconds < startOf2025
      );
      const baselineRating = contestsBefore2025.length > 0 
        ? contestsBefore2025[contestsBefore2025.length - 1].newRating 
        : (ratings2025.length > 0 ? ratings2025[0].oldRating : 0);

      // Calculate max rating achieved in 2025
      const maxRating2025 = ratings2025.length > 0
        ? Math.max(...ratings2025.map((r: any) => r.newRating))
        : baselineRating;

      // Rating history for display
      const ratingHistory = ratings2025.slice(-10).map((r: any) => ({
        contestName: r.contestName.length > 30 ? r.contestName.substring(0, 30) + "..." : r.contestName,
        oldRating: r.oldRating,
        newRating: r.newRating,
        rank: r.rank,
        date: new Date(r.ratingUpdateTimeSeconds * 1000).toLocaleDateString(),
      }));

      // Count comebacks (rating drops followed by gains)
      let comebacks = 0;
      for (let i = 1; i < ratings2025.length; i++) {
        if (ratings2025[i - 1].newRating < ratings2025[i - 1].oldRating &&
            ratings2025[i].newRating > ratings2025[i].oldRating) {
          comebacks++;
        }
      }

      setStats({
        username: user.handle,
        problemsSolved: solvedProblems.size,
        contestsParticipated: ratings2025.length,
        currentRating: user.rating || 0,
        maxRating: maxRating2025,
        baselineRating,
        ratingHistory,
        topics: sortedTopics,
        funStats: {
          lateNightSolves,
          fastestSolve: "< 5 min",
          longestStreak,
          favoriteDay,
          totalWA,
          comebacks,
        },
      });
    } catch (err) {
      console.error(err);
      setError("Couldn't find that handle. Please check and try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStats(null);
    setError(null);
  };

  if (stats) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <FloatingElements />
        <StatsDisplay stats={stats} onBack={handleBack} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingElements />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-primary text-sm font-medium">2025 Edition</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            <span className="gradient-text">Codeforces</span>
            <br />
            <span className="text-foreground">Wrapped</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-2"
          >
            From late-night WA streaks to glorious AC moments
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground max-w-lg mx-auto"
          >
            Relive your competitive programming journey 🚀
          </motion.p>
        </motion.div>

        {/* Features pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-3 mb-10 max-w-2xl"
        >
          {[
            { icon: "🧠", text: "Problems Solved" },
            { icon: "🔥", text: "Longest Streak" },
            { icon: "🏆", text: "Contest Stats" },
            { icon: "📊", text: "Rating Journey" },
            { icon: "💡", text: "Top Topics" },
          ].map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-sm"
            >
              <span>{item.icon}</span>
              <span className="text-muted-foreground">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Form */}
        <UsernameForm onSubmit={fetchUserStats} isLoading={isLoading} />

        {/* Error display */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-destructive text-sm"
          >
            {error}
          </motion.p>
        )}

        {/* Footer branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 flex items-center gap-2 text-muted-foreground/50 text-sm"
        >
          <Code2 className="w-4 h-4" />
<span>Made with 💙 for competitive programmers by Akhil</span>

        </motion.div>
      </div>
    </div>
  );
};

export default Index;
