import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  delay?: number;
  gradient?: "primary" | "accent" | "warm" | "success";
}

const gradientClasses = {
  primary: "from-primary/20 to-primary/5 border-primary/30",
  accent: "from-secondary/20 to-accent/5 border-secondary/30",
  warm: "from-orange-500/20 to-red-500/5 border-orange-500/30",
  success: "from-emerald-500/20 to-teal-500/5 border-emerald-500/30",
};

const iconGradients = {
  primary: "gradient-text",
  accent: "gradient-text-accent",
  warm: "gradient-text-warm",
  success: "text-emerald-400",
};

export const StatCard = ({ 
  icon, 
  title, 
  value, 
  subtitle, 
  delay = 0,
  gradient = "primary" 
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: delay * 0.1 + 0.2 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${gradientClasses[gradient]} hover:border-opacity-60 transition-all duration-300`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`text-3xl ${iconGradients[gradient]}`}>
          {icon}
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay * 0.1 + 0.4 }}
      >
        <p className="text-muted-foreground text-sm font-medium mb-1">{title}</p>
        <motion.p 
          className="text-3xl md:text-4xl font-bold text-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay * 0.1 + 0.5 }}
        >
          {value}
        </motion.p>
        {subtitle && (
          <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
        )}
      </motion.div>
    </motion.div>
  );
};
