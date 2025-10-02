"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Canvas from "@/components/Canvas";
import BottomInput from "@/components/BottomInput";
import { DEMO_RESPONSE } from "@/lib/demoData";

export default function Home() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (question: string) => {
    if (!question.trim()) return;

    setLoading(true);
    
    try {
      // Call OpenAI API
      const res = await fetch("/api/ask-doubt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error("Failed to get answer");
      }

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      // Fallback to demo response if API fails
      setResponse(DEMO_RESPONSE);
      alert("API error occurred. Showing demo response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      <Navbar />
      
      <div className="flex-1 overflow-hidden">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">AI apka doubt solve kar raha hai...</p>
              <p className="text-gray-400 text-sm mt-2">Thoda wait karein (5-10 seconds)</p>
            </div>
          </div>
        ) : response ? (
          <Canvas response={response} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center px-4">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome to StudyGenie
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Apna doubt neeche input box mein type karein
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">
                  📘 NCERT References
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm">
                  📕 Reference Books
                </span>
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm">
                  🎥 YouTube Videos
                </span>
                <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm">
                  🌐 Websites
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <BottomInput onSubmit={handleSubmit} disabled={loading} />
    </div>
  );
}

