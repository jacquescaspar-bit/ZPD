"use client";

import { useState, useEffect } from "react";
import localFont from "next/font/local";

const antipasto = localFont({
  src: [
    {
      path: "../public/antipasto/Antipasto_extralight.otf",
      weight: "200",
    },
    {
      path: "../public/antipasto/Antipasto_regular.otf",
      weight: "400",
    },
    {
      path: "../public/antipasto/Antipasto_extrabold.otf",
      weight: "800",
    },
  ],
});

interface Synapse {
  x: number;
  y: number;
  size: number;
  connections: number[];
}

const Hero = () => {
  const [synapses, setSynapses] = useState<Synapse[]>([]);

  useEffect(() => {
    const generateSynapses = () => {
      const numSynapses = Math.floor(Math.random() * 4) + 5; // 5-8 synapses
      const newSynapses: Synapse[] = [];

      for (let i = 0; i < numSynapses; i++) {
        newSynapses.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10, // 10-30px
          connections: [],
        });
      }

      // Create connections
      newSynapses.forEach((synapse, index) => {
        const numConnections = Math.floor(Math.random() * 3) + 1; // 1-3 connections
        const possibleConnections = newSynapses
          .map((_, i) => i)
          .filter((i) => i !== index);
        for (
          let j = 0;
          j < numConnections && possibleConnections.length > 0;
          j++
        ) {
          const randomIndex = Math.floor(
            Math.random() * possibleConnections.length,
          );
          const [connectionIndex] = possibleConnections.splice(randomIndex, 1);
          synapse.connections.push(connectionIndex);
        }
      });

      setSynapses(newSynapses);
    };

    generateSynapses();
  }, []);

  return (
    <main className="min-h-[calc(var(--vh,1vh)*100-4rem)] flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Synapse background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {synapses.map((synapse, index) => (
          <g key={index}>
            {/* Connections */}
            {synapse.connections.map((connIndex) => {
              const connected = synapses[connIndex];
              return (
                <line
                  key={`${index}-${connIndex}`}
                  className="text-blue-300 dark:text-blue-700"
                  stroke="currentColor"
                  strokeWidth="0.2"
                  x1={synapse.x}
                  x2={connected.x}
                  y1={synapse.y}
                  y2={connected.y}
                />
              );
            })}
            {/* Synapse circle */}
            <circle
              className="text-blue-200 dark:text-blue-800"
              cx={synapse.x}
              cy={synapse.y}
              fill="currentColor"
              r={synapse.size / 2}
            />
          </g>
        ))}
      </svg>

      <div className="text-center flex flex-col items-center justify-center relative z-10 animate-fade-in-up">
        {/* ZPD */}
        <div className="text-6xl sm:text-7xl md:text-9xl font-bold uppercase mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ZPD
        </div>

        {/* Learning */}
        <div
          className={`${antipasto.className} text-4xl sm:text-5xl md:text-6xl font-[200] text-center text-gray-700 dark:text-gray-300 mb-8`}
        >
          <span className="tracking-wide">
            where{" "}
            <span className="font-[400] text-blue-600 dark:text-blue-400">
              learning
            </span>{" "}
            happens
          </span>
        </div>

        {/* CTA Button */}
        <div className="mt-8">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-base sm:text-lg tracking-wide">
            Book Now
          </button>
        </div>
      </div>
    </main>
  );
};

export default Hero;
