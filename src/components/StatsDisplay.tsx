import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import { Button } from "./ui/button";
import { X, Download, Sparkles, Flame, Snowflake } from "lucide-react";

interface ShareCardProps {
  username: string;
  problemsSolved: number;
  contestsParticipated: number;
  currentRating: number;
  maxRating: number;
  netChange: number;
  onClose: () => void;
}

type DesignVariant = "neon" | "fire" | "frost";

export const ShareCard = ({
  username,
  problemsSolved,
  contestsParticipated,
  currentRating,
  maxRating,
  netChange,
  onClose,
}: ShareCardProps) => {
  const [selectedDesign, setSelectedDesign] = useState<DesignVariant>("neon");
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `${username}-cf-wrapped-2025.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to generate image:", error);
    }
    setIsDownloading(false);
  };

  const designs: Record<DesignVariant, { label: string; icon: React.ReactNode; colors: string }> = {
    neon: {
      label: "Neon Cyber",
      icon: <Sparkles className="w-4 h-4" />,
      colors: "from-primary via-accent to-primary",
    },
    fire: {
      label: "Fire Storm",
      icon: <Flame className="w-4 h-4" />,
      colors: "from-orange-500 via-red-500 to-yellow-500",
    },
    frost: {
      label: "Frost Wave",
      icon: <Snowflake className="w-4 h-4" />,
      colors: "from-cyan-400 via-blue-500 to-indigo-600",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Design selector */}
        <div className="flex gap-2 mb-4 justify-center">
          {(Object.keys(designs) as DesignVariant[]).map((variant) => (
            <Button
              key={variant}
              variant={selectedDesign === variant ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDesign(variant)}
              className="gap-2"
            >
              {designs[variant].icon}
              {designs[variant].label}
            </Button>
          ))}
        </div>

        {/* The shareable card */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl"
          style={{ aspectRatio: "1/1" }}
        >
          <AnimatePresence mode="wait">
            {selectedDesign === "neon" && <NeonCard key="neon" {...{ username, problemsSolved, contestsParticipated, currentRating, maxRating, netChange }} />}
            {selectedDesign === "fire" && <FireCard key="fire" {...{ username, problemsSolved, contestsParticipated, currentRating, maxRating, netChange }} />}
            {selectedDesign === "frost" && <FrostCard key="frost" {...{ username, problemsSolved, contestsParticipated, currentRating, maxRating, netChange }} />}
          </AnimatePresence>
        </div>

        {/* Download button */}
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full mt-4 gap-2"
          size="lg"
        >
          <Download className="w-5 h-5" />
          {isDownloading ? "Generating..." : "Download Card"}
        </Button>
      </motion.div>
    </motion.div>
  );
};

// Shared stat display component
const StatItem = ({ value, label, className = "" }: { value: string | number; label: string; className?: string }) => (
  <div className={`text-center ${className}`}>
    <div className="text-2xl md:text-3xl font-bold font-mono">{value}</div>
    <div className="text-xs md:text-sm opacity-80">{label}</div>
  </div>
);

// Design 1: Neon Cyber
const NeonCard = ({ username, problemsSolved, contestsParticipated, currentRating, maxRating, netChange }: Omit<ShareCardProps, "onClose">) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex flex-col"
  >
    {/* Neon glow effects */}
    <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-accent/30 rounded-full blur-3xl" />
    
    {/* Grid pattern */}
    <div 
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)`,
        backgroundSize: "30px 30px",
      }}
    />

    {/* Content */}
    <div className="relative z-10 flex flex-col h-full text-white">
      {/* Header */}
      <div className="text-center mb-auto">
        <div className="text-xs tracking-[0.3em] text-primary/80 mb-1">CODEFORCES</div>
        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          2025 WRAPPED
        </div>
      </div>

      {/* Username */}
      <div className="text-center my-6">
        <div className="inline-block px-6 py-2 rounded-full border border-primary/50 bg-primary/10">
          <span className="text-xl md:text-2xl font-bold text-primary">{username}</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatItem value={problemsSolved} label="Problems Solved" />
        <StatItem value={contestsParticipated} label="Contests" />
        <StatItem value={maxRating} label="Max Rating" />
        <StatItem 
          value={`${netChange >= 0 ? "+" : ""}${netChange}`} 
          label="Net Change" 
          className={netChange >= 0 ? "text-green-400" : "text-red-400"}
        />
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground/60 mt-auto">
        ✨ Code glows brighter at night 🌙
      </div>
    </div>
  </motion.div>
);

