import { motion } from "framer-motion";

interface Topic {
  name: string;
  count: number;
}

interface TopicsChartProps {
  topics: Topic[];
}

const topicColors = [
  "bg-gradient-to-r from-primary to-cyan-400",
  "bg-gradient-to-r from-secondary to-purple-400",
  "bg-gradient-to-r from-accent to-pink-400",
  "bg-gradient-to-r from-emerald-500 to-teal-400",
  "bg-gradient-to-r from-orange-500 to-amber-400",
];

export const TopicsChart = ({ topics }: TopicsChartProps) => {
  const maxCount = Math.max(...topics.map(t => t.count));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="glass-card rounded-2xl p-6 md:p-8 bg-gradient-to-br from-secondary/10 to-accent/5 border-secondary/20"
    >
      <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
        💡 Your Strongest Topics
      </h3>
      
      <div className="space-y-4">
        {topics.slice(0, 5).map((topic, index) => {
          const percentage = (topic.count / maxCount) * 100;
          return (
            <motion.div
              key={topic.name}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground capitalize">
                  {topic.name.replace(/-/g, ' ')}
                </span>
                <span className="text-sm text-muted-foreground font-mono">
                  {topic.count} problems
                </span>
              </div>
              <div className="h-3 bg-muted/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                  className={`h-full rounded-full ${topicColors[index % topicColors.length]}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
