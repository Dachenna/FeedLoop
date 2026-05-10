"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { useTheme } from "next-themes";

interface BackgroundCirclesProps {
  title?: string;
  description?: string;
  className?: string;
  backgroundOnly?: boolean;
}

// New color scheme: Green for Light, Purple for Dark
const COLOR_VARIANTS = {
  light: {  // Green theme
    border: [
      "border-emerald-500/70",
      "border-teal-400/60",
      "border-emerald-600/30",
    ],
    gradient: "from-emerald-500/30",
    accent: "text-emerald-600",
  },
  dark: {   // Purple theme
    border: [
      "border-purple-500/70",
      "border-violet-400/60",
      "border-purple-600/30",
    ],
    gradient: "from-purple-500/30",
    accent: "text-purple-600",
  },
} as const;

const AnimatedGrid = () => (
  <motion.div
    className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,transparent_30%,black)]"
    animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
    transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
  >
    <div className="h-full w-full [background-image:repeating-linear-gradient(100deg,#64748B_0%,#64748B_1px,transparent_1px,transparent_4%)] opacity-20" />
  </motion.div>
);

export function BackgroundCircles({
  title = "Background Circles",
  description = "Optional Description",
  className,
  backgroundOnly = false,
}: BackgroundCirclesProps) {
  const { theme } = useTheme();
  
  // Choose variant based on current theme
  const currentTheme = theme === "dark" ? "dark" : "light";
  const variantStyles = COLOR_VARIANTS[currentTheme];

  return (
    <div
      className={clsx(
        backgroundOnly ? "absolute inset-0 overflow-hidden" : "relative flex h-screen w-full items-center justify-center overflow-hidden",
        backgroundOnly ? "" : "bg-white dark:bg-black/5",
        className
      )}
    >
      <AnimatedGrid />

      {/* Animated Circles */}
      <motion.div className="absolute h-[480px] w-[480px]">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={clsx(
              "absolute inset-0 rounded-full border-2 bg-gradient-to-br to-transparent",
              variantStyles.border[i],
              variantStyles.gradient
            )}
            animate={{
              rotate: 360,
              scale: [1, 1.05 + i * 0.05, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div
              className={clsx(
                "absolute inset-0 rounded-full mix-blend-screen",
                `bg-[radial-gradient(ellipse_at_center,${variantStyles.gradient.replace("from-", "")}/10%,transparent_70%)]`
              )}
            />
          </motion.div>
        ))}
      </motion.div>

      {!backgroundOnly && (
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1
            className={clsx(
              "text-5xl font-bold tracking-tight md:text-7xl",
              "bg-gradient-to-b from-slate-950 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent",
              "drop-shadow-[0_0_32px_rgba(16,185,129,0.4)] dark:drop-shadow-[0_0_32px_rgba(168,85,247,0.4)]"
            )}
          >
            {title}
          </h1>

          <motion.p
            className={clsx(
              "mt-6 text-lg md:text-xl",
              theme === "dark" ? "text-white" : "text-slate-900"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>
        </motion.div>
      )}

      {/* Extra glow layers */}
      <div className="absolute inset-0 [mask-image:radial-gradient(90%_60%_at_50%_50%,#000_40%,transparent)]">
        <div 
          className={clsx(
            "absolute inset-0 blur-[120px]",
            theme === "dark" 
              ? "bg-purple-500/20" 
              : "bg-emerald-500/30"
          )} 
        />
      </div>
    </div>
  );
}