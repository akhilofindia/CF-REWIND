import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";

interface UsernameFormProps {
  onSubmit: (username: string) => void;
  isLoading: boolean;
}

export const UsernameForm = ({ onSubmit, isLoading }: UsernameFormProps) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <Input
            type="text"
            placeholder="Enter your Codeforces handle"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-14 text-lg pl-5 pr-12 bg-muted/30 border-border/50 focus:border-primary/50 focus:bg-muted/50"
            disabled={isLoading}
          />
          <motion.div
            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/50"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
        </div>
        
        <Button
          type="submit"
          variant="hero"
          size="xl"
          className="w-full"
          disabled={!username.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing your journey...
            </>
          ) : (
            <>
              Unwrap My 2025
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-muted-foreground text-sm mt-4"
      >
        We'll fetch your public Codeforces data ✨
      </motion.p>
    </motion.div>
  );
};
