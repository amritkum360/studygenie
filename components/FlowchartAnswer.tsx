"use client";

import { motion } from "framer-motion";
import { BookOpen, Lightbulb, Calculator, Sparkles } from "lucide-react";
import { highlightTerms } from "@/lib/highlightTerms";

interface FlowchartProps {
  flowchart: {
    definition: string;
    steps: Array<{
      title: string;
      text: string;
      color: string;
      icon: string;
    }>;
    formula?: string;
    example?: string;
  };
}

const colorMap: Record<string, { bg: string; border: string; text: string; gradient: string; shadow: string }> = {
  blue: {
    bg: "bg-gradient-to-br from-blue-50 to-blue-100",
    border: "border-blue-400",
    text: "text-blue-900",
    gradient: "from-blue-400 to-blue-600",
    shadow: "shadow-blue-200",
  },
  green: {
    bg: "bg-gradient-to-br from-green-50 to-green-100",
    border: "border-green-400",
    text: "text-green-900",
    gradient: "from-green-400 to-green-600",
    shadow: "shadow-green-200",
  },
  yellow: {
    bg: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    border: "border-yellow-400",
    text: "text-yellow-900",
    gradient: "from-yellow-400 to-yellow-600",
    shadow: "shadow-yellow-200",
  },
  orange: {
    bg: "bg-gradient-to-br from-orange-50 to-orange-100",
    border: "border-orange-400",
    text: "text-orange-900",
    gradient: "from-orange-400 to-orange-600",
    shadow: "shadow-orange-200",
  },
  purple: {
    bg: "bg-gradient-to-br from-purple-50 to-purple-100",
    border: "border-purple-400",
    text: "text-purple-900",
    gradient: "from-purple-400 to-purple-600",
    shadow: "shadow-purple-200",
  },
};

export default function FlowchartAnswer({ flowchart }: FlowchartProps) {
  return (
    <div className="space-y-8">
      {/* Definition Box - Top */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="relative group max-w-3xl"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-300"></div>
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-300 rounded-2xl p-6 shadow-2xl hover:shadow-blue-300 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Definition
                </h3>
                <Sparkles className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-gray-800 leading-relaxed text-base">
                {highlightTerms(flowchart.definition)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Horizontal Workflow - n8n Style */}
      <div className="relative overflow-visible">
        {/* Steps in horizontal layout */}
        <div className="flex items-center gap-6 overflow-x-auto overflow-y-visible pb-4 min-w-max">
          {flowchart.steps.map((step, idx) => {
            const colors = colorMap[step.color] || colorMap.green;
            return (
              <div key={idx} className="flex items-center">
                {/* Step Box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.3 + idx * 0.1, 
                    type: "spring",
                    stiffness: 100
                  }}
                  className="relative group"
                >
                  {/* Glow effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${colors.gradient} rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-300`}></div>
                  
                  <div className={`relative ${colors.bg} border-2 ${colors.border} rounded-2xl p-5 shadow-xl ${colors.shadow} hover:shadow-2xl transition-all duration-300 w-72`}>
                    <div className="space-y-3">
                      {/* Icon and badge at top */}
                      <div className="flex items-center justify-between">
                        <div className={`p-2.5 bg-gradient-to-br ${colors.gradient} rounded-xl shadow-lg`}>
                          <span className="text-3xl">{step.icon}</span>
                        </div>
                        <span className={`px-3 py-1 bg-gradient-to-r ${colors.gradient} text-white text-xs font-bold rounded-full shadow-md`}>
                          STEP {idx + 1}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h4 className={`text-lg font-bold ${colors.text}`}>
                        {step.title}
                      </h4>
                      
                      {/* Description */}
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {highlightTerms(step.text)}
                      </p>
                      
                      {/* Decorative line */}
                      <div className={`h-1 w-16 bg-gradient-to-r ${colors.gradient} rounded-full`}></div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Horizontal Arrow Connector */}
                {idx < flowchart.steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.3 }}
                    className="flex items-center mx-2"
                  >
                    <div className={`h-0.5 w-12 bg-gradient-to-r ${colors.gradient} rounded-full`}></div>
                    <div className={`w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-${step.color}-500`}
                      style={{
                        borderLeftColor: step.color === 'blue' ? '#3b82f6' :
                                        step.color === 'green' ? '#22c55e' :
                                        step.color === 'yellow' ? '#eab308' :
                                        step.color === 'orange' ? '#f97316' : '#3b82f6'
                      }}
                    ></div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Formula and Example - Side by Side */}
      <div className="flex gap-6 flex-wrap">
        {/* Formula - Enhanced */}
        {flowchart.formula && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="relative group flex-1 min-w-[350px]"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-yellow-50 via-white to-orange-50 border-2 border-yellow-400 rounded-2xl p-6 shadow-2xl hover:shadow-yellow-300 transition-all duration-300 h-full">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl shadow-lg">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-3">
                    Chemical Formula
                  </h3>
                  <div className="bg-white/80 backdrop-blur-sm border-2 border-yellow-300 rounded-xl p-4">
                    <p className="text-gray-900 font-mono text-xl text-center font-semibold">
                      {flowchart.formula}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Example - Enhanced */}
        {flowchart.example && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring" }}
            className="relative group flex-1 min-w-[350px]"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-orange-50 via-white to-pink-50 border-2 border-orange-400 rounded-2xl p-6 shadow-2xl hover:shadow-orange-300 transition-all duration-300 h-full">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-orange-400 to-pink-600 rounded-xl shadow-lg">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-3">
                    Real-World Example
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base italic">
                    {highlightTerms(flowchart.example)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

