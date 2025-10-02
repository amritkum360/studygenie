"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

interface ReferencePanelProps {
  references: {
    ncert: any[];
    books: any[];
    youtube: any[];
    websites: any[];
  };
}

export default function ReferencePanel({ references }: ReferencePanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* NCERT Column */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white border-2 border-blue-200 rounded-xl p-5 hover:shadow-xl transition-shadow"
      >
        <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
          📘 NCERT
        </h4>
        {references.ncert.map((ref, idx) => (
          <div key={idx} className="space-y-2 mb-4">
            <p className="text-sm font-semibold text-gray-700">{ref.bookName}</p>
            <p className="text-xs text-gray-500">Page {ref.pageNumber}, Lines {ref.lineRange}</p>
            <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                📄 Page Preview
              </div>
            </div>
            <p className="text-xs text-gray-600 line-clamp-3">{ref.excerpt}</p>
          </div>
        ))}
      </motion.div>

      {/* Reference Books Column */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white border-2 border-green-200 rounded-xl p-5 hover:shadow-xl transition-shadow"
      >
        <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
          📕 Reference Books
        </h4>
        {references.books.map((ref, idx) => (
          <div key={idx} className="space-y-2 mb-4">
            <p className="text-sm font-semibold text-gray-700">{ref.bookName}</p>
            <p className="text-xs text-gray-500">Page {ref.pageNumber}</p>
            <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                📄 Page Preview
              </div>
            </div>
            <p className="text-xs text-gray-600 line-clamp-3">{ref.excerpt}</p>
          </div>
        ))}
      </motion.div>

      {/* YouTube Column */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white border-2 border-red-200 rounded-xl p-5 hover:shadow-xl transition-shadow"
      >
        <h4 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
          🎥 YouTube
        </h4>
        {references.youtube.map((ref, idx) => (
          <a
            key={idx}
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-4 group"
          >
            <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden mb-2 group-hover:scale-105 transition-transform">
              <div className="absolute inset-0 flex items-center justify-center bg-red-600 text-white">
                <div className="text-center">
                  <div className="text-3xl mb-1">▶️</div>
                  <p className="text-xs">{ref.duration}</p>
                </div>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-red-600">
              {ref.title}
            </p>
            <p className="text-xs text-gray-500 mt-1">{ref.channel}</p>
          </a>
        ))}
      </motion.div>

      {/* Websites Column */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white border-2 border-purple-200 rounded-xl p-5 hover:shadow-xl transition-shadow"
      >
        <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
          🔗 Websites
        </h4>
        {references.websites.map((ref, idx) => (
          <a
            key={idx}
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-4 p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors group"
          >
            <div className="flex items-start gap-2">
              <ExternalLink className="w-4 h-4 text-purple-600 flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-purple-600">
                  {ref.title}
                </p>
                <p className="text-xs text-gray-500 mt-1 truncate">{ref.domain}</p>
                <p className="text-xs text-gray-600 mt-2 line-clamp-2">{ref.snippet}</p>
              </div>
            </div>
          </a>
        ))}
      </motion.div>
    </div>
  );
}