// Design 2: Fire Storm
const FireCard = ({ username, problemsSolved, contestsParticipated, currentRating, maxRating, netChange }: Omit<ShareCardProps, "onClose">) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 bg-gradient-to-br from-orange-950 via-red-950 to-amber-950 p-6 flex flex-col"
  >
    {/* Fire glow effects */}
    <div className="absolute top-1/4 left-0 w-full h-1/2 bg-gradient-to-r from-orange-500/20 via-red-500/30 to-yellow-500/20 blur-3xl" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/40 rounded-full blur-3xl" />

    {/* Ember particles simulation */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-orange-400 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: Math.random() * 0.8,
          }}
        />
      ))}
    </div>

    {/* Content */}
    <div className="relative z-10 flex flex-col h-full text-white">
      {/* Header */}
      <div className="text-center mb-auto">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Flame className="w-5 h-5 text-orange-400" />
          <span className="text-xs tracking-[0.3em] text-orange-300">CODEFORCES</span>
          <Flame className="w-5 h-5 text-orange-400" />
        </div>
        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
          2025 WRAPPED
        </div>
      </div>

      {/* Username */}
      <div className="text-center my-6">
        <div className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500/30 to-red-500/30 border border-orange-400/30">
          <span className="text-xl md:text-2xl font-bold text-orange-200">{username}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 rounded-lg bg-black/30">
          <div className="text-3xl font-bold text-orange-300">{problemsSolved}</div>
          <div className="text-xs text-orange-200/70">Problems Crushed</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-black/30">
          <div className="text-3xl font-bold text-yellow-300">{contestsParticipated}</div>
          <div className="text-xs text-yellow-200/70">Battles Fought</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-black/30">
          <div className="text-3xl font-bold text-red-300">{maxRating}</div>
          <div className="text-xs text-red-200/70">Peak Rating</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-black/30">
          <div className={`text-3xl font-bold ${netChange >= 0 ? "text-green-400" : "text-red-400"}`}>
            {netChange >= 0 ? "+" : ""}{netChange}
          </div>
          <div className="text-xs text-orange-200/70">Rating Change</div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-orange-300/50 mt-auto">
        🔥 On Fire in 2025 🔥
      </div>
    </div>
  </motion.div>
);

// Design 3: Frost Wave
const FrostCard = ({ username, problemsSolved, contestsParticipated, currentRating, maxRating, netChange }: Omit<ShareCardProps, "onClose">) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-6 flex flex-col"
  >
    {/* Frost effects */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-indigo-500/10 blur-3xl" />

    {/* Snowflakes */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <Snowflake
          key={i}
          className="absolute text-white/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${8 + Math.random() * 12}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>

    {/* Content */}
    <div className="relative z-10 flex flex-col h-full text-white">
      {/* Header */}
      <div className="text-center mb-auto">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Snowflake className="w-4 h-4 text-cyan-300" />
          <span className="text-xs tracking-[0.3em] text-cyan-200/80">CODEFORCES</span>
          <Snowflake className="w-4 h-4 text-cyan-300" />
        </div>
        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
          2025 WRAPPED
        </div>
      </div>

      {/* Username */}
      <div className="text-center my-6">
        <div className="inline-block px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
          <span className="text-xl md:text-2xl font-bold text-cyan-100">{username}</span>
        </div>
      </div>

      {/* Stats - hexagonal style */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <div className="w-24 h-24 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30">
          <div className="text-2xl font-bold text-cyan-200">{problemsSolved}</div>
          <div className="text-[10px] text-cyan-300/70">Problems</div>
        </div>
        <div className="w-24 h-24 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30">
          <div className="text-2xl font-bold text-blue-200">{contestsParticipated}</div>
          <div className="text-[10px] text-blue-300/70">Contests</div>
        </div>
        <div className="w-24 h-24 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/30">
          <div className="text-2xl font-bold text-indigo-200">{maxRating}</div>
          <div className="text-[10px] text-indigo-300/70">Max Rating</div>
        </div>
        <div className="w-24 h-24 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-400/30">
          <div className={`text-2xl font-bold ${netChange >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
            {netChange >= 0 ? "+" : ""}{netChange}
          </div>
          <div className="text-[10px] text-cyan-300/70">Net Change</div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-cyan-300/50 mt-auto">
        ❄️ Chilling with Code ❄️
      </div>
    </div>
  </motion.div>
);
