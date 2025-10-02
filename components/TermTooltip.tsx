"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";

interface TermTooltipProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export default function TermTooltip({ term, definition, children }: TermTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <span
        className="relative cursor-help border-b-2 border-dotted border-blue-500 text-blue-700 font-semibold hover:border-blue-700 transition-colors"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
        <HelpCircle className="inline w-3 h-3 ml-0.5 mb-1 opacity-70" />
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-[9999] pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl shadow-2xl p-4 max-w-sm pointer-events-auto">
              <div className="flex items-start gap-2 mb-2">
                <HelpCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <h4 className="font-bold text-base">{term}</h4>
              </div>
              <p className="text-sm leading-relaxed opacity-95">
                {definition}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

