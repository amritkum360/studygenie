"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Maximize2, Move } from "lucide-react";
import FlowchartAnswer from "./FlowchartAnswer";
import ReferencePanel from "./ReferencePanel";

interface CanvasProps {
  response: any;
}

export default function Canvas({ response }: CanvasProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Pan functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left click
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom controls
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleResetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  // Prevent text selection while dragging
  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    }
  }, [isDragging]);

  return (
    <div 
      className="h-full relative overflow-hidden bg-gray-100"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
        backgroundPosition: `${position.x}px ${position.y}px`,
      }}
    >
      {/* Canvas Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="p-3 bg-white hover:bg-gray-50 rounded-lg shadow-lg transition"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-3 bg-white hover:bg-gray-50 rounded-lg shadow-lg transition"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={handleResetView}
          className="p-3 bg-white hover:bg-gray-50 rounded-lg shadow-lg transition"
          title="Reset View"
        >
          <Maximize2 className="w-5 h-5 text-gray-700" />
        </button>
        
        {/* Zoom Level Indicator */}
        <div className="px-3 py-2 bg-white rounded-lg shadow-lg text-sm font-semibold text-gray-700">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Canvas Hint */}
      <div className="absolute bottom-4 left-4 z-10 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Move className="w-4 h-4" />
          <span>Click & drag to pan • Scroll to zoom • Double-click to reset</span>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div
        ref={canvasRef}
        className="h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleResetView}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
          }}
          className="p-8 pb-24 inline-block min-w-[1000px]"
        >
          <div className="max-w-4xl relative"
            style={{ zIndex: 1 }}
          >
            {/* Question Display */}
            <div className="mb-8 p-4 bg-white rounded-lg shadow-md border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Your Question:</p>
              <h2 className="text-xl font-semibold text-gray-800">
                {response.question}
              </h2>
            </div>

            {/* Main Flowchart Answer */}
            <FlowchartAnswer flowchart={response.flowchart} />
            
            {/* References Panel */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                📚 References & Sources
              </h3>
              <ReferencePanel references={response.references} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

