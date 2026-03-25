'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export function MagicSpinner() {
  return (
    <div className="relative">
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-24 h-24 bg-gradient-to-br from-[#6366F1] to-[#A855F7] rounded-[2rem] flex items-center justify-center shadow-xl border border-white/20"
      >
        <BookOpen className="w-10 h-10 text-white" />
      </motion.div>
      
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full"
          animate={{
            x: [0, (Math.random() - 0.5) * 150],
            y: [0, (Math.random() - 0.5) * 150],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}
