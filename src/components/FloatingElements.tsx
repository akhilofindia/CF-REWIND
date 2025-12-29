import { motion } from "framer-motion";

const codeSymbols = [
  "{ }", "< />", "( )", "[ ]", "=>", "++", "==", "&&", "||", 
  "int", "void", "for", "if", "AC", "WA", "TLE", "MLE"
];

const snowflakes = ["❄", "❅", "❆", "✧", "✦", "⋆"];

export const FloatingElements = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Snowflakes */}
      {Array.from({ length: 30 }).map((_, index) => (
        <motion.div
          key={`snow-${index}`}
          className="absolute text-white/40 select-none"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 16}px`,
          }}
          initial={{
            y: -50,
            x: 0,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 50 : 900,
            x: [0, Math.random() * 60 - 30, Math.random() * 60 - 30, 0],
            opacity: [0, 0.7, 0.7, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear",
          }}
        >
          {snowflakes[Math.floor(Math.random() * snowflakes.length)]}
        </motion.div>
      ))}

      {/* Code symbols with frosty feel */}
      {codeSymbols.map((symbol, index) => (
        <motion.div
          key={index}
          className="absolute font-mono text-primary/10 text-lg md:text-2xl font-semibold select-none"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            opacity: 0,
            rotate: Math.random() * 30 - 15,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [0, 0.25, 0.25, 0],
            rotate: [null, Math.random() * 20 - 10],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        >
          {symbol}
        </motion.div>
      ))}
      
      {/* Frosty gradient orbs - cooler winter tones */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(200 80% 70% / 0.4) 0%, transparent 70%)",
          top: "10%",
          right: "10%",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(220 70% 80% / 0.35) 0%, transparent 70%)",
          bottom: "20%",
          left: "5%",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(180 60% 75% / 0.3) 0%, transparent 70%)",
          top: "60%",
          right: "30%",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Subtle sparkle effects */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
