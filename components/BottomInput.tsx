"use client";

import { useState } from "react";
import { Send, Paperclip, Mic } from "lucide-react";

interface BottomInputProps {
  onSubmit: (question: string) => void;
  disabled?: boolean;
}

export default function BottomInput({ onSubmit, disabled }: BottomInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSubmit(input);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={disabled}
              placeholder="Apna doubt yahan poocho... 📝"
              className="w-full border-2 border-gray-300 rounded-2xl px-4 py-3 pr-12 resize-none focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              rows={1}
              style={{ maxHeight: "120px" }}
            />
          </div>
          
          <button
            disabled={disabled}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>
          
          <button
            disabled={disabled}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            title="Voice input"
          >
            <Mic className="w-5 h-5 text-gray-600" />
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || disabled}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-xs text-gray-400 mt-2 text-center">
          Press Enter to send • Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}

