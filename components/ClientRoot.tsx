// File: components/ClientRoot.tsx
"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./theme-provider";
import Navbar from "./navbar";

const inter = Inter({ subsets: ["latin"] });
const ChartDashboard = dynamic(() => import("./chart-dashboard"), { ssr: false });
const Markets = dynamic(() => import("./markets"), { ssr: false });

export default function ClientRoot() {
  const [view, setView] = useState<"dashboard" | "mercados">("dashboard");

  // Forzar resize al cambiar de pestaña
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [view]);

  const handleSelect = (symbol: string) => {
    setView("dashboard");
    window.dispatchEvent(new CustomEvent("add-chart", { detail: { symbol } }));
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className={`${inter.className} flex flex-col h-full`}>
        <Navbar activeTab={view} onTabChange={setView} />
        <main className="flex-1 relative">
          {/* Dashboard siempre montado */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: view === "dashboard" ? 1 : 0,
              pointerEvents: view === "dashboard" ? "auto" : "none",
            }}
          >
            <ChartDashboard />
          </div>
          {/* Markets siempre montado */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: view === "mercados" ? 1 : 0,
              pointerEvents: view === "mercados" ? "auto" : "none",
            }}
          >
            <Markets onSelectSymbol={handleSelect} />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
